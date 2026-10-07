# Pending tasks (platform)

Last updated after beta readiness audit. Use before Render beta and before wide user invite.

## Done (no action)

- Contract API routes for L1–L3 core flows (dictionary, monthly, map draft, pastor, reviewer, alerts, integrations list, admin list/reveal)
- Frontend wiring: `api.js`, `hydrate.js`, public screens, pipeline check-in/review/alerts/church join
- Guardrails, persistence tests, **CI green on `main`** (run 7+)
- Render beta staff login (`BETA_SHARED_STAFF_LOGIN` + scrypt demo passwords)
- Beta survey: landing CTA, `/beta-survey`, `POST /feedback/beta-survey`
- `render.yaml` blueprint (deploy when ready)

## Before beta (you)

| Task | How |
|------|-----|
| Full checklist | **`docs/beta-readiness-audit.md`** — backend, DB, network, UX, security, scale |
| Automated smoke | `$env:BASE='https://your-web.onrender.com'; .\scripts\beta_smoke.ps1` |
| UI smoke / flows / layout / a11y | `pnpm dev:web` on **:3000** → `/design/ui_kits/smoke.html`, `flows.html`, `layout.html`, `a11y.html` |
| Live rehearsal | `docs/demo-rehearsal.md` on `/app` with API + Postgres |
| Rotate Render secrets | `docs/security-runbook.md` — never reuse `dev-only-change-me` |

## Short-term product gaps

| Item | UI | Backend |
|------|-----|---------|
| Admin invite / resend / suspend / role / reset | `AccountsScreen.jsx` wired when live | `POST invite`, `PATCH`, `POST resend-invite`, `POST password-reset` (reset logs only; no email provider) |
| Expert **Make/Change** on Faith blocks | Live: pending review via API | **Suggest / Make / Change** → `POST /terms/:term/edits` when live |
| `_ds_bundle.js` | Stale generated bundle | Rebuild design bundle before production launch |
| `docs/api.md` (legacy paths) | — | Differs from `contract/api.md`; prefer contract for new work |

## Post-demo / Phase 3–4

| Phase | Work |
|-------|------|
| Render | **Apply Blueprint:** [dashboard deeplink](https://dashboard.render.com/blueprint/new?repo=https://github.com/Pavanmahaveer7/RhemaAI) + secrets from `scripts/generate_render_secrets.ps1` |
| Observability | Basic API access logs (`rid=` in Render logs); Langfuse / OTEL optional via env |
| Auth | Supabase in ADR-004 — not imported; demo uses contract sign-in |
| Retention | Documented in ethics docs — not implemented in store |
| Memgraph / Redis | Docker local only; not required for contract demo |

## Old Cursor todos (superseded)

These were from an early slice plan; the FastAPI + ui_kits path replaced most of them:

- ~~copy-ui-kits~~ — assets under `apps/web/public/design`
- ~~wire-pipeline~~ — `hydratePipeline()` + live check-in/decide/ack
- ~~slice-tests~~ — use `ui_kits/*.html` on Next dev server, not raw `http-server` on `ui_kits` alone
