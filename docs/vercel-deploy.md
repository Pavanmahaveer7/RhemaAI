# Deploy on Vercel (Rhema.ai)

**Live (full app):**

| Service | Vercel project | URL |
|---------|----------------|-----|
| **Web** | **rhema-ai-web** | https://church-ai-web.vercel.app |
| **API** | **rhema-ai-api** | https://church-ai-api.vercel.app |

Static preview on **GitHub Pages**: [github-pages.md](./github-pages.md).

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
| **rhema-ai-api** | repo root (`church-ai-stack`) | `vercel.json`, `api/index.py`, `pyproject.toml` `[tool.vercel]` |
| **rhema-ai-web** | `apps/web` | `apps/web/vercel.json`, standalone `package-lock.json` |

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

## GitHub auto-deploy (Vercel)

1. [Vercel → Account → Login connections → GitHub](https://vercel.com/account/login-connections)
2. Open each project (**rhema-ai-api**, **rhema-ai-web**) → **Git** → connect **Pavanmahaveer7/RhemaAI** (same root dirs as above).
3. Pushes to **`main`** deploy production after Git is linked.

Until GitHub is connected, use **`.\scripts\vercel_deploy.ps1`** or push triggers **GitHub Pages** only (see github-pages.md).

## Beta feedback

- Share **`/beta-survey`** on the web URL.
- Export: **Admin → Beta feedback** as **`A-0100`**, or see [presentation-beta.md](./presentation-beta.md).

## Notes

- **Memory store** resets on serverless cold starts; use **Neon + postgres** for persistent beta surveys.
- **Deployment Protection** may be on in the Vercel dashboard; turn off for a fully public demo, or use `vercel curl` for checks.
- Do not commit `.env`, `.vercel-demo.env.local`, or tokens.
