"""Phase 2a: request size, cross-site writes, hashed sessions, passwords, two reviewers."""

import json

from fastapi.testclient import TestClient

from app.main import app
from app.v1.store import answer_device_hash, get_store, read_session, session_key

client = TestClient(app)


def test_a_body_over_16kb_is_refused():
    response = client.post("/api/v1/auth/guest", content=b'{"pad":"' + b"x" * 17000 + b'"}', headers={"content-type": "application/json"})
    assert response.status_code == 413
    assert response.json()["error"]["code"] == "validation"
    assert "requestId" in response.json()["error"]


def test_a_cookie_write_from_another_site_is_refused():
    jar = TestClient(app)
    assert jar.post("/api/v1/auth/guest").status_code == 200
    blocked = jar.put("/api/v1/me/onboarding", json={"step": 2, "done": False}, headers={"origin": "https://evil.example"})
    assert blocked.status_code == 403
    assert blocked.json()["error"]["code"] == "forbidden"
    allowed = jar.put(
        "/api/v1/me/onboarding",
        json={"step": 2, "done": False},
        headers={"origin": "http://localhost:3000"},
    )
    assert allowed.status_code == 200


def test_production_refuses_a_cookie_write_with_no_origin(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")
    jar = TestClient(app)
    guest = jar.post("/api/v1/auth/guest")
    assert guest.status_code == 200
    # The production cookie is Secure, so the test client will not resend it over http.
    token = guest.headers["set-cookie"].split("ca_session=", 1)[1].split(";", 1)[0]
    blocked = jar.put("/api/v1/me/onboarding", json={"step": 2, "done": False}, headers={"cookie": f"ca_session={token}"})
    assert blocked.status_code == 403


def test_session_tokens_are_stored_as_hashes():
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    token = jar.cookies.get("ca_session")
    assert token not in get_store().sessions
    assert session_key(token) in get_store().sessions
    assert jar.get("/api/v1/auth/session").json()["kind"] == "guest"


def test_signup_stores_a_password_hash_and_signs_in_with_it():
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    created = jar.post("/api/v1/auth/signup", json={"email": "reader@example.com", "name": "Reader", "password": "Openpage1"})
    assert created.status_code == 200
    saved = json.dumps(get_store().accounts)
    assert "Openpage1" not in saved
    assert "scrypt$" in saved
    jar.post("/api/v1/auth/signout")
    signed = jar.post("/api/v1/auth/signin", json={"codeName": "reader@example.com", "password": "Openpage1"})
    assert signed.status_code == 200
    assert signed.json()["kind"] == "user"
    wrong = jar.post("/api/v1/auth/signin", json={"codeName": "reader@example.com", "password": "dev-only-change-me"})
    assert wrong.status_code == 401
    short = TestClient(app)
    short.post("/api/v1/auth/guest")
    assert short.post("/api/v1/auth/signup", json={"email": "a@b.co", "password": "short"}).status_code == 422


def test_production_refuses_the_shared_staff_password(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")
    response = client.post("/api/v1/auth/signin", json={"codeName": "P-0233", "password": "dev-only-change-me"})
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "service_down"


def test_faith_mode_needs_two_different_reviewers():
    reviewer = TestClient(app)
    reviewer.post("/api/v1/auth/signin", json={"codeName": "R-0100", "password": "dev-only-change-me"})
    first = reviewer.post("/api/v1/review/coverage/marriage")
    assert first.status_code == 200
    assert first.json() == {"term": "marriage", "status": "one_checked", "checks": 1}
    assert client.get("/api/v1/terms/marriage").json()["faith"] is None
    again = reviewer.post("/api/v1/review/coverage/marriage")
    assert again.status_code == 422
    admin = TestClient(app)
    admin.post("/api/v1/auth/signin", json={"codeName": "A-0100", "password": "dev-only-change-me"})
    second = admin.post("/api/v1/review/coverage/marriage")
    assert second.json()["status"] == "checked"
    assert client.get("/api/v1/terms/marriage").json()["faith"]["reviewedAt"]
    rows = {row["term"]: row["status"] for row in admin.get("/api/v1/review/coverage").json()}
    assert rows["ways of living"] == "drafted"
    assert rows["marriage"] == "checked"


def test_an_answer_hash_changes_with_the_month():
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    device = read_session(get_store(), jar.cookies.get("ca_session"))["device_id"]
    assert jar.post("/api/v1/months/current/answer", json={"text": "Faith is trust in hard seasons"}).status_code == 200
    month_id = next(row["id"] for row in get_store().months.values() if row["open"])
    stored = get_store().answers[-1]["device_hash"]
    assert stored == answer_device_hash(month_id, device)
    assert stored != answer_device_hash("2026-09", device)


def test_signup_is_rate_limited_per_ip(monkeypatch):
    monkeypatch.setenv("AUTH_SIGNUP_RATE_PER_HOUR", "2")
    for i in range(2):
        jar = TestClient(app)
        jar.post("/api/v1/auth/guest")
        ok = jar.post("/api/v1/auth/signup", json={"email": f"u{i}@example.com", "name": "U", "password": "Openpage1"})
        assert ok.status_code == 200
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    blocked = jar.post("/api/v1/auth/signup", json={"email": "u3@example.com", "name": "U", "password": "Openpage1"})
    assert blocked.status_code == 429
    assert blocked.json()["error"]["code"] == "rate_limited"


def test_production_cors_excludes_localhost(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")
    monkeypatch.setenv("APP_BASE_URL", "https://app.example.com")
    monkeypatch.setenv("CORS_ORIGINS", "https://www.example.com")
    from app.main import _cors_origins

    origins = set(_cors_origins())
    assert "http://localhost:3000" not in origins
    assert "https://app.example.com" in origins
    assert "https://www.example.com" in origins


def test_unhandled_errors_return_api_error_without_trace(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")

    @app.get("/api/v1/__test_unhandled")
    def _boom():
        raise RuntimeError("secret-stack-detail")

    try:
        response = TestClient(app, raise_server_exceptions=False).get("/api/v1/__test_unhandled")
        assert response.status_code == 500
        body = response.json()
        assert body["error"]["code"] == "internal"
        assert "secret-stack-detail" not in response.text
        assert "traceback" not in response.text.lower()
    finally:
        app.router.routes = [r for r in app.router.routes if getattr(r, "path", None) != "/api/v1/__test_unhandled"]


def test_a_self_harm_checkin_is_stored_and_routed_to_a_person():
    pastor = TestClient(app)
    pastor.post("/api/v1/auth/signin", json={"codeName": "P-0233", "password": "dev-only-change-me"})
    response = pastor.post(
        "/api/v1/pastor/checkins",
        json={"clientId": "ck-route", "lang": "en", "mood": 5, "prayed": False, "visits": 0,
              "struggles": "I want to die and I cannot see tomorrow.", "wins": "I told someone."},
    )
    assert response.status_code == 200
    assert response.json()["outcome"] == "crisis_human_notified"
    saved = json.dumps(get_store().checkins)
    assert "want to die" not in saved
    assert any(row["category"] == "selfharm" and row["action"] == "routed" for row in get_store().audit)
