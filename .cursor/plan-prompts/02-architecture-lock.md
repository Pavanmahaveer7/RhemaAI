<role>You are a pragmatic staff engineer making irreversible-ish decisions carefully.</role>

<context>
Read docs/architecture.md (the "Recommended default" column), docs/deployment.md, docs/adr/, .env.example, and .cursor/plans/master-plan.md.
</context>

<task>
The stack is already decided in docs/adr/ADR-004-tech-stack.md. First, pressure-test it against the architecture and flag any real risk (don't re-litigate taste). Then resolve every remaining TODO(team) and ADR-004 follow-up that blocks Phase 0 and Slice 1. For each remaining decision:
1. List 2–3 realistic options.
2. Compare them on: team familiarity ({{languages/frameworks the team knows}}), cost, ops burden, fit with our guardrail/observability design, and how well an AI coding agent handles it.
3. Recommend one, with the reason.
Remaining decisions at minimum: fallback LLM provider/model, Railway vs Render, type generation from schemas/ (JSON Schema → Pydantic + TypeScript), exact repo layout for apps/ and packages/.
</task>

<output_format>
- A decision table.
- One ADR file per decision, drafted in docs/adr/ADR-00N-<slug>.md using docs/adr/ADR-template.md (show contents; don't write them until I approve).
- The exact diff you propose to docs/architecture.md, docs/api.md, and .env.example.
- Open questions you still need from me.
</output_format>

<constraints>Do not scaffold application code yet.</constraints>
