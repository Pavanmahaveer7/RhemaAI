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

`DATABASE_URL` is injected from the database. `APP_BASE_URL` is wired from the web service URL for CORS/cookies.

## 4. Deploy steps

1. Install [Render CLI](https://render.com/docs/cli) (optional): `render blueprints validate` in `church-ai-stack`.
2. Push `church-ai-stack` to your Git remote.
3. Render Dashboard → **New** → **Blueprint** → select repo → confirm `render.yaml`.
4. Fill secrets → **Apply**.
5. Open the **web** service URL → `/app`, `/pastor`, `/beta-survey`.

## 5. After deploy

- First API boot seeds Postgres from the contract store (demo lexicon + accounts). Sign in as `A-0100` with `DEMO_SIGNIN_PASSWORD`.
- Free web services spin down after 15 minutes idle; first request may be slow.
- `/ready` expects Redis/Memgraph locally — use `/api/v1/status` for Render health, not `/ready`.
- Optional: add custom domain on the **web** service; set `APP_BASE_URL` on the API to match.

## 6. Observability

- API logs: Render service **Logs** tab (request lines include `rid=`).
- Optional later: `OTEL_EXPORTER_OTLP_ENDPOINT`, Langfuse keys from `.env.example`.
