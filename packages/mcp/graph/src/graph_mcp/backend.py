"""JSONB-backed idea snapshots. Device hashes and names never enter the graph."""

from datetime import datetime, timezone

from graph_mcp.network import build_graph, neighbors_of, snapshot_payload

FORBIDDEN = {"device_hash", "email", "pastor_id", "account_id", "church_id", "phone"}


class GraphError(Exception):
    def __init__(self, code: str, message: str) -> None:
        self.code = code
        self.message = message
        super().__init__(message)


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


class MemoryBackend:
    """In-process snapshots for tests. Same shape as the JSONB collection."""

    def __init__(self) -> None:
        self.answers: list[dict] = []
        self.months: dict[str, dict] = {}
        self.published: dict[str, dict] = {}
        self.snapshots: dict[str, dict] = {}

    def fetch_responses(self, month: str, limit: int) -> list[dict]:
        rows = [row for row in self.answers if row.get("month_id") == month]
        return [_public_answer(row) for row in rows[:limit]]

    def published_map(self, month: str | None) -> dict | None:
        if month:
            return self.published.get(month)
        if not self.published:
            return None
        return self.published[sorted(self.published)[-1]]

    def get_snapshot(self, month: str | None) -> dict | None:
        if month and month in self.snapshots:
            return self.snapshots[month]
        mapped = self.published_map(month)
        if mapped:
            return mapped
        if self.snapshots:
            return self.snapshots[sorted(self.snapshots)[-1]]
        return None

    def save_snapshot(self, month: str, payload: dict, idempotency_key: str) -> dict:
        existing = self.snapshots.get(month)
        if existing and existing.get("idempotency_key") == idempotency_key:
            return existing
        payload = {**payload, "month": month, "idempotency_key": idempotency_key, "saved_at": _now()}
        self.snapshots[month] = payload
        return payload


class StoreBackend:
    """Reads the screen store. Does not change the public map payload."""

    def fetch_responses(self, month: str, limit: int) -> list[dict]:
        store = _store()
        rows = [row for row in store.answers if row.get("month_id") == month]
        return [_public_answer(row) for row in rows[:limit]]

    def published_map(self, month: str | None) -> dict | None:
        store = _store()
        if month:
            mapped = store.public_map(month)
            return _map_as_snapshot(mapped) if mapped else None
        published = store.published_months()
        if not published:
            return None
        mapped = store.public_map(published[-1])
        return _map_as_snapshot(mapped) if mapped else None

    def get_snapshot(self, month: str | None) -> dict | None:
        store = _store()
        snaps = getattr(store, "graph_snapshots", {}) or {}
        if month and month in snaps:
            return snaps[month]
        if month:
            return self.published_map(month)
        if snaps:
            return snaps[sorted(snaps)[-1]]
        return self.published_map(None)

    def save_snapshot(self, month: str, payload: dict, idempotency_key: str) -> dict:
        store = _store()
        snaps = getattr(store, "graph_snapshots", None)
        if snaps is None:
            store.graph_snapshots = {}
            snaps = store.graph_snapshots
        existing = snaps.get(month)
        if existing and existing.get("idempotency_key") == idempotency_key:
            return existing
        payload = {**payload, "month": month, "idempotency_key": idempotency_key, "saved_at": _now()}
        snaps[month] = payload
        if hasattr(store, "save_postgres"):
            store.save_postgres()
        return payload


_backend: MemoryBackend | StoreBackend | None = None


def set_backend(backend: MemoryBackend | StoreBackend | None) -> None:
    global _backend
    _backend = backend


def backend() -> MemoryBackend | StoreBackend:
    if _backend is not None:
        return _backend
    try:
        _store()
        return StoreBackend()
    except Exception:
        return MemoryBackend()


def reject_people_fields(payload: dict) -> None:
    if FORBIDDEN & {str(key).lower() for key in _all_keys(payload)}:
        raise GraphError("VALIDATION_ERROR", "the graph may only hold ideas, not people")


def _all_keys(value) -> set[str]:
    keys: set[str] = set()
    if isinstance(value, dict):
        keys.update(value.keys())
        for item in value.values():
            keys.update(_all_keys(item))
    elif isinstance(value, list):
        for item in value:
            keys.update(_all_keys(item))
    return keys


def as_network(snapshot: dict):
    nodes = snapshot.get("nodes") or [
        {"id": item["id"], "weight": item.get("count") or item.get("weight") or 0, "isNew": item.get("isNew")}
        for item in snapshot.get("concepts") or []
    ]
    edges = snapshot.get("edges") or [
        {"source": item["a"], "target": item["b"], "weight": item.get("weight") or 1, "kind": item.get("kind")}
        for item in snapshot.get("links") or []
    ]
    return build_graph(nodes, edges)


def neighbors(snapshot: dict, label: str, k: int) -> dict:
    return neighbors_of(as_network(snapshot), label, k)


def from_graph_doc(graph: dict, *, question_id: str, month: str) -> dict:
    built = build_graph(graph.get("nodes") or [], graph.get("edges") or [])
    return snapshot_payload(built, question_id=question_id, month=month)


def _store():
    from app.v1.store import get_store

    return get_store()


def _public_answer(row: dict) -> dict:
    return {
        "text": str(row.get("text_redacted") or row.get("text") or "")[:280],
        "lang": str(row.get("lang") or "en")[:8],
    }


def _map_as_snapshot(mapped: dict) -> dict:
    return {
        "question_id": mapped.get("term") or mapped.get("id"),
        "month": mapped.get("id"),
        "nodes": [
            {"id": item["id"], "label": item["id"], "weight": item["count"], "isNew": item.get("isNew")}
            for item in mapped.get("concepts") or []
        ],
        "edges": [
            {"source": item["a"], "target": item["b"], "weight": item.get("weight") or 1, "kind": item.get("kind")}
            for item in mapped.get("links") or []
        ],
        "stats": {"responses_processed": mapped.get("answers") or 0, "flagged_inputs": 0, "engine": "networkx"},
    }
