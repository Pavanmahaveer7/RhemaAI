# church.ai API contract

Base `/api/v1`. JSON only. Every shape is in `types.ts`; send no extra fields.
Roles are checked **on the server** for every call. "Who" is the minimum role.
Every error returns `ApiError` with a `requestId`. The UI shows `message` as sent, so write it in plain words (see `../guidelines/words-and-voice.md`).

## 1. Error → screen state
| HTTP | `error.kind` | What the screen shows |
|---|---|---|
| 200 with empty list / null | — | empty state (illustrated) |
| 400 / 422 `validation` | `error` | inline message under the field |
| 401 / 403 | `unavailable` | "Sign in" or "Admins only" |
| 404 | `empty` | "Nothing here yet" |
| 403 `blocked_*` | `blocked` | "Blocked. Nothing was saved or sent." + request id |
| 429 | `unavailable` | "Try again in a moment" |
| 5xx | `error` (`retryable: true`) | message + Retry |
| 503 `feature_off` | `unavailable` | "Switched off for the moment" (alert on) |

## 2. Sessions, guest, onboarding
| Method | Path | Who | Body → Returns |
|---|---|---|---|
| POST | `/auth/guest` | anyone | → `Session` role `guest`, device token only |
| POST | `/auth/signup` · `/auth/signin` | guest | → `Session` |
| POST | `/auth/guest/upgrade` | guest | `GuestUpgradeRequest` → `Session` |
| POST | `/auth/signout` | user | → `204` |
| GET | `/auth/session` | user | → `Session`, or `401` when signed out |
| GET / PUT | `/me/onboarding` | guest | ↔ `OnboardingState` (skippable, Back allowed) |
| GET / PUT | `/me/preferences` | guest | ↔ `Preferences` |
| GET | `/me/memory` | guest | → `MemoryItem[]` |
| DELETE | `/me/memory` | guest | `{keys?}` → `204` |
| DELETE | `/me` | user | → `204` (answers stay only as counts) |

Guests can look up words, save words on the device, answer the monthly question, view the map, tap "Did this help?". Guests never see Layer 3. There are no comments, votes, likes or follows anywhere.

## 3. Layer 1 · Dictionary and Faith mode
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/terms?q=&lang=` | guest | `TermSummary[]` (empty → "not in the dictionary", never an AI draft) |
| GET | `/terms/:term?lang=` | guest | `Term`. `faith: null` when coverage is not reviewed **or** an alert is on |
| GET | `/terms/:term/passages?q=` | guest | `Passages`: up to 2 quotes per tradition from the loaded sources (ADR-007), found by word match. `model: null`; nothing is written by a model. `found: false` means "not in verified sources". 503 `service_down` when the source texts are unreachable |
| POST | `/terms/:term/edits` | expert | `ExpertEdit` status `pending_review` |
| GET | `/review/edits?status=` | reviewer | `ExpertEdit[]`. Default pending, oldest first. `decided` returns approved and rejected, newest first |
| POST | `/review/edits/:id` | reviewer | `{approve, note}` → `ExpertEdit`. Approving keeps `previous`. Deciding again returns the first decision |
| GET | `/review/coverage` | reviewer | `FaithCoverage[]`. `one_checked` means one of the two required reviewers has signed |
| POST | `/review/coverage/:term` | reviewer | The caller's check. `one_checked` after the first reviewer, `checked` after a second, different reviewer. The same reviewer cannot count twice. Only `checked` Faith mode is ever public |

Faith mode is reached only by press-and-hold on the headword. The URL and tab title never change, and no response field says "faith" to a guest unless they asked for `/terms/:term`.

## 4. Layer 2 · Monthly question and Ideas map
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/months/current` | guest | `MonthlyQuestion` (closed after month end) |
| POST | `/months/current/answer` | guest | `SubmitAnswerRequest` → `SubmitAnswerResponse` (one per device per month; not tied to a pastor) |
| GET | `/maps/latest/compare` | guest | `ConceptMapCompare` (`previous: null` → hide the scrub) |
| GET | `/maps/:monthId` | guest | `ConceptMap` (404 if not published) |
| GET | `/maps/draft` | admin | `ConceptMapDraft` (the only place anonymous answer text appears) |
| PATCH | `/maps/draft` | admin | `DraftEdit` → `ConceptMapDraft` |
| POST | `/maps/draft/publish` | admin | → `ConceptMap` (UI asks to type "publish") |
| POST | `/maps/draft/dismiss` | admin | → `204` |

A new answer never changes the public map the same day. Only publish does. Concepts under 3 mentions stay hidden. Answer processing rules: `moderation.md`.

