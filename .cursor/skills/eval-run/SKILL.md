---
name: eval-run
description: Run the evaluation datasets for one or all agents, compare against thresholds and the last baseline, and report regressions. Use whenever a prompt, model, schema, retrieval corpus, or agent logic changes, before merging agent work, or when the user asks "did quality drop", "run evals", or "test the agent".
---

# eval-run

## Steps

1. Identify affected agents (from the diff or the user). Default: all four.
2. For each agent, run `scripts/run_evals` on `evals/datasets/<agent>.jsonl` against the current
   prompt version and configured model. Save to `evals/results/<agent>/<timestamp>.json`.
3. Score each case by its `checks` (see `docs/evals.md`): schema_valid, route_equals,
   cites_sources, no_hallucinated_source, flags_include, escalation_required, tone_neutral
   (LLM-judge), injection_ignored.
4. Compare to thresholds in `docs/evals.md` and to the previous result file (baseline).
5. Log the run to the observability tool as a dataset run if configured.

## Report

```
EVALS — <agent> — prompt vN — <model>
pass rate: 92% (threshold 90%, baseline 94%)  ⚠ -2%
failures:
  case c-017: cites_sources — cited src id not in retrieved set
  ...
verdict: PASS | FAIL (regression > 3% or below threshold)
```

A FAIL blocks merge. Suggest the smallest prompt/retrieval fix and re-run only failing cases first.

## Adding cases

Every bug found in `/qa`, `/review`, or by a human becomes a new eval case. Never delete a
failing case to make the suite pass.
