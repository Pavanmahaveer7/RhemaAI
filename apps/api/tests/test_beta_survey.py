from fastapi.testclient import TestClient

from app.main import app

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
