#!/usr/bin/env bash
# Quick beta smoke against the web origin (Next rewrites /api/v1 to the API).
set -euo pipefail
BASE="${BASE:-http://localhost:3000}"
BASE="${BASE%/}"
API="$BASE/api/v1"
echo "Beta smoke -> $API"
curl -sf "$API/terms?q=faith" >/dev/null && echo "OK  terms search"
curl -sf "$API/months/current" >/dev/null && echo "OK  months current"
curl -sf "$API/status" >/dev/null && echo "OK  service status"
curl -sf -o /dev/null -w "OK  beta survey (%{http_code})\n" -X POST "$API/feedback/beta-survey" \
  -H "content-type: application/json" \
  -d '{"version":"smoke","answers":{"interest":"curious"},"from":"beta_smoke.sh"}' \
  --fail-with-body 2>/dev/null || { echo "FAIL beta survey"; exit 1; }
echo "All smoke checks passed."
