<!-- Use in Agent mode (not Plan Mode) after a plan is approved. -->
<context>
Plan: .cursor/plans/{{plan file}}. Execute ONLY step {{N}}: "{{step title}}".
Follow AGENTS.md and the scoped rules in .cursor/rules/.
</context>

<task>
1. Implement step {{N}} exactly as written. If the plan is wrong or incomplete, stop and tell me instead of improvising.
2. Run the verification listed for this step (tests / evals / guardrail-audit).
3. Tick the step's checkbox in the plan file and add a one-line note of anything you learned.
4. Show me the diff summary and the verification output. Do not start step {{N+1}}.
</task>

<constraints>
- Touch only the files the step lists, unless you explain why another file must change.
- No new dependencies without asking.
- Do not weaken a guardrail, test, or eval to make something pass.
</constraints>
