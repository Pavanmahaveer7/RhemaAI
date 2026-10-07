"""Vercel entry: wire monorepo packages, expose FastAPI `app`."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
for rel in (
    "apps/api/src",
    "packages/llm-gateway/src",
    "packages/guardrails/src",
    "packages/agents/src",
    "packages/mcp/vocab/src",
):
    sys.path.insert(0, str(ROOT / rel))

from app.main import app  # noqa: E402
