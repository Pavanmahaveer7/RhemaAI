"""Vercel serverless entry (see pyproject.toml [tool.vercel])."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[4]
for rel in (
    "apps/api/src",
    "packages/llm-gateway/src",
    "packages/guardrails/src",
    "packages/agents/src",
    "packages/mcp/vocab/src",
):
    p = str(ROOT / rel)
    if p not in sys.path:
        sys.path.insert(0, p)

from mangum import Mangum  # noqa: E402
from app.main import app  # noqa: E402

handler = Mangum(app, lifespan="auto")
