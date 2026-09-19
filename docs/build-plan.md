> **Status note (added):** This is the team's original product + build plan, kept verbatim as the product source of truth.
> Two things have since changed: (1) the **4-day timeline is no longer a constraint** — execution now follows
> `.cursor/plans/master-plan.md` (generated with `.cursor/plan-prompts/01-master-plan.md`); (2) the **Android app is
> deferred** — current scope is the web app + AI backend (see `docs/architecture.md`). Product scope, layers, seed content,
> Definition of Done, pitch defenses, risks and post-hackathon items below still apply.

# Build Plan — Three-Layer Agentic AI System for Non-Denominational Churches

> **What this document is.** A workflow-oriented build plan for a 4-day hackathon delivering a web application (all three layers) plus an Android app (offline-first for Layer 3). Architecture and tech-stack choices are intentionally left to you — this plan covers *how to work*, not *what to build with*.
>
> **How to use it.** Read Sections 1–2 once as a team. Sections 3–6 are the execution playbook — work through them in order. Section 7 is the pitch. Section 8 is the "when things break" fallback list.

---

## 1. Product Summary

**One product, three services, one agentic AI backend.**

| Layer | Audience | Core function | Online/Offline |
|---|---|---|---|
| L1 — Comparative Vocab | Public / Gen Z | Dictionary + AI-explained Hindu → Buddhist → Christian bridges for any term or verse | Online-first, ~1,000 pre-cached terms offline |
| L2 — Belief Knowledge Graph | Public answers, admin observes | Monthly aggregation of free-text belief responses into an evolving Neo4j-style concept graph | Online (submit + view cached graph offline) |
| L3 — Pastor Training + Accountability | Lay pastors (Bangladesh), admin | Training modules + daily check-ins + AI risk analysis + admin dashboard | **Fully offline** on Android; syncs when online |

**Positioning:** Not another AI Bible app. First integrated system that combines interfaith understanding + longitudinal belief mapping + offline pastor accountability, designed for non-denominational lay pastors in low-connectivity countries.

---

## 2. Guiding Principles

1. **Ship over polish.** A working weak demo beats a broken beautiful one.
2. **Lock the API contract on Day 1, hour 3.** Everything downstream depends on this.
3. **Cut scope, not quality.** Section 8 has the pre-agreed cut list.
4. **Seed content is the demo.** Judges type things and see AI responses; if the seed is thin, the demo is thin. Budget real hours for content.
5. **Test on a real Android device.** Emulators lie about offline.
6. **Every AI call is a tool call, not a chat.** Structured JSON in, structured JSON out. No free-form parsing.
7. **Log everything.** Every AI call, every user event. Judges love data; you'll need it for debugging.
8. **Respect the guardrails in your own architecture.** Content moderation, prompt-injection defenses, cost/quota ceilings, PII handling — these are not optional and not afterthoughts.

---

## 3. Recommended Workflows

### 3.1 Working style

- **Trunk-based development on `main`** with short-lived feature branches. No long-lived branches for a 4-day sprint.
- **API contract first.** Publish the spec (OpenAPI, or a plain markdown table in `/docs/api.md`) before backend or Android start real work.
- **Vertical slices, not horizontal layers.** Ship "Layer 1 normal mode end-to-end" before starting Layer 1 detailed mode. Avoid "all schemas first, all UIs later" — that's the hackathon killer.
- **Time-boxed sprints per half-day.** 8 half-day checkpoints across 4 days. Cut list gets re-evaluated at each checkpoint.
- **Continuous deploy on every merge.** Whatever your host is, wire it up on Day 1 hour 1.
- **Feature flags for anything demo-critical.** If an AI feature breaks 20 minutes before demo, flip a flag and it disappears cleanly.

### 3.2 AI coding assistant workflow

If you're using Claude Code, Cursor, or similar, structure tasks as:

- **One task per vertical slice.** Not "build the auth system" — "add pastor login that lands on /pastor/modules with three seeded modules visible."
- **Give the assistant your architecture doc + API contract + guardrail rules as context.** Paste them into the session so the assistant respects your constraints.
- **Ask for tests only where they save you time.** Auth flows and AI JSON parsing yes; everything else no. Hackathon != production.
- **Prompt the assistant to explain non-obvious code.** You'll be debugging its work at 2 AM; readable code matters more than clever code.

### 3.3 Patterns worth applying

