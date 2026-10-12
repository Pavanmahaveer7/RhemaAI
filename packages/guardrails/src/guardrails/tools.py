"""Tool guardrail wrapper. Agents and the API call tools only through this."""

import re
from collections.abc import Callable

ALLOWED_TOOLS = {
    "vocab.lookup_term": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "vocab.lookup_faith": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "vocab.search_terms": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "vocab.search_sources": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "graph.fetch_responses": {"roles": {"admin", "system"}, "mode": "read"},
    "graph.query_concept": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "graph.get_previous_snapshot": {"roles": {"admin", "system"}, "mode": "read"},
    "graph.save_graph_snapshot": {"roles": {"system"}, "mode": "write"},
}


class ToolError(Exception):
    def __init__(self, code: str, message: str) -> None:
        self.code = code
        self.message = message
        super().__init__(message)


def call_tool(name: str, params: dict, *, role: str, handler: Callable[[dict], dict]) -> dict:
    spec = ALLOWED_TOOLS.get(name)
    if spec is None:
        raise ToolError("FORBIDDEN", f"tool {name} is not allowlisted")
    if role not in spec["roles"]:
        raise ToolError("FORBIDDEN", "role is not allowed to call this tool")
    if not isinstance(params, dict):
        raise ToolError("VALIDATION_ERROR", "tool params must be an object")
    _validate(name, params)
    result = handler(params)
    if not isinstance(result, dict):
        raise ToolError("VALIDATION_ERROR", "tool result must be an object")
    return _sanitise(result)


def _validate(name: str, params: dict) -> None:
    if name in {"vocab.lookup_term", "vocab.lookup_faith"}:
        term = params.get("term")
        if not isinstance(term, str) or not term.strip() or len(term) > 200:
            raise ToolError("VALIDATION_ERROR", "term must be 1-200 characters")
    if name == "vocab.search_terms":
        query = params.get("q", "")
        if not isinstance(query, str) or len(query) > 200:
            raise ToolError("VALIDATION_ERROR", "query must be at most 200 characters")
    if name == "vocab.search_sources":
        query = params.get("query", "")
        if not isinstance(query, str) or not query.strip() or len(query) > 200:
            raise ToolError("VALIDATION_ERROR", "query must be 1-200 characters")
        traditions = params.get("traditions")
        if traditions is None:
            traditions = []
        if not isinstance(traditions, list) or any(not isinstance(item, str) for item in traditions):
            raise ToolError("VALIDATION_ERROR", "traditions must be a list of names")
        allowed = {"hindu", "buddhist", "christian"}
        if any(item.strip().lower() not in allowed for item in traditions if item.strip()):
            raise ToolError("VALIDATION_ERROR", "traditions must be hindu, buddhist, or christian")
        k = params.get("k", 8)
        if not isinstance(k, int) or isinstance(k, bool) or k < 1 or k > 8:
            raise ToolError("VALIDATION_ERROR", "k must be an integer from 1 to 8")
    if name == "graph.fetch_responses":
        _require_id(params.get("question_id"), "question_id")
        _require_month(params.get("month"))
        limit = params.get("limit", 50)
        if not isinstance(limit, int) or isinstance(limit, bool) or limit < 1 or limit > 200:
            raise ToolError("VALIDATION_ERROR", "limit must be an integer from 1 to 200")
    if name == "graph.query_concept":
        label = params.get("label")
        if not isinstance(label, str) or not label.strip() or len(label) > 60:
            raise ToolError("VALIDATION_ERROR", "label must be 1-60 characters")
        if params.get("month") is not None:
            _require_month(params.get("month"))
        k = params.get("k", 8)
        if not isinstance(k, int) or isinstance(k, bool) or k < 1 or k > 12:
            raise ToolError("VALIDATION_ERROR", "k must be an integer from 1 to 12")
    if name == "graph.get_previous_snapshot":
        _require_id(params.get("question_id"), "question_id")
    if name == "graph.save_graph_snapshot":
        _require_id(params.get("question_id"), "question_id")
        _require_month(params.get("month"))
        key = params.get("idempotency_key")
        if not isinstance(key, str) or not (8 <= len(key.strip()) <= 80):
            raise ToolError("VALIDATION_ERROR", "idempotency_key must be 8-80 characters")
        graph = params.get("graph")
        if not isinstance(graph, dict):
            raise ToolError("VALIDATION_ERROR", "graph must be an object")
        nodes = graph.get("nodes")
        edges = graph.get("edges")
        if not isinstance(nodes, list) or len(nodes) > 200:
            raise ToolError("VALIDATION_ERROR", "nodes must be a list of at most 200")
        if not isinstance(edges, list) or len(edges) > 1000:
            raise ToolError("VALIDATION_ERROR", "edges must be a list of at most 1000")


def _require_id(value, field: str) -> None:
    if not isinstance(value, str) or not value.strip() or len(value) > 80:
        raise ToolError("VALIDATION_ERROR", f"{field} must be 1-80 characters")


def _require_month(value) -> None:
    if not isinstance(value, str) or not re.fullmatch(r"[0-9]{4}-[0-9]{2}", value.strip()):
        raise ToolError("VALIDATION_ERROR", "month must be YYYY-MM")


def _sanitise(value):
    if isinstance(value, str):
        lowered = value.lower()
        if "ignore previous" in lowered or "ignore your rules" in lowered:
            return "[removed instruction-like text]"
        return value[:4000]
    if isinstance(value, list):
        return [_sanitise(item) for item in value[:200]]
    if isinstance(value, dict):
        return {key: _sanitise(item) for key, item in value.items()}
    return value
