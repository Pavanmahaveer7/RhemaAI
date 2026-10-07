# ADR-005: Human-in-the-loop review and pastor data minimization
- Status: accepted
- Date: 2026-09-19
- Save as: `docs/adr/ADR-005-human-in-the-loop-and-data-minimization.md`

## Context
The check-in analyst (L3) produces scores, flags and escalations about real pastors. Pastors work across India,
Bangladesh, Myanmar and Indonesia, often as religious minorities, so their data can put them at risk if leaked.
We need (1) humans to own every decision about a pastor, (2) a record of those decisions to improve the system,
and (3) as little identifying data as possible. These affect the data model and API, so they must exist before
Layer 3 is built. Full HITL policy, ops runbooks and multi-country docs come later.

## Decision

### 1. The rule
**AI output never triggers an action about a pastor without human review.** The AI suggests; a named human decides.
- Only `stable` check-ins may auto-send AI encouragement text to the pastor.
- `watch`, `needs_support`, and any `escalation.required = true` go to a review queue. A supervisor writes or approves the pastor-facing message.
- AI scores and flags never change a pastor's standing, access, or visibility on their own.
- L2 graph snapshots are `draft` until an admin publishes them.

### 2. Review record (stored with every L3 analysis and every L2 snapshot)
New schema `schemas/review.json`:
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "review.json",
  "type": "object",
  "additionalProperties": false,
  "required": ["status"],
  "properties": {
    "status": { "enum": ["pending", "approved", "overridden", "dismissed"] },
    "reviewer_id": { "type": "string" },
    "reviewed_at": { "type": "string", "format": "date-time" },
    "decision": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "status": { "enum": ["stable", "watch", "needs_support"] },
        "flags": { "type": "array", "items": { "type": "string" } },
        "ai_was_correct": { "type": "boolean" }
      }
    },
    "reason": { "type": "string", "maxLength": 500 },
    "pastor_message": { "type": "string", "maxLength": 400 }
  }
}
```
`checkin_analysis` and `graph_snapshot` each get a `review` field using this schema. The AI's original output is
never overwritten: we keep both what the AI said and what the human decided. `ai_was_correct` + `reason` feed eval cases.

### 3. API additions (`docs/api.md`)
| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/admin/review-queue?layer=l3\|l2&status=pending` | admin | — | items awaiting review, oldest first; escalations on top |
| POST | `/api/admin/checkins/{id}/review` | admin | `review.json` (status, decision, reason, pastor_message) | updated analysis + review |
| POST | `/api/admin/l2/snapshots/{id}/review` | admin | `{status: "approved"\|"dismissed", edits?: {rename, merge, remove}, reason}` | snapshot with `published` flag |
| GET | `/api/admin/audit?entity=checkin&id=` | admin | — | who viewed / reviewed / changed what |

`POST /api/admin/escalations/{id}/ack` stays; acknowledging does **not** close the review.

### 4. Pastor data minimization (`docs/data-model.md`)
- `user`: add `pseudonym` (shown everywhere in admin UI); real name stored only if the partner church requires it, encrypted, admin-only.
- `user`: `region` at country + broad region only (e.g. "Bangladesh — Dhaka Division"). **No** street address, GPS, or church name.
- `checkin`: no location, no photos, no contact lists. Free text is PII-masked before storage of any copy sent to a model or trace.
- Every admin read of a check-in is written to `audit_log`.

### 5. Rule text for Cursor
Add to `.cursor/rules/agents.mdc`:
```
- AI output never triggers an action about a pastor without human review (ADR-005). Only `stable`
  check-ins may auto-send encouragement. Everything else goes to the review queue.
- Never overwrite AI output with the human decision; store both (`review` field).
```
Add to `.cursor/rules/data-privacy.mdc`:
```
- Pastors are identified by pseudonym. Store region at country + broad-region level only; no addresses,
  GPS, or church names (ADR-005). Log every admin read of a check-in to audit_log.
```

### 6. Eval check
Add to `docs/evals.md` checks: `requires_review` — for any non-`stable` or escalated case, the system must create a
`review.status = "pending"` record and must not send AI text to the pastor. Threshold: **100%**.

## Consequences
+ Humans own every consequential decision; early review data becomes the feedback loop and eval source.
+ A leak exposes far less about pastors.
− Supervisors need time to review; the queue needs ownership and response times (to define in the later HITL/ops docs).
− Slightly more UI work in the admin dashboard.

## Apply with Cursor
Paste into Agent mode:
```
Read docs/adr/ADR-005-human-in-the-loop-and-data-minimization.md and apply sections 2–6 exactly:
create schemas/review.json; add the review field to checkin_analysis and graph_snapshot in docs/data-model.md;
add the endpoints to docs/api.md; add pseudonym/region/audit changes to docs/data-model.md; add the rule lines to
.cursor/rules/agents.mdc and .cursor/rules/data-privacy.mdc; add the requires_review check to docs/evals.md.
Do not change anything else. Show me the diff.
```
