"""HTTP routes for contract/api.md. The assistant never sets a stage or a decision."""

import hashlib
import hmac
import os
import uuid
from datetime import datetime, timezone

from agents.packet import prepare as prepare_packet
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, RedirectResponse, Response
from llm_gateway import complete as gateway_complete
from llm_gateway import mode as gateway_mode

from app.v1.crypto import encrypt, key_bytes
from app.v1.errors import api_error
from app.v1.moderate import CRISIS, INJECTION, classify, group_ideas, redact
from app.v1.store import (
    PAUSES_WHEN_ON,
    answer_device_hash,
    get_store,
    hash_password,
    open_session,
    read_session,
    reveal_name,
    session_key,
    verify_password,
)

router = APIRouter(prefix="/api/v1")

QUEUE_KEYS = {"id", "region", "stage", "since", "status", "escalated", "complete", "missing", "crisis"}
LANGS = {"en", "hi", "bn", "ne", "my", "km"}
ENCOURAGEMENT = "Thank you. Rest well tonight. “Come unto me, all ye that labour.” Matthew 11:28"
ENCOURAGEMENT_WHY = "This is a prepared line for a check-in. It is not a score and not a judgement."


def _rid(request: Request) -> str:
    return getattr(request.state, "request_id", str(uuid.uuid4()))


def _fail(request: Request, status: int, kind: str, code: str, message: str, retryable: bool = False) -> JSONResponse:
    return api_error(status, kind, code, message, _rid(request), retryable)


def _actor(request: Request) -> dict | None:
    store = get_store()
    token = request.cookies.get("ca_session")
    header = request.headers.get("authorization", "")
    if header.lower().startswith("bearer "):
        token = header[7:].strip()
    service = os.getenv("AGENT_SERVICE_TOKEN", "").strip()
    if service and token == service:
        return {"role": "agent", "account_id": None, "device_id": None}
    return read_session(store, token)


def _require(request: Request, roles: set[str]):
    actor = _actor(request)
    if actor is None:
        return None, _fail(request, 401, "unavailable", "unauthenticated", "Sign in to continue.")
    if actor["role"] not in roles:
        return None, _fail(request, 403, "unavailable", "forbidden", "You cannot open this.")
    return actor, None


def _cookie(response: Response, token: str) -> None:
    response.set_cookie(
        "ca_session",
        token,
        httponly=True,
        samesite="lax",
        secure=os.getenv("APP_ENV") == "production",
        path="/",
    )


def _session_body(store, actor: dict) -> dict:
    account = store.accounts.get(actor.get("account_id") or "")
    if account is None:
        return {"kind": actor["role"], "displayName": None}
    return {"kind": actor["role"], "displayName": None, "pseudonym": account["code_name"]}


def _paused(request: Request, feature: str):
    if get_store().feature_paused(feature):
        return _fail(request, 503, "unavailable", "feature_off", "Switched off for the moment.")
    return None


def _client_ip(request: Request) -> str:
    if request.client is None:
        return "local"
    return request.client.host or "local"


@router.post("/auth/guest")
def auth_guest(request: Request):
    store = get_store()
    device_id = str(uuid.uuid4())
    store.devices[device_id] = {"id": device_id, "guest_token": device_id, "lang": "en", "created_at": _today()}
    token = open_session(store, "guest", None, device_id)
    response = JSONResponse({"kind": "guest", "displayName": None})
    _cookie(response, token)
    return response


@router.post("/auth/signin")
async def auth_signin(request: Request):
    store = get_store()
    if not store.password_hash:
        return _fail(request, 503, "unavailable", "service_down", "Sign-in is not available until the server password is set.")
    if not store.allow(f"signin:{_client_ip(request)}", 10):
        return _fail(request, 429, "unavailable", "rate_limited", "Try again in a moment.")
    body = await _json(request)
    code = str(body.get("codeName") or "").strip()
    password = str(body.get("password") or "")
    email_hash = hashlib.sha256(code.lower().encode("utf-8")).hexdigest()
    account = next((row for row in store.accounts.values() if row["code_name"] == code or row["email_hash"] == email_hash), None)
    if account is None:
        return _fail(request, 401, "unavailable", "unauthenticated", "That sign-in did not match.")
    if (account.get("status") or "active") == "suspended":
        return _fail(request, 403, "unavailable", "forbidden", "This account is suspended.")
    if not str(account.get("password_hash") or "").startswith("scrypt$") and os.getenv("APP_ENV") == "production":
        return _fail(request, 503, "unavailable", "service_down", "Staff sign-in needs an individual password.")
    if not _password_matches(store, account, password):
        return _fail(request, 401, "unavailable", "unauthenticated", "That sign-in did not match.")
    token = open_session(store, account["role"], account["id"], None)
    response = JSONResponse(_session_body(store, read_session(store, token)))
    _cookie(response, token)
    return response


def _password_matches(store, account: dict, password: str) -> bool:
    own = account.get("password_hash") or ""
    if own.startswith("scrypt$"):
        return verify_password(password, own)
    digest = hashlib.sha256((store.password_salt + password).encode("utf-8")).hexdigest()
    return bool(store.password_hash) and hmac.compare_digest(digest, store.password_hash)


def _password_problem(password: str, email: str) -> str | None:
    if not 8 <= len(password) <= 200:
        return "Use at least 8 characters."
    if password.isalpha():
        return "Add a number or a symbol."
    local = email.split("@", 1)[0].lower()
    if password.lower() == email.lower() or (local and local in password.lower()):
        return "Use a password that is not your email."
    return None


@router.post("/auth/signup")
async def auth_signup(request: Request):
    store = get_store()
    actor, denied = _require(request, {"guest", "user"})
    if denied:
        return denied
    body = await _json(request)
    email = str(body.get("email") or "").strip().lower()
    password = str(body.get("password") or "")
    if "@" not in email:
        return _fail(request, 422, "error", "validation", "Enter an email address.")
    problem = _password_problem(password, email)
    if problem:
        return _fail(request, 422, "error", "validation", problem)
    account_id = str(uuid.uuid4())
    code = "U-" + account_id[:4].upper()
    store.accounts[account_id] = {
        "id": account_id,
        "role": "user",
        "code_name": code,
        "email_hash": hashlib.sha256(email.encode("utf-8")).hexdigest(),
        "password_hash": hash_password(password),
        "created_at": _today(),
    }
    if key_bytes() is not None:
        store.identities[account_id] = {"real_name": encrypt(str(body.get("name") or code)), "email": encrypt(email)}
    token = open_session(store, "user", account_id, actor.get("device_id"))
    response = JSONResponse(_session_body(store, read_session(store, token)))
    _cookie(response, token)
    return response


@router.post("/auth/guest/upgrade")
async def auth_upgrade(request: Request):
    return await auth_signup(request)


