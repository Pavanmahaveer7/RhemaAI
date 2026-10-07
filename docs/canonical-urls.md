# Rhema.ai — one product, one host

**Share only:** https://rhema-ai-web.vercel.app  

Do **not** give users `rhema-ai-api.vercel.app` (backend). Custom domain `rhema.ai` may be a parking page until DNS points at Vercel.

## One app, four workspaces (same software)

Think of Rhema.ai like a modern super-app: **one account host**, **one design system**, different **workspaces** you enter by role—not separate products.

| Workspace | Path | Who | Stays in browser as |
|-----------|------|-----|---------------------|
| **Home** | `/` | Everyone | Marketing + search + tour entry |
| **Reader** | `/app` | Public | Dictionary, monthly question, ideas map |
| **Staff** | `/pastor` (after sign-in) | Pastor, leader, reviewer | Check-in, tracks, review, alerts |
| **Feedback** | `/beta-survey` | Anyone | 1-minute beta form |

**Staff never starts at `/pastor` cold on live** — use **`/staff`** first; the app opens Staff after sign-in.

## User-facing URLs (bookmark these)

| Short name | URL | Purpose |
|------------|-----|---------|
| **Start** | https://rhema-ai-web.vercel.app/ | Home |
| **Tour** | https://rhema-ai-web.vercel.app/tour?from=landing | One-minute intro |
| **Reader app** | https://rhema-ai-web.vercel.app/app | Public dictionary & month |
| **Dictionary (guest)** | https://rhema-ai-web.vercel.app/dictionary | Alias → guest search |
| **Staff sign-in** | https://rhema-ai-web.vercel.app/staff | Layer 3 entry |
| **Staff phone demo** | https://rhema-ai-web.vercel.app/staff?register=phone | Register with SMS demo |
| **Survey** | https://rhema-ai-web.vercel.app/beta-survey | Beta feedback |
| **Help** | https://rhema-ai-web.vercel.app/help | This manual in the browser |

## Internal / power-user URLs (same host)

| URL | Purpose |
|-----|---------|
| `/app#r=signin` | Email member sign-in |
| `/app#r=signin&staff=l3` | Same as `/staff` (code sign-in) |
| `/app#guest=1&r=search` | Skip account; dictionary only |
| `/app#r=month` | Monthly question |
| `/app#r=graph` | Ideas map |
| `/app#r=settings` | Privacy & preferences |
| `/pastor#r=tracks` | Pastor three tracks (after auth) |
| `/pastor#role=reviewer&r=queue` | Reviewer queue |
| `/pastor#r=alerts` | Regional alerts |
| `/screens` | QA: all screens board (not for public beta) |

## Hidden / demo-only (do not share in public posts)

| URL / flag | Purpose |
|------------|---------|
| `#api=0` on `/pastor` | Fixture data, no server (screenshots, CI) |
| `#as=admin` in hash | Layout preview only until **A-0100** signs in |
| `/design/ui_kits/smoke.html` | Automated screen tests |
| `/design/ui_kits/flows.html` | Guardrail interaction tests |
| Escape → `plain.html` | Privacy plain page (no styling) |
| `#lockdown=1` or active regional alert | Hides month/map on public app |

Full interaction manual: **[user-manual.md](./user-manual.md)**.
