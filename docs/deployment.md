# Deployment

## Environments
| Env | Purpose | Data | Deploy |
|---|---|---|---|
| local | development | synthetic seed | docker compose |
| staging | `/qa`, evals, red-team | synthetic seed | auto on merge to main |
| production | demo / pilot | synthetic (demo) → real (pilot, after ethics review) | manual promote via `/land-and-deploy` |

## Services
web, api, llm-gateway (in-process or separate), 3 MCP servers, Postgres(+pgvector), graph DB, Redis,
worker (L2 jobs, escalation notifications). Optional: self-hosted LLM (vLLM/Ollama) for L3.

Hosting (ADR-004): **Vercel** (web) · **Railway or Render** (API, MCP servers, worker, Redis, Memgraph) · **Supabase** (Postgres + pgvector + Auth) · **Cloudflare** in front · **Langfuse cloud**.
Secrets live in each platform's secret store; never in the repo.

## Release checklist
- [ ] CI green (lint, unit, eval thresholds, guardrail-audit, secret scan)
- [ ] `redteam` 100%
- [ ] `/cso` no high findings
- [ ] Migrations reversible; backup taken
- [ ] Feature flags reviewed
- [ ] `/canary` running after deploy
- [ ] Rollback: previous image tag + prompt version pinned

## Local
```bash
docker compose up -d          # Postgres+pgvector :5432, Redis :6379, Memgraph :7687, Memgraph Lab :3001
cp .env.example .env          # fill keys
# then run apps/api (uv) and apps/web (pnpm) on the host; seed; scripts/run_evals.sh --smoke
```
