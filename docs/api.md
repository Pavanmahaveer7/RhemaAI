# API contract — LOCKED

> Changing this file = update shared types + web client + tests in the same PR.
> All responses JSON. Errors: `{ "error": { "code": "STRING", "message": "string", "request_id": "uuid" } }`.

## Common
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | none | liveness |
| GET | `/ready` | none | DB, graph DB, Redis, LLM gateway reachable |
| GET | `/api/me` | any | current user + role |

## L1 — Comparative vocab
| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l1/terms?q=` | public | — | `{results: [{term, short_definition}]}` |
| GET | `/api/l1/terms/{term}` | public | — | normal-mode dictionary entry |
| POST | `/api/l1/compare` | public (quota) | `{term_or_verse, direction?: "hindu_to_christian"\|"christian_to_hindu"}` | `compare.output.json` |

## L2 — Belief graph
| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l2/question` | public | — | `{question_id, text, month}` |
| POST | `/api/l2/responses` | public (rate-limited) | `{question_id, text (≤1000)}` | `{accepted: true}` |
| POST | `/api/l2/graph/generate` | admin | `{question_id, month}` | `{job_id}` (202) |
| GET | `/api/l2/jobs/{job_id}` | admin | — | `{status, snapshot_id?}` |
| GET | `/api/l2/graph?question_id=&month=` | admin | — | `graph.output.json` + metadata |

## L3 — Pastor training & accountability
| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l3/modules` | pastor | — | `{modules: [{id, title, progress}]}` |
| GET | `/api/l3/modules/{id}` | pastor | — | module body + quiz |
| POST | `/api/l3/modules/{id}/complete` | pastor | `{quiz_answers}` | `{score, completed}` |
| POST | `/api/l3/checkins` | pastor | `{mood 1-5, prayed bool, visits int, struggles text, wins text, client_id}` | `{checkin_id, analysis_status}` |
| GET | `/api/l3/checkins/mine` | pastor | — | own check-ins + encouragement only |
| GET | `/api/admin/pastors` | admin | — | list + progress + latest status |
| GET | `/api/admin/checkins?flagged=true` | admin | — | check-ins + `checkin.output.json` |
| POST | `/api/admin/escalations/{id}/ack` | admin | `{note}` | `{acknowledged: true}` |

## Reserved (Android, later)
`POST /api/sync/checkins`, `GET /api/sync/content-pack` — not implemented in the web phase.

## Limits
- Request body ≤ 16 KB. Free-text fields ≤ 1,000 chars.
- Public L1 compare: per-IP + per-user daily quota (`.env.example`).
