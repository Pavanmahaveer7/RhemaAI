# Supabase Auth and row-level security

**Today:** Render Postgres + contract sessions in FastAPI. Access control lives in `_require()` on each route.

**When you adopt Supabase (ADR-004):**

1. Enable **Supabase Auth**; verify JWTs in FastAPI (`SUPABASE_JWT_SECRET`). Never trust `role` from the client.
2. Enable **RLS** on tables that hold PII or pastor data (`checkins`, `identities`, `review_packs`, etc.).
3. Browser uses **anon key** only; **service role** stays on the API host only.
4. Start from `infra/supabase/rls-starter.sql` and add one policy per table with tests.

Until then, do not expose `DATABASE_URL` or the service role to the Next.js app.
