# Rhema.ai — local demo cheat sheet

Base URL (local Next): **http://127.0.0.1:3000**

## One public home, one staff door

| Audience | Entry |
|----------|--------|
| Everyone | **/** — dictionary (no account required) |
| Layer 3 staff | **Staff sign in** → `/app#r=signin&staff=l3` |

There is no separate “leader landing”. Alerts live **inside** `/pastor` (regional alerts nav or button on Three tracks).

---

## Demo password (all staff codes)

**`dev-only-change-me`**

| Code | Primary role | After sign-in |
|------|----------------|---------------|
| **P-0233** | Pastor (+ demo regional leader) | `/pastor#r=tracks` — also **Regional alerts** in nav |
| **L-0100** | Leader only | `/pastor#r=alerts` |
| **R-0100** | Reviewer | `/pastor#role=reviewer&r=queue` |
| **A-0100** | Admin | `/app#r=admin&tab=feedback&as=admin` — beta survey summary + CSV |

---

## Try pastor + alerts (one login)

1. **http://127.0.0.1:3000/** → **Staff sign in**
2. **P-0233** / **dev-only-change-me** → **Sign in**
3. **Three tracks** → **Regional alerts** (or sidebar **Regional alerts**)
4. Same session — no second sign-in

Preview without API: **http://127.0.0.1:3000/pastor#r=tracks&api=0** (Daniel has `alsoLeader` in fixture data)

---

## Layers (URLs)

**L1/L2:** `/app#guest=1&r=search`, `#r=month`, `#r=graph`

**L3:** `/pastor` — home, tracks, pack, check-in, alerts (if allowed), reviewer queue

**Board:** `/screens`

---

## Run locally

```powershell
cd church-ai-stack
.\scripts\run_local.ps1
```

**Automated UI (every screen):** with Next on `:3000`, run `pnpm test:ui:install` once, then `pnpm test:ui` or `.\scripts\ui_automation.ps1`

**Browser smoke board:** http://127.0.0.1:3000/design/ui_kits/smoke.html

**Interaction flows:** http://127.0.0.1:3000/design/ui_kits/flows.html

API smoke: `.\scripts\layer_smoke.ps1`
