# Data model (logical)

> Physical schema is up to the implementation; these entities and privacy classes are fixed.

| Entity | Key fields | Class | Store |
|---|---|---|---|
| user | id, role(public/pastor/admin), display_name, created_at | PRIVATE | Postgres |
| term | id, term, short_definition, tradition_tags | PUBLIC | Postgres |
| comparative_entry | term_id, hindu_context, buddhist_context, christian_bridge, source_ids[] | PUBLIC | Postgres |
| source_chunk | id, tradition, work, reference, translation, license, text, embedding, topic_tags | PUBLIC | Postgres + pgvector |
| lookup_log | id, term_or_verse, mode, user_id?, created_at | PUBLIC (no PII) | Postgres |
| l2_question | id, text, month, active | PUBLIC | Postgres |
| l2_response | id, question_id, text, created_at, flagged_injection (no user id, no IP) | COMMUNITY | Postgres |
| graph_snapshot | id, question_id, month, nodes, edges, stats, prompt_version | COMMUNITY | Graph DB (+ JSON copy in Postgres) |
| module | id, title, body, quiz, media_url | PUBLIC | Postgres |
| module_progress | pastor_id, module_id, completed_at, quiz_score | PRIVATE | Postgres |
| checkin | id, pastor_id, date, mood, prayed, visits, struggles, wins, client_id | PRIVATE, encrypted | Postgres |
| checkin_analysis | checkin_id, score, flags, encouragement, escalation, prompt_version, model | PRIVATE | Postgres |
| escalation | id, checkin_id, status(open/acked), acked_by, note | PRIVATE | Postgres |
| audit_log | actor_id, action, entity, entity_id, at | PRIVATE | Postgres (append-only) |
| session | session_id, user_id, history (summarised), shared_state, ttl | per content | Redis |

Retention: TODO(team) — proposed: check-ins 24 months, l2_responses 36 months (anonymous), sessions 24h.
