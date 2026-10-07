# Deploy on Render

Blueprint: [`render.yaml`](../render.yaml) at the **church-ai-stack** folder root.

## 1. Repo layout

Connect GitHub/GitLab to the folder that contains `render.yaml`, `pnpm-lock.yaml`, and `apps/`.  
If the monorepo root is **above** `church-ai-stack`, set the Render Blueprint path to `church-ai-stack/render.yaml`.

## 2. Services

| Service | Role |
|---------|------|
| `church-ai-api` | FastAPI on `0.0.0.0:$PORT`, health `/api/v1/status` |
| `church-ai-web` | Next.js (`next start -H 0.0.0.0 -p $PORT`), rewrites `/api/v1` → API |
| `church-ai-db` | Free Postgres (30-day expiry on free plan) |

## 3. Secrets (Dashboard → each service)

Set on **church-ai-api**:

| Variable | Example / notes |
|----------|-----------------|
| `DEMO_SIGNIN_PASSWORD` | Same as local demo (`dev-only-change-me` only for staging — use a strong value in prod) |
| `CHECKIN_ENCRYPTION_KEY` | 32+ char random string (check-in encryption + identity reveal) |
| `AGENT_SERVICE_TOKEN` | Random string for `/review/packs/*/prepare` |
| `INTEGRATION_WEBHOOK_SECRET` | Random string for Planning Center webhooks |
| `APP_BASE_URL` | HTTPS URL of the Next.js site (CORS) |
| `CORS_ORIGINS` | Extra HTTPS origins, comma-separated |
| `LLM_DAILY_MAX_CALLS` | Optional daily cap on live model calls (e.g. `200`) |
| `AUTH_SIGNIN_RATE_PER_HOUR` / `AUTH_SIGNUP_RATE_PER_HOUR` | Abuse limits (defaults 10 / 5) |
| `BETA_SHARED_STAFF_LOGIN` | Blueprint sets `true` so demo staff (`A-0100`, `P-0233`, …) can sign in with `DEMO_SIGNIN_PASSWORD` in production. Set `false` before real users. |

Generate secret values locally:

```powershell
.\scripts\generate_render_secrets.ps1
```

See **`docs/security-runbook.md`** for rotation and backups.

`DATABASE_URL` is injected from the database. `APP_BASE_URL` is wired from the web service URL for CORS/cookies.

## 4. Deploy steps

1. Install [Render CLI](https://render.com/docs/cli) (optional): `render blueprints validate` in `church-ai-stack`.
2. Push `church-ai-stack` to your Git remote.
3. Render Dashboard → **New** → **Blueprint** → select repo → confirm `render.yaml`.
4. Fill secrets → **Apply** (use `generate_render_secrets.ps1` — do not reuse `dev-only-change-me`).
5. **Blueprint deeplink:** [Create Blueprint from GitHub](https://dashboard.render.com/blueprint/new?repo=https://github.com/Pavanmahaveer7/RhemaAI)
6. Open the **web** service URL → `/app`, `/pastor`, `/beta-survey`.

## Troubleshooting

- **Pages load but sign-in / data fails:** Redeploy **church-ai-web** after the runtime `/api/v1` proxy fix (`apps/web/app/api/v1/[...path]/route.ts`). In Dashboard → web → Environment, confirm `API_BASE_URL` points at the API service URL.
- **404 on `church-ai-web.onrender.com`:** Blueprint not applied or service name differs — use the URL from Render Dashboard.
- **Build failed:** Open the failed service → **Logs** → copy the last error line.

See also **`docs/demo-hosting.md`**.

## 5. After deploy

- First API boot seeds Postgres from the contract store (demo lexicon + accounts). Sign in as `A-0100` with `DEMO_SIGNIN_PASSWORD`.
- Free web services spin down after 15 minutes idle; first request may be slow.
- `/ready` expects Redis/Memgraph locally — use `/api/v1/status` for Render health, not `/ready`.
- Optional: add custom domain on the **web** service; set `APP_BASE_URL` on the API to match.

## 6. Observability

- API logs: Render service **Logs** tab (request lines include `rid=`).
- Optional later: `OTEL_EXPORTER_OTLP_ENDPOINT`, Langfuse keys from `.env.example`.
