---
name: new-mcp-tool
description: Add or change a tool on one of the three MCP servers (vocab, graph, pastoral) with input/output schemas, role permissions, sanitisation, audit logging, and tests. Use this whenever the user wants a new tool, a new data access path for an agent, a new MCP endpoint, or says things like "the agent needs to fetch X" or "add a tool to save Y".
---

# new-mcp-tool

## Decide first

- Which server? `vocab` (L1 content/RAG), `graph` (L2 responses/snapshots), `pastoral` (L3 modules/check-ins).
  A tool touching L3 data **must** live on `pastoral`.
- Read or write? Write tools need an idempotency key and an audit log entry.
- Who may call it? Roles: `public`, `pastor`, `admin`, `system` (batch jobs). Record it.

## Files

```
packages/mcp/<server>/tools/<tool_name>.(ts|py)
packages/mcp/<server>/tools/<tool_name>.test.(ts|py)
```

## Tool definition checklist

- [ ] `name` snake_case, verb-first (`search_sources`, `get_checkin_history`, `save_graph_snapshot`)
- [ ] `description`: one or two sentences on what it returns. No instructions to the model.
- [ ] `input_schema` with bounds (max lengths, enums, date ranges ≤ what the agent needs)
- [ ] `output_schema`; output validated before return
- [ ] `required_role`, `data_class` (PUBLIC | COMMUNITY | PRIVATE), `mode` (read | write)
- [ ] Ownership scoping for PRIVATE data: filter by caller id unless caller is admin
- [ ] Response sanitisation: strip instruction-like text from string fields, cap lengths,
      wrap free text as data (see `docs/guardrails.md` §Tool response sanitisation)
- [ ] Errors return `{code, message}` — never stack traces or other users' ids
- [ ] Tests: happy path, invalid params, wrong role, other-user access (pastoral), oversized
      response, response containing an injection string

## Finish

- Add the tool to the agent's allowlist (`packages/agents/<agent>/tools.*`) only if needed.
- Document it in `docs/architecture.md` §MCP servers.
- Run `guardrail-audit`.