## 5. Layer 3 · Pastor
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/pastor/home` | pastor (self) | `PastorHome` (no scores, no risk words) |
| GET | `/pastor/tracks` | pastor (self) | `Tracks` |
| GET / PUT | `/pastor/packs/:month` | pastor (self) | `MonthlyPack` (no finance) |
| POST | `/pastor/checkins` | pastor (self) | `DailyCheckin` → `CheckinResponse` (idempotent on `clientId`) |
| GET | `/pastor/mentor-note` | pastor (self) | `MentorNote \| null` |
| POST | `/pastor/mentor/message` | pastor (self) | `MentorMessageRequest` → `204` (only the mentor sees it) |
| POST | `/churches` · `/churches/join` | pastor | `{name, country, region}` / `{code}` → church |

Check-ins are "when you can": no daily requirement, no streaks, no missed-day reminders. A hard note returns `waiting_for_person` and a `crisisLine`.

## 6. Layer 3 · Reviewer and leader
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/review/queue?cursor=` | reviewer | `QueueItem[]` (code name + broad region only) |
| GET | `/review/packs/:id` | reviewer | `ReviewPack` (assistant draft + `why`; `checkinCount` only, never check-in text) |
| POST | `/review/packs/:id/prepare` | agent service token, admin | → `AgentPrep`. Template when the model is off or fails. Never sets stage or decision |
| POST | `/review/packs/:id/ack` | reviewer | → `204` ("Review still open"; stage does not move) |
| POST | `/review/packs/:id/decision` | reviewer | `DecideRequest` → `HumanDecision` |
| GET | `/alerts/active?region=` | anyone | `Alert[]` (status `on` only) |
| GET | `/alerts` | leader | `LeaderAlert[]`, newest first, lifted alerts left out |
| GET | `/alerts/log` | leader | `AlertLogEntry[]`, newest first. Kept, cannot be edited |
| POST | `/alerts` | leader | `AlertRequest` → `Alert` status `waiting`. Nothing is paused yet. `422` if the region already has an alert |
| POST | `/alerts/:id/confirm` | leader | → `Alert`. A different leader from the one who raised it. The alert turns `on` after two such confirms, which is the third leader. |
| POST | `/alerts/:id/lift` | leader | → `Alert` |

While an alert is on for a region, the **server** returns `503 feature_off` for every item in `Alert.pauses`. Hiding it in the UI is not enough.

## 7. Church apps (optional, US only)
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/integrations` | pastor/admin | `Integration[]` (404 outside the US) |
| GET | `/integrations/planning-center/authorize` | pastor/admin | 302 to Planning Center OAuth |
| GET | `/integrations/planning-center/callback` | — | 302 back to Church apps with the row Connected (or "Demo church") |
| POST | `/integrations/:app/disconnect` | pastor/admin | → `Integration` |
| POST | `/integrations/webhook/:app` | app (signed) | → `204` (writes ministry and community rows only) |
| GET | `/embed/church/:id` | Planning Center app (token) | read-only card: month counts + Ideas map, no names |

An integration can never move a stage or put names on the map.

## 8. Feedback, safety, metrics, status
| Method | Path | Who | Returns |
|---|---|---|---|
| POST | `/feedback/helped` | guest | `HelpedRequest` → `204` (count only) |
| POST | `/feedback/report` | guest | `{term, block, text}` → `204` (one report per word block per person; duplicate is silent) |
| POST | `/feedback/beta-survey` | anyone | Beta survey JSON payload → `204` (rate limited; stored server-side) |
| GET | `/crisis-lines?country=` | anyone | `CrisisLine` |
| POST | `/events` | guest | `EventRequest` → `204` |
| GET | `/i18n/:lang` | anyone | `TranslationBundle` (reviewed strings only in production) |
| GET | `/status` | guest | `ServiceStatus[]` (+ `demo: true` in demo) |

Every assistant-written text (check-in encouragement, review draft, map draft labels) carries `why`. The UI shows it behind "Why am I seeing this?". Never omit it.

## 9. Admin
| Method | Path | Who | Returns |
|---|---|---|---|
| GET | `/admin/accounts?cursor=` | admin | `AccountRow[]` (code names only), 6 per page. `cursor` is the last `id` seen |
| POST | `/admin/accounts/:id/reveal` | admin | `RevealRequest` → `RevealResponse` (logged, expires) |
| GET | `/admin/reveal-log` | admin | `RevealLogEntry[]` |
| POST | `/admin/accounts/invite` | admin | `{email, role}` → `AccountRow` status `invited` |
| PATCH | `/admin/accounts/:id` | admin | `{role?, status?}` → `AccountRow` |
| POST | `/admin/accounts/:id/resend-invite` | admin | → `204` |
| POST | `/admin/accounts/:id/password-reset` | admin | → `204` (logged; email delivery not wired) |
| GET | `/admin/beta-surveys` | admin | `{ total, summary, items[] }` — beta survey responses for slides |
| GET | `/admin/beta-surveys?format=csv` | admin | CSV download (`rhema-beta-feedback.csv`) |
