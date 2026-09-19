# gstack workflow for this project (Cursor)

## 1. Install
```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host cursor          # skills → ~/.cursor/skills/gstack-*/
```
Team: everyone installs the same gstack version; record it in `docs/adr/ADR-000-tooling.md`.
Some Claude Code–specific features (session hooks, verify-gate) may not apply in Cursor; if a
skill misbehaves, run that one skill from Claude Code.

Our project skills live in `.cursor/skills/` and complement gstack:

| Need | gstack skill | Project skill |
|---|---|---|
| Product framing | /office-hours, /plan-ceo-review | — |
| Architecture lock | /plan-eng-review, /autoplan | — |
| Specs per slice | /spec | — |
| Scaffolding | — | new-agent, new-mcp-tool |
| Code review | /review, /codex (optional 2nd opinion) | guardrail-audit |
| Quality of AI | — | eval-run, prompt-change |
| Security | /cso (code: OWASP + STRIDE) | redteam (model-facing attacks) |
| Debugging | /investigate, /freeze, /careful, /guard | — |
| QA | /qa, /qa-only, /setup-browser-cookies | — |
| Ship | /ship, /land-and-deploy, /setup-deploy, /canary, /benchmark | demo-ready |
| Docs | /document-release, /document-generate, /diagram, /make-pdf | — |
| Learning | /learn, /retro | — |

## 2. Plan once (before application code)
1. `/office-hours` — feed `docs/architecture.md` + the product summary. Save design doc.
2. `/plan-ceo-review` (Hold Scope) — confirm what's in the web/AI version.
3. `/plan-eng-review` — lock architecture, data flow, `docs/api.md`, test matrix.
4. `/plan-design-review` + `/design-consultation` — L1 Gen Z look, admin dashboard.
5. `/cso` on the plan — update `docs/threat-model.md`.
(Or run `/autoplan` for 2–4 in one pass.)

## 3. Build order (vertical slices)
0. Platform slice: repo, CI, auth, `/health`, llm-gateway with guardrail pipeline stubbed-but-enforced, tracing.
1. Intake agent (deterministic routing first).
2. L1: normal mode → compare agent + vocab MCP + RAG corpus.
3. L3: modules → check-ins → checkin-analyst + pastoral MCP → admin dashboard → escalation.
4. L2: submissions → graph-builder batch job + graph MCP → admin graph view.

## 4. Per-slice loop
`/spec` → `new-agent` / `new-mcp-tool` → implement → `/review` → `eval-run` → `guardrail-audit`
→ `/qa` (staging) → `/ship` → `/document-release`. Use `/investigate` when stuck; `/freeze packages/agents` while tuning prompts.

## 5. Release / demo
`redteam` → `/cso` → `/qa` full pass → `demo-ready` → `/land-and-deploy` → `/canary` → `/retro`.
