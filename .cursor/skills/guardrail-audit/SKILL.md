---
name: guardrail-audit
description: Audit the codebase to prove every LLM call and every tool call passes through the guardrail layer, PII is masked, and L3 data access is scoped. Use before every PR that touches agents, llm-gateway, guardrails, MCP servers or API routes, before a release, or whenever the user asks "are we safe", "check guardrails", or "security check on the AI part".
---

# guardrail-audit

Produce a pass/fail report. Do not fix silently — list findings, then offer fixes.

## Checks

1. **Model SDK containment** — search for model SDK imports / HTTP calls to model providers
   outside `packages/llm-gateway`. Any hit = FAIL.
   (e.g. `anthropic`, `openai`, `@anthropic-ai/sdk`, `litellm`, `api.anthropic.com`, `/v1/chat/completions`)
2. **Gateway pipeline intact** — `llm-gateway` calls, in order: quota, input guardrails, model,
   output guardrails, trace, cost. No code path returns before output guardrails.
3. **Fail-closed** — guardrail exceptions block the request (no `except: pass`, no `catch {}` that continues).
4. **Tool path** — agents reach data only through the MCP client; no DB clients imported in `packages/agents`.
5. **Tool definitions** — every tool has input + output schema, required_role, data_class, mode.
6. **L3 scoping** — every `pastoral` read tool filters by caller id for non-admins; test exists for other-user access.
7. **Untrusted envelope** — user text, L2 responses, check-ins, and tool results are wrapped before entering prompts.
8. **Logging hygiene** — no raw check-in text, PII, or secrets in logs/traces (search for logging of request bodies).
9. **Crisis path** — checkin-analyst schema has `escalation`; API notifies a human when `required`.
10. **Config** — thresholds, limits, model ids come from config; `.env.example` lists every var used.

## Output

```
GUARDRAIL AUDIT — <date> — <commit>
[PASS|FAIL] 1 Model SDK containment — <evidence: file:line>
...
Summary: N pass, M fail. Blocking: <list>.
```

Any FAIL on 1, 2, 3, 6, or 9 is release-blocking.
