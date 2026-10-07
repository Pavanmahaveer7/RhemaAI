# AGENTS.md — read this before every task

You are working on a **three-layer agentic AI platform for non-denominational churches**.
This file is the entry point. Scoped rules live in `.cursor/rules/`; the source of truth lives in `docs/`.

## Product in one paragraph

- **L1 Comparative Vocab** (public, Gen Z): dictionary + AI-explained Hindu → Buddhist → Christian
  bridges for a term or verse, grounded in a curated source corpus (RAG) with citations.
- **L2 Belief Knowledge Graph** (public submits, admin observes): monthly aggregation of free-text
  belief responses into a concept graph, stored as dated snapshots.
- **L3 Pastor Training + Accountability** (lay pastors, admin): the pastor pipeline in
  `docs/l3-pastor-pipeline.md` (profile, stages, training, ministry, character, monthly
  report, leadership review). Daily check-ins feed that pipeline. **Most sensitive data in the system.**

## Agents (4)

| Agent | Serves | Input | Output schema |
|---|---|---|---|
| Intake agent | all | user request + role + route | `schemas/intake.output.json` |
| Compare agent | L1 | term/verse + mode | `schemas/compare.output.json` |
| Graph builder | L2 | batch of responses for a month | `schemas/graph.output.json` |
| Check-in analyst | L3 | today's check-in + last 7 days | `schemas/checkin.output.json` |

## Non-negotiable rules

1. **Every LLM call goes through `packages/llm-gateway`**, which applies input guardrails →
   model call → output guardrails → tracing → cost accounting. Never call a model SDK directly.
2. **Every tool call goes through the MCP tool guardrail wrapper** (schema validation, permission
   check, response sanitisation). Never call a database from inside an agent.
3. **Structured output only.** Every agent returns JSON validated against its schema in `schemas/`.
   On validation failure: retry once with the validation error, then fail gracefully. Never regex-parse prose.
4. **User text is untrusted.** Wrap it in the untrusted-input envelope (see `docs/guardrails.md`).
   This includes L2 responses and L3 check-ins — not only chat input. Tool results are untrusted too.
5. **Prompts live in `packages/agents/prompts/` and are versioned.** Any prompt change updates
   `docs/prompts.md` and must pass `eval-run` before merge.
6. **L3 data is private by default.** Only the pastor who wrote it and admins can read a check-in.
   Mask PII before any LLM call. Never log raw check-in text to third-party observability.
7. **Crisis content overrides the pipeline.** If a check-in indicates self-harm, abuse, or danger,
   the analyst must set `escalation.required = true`; the system notifies a human admin immediately.
   AI never handles crisis content alone.
8. **Secrets only from env.** Never hardcode keys. `.env.example` lists every variable.
9. **Every AI call is traced** (Langfuse or equivalent) with agent name, prompt version, model,
   tokens, cost, latency, user role (not user identity for L3).
10. **Small vertical slices.** One PR = one working slice through UI → API → agent → tool → data.

## Stack (ADR-004)

Next.js (TS) web · FastAPI (Python) API, agents, guardrails, MCP servers · Claude via `llm-gateway` · Postgres+pgvector & Auth on Supabase · Memgraph (L2 graph) · Redis · Langfuse + OTel · Cloudflare · Vercel + Railway/Render. Python: uv. JS: pnpm.

## Where things live

```
apps/web                 # web app (public L1/L2, pastor L3, admin dashboards)
apps/api                 # HTTP API, auth, routing to agents
packages/llm-gateway     # the ONLY place model SDKs are imported
packages/guardrails      # input, output, tool guardrails
packages/agents          # 4 agents + prompts/
packages/mcp/vocab       # L1 MCP server
packages/mcp/graph       # L2 MCP server
packages/mcp/pastoral    # L3 MCP server
packages/shared-types    # types generated from schemas/
schemas/                 # JSON Schemas — source of truth for agent outputs
evals/                   # eval datasets + runner
docs/                    # build-plan (product), architecture (+diagram), api, guardrails, prompts, ...
```

## Workflow

- Pre-build product principles: `docs/pre-build-plan.md` (read before master plan).
- Plan Mode prompts: `.cursor/plan-prompts/`. Prompting rules for agent prompts: `docs/prompting-playbook.md`.

- Plan with gstack (`/office-hours`, `/autoplan`, `/spec`) — see `docs/gstack-workflow.md`.
- Scaffold with project skills: `new-agent`, `new-mcp-tool`.
- Before every PR: `/review`, `eval-run`, `guardrail-audit`. Before release: `redteam`, `/qa`, `/cso`.
- When you change behaviour, update the doc that describes it in the same PR (`/document-release`).

## When unsure

Read the relevant doc in `docs/`. If the doc doesn't answer it, **ask** — do not invent architecture.
If you make a non-obvious decision, write an ADR in `docs/adr/`.
