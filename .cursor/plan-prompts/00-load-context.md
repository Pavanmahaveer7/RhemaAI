<context>
Read these files before doing anything else, in this order:
1. AGENTS.md
2. docs/architecture.md
3. docs/api.md
4. docs/guardrails.md
5. docs/gstack-workflow.md
6. Any plan in .cursor/plans/ related to: {{topic}}
</context>

<task>
Summarise back to me, in under 15 bullet points:
- what the product is and the 4 agents,
- the non-negotiable rules you must follow,
- where code for {{topic}} should live,
- anything in the docs that looks contradictory or underspecified.
</task>

<constraints>
Do not write or edit any code in this step.
</constraints>
