# ADR-006: Save the screen API's state to Postgres as JSONB documents
- Status: accepted
- Date: 2026-10-06
- Deciders: product owner, engineering

## Context
The `/api/v1` screen API kept every collection (accounts, sessions, monthly answers, check-ins, review
decisions, alerts, expert edits, …) in process memory, so a restart lost everything submitted from the
frontend. The owner asked for something easy to maintain now, and to move to a secured host later.
`docs/data-model.md` describes normalised tables, but the screen contract is still changing weekly.

## Decision
- One table, `store_state(name TEXT PRIMARY KEY, data JSONB, updated_at)`, one row per collection
  listed in `PERSISTED` in `apps/api/src/app/v1/store.py`.
- Startup loads the saved rows. For `terms`, new seed words are added and saved words keep their edits.
- After every POST, PUT, PATCH or DELETE, a middleware saves the collections whose content hash changed.
- Sessions live in the same table for now, not Redis. Rate-limit windows stay in memory.
- `CONTRACT_STORE=memory` saves nothing; the tests use it. The persistence tests use `church_ai_test`.
- Check-in text and real names stay encrypted with `CHECKIN_ENCRYPTION_KEY` before they are saved.

## Alternatives considered
- Normalised tables from `data-model.md` now: right long term, but every contract change would need a
  migration while the screens are still moving.
- Redis for sessions: another service to run for no gain at this scale.
- SQLite file: Render's filesystem is ephemeral, so it would be lost on every deploy.

## Consequences (good, bad, follow-ups)
- Good: one small table, no migrations, everything the frontend submits survives a restart.
- Bad: each save rewrites a whole collection, so large collections (events, audit) get slower over time.
  Fine for a pilot; not for production traffic.
- Session tokens are stored as a SHA-256 hash (ADR-006 follow-up, done in Phase 2a). The cookie still holds the raw token.
- Follow-up: move to the `data-model.md` tables (with row-level security) when moving to Supabase or
  another secured host; Memgraph and Redis come back with that move.
