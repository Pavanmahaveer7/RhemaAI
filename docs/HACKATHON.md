# Rhema.ai — Hackathon & beta documentation

Single reference for judges, teammates, and future you: **what we built**, **how it is secured**, **how data is handled**, and **how we test it**.  
Live app: **https://rhema-ai-web.vercel.app** (always share the **web** URL, not the API host).

---

## 1. Product in one page

**Rhema.ai** helps people compare the **same word** across Hindu, Buddhist, and Christian traditions—with sources—so a shared label is not mistaken for the same idea. A **monthly question** collects anonymous answers; ideas are **counted, not quoted**. A **pastor layer (L3)** supports check-ins, review, and regional alerts on **demo data** for beta.

| Layer | Who | What |
|-------|-----|------|
| **L1 — Public** | Anyone | Dictionary, Faith mode (human-reviewed), settings, guest or email member |
| **L2 — Community** | Anonymous devices | Monthly answer → grouped concepts → published ideas map (no answer text shown) |
| **L3 — Pastor pipeline** | Invited staff codes | Tracks, check-in, packs, church apps, reviewer queue, leader alerts |

**Design principle:** We map **ideas**, never people. Pseudonyms in the UI; pastor notes encrypted at rest when the API is configured for production keys.

---

## 2. What we shipped for this hackathon / beta

### Live stack (Vercel + GitHub)

| Component | Project | URL |
|-----------|---------|-----|
| Web (Next.js) | `rhema-ai-web` | https://rhema-ai-web.vercel.app |
| API (FastAPI) | `rhema-ai-api` | https://rhema-ai-api.vercel.app (browser → JSON; use web for humans) |

- Web proxies **`/api/v1/*`** to the API so cookies and CORS stay on one origin.
- **Neon Postgres** on the API (`CONTRACT_STORE=postgres`, `DATABASE_URL`) so beta surveys, accounts, and store state survive deploys (Vercel disk is ephemeral).
- Rebrand from early “Church AI” naming to **Rhema.ai** across UI and docs.
- **Public journey:** Landing → **Get started** (tour) → onboarding → app → optional **beta survey**.
- **Auth UX:** One header **Sign in** for **email members**; **Pastor & staff** in the footer (code + invite password, not public create-account).

Repo: **https://github.com/Pavanmahaveer7/RhemaAI** (branch `main`).

### Contract-first backend

- HTTP API matches **`contract/api.md`** and error shape in **`contract/types.ts`** (`kind`, `code`, `message`, `requestId`, `retryable`—no stack traces to clients).
- State is a **JSONB document store** in Postgres (`store_state`, ADR-006) plus **`source_chunk`** for licensed passages (ADR-007).
- **87+ pytest** cases on the API; CI also runs API tests against real Postgres.

### UI

- Static design harness under **`apps/web/public/design/ui_kits/`** (public app, pastor pipeline, landing, tour, beta survey).
- **45 screen smoke** tests + **59 + 28** headless guardrail tests (`tests.html`, `flows.html`).

---

## 3. Architecture (high level)

```
Browser → rhema-ai-web (Next.js)
              ↓ /api/v1/*
         rhema-ai-api (FastAPI)
              ↓
         Postgres (Neon) — accounts, sessions, terms, months, answers, L3 pipeline, beta surveys
              ↓ (optional / degraded in beta)
         LLM gateway + MCP tools — compare, graph, check-in analyst (packages/llm-gateway, packages/mcp/*)
```

Full diagram and lifecycle: **`docs/architecture.md`**, **`docs/adr/ADR-004-tech-stack.md`**.

**Important:** All model calls are intended to go through **`packages/llm-gateway`** with the guardrail pipeline in **`docs/guardrails.md`**. The beta can run with **`LLM_MODE=off`** and template fallbacks where routes allow it.

---

## 4. Backend — implemented behavior

### Core routes (see `contract/api.md`)

- **Auth:** guest, signup, signin, signout, session (HttpOnly cookie; token stored as hash server-side).
- **L1:** term search, term detail, expert edits, preferences, onboarding, memory, delete-me.
- **L2:** current month, submit answer (moderated), latest map compare.
- **L3:** pastor home, check-ins, tracks, packs, review queue, decisions, acks, alerts (role-gated).
- **Admin:** accounts, reveal log, map draft, beta survey CSV export.
- **Beta:** `POST /api/v1/feedback/beta-survey` → `204` (rate limited).
- **Ops:** `/api/v1/status`, `/health`, `/ready` (ready may show Redis/graph/LLM as not configured—OK for beta).

### Store & roles

- Demo **staff codes** (e.g. `P-0233`, `L-0100`, `R-0100`, `A-0100`) seeded when **`DEMO_SIGNIN_PASSWORD`** (or **`BETA_SHARED_STAFF_LOGIN`**) is set for beta.
- After staff sign-in, the UI redirects to **`/pastor`** with the correct hash (tracks, alerts, or reviewer queue) based on role—see **`docs/beta-pastor-invite.md`**.

