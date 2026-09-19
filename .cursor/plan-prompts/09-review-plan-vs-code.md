<context>
Plan: .cursor/plans/{{plan file}}. Diff: current branch vs main.
</context>

<task>
Review the implementation against the plan and the repo rules:
1. Every plan step: done / partial / missing (with evidence file:line).
2. Scope drift: anything implemented that the plan didn't ask for.
3. Rule check: gateway-only model calls, tool guardrails, schema validation + retry, untrusted envelope, L3 scoping, no sensitive logging, docs updated.
4. Tests/evals: do they actually assert the acceptance criteria?
5. A short list of must-fix vs nice-to-have.
</task>

<output_format>Checklist + findings table. No code changes in this step.</output_format>
