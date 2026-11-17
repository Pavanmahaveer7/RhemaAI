"""Fire-and-forget hooks for n8n (or any automation). Never blocks the API response; no Care note text."""

import hashlib
import hmac
import json
import os
import threading
import urllib.error
import urllib.request
from datetime import datetime, timezone


def _webhook_url() -> str:
    return (
        os.getenv("ESCALATION_NOTIFY_WEBHOOK", "").strip()
        or os.getenv("N8N_WEBHOOK_URL", "").strip()
    )


def emit_workflow_event(event: str, payload: dict) -> None:
    """POST a small JSON event to n8n. Ignored when no URL is configured."""
    url = _webhook_url()
    if not url:
        return
    safe = {k: v for k, v in payload.items() if v is not None}
    body = json.dumps(
        {"event": event, "at": datetime.now(timezone.utc).isoformat(), **safe},
        default=str,
    ).encode("utf-8")
    secret = os.getenv("INTEGRATION_WEBHOOK_SECRET", "").strip()

    def _send() -> None:
        try:
            req = urllib.request.Request(url, data=body, method="POST")
            req.add_header("Content-Type", "application/json")
            req.add_header("User-Agent", "rhema-ai-workflow/1")
            if secret:
                req.add_header("X-Signature", hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest())
            urllib.request.urlopen(req, timeout=10)
        except (urllib.error.URLError, TimeoutError, OSError):
            pass

    threading.Thread(target=_send, daemon=True).start()