"""Deterministic intake. ADR-002: skip the LLM when the route is already known."""

_ROUTES = {
    "l1_lookup": "l1_lookup",
    "l1_compare": "l1_compare",
}


def route_for_endpoint(endpoint: str) -> dict:
    route = _ROUTES.get(endpoint)
    if route is None:
        return {
            "route": "out_of_scope",
            "confidence": 1.0,
            "reason_code": "unknown_endpoint",
            "method": "deterministic",
        }
    return {
        "route": route,
        "confidence": 1.0,
        "reason_code": "endpoint_implies_layer",
        "method": "deterministic",
    }
