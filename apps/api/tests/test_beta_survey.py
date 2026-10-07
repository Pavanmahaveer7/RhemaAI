from fastapi.testclient import TestClient

from app.main import app
from app.v1.feedback_csv import csv_path, load_surveys
from app.v1.store import reset_store

client = TestClient(app)


def test_beta_survey_accepts_payload():
    payload = {
        "version": "beta-1",
        "submittedAt": "2026-10-07T12:00:00.000Z",
        "from": "landing",
        "device": "desktop",
        "lang": "en-US",
        "answers": {"role": "reader", "easy": 4, "useful": "yes", "fair": "yes", "push": "no", "feel": ["Calm"], "again": "yes", "broken": None, "crisisFlag": False},
        "email": None,
    }
    r = client.post("/api/v1/feedback/beta-survey", json=payload)
    assert r.status_code == 204
    path = csv_path()
    assert path.exists()
    text = path.read_text(encoding="utf-8")
    assert "reader" in text
    assert "Calm" in text


def test_beta_survey_csv_reloads_after_restart():
    client.post(
        "/api/v1/feedback/beta-survey",
        json={"version": "beta-1", "answers": {"role": "pastor", "again": "yes", "easy": 5}, "from": "share"},
    )
    assert csv_path().exists()
    reset_store()
    rows = load_surveys()
    assert any((row.get("answers") or {}).get("role") == "pastor" for row in rows)


def test_admin_can_list_and_export_beta_surveys():
    client.post("/api/v1/feedback/beta-survey", json={"version": "beta-1", "answers": {"role": "reader", "again": "yes", "easy": 5}, "from": "test"})
    denied = client.get("/api/v1/admin/beta-surveys")
    assert denied.status_code == 401
    jar = TestClient(app)
    jar.post("/api/v1/auth/signin", json={"codeName": "A-0100", "password": "dev-only-change-me"})
    listed = jar.get("/api/v1/admin/beta-surveys")
    assert listed.status_code == 200
    body = listed.json()
    assert body["total"] >= 1
    assert body["summary"]["againYes"] >= 1
    csv = jar.get("/api/v1/admin/beta-surveys?format=csv")
    assert csv.status_code == 200
    assert "role" in csv.text
    assert "reader" in csv.text
