#!/usr/bin/env bash
# Runs every eval case that does not need a live model; exits 1 if any fails.
# Cases that need a model are reported as skipped. See docs/evals.md.
set -euo pipefail
cd "$(dirname "$0")/.."
uv run python -W ignore evals/run.py
