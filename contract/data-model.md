# Data model (Postgres)

Suggested tables. Names are the only personal data; they live in one table and are reached only through a logged reveal.

## People
| Table | Columns | Notes |
|---|---|---|
| `accounts` | id, role, code_name, email_hash, created_at | `code_name` is what every screen shows |
| `identities` | account_id, real_name, email (encrypted) | read only by `POST /admin/accounts/:id/reveal` |
| `reveal_log` | id, admin_id, account_id, reason, at | append-only |
| `devices` | id, guest_token, lang, created_at | guests; no name, no email |
| `preferences` | owner_id, theme, lang, reduce_motion, remind_monthly | owner = account or device |
| `memory` | owner_id, key, value | what "What we store" lists; delete = gone |

## Layer 1
| Table | Columns | Notes |
|---|---|---|
| `terms` | term, pos, used[], updated_at | |
| `term_text` | term, lang, def, reviewed_by, reviewed_at | no row for a language → show English + "Not in this language yet" |
| `sources` | term, tradition, work, reference | |
| `faith_blocks` | term, block, text, lang, reviewed_at | only reviewed rows are served |
| `expert_edits` | id, term, block, text, expert_id, status, note | `pending_review` → approved/rejected |

## Layer 2
| Table | Columns | Notes |
|---|---|---|
| `months` | id, label, question, term, opens_at, closes_at | |
| `answers` | id, month_id, device_hash, text_redacted, lang, category, flags[], dup_of, created_at | no account id, no place; one per device per month |
| `concepts` | month_id, concept, count, is_new | built by the pipeline in `moderation.md` |
| `concept_links` | month_id, a, b, weight, kind | |
| `maps` | month_id, status (draft/published), published_at, published_by | public reads only `published` |

## Layer 3
| Table | Columns | Notes |
|---|---|---|
| `churches` | id, name, country, region, join_code | broad region only, no street |
| `pastors` | account_id, church_id, stage, mentor_id, since | |
| `checkins` | client_id (unique), pastor_id, mood, prayed, visits, struggles_enc, wins_enc, lang, outcome, created_at | text encrypted; idempotent on `client_id` |
| `mentor_notes` | pastor_id, mentor_id, lines[], at | written by people only |
| `packs` | pastor_id, month, report, feedback, sermon, community, evidence | no finance columns |
| `review_packs` | id, pastor_id, month, draft, why, generated_at, model | assistant output, kept beside the decision |
| `decisions` | pack_id, reviewer_id, decision, note, stage_before, stage_after, at | only people write here |
| `alerts` | id, scope, reason, status, pauses[], raised_by, at | |
| `integrations` | church_id, app, status, token_enc, last_sync | US only |
| `imported_rows` | church_id, app, kind (person/activity/participation/document), payload, at | never finance |

## Other
`helped` (surface, id, value, day) · `events` (name, surface, day) · `crisis_lines` (country, number, what) · `i18n_strings` (lang, key, value, reviewed).

## Graph
The Ideas map is small (tens of concepts a month): Postgres tables above are enough. A graph database (Neo4j) is optional later for cross-month concept history.
