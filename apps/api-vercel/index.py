"""Vercel Python entry — adds monorepo src paths, then serves FastAPI via Mangum."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
for rel in (
    "apps/api/src",
    "packages/llm-gateway/src",
    "packages/guardrails/src",
    "packages/agents/src",
    "packages/mcp/vocab/src",
):
    sys.path.insert(0, str(ROOT / rel))

from mangum import Mangum  # noqa: E402
from app.main import app  # noqa: E402

handler = Mangum(app, lifespan="auto")
