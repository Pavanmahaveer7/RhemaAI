-- Run when Postgres moves to Supabase and Auth is wired (ADR-004).
-- FastAPI should use the service role for writes; anon/authenticated roles get RLS.
-- Adjust table names when the normalized schema replaces store_state JSONB.

-- alter table public.checkins enable row level security;
-- alter table public.accounts enable row level security;

-- Example: pastors read only their check-ins (JWT sub = pastor_id).
-- create policy "pastor_own_checkins" on public.checkins
--   for select using (auth.uid()::text = pastor_id);

-- Example: no direct anon access to check-ins (API only).
-- create policy "no_anon_checkins" on public.checkins
--   for select to anon using (false);

-- Document every policy in docs/supabase-rls.md before enabling in production.
