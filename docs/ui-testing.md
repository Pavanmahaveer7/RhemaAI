# UI automated testing

## Screen smoke (every route)

Catalog: `apps/web/public/design/ui_kits/screens-manifest.json` (name, URL, expected text regex).

### Headless (CI / local)

1. Start Next: `pnpm dev:web` or `.\scripts\run_local.ps1`
2. Once: `pnpm test:ui:install` (Playwright Chromium)
3. Run: `pnpm test:ui` or `.\scripts\ui_automation.ps1`

Environment:

- `BASE=http://127.0.0.1:3000` (default)
- `UI_SMOKE_WAIT_MS=4500` — per-screen wait for React/Babel
- `UI_SMOKE_FAIL_FAST=1` — stop on first failure

Staff screens use `api=0` in the manifest so tests do not require sign-in cookies.

### In browser

- **Smoke table:** `/design/ui_kits/smoke.html` — same manifest, iframe pass/fail
- **Flows (interactions):** `/design/ui_kits/flows.html` — monthly send, Faith hold, lockdown, check-in, reviewer ack (~27 steps)

## API layer smoke

`.\scripts\layer_smoke.ps1` — dictionary, months, pastor, alerts, admin (needs API + proxy).

## Adding a screen

1. Add an entry to `screens-manifest.json` with `expect` matching visible copy.
2. Optionally add to `screens.js` for the All Screens board.
3. Re-run `pnpm test:ui`.