### Production rules (API)

- Request body **≤ 16 KB**; free-text fields capped per contract.
- **Scrypt** password hashes for members; shared staff password **refused in production** unless explicitly enabled for beta cohort.
- **Session cookies:** hashed at rest; production rejects cookie writes without a trusted **Origin**.
- **HSTS** on API responses when deployed (`Strict-Transport-Security` in `apps/api/src/app/main.py`).

---

## 5. Security

### Server-side moderation (`apps/api/src/app/v1/moderate.py`)

Aligned with **`contract/moderation.md`**. Used before persisting user text (e.g. monthly answers, beta survey fields):

| Check | On fail (typical) |
|-------|-------------------|
| Prompt injection heuristics | **403** `blocked_injection`; audit row; nothing saved |
| Crisis / self-harm phrases | Routed per L3 escalation policy (see guardrails doc) |
| PII (email, phone, street, “my name is…”) | **Redact** to `[removed]` where policy allows |
| Hate, sexual, threats, spam | Block or reject |
| Gibberish / unclear input | **422** validation (e.g. repeated vowels, keyboard mash) |

### Router-level controls (`apps/api/src/app/v1/router.py`)

- Rate limits on **guest**, **signin**, **signup**, **answers**, **beta survey**, and related buckets (in-memory per instance on serverless—resets on cold start; see audit notes).
- Role checks on pastor, reviewer, leader, and admin routes (`test_route_auth.py`).

### Client-side mirror (defense in depth)

- **`ui_kits/guard.js`** — offline, lockdown, demo mode, shared **`CAGuard.injection`** / crisis helpers.
- **`ui_kits/input.js` (`CAInput`)** — blocks obvious injection before submit; used in flows and monthly UI.
- Users still cannot bypass server rules; UI gives fast feedback.

### CI & supply chain

| Job | What it does |
|-----|----------------|
| `lint-test` | pnpm lint/test + `uv run pytest` (`CONTRACT_STORE=memory`) |
| `api-postgres` | Full pytest against Postgres service |
| `guardrail-audit` | `scripts/guardrail_audit.py` — gateway-only LLM, pipeline wiring |
| `secret-scan` | Gitleaks on history |
| `dependencies` | `pnpm audit` + `pip-audit` |
| `ui-guardrails` | Build web, run **45 screen smoke** + **tests.html + flows.html** |
| `evals` | `scripts/run_evals.sh` |
| `schemas` | JSON Schema meta-validation |

Workflow: **`.github/workflows/ci.yml`**.

### Threat model & runbooks

- **`docs/threat-model.md`** — assets, trust boundaries, abuse cases.
- **`docs/security-runbook.md`** — incident-style checklist.
- **`docs/data-ethics.md`** — what we collect and what we refuse to infer.

---

## 6. Vibe security (how we used the checklist)

