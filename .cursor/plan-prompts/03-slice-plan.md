<context>
Master plan: .cursor/plans/master-plan.md — we are on slice: {{slice name}}.
Relevant docs: AGENTS.md, docs/api.md (endpoints for this slice), docs/guardrails.md, schemas/, evals/datasets/.
</context>

<task>
Create a detailed implementation plan for this slice only. Save as .cursor/plans/slice-{{slug}}.md.
</task>

<plan_requirements>
1. Definition of done: a user-visible behaviour + the exact acceptance checks.
2. Step 0 (tests first): schemas to add/confirm, eval cases to add (≥5, incl. 1 adversarial and 1 edge case), unit tests for guardrails/permissions touched.
3. Steps 1..N: each step small enough for one agent run and one commit. For each: files to create/modify (exact paths), what changes, how to verify.
4. Which project skills to invoke (new-agent, new-mcp-tool, guardrail-audit, eval-run) and which gstack skills (/review, /qa, /ship) and when.
5. What is explicitly NOT in this slice.
6. Open questions — do not assume.
</plan_requirements>

<constraints>
- Stay inside the locked API contract. If the slice needs a contract change, stop and list it as an open question.
- No code in this step.
</constraints>
