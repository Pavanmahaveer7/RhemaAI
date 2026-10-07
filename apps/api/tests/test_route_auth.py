"""Protected routes must fail closed without a session or with the wrong role."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _signin(code: str = "A-0100") -> TestClient:
    jar = TestClient(app)
    jar.post("/api/v1/auth/signin", json={"codeName": code, "password": "dev-only-change-me"})
    return jar


def test_sensitive_routes_require_sign_in():
    cases = [
        ("GET", "/api/v1/pastor/home"),
        ("GET", "/api/v1/maps/draft"),
        ("GET", "/api/v1/review/queue"),
        ("GET", "/api/v1/admin/accounts"),
        ("GET", "/api/v1/pastor/tracks"),
        ("GET", "/api/v1/integrations"),
    ]
    for method, path in cases:
        response = client.request(method, path)
        assert response.status_code == 401, path
        assert response.json()["error"]["code"] == "unauthenticated"


def test_guest_cannot_open_pastor_or_admin_routes():
    guest = TestClient(app)
    guest.post("/api/v1/auth/guest")
    for path in ("/api/v1/pastor/home", "/api/v1/admin/accounts", "/api/v1/maps/draft"):
        response = guest.get(path)
        assert response.status_code == 403, path
        assert response.json()["error"]["code"] == "forbidden"


def test_pastor_cannot_open_admin_routes():
    pastor = _signin("P-0233")
    response = pastor.get("/api/v1/admin/accounts")
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "forbidden"


def test_public_layer_stays_open_without_sign_in():
    assert client.get("/api/v1/terms?q=faith").status_code == 200
    assert client.get("/api/v1/months/current").status_code == 200
    assert client.get("/api/v1/status").status_code == 200
