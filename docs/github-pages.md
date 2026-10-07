# GitHub Pages (static preview)

Workflow **GitHub Pages** copies **`apps/web/public`** to the **`gh-pages`** branch on every push to **`main`**.

## One-time setup (required)

1. Open **https://github.com/Pavanmahaveer7/RhemaAI/settings/pages**
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** **`gh-pages`** · **`/ (root)`**
3. Save. After the workflow runs, the site is live at:

**https://pavanmahaveer7.github.io/RhemaAI/**

If you see 404, wait 1–2 minutes, then check **Actions** → **GitHub Pages** (green check).

## What works on Pages vs Vercel

| | GitHub Pages | Vercel (**rhema-ai-web**) |
|--|--------------|---------------------------|
| Landing / UI kits | Yes (static) | Yes |
| Live API / sign-in | No (use `#api=0` fixtures) | Yes |
| Beta survey POST | No | Yes |

Full app: **https://rhema-ai-web.vercel.app**

## Re-run deploy

**Actions** → **GitHub Pages** → **Run workflow**, or push any commit to **`main`**.
