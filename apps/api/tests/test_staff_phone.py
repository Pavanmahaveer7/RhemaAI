"""Staff phone OTP registration (beta demo surfaces code in JSON)."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_staff_phone_send_and_register():
    send = client.post("/api/v1/auth/staff/phone/send", json={"phone": "+1 (555) 010-9999"})
    assert send.status_code == 200
    body = send.json()
    assert body.get("demoCode")
    assert len(body["demoCode"]) == 6
    code = body["demoCode"]
    reg = client.post(
        "/api/v1/auth/staff/phone/register",
        json={"phone": "15550109999", "code": code, "password": "StaffDemo1!", "displayName": "Demo Pastor"},
    )
    assert reg.status_code == 200
    data = reg.json()
    assert data["kind"] == "pastor"
    assert data["assignedCode"].startswith("P-")
    assert reg.cookies.get("ca_session")


def test_staff_phone_signin_after_register():
    send = client.post("/api/v1/auth/staff/phone/send", json={"phone": "+15550107777"})
    code = send.json()["demoCode"]
    reg = client.post(
        "/api/v1/auth/staff/phone/register",
        json={"phone": "15550107777", "code": code, "password": "StaffDemo2!", "displayName": "Phone Pastor"},
    )
    assert reg.status_code == 200
    client.post("/api/v1/auth/signout")
    send2 = client.post("/api/v1/auth/staff/phone/send", json={"phone": "15550107777", "intent": "signin"})
    assert send2.status_code == 200
    code2 = send2.json()["demoCode"]
    signin = client.post("/api/v1/auth/staff/phone/signin", json={"phone": "15550107777", "code": code2})
    assert signin.status_code == 200
    assert signin.json()["kind"] == "pastor"
    assert signin.cookies.get("ca_session")


def test_staff_phone_wrong_code():
    client.post("/api/v1/auth/staff/phone/send", json={"phone": "15550108888"})
    reg = client.post(
        "/api/v1/auth/staff/phone/register",
        json={"phone": "15550108888", "code": "000000", "password": "StaffDemo1!"},
    )
    assert reg.status_code == 422


def test_staff_phone_signin_send_unknown_number_is_uniform():
    response = client.post(
        "/api/v1/auth/staff/phone/send",
        json={"phone": "+1 (555) 000-0001", "intent": "signin"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body.get("delivery") == "sms_pending"
    assert "demoCode" not in body


def test_staff_phone_disabled_in_production_by_default(monkeypatch):
    monkeypatch.setenv("APP_ENV", "production")
    monkeypatch.delenv("STAFF_PHONE_REGISTER", raising=False)
    isolated = TestClient(app)
    response = isolated.post("/api/v1/auth/staff/phone/send", json={"phone": "+15550109999"})
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "feature_off"
