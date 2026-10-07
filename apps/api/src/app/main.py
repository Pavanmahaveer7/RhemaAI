import logging
import os
import socket
import uuid
from contextlib import asynccontextmanager
from urllib.parse import urlparse

import psycopg
import redis
from fastapi import FastAPI, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from llm_gateway import ping as gateway_ping
from vocab_mcp import init_db

from app.errors import error_body
from app.v1.errors import api_error

log = logging.getLogger("church_ai.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        init_db()
        app.state.dictionary_ready = True
        app.state.dictionary_error = None
    except Exception as exc:
        app.state.dictionary_ready = False
        app.state.dictionary_error = exc.__class__.__name__
    from app.v1.store import get_store

    error = get_store().sync_postgres()
    if error:
        log.warning("store not saved to Postgres: %s", error)
    yield


app = FastAPI(title="Rhema.ai API", version="0.1.0", lifespan=lifespan)


def _request_id(request: Request) -> str:
    return getattr(request.state, "request_id", str(uuid.uuid4()))


def _client_error_message(request: Request, fallback: str) -> str:
    if os.getenv("APP_ENV") == "production":
        return fallback
    detail = getattr(request.state, "debug_detail", None)
    return str(detail) if detail else fallback


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    rid = _request_id(request)
    log.info("validation error rid=%s path=%s", rid, request.url.path)
    message = "Check the fields and try again."
    if os.getenv("APP_ENV") != "production" and exc.errors():
        message = exc.errors()[0].get("msg", message)
    return api_error(422, "error", "validation", message, rid, False)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    rid = _request_id(request)
    if exc.status_code == 404:
        return api_error(404, "error", "not_found", "Not found.", rid, False)
    return api_error(exc.status_code, "error", "http_error", _client_error_message(request, "Request failed."), rid, False)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    rid = _request_id(request)
    log.exception("unhandled error rid=%s path=%s", rid, request.url.path)
    return api_error(
        500,
        "unavailable",
        "internal",
        "Something went wrong. Try again or contact support with the request id.",
        rid,
        True,
    )


def _cors_origins() -> list[str]:
    base = os.getenv("APP_BASE_URL", "http://localhost:3000").rstrip("/")
    extra = [x.strip().rstrip("/") for x in os.getenv("CORS_ORIGINS", "").split(",") if x.strip()]
    if os.getenv("APP_ENV") == "production":
        return list({o for o in (base, *extra) if o})
    return list({base, "http://localhost:3000", "http://127.0.0.1:3000", *extra})


app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def save_writes(request: Request, call_next):
    response = await call_next(request)
    if request.method in ("POST", "PUT", "PATCH", "DELETE"):
        from app.v1.store import get_store

        store = get_store()
        try:
            await run_in_threadpool(store.save_postgres)
        except Exception as exc:  # the write stays in memory; /status reports the database as down
            store.save_error = exc.__class__.__name__
            log.warning("store save failed: %s", store.save_error)
    return response


@app.middleware("http")
async def attach_request_id(request: Request, call_next):
    import time

    request.state.request_id = request.headers.get("x-request-id") or str(uuid.uuid4())
    started = time.perf_counter()
    response = await call_next(request)
    if request.url.path.startswith("/api/"):
        log.info(
            "%s %s %s %.0fms rid=%s",
            request.method,
            request.url.path,
            response.status_code,
            (time.perf_counter() - started) * 1000,
            request.state.request_id,
        )
    response.headers["x-request-id"] = request.state.request_id
    response.headers["x-content-type-options"] = "nosniff"
    response.headers["x-frame-options"] = "DENY"
    response.headers["referrer-policy"] = "no-referrer"
    if os.getenv("APP_ENV") == "production":
        response.headers["strict-transport-security"] = "max-age=31536000; includeSubDomains"
    return response


MAX_BODY = 16 * 1024
_WRITES = {"POST", "PUT", "PATCH", "DELETE"}


def _allowed_origins() -> set[str]:
    return set(_cors_origins())


def _site_of(url: str) -> str:
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc:
        return ""
    return f"{parsed.scheme}://{parsed.netloc}"


def _guard_error(request: Request, status: int, code: str, message: str) -> JSONResponse:
    rid = request.headers.get("x-request-id") or str(uuid.uuid4())
    response = api_error(status, "error" if status == 413 else "unavailable", code, message, rid, False)
    response.headers["x-request-id"] = rid
    response.headers["x-content-type-options"] = "nosniff"
    return response


@app.middleware("http")
async def guard_writes(request: Request, call_next):
    """Cap write bodies at 16 KB, and reject cookie writes that come from another site."""
    if request.method in _WRITES:
        raw_length = request.headers.get("content-length")
        if raw_length and raw_length.isdigit() and int(raw_length) > MAX_BODY:
            return _guard_error(request, 413, "validation", "That request is too large.")
        if len(await request.body()) > MAX_BODY:
            return _guard_error(request, 413, "validation", "That request is too large.")
        if request.cookies.get("ca_session"):
            allowed = _allowed_origins()
            origin = (request.headers.get("origin") or "").rstrip("/")
            referer = _site_of(request.headers.get("referer") or "")
            if origin and origin not in allowed:
                return _guard_error(request, 403, "forbidden", "That request did not come from this site.")
            if referer and referer not in allowed:
                return _guard_error(request, 403, "forbidden", "That request did not come from this site.")
            if request.headers.get("sec-fetch-site") == "cross-site":
                return _guard_error(request, 403, "forbidden", "That request did not come from this site.")
            if os.getenv("APP_ENV") == "production" and not origin and not referer:
                return _guard_error(request, 403, "forbidden", "That request did not come from this site.")
    return await call_next(request)


@app.get("/health")
def health():
    return {"status": "ok"}


def _check_postgres() -> str:
    url = os.getenv("DATABASE_URL", "postgresql://app:app@localhost:5432/church_ai")
    with psycopg.connect(url, connect_timeout=2) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
            cur.fetchone()
    return "ok"


def _check_redis() -> str:
    url = os.getenv("REDIS_URL", "redis://localhost:6379")
    client = redis.Redis.from_url(url, socket_connect_timeout=2)
    client.ping()
    return "ok"


def _check_graph() -> str:
    url = os.getenv("GRAPH_DB_URL", "bolt://localhost:7687")
    parsed = urlparse(url)
    host = parsed.hostname or "localhost"
    port = parsed.port or 7687
    with socket.create_connection((host, port), timeout=2):
        return "ok"


def _check_gateway() -> str:
    result = gateway_ping()
    if result.get("status") != "ok":
        raise RuntimeError("gateway ping failed")
    return "ok"


def _checks() -> dict:
    # Resolved at call time so tests can replace an individual check.
    return {
        "postgres": _check_postgres,
        "redis": _check_redis,
        "graph_db": _check_graph,
        "llm_gateway": _check_gateway,
    }


@app.get("/ready")
def ready(request: Request):
    checks: dict[str, str] = {}
    failed: list[str] = []
    for name, fn in _checks().items():
        try:
            checks[name] = fn()
        except Exception as exc:  # readiness must report the failure, not hide it
            checks[name] = "fail"
            failed.append(f"{name}: {exc.__class__.__name__}")
    if failed:
        return JSONResponse(
            status_code=503,
            content=error_body(
                "NOT_READY",
                "; ".join(failed),
                _request_id(request),
                checks=checks,
            ),
        )
    return {"status": "ready", "checks": checks}


from app.l1 import router as l1_router
from app.v1.router import router as v1_router

app.include_router(l1_router)
app.include_router(v1_router)
