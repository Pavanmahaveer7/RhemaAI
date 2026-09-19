---
name: demo-ready
description: Prepare the system for a live hackathon or stakeholder demo — freeze, flags, cached fallbacks, seed data, rehearsal checklist, and backup plan. Use when the user mentions demo, pitch, judges, showcase, presentation day, or "make sure nothing breaks on stage".
---

# demo-ready

## T-24h
- [ ] Deploy freeze branch; `/canary` running on production URL.
- [ ] Seed data loaded and verified: 30 L1 entries, 1 L2 question + 30 responses + one generated
      snapshot, 5 modules, 5 synthetic pastors (mix of Stable / Watch / High-risk histories).
- [ ] Record cached responses for every demo query (L1 "karma", "grace"; L2 graph; L3 check-in analysis).
- [ ] `FF_SERVE_CACHED_DEMO_RESPONSES` tested — flipping it serves cached results with identical UI.
- [ ] `redteam` 100% pass; `guardrail-audit` all pass; `eval-run` all pass.

## T-2h
- [ ] Rate limits and quotas raised for the demo account only.
- [ ] Observability dashboard open on a second tab (traces, cost, guardrail blocks) — judges like seeing it.
- [ ] One live adversarial input prepared to show a guardrail blocking it on stage.
- [ ] Backup: screen recording of the full flow; mobile hotspot; second laptop logged in.

## On stage
Follow `docs/demo-script.md`. If any AI call takes > 5s, flip the cached flag and keep talking.
