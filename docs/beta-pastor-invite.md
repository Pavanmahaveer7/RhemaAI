# Pastor layer (L3) — private beta invite

Use this for **trusted testers** who should try tracks, check-ins, alerts, or review — not for a public post.

## Link (share this only for L3 — not the public landing tour)

**Staff sign-in:** https://rhema-ai-web.vercel.app/staff  

(Same screen as `/app#r=signin&staff=l3` — one hop so testers are not dropped on the dictionary.)

Sign-in uses a **code name** + **password** (not the public “create account” email flow). After sign-in the browser opens **`/pastor`** (Staff app).

## Demo codes (shared sandbox data)

| Code | Role | Good for |
|------|------|----------|
| **P-0233** | Pastor (+ leader) | Full demo: Three tracks, check-in, pack, **Regional alerts** (Bangladesh demo church) |
| **P-0901** | Pastor | US demo church (`Demo Church`) |
| **L-0100** | Leader | Regional alerts only |
| **R-0100** | Reviewer | Review queue |

**Password:** send **`DEMO_SIGNIN_PASSWORD`** separately (same value as on your machine in `.vercel-demo.env.local`). Do not publish it with the code list.

## After sign-in

- Pastor **P-0233** → https://rhema-ai-web.vercel.app/pastor#r=tracks  
- Leader **L-0100** → https://rhema-ai-web.vercel.app/pastor#r=alerts  
- Reviewer **R-0100** → https://rhema-ai-web.vercel.app/pastor#role=reviewer&r=queue  

## What to tell testers

- This is **demo data** (fake church names, sample packs) — not real congregations or live Planning Center.
- Do not enter real pastoral care details you would not want in a beta database.
- Public readers still use https://rhema-ai-web.vercel.app/app without these codes.

## Do not share in the pastor beta pack

- **A-0100** (admin) — keep for you only (beta CSV export).
- Do not post the shared password on social media; DM or password manager link is fine for a small cohort.

## Optional: UI-only preview (no login)

https://rhema-ai-web.vercel.app/pastor#r=tracks&api=0 — fixture UI without API (for screenshots only).