@router.get("/auth/session")
def auth_session(request: Request):
    actor = _actor(request)
    if actor is None or actor["role"] == "agent":
        return _fail(request, 401, "unavailable", "unauthenticated", "Sign in to continue.")
    return _session_body(get_store(), actor)


@router.post("/auth/signout")
def auth_signout(request: Request):
    actor = _actor(request)
    if actor is None:
        return _fail(request, 401, "unavailable", "unauthenticated", "Sign in to continue.")
    token = request.cookies.get("ca_session")
    if token:
        get_store().sessions.pop(session_key(token), None)
    response = Response(status_code=204)
    response.delete_cookie("ca_session", path="/")
    return response


@router.get("/me/onboarding")
def read_onboarding(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    owner = actor.get("account_id") or actor.get("device_id")
    return get_store().onboarding.get(owner, {"step": 1, "done": False})


@router.put("/me/onboarding")
async def write_onboarding(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    body = await _json(request)
    step = body.get("step", 1)
    if step not in (1, 2, 3, 4):
        return _fail(request, 422, "error", "validation", "Pick a step from 1 to 4.")
    state = {"step": step, "done": bool(body.get("done"))}
    owner = actor.get("account_id") or actor.get("device_id")
    get_store().onboarding[owner] = state
    return state


@router.get("/me/preferences")
def read_preferences(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    owner = actor.get("account_id") or actor.get("device_id")
    store = get_store()
    return store.preferences.get(owner, {"theme": "system", "lang": "en", "reduceMotion": False, "remindMonthly": False})


@router.put("/me/preferences")
async def write_preferences(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    body = await _json(request)
    owner = actor.get("account_id") or actor.get("device_id")
    store = get_store()
    prev = store.preferences.get(owner, {})
    lang = body.get("lang", prev.get("lang", "en"))
    if lang not in LANGS:
        return _fail(request, 422, "error", "validation", "Choose a language from the list.")
    theme = body.get("theme", prev.get("theme", "system"))
    if theme not in ("dark", "light", "system"):
        return _fail(request, 422, "error", "validation", "Choose a theme the app knows.")
    prefs = {
        **prev,
        "theme": theme,
        "lang": lang,
        "reduceMotion": bool(body.get("reduceMotion")) if "reduceMotion" in body else bool(prev.get("reduceMotion")),
        "remindMonthly": bool(body.get("remindMonthly")) if "remindMonthly" in body else bool(prev.get("remindMonthly")),
    }
    if "checkinAssistant" in body:
        prefs["checkinAssistant"] = bool(body.get("checkinAssistant"))
    if "checkinPlain" in body:
        prefs["checkinPlain"] = bool(body.get("checkinPlain"))
    if "integrationNotify" in body:
        raw = body.get("integrationNotify")
        prefs["integrationNotify"] = list(raw) if isinstance(raw, list) else []
    store.preferences[owner] = prefs
    return prefs


@router.get("/me/memory")
def read_memory(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    owner = actor.get("account_id") or actor.get("device_id")
    rows = get_store().memory.get(owner, {})
    return [{"key": key, "label": key, "value": value} for key, value in rows.items()]


@router.delete("/me/memory")
async def delete_memory(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    body = await _json(request)
    owner = actor.get("account_id") or actor.get("device_id")
    bucket = get_store().memory.get(owner, {})
    keys = body.get("keys")
    if keys:
        for key in keys:
            bucket.pop(key, None)
    else:
        bucket.clear()
    get_store().memory[owner] = bucket
    return Response(status_code=204)


@router.delete("/me")
def delete_me(request: Request):
    actor, denied = _require(request, {"user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    account_id = actor["account_id"]
    store = get_store()
    store.accounts.pop(account_id, None)
    store.identities.pop(account_id, None)
    store.preferences.pop(account_id, None)
    store.memory.pop(account_id, None)
    store.onboarding.pop(account_id, None)
    for token in [key for key, row in store.sessions.items() if row.get("account_id") == account_id]:
        store.sessions.pop(token, None)
    response = Response(status_code=204)
    response.delete_cookie("ca_session", path="/")
    return response


@router.get("/terms")
def list_terms(request: Request, q: str = "", lang: str = "en"):
    if lang not in LANGS:
        return _fail(request, 422, "error", "validation", "Choose a language from the list.")
    if INJECTION.search(q or ""):
        get_store().audit_block("answer", "injection", "blocked", "guest")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    return get_store().search(q)


@router.get("/terms/{term}")
def read_term(term: str, request: Request, lang: str = "en"):
    if lang not in LANGS:
        return _fail(request, 422, "error", "validation", "Choose a language from the list.")
    paused = get_store().feature_paused("faith_mode")
    row = get_store().public_term(term, paused)
    if row is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    return row


@router.get("/terms/{term}/passages")
def term_passages(term: str, request: Request, q: str = ""):
    """Quotes from the loaded sources for a word. Retrieval only: no model writes any of it."""
    from app.v1.sources import find_passages

    store = get_store()
    question = " ".join(q.split())[:200]
    if INJECTION.search(question):
        store.audit_block("passages", "injection", "blocked", "guest")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    if store.terms.get(term.lower()) is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if not store.allow(f"passages:{_client_ip(request)}", 120):
        return _fail(request, 429, "unavailable", "rate_limited", "Try again in a moment.")
    try:
        return find_passages(term, question)
    except Exception:
        return _fail(request, 503, "error", "service_down", "The source texts are not reachable right now.", True)


@router.post("/terms/{term}/edits")
async def create_edit(term: str, request: Request):
    actor, denied = _require(request, {"expert"})
    if denied:
        return denied
    body = await _json(request)
    text = str(body.get("proposed") or body.get("text") or "")
    if INJECTION.search(text):
        get_store().audit_block("expertEdit", "injection", "blocked", "expert")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    if not 10 <= len(text) <= 1200:
        return _fail(request, 422, "error", "validation", "Keep it between 10 and 1200 characters.")
    if get_store().terms.get(term.lower()) is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    edit = {
        "id": str(uuid.uuid4()),
        "term": term.lower(),
        "block": body.get("block") or "parallel",
        "proposed": text,
        "status": "pending_review",
        "submittedAt": _today(),
    }
    get_store().expert_edits.append(edit)
    return edit


@router.get("/review/edits")
def list_edits(request: Request, status: str = "pending"):
    _actor_row, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    rows = get_store().expert_edits
    if status == "decided":
        return [row for row in reversed(rows) if row["status"] != "pending_review"]
    return [row for row in rows if row["status"] == "pending_review"]


@router.get("/review/coverage")
def faith_coverage(request: Request):
    _actor_row, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    out = []
    for row in get_store().terms.values():
        written = bool(row["faith"]) and any(row["faith"].get(block) for block in ("parallel", "difference", "bridge"))
        checks = 2 if row["reviewed"] else len(row.get("checked_by") or [])
        if not written:
            status = "unwritten"
        elif row["reviewed"]:
            status = "checked"
        elif checks == 1:
            status = "one_checked"
        else:
            status = "drafted"
        out.append({"term": row["term"], "status": status, "checks": checks})
    return out


@router.post("/review/coverage/{term}")
def mark_checked(term: str, request: Request):
    actor, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    row = get_store().terms.get(term.lower())
    if row is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if not row["faith"]:
        return _fail(request, 422, "error", "validation", "Nothing is written for this word yet.")
    if row["reviewed"]:
        return {"term": row["term"], "status": "checked", "checks": 2}
    checked_by = row.setdefault("checked_by", [])
    if actor["account_id"] in checked_by:
        return _fail(request, 422, "error", "validation", "A second, different reviewer has to check this.")
    checked_by.append(actor["account_id"])
    if len(checked_by) < 2:
        return {"term": row["term"], "status": "one_checked", "checks": 1}
    row["reviewed"] = True
    row["faith"]["reviewedAt"] = _today()
    return {"term": row["term"], "status": "checked", "checks": 2}


@router.post("/review/edits/{edit_id}")
async def decide_edit(edit_id: str, request: Request):
    actor, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    body = await _json(request)
    edit = next((row for row in get_store().expert_edits if row["id"] == edit_id), None)
    if edit is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if edit["status"] != "pending_review":
        return edit
    edit["status"] = "approved" if body.get("approve") else "rejected"
    edit["reviewedAt"] = _today()
    if edit["status"] == "approved":
        term = get_store().terms.get(edit["term"])
        if term and term["faith"] and edit["block"] in term["faith"]:
            edit["previous"] = term["faith"][edit["block"]]
            term["faith"][edit["block"]] = edit["proposed"]
            term["faith"]["reviewedAt"] = _today()
    return edit


@router.get("/months/current")
def current_month():
    store = get_store()
    open_months = [row for row in store.months.values() if row["open"]]
    if not open_months:
        return _fail_bare(404, "empty", "not_found", "Nothing here yet.")
    month = open_months[-1]
    return {
        "id": month["id"],
        "label": month["label"],
        "question": month["question"],
        "term": month["term"],
        "open": month["open"],
        "closesAt": month["closesAt"],
        "answers": month["answers"],
    }


@router.post("/months/current/answer")
async def submit_answer(request: Request):
    paused = _paused(request, "monthly_answers")
    if paused:
        return paused
    actor = _actor(request)
    if actor is None or actor["role"] == "agent":
        return _fail(request, 401, "unavailable", "unauthenticated", "Sign in to continue.")
    store = get_store()
    device = actor.get("device_id") or actor.get("account_id") or _client_ip(request)
    if not store.allow(f"answer:{device}", 5):
        return _fail(request, 429, "unavailable", "rate_limited", "You've sent a few already.")
    body = await _json(request)
    text = str(body.get("text") or "")
    month = next((row for row in store.months.values() if row["open"]), None)
    if month is None or not month["open"]:
        return _fail(request, 422, "error", "validation", "This month is closed.")
    if len(text.strip()) < 3:
        return _fail(request, 422, "error", "validation", "Write a few words.")
    if len(text) > 280:
        return _fail(request, 422, "error", "validation", "Keep it under 280 characters.")
    category = classify(text)
    if category == "injection":
        store.audit_block("answer", "injection", "blocked", actor["role"])
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    if category in ("sexual", "spam", "threat"):
        store.audit_block("answer", category, "blocked" if category != "spam" else "dropped", actor["role"])
        if category == "spam":
            return _fail(request, 422, "error", "validation", "That doesn't read as words yet.")
        return _fail(request, 403, "blocked", "blocked_policy", "Blocked. Nothing was saved or sent.")
    if category == "unclear":
        return _fail(request, 422, "error", "validation", "That doesn't read as words yet.")
    cleaned, removed = redact(text)
    device_hash = answer_device_hash(month["id"], device)
    replaced = False
    for row in store.answers:
        if row["month_id"] == month["id"] and row["device_hash"] == device_hash:
            row["text_redacted"] = cleaned
            row["category"] = "selfharm" if category == "selfharm" else "ok"
            row["flags"] = ["selfharm"] if category == "selfharm" else []
            replaced = True
            break
    if not replaced:
        store.answers.append(
            {
                "id": str(uuid.uuid4()),
                "month_id": month["id"],
                "device_hash": device_hash,
                "text_redacted": cleaned,
                "lang": body.get("lang") or "en",
                "category": "selfharm" if category == "selfharm" else "hate" if category == "hate" else "ok",
                "flags": [category] if category in ("selfharm", "hate") else [],
                "created_at": month["id"],
            }
        )
        month["answers"] += 1
    if category == "ok":
        _add_draft_ideas(store, month["id"], group_ideas(cleaned))
    published = store.public_map(store.published_months()[-1]) if store.published_months() else None
    labels = [item["id"] for item in (published or {}).get("concepts", [])]
    return {
        "accepted": True,
        "replacedPrevious": replaced,
        "removedDetails": removed,
        "support": category == "selfharm" or bool(CRISIS.search(text)),
        "othersTalkedAbout": labels,
    }


@router.get("/maps/latest/compare")
def compare_maps():
    store = get_store()
    published = store.published_months()
    if not published:
        return _fail_bare(404, "empty", "not_found", "Nothing here yet.")
    current = store.public_map(published[-1])
    previous = store.public_map(published[-2]) if len(published) > 1 else None
    changes = []
    previous_counts = {item["id"]: item["count"] for item in (previous or {}).get("concepts", [])}
    current_counts = {item["id"]: item["count"] for item in current["concepts"]}
    for concept_id in sorted(set(previous_counts) | set(current_counts)):
        before = previous_counts.get(concept_id, 0)
        after = current_counts.get(concept_id, 0)
        if before == 0:
            trend = "new"
        elif after == 0:
            trend = "gone"
        elif after > before:
            trend = "up"
        elif after < before:
            trend = "down"
        else:
            trend = "same"
        changes.append({"id": concept_id, "previous": before, "current": after, "trend": trend})
    return {"current": current, "previous": previous, "changes": changes}


@router.get("/maps/draft")
def read_draft(request: Request):
    _actor_row, denied = _require(request, {"admin"})
    if denied:
        return denied
    return _draft_body()


@router.patch("/maps/draft")
async def edit_draft(request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    body = await _json(request)
    op = body.get("op")
    store = get_store()
    month_id = _draft_month(store)
    concepts = store.concepts.setdefault(month_id, [])
    if op == "rename":
        for concept in concepts:
            if concept["id"] == body.get("concept"):
                concept["id"] = body.get("to")
    elif op == "merge":
        source = body.get("concept")
        target = body.get("into")
        moved = 0
        concepts[:] = [concept for concept in concepts if not (concept["id"] == source and (moved := concept["count"]))]
        for concept in concepts:
            if concept["id"] == target:
                concept["count"] += moved
    elif op == "remove":
        concepts[:] = [concept for concept in concepts if concept["id"] != body.get("concept")]
    else:
        return _fail(request, 422, "error", "validation", "Choose rename, merge, or remove.")
    store.audit_block("answer", "ok", "held", actor["role"])
    return _draft_body()


@router.post("/maps/draft/publish")
async def publish_draft(request: Request):
    paused = _paused(request, "map_publish")
    if paused:
        return paused
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    body = await _json(request)
    if body.get("confirm") != "publish":
        return _fail(request, 422, "error", "validation", "Type publish to continue.")
    store = get_store()
    month_id = _draft_month(store)
    kept = []
    hidden = 0
    for concept in store.concepts.get(month_id, []):
        if concept["count"] < 3:
            hidden += 1
            continue
        noisy = max(0, int(round(concept["count"] + _laplace())))
        if noisy < 3:
            hidden += 1
            continue
        kept.append({"id": concept["id"], "count": noisy, "isNew": concept["isNew"]})
    store.concepts[month_id] = kept
    store.maps[month_id] = {
        "status": "published",
        "published_at": _today(),
        "published_by": actor["account_id"],
        "noise_applied": True,
    }
    for row in store.answers:
        if row["month_id"] == month_id:
            row["text_redacted"] = ""
    store.audit_block("answer", "ok", "counted", actor["role"])
    public = store.public_map(month_id)
    public["hiddenRare"] = hidden
    return public


@router.post("/maps/draft/dismiss")
def dismiss_draft(request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    store = get_store()
    month_id = _draft_month(store)
    store.concepts[month_id] = []
    store.audit_block("answer", "ok", "dropped", actor["role"])
    return Response(status_code=204)


@router.get("/maps/{month_id}")
def read_map(month_id: str):
    if month_id in ("latest", "draft"):
        return _fail_bare(404, "empty", "not_found", "Nothing here yet.")
    public = get_store().public_map(month_id)
    if public is None:
        return _fail_bare(404, "empty", "not_found", "Nothing here yet.")
    return public


@router.get("/pastor/home")
def pastor_home(request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    store = get_store()
    pastor = store.pastors.get(actor["account_id"])
    if pastor is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    church = store.churches[pastor["church_id"]]
    pack = store.packs.get(f"{actor['account_id']}:2026-09")
    pieces = []
    if pack:
        pieces.append({"key": "report", "status": pack["report"]["status"]})
        feedback_status = "in" if all(item["status"] == "in" for item in pack["feedback"]) else "missing"
        pieces.extend(
            [
                {"key": "feedback", "status": feedback_status},
                {"key": "sermon", "status": "missing"},
                {"key": "community", "status": "in" if pack["community"] else "missing"},
                {"key": "evidence", "status": "in" if pack["evidence"] else "missing"},
            ]
        )
    return {
        "first": pastor["first"],
        "church": church["name"],
        "stage": pastor["stage"],
        "mentor": pastor["mentor_name"],
        "since": "In the pipeline since Jan 2026",
        "history": [{"month": "Sep 2026", "note": "Leadership review: Continue in Training"}],
        "season": {"month": "Sep 2026", "pieces": pieces},
    }


@router.get("/pastor/tracks")
def pastor_tracks(request: Request):
    _actor_row, denied = _require(request, {"pastor"})
    if denied:
        return denied
    return {
        "training": [
            {"title": "Foundations of Scripture", "progress": 100, "certificate": True},
            {"title": "Pastoral care basics", "progress": 60, "certificate": False},
        ],
        "documents": [{"title": "Training agreement", "file": "agreement-2026.pdf"}],
        "ministry": [{"title": "Sunday service — reading", "date": "2026-09-21", "source": "Planning Center"}],
        "character": [
            {
                "kind": "Observation",
                "title": "Mentor visit",
                "date": "2026-09-12",
                "note": "Warm with families; kept time well at the youth meeting.",
            }
        ],
        "checkins": {"count": len([row for row in get_store().checkins if row["pastor_id"] == _actor_row["account_id"]]), "days": 30},
    }


@router.get("/pastor/packs/{month}")
def read_pack(month: str, request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    pack = get_store().packs.get(f"{actor['account_id']}:{month}")
    if pack is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    return pack


@router.put("/pastor/packs/{month}")
async def write_pack(month: str, request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    body = await _json(request)
    if "finance" in body or "giving" in body:
        return _fail(request, 422, "error", "validation", "This pack does not take finance.")
    current = get_store().packs.get(f"{actor['account_id']}:{month}")
    if current is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if "report" in body:
        current["report"].update(body["report"])
    return current


@router.post("/pastor/checkins")
async def create_checkin(request: Request):
    paused = _paused(request, "checkins")
    if paused:
        return paused
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    if key_bytes() is None:
        return _fail(request, 503, "error", "service_down", "Check-ins are switched off until the server key is set.", True)
    body = await _json(request)
    client_id = str(body.get("clientId") or "")
    if not client_id:
        return _fail(request, 422, "error", "validation", "A check-in needs a client id.")
    store = get_store()
    existing = next((row for row in store.checkins if row["client_id"] == client_id), None)
    if existing:
        if existing["pastor_id"] != actor["account_id"]:
            return _fail(request, 403, "unavailable", "forbidden", "You cannot open this.")
        return _checkin_response(existing["outcome"])
    struggles = str(body.get("struggles") or "")
    wins = str(body.get("wins") or "")
    for field in (struggles, wins):
        if field and not 3 <= len(field) <= 500:
            return _fail(request, 422, "error", "validation", "Keep it under 500 characters.")
    # Crisis runs before injection so a hard note that also contains an instruction still reaches a person.
    crisis = bool(CRISIS.search(struggles) or CRISIS.search(wins))
    if not crisis and (INJECTION.search(struggles) or INJECTION.search(wins)):
        store.audit_block("checkin", "injection", "blocked", "pastor")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    outcome = "crisis_human_notified" if crisis else "encouragement"
    store.checkins.append(
        {
            "client_id": client_id,
            "pastor_id": actor["account_id"],
            "mood": body.get("mood"),
            "prayed": bool(body.get("prayed")),
            "visits": int(body.get("visits") or 0),
            "struggles_enc": encrypt(struggles),
            "wins_enc": encrypt(wins),
            "lang": body.get("lang") or "en",
            "outcome": outcome,
            "created_at": _today(),
        }
    )
    if crisis:
        store.audit_block("checkin", "selfharm", "routed", "pastor")
    return _checkin_response(outcome)


@router.get("/pastor/mentor-note")
def mentor_note(request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    notes = [row for row in get_store().mentor_notes if row["pastor_id"] == actor["account_id"]]
    if not notes:
        return JSONResponse(content=None)
    latest = notes[-1]
    return {"from": "mentor", "lines": latest["lines"], "at": latest["at"]}


@router.post("/pastor/mentor/message")
async def mentor_message(request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    body = await _json(request)
    text = str(body.get("text") or "")
    if INJECTION.search(text):
        get_store().audit_block("checkin", "injection", "blocked", "pastor")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    return Response(status_code=204)


@router.post("/churches")
async def create_church(request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    body = await _json(request)
    name = str(body.get("name") or "").strip()
    if not name or len(name) > 90:
        return _fail(request, 422, "error", "validation", "Enter a church name.")
    church_id = str(uuid.uuid4())
    get_store().churches[church_id] = {
        "id": church_id,
        "name": name,
        "country": body.get("country") or "",
        "region": str(body.get("region") or "")[:80],
        "join_code": uuid.uuid4().hex[:6].upper(),
    }
    pastor = get_store().pastors.get(actor["account_id"])
    if pastor:
        pastor["church_id"] = church_id
    return get_store().churches[church_id]


@router.post("/churches/join")
async def join_church(request: Request):
    actor, denied = _require(request, {"pastor"})
    if denied:
        return denied
    body = await _json(request)
    code = str(body.get("code") or "")
    church = next((row for row in get_store().churches.values() if row["join_code"] == code), None)
    if church is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    pastor = get_store().pastors.get(actor["account_id"])
    if pastor:
        pastor["church_id"] = church["id"]
    return church


@router.get("/review/queue")
def review_queue(request: Request, cursor: str = ""):
    _actor_row, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    rows = [_queue_item(row) for row in get_store().review_packs.values()]
    if cursor:
        rows = rows[5:]
    return rows[:5]


@router.get("/review/packs/{pack_id}")
def read_review_pack(pack_id: str, request: Request):
    _actor_row, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    pack = get_store().review_packs.get(pack_id)
    if pack is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    item = _queue_item(pack)
    item.update(
        {
            "agent": pack["agent"],
            "history": pack["history"],
            "pack": pack["pack"],
            "checkinCount": sum(1 for row in get_store().checkins if row["pastor_id"] == pack.get("pastor_id")),
            "decisions": [
                {
                    "decision": row["decision"],
                    "note": row["note"],
                    "reviewerRole": row["reviewerRole"],
                    "at": row["at"],
                    "stageBefore": row["stageBefore"],
                    "stageAfter": row["stageAfter"],
                }
                for row in get_store().decisions
                if row["pack_id"] == pack_id
            ],
        }
    )
    return item


@router.post("/review/packs/{pack_id}/ack")
def ack_pack(pack_id: str, request: Request):
    _actor_row, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    store = get_store()
    pack = store.review_packs.get(pack_id)
    if pack is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    reviewer = _actor_row.get("account_id")
    if not any(row["pack_id"] == pack_id and row["reviewer_id"] == reviewer for row in store.acks):
        store.acks.append({"pack_id": pack_id, "reviewer_id": reviewer, "at": _today()})
    return Response(status_code=204)


@router.post("/review/packs/{pack_id}/prepare")
def prepare_pack(pack_id: str, request: Request):
    _actor_row, denied = _require(request, {"agent", "admin"})
    if denied:
        return denied
    store = get_store()
    pack = store.review_packs.get(pack_id)
    if pack is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    current = pack.get("agent") or {}
    if current.get("generatedAt") == _today() and current.get("model") != "template":
        return current
    use_model = os.getenv("FF_L3_AI_ANALYSIS", "true").lower() == "true" and gateway_mode() != "off"
    draft = prepare_packet(pack["pack"], pack["missing"], current.get("routedTo") or "Mentor", gateway_complete if use_model else None)
    if current:
        pack.setdefault("agent_history", []).append(current)
    pack["agent"] = draft
    return draft


@router.post("/review/packs/{pack_id}/decision")
async def decide_pack(pack_id: str, request: Request):
    actor, denied = _require(request, {"reviewer", "admin"})
    if denied:
        return denied
    if actor["role"] == "agent":
        return _fail(request, 403, "unavailable", "forbidden", "A person decides this.")
    body = await _json(request)
    decision = body.get("decision")
    if decision not in ("continue", "development_plan", "additional_review"):
        return _fail(request, 422, "error", "validation", "Choose a decision from the list.")
    pack = get_store().review_packs.get(pack_id)
    if pack is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    repeat = next(
        (
            row
            for row in get_store().decisions
            if row["pack_id"] == pack_id and row["reviewer_id"] == actor["account_id"] and row["decision"] == decision
        ),
        None,
    )
    if repeat:
        return {key: repeat[key] for key in ("decision", "note", "reviewerRole", "at", "stageBefore", "stageAfter")}
    before = pack["stage"]
    after = min(4, before + 1) if decision == "continue" else before
    row = {
        "id": str(uuid.uuid4()),
        "pack_id": pack_id,
        "reviewer_id": actor["account_id"],
        "decision": decision,
        "note": str(body.get("note") or ""),
        "reviewerRole": "mentor",
        "at": _today(),
        "stageBefore": before,
        "stageAfter": after,
        "stage_before": before,
        "stage_after": after,
    }
    get_store().decisions.append(row)
    pack["stage"] = after
    pastor = get_store().pastors.get(pack["pastor_id"])
    if pastor:
        pastor["stage"] = after
    return {
        "decision": decision,
        "note": row["note"],
        "reviewerRole": "mentor",
        "at": row["at"],
        "stageBefore": before,
        "stageAfter": after,
    }


@router.get("/alerts/active")
def active_alerts(region: str = ""):
    rows = []
    for alert in get_store().alerts:
        if alert["status"] != "on":
            continue
        if region and region not in alert["scope"]:
            continue
        rows.append(_alert_body(alert))
    return rows


@router.get("/alerts")
def leader_alerts(request: Request):
    actor, denied = _require(request, {"leader"})
    if denied:
        return denied
    me = actor["account_id"]
    return [
        {**_alert_body(alert), "confirms": len(alert["confirmed_by"]), "mine": me == alert["raised_by"] or me in alert["confirmed_by"]}
        for alert in reversed(get_store().alerts)
        if alert["status"] != "lifted"
    ]


@router.get("/alerts/log")
def alert_log(request: Request):
    _actor_row, denied = _require(request, {"leader"})
    if denied:
        return denied
    return list(reversed(get_store().alert_log))


def _log_alert(action: str, alert: dict) -> None:
    get_store().alert_log.append({"action": action, "scope": alert["scope"], "at": datetime.now(timezone.utc).isoformat(timespec="seconds")})


@router.post("/alerts")
async def raise_alert(request: Request):
    actor, denied = _require(request, {"leader"})
    if denied:
        return denied
    body = await _json(request)
    reason = str(body.get("reason") or "")
    if len(reason) > 140:
        return _fail(request, 422, "error", "validation", "Keep it under 140 characters.")
    scope = str(body.get("scope") or "").strip()
    if not scope:
        return _fail(request, 422, "error", "validation", "Choose a region.")
    if any(row["scope"] == scope and row["status"] != "lifted" for row in get_store().alerts):
        return _fail(request, 422, "error", "validation", "This region already has an alert.")
    alert = {
        "id": str(uuid.uuid4()),
        "scope": scope,
        "reason": reason,
        "status": "waiting",
        "pauses": [],
        "raised_by": actor["account_id"],
        "confirmed_by": [],
        "at": _today(),
    }
    get_store().alerts.append(alert)
    _log_alert("raised", alert)
    return _alert_body(alert)


@router.post("/alerts/{alert_id}/confirm")
def confirm_alert(alert_id: str, request: Request):
    actor, denied = _require(request, {"leader"})
    if denied:
        return denied
    alert = next((row for row in get_store().alerts if row["id"] == alert_id), None)
    if alert is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if actor["account_id"] == alert["raised_by"] or actor["account_id"] in alert["confirmed_by"]:
        return _fail(request, 422, "error", "validation", "Another leader needs to confirm this.")
    alert["confirmed_by"].append(actor["account_id"])
    if len(alert["confirmed_by"]) >= 2:
        alert["status"] = "on"
        alert["pauses"] = list(PAUSES_WHEN_ON)
    _log_alert("on" if alert["status"] == "on" else "confirmed", alert)
    return _alert_body(alert)


@router.post("/alerts/{alert_id}/lift")
def lift_alert(alert_id: str, request: Request):
    _actor_row, denied = _require(request, {"leader"})
    if denied:
        return denied
    alert = next((row for row in get_store().alerts if row["id"] == alert_id), None)
    if alert is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if alert["status"] != "lifted":
        alert["status"] = "lifted"
        alert["pauses"] = []
        _log_alert("cleared", alert)
    return _alert_body(alert)


@router.get("/integrations")
def list_integrations(request: Request):
    actor, denied = _require(request, {"pastor", "admin"})
    if denied:
        return denied
    store = get_store()
    pastor = store.pastors.get(actor["account_id"])
    country = ""
    if pastor:
        country = store.churches[pastor["church_id"]]["country"]
    if country != "US":
        return _fail(request, 404, "empty", "not_found", "Not available yet.")
    return [
        {
            "app": "Planning Center",
            "status": "not_connected",
            "fills": ["ministry", "community"],
            "availableIn": "US",
            "lastSync": None,
            "connectable": bool(os.getenv("PLANNING_CENTER_CLIENT_ID", "").strip()),
        }
    ]


@router.get("/integrations/planning-center/authorize")
def planning_center_authorize(request: Request):
    _actor_row, denied = _require(request, {"pastor", "admin"})
    if denied:
        return denied
    if not os.getenv("PLANNING_CENTER_CLIENT_ID", "").strip():
        return _fail(request, 404, "empty", "not_found", "Not available yet.")
    return RedirectResponse("https://api.planningcenteronline.com/oauth/authorize", status_code=302)


@router.get("/integrations/planning-center/callback")
def planning_center_callback():
    return _fail_bare(404, "empty", "not_found", "Not available yet.")


@router.post("/integrations/{app}/disconnect")
def disconnect_integration(app: str, request: Request):
    _actor_row, denied = _require(request, {"pastor", "admin"})
    if denied:
        return denied
    return _fail(request, 404, "empty", "not_found", "Not available yet.")


@router.post("/integrations/webhook/{app_name}")
async def integration_webhook(app_name: str, request: Request):
    raw = await request.body()
    secret = os.getenv("INTEGRATION_WEBHOOK_SECRET", "").strip()
    signature = request.headers.get("x-signature", "")
    if not secret or not signature:
        return _fail(request, 403, "blocked", "blocked_policy", "Blocked. Nothing was saved or sent.")
    expected = hmac.new(secret.encode("utf-8"), raw, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        return _fail(request, 403, "blocked", "blocked_policy", "Blocked. Nothing was saved or sent.")
    body = await _json_bytes(raw)
    if _contains_stage(body):
        get_store().audit_block("answer", "injection", "blocked", "agent")
        return _fail(request, 403, "blocked", "blocked_policy", "Blocked. Nothing was saved or sent.")
    kind = str(body.get("kind") or "activity")
    if kind not in ("person", "activity", "participation", "document"):
        return _fail(request, 422, "error", "validation", "This app can fill ministry and community only.")
    get_store().imported_rows.append(
        {"church_id": body.get("churchId"), "app": app_name, "kind": kind, "payload": body.get("payload"), "at": _today()}
    )
    return Response(status_code=204)


@router.get("/embed/church/{church_id}")
def embed_church(church_id: str, request: Request):
    expected = os.getenv("EMBED_DEMO_TOKEN", "").strip()
    header = request.headers.get("authorization", "")
    token = header[7:].strip() if header.lower().startswith("bearer ") else ""
    if not expected or token != expected:
        return _fail(request, 404, "empty", "not_found", "Not available yet.")
    store = get_store()
    if church_id not in store.churches:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    published = store.published_months()
    public = store.public_map(published[-1]) if published else None
    return {"monthCounts": {"answers": store.months[published[-1]]["answers"] if published else 0}, "map": public}


@router.post("/feedback/helped")
async def helped(request: Request):
    body = await _json(request)
    surface = body.get("surface")
    if surface == "checkin":
        return _fail(request, 422, "error", "validation", "This question is not asked on a check-in.")
    if surface not in ("word", "monthly"):
        return _fail(request, 422, "error", "validation", "Choose a surface the app knows.")
    get_store().helped.append({"surface": surface, "id": body.get("id"), "value": body.get("value"), "day": _today()})
    return Response(status_code=204)


@router.post("/feedback/report")
async def term_report(request: Request):
    actor, denied = _require(request, {"guest", "user", "expert", "pastor", "mentor", "reviewer", "leader", "admin"})
    if denied:
        return denied
    body = await _json(request)
    term = str(body.get("term") or "").strip().lower()
    block = str(body.get("block") or "parallel").strip()
    text = str(body.get("text") or "").strip()
    if not term or get_store().terms.get(term) is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if not 3 <= len(text) <= 280:
        return _fail(request, 422, "error", "validation", "Write a few words." if len(text) < 3 else "Keep it under 280 characters.")
    if INJECTION.search(text):
        get_store().audit_block("report", "injection", "blocked", actor["role"])
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    owner = actor.get("account_id") or actor.get("device_id")
    store = get_store()
    if any(row["owner"] == owner and row["term"] == term and row["block"] == block for row in store.term_reports):
        return Response(status_code=204)
    store.term_reports.append({"term": term, "block": block, "text": text, "owner": owner, "day": _today()})
    return Response(status_code=204)


@router.post("/feedback/beta-survey")
async def beta_survey(request: Request):
    store = get_store()
    if not store.allow(f"betaSurvey:{_client_ip(request)}", 30):
        return _fail(request, 429, "unavailable", "rate_limited", "Try again in a moment.")
    body = await _json(request)
    answers = body.get("answers") if isinstance(body.get("answers"), dict) else {}
    broken = str(answers.get("broken") or "").strip()
    if broken and INJECTION.search(broken):
        store.audit_block("report", "injection", "blocked", "guest")
        return _fail(request, 403, "blocked", "blocked_injection", "Blocked. Nothing was saved or sent.")
    if broken and len(broken) > 280:
        return _fail(request, 422, "error", "validation", "Keep it under 280 characters.")
    email = str(body.get("email") or "").strip()
    if email and len(email) > 120:
        return _fail(request, 422, "error", "validation", "That email doesn't look right.")
    store.beta_surveys.append(
        {
            "version": str(body.get("version") or "")[:32],
            "submittedAt": str(body.get("submittedAt") or "")[:40],
            "from": str(body.get("from") or "")[:200],
            "device": str(body.get("device") or "")[:16],
            "lang": str(body.get("lang") or "")[:16],
            "answers": answers,
            "email": email or None,
            "day": _today(),
        }
    )
    return Response(status_code=204)


@router.get("/crisis-lines")
def crisis_lines(country: str = ""):
    # A phone number is returned only when a partner has confirmed it.
    # docs/guardrails.md still has that confirmation open, so the line is null-safe text.
    number = os.getenv("CRISIS_LINE_NUMBER", "").strip()
    what = os.getenv("CRISIS_LINE_WHAT", "A person on the team has been notified.").strip()
    return {"country": country or "Bangladesh", "number": number, "what": what}


@router.post("/events")
async def track_event(request: Request):
    body = await _json(request)
    name = body.get("name")
    allowed = {"task_done", "helped_yes", "helped_no", "return_next_month", "guest_upgrade", "alert_on"}
    if name not in allowed:
        return _fail(request, 422, "error", "validation", "That event is not in the list.")
    get_store().events.append({"name": name, "surface": body.get("surface") or "", "day": _today()})
    return Response(status_code=204)


@router.get("/i18n/{lang}")
def i18n_bundle(lang: str):
    if lang not in LANGS:
        return _fail_bare(404, "empty", "not_found", "Nothing here yet.")
    return {"lang": lang, "strings": {"search.title": "Comparative dictionary."} if lang == "en" else {}, "reviewed": True}


@router.get("/status")
def service_status():
    return [
        {"name": "API", "status": "up"},
        {"name": "Database", "status": _probe_database()},
        {"name": "Cache", "status": _probe(_probe_redis)},
        {"name": "Graph database", "status": _probe(_probe_graph)},
        {"name": "Model gateway", "status": "up" if gateway_mode() == "live" else "degraded"},
    ]


def _probe(check) -> str:
    try:
        check()
        return "up"
    except Exception:
        return "down"


def _probe_database() -> str:
    store = get_store()
    if not store.persistent:
        return "degraded" if store.save_error is None else "down"
    if store.save_error:
        return "down"
    import psycopg

    return _probe(lambda: psycopg.connect(os.environ["DATABASE_URL"], connect_timeout=1).close())


def _probe_redis() -> None:
    import redis

    redis.Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"), socket_connect_timeout=1).ping()


def _probe_graph() -> None:
    import socket
    from urllib.parse import urlparse

    parsed = urlparse(os.getenv("GRAPH_DB_URL", "bolt://localhost:7687"))
    socket.create_connection((parsed.hostname or "localhost", parsed.port or 7687), timeout=1).close()


_ADMIN_UI_TO_API = {
    "Admin": "admin",
    "Religion expert": "expert",
    "Pastor": "pastor",
    "Mentor": "reviewer",
    "Church leader": "leader",
    "Regional authority": "leader",
    "Reader": "guest",
}
_ADMIN_API_TO_UI = {
    "admin": "Admin",
    "expert": "Religion expert",
    "pastor": "Pastor",
    "reviewer": "Mentor",
    "leader": "Church leader",
    "guest": "Reader",
}


def _admin_code_name(store, role: str) -> str:
    prefix = {"admin": "A", "expert": "E", "pastor": "P", "reviewer": "R", "leader": "L", "guest": "U"}.get(role, "U")
    n = sum(1 for row in store.accounts.values() if row["role"] == role) + 1
    return f"{prefix}-{1000 + n}"


def _admin_audit(actor: dict, action: str, account_id: str, detail: str = "") -> None:
    get_store().audit.append(
        {
            "kind": "admin",
            "action": action,
            "account_id": account_id,
            "admin_id": actor.get("account_id"),
            "detail": detail[:200],
            "at": _today(),
        }
    )


@router.get("/admin/accounts")
def admin_accounts(request: Request, cursor: str = ""):
    _actor_row, denied = _require(request, {"admin"})
    if denied:
        return denied
    rows = [
        {
            "id": row["id"],
            "pseudonym": row["code_name"],
            "role": row["role"],
            "status": row.get("status") or "active",
            "createdAt": row["created_at"],
        }
        for row in get_store().accounts.values()
    ]
    ids = [row["id"] for row in rows]
    start = ids.index(cursor) + 1 if cursor in ids else 0
    return rows[start : start + 6]


@router.post("/admin/accounts/{account_id}/reveal")
async def reveal_account(account_id: str, request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    body = await _json(request)
    reason = str(body.get("reason") or "")
    if len(reason.strip()) < 10:
        return _fail(request, 422, "error", "validation", "Write a reason of at least 10 characters.")
    if account_id not in get_store().accounts:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if key_bytes() is None:
        return _fail(request, 503, "error", "service_down", "Reveal is switched off until the server key is set.", True)
    log_id = str(uuid.uuid4())
    get_store().reveal_log.append(
        {"id": log_id, "admin_id": actor["account_id"], "account_id": account_id, "reason": reason.strip(), "at": _today()}
    )
    name = reveal_name(get_store(), account_id)
    return {"name": name or "", "logId": log_id, "expiresInSec": 60}


@router.get("/admin/reveal-log")
def reveal_log(request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    store = get_store()
    rows = []
    for row in store.reveal_log:
        admin = store.accounts.get(row["admin_id"])
        rows.append(
            {
                "logId": row["id"],
                "adminPseudonym": admin["code_name"] if admin else "A-0000",
                "accountId": row["account_id"],
                "reason": row["reason"],
                "at": row["at"],
            }
        )
    return rows


@router.post("/admin/accounts/invite")
async def admin_invite(request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    body = await _json(request)
    email = str(body.get("email") or "").strip().lower()
    ui_role = str(body.get("role") or body.get("uiRole") or "Religion expert")
    api_role = _ADMIN_UI_TO_API.get(ui_role) or str(body.get("apiRole") or "")
    if api_role not in ("expert", "pastor", "reviewer", "leader", "admin"):
        return _fail(request, 422, "error", "validation", "Choose a role the app knows.")
    if "@" not in email or len(email) > 120:
        return _fail(request, 422, "error", "validation", "Use an email like name@example.com.")
    store = get_store()
    email_hash = hashlib.sha256(email.encode("utf-8")).hexdigest()
    if any(row.get("email_hash") == email_hash for row in store.accounts.values()):
        return _fail(request, 422, "error", "validation", "That email already has an account.")
    account_id = str(uuid.uuid4())
    code = _admin_code_name(store, api_role)
    store.accounts[account_id] = {
        "id": account_id,
        "role": api_role,
        "code_name": code,
        "email_hash": email_hash,
        "status": "invited",
        "created_at": _today(),
    }
    if key_bytes() is not None:
        store.identities[account_id] = {"real_name": encrypt(""), "email": encrypt(email)}
    _admin_audit(actor, "invite", account_id, ui_role)
    return {"id": account_id, "pseudonym": code, "role": api_role, "status": "invited", "createdAt": _today()}


@router.patch("/admin/accounts/{account_id}")
async def admin_patch_account(account_id: str, request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    store = get_store()
    row = store.accounts.get(account_id)
    if row is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    body = await _json(request)
    if "role" in body:
        raw = str(body.get("role") or "")
        if raw in _ADMIN_UI_TO_API:
            api_role = _ADMIN_UI_TO_API[raw]
        elif raw in _ADMIN_API_TO_UI:
            api_role = raw
        else:
            return _fail(request, 422, "error", "validation", "Choose a role the app knows.")
        row["role"] = api_role
        _admin_audit(actor, "role_change", account_id, api_role)
    if "status" in body:
        status = str(body.get("status") or "")
        if status not in ("active", "invited", "suspended"):
            return _fail(request, 422, "error", "validation", "Choose a status the app knows.")
        if status == "suspended" and actor.get("account_id") == account_id:
            return _fail(request, 422, "error", "validation", "You cannot suspend your own admin account.")
        row["status"] = status
        _admin_audit(actor, "status_change", account_id, status)
    return {
        "id": row["id"],
        "pseudonym": row["code_name"],
        "role": row["role"],
        "status": row.get("status") or "active",
        "createdAt": row["created_at"],
    }


@router.post("/admin/accounts/{account_id}/resend-invite")
async def admin_resend_invite(account_id: str, request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    row = get_store().accounts.get(account_id)
    if row is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    if (row.get("status") or "active") != "invited":
        return _fail(request, 422, "error", "validation", "This account is not waiting on an invite.")
    _admin_audit(actor, "resend_invite", account_id)
    return Response(status_code=204)


@router.post("/admin/accounts/{account_id}/password-reset")
async def admin_password_reset(account_id: str, request: Request):
    actor, denied = _require(request, {"admin"})
    if denied:
        return denied
    row = get_store().accounts.get(account_id)
    if row is None:
        return _fail(request, 404, "empty", "not_found", "Nothing here yet.")
    _admin_audit(actor, "password_reset", account_id)
    return Response(status_code=204)


def _today() -> str:
    return datetime.now(timezone.utc).date().isoformat()


def _fail_bare(status: int, kind: str, code: str, message: str) -> JSONResponse:
    return api_error(status, kind, code, message, str(uuid.uuid4()), status >= 500)


async def _json(request: Request) -> dict:
    try:
        body = await request.json()
    except Exception:
        return {}
    return body if isinstance(body, dict) else {}


async def _json_bytes(raw: bytes) -> dict:
    import json

    try:
        body = json.loads(raw.decode("utf-8") or "{}")
    except Exception:
        return {}
    return body if isinstance(body, dict) else {}


def _contains_stage(value) -> bool:
    if isinstance(value, dict):
        if "stage" in value or "finance" in value or "giving" in value:
            return True
        return any(_contains_stage(item) for item in value.values())
    if isinstance(value, list):
        return any(_contains_stage(item) for item in value)
    return False


def _draft_month(store) -> str:
    for month_id, meta in store.maps.items():
        if meta["status"] == "draft":
            return month_id
    return "2026-10"


def _draft_body() -> dict:
    store = get_store()
    month_id = _draft_month(store)
    month = store.months[month_id]
    concepts = []
    for concept in store.concepts.get(month_id, []):
        concepts.append(
            {
                "id": concept["id"],
                "count": concept["count"],
                "isNew": concept["isNew"],
                "underThreshold": concept["count"] < 3,
            }
        )
    answers = [row["text_redacted"] for row in store.answers if row["month_id"] == month_id and row["category"] == "ok" and row["text_redacted"]]
    flagged = sum(1 for row in store.answers if row["month_id"] == month_id and row["category"] != "ok")
    return {
        "id": month_id,
        "label": month["label"],
        "question": month["question"],
        "term": month["term"],
        "answers": month["answers"],
        "links": store.links.get(month_id, []),
        "status": "draft",
        "concepts": concepts,
        "flagged": flagged,
        "anonymousAnswers": answers,
    }


def _add_draft_ideas(store, month_id: str, ideas: list[str]) -> None:
    concepts = store.concepts.setdefault(month_id, [])
    for idea in ideas:
        found = next((concept for concept in concepts if concept["id"] == idea), None)
        if found:
            found["count"] += 1
        else:
            concepts.append({"id": idea, "count": 1, "isNew": True})


def _laplace() -> float:
    import random

    return random.expovariate(1.0) * (1 if random.random() < 0.5 else -1)


def _checkin_response(outcome: str) -> dict:
    if outcome == "crisis_human_notified":
        number = os.getenv("CRISIS_LINE_NUMBER", "").strip()
        line = None
        if number:
            line = {"country": "Bangladesh", "number": number, "what": os.getenv("CRISIS_LINE_WHAT", "A person has been notified.")}
        return {
            "outcome": outcome,
            "text": "A person has been told, and they can reach you. You are not alone in this.",
            "why": "This note is here because the words needed a person, not a score.",
            "crisisLine": line,
        }
    return {"outcome": "encouragement", "text": ENCOURAGEMENT, "why": ENCOURAGEMENT_WHY, "crisisLine": None}


def _queue_item(pack: dict) -> dict:
    item = {
        "id": pack["id"],
        "region": pack["region"],
        "stage": pack["stage"],
        "since": pack["since"],
        "status": pack["status"],
        "escalated": pack["escalated"],
        "complete": pack["complete"],
        "missing": pack["missing"],
    }
    if pack.get("crisis"):
        item["crisis"] = pack["crisis"]
    return {key: value for key, value in item.items() if key in QUEUE_KEYS}


def _alert_body(alert: dict) -> dict:
    return {
        "id": alert["id"],
        "scope": alert["scope"],
        "reason": alert["reason"],
        "status": alert["status"],
        "at": alert["at"],
        "pauses": alert["pauses"],
    }
