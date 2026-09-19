# ADR-004: Tech stack (web + AI version)
- Status: accepted (trial — revisit after Phase 0 platform slice)
- Date: 2026-09-19
- Deciders: Harry

## Context
We need a stack that (a) lets AI coding agents in Cursor work reliably, (b) gives first-class access to AI tooling
(PII masking, MCP, tracing, evals), (c) is cheap to run and low-ops for a small team, and (d) fits the architecture in
`docs/architecture.md`. Android/offline is out of scope for now.

## Decision

| Layer | Choice | Notes |
|---|---|---|
| Web app | **Next.js (TypeScript)** in `apps/web` | Public L1/L2, pastor L3, admin dashboards in one app |
| API + agents + guardrails | **FastAPI (Python)** in `apps/api` + `packages/*` | Python has the strongest AI ecosystem (Presidio, MCP SDK, Langfuse, evals) |
| LLMs | **Anthropic Claude** primary; one fallback provider; optional self-hosted model for L3 later | Pinned per agent in `docs/prompts.md` |
| MCP servers | **Official MCP Python SDK** | `packages/mcp/{vocab,graph,pastoral}` |
| Relational DB + vectors | **Postgres + pgvector** (Supabase-managed in staging/prod) | Users, lookups, modules, check-ins, RAG chunks |
| Graph DB (L2) | **Memgraph** (Cypher, Neo4j-compatible) | Swap to Neo4j later without rewriting queries |
| Session store + quotas + rate limits | **Redis** | Counters, session state, short TTLs |
| Auth | **Supabase Auth** | Roles `public/pastor/admin` via JWT claims; verified server-side in FastAPI |
| Guardrails | **Presidio** (PII), **moderation model** (content safety), **injection classifier + heuristics**, **Pydantic** (schemas) | All inside `packages/llm-gateway` / `packages/guardrails` |
| Observability, cost, evals | **Langfuse (cloud)** + **OpenTelemetry** | L3 traces store masked text only |
| Edge | **Cloudflare** (DNS, WAF, DDoS, rate limits) | In front of web and API |
| Hosting | **Vercel** (web) · **Railway or Render** (API, MCP servers, worker, Redis, Memgraph) · **Supabase** (Postgres + Auth) | Pick Railway vs Render at first deploy |
| Monorepo tooling | **pnpm** (JS) + **uv** (Python) | Matches CI |
| Local dev | **Docker Compose** (`docker-compose.yml`) for Postgres+pgvector, Redis, Memgraph | Langfuse uses the cloud project |

### Pinned models (initial)
| Agent | Model | Reason |
|---|---|---|
| intake (LLM path only) | `claude-haiku-4-5-20251001` | cheap, fast classification |
| compare | `claude-sonnet-5` | citation-grounded explanations |
| graph-builder | `claude-sonnet-5` | concept extraction over batches |
| checkin-analyst | `claude-sonnet-5` | nuance + crisis detection; revisit self-hosted before real pilot |

Fallback provider/model: still open (see "Follow-ups").

## Alternatives considered
- **All-TypeScript backend** (Next.js API routes / Node): one language, but weaker PII/eval/MCP tooling. Rejected for now.
- **Neo4j** instead of Memgraph: more mature ecosystem and hosting (Aura); heavier locally. Kept as drop-in alternative.
- **Clerk / Auth0**: excellent, but Supabase Auth pairs with our managed Postgres and reduces vendors.
- **Self-hosted Langfuse**: more control, more ops. Cloud first.

## Consequences
+ Clear split: TypeScript for UI, Python for everything AI. AI coding agents handle both stacks well.
+ Few vendors: Supabase, Vercel, Railway/Render, Cloudflare, Anthropic, Langfuse.
− Two languages → shared types must be generated from `schemas/` (JSON Schema → Pydantic + TypeScript).
− Supabase Auth JWTs must be verified in FastAPI and roles enforced again in MCP tools (never trust the client).

## Follow-ups
- Choose fallback LLM provider/model and add to `.env.example` + `docs/prompts.md`.
- Choose Railway vs Render at first deploy.
- Generate types from `schemas/` (e.g. datamodel-code-generator for Python, json-schema-to-typescript for TS).
