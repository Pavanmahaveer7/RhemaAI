from fastapi.testclient import TestClient

from app.main import app


def guest_client() -> TestClient:
    jar = TestClient(app)
    assert jar.post("/api/v1/auth/guest").status_code == 200
    return jar


def test_report_guest_ok():
    guest = guest_client()
    r = guest.post("/api/v1/feedback/report", json={"term": "karma", "block": "parallel", "text": "This wording feels misleading to me."})
    assert r.status_code == 204
    dup = guest.post("/api/v1/feedback/report", json={"term": "karma", "block": "parallel", "text": "Another note."})
    assert dup.status_code == 204


def test_report_validation():
    guest = guest_client()
    short = guest.post("/api/v1/feedback/report", json={"term": "karma", "block": "parallel", "text": "no"})
    assert short.status_code == 422
