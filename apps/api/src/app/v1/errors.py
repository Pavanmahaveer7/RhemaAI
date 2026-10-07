"""ApiError from contract/types.ts. Short message, request id, no stack trace."""

from fastapi.responses import JSONResponse


def api_error(status: int, kind: str, code: str, message: str, request_id: str, retryable: bool = False) -> JSONResponse:
    return JSONResponse(
        status_code=status,
        content={
            "error": {
                "kind": kind,
                "code": code,
                "message": message,
                "requestId": request_id,
                "retryable": retryable,
            }
        },
    )
