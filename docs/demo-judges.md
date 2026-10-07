# Judge demo script (~5 minutes)

**Share one URL:** https://rhema-ai-web.vercel.app/  
(Also works: https://church-ai-web.vercel.app/)

## Layer 1 — Public (60s)

1. **Home** → **Guide** (header) or banner → steps need no URLs.
2. **Get started** → one-minute **tour**.
3. **App** → search **karma** (or tap a chip). Mic button = **voice search** (Chrome; speech stays in the browser).
4. Open **karma** → definition + traditions → **Save as image** (share sheet / download PNG).
5. **This month** → optional answer (anonymous counts).
6. **Map** → idea constellation (not people).

## Layer 2 — Reader account (30s, optional)

- **Sign in** with email (create account) — pseudonym in UI, not email shown.
- **Settings → Help** to reopen Guide.

## Layer 3 — Staff (90s)

**Path A — invite code (most reliable on stage)**

1. https://rhema-ai-web.vercel.app/staff  
2. **I have a code** → **P-0233** + password from organizer (`.vercel-demo.env.local` on your laptop — **do not** show on screen).  
3. **Tracks** → **Check-in** (demo flow) → **Regional alerts** (leader demo: **L-0100**).

**Path B — phone registration demo**

1. https://rhema-ai-web.vercel.app/staff?register=phone  
2. Enter number → **Send code** → **6-digit code on screen** (beta, not SMS).  
3. Password → new **P-xxxx** → Staff app opens.

## What not to demo live

- `/screens`, `#api=0` — QA fixtures only.  
- **Faith mode** (long-press headword) — expert/review path; mention, don’t live-edit.  
- **Admin A-0100** — beta CSV export; use after survey if needed.

## Health check (before you walk on stage)

```powershell
cd church-ai-stack
$env:BASE='https://rhema-ai-web.vercel.app'; .\scripts\beta_smoke.ps1
```

All lines should be **OK** (dictionary, month, DB, survey, karma term, staff phone OTP).
