# Rhema.ai: shared contract

**Start here.** This folder is the single source of truth between the designed screens (`/ui_kits`) and the backend. If something isn't in here, it isn't in the product.

## What Rhema.ai is
A calm faith-vocabulary app for young people and pastors in South and Southeast Asia, in three layers:
1. **Dictionary** (public): one word explained in Hindu, Buddhist and Christian terms, never ranked. A hidden Faith mode opens by holding the headword.
2. **Monthly question and Ideas map** (public, anonymous): one question a month; a published map of the concepts people used.
3. **Pastor care** (private): "when you can" check-ins, a mentor, monthly pack, and human reviewers. The assistant drafts; only people decide. Leaders can raise an alert that pauses sensitive features in a region.

## Files, in reading order
| File | What it is |
|---|---|
| `types.ts` | every data shape; frontend and backend import the same file |
| `api.md` | every endpoint, role and error → screen state |
| `guardrails.md` | rules the server must enforce, plus tests |
| `moderation.md` | input limits, sensitive content, duplicates, noise |
| `data-model.md` | database tables |
| `screens.md` | every screen → route → file → endpoints → states |
| `frontend-wiring.md` | sample data and localStorage to replace, shared helpers |
| `i18n.md` | 6 languages; what's translated and what never is |
| `build-order.md` | step-by-step prompts for Cursor |

Also read `../guidelines/words-and-voice.md` (one word per thing) and `../guidelines/demo-script.md`.

## Non-negotiables
- Names never appear on public screens, the map, the reviewer queue or exports. Code names only; reveal is logged.
- No finance data. No street, GPS or photos of people.
- No comments, votes, likes, feeds, video or chat.
- Faith mode: no URL or title change, no visible marker, off during an alert.
- Every assistant text carries `why`. The assistant never sets a stage or a decision.
- Alerts are enforced on the server.
- Planning Center is optional and US only.

## Prompt for Cursor
> Build the Rhema.ai backend from `/contract`, following `build-order.md` one step at a time. Use `types.ts` as the exact shapes. Enforce `guardrails.md` on the server. Wire the existing screens in `/ui_kits` per `frontend-wiring.md` without changing their layout or wording.

## Rules for changes
1. Change `types.ts` first, then both sides.
2. New fields are optional until both sides ship.
3. If a screen needs data that isn't here, add it to the contract first.
