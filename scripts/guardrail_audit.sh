#!/usr/bin/env bash
# Minimal CI version of the guardrail-audit skill, check #1 (model SDK containment).
# Extend with the other checks from .cursor/skills/guardrail-audit/SKILL.md as code lands.
set -euo pipefail
PATTERN='(from anthropic|import anthropic|@anthropic-ai/sdk|from openai|import openai|from "openai"|litellm|api\.anthropic\.com|/v1/chat/completions)'
HITS=$(grep -rEn "$PATTERN" --include='*.py' --include='*.ts' --include='*.tsx' --include='*.js' . \
  | grep -v '^./packages/llm-gateway/' | grep -v '^./node_modules/' | grep -v '^./scripts/' || true)
if [ -n "$HITS" ]; then
  echo "FAIL: model SDK used outside packages/llm-gateway:"; echo "$HITS"; exit 1
fi
echo "PASS: model SDK containment"
