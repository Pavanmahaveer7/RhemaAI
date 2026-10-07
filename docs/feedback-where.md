# Where feedback is collected

All paths are on the **web** origin (local: `http://localhost:3010`, production: `https://rhema-ai-web.vercel.app`).

## 1. Beta survey (main tester feedback)

| What | Where |
|------|--------|
| **Form** | `/beta-survey` (also `/survey`) |
| **API** | `POST /api/v1/feedback/beta-survey` → **204** |
| **Storage** | Server: `store.beta_surveys` (Postgres on Vercel when `DATABASE_URL` is set; in-memory locally unless `-Postgres`) |
| **Read / export** | Sign in as **A-0100** → App → **Admin** → **Beta feedback** tab, or `GET /api/v1/admin/beta-surveys?format=csv` |

Landing footer, home beta band, and `/help` link here. This is the **primary** place to send judges and public testers.

Draft answers are kept in **sessionStorage** (`ca_beta_survey_draft`) until submit.

## 2. “Did this help?” (micro feedback)

| What | Where |
|------|--------|
| **UI** | Word pages (`CAHelped`), monthly flow, some pastor check-in copy |
| **API** | `POST /api/v1/feedback/helped` with `{ surface, id, value }` |
| **Storage** | Server `store.helped` + local duplicate keys `ca_helped_*` in Settings → “What Rhema.ai remembers” |

## 3. Term / faith reports (quality flags)

| What | Where |
|------|--------|
| **UI** | Faith / expert report flows on dictionary |
| **API** | `POST /api/v1/feedback/report` (signed-in or guest session) |
| **Storage** | Server `store.term_reports` |

## 4. Not centralized (by design)

- **Browser-only:** search tab memory (`sessionStorage ca_q`), curious words, theme, guide dismiss flags — see Settings.
- **QA / design:** `/screens`, `#api=0` — not production feedback.

## Quick local check

```powershell
cd church-ai-stack
.\scripts\run_local_demo.ps1   # API :8010, web :3010
$env:BASE='http://localhost:3010'; .\scripts\beta_smoke.ps1
```

Submit a test at http://localhost:3010/beta-survey then list as admin at http://localhost:3010/app#r=admin&tab=feedback (sign in **A-0100** / `dev-only-change-me` locally).
