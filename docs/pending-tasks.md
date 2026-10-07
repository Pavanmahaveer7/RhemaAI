# Pending tasks (platform)

Last updated after Phase 5 wiring + beta survey. Use this before the demo and before Render.

## Done (no action)

- Contract API routes for L1–L3 core flows (dictionary, monthly, map draft, pastor, reviewer, alerts, integrations list, admin list/reveal)
- Frontend wiring: `api.js`, `hydrate.js`, public screens, pipeline check-in/review/alerts/church join
- Guardrails, persistence tests, CI (`lint-test`, `api-postgres`, guardrail audit)
- Beta survey: landing CTA, `/beta-survey`, `POST /feedback/beta-survey`
- `render.yaml` blueprint (deploy when ready)

## Before tomorrow’s demo (you)

| Task | How |
|------|-----|
| UI smoke / flows / layout / a11y | With `pnpm dev:web` on **:3000**, open `/design/ui_kits/smoke.html`, `flows.html`, `layout.html`, `a11y.html` and wait for full pass counts (~4 min for smoke) |
| Live rehearsal | Follow `docs/demo-rehearsal.md` on `/app` with API `:8000` + Postgres |
| Beta feedback | Landing band or `/beta-survey`; confirm API receives rows in `beta_surveys` |

## Short-term product gaps

| Item | UI | Backend |
|------|-----|---------|
| Admin invite / resend / suspend / role / reset | `AccountsScreen.jsx` wired when live | `POST invite`, `PATCH`, `POST resend-invite`, `POST password-reset` (reset logs only; no email provider) |
| Expert **Make/Change** on Faith blocks | Local `CAExpert` store | Only **Suggest** → `POST /terms/:term/edits` |
| `_ds_bundle.js` | Stale generated bundle | Rebuild design bundle before production launch |
| `docs/api.md` (legacy paths) | — | Differs from `contract/api.md`; prefer contract for new work |

## Post-demo / Phase 3–4

| Phase | Work |
|-------|------|
| Render | **Ready:** `render.yaml` + `docs/render-deploy.md` — you push Git and Apply Blueprint |
| Observability | Basic API access logs (`rid=` in Render logs); Langfuse / OTEL optional via env |
| Auth | Supabase in ADR-004 — not imported; demo uses contract sign-in |
| Retention | Documented in ethics docs — not implemented in store |
| Memgraph / Redis | Docker local only; not required for contract demo |

## Old Cursor todos (superseded)

These were from an early slice plan; the FastAPI + ui_kits path replaced most of them:

- ~~copy-ui-kits~~ — assets under `apps/web/public/design`
- ~~wire-pipeline~~ — `hydratePipeline()` + live check-in/decide/ack
- ~~slice-tests~~ — use `ui_kits/*.html` on Next dev server, not raw `http-server` on `ui_kits` alone
