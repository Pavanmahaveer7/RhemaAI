# Shareable demo hosting (Render)

Use this when you want a **live link to share**, not full production.

## What breaks most often

**API calls fail after deploy** — Next.js used to bake `/api/v1` rewrites to `http://localhost:8000` at build time. The web app now proxies `/api/v1` at **request time** using `API_BASE_URL` (set in `render.yaml` from `church-ai-api`).

After pulling this fix, trigger **Manual Deploy** on **church-ai-web** (and **church-ai-api** if needed).

## Quick checklist

1. [Blueprint](https://dashboard.render.com/blueprint/new?repo=https://github.com/Pavanmahaveer7/RhemaAI) → Apply.
2. Set the four API secrets (`generate_render_secrets.ps1`).
3. Wait until both web and API show **Live** (not Build failed).
4. Smoke: `$env:BASE='https://YOUR-web.onrender.com'; .\scripts\beta_smoke.ps1`
5. Share `/app` and sign in with `A-0100` + your `DEMO_SIGNIN_PASSWORD`.

## Free tier expectations

- First visit after idle can take **30–60s** (service waking up).
- Postgres free tier **expires after 30 days** — export or upgrade for a long-lived demo.

## Your URLs

Service names from `render.yaml` are usually:

- Web: `https://church-ai-web.onrender.com`
- API: `https://church-ai-api.onrender.com`

If Render assigned different names, use the **Render Dashboard → church-ai-web → URL**.
