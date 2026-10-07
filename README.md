# Rhema.ai — Project Operating Kit

This folder is the **operating system for building the project**, not the application code.
Drop it into the root of your repo. It gives Cursor (and Claude Code) everything it needs to
build the three-layer agentic system *the same way every time*: architecture, contracts,
guardrail rules, agent/tool scaffolding skills, eval datasets, CI, and a gstack-based workflow.

## What's inside

| Path | Purpose |
|---|---|
| `AGENTS.md` | Root instructions every AI coding agent reads first (Cursor, Claude Code, Codex) |
| `.cursorrules` | Legacy Cursor rules file — short, points at `AGENTS.md` + `.cursor/rules/` |
| `.cursor/rules/*.mdc` | Scoped rules that auto-apply to specific folders (agents, guardrails, MCP, API, web, data) |
| `.cursor/skills/*/SKILL.md` | Project-specific skills: `new-agent`, `new-mcp-tool`, `guardrail-audit`, `eval-run`, `redteam`, `prompt-change`, `demo-ready` |
| `docs/build-plan.md` | Your original product + build plan (verbatim, with a status note) |
| `docs/pre-build-plan.md` | Product principles before coding (L1 modes, Pol.is L2, verification, MCP security, no silent failures) |
| `docs/l3-pastor-pipeline.md` | Pastor pipeline, plus the Planning Center church-app connection |
| `docs/ui-system-design.md` | UI guide for Claude Design: dictionary, faith mode, concept graph, pastor pipeline |
| `.cursor/plans/` | Save `master-plan.md` here after plan prompt 01 (`pre-build-plan.md` already included) |
| `docs/architecture-diagram.png/.svg` | The architecture diagram (blue = SWE, rest = AI) |
| `docs/HACKATHON.md` | **One doc for judges/beta:** product, backend, security, vibe security, data, testing, Vercel live URLs |
| `docs/` | Source-of-truth docs: architecture, API contract, guardrails, prompts, evals, data model, threat model, observability, deployment, data ethics, gstack workflow, demo script |
| `docs/adr/` | Architecture Decision Records — every non-obvious choice gets one |
| `schemas/` | JSON Schemas for every agent's output (the contract between LLM and code) |
| `evals/datasets/` | Starter eval + red-team datasets per agent (JSONL) |
| `.github/` | CI pipeline (lint, test, evals, guardrail audit, secret scan) + PR template |
| `scripts/` | Placeholder scripts referenced by skills and CI |
| `.cursor/plan-prompts/` | Ready-to-paste Plan Mode prompts (master plan → slices → agents → guardrails → debug → review) |
| `SOURCES.md`, `FILES.md` | Provenance of every part, and a full file index |
| `docs/prompting-playbook.md` | Prompting techniques (YC, Cursor, Anthropic) for build prompts and for our agents' prompts |

## Setup order (do this once)

1. **Copy this folder's contents into your repo root.**
2. **Install gstack for Cursor** (see `docs/gstack-workflow.md`):
   ```bash
   git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
   cd ~/gstack && ./setup --host cursor
   ```
3. **Stack is chosen** — see `docs/adr/ADR-004-tech-stack.md`. Run `docker compose up -d` for local Postgres/Redis/Memgraph.
   Remaining open items: `grep -rn "TODO(team)" .` — record each decision as an ADR in `docs/adr/`.
4. **Open `.cursor/plan-prompts/README.md`** and run prompts 00 → 01 → 02 in Cursor Plan Mode.
5. **Run the planning sequence** in `docs/gstack-workflow.md` §2 before writing application code.
6. **Build layer by layer** using `/spec` → `new-agent` / `new-mcp-tool` → `/review` → `eval-run` →
   `guardrail-audit` → `/qa` → `/ship`.

## Architecture at a glance

```
Web app → Edge (WAF, rate limit) → API → Intake agent ─┬─ Compare agent   (L1) ─┐
                                                       ├─ Graph builder   (L2) ─┼─ Tool guardrails ─ MCP servers ─ Tools
                                                       └─ Check-in analyst (L3) ┘
            Every LLM call: Input guardrails → LLM → Output guardrails
            Cross-cutting: AuthN/AuthZ · Observability · Cost & quota · Session store · Eval suite
```

![Architecture](docs/architecture-diagram.png)

Full detail: `docs/architecture.md`. Product plan: `docs/build-plan.md`.

## The one rule

**No LLM call and no tool call may bypass the guardrail layer.** `guardrail-audit` enforces this
locally and in CI. If you find yourself writing `client.messages.create(...)` outside
`packages/llm-gateway`, stop.