**`docs/vibe-security.md`** records our adoption of the [Vibe Security skill](https://github.com/raroque/vibe-security-skill) and a practical web checklist—mapped to **this** stack (FastAPI + Next + Postgres on Vercel/Neon, not Firebase).

**Already true in this repo (do not undo):**

- No model API keys in the browser; only public API base URL as needed.
- Parameterized DB access in vocab MCP; no SQL built from raw user strings in pilot paths.
- Uniform **`ApiError`** JSON; clients never see Python stack traces.
- Dictionary and public writes go through moderation + size limits.

**Planned / partial (honest for judges):**

- Supabase Auth JWT verification — **designed**, session cookie auth **implemented** for beta.
- Redis-backed rate limits and Cloudflare WAF — **architecture**; beta uses in-memory limits on Vercel.
- Full **OUT-FLOURISH** and Presidio PII in **`packages/llm-gateway`** — specified in **`docs/guardrails.md`**; enforce before calling LLM routes production-ready.

When packet/prepare routes go live, **`docs/vibe-security.md`** requires real sign-in, rate limit on model calls, and no pastor note in `localStorage`.

---

## 7. Data & privacy

Summary from **`docs/data-model.md`**:

| Data | Storage | Class |
|------|---------|--------|
| Dictionary / published map | Postgres / store | **PUBLIC** |
| Monthly answers | Redacted text + salted device hash per month | **COMMUNITY** (not linkable across months) |
| Member email | Hashed / encrypted identity split | **PRIVATE** |
| Check-in struggles/wins | Encrypted with `CHECKIN_ENCRYPTION_KEY` | **PRIVATE, encrypted** |
| Sessions | Cookie token hashed server-side | **PRIVATE** |
| Audit / blocks | Reason codes, no free-text dump | **PRIVATE** |

**Beta survey** responses stored server-side for admin CSV export (**A-0100** only—do not share admin code publicly).

**Retention:** `DELETE /me` implemented; broader retention automation documented as future work in beta audit.

---

## 8. Testing — how to reproduce

### API (local or CI)

```powershell
cd church-ai-stack
uv sync --all-packages
uv run pytest -q
# With Postgres (like CI):
# set TEST_DATABASE_URL, DATABASE_URL, DEMO_SIGNIN_PASSWORD, CHECKIN_ENCRYPTION_KEY, AGENT_SERVICE_TOKEN, LLM_MODE=off
```

Key files: **`apps/api/tests/test_security.py`**, **`test_contract.py`**, **`test_route_auth.py`**, **`test_beta_survey.py`**, **`test_persistence.py`**.

### UI smoke + guardrails

```powershell
pnpm install
pnpm test:ui:install
pnpm dev:web   # or run_local.ps1
pnpm test:ui:all
```

- Manifest: **`apps/web/public/design/ui_kits/screens-manifest.json`**
- Details: **`docs/ui-testing.md`**

### Live beta smoke

```powershell
$env:BASE='https://rhema-ai-web.vercel.app'
.\scripts\beta_smoke.ps1
```

Checks terms, months, status (including **Database up**), and beta survey POST.

### Manual guardrail checks (live)

- Beta survey with injection string → **403**
- Nonsense answer (e.g. repeated letters) → **422**
- Documented in rehearsal: **`docs/demo-rehearsal.md`**

---

## 9. User flows & URLs (share sheet)

| Audience | Start here |
|----------|------------|
| Public testers | https://rhema-ai-web.vercel.app/ → tour → app |
| Beta feedback | https://rhema-ai-web.vercel.app/beta-survey |
| Email members | Header **Sign in** / **Create account** on `/app` |
| Pastor / leader / reviewer demo | https://rhema-ai-web.vercel.app/app#r=signin&staff=l3 + invite code + password (**DM only**) |
| Admin (you) | **A-0100** + demo password → Admin → Beta feedback / CSV |

Full table: **`docs/screen-flow.md`**. Pastor pack: **`docs/beta-pastor-invite.md`**. Public share list: **`docs/beta-testers.md`**.

---

## 10. Deployment & operations

| Task | Doc / script |
|------|----------------|
| Full Vercel deploy (API + web) | **`scripts/vercel_deploy.ps1`**, **`docs/vercel-live.md`** |
| Neon Postgres | **`scripts/vercel_neon_provision.ps1`**, **`scripts/vercel_set_database.ps1`** |
| GitHub → Vercel auto-deploy | **`scripts/vercel_git_connect.ps1`** |
| Env secrets | `.vercel-demo.env.local` (local only, **gitignored**) — `DEMO_SIGNIN_PASSWORD`, `CHECKIN_ENCRYPTION_KEY`, etc. |

**Render** blueprint and docs remain for alternative hosting (**`docs/render-deploy.md`**, **`render-platform`** rules); **current beta** is **Vercel + Neon**.

---

## 11. Architecture decisions (ADRs)

| ADR | Topic |
|-----|--------|
| ADR-001 | Single LLM gateway |
| ADR-002 | Intake agent routing |
| ADR-003 | L3 privacy |
| ADR-004 | Tech stack |
| ADR-005 | Human-in-the-loop & data minimization |
| ADR-006 | JSONB state in Postgres |
| ADR-007 | Licensed source ingest |

Folder: **`docs/adr/`**.

---

## 12. Known limits (transparent for judges)

- **Rate limits** are per serverless instance; not global Redis yet.
- **LLM / graph DB / Redis** may show `not_configured` or `degraded` on `/status`—beta UX works on fixtures + Postgres store.
- **L3 UI** still uses fixture fallbacks (`api=0`) in some test boards; live sign-in hits API when deployed with Postgres and demo password configured.
- **Email** (invite/reset): not SMTP—beta uses known demo passwords for staff cohort.
- **Pipeline ↔ API** wiring for every pastor screen is ongoing; contract and tests lead UI integration.

Backlog pointer: **`docs/pending-tasks.md`**, **`docs/beta-readiness-audit.md`**.

---

## 13. Related docs (deep dives)

| Topic | File |
|-------|------|
| API contract | `contract/api.md`, `docs/api.md` |
| Guardrail catalogue | `docs/guardrails.md` |
| Vibe security mapping | `docs/vibe-security.md` |
| L3 pipeline | `docs/l3-pastor-pipeline.md` |
| Demo script | `docs/demo-rehearsal.md`, `docs/demo-cheatsheet.md` |
| Lexicon & Faith mode | `docs/lexicon-standards.md` |
| Observability | `docs/observability.md` |
| Evals | `docs/evals.md`, `evals/datasets/` |

---

*Last updated for the Vercel live beta (landing → tour → app, Neon persistence, CI ui-guardrails). Update this file when architecture or security posture changes.*
