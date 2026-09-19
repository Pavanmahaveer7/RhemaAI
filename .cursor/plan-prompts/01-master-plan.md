<role>
You are the lead engineer planning a production-quality web/AI prototype. You think in vertical slices and you are strict about safety for private data.
</role>

<context>
Product plan: docs/build-plan.md (ignore its 4-day timeline and Android parts).
Source of truth: AGENTS.md, docs/architecture.md, docs/api.md, docs/guardrails.md, docs/data-model.md, docs/evals.md, docs/threat-model.md.
Scope: web app + AI backend only. The Android/offline app is OUT of scope for this plan (the API reserves /api/sync/*).
Team: {{team size and roles}}. Timeline: {{timeline}}.
</context>

<task>
Produce a master implementation plan for the whole project and save it as .cursor/plans/master-plan.md.
</task>

<plan_requirements>
1. Phase 0 "platform slice": repo, CI, auth, /health + /ready, llm-gateway with the guardrail pipeline enforced (even if individual guardrails are stubs), tracing, cost/quota counters, seed-data scripts.
2. Then slices in this order: intake agent → L1 → L3 → L2. Justify the order in one line each.
3. For every slice: goal (what a user can do after it), files/folders touched, schemas and eval cases to write FIRST, guardrails involved, MCP tools involved, acceptance criteria (testable), which gstack skills and project skills to run, and a rough size (S/M/L).
4. Each slice ends with a git commit checkpoint and a demoable state.
5. A "Risks" section: top 5 technical risks with mitigation.
6. A "Future ideas" section for anything you considered but cut. Be aggressive about cutting.
7. An "Open questions" section: every decision you could not make from the docs (look for TODO(team) markers). Do NOT assume answers.
</plan_requirements>

<rules>
- Tests/evals before implementation in every slice — they are the acceptance gate.
- Every LLM call goes through packages/llm-gateway; every tool call through MCP tool guardrails. Plan the gateway before any agent.
- L3 data is private: include scoping tests and PII masking in the L3 slices, and the crisis escalation path.
- Prefer boring, well-known libraries. New services need an ADR.
</rules>

<output_format>
Markdown. Checkbox to-dos per slice (- [ ]). Keep each slice under ~25 lines. No code.
</output_format>

Ask me clarifying questions first if anything above is ambiguous.
