import json
from unittest import mock

from app.v1.workflow_events import emit_workflow_event


def test_emit_without_url_is_noop():
    emit_workflow_event("test.event", {"ok": True})


def test_emit_starts_background_post(monkeypatch):
    calls = []

    class FakeResp:
        def __enter__(self):
            return self

        def __exit__(self, *a):
            return False

        def read(self):
            return b""

    def fake_urlopen(req, timeout=0):
        calls.append((req.full_url, req.data))
        return FakeResp()

    monkeypatch.setenv("N8N_WEBHOOK_URL", "http://127.0.0.1:9999/hook")
    monkeypatch.setenv("INTEGRATION_WEBHOOK_SECRET", "test-webhook-secret")
    monkeypatch.setattr("urllib.request.urlopen", fake_urlopen)
    emit_workflow_event("checkin.crisis", {"client_id": "ck-1"})
    import time

    for _ in range(50):
        if calls:
            break
        time.sleep(0.02)
    assert calls
    url, data = calls[0]
    assert url == "http://127.0.0.1:9999/hook"
    body = json.loads(data.decode())
    assert body["event"] == "checkin.crisis"
    assert body["client_id"] == "ck-1"