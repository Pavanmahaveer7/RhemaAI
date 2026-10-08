"""Load gitignored local env for the API. Does not override variables already set."""

from pathlib import Path
import os
import sys

_LOADED = False


def load_local_env() -> None:
    global _LOADED
    if _LOADED:
        return
    _LOADED = True
    if "pytest" in sys.modules:
        return
    here = Path(__file__).resolve()
    stack = here.parents[4]
    api_root = here.parents[2]
    for path in (api_root / ".env.local", stack / ".env.hf.local"):
        if not path.is_file():
            continue
        for raw in path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            if not key or key in os.environ:
                continue
            os.environ[key] = value.strip().strip('"').strip("'")
