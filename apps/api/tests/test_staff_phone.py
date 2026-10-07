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


def test_staff_phone_wrong_code():
    client.post("/api/v1/auth/staff/phone/send", json={"phone": "15550108888"})
    reg = client.post(
        "/api/v1/auth/staff/phone/register",
        json={"phone": "15550108888", "code": "000000", "password": "StaffDemo1!"},
    )
    assert reg.status_code == 422
