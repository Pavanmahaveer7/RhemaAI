# Layer 3 — Pastor pipeline

**Status:** Product workflow for the pastor layer. Use this when designing or building L3.

**What this is.** Pastoral development and accountability: a pastor moves through stages, and each stage is fed by training, ministry, and character. Once a month that work is reported, reviewed by people, and either continues, becomes a development plan, or goes to further review. Then the pastor advances to the next stage.

**What stays in force beside this doc.**

- Daily check-in, modules, and the check-in analyst remain in [`docs/api.md`](api.md), [`docs/build-plan.md`](build-plan.md), and [`schemas/checkin.output.json`](../schemas/checkin.output.json). They are one input to this pipeline, not a replacement for it.
- [`docs/adr/ADR-005-human-in-the-loop-and-data-minimization.md`](adr/ADR-005-human-in-the-loop-and-data-minimization.md) still governs storage and display: a human decides anything that affects a pastor; only a stable check-in may send encouragement on its own; admin views use a pseudonym and country plus broad region; no street address or GPS; model traces do not keep raw check-in text. Church, funds, and documents below are workflow steps. They are not a license to put those records into a model log.

The pastor journey after a leadership decision is this pipeline. UI for L3 should follow the diagram.

## Flow

```
                    LAYER 3: PASTOR PIPELINE
          Pastoral Development & Accountability Workflow
                              │
                              ▼
                 ┌─────────────────────────┐
                 │     PASTOR PROFILE      │
                 │                         │
                 │ • Pastor / Candidate    │
                 │ • Church                │
                 │ • Current stage        │
                 │ • Mentor / Supervisor  │
                 │ • History              │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │     PIPELINE STAGE      │
                 │                         │
                 │ Candidate               │
                 │      ↓                  │
                 │ Training                │
                 │      ↓                  │
                 │ Ministry Placement      │
                 │      ↓                  │
                 │ Active Ministry         │
                 │      ↓                  │
                 │ Ongoing Development     │
                 └────────────┬────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       ┌───────────┐    ┌───────────┐    ┌───────────┐
       │ TRAINING  │    │ MINISTRY  │    │ CHARACTER │
       │           │    │           │    │ & BEHAVIOR│
       │ Courses   │    │ Activities│    │           │
       │ Progress  │    │ Teaching  │    │ Observ.   │
       │ Certs     │    │ Preaching │    │ Feedback  │
       │ Documents │    │ Mentoring │    │ Concerns  │
       └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ MONTHLY WORKFLOW │
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             ▼               ▼                ▼
       ┌───────────┐   ┌───────────┐   ┌─────────────┐
       │   REPORT  │   │ FEEDBACK  │   │  FINANCE    │
       │           │   │           │   │             │
       │ Activities│   │ People    │   │ Funds       │
       │ Challenges│   │ Mentor    │   │ Spending    │
       │ Progress  │   │ Leaders   │   │ Receipts    │
       └─────┬─────┘   └─────┬─────┘   └──────┬──────┘
             │               │                │
             └───────────────┼────────────────┘
                             │
                             ▼
                 ┌─────────────────────────┐
                 │   COMMUNITY INVOLVEMENT │
                 │                         │
                 │ • Local outreach        │
                 │ • Community service     │
                 │ • Partnerships          │
                 │ • Ministry impact       │
                 │ • Participation         │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ DOCUMENT & EVIDENCE     │
                 │                         │
                 │ Forms                   │
                 │ PDFs / certificates     │
                 │ Receipts                │
                 │ Sermons / teaching      │
                 │ Reviews                 │
                 │ Supporting documents    │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │     AGENTIC WORKFLOW    │
                 │                         │
                 │ • Check completeness    │
                 │ • Identify missing info │
                 │ • Route submissions     │
                 │ • Summarize history     │
                 │ • Trigger next steps    │
                 │ • Prepare reviews       │
                 │ • Flag items for humans │
                 └────────────┬────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ LEADERSHIP REVIEW│
                    │                  │
                    │ Pastor           │
                    │ Mentor           │
                    │ Church Leaders   │
                    │ Regional Authority│
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
          ┌──────────┐ ┌───────────┐ ┌──────────┐
          │CONTINUE  │ │DEVELOPMENT│ │ ADDITIONAL│
          │          │ │   PLAN    │ │  REVIEW  │
          └────┬─────┘ └─────┬─────┘ └────┬─────┘
               │             │             │
               └─────────────┼─────────────┘
                             ▼
                    NEXT PIPELINE STAGE
```

## Steps

1. **Pastor profile.** Pastor or candidate, church, current stage, mentor or supervisor, history.
2. **Pipeline stage.** Candidate → Training → Ministry placement → Active ministry → Ongoing development.
3. **Three tracks in parallel.**
   - Training: courses, progress, certificates, documents.
   - Ministry: activities, teaching, preaching, mentoring.
   - Character and behavior: observation, feedback, concerns.
4. **Monthly workflow.**
   - Report: activities, challenges, progress.
   - Feedback: people, mentor, leaders.
   - Finance: funds, spending, receipts.
5. **Community involvement.** Local outreach, community service, partnerships, ministry impact, participation.
6. **Document and evidence.** Forms, PDFs and certificates, receipts, sermons and teaching, reviews, supporting documents.
7. **Agentic workflow.** Check completeness, identify missing information, route submissions, summarize history, trigger next steps, prepare reviews, flag items for humans. The agent prepares. It does not advance a pastor on its own.
8. **Leadership review.** Pastor, mentor, church leaders, regional authority.
9. **Outcome.** Continue, development plan, or additional review. Then the next pipeline stage.

## Church-app connection

A church connects Planning Center once. ChurchPlanner and similar apps that already sit on Planning Center are covered by that same connection. The connection is an installable integration (one OAuth app, many churches), not a second copy of Planning Center inside this product.

After a church connects, this pipeline may read:

- **People** — the pastor or candidate, and the church id
- **Services** — teaching, preaching, and service activity
- **Calendar, Check-Ins, Groups** — community and participation
- **Giving** — a month summary and a receipt link, not a donor-by-donor ledger

Imported rows are labelled with the source (for example “Planning Center”). The pastor’s own stage, progress, and history stay here. A mentor still sees that pastor among the others in the reviewer queue.

Planning Center cannot move a stage. Continue, development plan, and additional review stay a human decision in this app.

An app with no API uses the same five events later: a church key, or a file export. The events are `person.upsert`, `ministry.activity`, `community.participation`, `finance.summary`, and `document.ref`. They are reserved in [`docs/api.md`](api.md) and not built yet.

## Church-app connection

A church connects Planning Center once. That connection is the plugin. ChurchPlanner and similar apps are covered when they already sit on Planning Center. An app with no API can later push the same events with a church key, or send a file export. One connection, not a separate product per app.

After connect, this pipeline may read:

- **People** — pastor or candidate, and the church id
- **Services** — teaching, preaching, and service activity
- **Calendar, check-ins, groups** — community and participation
- **Giving** — a month summary and a receipt link, not a donor-by-donor ledger

Imported rows are labelled with the source, for example “Planning Center.” The connection cannot change a stage, write a review outcome, or replace training, character, or the monthly narrative. Those stay here. Giving detail is not copied into a model trace ([ADR-005](adr/ADR-005-human-in-the-loop-and-data-minimization.md)).
