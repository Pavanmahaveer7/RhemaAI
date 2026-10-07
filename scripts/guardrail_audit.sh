#!/usr/bin/env bash
# Runs the Python guardrail audit so CI stays one command.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/guardrail_audit.py
