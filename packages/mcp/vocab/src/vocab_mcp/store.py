"""Postgres access for L1 dictionary data. Not called from inside an agent."""

import os

import psycopg
from psycopg.rows import dict_row

from vocab_mcp.seed import SEED_SOURCES, SEED_TERMS

SCHEMA = """
CREATE TABLE IF NOT EXISTS term (
  id TEXT PRIMARY KEY,
  term TEXT UNIQUE NOT NULL,
  short_definition TEXT NOT NULL,
  tradition_tags TEXT[] NOT NULL DEFAULT '{}'
);
CREATE TABLE IF NOT EXISTS source_chunk (
  id TEXT PRIMARY KEY,
  tradition TEXT NOT NULL,
  work TEXT NOT NULL,
  reference TEXT NOT NULL,
  translation TEXT,
  license TEXT NOT NULL,
  text TEXT NOT NULL,
  topic_tags TEXT[] NOT NULL DEFAULT '{}'
);
CREATE TABLE IF NOT EXISTS comparative_entry (
  term_id TEXT PRIMARY KEY REFERENCES term(id),
  hindu_context TEXT NOT NULL,
  buddhist_context TEXT NOT NULL,
  christian_bridge TEXT NOT NULL,
  source_ids TEXT[] NOT NULL
);
ALTER TABLE comparative_entry ADD COLUMN IF NOT EXISTS parallel_text TEXT;
ALTER TABLE comparative_entry ADD COLUMN IF NOT EXISTS difference_text TEXT;
CREATE TABLE IF NOT EXISTS lookup_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_or_verse TEXT NOT NULL,
  mode TEXT NOT NULL,
  user_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
"""


def database_url() -> str:
    return os.getenv("DATABASE_URL", "postgresql://app:app@localhost:5432/church_ai")


def connect():
    return psycopg.connect(database_url(), row_factory=dict_row, connect_timeout=3)


def init_db() -> None:
    with connect() as conn:
        conn.execute(SCHEMA)
        for source in SEED_SOURCES:
            conn.execute(
                """
                INSERT INTO source_chunk
                  (id, tradition, work, reference, translation, license, text, topic_tags)
                VALUES (%(id)s, %(tradition)s, %(work)s, %(reference)s, %(translation)s,
                        %(license)s, %(text)s, %(topic_tags)s)
                ON CONFLICT (id) DO NOTHING
                """,
                source,
            )
        for term in SEED_TERMS:
            conn.execute(
                """
                INSERT INTO term (id, term, short_definition, tradition_tags)
                VALUES (%(id)s, %(term)s, %(short_definition)s, %(tradition_tags)s)
                ON CONFLICT (id) DO NOTHING
                """,
                term,
            )
            conn.execute(
                """
                INSERT INTO comparative_entry
                  (term_id, hindu_context, buddhist_context, christian_bridge, source_ids,
                   parallel_text, difference_text)
                VALUES (%(id)s, %(hindu_context)s, %(buddhist_context)s, %(christian_bridge)s, %(source_ids)s,
                        %(parallel_text)s, %(difference_text)s)
                ON CONFLICT (term_id) DO UPDATE
                  SET parallel_text = EXCLUDED.parallel_text,
                      difference_text = EXCLUDED.difference_text
                """,
                term,
            )
        conn.commit()


def search_terms(query: str) -> dict:
    sql = """
        SELECT term, short_definition
        FROM term
        WHERE (%s = '' OR term ILIKE %s ESCAPE '\\' OR short_definition ILIKE %s ESCAPE '\\')
        ORDER BY term
        LIMIT 50
    """
    pattern = _like(query)
    with connect() as conn:
        rows = conn.execute(sql, (query.strip(), pattern, pattern)).fetchall()
        _log(conn, query.strip() or "*", "normal")
        conn.commit()
    return {"results": [{"term": row["term"], "short_definition": row["short_definition"]} for row in rows]}


def _entry(term: str):
    with connect() as conn:
        row = conn.execute(
            """
            SELECT t.term, t.short_definition, t.tradition_tags,
                   c.parallel_text, c.difference_text, c.christian_bridge, c.source_ids
            FROM term t
            JOIN comparative_entry c ON c.term_id = t.id
            WHERE lower(t.term) = lower(%s)
            """,
            (term.strip(),),
        ).fetchone()
    return row


def get_term(term: str) -> dict | None:
    with connect() as conn:
        row = _entry(term)
        _log(conn, term.strip(), "normal")
        conn.commit()
    if row is None:
        return None
    return {
        "term": row["term"],
        "short_definition": row["short_definition"],
        "tradition_tags": list(row["tradition_tags"]),
        "pronunciation": None,
        "etymology": None,
        "sources": _sources(row["source_ids"]),
        "mode": "normal",
    }


def get_faith(term: str) -> dict | None:
    with connect() as conn:
        row = _entry(term)
        _log(conn, term.strip(), "faith")
        conn.commit()
    if row is None:
        return None
    return {
        "term": row["term"],
        "mode": "faith",
        "parallel": row["parallel_text"],
        "difference": row["difference_text"],
        "christian_bridge": row["christian_bridge"],
        "linguistic_root": None,
        "historical_timeline": None,
        "sources": _sources(row["source_ids"]),
    }


def _sources(ids: list[str]) -> list[dict]:
    if not ids:
        return []
    with connect() as conn:
        rows = conn.execute(
            """
            SELECT id, tradition, work, reference, translation, license
            FROM source_chunk
            WHERE id = ANY(%s)
            """,
            (ids,),
        ).fetchall()
    return [dict(row) for row in rows]


def _log(conn, term_or_verse: str, mode: str) -> None:
    conn.execute(
        "INSERT INTO lookup_log (term_or_verse, mode) VALUES (%s, %s)",
        (term_or_verse[:200], mode),
    )


def _like(query: str) -> str:
    escaped = query.strip().replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
    return f"%{escaped}%"
