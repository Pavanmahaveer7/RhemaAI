"""Static guardrail checks. Run from the repo root: python scripts/guardrail_audit.py

Fails the build when a model library is imported outside the gateway, a model id or key is
hard-coded, a public route path contains "faith", or a secret is assigned in the web app.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {".venv", "node_modules", ".git", ".cache", ".next", "dist", "build", "__pycache__"}
CODE = {".py", ".ts", ".tsx", ".js", ".jsx"}

SDK = re.compile(
    r"(from anthropic|import anthropic|@anthropic-ai/sdk|from openai|import openai|from \"openai\"|litellm|api\.anthropic\.com|/v1/chat/completions)"
)
MODEL_OR_KEY = re.compile(r"(claude-[a-z0-9][a-z0-9.\-]{4,}|gpt-[34][a-z0-9.\-]*|sk-ant-|sk-proj-|sk-[a-zA-Z0-9]{20,})")
ROUTE = re.compile(r"""@router\.(get|post|put|patch|delete)\(\s*[\"']([^\"']*)[\"']""")
SECRET_ASSIGN = re.compile(r"(LLM_API_KEY|CHECKIN_ENCRYPTION_KEY|AGENT_SERVICE_TOKEN)\s*=\s*[\"'][^\"']+[\"']")


def files(under: Path, suffixes: set[str]):
    for path in under.rglob("*"):
        if any(part in SKIP for part in path.parts):
            continue
        if path.suffix in suffixes and path.is_file():
            yield path


def main() -> int:
    failures = []

    for path in files(ROOT, {".py", ".ts", ".tsx", ".js"}):
        rel = path.relative_to(ROOT).as_posix()
        if rel.startswith("packages/llm-gateway/") or rel.startswith("scripts/"):
            continue
        for line_no, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            if SDK.search(line):
                failures.append(f"model SDK outside the gateway: {rel}:{line_no}")

    allowed_model_files = {"scripts/guardrail_audit.py"}
    for path in files(ROOT, CODE):
        rel = path.relative_to(ROOT).as_posix()
        if rel in allowed_model_files or rel.startswith("docs/") or rel.endswith(".env.example"):
            continue
        for line_no, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
            if MODEL_OR_KEY.search(line):
                failures.append(f"hard-coded model id or key: {rel}:{line_no}")

    router = ROOT / "apps" / "api" / "src" / "app" / "v1" / "router.py"
    for line_no, line in enumerate(router.read_text(encoding="utf-8").splitlines(), 1):
        match = ROUTE.search(line)
        if match and "faith" in match.group(2).lower():
            failures.append(f"public path contains faith: router.py:{line_no} {match.group(2)}")

    web = ROOT / "apps" / "web"
    if web.exists():
        for path in files(web, CODE):
            rel = path.relative_to(ROOT).as_posix()
            for line_no, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
                if SECRET_ASSIGN.search(line):
                    failures.append(f"secret assigned in the web app: {rel}:{line_no}")

    if failures:
        print(f"FAIL: {len(failures)} guardrail check(s)")
        print("\n".join(failures))
        return 1
    print("PASS: model SDK only in the gateway")
    print("PASS: no hard-coded model id or key")
    print("PASS: no public route path contains faith")
    print("PASS: no secret assigned in the web app")
    return 0


if __name__ == "__main__":
    sys.exit(main())
