# Observability, cost & quota

## Traces (AI) — Langfuse or equivalent
Every agent run = one trace: `agent`, `prompt_version`, `model`, input/output tokens, cost, latency,
tool calls (name, duration, ok/err), guardrail events (id, action). L3 traces store **masked** text only.

## Metrics (SWE) — OpenTelemetry
CPU, memory, disk, request rate, p50/p95 latency, error rate per endpoint, queue depth (L2 jobs).

## Dashboards
1. AI health: runs/min, schema-failure rate, retry rate, guardrail blocks by id, cost/day by agent.
2. Safety: injection attempts, escalations open/acked, time-to-ack.
3. Product: L1 lookups/day, top terms, L2 responses/month, L3 check-in completion rate.

## Alerts
- Escalation unacknowledged > TODO(team) hours.
- Daily spend > 80% of `MONTHLY_BUDGET_USD / 30`.
- Schema-failure rate > 5% over 15 min. Error rate > 2%. `/ready` failing.

## Cost & quota
Per-request caps (`MAX_*_TOKENS_PER_REQUEST`), per-user daily quotas (Redis counters), monthly budget
alarm, response caching for repeated L1 terms.
