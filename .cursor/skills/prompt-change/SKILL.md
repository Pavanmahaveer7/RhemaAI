---
name: prompt-change
description: Safely change an agent's system prompt or model — version it, document why, run evals and red-team, and compare before/after. Use whenever the user wants to tweak, tune, rewrite, or fix a prompt, switch models, or says "the agent answers badly", "make it friendlier", or "fix the hallucination".
---

# prompt-change

1. Never edit a released prompt in place. Copy `prompts/vN.md` → `prompts/vN+1.md`, edit the copy.
2. Write the reason in `docs/prompts.md`: version, date, author, what changed, which eval cases motivated it.
3. Keep invariants in every version: untrusted-input handling, JSON-only output, scope limits,
   tone rules, crisis rule (checkin-analyst), cite-or-decline rule (compare).
4. Run `eval-run` on vN and vN+1 with the same model; show the diff per case.
5. Run the relevant `redteam` suites (1, 2, 4, 8 at minimum).
6. Switch the agent's active version via config only if vN+1 ≥ vN on every threshold.
7. Keep vN for one release as rollback.

Model swaps follow the same steps: pin the exact model id, never "latest".
