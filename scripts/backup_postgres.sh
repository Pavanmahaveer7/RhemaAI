#!/usr/bin/env bash
# Dump Postgres to stdout or a file. Requires DATABASE_URL and pg_dump on PATH.
# Example: DATABASE_URL=postgresql://... ./scripts/backup_postgres.sh > backup.sql
set -euo pipefail
: "${DATABASE_URL:?Set DATABASE_URL}"
OUT="${1:-}"
if [[ -n "$OUT" ]]; then
  pg_dump "$DATABASE_URL" --no-owner --no-acl -F c -f "$OUT"
  echo "Wrote $OUT"
else
  pg_dump "$DATABASE_URL" --no-owner --no-acl
fi
