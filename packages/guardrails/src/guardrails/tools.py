"""Tool guardrail wrapper. Agents and the API call tools only through this."""

from collections.abc import Callable

ALLOWED_TOOLS = {
    "vocab.lookup_term": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "vocab.lookup_faith": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
    "vocab.search_terms": {"roles": {"public", "pastor", "admin", "system"}, "mode": "read"},
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


def _sanitise(value):
    if isinstance(value, str):
        lowered = value.lower()
        if "ignore previous" in lowered or "ignore your rules" in lowered:
            return "[removed instruction-like text]"
        return value[:4000]
    if isinstance(value, list):
        return [_sanitise(item) for item in value[:50]]
    if isinstance(value, dict):
        return {key: _sanitise(item) for key, item in value.items()}
    return value
