"""Public L1 dictionary routes on the vocab database. Normal mode only.

There is no public faith path: Faith content is part of GET /api/v1/terms/:term.
"""

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from agents.intake import route_for_endpoint
from app.errors import error_body, request_id_from
from guardrails.tools import ToolError, call_tool
from vocab_mcp.lookup_term import NotFound, lookup_term, search_terms
from vocab_mcp.store import init_db

router = APIRouter()


def _unavailable(request: Request):
    if getattr(request.app.state, "dictionary_ready", False):
        return None
    try:
        init_db()
        request.app.state.dictionary_ready = True
        request.app.state.dictionary_error = None
        return None
    except Exception as exc:
        request.app.state.dictionary_error = exc.__class__.__name__
    reason = getattr(request.app.state, "dictionary_error", "unavailable")
    return JSONResponse(
        status_code=503,
        content=error_body(
            "SERVICE_UNAVAILABLE",
            f"Dictionary database is not ready ({reason}).",
            request_id_from(request),
        ),
    )


@router.get("/api/l1/terms")
def list_terms(request: Request, q: str = ""):
    blocked = _unavailable(request)
    if blocked is not None:
        return blocked
    intake = route_for_endpoint("l1_lookup")
    try:
        payload = call_tool("vocab.search_terms", {"q": q}, role="public", handler=search_terms)
    except ToolError as exc:
        return JSONResponse(
            status_code=400 if exc.code == "VALIDATION_ERROR" else 403,
            content=error_body(exc.code, exc.message, request_id_from(request)),
        )
    return {"intake": intake, **payload}


@router.get("/api/l1/terms/{term}")
def read_term(term: str, request: Request):
    blocked = _unavailable(request)
    if blocked is not None:
        return blocked
    intake = route_for_endpoint("l1_lookup")
    try:
        payload = call_tool(
            "vocab.lookup_term",
            {"term": term},
            role="public",
            handler=lookup_term,
        )
    except NotFound:
        return JSONResponse(
            status_code=404,
            content=error_body(
                "NOT_FOUND",
                f"Term '{term}' is not in the verified lexicon.",
                request_id_from(request),
            ),
        )
    except ToolError as exc:
        status = 400 if exc.code == "VALIDATION_ERROR" else 403
        return JSONResponse(
            status_code=status,
            content=error_body(exc.code, exc.message, request_id_from(request)),
        )
    return {"intake": intake, **payload}
