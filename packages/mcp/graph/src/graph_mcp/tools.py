"""graph.* handlers. Call them through guardrails.tools.call_tool."""

import re

from guardrails.tools import ToolError

from graph_mcp.backend import (
    GraphError,
    backend,
    from_graph_doc,
    neighbors,
    reject_people_fields,
)

MONTH = re.compile(r"^[0-9]{4}-[0-9]{2}$")


def fetch_responses(params: dict) -> dict:
    try:
        month = _month(params.get("month") or params.get("question_id"))
        limit = int(params.get("limit") or 50)
        rows = backend().fetch_responses(month, limit)
    except GraphError as exc:
        raise ToolError(exc.code, exc.message) from exc
    return {
        "question_id": str(params.get("question_id") or month)[:80],
        "month": month,
        "responses": rows,
        "count": len(rows),
    }


def query_concept(params: dict) -> dict:
    try:
        label = str(params.get("label") or params.get("concept") or "").strip()
        month = params.get("month")
        month_key = _month(month) if month else None
        k = int(params.get("k") or 8)
        snapshot = backend().get_snapshot(month_key)
    except GraphError as exc:
        raise ToolError(exc.code, exc.message) from exc
    if snapshot is None:
        return {"concept": label, "found": False, "weight": 0, "neighbors": [], "month": month_key}
    found = neighbors(snapshot, label, k)
    found["month"] = snapshot.get("month") or month_key
    return found


def get_previous_snapshot(params: dict) -> dict:
    question_id = str(params.get("question_id") or "").strip()[:80]
    snapshot = backend().get_snapshot(_maybe_month(question_id))
    if snapshot is None:
        return {"question_id": question_id, "found": False, "nodes": [], "edges": []}
    return {
        "question_id": snapshot.get("question_id") or question_id,
        "month": snapshot.get("month"),
        "found": True,
        "nodes": snapshot.get("nodes") or [],
        "edges": snapshot.get("edges") or [],
        "stats": snapshot.get("stats") or {"responses_processed": 0, "flagged_inputs": 0, "engine": "networkx"},
    }


def save_graph_snapshot(params: dict) -> dict:
    try:
        question_id = str(params.get("question_id") or "").strip()[:80]
        month = _month(params.get("month"))
        graph = params.get("graph")
        if not isinstance(graph, dict):
            raise GraphError("VALIDATION_ERROR", "graph must be an object")
        reject_people_fields(graph)
        key = str(params.get("idempotency_key") or "").strip()
        existing = backend().get_snapshot(month)
        if existing and existing.get("idempotency_key") == key:
            return {**existing, "reused": True}
        payload = from_graph_doc(graph, question_id=question_id, month=month)
        saved = backend().save_snapshot(month, payload, key)
    except GraphError as exc:
        raise ToolError(exc.code, exc.message) from exc
    return {**saved, "reused": False}


def _maybe_month(value: str | None) -> str | None:
    text = str(value or "").strip()
    if MONTH.fullmatch(text):
        return text
    return None


def _month(value) -> str:
    text = str(value or "").strip()
    if not MONTH.fullmatch(text):
        raise GraphError("VALIDATION_ERROR", "month must be YYYY-MM")
    return text
