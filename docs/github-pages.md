# GitHub Pages (static preview)

On every push to **`main`**, [GitHub Pages](https://docs.github.com/en/pages) publishes **`apps/web/public`** (landing + UI kits).

| Host | Role |
|------|------|
| **https://pavanmahaveer7.github.io/RhemaAI/** | Static browse (use `#api=0` in links for fixtures without API) |
| **https://rhema-ai-web.vercel.app** | Full **Rhema.ai** app (Next.js + live API) |

Enable once in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Sign-in and `/api/v1` proxy require **Vercel**; GitHub Pages has no server.
