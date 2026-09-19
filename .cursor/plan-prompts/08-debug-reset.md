<context>
Bug: {{symptom}}. Expected: {{expected}}. Reproduce with: {{command / steps}}.
We have already tried: {{attempts}}. The working tree has been reset to the last clean commit.
</context>

<task>
Investigate before fixing (root cause first):
1. Trace the data flow involved and list 2–3 hypotheses ranked by likelihood.
2. For each hypothesis, the smallest check that confirms or kills it. Run the checks.
3. Only after a hypothesis is confirmed: propose the minimal fix + a regression test (or eval case if it's model behaviour).
4. If 3 fixes fail, stop and summarise what you know — don't keep layering changes.
</task>

<constraints>
Do not touch unrelated files. Do not weaken tests or guardrails. Explain the fix in one paragraph I could put in the commit message.
</constraints>
