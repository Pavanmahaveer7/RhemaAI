from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_is_ok():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    assert response.headers.get("x-request-id")


def test_ready_is_explicit_when_deps_are_down(monkeypatch):
    def boom():
        raise ConnectionError("down")

    monkeypatch.setattr("app.main._check_postgres", boom)
    monkeypatch.setattr("app.main._check_redis", boom)
    monkeypatch.setattr("app.main._check_graph", boom)
    response = client.get("/ready")
    assert response.status_code == 503
    body = response.json()
    assert body["error"]["code"] == "NOT_READY"
    assert body["checks"]["postgres"] == "fail"
    assert body["checks"]["llm_gateway"] == "ok"
