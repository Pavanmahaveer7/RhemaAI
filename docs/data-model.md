# Data model

What is stored today, and the privacy class of each collection. The screen API keeps these collections
in memory and saves them as JSONB documents in `store_state` (ADR-006). Source passages live in their
own table (ADR-007). The normalised tables in the first draft of this file are the target for a later
move to a secured host; they are not what the pilot writes.

Privacy classes: PUBLIC can be shown to anyone. COMMUNITY is anonymous group data. PRIVATE is a person's
own data and stays behind a role check. PRIVATE, encrypted is unreadable without `CHECKIN_ENCRYPTION_KEY`.

## Screen API (`store_state`)

| Collection | What it holds | Class |
|---|---|---|
| accounts | id, role, code name, email hash, optional password hash (scrypt) | PRIVATE |
| identities | real name and email, encrypted | PRIVATE, encrypted |
| sessions | role and account, keyed by a hash of the cookie token | PRIVATE |
| preferences, memory, onboarding | per account or guest device | PRIVATE |
| terms | headword, definition, sources, Faith mode, `reviewed`, `checked_by` | PUBLIC once reviewed; drafts are reviewer-only |
| expert_edits | proposed Faith mode text, pending until a reviewer decides | PRIVATE |
| months | the open question, counts | PUBLIC |
| answers | month, redacted text, and a device hash salted with the month id | COMMUNITY |
| concepts, links, maps | grouped ideas and the published map | COMMUNITY |
| churches, pastors | church and stage. The reviewer queue shows a region, not the church name | PRIVATE |
| checkins | mood and counts in the clear; struggles and wins encrypted | PRIVATE, encrypted |
| mentor_notes, packs, review_packs, decisions, acks | the pastor pipeline | PRIVATE |
| alerts, alert_log | a region alert raised by one leader and confirmed by two more | PRIVATE |
| audit | who was blocked or routed, and why. No free text | PRIVATE |
| reveal_log | an admin looked up a real name, with the reason | PRIVATE |

A monthly answer stores `sha256(month_id + ":" + device)`. The same device replacing its answer this
month still matches. Next month the salt changes, so the two months cannot be linked. No user id and
no IP are stored on an answer.

Faith mode is public only after two different reviewers are in `checked_by`. One check is `one_checked`
and stays hidden.

## Source passages (`source_chunk`)

PUBLIC. One row per verse or section: tradition, work, reference, translation, licence, text,
`source_url`, topic tags, and a Postgres full-text column (`tsv`). Embeddings (`pgvector`) are not
loaded yet; full-text search is what "Find passages" uses. See ADR-007 for which texts are loaded
and which must never be added.

## Not built yet

`lookup_log` (a word was opened; no personal data) and `module` / `module_progress` (training) are in
the vocabulary package schema and are unused by the screen API. The graph database is not written by
the pilot; published maps are the JSON `maps` collection.

## Retention — proposed, not applied

Nothing is deleted on a schedule yet. Approve these before any deletion job is written:

| Data | Proposed keep | Why |
|---|---|---|
| Check-ins | 24 months | A mentor may look back across a training year, then the note should go |
| Monthly answers | 36 months | The map compares years; the text is already redacted and unlinked across months |
| Sessions | 14 days | A reader returns weekly. The old 24 hour figure was for a chat session in Redis |
| Audit and reveal log | 24 months | Long enough to investigate a block or a name lookup |
| Source passages | While the licence allows | These are published texts, not personal data |

Sessions older than 14 days, and check-ins older than 24 months, would be the first deletion job.
