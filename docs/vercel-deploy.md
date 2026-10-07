# Deploy on Vercel (shareable demo)

Two Vercel projects: **API** (Python) + **Web** (Next.js). The UI proxies `/api/v1` to the API using `API_BASE_URL`.

## 1. Local — run everything

```powershell
cd church-ai-stack
.\scripts\run_local.ps1
```

Optional Postgres: `.\scripts\run_local.ps1 -Postgres`

Smoke: `$env:BASE='http://localhost:3000'; .\scripts\beta_smoke.ps1`

## 2. Vercel — API project

1. [Vercel Dashboard](https://vercel.com/new) → Import **Pavanmahaveer7/RhemaAI**.
2. **Root Directory:** `.` (repo root — `vercel.json` at root deploys FastAPI; includes `apps/api` + `packages`)
3. **Environment variables** (Production):

| Variable | Demo value |
|----------|------------|
| `APP_ENV` | `production` |
| `CONTRACT_STORE` | `memory` (quick demo; resets on cold starts) or `postgres` with Neon |
| `LLM_MODE` | `off` |
| `BETA_SHARED_STAFF_LOGIN` | `true` |
| `DEMO_SIGNIN_PASSWORD` | from `scripts/generate_render_secrets.ps1` |
| `CHECKIN_ENCRYPTION_KEY` | from script |
| `AGENT_SERVICE_TOKEN` | from script |
| `INTEGRATION_WEBHOOK_SECRET` | from script |
| `DATABASE_URL` | only if `CONTRACT_STORE=postgres` ([Neon](https://vercel.com/marketplace/neon) via Vercel Storage) |
| `APP_BASE_URL` | set **after** web deploy — your `https://….vercel.app` web URL |

4. Deploy → copy the API URL (e.g. `https://rhema-api-xxx.vercel.app`).

## 3. Vercel — Web project

1. New project → same repo.
2. **Root Directory:** `apps/web`
3. **Environment:**

| Variable | Value |
|----------|--------|
| `API_BASE_URL` | API project URL (no trailing slash) |
| `APP_ENV` | `production` |

4. Deploy → open `/app`, sign in `A-0100` with your `DEMO_SIGNIN_PASSWORD`.

5. Update **API** project `APP_BASE_URL` to this web URL (CORS + cookies), redeploy API.

## 4. CLI (optional)

```powershell
npm i -g vercel
cd apps/api-vercel
vercel link
vercel env add DEMO_SIGNIN_PASSWORD
vercel --prod

cd ../web
vercel link
vercel env add API_BASE_URL
vercel --prod
```

## Notes

- **Memory store** on serverless is fine for a quick link share; use **Neon + postgres** if you need data to stick.
- Render blueprint in `render.yaml` is still supported; Vercel is an alternative host for the web + API split.
- Do not commit `.env` or Vercel tokens.
