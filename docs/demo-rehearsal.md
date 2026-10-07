# Demo rehearsal

About ten minutes. The path below was clicked through on this machine. The site and the API were both up, and sign-in as `A-0100` landed in Admin.

Open a normal browser window at http://localhost:3000/app

Leave these alone:

- The smoke, flows, layout, and accessibility pages. They stay on sample data.
- The Escape key. It opens a blank page.
- Sign out during the demo only if you need a clean session. It returns you to Dictionary search, not a blank page.
- Pastor **join code:** `#r=register` → “Have a join code instead” (live: `POST /churches/join`).
- Second check on a Faith draft. The same person cannot approve twice.
- The long “Not written yet” list under Faith review.

If the word page says “Passages need the live server,” the API has stopped. Both http://localhost:3000/app and http://127.0.0.1:8000/api/v1/status should answer before anyone arrives.

**Pre-demo checks (optional, ~5 min):** With Next on `:3000`, run `pnpm test:ui:all` (screen smoke + `tests.html` + `flows.html` guardrails). Or open `/design/ui_kits/smoke.html` and `/design/ui_kits/flows.html` in the browser. Landing beta band → `/beta-survey` should send when the API is up.

**Collect beta feedback:** http://localhost:3000/beta-survey or the “Share beta feedback” band on the landing page.

## 1. Dictionary and a real quote

1. Open http://localhost:3000/app
2. Click the **grace** chip. A result appears: “grace — Favor that is given, not earned.”
3. Click that result.
4. The definition already shows Ephesians 2:8, World English Bible, public domain.
5. Under “Read it in the sources,” leave the box empty and click **Find passages**.
6. Read the first extra quote: Bhagavad Gita, Chapter 17, passage 12, Sir Edwin Arnold, 1885, public domain.

Say: this is a word match from licence-checked sources. A model did not write it. There is no model key on this demo.

## 2. Faith mode on a checked word

1. Stay on grace.
2. Press and hold the big word **grace** for about one second.
3. Read **Parallel** and **Difference**. Click **Back**.

Stop there. Lower on that page, the bridge gaps say the dictionary does not cover them yet.

Say: Faith mode is on grace because it was already checked. A draft stays hidden until two different people check it.

## 3. Two reviewers

If **Admin** is already in the top bar, click it. Otherwise:

1. Open http://localhost:3000/app#r=signin
2. **Sign in** is already selected.
3. Email: `A-0100`
4. Password: `dev-only-change-me`
5. Click **Sign in with email**. You land in Admin.

Then:

6. Choose **Faith review**.
7. Stay at the top. marriage and ways of living say **Drafted by the agent**.
8. On marriage, click **Mark checked** once.

The row should say **1 of 2 checked**. The button should say **Second check**. Stop there.

Say: one reviewer is not enough. A second, different person has to check it before anyone else can see it.

Ignore any “Demo only” note. The live sign-in is `A-0100`, not admin@rhema.ai.

## 4. If you have two extra minutes

This month and Map still show the sample month. If you open them, say that in one sentence.

A pastor check-in is optional. Sign in as `P-0233` with the same password only in a second window, so you do not sign the admin out of this one. Write one calm sentence and send it. Say the check-in is saved and a model is not called.

## If you have to start the machine again

From `church-ai-stack`:

```bash
docker compose up -d
uv run uvicorn app.main:app --app-dir apps/api/src --reload --port 8000
pnpm dev:web
```

The API needs the same local env as today: Postgres (`CONTRACT_STORE=postgres`), `DEMO_SIGNIN_PASSWORD`, and `LLM_MODE=off`.
