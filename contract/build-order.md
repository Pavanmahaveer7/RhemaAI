# Build order for Cursor

Paste one step at a time. Finish and test each before the next.

**Step 0: Read**
> Read `/contract` in this order: README, types.ts, api.md, guardrails.md, moderation.md, data-model.md, screens.md, frontend-wiring.md, i18n.md. Do not write code yet. List anything unclear.

**Step 1: Project and database**
> Create a Node + TypeScript API (Fastify or Express) with Postgres and Prisma. Import `contract/types.ts` as the shared types package. Create the tables in `data-model.md`. Seed from `ui_kits/public/data.js`, `ui_kits/public/faithData.js` and `ui_kits/pipeline/data.js`.

**Step 2: Fetch wrapper and errors**
> Build the error format in `api.md` §1 and one frontend fetch wrapper per `frontend-wiring.md` §4. Every error has a `requestId`.

**Step 3: Sessions and guest**
> Implement `api.md` §2. Guests get a device token only. Role checks on every route.

**Step 4: Layer 1**
> Implement `api.md` §3. Serve only reviewed Faith-mode text. Missing words return empty, never an AI draft. Wire `SearchScreen.jsx` and `TermScreen.jsx`.

**Step 5: Layer 2**
> Implement `api.md` §4 and the answer pipeline in `moderation.md`. Public map changes only on publish. Wire `MonthlyScreen.jsx`, `GraphScreen.jsx`, `MapDraft.jsx`.

**Step 6: Layer 3 pastor**
> Implement `api.md` §5. Check-ins idempotent on `clientId`, text encrypted, outcome plain. Wire `PastorScreens.jsx` and `PipelineFlow.jsx`, including the offline queue.

**Step 7: Reviewer and alerts**
> Implement `api.md` §6. The assistant drafts; only people decide. Alerts pause features on the server.

**Step 8: Church apps**
> Implement `api.md` §7 with Planning Center OAuth. US only. No finance. Never moves a stage.

**Step 9: Safety, i18n, metrics**
> Implement `api.md` §8–9 and `i18n.md`. Remove live AI translation; load reviewed bundles.

**Step 10: Guardrail tests**
> Write every test listed in `guardrails.md`. Run the UI test pages in `frontend-wiring.md` §5. All must pass.

## Rules for Cursor every step
- Don't change screen layout, wording, colours or routes. If the UI needs new data, change `types.ts` first.
- No new features that aren't in the contract (no comments, votes, feeds, video, chat).
- Ask before adding a dependency.
