<role>You are a pragmatic staff engineer making irreversible-ish decisions carefully.</role>

<context>
Read docs/architecture.md (the "Recommended default" column), docs/deployment.md, docs/adr/, .env.example, and .cursor/plans/master-plan.md.
</context>

<task>
Resolve every TODO(team) that blocks Phase 0 and Slice 1. For each decision:
1. List 2–3 realistic options.
2. Compare them on: team familiarity ({{languages/frameworks the team knows}}), cost, ops burden, fit with our guardrail/observability design, and how well an AI coding agent handles it.
3. Recommend one, with the reason.
Decisions needed at minimum: hosting, auth provider, primary + fallback LLM (exact model ids), graph DB (Neo4j vs Memgraph), vector store, monorepo tooling (pnpm/uv/turbo), observability (Langfuse cloud vs self-host).
</task>

<output_format>
- A decision table.
- One ADR file per decision, drafted in docs/adr/ADR-00N-<slug>.md using docs/adr/ADR-template.md (show contents; don't write them until I approve).
- The exact diff you propose to docs/architecture.md, docs/api.md, and .env.example.
- Open questions you still need from me.
</output_format>

<constraints>Do not scaffold application code yet.</constraints>