These are patterns, not products — apply them with whatever stack your architecture prescribes.

- **RAG (retrieval-augmented generation)** for Layer 1 grounding. Ship 30–50 hand-curated source chunks per tradition (Bhagavad Gita passages, Dhammapada passages, Bible passages) with topic tags.
- **Function calling / tool use** for all three agents. Never parse free-form LLM text; always ask for JSON matching a schema.
- **Structured output validation** with your runtime's schema validator. If the LLM returns malformed JSON, retry once, then fail gracefully.
- **Content-pack pattern** for the Android offline story. Serialize seeded content to a local DB file, ship it in the app bundle, copy to internal storage on first run.
- **Optimistic UI + write-behind sync** on Android. Check-in appears saved immediately; a background sync worker pushes it later.
- **Prompt injection defenses.** Any user text going into an LLM (Layer 1 queries, Layer 2 responses, Layer 3 check-ins) gets wrapped in an "untrusted user input" preamble and stripped of instruction-like tokens. Your guardrails should enforce this at the agent boundary.
- **Cost/latency ceilings.** Set a per-request token limit and a per-user daily quota. Judges typing "explain everything in 50,000 words" should not bankrupt you.

### 3.4 Suggested repository layout

```
/apps
  /web           # web app
  /android       # mobile app
/packages
  /shared-types  # types shared between web and mobile
  /agents        # agent definitions, prompts, tool schemas
  /content       # seed content: comparative entries, modules, questions
/docs
  architecture.md # YOUR architecture + guardrails (source of truth)
  api.md         # API contract — locked Day 1
  prompts.md     # All LLM prompts, versioned
  demo-script.md # Day 4 pitch script
/scripts
  seed.ts        # seed DB with content
  export-android-pack.ts  # build the offline pack for Android
```

---

## 4. Four-Day Execution Plan

