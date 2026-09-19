# ADR-003: L3 check-ins are PRIVATE, masked before any LLM, human-in-the-loop for escalation
- Status: accepted
- Date: YYYY-MM-DD

## Context
Check-ins contain pastors' struggles and potentially crisis content.

## Decision
Encrypt at rest; ownership scoping in API and MCP; PII masked before model calls; option to run checkin-analyst on a self-hosted model; crisis → human escalation with acknowledgement; risk labels admin-only.

## Consequences
+ Defensible privacy story for judges and partner churches.
− Self-hosted model adds ops work; start with masked third-party calls and revisit before real pilot.
