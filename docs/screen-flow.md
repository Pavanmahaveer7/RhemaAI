# Rhema.ai screen flow (live beta)

Use **one web host** for sharing: **https://rhema-ai-web.vercel.app**  
Do **not** send testers to `rhema-ai-api.vercel.app` (API only).

## First-time journey (public beta)

| Step | What | URL |
|------|------|-----|
| 1 | **Landing** — search a word, see the month preview | https://rhema-ai-web.vercel.app/ |
| 2 | **Product tour** — tap **Get started** or **Tour** | https://rhema-ai-web.vercel.app/tour?from=landing |
| 3 | **Onboarding** — tap **Continue into the app** on the tour | https://rhema-ai-web.vercel.app/app#r=intro&step=1 |
| 4 | **Dictionary & monthly question** — guest or create account | https://rhema-ai-web.vercel.app/app |
| 5 | **Beta survey** (optional, ~1 min) | https://rhema-ai-web.vercel.app/beta-survey |

Power users can skip the tour: **Skip — try the dictionary** on the tour bar, or open  
https://rhema-ai-web.vercel.app/app#guest=1&r=search

## Share links (copy/paste)

| Audience | Link |
|----------|------|
| Everyone (start here) | https://rhema-ai-web.vercel.app/ |
| Tour only | https://rhema-ai-web.vercel.app/tour?from=landing |
| App (after tour) | https://rhema-ai-web.vercel.app/app |
| Beta feedback form | https://rhema-ai-web.vercel.app/beta-survey |
| Pastor / staff app | https://rhema-ai-web.vercel.app/pastor |

Staff sign-in for L3 demo lives at  
https://rhema-ai-web.vercel.app/app#r=signin&staff=l3  
(codes + password — **private DM only**; see [beta-pastor-invite.md](./beta-pastor-invite.md)).

## Two HTML shells

| Shell | Path on site | Hash routes |
|-------|----------------|-------------|
| **Public** (L1 dictionary, month, map, settings) | `/app` → `ui_kits/public/index.html` | `#r=search`, `#r=term&t=…`, `#r=month`, `#r=graph`, … |
| **Pastor pipeline** (L3 pastor, reviewer, leader) | `/pastor` → `ui_kits/pipeline/index.html` | `#r=home`, `#r=checkin`, `#role=reviewer&r=queue`, … |

Full screen → file → API map: [../contract/screens.md](../contract/screens.md).

## Beta survey API

The form posts to **`POST /api/v1/feedback/beta-survey`** (not `/api/beta-feedback`).

Admin CSV: **`GET /api/v1/admin/beta-surveys?format=csv`** while signed in as admin (**A-0100**).

## Internal / QA

| Purpose | URL |
|---------|-----|
| All screens smoke board | https://rhema-ai-web.vercel.app/screens |
| Admin beta export (signed-in admin) | `/app#r=admin&tab=feedback` after **A-0100** sign-in |

Hash-only `as=admin` without a session shows **Admins only** — that is expected.
