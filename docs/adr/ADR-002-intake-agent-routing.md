# ADR-002: Intake agent routes deterministically when the route is known
- Status: accepted
- Date: YYYY-MM-DD

## Context
We want a front-door agent before the three specialists. Most requests arrive on layer-specific endpoints, so the layer is already known.

## Decision
Intake always runs (single place for classification, logging, scope checks), but uses an LLM only for ambiguous free-text entry points. Otherwise it routes by endpoint with zero model cost. It never answers users or calls domain tools.

## Consequences
+ Keeps the architecture story and a single entry point; no added latency/cost on known routes.
− Two code paths (deterministic + LLM) to test; both covered by `evals/datasets/intake.jsonl`.
