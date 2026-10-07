# Guardrails (server-enforced)

The UI also runs these checks, but the **server is the source of truth**. Never rely on the frontend to hide data. If a field is not in `types.ts`, it does not leave the server.

## 1. Harmful input: block
Applies to all free text: answers, expert edits, pack text, check-ins, decision notes.
- Detect prompt injection or policy bypass ("ignore the rules", "system prompt", "jailbreak", "act as", "reveal the key").
  → `403 blocked_injection`. Save nothing and send nothing to any model. Log the requestId only.
- Detect abusive or hateful content → `403 blocked_policy`.
- Limits: answer 1–280 characters; edits 1–4000 characters.
- Rate limit per anonymous token and per IP → `429`.

## 2. Personal details: remove on arrival
- Before storage, redact emails, phone numbers, street addresses and "my name is X" with `[removed]`.
- Store only the redacted text. Return `removedDetails` (a count), never the values.
- Answers carry no account id, IP, timestamp finer than the month, or location.

## 3. Crisis language: support, don't label
- Monthly answer: set `support: true`. The UI shows a support line. No escalation, because the answer is anonymous.
- Pastor check-in: outcome `crisis_human_notified`, and a real person (mentor) is notified right away. The pastor never sees clinical terms.

## 4. Concept map: anonymous counts only
- Public maps include **only concepts with a count of 3 or more**. Under-3 concepts are removed before the response is built. Send `hiddenRare` as a count.
- Links only between returned concepts.
- Public responses never include answer text, quotes, names, accounts, places or timestamps.
- The scrub (`/compare`) adds no new data types. It is two public maps plus the change in counts.
- `anonymousAnswers` exists **only** on `ConceptMapDraft` (admin). Flagged answers are counted and never listed.
- Publishing removes under-3 concepts and all text. Publish, dismiss, rename, merge and remove are all audit-logged.

## 5. Names hidden; admin reveal logged
- Every list uses code names (`P-0233`). Real names live in a separate table that only the reveal endpoint reads.
- Reveal requires the admin role and a reason of at least 10 characters. It writes a `RevealLogEntry` **before** returning the name. The name expires on the client after `expiresInSec`.
- Reviewers see code name, country and broad region only. No street, GPS or photo.

## 6. Human in the loop: agents never decide
- The agent can check completeness, name what's missing, route, summarize and flag. It **cannot** write `decision` or `stage`, and the schema has no field for it.
- Stage changes only through `POST /review/packs/:id/decision` by a human reviewer. Continue moves the stage forward; the other outcomes hold it.
- Agent text is stored separately and never overwritten by the decision. Both are shown side by side.
- No scores or risk words on pastor-facing responses.

## 7. Expert edits: gated
- Edits are created as `pending_review` and never appear in `GET /terms/:term` until a reviewer approves them.
- Faith mode returns reviewed content only. If a block has no reviewed content, it is `null`, and the UI shows "coverage insufficient".
- Faith comparisons never rank traditions (checked in review).

## 8. Integrations: fill, never decide
- Planning Center may write `ministry` and `community` rows only. Never finance. Offered to US churches only; other countries get `404`.
- Webhooks must be signed. Unsigned requests are rejected (`403`).
- An integration can never change stage, decision or character notes.

## Tests Cursor should write
- [ ] A public map response never contains a concept with count < 3.
- [ ] A public map response contains no string over 40 characters (no answer text leaks).
- [ ] An injection string returns 403 and writes 0 rows.
- [ ] An email or phone number in an answer is stored as `[removed]`.
- [ ] Calling reveal without a reason returns 422; with a reason, a log row exists before the response.
- [ ] Agent service credentials cannot call `/decision`.
- [ ] An integration webhook payload containing `stage` is rejected.
- [ ] A reviewer queue row has only the `QueueItem` keys.
- [ ] `/compare` returns `previous: null` when only one month is published.
