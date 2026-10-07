"""vocab.lookup_term and vocab.search_terms handlers."""

from vocab_mcp.store import get_faith, get_term, search_terms as search_store


class NotFound(Exception):
    def __init__(self, term: str) -> None:
        self.term = term
        super().__init__(term)


def lookup_term(params: dict) -> dict:
    found = get_term(params["term"])
    if found is None:
        raise NotFound(params["term"].strip())
    return found


def lookup_faith(params: dict) -> dict:
    found = get_faith(params["term"])
    if found is None:
        raise NotFound(params["term"].strip())
    return found


def search_terms(params: dict) -> dict:
    return search_store(params.get("q", ""))
