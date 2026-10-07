# Production issues — diagnose and fix locally

Run against production (web proxies API):

```powershell
cd church-ai-stack
$env:BASE = "https://rhema-ai-web.vercel.app"
$env:STAFF_SMOKE_PASSWORD = "<same as Vercel DEMO_SIGNIN_PASSWORD on API>"
.\scripts\beta_smoke.ps1
```

## Known breakages and fixes

### 1. Staff sign-in (`P-0233` → 401)

**Cause:** Postgres saved old `scrypt$` password hashes. `BETA_SHARED_STAFF_LOGIN=true` used to skip updating codes that already had a hash, so the Vercel `DEMO_SIGNIN_PASSWORD` secret no longer matched.

**Fix (in repo):** On every load, demo staff codes (`P-*`, `L-*`, `R-*`, `A-*`, `E-*`) are re-hashed from `DEMO_SIGNIN_PASSWORD` when `BETA_SHARED_STAFF_LOGIN=true`.

**Deploy checklist:**

1. Set **`DEMO_SIGNIN_PASSWORD`** on the **API** Vercel project (`rhema-ai-api`), not only the web project.
2. Redeploy API after merging the fix.
3. Re-run smoke with `$env:STAFF_SMOKE_PASSWORD` matching that secret.

**Status:** `GET /api/v1/status` includes **Staff beta login** → `degraded` when the password env is missing.

### 2. Passages (`/terms/karma/passages` → 503)

**Cause:** `source_chunk` table missing or full-text search fails on serverless Postgres.

**Fix (in repo):** Fall back to dictionary citations via `passages_catalog_fallback` (200 with `found: false` instead of 503 when nothing is loaded).

**Long-term:** Run `python -m app.ingest` against production `DATABASE_URL` once (see ADR-007).

### 3. New routes (404 on production until deploy)

Local-only until API deploy: `/feedback`, `/auth/staff/phone/signin`, `/admin/analytics`, `/waitlist`.

---

## Local verification before deploy

```powershell
.\scripts\run_local.ps1
$env:BASE = "http://127.0.0.1:3000"
.\scripts\beta_smoke.ps1
uv run --package church-ai-api pytest apps/api/tests -q
```

See also **`docs/local-rescue.md`**.
