# Share Rhema.ai for beta testing (Vercel)

Send testers these links only. **Do not** share staff codes or `DEMO_SIGNIN_PASSWORD` in a public post.

**Use the web URL, not the API URL.** Opening `rhema-ai-api.vercel.app` in a browser is backend-only (you may see a JSON error). Always share **`rhema-ai-web.vercel.app`**.

| Link | Purpose |
|------|---------|
| https://rhema-ai-web.vercel.app/ | **Start here** — landing page |
| https://rhema-ai-web.vercel.app/tour?from=landing | One-minute product tour (after **Get started**) |
| https://rhema-ai-web.vercel.app/app | Public app — dictionary, monthly question, map |
| https://rhema-ai-web.vercel.app/beta-survey | **Beta feedback** (~1 min, no account) |

Recommended path: **Home → Tour → App → Survey**. Details: [screen-flow.md](./screen-flow.md).

## What testers can do

- Browse the dictionary and monthly question **without** an account.
- **Create account** with any email — they get a pseudonym like `U-A3F2`, not their email in the UI.
- Submit **beta survey** (saved on the server when Postgres is connected — see [vercel-live.md](./vercel-live.md)).

## Pastor / leader / reviewer beta (private cohort)

See **[beta-pastor-invite.md](./beta-pastor-invite.md)** — share staff sign-in + codes + password by DM (not public).

## What you use internally

| Link | Who |
|------|-----|
| https://rhema-ai-web.vercel.app/app#r=signin&staff=l3 | Staff demo (P-0233, L-0100, R-0100, …) |
| https://rhema-ai-web.vercel.app/app#r=admin&tab=feedback&as=admin | Admin beta export (**A-0100** + demo password) |

Password is in `.vercel-demo.env.local` on your machine (`DEMO_SIGNIN_PASSWORD`).

## Pull feedback for slides

1. Sign in as **A-0100**.
2. Admin → **Beta feedback** → summary + **Download CSV**.

Or: https://rhema-ai-web.vercel.app/api/v1/admin/beta-surveys?format=csv (while signed in as admin).

## Notes

- First visit after idle may be slow (free tier wake-up).
- GitHub Pages is static only; the **live** app is always the Vercel URLs above.
