# Security runbook (Rhema AI)

Use this after deploy to [Pavanmahaveer7/RhemaAI](https://github.com/Pavanmahaveer7/RhemaAI) and when rotating credentials.

## Secrets (env only)

Set these in Render (or your host). **Never** commit `.env`. Only `.env.example` is tracked.

| Variable | Notes |
|----------|--------|
| `DEMO_SIGNIN_PASSWORD` | Disable shared staff password in prod (`APP_ENV=production` already blocks it); rotate if ever exposed |
| `CHECKIN_ENCRYPTION_KEY` | Rotating invalidates encrypted PII blobs — plan a migration |
| `AGENT_SERVICE_TOKEN` | Bearer for packet prepare agent; rotate and update worker |
| `INTEGRATION_WEBHOOK_SECRET` | HMAC for Planning Center webhooks |
| `LLM_API_KEY` | Provider dashboard only; set **billing / spend caps** there too |
| Supabase keys | When Auth is wired: anon key in web only; service role server-only |

After any leak or first public push: **rotate all of the above** even if git history looks clean.

## HTTPS and CORS

- Render serves HTTPS. Set `APP_BASE_URL` to your **web** origin (`https://…`).
- Set `CORS_ORIGINS` to comma-separated allowed origins (marketing site, preview URLs).
- In production, localhost is **not** allowed in CORS (see `apps/api/src/app/main.py`).

## Auth and rate limits

- Sessions: `HttpOnly` cookie `ca_session`, `Secure` in production, `SameSite=lax`.
- Sign-in: `AUTH_SIGNIN_RATE_PER_HOUR` (default 10 per IP per hour).
- Sign-up: `AUTH_SIGNUP_RATE_PER_HOUR` (default 5 per IP per hour).
- Cookie-authenticated writes: origin/referer checks (CSRF-style) in `guard_writes` middleware.

## Errors

- Clients receive `ApiError` JSON (`kind`, `code`, `message`, `requestId`) — no stack traces when `APP_ENV=production`.
- Logs retain full exceptions server-side with `rid=`.

## Model spend

- `LLM_MODE=off` until you are ready for live calls.
- `LLM_DAILY_MAX_CALLS` — in-process daily cap (0 = unlimited). Prefer provider-side hard caps as well.
- Circuit breaker in `llm-gateway` pauses after repeated failures.

## Database

- **Today:** Render Postgres (single app user). Row-level security is **not** enabled; access control is in FastAPI.
- **Supabase (planned):** enable RLS on tenant tables; API uses service role + verified JWT; see `docs/vibe-security.md` and ADR-004.

## Backups

- Enable Render Postgres backups on a paid plan, or schedule `pg_dump` to durable object storage.
- Ephemeral disk on web/API services — do not store state on disk.

## Dependencies

Before each release: run CI, update lockfiles, and address high/critical advisories (`pnpm audit`, Python deps in `apps/api`).

## Checklist before beta traffic

- [ ] All secrets rotated from dev defaults
- [ ] `APP_ENV=production` on API
- [ ] `APP_BASE_URL` + `CORS_ORIGINS` set to real domains
- [ ] `LLM_DAILY_MAX_CALLS` or provider spend cap
- [ ] Render GitHub deploy from `main`
- [ ] No `.env` in repo (`git ls-files '*.env'` empty)
