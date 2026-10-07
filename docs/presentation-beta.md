# Beta demo + feedback for presentations

## Share with testers

| Link | Purpose |
|------|---------|
| `https://YOUR-WEB.vercel.app/` | Try the dictionary (no account) |
| `https://YOUR-WEB.vercel.app/beta-survey` | **Collect feedback** (~1 minute) |
| `https://YOUR-WEB.vercel.app/app#r=signin&staff=l3` | Staff demo (P-0233 + your demo password) |

Landing **Share beta feedback** and footer **Beta feedback** go to the same survey.

## Deploy so feedback is saved

1. **Web** + **API** on Vercel ([vercel-deploy.md](./vercel-deploy.md)).
2. Set **`API_BASE_URL`** on web and **`APP_BASE_URL`** on API.
3. Use **`CONTRACT_STORE=postgres`** (Neon) if responses must survive cold starts — not `memory` alone.
4. Smoke: `$env:BASE='https://YOUR-WEB.vercel.app'; .\scripts\beta_smoke.ps1`

## Pull numbers for slides

1. Sign in as **`A-0100`** with your `DEMO_SIGNIN_PASSWORD`.
2. Open **Admin → Beta feedback** (`/app#r=admin&tab=feedback&as=admin`).
3. Read the summary cards (total, would use again, ease, fair, top “feel” words).
4. Click **Download CSV** for quotes and follow-up emails.

Direct export (while signed in as admin):

`https://YOUR-WEB.vercel.app/api/v1/admin/beta-surveys?format=csv`

## Suggested slide bullets (from summary)

- **N** beta responses (no account required)
- **X%** would use it again (`againYes / total`)
- Average ease **X / 5**
- Top feelings: Calm, Clear, … (`topFeel`)
- Optional: 1–2 anonymized lines from **broken** notes (CSV column)

## Privacy

- Survey asks people not to put names/places in free text; crisis wording is handled in the form.
- Optional email is for follow-up only — not shown in public UI.
