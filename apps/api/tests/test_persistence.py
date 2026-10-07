import os

import psycopg
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.v1.store import get_store, reset_store

TEST_URL = os.getenv("TEST_DATABASE_URL", "postgresql://app:app@localhost:5432/church_ai_test")


def _test_db_up() -> bool:
    try:
        psycopg.connect(TEST_URL, connect_timeout=1).close()
        return True
    except Exception:
        return False


needs_db = pytest.mark.skipif(not _test_db_up(), reason="test Postgres is not running (docker compose up postgres)")


@pytest.fixture
def saved_store(monkeypatch):
    monkeypatch.setenv("CONTRACT_STORE", "postgres")
    monkeypatch.setenv("DATABASE_URL", TEST_URL)
    with psycopg.connect(TEST_URL) as conn:
        conn.execute("DROP TABLE IF EXISTS store_state")
        conn.commit()
    store = reset_store()
    assert store.sync_postgres() is None
    return store


def _restart():
    store = reset_store()
    assert store.sync_postgres() is None
    return store


@needs_db
def test_a_monthly_answer_survives_a_restart(saved_store):
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    before = saved_store.months["2026-10"]["answers"]
    assert jar.post("/api/v1/months/current/answer", json={"text": "Faith is trust in hard seasons"}).status_code == 200

    store = _restart()
    assert store.months["2026-10"]["answers"] == before + 1
    assert any("trust" in row["text_redacted"] for row in store.answers)


@needs_db
def test_a_session_and_onboarding_survive_a_restart(saved_store):
    jar = TestClient(app)
    jar.post("/api/v1/auth/guest")
    jar.put("/api/v1/me/onboarding", json={"step": 4, "done": True})

    _restart()
    assert jar.get("/api/v1/auth/session").json()["kind"] == "guest"
    assert jar.get("/api/v1/me/onboarding").json() == {"step": 4, "done": True}


@needs_db
def test_a_check_in_is_saved_encrypted(saved_store):
    jar = TestClient(app)
    jar.post("/api/v1/auth/signin", json={"codeName": "P-0233", "password": "dev-only-change-me"})
    body = {"clientId": "persist-1", "clientCreatedAt": "2026-10-07T00:00:00Z", "lang": "en", "mood": 4,
            "prayed": True, "visits": 2, "struggles": "Long walk to the outer village", "wins": "Two families came"}
    assert jar.post("/api/v1/pastor/checkins", json=body).status_code == 200

    with psycopg.connect(TEST_URL) as conn:
        (saved,) = conn.execute("SELECT data::text FROM store_state WHERE name = 'checkins'").fetchone()
    assert "persist-1" in saved
    assert "outer village" not in saved
    assert any(row["client_id"] == "persist-1" for row in _restart().checkins)


def test_memory_mode_saves_nothing():
    assert get_store().persistent is False
