"""Postgres access for L1 dictionary data. Not called from inside an agent."""

import os
import re

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
ALTER TABLE source_chunk ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE source_chunk ADD COLUMN IF NOT EXISTS tsv tsvector
  GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;
CREATE INDEX IF NOT EXISTS source_chunk_tsv ON source_chunk USING GIN (tsv);
"""

TRADITIONS = ("hindu", "buddhist", "christian")
MIN_VECTOR_SCORE = 0.28


def vector_literal(values: list[float]) -> str:
    return "[" + ",".join(f"{float(v):.7f}" for v in values) + "]"


def ensure_source_embeddings(conn) -> bool:
    """Add pgvector embedding column when the extension is available. Leaves FTS alone if not."""
    try:
        conn.execute("SAVEPOINT source_embed_schema")
        conn.execute("CREATE EXTENSION IF NOT EXISTS vector")
        conn.execute("ALTER TABLE source_chunk ADD COLUMN IF NOT EXISTS embedding vector(384)")
        conn.execute("RELEASE SAVEPOINT source_embed_schema")
        return True
    except Exception:
        try:
            conn.execute("ROLLBACK TO SAVEPOINT source_embed_schema")
        except Exception:
            pass
        return False


def has_source_embeddings(conn) -> bool:
    try:
        conn.execute("SAVEPOINT source_embed_check")
        row = conn.execute(
            """
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'source_chunk' AND column_name = 'embedding'
            """
        ).fetchone()
        found = None
        if row:
            found = conn.execute("SELECT 1 FROM source_chunk WHERE embedding IS NOT NULL LIMIT 1").fetchone()
        conn.execute("RELEASE SAVEPOINT source_embed_check")
        return found is not None
    except Exception:
        try:
            conn.execute("ROLLBACK TO SAVEPOINT source_embed_check")
        except Exception:
            pass
        return False


def save_source_embeddings(conn, items: list[tuple[str, list[float]]]) -> int:
    if not items or not ensure_source_embeddings(conn):
        return 0
    with conn.cursor() as cur:
        cur.executemany(
            "UPDATE source_chunk SET embedding = %s::vector WHERE id = %s",
            [(vector_literal(vec), chunk_id) for chunk_id, vec in items],
        )
    return len(items)


def search_source_chunks(conn, *, query_vector: list[float], traditions: list[str], k: int) -> list[dict]:
    if not query_vector or not ensure_source_embeddings(conn):
        return []
    lit = vector_literal(query_vector)
    names = [name.lower() for name in traditions] or list(TRADITIONS)
    try:
        conn.execute("SAVEPOINT source_vector_search")
        rows = conn.execute(
            """
            SELECT id, tradition, work, reference, translation, license, text, source_url,
                   (1 - (embedding <=> %s::vector)) AS score
            FROM source_chunk
            WHERE embedding IS NOT NULL
              AND lower(tradition) = ANY(%s)
              AND length(text) BETWEEN 40 AND 1400
            ORDER BY embedding <=> %s::vector
            LIMIT %s
            """,
            (lit, names, lit, max(k * 3, k)),
        ).fetchall()
        conn.execute("RELEASE SAVEPOINT source_vector_search")
    except Exception:
        try:
            conn.execute("ROLLBACK TO SAVEPOINT source_vector_search")
        except Exception:
            pass
        return []
    out = []
    for row in rows:
        score = float(row["score"] or 0)
        if score < MIN_VECTOR_SCORE:
            continue
        item = dict(row)
        item["score"] = round(score, 4)
        out.append(item)
        if len(out) >= k:
            break
    return out


def search_source_chunks_fts(conn, *, query: str, traditions: list[str], k: int) -> list[dict]:
    names = [name.lower() for name in traditions] or list(TRADITIONS)
    words = [w for w in re.findall(r"[a-z0-9]+", query.lower()) if w]
    if not words:
        return []
    tsquery = " or ".join(words)
    try:
        conn.execute("SAVEPOINT source_fts_search")
        rows = conn.execute(
            """
            SELECT id, tradition, work, reference, translation, license, text, source_url,
                   ts_rank_cd(tsv, q, 1) AS score
            FROM source_chunk, websearch_to_tsquery('english', %s) AS q
            WHERE tsv @@ q
              AND lower(tradition) = ANY(%s)
              AND length(text) BETWEEN 40 AND 1400
            ORDER BY ts_rank_cd(tsv, q, 1) DESC, id
            LIMIT %s
            """,
            (tsquery, names, k),
        ).fetchall()
        conn.execute("RELEASE SAVEPOINT source_fts_search")
    except Exception:
        try:
            conn.execute("ROLLBACK TO SAVEPOINT source_fts_search")
        except Exception:
            pass
        return []
    out = []
    for row in rows:
        item = dict(row)
        item["score"] = round(float(row["score"] or 0), 4)
        out.append(item)
    return out


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
