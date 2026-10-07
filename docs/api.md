# API contract — LOCKED

> Screen routes, JSON shapes, and roles live in `contract/api.md` and `contract/types.ts`.
> The running screen API is `/api/v1`. This file keeps the older agent routes (`/api/l1`, `/api/l2`, `/api/l3`) until those callers move.
> Screen errors follow `ApiError`: `kind`, `code`, `message`, `requestId`, `retryable`. No stack trace.
> There is no finance route. `finance.summary` from an earlier draft is not part of the API.

> Changing a screen route means changing `contract/types.ts` first, then the API, the UI kit, and the tests in the same change.

## Common
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | none | liveness |
| GET | `/ready` | none | DB, graph DB, Redis, LLM gateway reachable |
| GET | `/api/me` | any | current user + role |

## L1 — Comparative vocab
There is no public faith route. Faith content is embedded in `/api/v1/terms/:term` as `faith`, which is `null` until coverage is reviewed or while an alert is on.

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l1/terms?q=` | public | — | `{results: [{term, short_definition}]}` |
| GET | `/api/l1/terms/{term}` | public | — | normal-mode dictionary entry (headword, definition, tags, sources; no bridge) |
| POST | `/api/l1/compare` | public (quota) | `{term_or_verse, direction?: "hindu_to_christian"\|"christian_to_hindu"}` | `compare.output.json` |

Faith-mode expert review is reserved and not implemented. A religion expert may make, change, or suggest on one area (`parallel`, `difference`, `christian_bridge`, `linguistic_root`, `historical_timeline`). The log stores who, the term, the area, the action, and the previous text beside the new text. A suggestion is not published. A make or a change is the expert’s edit. This is separate from pastor review.

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l1/terms/{term}/faith/log` | expert | — | `{entries: [{actor, area, action, previous, next, at}]}` |
| POST | `/api/l1/terms/{term}/faith/review` | expert | `{area, action: "make"\|"change"\|"suggest", text}` | `{logged: true}` |

## L2 — Belief graph
| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/api/l2/question` | public | — | `{question_id, text, month}` |
| POST | `/api/l2/responses` | public (rate-limited) | `{question_id, text (≤1000)}` | `{accepted: true}` |
| POST | `/api/l2/graph/generate` | admin | `{question_id, month}` | `{job_id}` (202) |
| GET | `/api/l2/jobs/{job_id}` | admin | — | `{status, snapshot_id?}` |
| GET | `/api/l2/graph?question_id=&month=` | admin | — | `graph.output.json` + metadata |

Reach is a plan, not a route yet. Default is open: a response from far away is still included as concepts. No GPS is stored. A later limit (coarse region, or a cap on outlying concepts) may narrow what is drawn when there is a problem. It does not delete responses.

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

## Reserved — church-app connection (not implemented)

One Planning Center OAuth app. A church installs it. ChurchPlanner-class apps that already use Planning Center are covered by that install. Scopes used: People, Services, Calendar, Check-Ins, and Groups. No Giving scope.

An app with no API sends the same events with a per-church key. Idempotent. Auth is that church credential, not the browser session. Same error shape as the rest of the API. These routes do not move a pipeline stage.

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/api/l3/connections/planning-center` | pastor | OAuth start | `{authorize_url}` |
| GET | `/api/l3/connections` | pastor | — | `{provider, status}` |
| POST | `/api/l3/partner/events` | church key | `{type, idempotency_key, payload}` | `{accepted: true}` |

`type` is one of `person.upsert`, `ministry.activity`, `community.participation`, `document.ref`.

## Reserved (Android, later)
`POST /api/sync/checkins`, `GET /api/sync/content-pack` — not implemented in the web phase.

## Limits
- Request body ≤ 16 KB. Free-text fields ≤ 1,000 chars.
- Public L1 compare: per-IP + per-user daily quota (`.env.example`).
