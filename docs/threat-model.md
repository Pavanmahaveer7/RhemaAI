# Threat model (STRIDE + LLM-specific)

Run gstack `/cso` for code-level OWASP/STRIDE; run `redteam` for model-facing attacks. Update this doc after both.

| Asset | Threat | Category | Mitigation | Verified by |
|---|---|---|---|---|
| L3 check-ins | Pastor reads another pastor's data | Info disclosure | Ownership scoping in API **and** MCP tool | redteam #3, unit tests |
| L3 check-ins | Raw text leaks to third-party LLM/traces | Info disclosure | IN-PII masking, self-hosted option, trace redaction | guardrail-audit #8 |
| Agents | Direct prompt injection | Tampering | IN-INJ, envelope, scope | redteam #1 |
| Agents | Indirect injection via tool results / L2 responses | Tampering | TL-SANITISE, envelope | redteam #2 |
| Admin role | Privilege escalation via crafted request | Elevation | Server-side role checks; no role from client | /cso, tests |
| LLM budget | Cost exhaustion / denial of wallet | DoS | Token caps, quotas, budget alarm, rate limits | redteam #7 |
| L1 answers | Hallucinated scripture / misattribution | Integrity | OUT-CITE, curated corpus | eval-run compare |
| L1 answers | Perceived religious bias | Reputation | OUT-TONE, neutral prompt, expert review | eval tone_neutral |
| Crisis content | Missed self-harm signal | Safety | Crisis-first analysis, human escalation, 100% eval threshold | eval + redteam #6 |
| Web | XSS via model output | Tampering | Escape all output, CSP | /cso, redteam #9 |
| Secrets | Key leak in repo | Info disclosure | env only, secret scan in CI | CI |
