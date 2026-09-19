<context>
Read docs/guardrails.md, docs/threat-model.md, .cursor/rules/guardrails.mdc, .cursor/skills/guardrail-audit/SKILL.md, .cursor/skills/redteam/SKILL.md, evals/datasets/redteam.jsonl.
</context>

<task>
Plan packages/llm-gateway and packages/guardrails. Save as .cursor/plans/guardrails.md. Include:
1. The pipeline as code-level interfaces (function signatures, inputs/outputs) — quota → input guardrails → model → output guardrails → trace/cost; tool guardrails wrapper for MCP.
2. For each guardrail id in docs/guardrails.md: library/approach, config keys, fail-closed behaviour, unit tests, and the red-team cases that exercise it.
3. The untrusted-input envelope implementation and where it is applied (user text, L2 responses, check-ins, tool results).
4. Crisis escalation flow for L3 end to end (detection → store → notify → admin ack).
5. How guardrail events appear in traces and dashboards (docs/observability.md).
6. CI: how scripts/guardrail_audit.sh grows to cover checks 2–10 of the guardrail-audit skill.
7. Open questions.
</task>

<constraints>No code yet. Prefer well-known libraries; name them and why.</constraints>
