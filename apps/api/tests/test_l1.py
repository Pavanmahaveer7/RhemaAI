import pytest
from fastapi.testclient import TestClient

from agents.intake import route_for_endpoint
from app.main import app
from guardrails.tools import ToolError, call_tool


def _vocab_db_up() -> bool:
    try:
        from vocab_mcp.store import connect

        with connect():
            return True
    except Exception:
        return False


needs_db = pytest.mark.skipif(not _vocab_db_up(), reason="vocab Postgres is not running (docker compose up)")
client = TestClient(app)


def test_intake_lookup_is_deterministic():
    routed = route_for_endpoint("l1_lookup")
    assert routed["route"] == "l1_lookup"
    assert routed["method"] == "deterministic"
    assert routed["confidence"] == 1.0


def test_tool_rejects_unknown_name():
    try:
        call_tool("vocab.drop_table", {}, role="public", handler=lambda params: {})
        raised = False
    except ToolError as exc:
        raised = exc.code == "FORBIDDEN"
    assert raised


def test_there_is_no_public_faith_path():
    response = client.get("/api/l1/terms/karma/faith")
    assert response.status_code == 404


@needs_db
def test_search_karma():
    response = client.get("/api/l1/terms", params={"q": "karma"})
    assert response.status_code == 200
    body = response.json()
    assert body["intake"]["method"] == "deterministic"
    assert any(item["term"] == "karma" for item in body["results"])


@needs_db
def test_term_detail_is_dictionary_only():
    response = client.get("/api/l1/terms/karma")
    assert response.status_code == 200
    body = response.json()
    assert body["mode"] == "normal"
    assert body["short_definition"]
    assert body["tradition_tags"]
    assert body["sources"]
    assert "hindu_context" not in body
    assert "christian_bridge" not in body
    assert "parallel" not in body


@needs_db
def test_unknown_term_is_visible():
    response = client.get("/api/l1/terms/not-a-real-term")
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
