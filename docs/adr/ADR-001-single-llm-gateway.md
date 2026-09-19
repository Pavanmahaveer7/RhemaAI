# ADR-001: All model calls go through a single LLM gateway
- Status: accepted
- Date: YYYY-MM-DD

## Context
Four agents, several guardrails, cost limits, and tracing. Scattering SDK calls makes it impossible to prove guardrails always run.

## Decision
`packages/llm-gateway` is the only module that imports model SDKs. It runs quota → input guardrails → model → output guardrails → trace/cost. CI (`guardrail-audit`) fails on any SDK import elsewhere.

## Consequences
+ One place to enforce safety, swap models, add fallback, cache.
− Gateway is a critical dependency; needs good tests and timeouts.
