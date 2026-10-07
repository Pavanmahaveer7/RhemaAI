# Beta readiness audit (production-like)

Use this before inviting beta users on Render. Re-run after every release.

**Repo:** [Pavanmahaveer7/RhemaAI](https://github.com/Pavanmahaveer7/RhemaAI) · **Stack:** Next.js + FastAPI + Postgres (Render blueprint).

Legend: **Green** = ready for beta · **Amber** = works with known limits · **Red** = block or fix before wide beta.

---

## 1. Backend (API)

| Check | Status | Notes |
|-------|--------|--------|
| Contract routes `/api/v1/*` | Green | 87 pytest; Postgres job in CI |
| Auth (cookie + `_require` roles) | Green | `test_route_auth.py`, production staff password rules |
| Guardrails (input/output, OUT-FLOURISH) | Green | `scripts/guardrail_audit.py` PASS; gateway-only LLM |
| Rate limits (auth, answers, surveys, events) | Amber | In-memory per instance; reset on deploy/restart |
| Error shape (no stack in prod) | Green | Global handlers in `main.py` |
| CORS / CSRF-style writes | Green | Production CORS tight; cookie write origin checks |
| `/api/v1/status` health (Render) | Green | Used by `render.yaml`; not `/ready` |
| `/ready` (Redis + Memgraph + LLM) | Amber | Fails without local Docker stack; OK to ignore on Render |
| Agent packet prepare | Green | Bearer `AGENT_SERVICE_TOKEN`; template fallback if LLM off |
| Email (invite / reset) | Red | Audit log only; no SMTP — tell beta users passwords are set in admin |

**Commands:** `uv sync && uv run pytest -q` · `python scripts/guardrail_audit.py`

---

## 2. Database & data integrity

| Check | Status | Notes |
|-------|--------|--------|
| Postgres persistence (`CONTRACT_STORE=postgres`) | Green | `store_state` JSONB; sync on boot + after writes |
| Migrations | Amber | No Alembic; schema in app code (ADR-006). Document before major schema change |
| Encryption (check-ins, reveal) | Green | `CHECKIN_ENCRYPTION_KEY`; required in prod for reveal |
| Backups | Amber | Render free DB expires ~30d; use paid backups or `scripts/backup_postgres.*` |
| RLS / multi-tenant DB | Red | Not on Supabase yet; single app DB user — auth in API |
| Retention / delete-me | Amber | `DELETE /me` implemented; policy docs not automated |

**Commands:** CI job `api-postgres` · local `docker compose up postgres` + `CONTRACT_STORE=postgres`

---

## 3. Networking & deploy

| Check | Status | Notes |
|-------|--------|--------|
| HTTPS | Green | Render terminates TLS; set `APP_BASE_URL` to **web** HTTPS URL |
| API not public to browser for LLM | Green | Only `API_BASE_URL` server-side rewrite |
| CORS | Amber | Set `CORS_ORIGINS` if marketing domain ≠ web URL |
| Free tier spin-down | Amber | 15 min idle; first hit slow — expected on Render free |
| Ephemeral disk | Green | No local file state; Postgres for data |
| Custom domain | Amber | Manual on web service + update `APP_BASE_URL` on API |

**Blueprint:** `render.yaml` — validate secrets in `docs/render-deploy.md`

---

## 4. Frontend / UX

| Check | Status | Notes |
|-------|--------|--------|
| Production build | Green | `pnpm --filter web build` succeeds |
| Live wiring (`/app`, `/pastor`) | Green | `api.js`, `hydrate.js`, session sync |
| Demo vs live | Green | `CA_DEMO` / `#api=0` vs cookie session |
| UI regression tests | Amber | Run on **:3000** only: `smoke.html`, `flows.html`, `layout.html`, `a11y.html` |
| `_ds_bundle.js` | Amber | Stale; JSX overrides at runtime — rebuild before GA |
| i18n | Amber | Minimal `GET /i18n/:lang`; most copy English |
| Accessibility | Amber | Run `a11y.html` before beta launch |

**Rehearsal:** `docs/demo-rehearsal.md` · entry `/app` not smoke iframes alone

---

## 5. Security & compliance

| Check | Status | Notes |
|-------|--------|--------|
| Secrets in env only | Green | `.env` gitignored; gitleaks in CI |
| Rotate demo defaults | Red (ops) | **You** must set new secrets on Render before public beta |
| LLM spend cap | Amber | `LLM_DAILY_MAX_CALLS` + provider dashboard caps |
| Supabase Auth | Red (future) | Planned ADR-004; contract sign-in today |
| Beta survey PII | Green | Rate limited; optional email length capped |

**Runbook:** `docs/security-runbook.md`

---

## 6. Reliability & observability

| Check | Status | Notes |
|-------|--------|--------|
| Request IDs in logs | Green | `rid=` on `/api/*` access log |
| Idempotent check-ins | Green | `clientId` on pastor check-ins |
| Offline check-in queue | Green | `sessionStorage` + flush on `online` |
| Circuit breaker (LLM) | Green | In-process breaker in `llm-gateway` |
| Alerting / paging | Red | No PagerDuty — watch Render logs manually |
| Langfuse / OTEL | Red (optional) | Env placeholders only |

---

## 7. Scalability (beta honest limits)

| Area | Limit |
|------|--------|
| API instances | In-memory rate limits & store hot path — **single instance** recommended until Redis-backed limits |
| Postgres | One JSONB blob store — fine for beta; not sharded |
| LLM | Daily cap env + `LLM_MODE=off` until ready |
| Web | Static UI kits + Next rewrites — scales with Render web tier |
| Memgraph / Redis | **Optional**; not in Render blueprint |

---

## 8. Integrations

| Integration | Status |
|-------------|--------|
| Planning Center OAuth | Amber — routes exist; needs real client id/secret |
| Webhooks | Green — HMAC with `INTEGRATION_WEBHOOK_SECRET` |
| Embed demo | Amber — `EMBED_DEMO_TOKEN` |
| Escalation email/webhook | Red — env vars empty until partner confirms |

---

## 9. Automated smoke (after deploy)

From repo root (set `BASE` to your **web** URL; API is reached via same-origin `/api/v1`):

```powershell
$env:BASE = "https://your-web.onrender.com"
.\scripts\beta_smoke.ps1
```

Or against local Next:

```powershell
$env:BASE = "http://localhost:3000"
.\scripts\beta_smoke.ps1
```

Expect: terms search, months current, status JSON, beta survey POST (204).

---

## 10. Pre-beta gate (must pass)

- [ ] Render Blueprint applied; all secrets rotated from `dev-only-change-me`
- [ ] `APP_ENV=production` on API; `APP_BASE_URL` = web HTTPS URL
- [ ] `LLM_MODE=off` or caps set before enabling live model
- [ ] `uv run pytest -q` + guardrail audit PASS on `main`
- [ ] `pnpm --filter web build` PASS
- [ ] Manual: `/app` guest search → monthly → map; staff sign-in → pipeline; admin publish map; `/beta-survey`
- [ ] UI smoke/flows on `:3000` (target 40/40 smoke if unchanged since last run)
- [ ] Backup plan documented (paid Postgres or scheduled dump)

---

## What is intentionally out of beta scope

Supabase Auth + RLS, real invite/reset email, Memgraph graph features, mobile app, Stripe, full i18n review, automated on-call, multi-region scale.

Update **`docs/pending-tasks.md`** when closing gaps.
