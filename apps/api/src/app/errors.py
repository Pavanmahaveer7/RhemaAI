def error_body(code: str, message: str, request_id: str, **extra) -> dict:
    body = {"error": {"code": code, "message": message, "request_id": request_id}}
    body.update(extra)
    return body


def request_id_from(request) -> str:
    return getattr(request.state, "request_id", "missing")
