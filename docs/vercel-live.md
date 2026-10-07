# Complete live app on Vercel (GitHub + Vercel only)

Your production stack:

| Piece | Project | URL |
|-------|---------|-----|
| Web | `rhema-ai-web` | https://rhema-ai-web.vercel.app |
| API | `rhema-ai-api` | https://rhema-ai-api.vercel.app |

## Already working

- Landing, `/app`, `/pastor`, `/beta-survey`, `/screens`
- API proxy: web `/api/v1/*` → API
- Staff sign-in (**A-0100**, **P-0233**, …) with `DEMO_SIGNIN_PASSWORD`
- Beta survey POST + admin CSV export

Deploy everything:

```powershell
cd church-ai-stack
.\scripts\vercel_deploy.ps1
```

Smoke:

```powershell
$env:BASE='https://rhema-ai-web.vercel.app'; .\scripts\beta_smoke.ps1
```

## One step for a *complete* live database (required for saved beta data)

The API **does not use SQLite on Vercel** (disk is ephemeral). Persistence uses **Postgres** (JSONB store).

### Option A — Neon from Vercel (recommended)

**Automated (PowerShell):**

```powershell
.\scripts\vercel_neon_provision.ps1
```

Accept Neon terms when the browser opens, press Enter, then the script provisions the DB and redeploys.

**Manual:**

1. Accept terms: [Neon integration terms](https://vercel.com/pavansingara-9546s-projects/~/integrations/accept-terms/neon?source=cli) (one time).
2. Or: Vercel → **rhema-ai-api** → **Storage** → **Neon**.
3. Confirm **`DATABASE_URL`** on **Settings → Environment Variables**.
4. Redeploy: `.\scripts\vercel_deploy.ps1`

### Option B — Paste a connection string

If you already have Neon (or any Postgres):

```powershell
.\scripts\vercel_set_database.ps1 -DatabaseUrl "postgresql://USER:PASS@HOST/DB?sslmode=require"
```

### Verify persistence

```powershell
(Invoke-WebRequest https://rhema-ai-web.vercel.app/api/v1/status -UseBasicParsing).Content
```

Look for `"Database","status":"up"` (not `degraded`).

Submit a test survey at `/beta-survey`, then check **Admin → Beta feedback** as **A-0100**.

## GitHub auto-deploy

```powershell
cd "C:\Users\pavan.singara\Downloads\church-ai-platform-repo\church-ai-stack"
.\scripts\vercel_git_connect.ps1
```

1. Browser opens → [Login connections](https://vercel.com/account/login-connections) → connect **GitHub** to Vercel.
2. Press Enter → script links **Pavanmahaveer7/RhemaAI** to both projects.
3. Dashboard → each project → **Settings → General → Root Directory**:

| Project | Root directory |
|---------|----------------|
| `rhema-ai-api` | `.` |
| `rhema-ai-web` | `apps/web` |

Push to `main` → production deploys.

## Custom domain

Vercel → **rhema-ai-web** → **Settings → Domains** → add `rhema.ai` (and `www` if needed). Set the same `APP_BASE_URL` / CORS by updating API env to your domain.

## What “complete” means here

| Feature | Live on Vercel |
|---------|----------------|
| Public L1/L2 + survey | Yes |
| Accounts + pseudonyms | Yes (persist with Postgres) |
| L3 staff demo pipeline | Yes (demo data + shared staff password) |
| Beta feedback export | Yes (persist with Postgres) |
| Redis / graph / live LLM | Optional; status shows `not_configured` / `degraded` — OK for beta |

Share links: [beta-testers.md](./beta-testers.md).