**Assumptions:** 3-person team (adjust roles if you're 2 or 4). ~10 productive hours/day. Person A = Web/AI lead, Person B = Android lead, Person C = Content/Design/Pitch.

### Day 1 — Foundation + Layer 1

**Goal by EOD:** Layer 1 (normal + detailed mode) live on the web, API contract locked, Android project scaffolded.

**Morning (hours 1–5)**
- [ALL] Kickoff: 30 min. Read Sections 1–2 aloud. Walk through your architecture doc + guardrails. Agree on cut list (Section 8).
- [A] Repo init per your architecture; deploy the "hello world" URL; env vars in place
- [A] Database migrations for Layer 1 tables (lookups, comparative entries, RAG sources — schema per your architecture)
- [A+B] Write `/docs/api.md` — every endpoint for all three layers, request/response JSON. **Lock this.**
- [B] Android project scaffold per your architecture: base navigation, local DB, background sync worker, API client
- [C] Start collecting seed content: 30 comparative entries (term + Hindu context + Buddhist context + Christian bridge + sources)

**Afternoon (hours 6–10)**
- [A] Layer 1 normal mode: search UI + dictionary API + write every query to the lookups store
- [A] Layer 1 detailed mode: CompareAgent endpoint, prompt engineered, RAG lookup with hand-curated corpus of 15 source chunks
- [B] Android: auth screen, API client, one placeholder screen per layer
- [C] Continue seed content; start drafting the 5 pastor training modules

**Checkpoint:** Layer 1 works end-to-end on web with real AI responses. Android app installs and hits `/health`.

### Day 2 — Layer 2 + Layer 3 (Web)

**Goal by EOD:** All three layers demoable on web.

**Morning (hours 1–5)**
- [A] Layer 3 tables + seed 5 modules + module viewer UI + completion tracking
- [A] Layer 3 check-in form (5 questions: mood, prayer, visits, struggles, wins)
- [B] Android: Layer 3 module list screen pulling from API, caching locally
- [C] Finalize 5 modules with real content, source images/thumbnails, write question-of-the-month prompt

**Afternoon (hours 6–10)**
- [A] CheckinAnalyst agent: takes check-in + last 7 days, returns `{score, flags[], encouragement}`. Store the analysis alongside the check-in.
- [A] Admin dashboard for L3: pastor list, progress bars, flagged check-ins table
- [A] Layer 2 question submission form + write responses
- [A] Layer 2 GraphBuilder agent + `/api/graph/generate` endpoint that runs on-demand
- [A] Layer 2 admin view with a force-directed graph renderer
- [B] Android: Layer 3 module viewer working from local storage; check-in form writing locally
- [C] Seed 30 fake responses for L2 so the graph looks real; seed 5 pastor accounts with realistic progress

**Checkpoint:** Full web app demoable. Backend API stable. Android has cached module list.

### Day 3 — Android Offline

**Goal by EOD:** Android app fully functional offline for Layer 3, Layer 1 offline pack shipped.

**Morning (hours 1–5)**
- [B] Layer 3 offline: "Download for offline" per module → text + video/audio to internal storage. Module playable fully offline.
- [B] Check-in offline: writes locally immediately; background sync worker pushes pending check-ins when online.
- [A] Backend support: sync endpoints, conflict resolution rules, pastor summary endpoint for admin dashboard
- [C] Test airplane-mode flow on real device; find and file bugs

**Afternoon (hours 6–10)**
- [B] Layer 1 offline pack: export top comparative entries to a local DB file → bundle in the app → local search UI → online fallback for cache misses
- [B] Layer 2 on Android: skip, or ship a read-only cached-graph view only
- [A] Bug-fix pass on backend based on Android integration issues
- [C] Draft demo script (Section 7), start pitch deck

**Checkpoint:** Real Android device works fully offline for Layer 3 module + check-in flow.

### Day 4 — Polish, Test, Demo

**Goal by EOD:** Demo-ready. Bugs fixed. Pitch rehearsed twice.

**Morning (hours 1–5)**
- [ALL] Integration test: pastor completes module offline on Android → goes online → check-in appears in admin dashboard on web
- [A] Layer 1 prompt tuning based on 20 real test queries; fix hallucinations
- [A] Layer 2 graph tuning: regenerate with 30+ seeded responses so it looks meaningful
- [B] Android polish: splash, icon, loading states, empty states, error toasts
- [C] Gen Z visual pass on Layer 1: bold type, dark mode, mobile-first

**Afternoon (hours 6–10)**
- [ALL] Bug bash: everyone uses the app in demo mode for 30 min, files bugs, then fix in priority order
- [A] Feature flags for anything shaky. Turn off what doesn't work.
- [C] Finalize pitch deck (Section 7) + demo script; rehearse twice
- [ALL] Final deploy freeze at hour 9. Hour 10 is rehearsal + rest.

**Checkpoint:** Two full rehearsals done. Devices charged. Backup laptop ready.

---

## 5. Content Seeding (do not skip this)

Judges will type things into your demo. Your seed content **is** the demo. Assign one person to own this from Day 1.

- **Layer 1 — 30 curated comparative entries.** Terms to prioritize: karma, dharma, moksha, nirvana, samsara, atman, ahimsa, mantra, guru, sangha, meditation, suffering, compassion, rebirth, prayer, sin, salvation, grace, faith, love, forgiveness, judgment, soul, heaven, enlightenment, sacrifice, ritual, community, service, wisdom. Each entry: 3 short paragraphs + 3 source citations.
- **Layer 2 — 1 question + 30 seeded responses.** Question suggestion: "What does 'a good life' mean to you?" Seed 30 varied free-text responses so the concept graph has interesting structure.
- **Layer 3 — 5 training modules.** Suggested titles: (1) Active Listening in Pastoral Care, (2) Home Visits: A Framework, (3) Handling Conflict in the Congregation, (4) Praying with Grieving Families, (5) Weekly Self-Review Practice. Each: 500-word body + 3-question quiz + optional 2-min video.
- **5 pastor accounts** with realistic mixed progress + varied check-in histories (some Stable, one Watch, one High Risk — so the AI flagging visibly does something).

---

## 6. Definition of Done (per layer)

**Layer 1 done when:** A public user can search a term → get a dictionary result in normal mode → toggle to detailed mode → see three-part comparative explanation with sources → and every lookup is logged.

**Layer 2 done when:** A public user can submit a free-text response to the active question → admin can trigger graph generation → admin sees a rendered force-directed graph with concepts as nodes → graph is stored as a snapshot with a month label.

**Layer 3 done when:** A pastor logs in on Android → downloads a module → puts phone in airplane mode → completes module + submits check-in → connects to Wi-Fi → check-in appears in admin dashboard within 60 seconds with an AI analysis attached.

**System done when:** All three DoDs pass, and a 5-minute demo script runs without a crash.

---

## 7. Demo & Pitch (Day 4)

### 5-minute demo flow
1. **The problem** (30s). Non-denominational churches in Bangladesh have lay pastors with no training pipeline, no accountability, no way to understand what their community actually believes, and no internet. Existing tools solve one slice for US churches; nobody serves this market.
2. **Layer 1 wow** (60s). Type "karma" in the web app → detailed mode shows Hindu context, Buddhist context, Christian bridge, sources. Type "grace" → reverse direction. Emphasize: neutral, educational, Gen Z tone.
3. **Layer 2 wow** (60s). Show the concept graph. Point to two clusters. "Last month people talked about family and duty; this month suffering and hope. That's what pastoral response looks like when you can actually see it."
4. **Layer 3 wow — the money shot** (90s). Pick up phone. Airplane mode ON. Open Android app. Open a training module offline. Complete a check-in. Airplane mode OFF. Switch to web admin dashboard on the projector. Refresh. Check-in appears. AI flag appears. **This is the moment judges remember.**
5. **The architecture + ask** (30s). Show your own architecture diagram + guardrails. Close with what you'd do with more time or funding.

### Pitch defenses (from the research report)
- "Faith Explorer already does comparative religion." → Yes, name it. Ours differs in the pedagogical bridging sequence, Gen Z UX, and feeds Layer 2's belief graph and Layer 3's pastoral workflow.
- "Isn't Layer 2 just Polis?" → Polis clusters people via k-means into 2–5 groups at a point in time. We build a concept graph tracking belief-shape over months. Different structure, different question.
- "Gloo/Anor already do church intelligence." → For US congregant engagement. Neither serves Bangladeshi lay pastors, neither models belief concepts as a graph, neither is offline-first.
- "Offline pastor accountability already exists (Covenant Eyes, care apps)." → Those are device surveillance or member-care trackers. Not training + check-ins + AI risk analysis + offline sync for pastors in low-connectivity regions.
- "Can offline AI actually work?" → Be honest. On-device inference is hard. Our design does AI on sync, not on-device; offline flagging uses lightweight rules. Hybrid is the practical answer.

---

## 8. Pre-Agreed Cut List (in order)

When time slips, cut from the top. Do not deliberate — cut and move on.

1. Layer 2 on Android (link out to web)
2. AI feedback on check-ins (just log them; show admin the raw text)
3. RAG for Layer 1 (fall back to 30 hardcoded entries only, no live retrieval)
4. Layer 2 batch job (pre-generate one graph snapshot for the demo, no live regeneration)
5. Layer 1 offline pack on Android (ship online-only; still demoable in the venue Wi-Fi)
6. Admin dashboard styling (raw tables are fine)
7. Auth roles UI (hardcode two accounts: one pastor, one admin)
8. Videos in modules (text + images only)

---

## 9. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Nobody has shipped Android before | High | Fall back to a WebView wrapper of the web app with cache-based offline for Layer 3. ~4 hours vs ~26. |
| LLM API rate limits mid-demo | Medium | Pre-cache demo responses; feature-flag to serve cached versions during the pitch. |
| RAG retrieval quality is poor | Medium | Ship 30 hardcoded entries as fallback; RAG is a bonus, not a requirement. |
| Android sync bugs at demo time | High | Rehearse the airplane-mode demo 5+ times. Have a video recording as backup. |
| Prompt injection embarrasses you | Medium | Your guardrails should cover this — test 10 adversarial inputs Day 4 morning to verify. |
| Content is thin | High | Assign one person to seed content from Hour 1 Day 1. Do not treat as an afterthought. |
| Venue Wi-Fi is bad | Medium | Bring a mobile hotspot. Have offline mode work everywhere it can. |

---

## 10. Post-Hackathon (if you continue)

- Real Bangladesh partner church for pilot (Layer 3 real users)
- Scale Layer 2's graph store for real congregation-scale data
- On-device model for Layer 3 offline AI flagging (small quantized model)
- Additional traditions in Layer 1 (Islam, Sikhism, Jain, folk)
- Bengali and other local-language versions
- Content-pack distribution over SD card / Kolibri / RACHEL hotspot
- Data ethics review: consent, anonymization, right-to-delete, especially for Layer 3 accountability data

---

**End of plan.** Keep this file in the repo root alongside your `architecture.md`. Update the cut list as you go. Ship.
