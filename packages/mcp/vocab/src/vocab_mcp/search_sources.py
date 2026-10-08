"""vocab.search_sources: licence-checked chunks only. Embeddings go through llm-gateway."""

from llm_gateway import GatewayError, embed, embed_mode
from vocab_mcp.store import (
    TRADITIONS,
    connect,
    has_source_embeddings,
    search_source_chunks,
    search_source_chunks_fts,
)


def search_sources(params: dict) -> dict:
    query = str(params.get("query") or "").strip()
    traditions = [item.strip().lower() for item in (params.get("traditions") or []) if str(item).strip()]
    k = int(params.get("k") or 8)
    chunks: list[dict] = []
    retrieval = "none"
    with connect() as conn:
        if embed_mode() != "off" and has_source_embeddings(conn):
            try:
                vector = embed([query], untrusted_query=True)[0]
                chunks = search_source_chunks(conn, query_vector=vector, traditions=traditions, k=k)
                if chunks:
                    retrieval = "vector"
            except GatewayError:
                chunks = []
        if not chunks:
            chunks = search_source_chunks_fts(conn, query=query, traditions=traditions, k=k)
            if chunks:
                retrieval = "fts"
    return {
        "query": query,
        "traditions": traditions or list(TRADITIONS),
        "k": k,
        "retrieval": retrieval,
        "model": None,
        "chunks": [_public_chunk(row) for row in chunks],
    }


def _public_chunk(row: dict) -> dict:
    return {
        "id": row["id"],
        "tradition": row["tradition"],
        "work": row["work"],
        "reference": row["reference"],
        "text": row["text"],
        "translation": row.get("translation"),
        "license": row["license"],
        "url": row.get("source_url"),
        "score": row.get("score"),
    }
