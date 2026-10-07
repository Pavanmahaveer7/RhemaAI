# Deploy on Vercel (Rhema.ai)

For the full live checklist (Postgres, beta sharing, GitHub): **[vercel-live.md](./vercel-live.md)** · **[beta-testers.md](./beta-testers.md)**

**Production URLs (share these):**

| Service | Vercel project | URL |
|---------|----------------|-----|
| **Web** | `rhema-ai-web` | **https://rhema-ai-web.vercel.app** |
| **API** | `rhema-ai-api` | **https://rhema-ai-api.vercel.app** |

- App: **https://rhema-ai-web.vercel.app/app**
- Staff sign-in: **https://rhema-ai-web.vercel.app/app#r=signin&staff=l3**
- Beta survey: **https://rhema-ai-web.vercel.app/beta-survey**

Legacy aliases `church-ai-*.vercel.app` may still work; prefer **rhema-ai-*** for branding.

Static preview: [github-pages.md](./github-pages.md).

## One-command deploy

```powershell
cd church-ai-stack
npx vercel login
.\scripts\vercel_deploy.ps1
```

Smoke:

```powershell
$env:BASE='https://rhema-ai-web.vercel.app'; .\scripts\beta_smoke.ps1
```

## GitHub → Vercel

Connect GitHub at [Login connections](https://vercel.com/account/login-connections), then link **Pavanmahaveer7/RhemaAI**:

| Project | Root directory |
|---------|----------------|
| `rhema-ai-api` | `.` (repo root) |
| `rhema-ai-web` | `apps/web` |

## Env (production)

| Project | Variable | Value |
|---------|----------|--------|
| Web | `API_BASE_URL` | `https://rhema-ai-api.vercel.app` |
| API | `APP_BASE_URL` | `https://rhema-ai-web.vercel.app` |
| API | `DEMO_SIGNIN_PASSWORD`, etc. | see `.vercel-demo.env.local` or `generate_render_secrets.ps1` |

Custom domain **rhema.ai**: Vercel project → **Settings → Domains**.
