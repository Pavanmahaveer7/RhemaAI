# Rhema.ai screen flow (live beta)

Use **one web host**: **https://rhema-ai-web.vercel.app**  
Do **not** send testers to `rhema-ai-api.vercel.app` (API only).

There are **two apps** on the same site. Do not mix the links.

---

## Path A — Public (Layer 1 & 2)

**Who:** Anyone trying the beta — readers, monthly question, map.

| Step | What | URL |
|------|------|-----|
| 1 | **Landing** | https://rhema-ai-web.vercel.app/ |
| 2 | **Tour** — **Get started** (do not skip unless you know the app) | https://rhema-ai-web.vercel.app/tour?from=landing |
| 3 | **Onboarding** — **Continue into the app** on the tour | https://rhema-ai-web.vercel.app/app#r=intro&step=1 |
| 4 | **Dictionary & monthly question** — guest or **Sign in** (email member) | https://rhema-ai-web.vercel.app/app |
| 5 | **Beta survey** (optional) | https://rhema-ai-web.vercel.app/beta-survey |

Skip tour: **Skip — try the dictionary** on the tour bar, or  
https://rhema-ai-web.vercel.app/app#guest=1&r=search

**Sign in** in the header = **email** accounts only (create account / welcome back). Not staff codes.

---

## Path B — Staff (Layer 3)

**Who:** Invited pastors, leaders, reviewers (private beta). **Not** the public tour or create-account flow.

| Step | What | URL |
|------|------|-----|
| 1 | **Staff sign in** (only entry you should share for L3) | https://rhema-ai-web.vercel.app/staff |
| 2 | Code + password from your organizer (DM) | same screen |
| 3 | **Staff app** opens automatically | `/pastor` (route depends on role) |

| After sign-in (role) | Lands on |
|----------------------|----------|
| Pastor **P-0233** / **P-0901** | `/pastor#r=tracks` (or home flow) |
| Leader **L-0100** | `/pastor#r=alerts` |
| Reviewer **R-0100** | `/pastor#role=reviewer&r=queue` |

**Do not** send L3 testers to `/pastor` first on live — they will be sent to **Staff sign in** if not signed in.  
**Do not** share `/app` tour links with staff cohorts.

Invite pack: [beta-pastor-invite.md](./beta-pastor-invite.md).

**Screenshots only (no login):**  
https://rhema-ai-web.vercel.app/pastor#r=tracks&api=0

---

## Quick reference

| Audience | Start here |
|----------|------------|
| Public beta | https://rhema-ai-web.vercel.app/ |
| Staff beta | https://rhema-ai-web.vercel.app/staff |
| Beta survey | https://rhema-ai-web.vercel.app/beta-survey |

## Two HTML shells

| Shell | URL path | Purpose |
|-------|----------|---------|
| **Public** | `/app` | Dictionary, month, map, member sign-in |
| **Staff** | `/pastor` (after sign-in) | Check-in, tracks, review, alerts |

## Beta survey API

`POST /api/v1/feedback/beta-survey` · Admin CSV: `GET /api/v1/admin/beta-surveys?format=csv` as **A-0100**.

## QA

| Purpose | URL |
|---------|-----|
| All screens | https://rhema-ai-web.vercel.app/screens |
| Admin beta export | Sign in **A-0100** → `/app#r=admin&tab=feedback` |

Screen map: [../contract/screens.md](../contract/screens.md).
