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

TODO(team): choose host (ADR). Requirements: managed Postgres, container support, secrets manager,
custom domain + TLS behind the edge layer.

## Release checklist
- [ ] CI green (lint, unit, eval thresholds, guardrail-audit, secret scan)
- [ ] `redteam` 100%
- [ ] `/cso` no high findings
- [ ] Migrations reversible; backup taken
- [ ] Feature flags reviewed
- [ ] `/canary` running after deploy
- [ ] Rollback: previous image tag + prompt version pinned

## Local
`docker compose up` → seed → `scripts/run_evals --smoke`. (TODO(team): add compose file once stack is chosen.)
