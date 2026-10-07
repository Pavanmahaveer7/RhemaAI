# Wiring the frontend to the backend

The UI kit runs today on sample data and `localStorage`. Replace each item below with the API. Keep the screens, routes and wording exactly as they are.

## 1. Sample data → endpoints
| Global (file) | Replace with |
|---|---|
| `window.CA_DATA.lexicon` (`public/data.js`) | `GET /terms?q=`, `GET /terms/:term` |
| `window.CA_DATA.months` (`public/data.js`) | `GET /maps/latest/compare`, `GET /months/current` |
| `faithData.js` | `Term.faith` from `GET /terms/:term` |
| `window.CA_PIPE.me`, `.pack`, `.queue` (`pipeline/data.js`) | `/pastor/home`, `/pastor/packs/:month`, `/review/queue` |
| `window.csChurch()` (`pipeline/ChurchScreens.jsx`) | `/churches` |

## 2. localStorage keys → where they belong
Keep on the device (privacy by design):
`ca_lang`, `ca_theme`, `ca_onboarded`, `ca_curious`, `ca_on_device` (saved words for offline), `ca_my_idea_<month>`, `ca_seen_release`, `ca_remind`, `ca_tabnote_seen`, `ca_team_note_seen`, `ca_start_seen`, `ca_tr_<lang>` (translation cache).

Keep in the tab only (`sessionStorage`, never `localStorage`):
`ca_ck_queue` (an offline check-in, sent on reconnect). Closing the tab or the plain page removes it. Pastor text never stays on a shared phone.

Move to the server:
| Key | Endpoint |
|---|---|
| `ca_accounts` | `/admin/accounts` (wired: list, reveal, log, invite, PATCH role/status, resend invite, password-reset log) |
| `ca_alerts`, alert log | `/alerts`, `/alerts/log` (wired) |
| `ca_packet_ack`, `ca_crisis_ack` | `POST /review/packs/:id/ack` (wired) |
| `ca_map_published` | `POST /maps/draft/publish` |
| `ca_church` | `/churches`, `/churches/join` (wired: register, join-by-code, cache in `ca_church`) |
| `ca_pco` | `/integrations` (wired: list, OAuth connect) |
| `ca_int_notify` | `/me/preferences` `integrationNotify[]` when live |
| `ca_ck_consent` | `/me/preferences` (`checkinAssistant`, `checkinPlain`) |
| `ca_reported_*` | `POST /feedback/report` when live |
| session (`CASession`) | `/auth/*` |

## 3. Shared helpers (keep, point at the API)
| Helper | File | What to change |
|---|---|---|
| `CAGuard.offline()`, `.lockdown()`, `.plain()` | `guard.js`, `api.js` | Wired: while live, `api.js` loads `GET /alerts/active` before render and `lockdown()` reads it. Escape opens the plain page unless a dialog, listbox or menu is open |
| `CA_DEMO` | `guard.js` | stays: demo resolves instantly, no spinners. Sets `html[data-ca-demo]`; every `[data-demo]` control (role picker, outcome picker, demo sign-in) is hidden without it |
| `CAWhy` | `confirm.js` | show `why` from the response |
| `CAHelped` | `confirm.js` | `POST /feedback/helped`. Word page and monthly answer only, never on a check-in result |
| `CACrisisLine` | `confirm.js` | `GET /crisis-lines?country=` |
| `CALangPick`, `CAT`, `CAtr` | `confirm.js` | `PUT /me/preferences {lang}` |
| `i18n.js` | `i18n.js` | load `GET /i18n/:lang`. The live AI draft runs only when `CA_DEMO`; production ships reviewed strings only and calls no model from the browser |
| `CAMic` | `confirm.js` | browser speech-to-text; nothing sent to us. Never on check-ins |
| `CARhythm` | `rhythm.js` | month dates from `/months/current` |

Removed on purpose (do not add back): `CAHaptic` (no vibration), `CASaveCard` (no share or save-as-image cards). Calls to `window.CAHaptic` stay guarded and do nothing.

Known stale copies: `_ds_bundle.js` is a generated build and still holds the old queued-check-in wording, `CASaveCard` call sites and finance lines. The screen `.jsx` files load after it and replace those copies, so the old text does not render, but rebuild the bundle before launch. The translated queued message in `confirm.js` (`CA_TR`) also still uses the old wording and needs re-review.

## 4. Network rules
- One fetch wrapper: adds the session token, maps `ApiError` to the screen states in `api.md` §1, and attaches `requestId` to every error message.
- Timeouts: 8 s, then the error state with Retry. No endless spinner.
- Offline: reads fall back to saved words; check-ins go to `ca_ck_queue` (sessionStorage) and send on `online`, idempotent by `clientId`.
- Never send: Faith-mode state, which word was held, or anything typed in a field that wasn't submitted.

## 5. Tests that must keep passing
`ui_kits/flows.html`, `ui_kits/smoke.html`, `ui_kits/layout.html`, `ui_kits/a11y.html`, `ui_kits/xray.html`. Point them at the real API with demo data and run them before every merge.
