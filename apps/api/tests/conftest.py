import os

os.environ["CONTRACT_STORE"] = "memory"
os.environ["DEMO_SIGNIN_PASSWORD"] = "dev-only-change-me"
os.environ["CHECKIN_ENCRYPTION_KEY"] = "test-only-checkin-key"
os.environ["AGENT_SERVICE_TOKEN"] = "test-agent-token"
os.environ["INTEGRATION_WEBHOOK_SECRET"] = "test-webhook-secret"

import pytest

from app.v1.store import reset_store


@pytest.fixture(autouse=True)
def fresh_contract_store(tmp_path, monkeypatch):
    monkeypatch.setenv("FEEDBACK_CSV_PATH", str(tmp_path / "rhema-beta-feedback.csv"))
    reset_store()
    yield
