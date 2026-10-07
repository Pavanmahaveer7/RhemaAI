# Deploy on Vercel (shareable demo)

**Live (production):**

| Service | URL |
|---------|-----|
| **Web** | https://church-ai-web.vercel.app |
| **API** | https://church-ai-api.vercel.app |

Web proxies `/api/v1/*` to the API via `API_BASE_URL`.

## One-command deploy (CLI)

```powershell
cd church-ai-stack
npx vercel login          # once
.\scripts\vercel_deploy.ps1
```

Secrets for the demo admin password are written to **`.vercel-demo.env.local`** (gitignored). Sign in: **`A-0100`** + that password.

Smoke after deploy:

```powershell
$env:BASE='https://church-ai-web.vercel.app'; .\scripts\beta_smoke.ps1
```

## Two Vercel projects (dashboard)

| Project | Root directory | Config |
|---------|----------------|--------|
| **church-ai-api** | repo root (`church-ai-stack`) | `vercel.json`, `api/index.py`, `pyproject.toml` `[tool.vercel]` |
| **church-ai-web** | `apps/web` | `apps/web/vercel.json`, standalone `package-lock.json` |

### API env (Production)

| Variable | Notes |
|----------|--------|
| `APP_ENV` | `production` (in `vercel.json`) |
| `CONTRACT_STORE` | `memory` (demo) or `postgres` + `DATABASE_URL` (Neon) |
| `LLM_MODE` | `off` |
| `BETA_SHARED_STAFF_LOGIN` | `true` |
| `DEMO_SIGNIN_PASSWORD` | from `scripts/generate_render_secrets.ps1` or deploy script |
| `CHECKIN_ENCRYPTION_KEY` | same |
| `AGENT_SERVICE_TOKEN` | same |
| `INTEGRATION_WEBHOOK_SECRET` | same |
| `APP_BASE_URL` | **`https://church-ai-web.vercel.app`** (set after web deploy, redeploy API) |

### Web env (Production)

| Variable | Value |
|----------|--------|
| `API_BASE_URL` | **`https://church-ai-api.vercel.app`** (no trailing slash) |
| `APP_ENV` | `production` |

## GitHub (optional)

Link GitHub in Vercel **Account → Login connections** if you want auto-deploy on push. CLI deploy works without it.

## Beta feedback

- Share **`/beta-survey`** on the web URL.
- Export: **Admin → Beta feedback** as **`A-0100`**, or see [presentation-beta.md](./presentation-beta.md).

## Notes

- **Memory store** resets on serverless cold starts; use **Neon + postgres** for persistent beta surveys.
- **Deployment Protection** may be on in the Vercel dashboard; turn off for a fully public demo, or use `vercel curl` for checks.
- Do not commit `.env`, `.vercel-demo.env.local`, or tokens.
