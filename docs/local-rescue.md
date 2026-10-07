# Local rescue — full Rhema.ai without Vercel

Use this when **production is down**, **partially broken**, or you need a **safe demo** on your laptop. Everything runs on **127.0.0.1**; no Vercel account required.

## Start (one command)

From `church-ai-stack`:

```powershell
.\scripts\run_local.ps1
```

Alt ports if 3000/8000 are busy:

```powershell
.\scripts\run_local_demo.ps1
```

If smoke tests fail with old behavior, free the ports and restart:

```powershell
cd apps\web
npx --yes kill-port 8000 3000 8010 3010
cd ..\..
.\scripts\run_local.ps1
```

Open **one URL** (use **3010** if you started with `run_local_demo.ps1`):

**http://127.0.0.1:3000/local** — app map. Sidebar names every screen; Next/Back walks through. No URL list to memorize. Deep links: `/local#checkin`, `/local#staff`, `/local#admin`.

**Demo staff password:** `dev-only-change-me` for codes like **P-0233**, **L-0100**, **R-0100**, **A-0100**.

Phone OTP: the **6-digit code appears on screen** when `STAFF_PHONE_OTP_DEMO=true` (set by `run_local.ps1`).

## Verify before a demo

```powershell
$env:BASE = "http://127.0.0.1:3000"
.\scripts\beta_smoke.ps1
```

## Three fallback levels

1. **Full local (best)** — API + web from `run_local.ps1`. Real auth, check-ins, surveys, map draft.
2. **Web only, API dead** — UI shows a rescue banner; data is **preview/fixture** unless you add `#api=0` (QA only).
3. **UI-only screenshots** — e.g. `/pastor#r=tracks&api=0` (no server).

Default API store is **in-memory** (`CONTRACT_STORE=memory`): restarts reset data. For persistence on laptop:

```powershell
.\scripts\run_local.ps1 -Docker
```

## What differs from production

- No real SMS (demo code on screen).
- `LLM_MODE=off` — template fallbacks where the contract allows.
- No Neon unless you pass `-Docker` and `DATABASE_URL`.
- Do not point `.env.development.local` at Vercel; `run_local.ps1` overwrites it with `http://127.0.0.1:8000`.

## Stop

Note PIDs printed by the script, or:

```powershell
Get-Process -Name node,python -ErrorAction SilentlyContinue | Stop-Process -Force
```

(Only if you started via `run_local.ps1`.)
