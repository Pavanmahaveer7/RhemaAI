# Screen map: every screen → file → endpoints

Routes are hash routes (`#r=…`) so the address bar path never changes. Open any row in a browser to see the screen.
"Sample data" is what to replace with the API.

## Layer 1 · Public app — `ui_kits/public/index.html`
| Screen | Route | File | Endpoints | States to handle |
|---|---|---|---|---|
| Onboarding 1–4 | `#r=intro&step=1..4` | `Onboarding.jsx` | `PUT /me/onboarding` | Back, Skip, reduced motion |
| Welcome (guest or sign in) | `#r=welcome` | `AuthScreen.jsx` | `POST /auth/guest` | — |
| Sign in / create account | `#r=signin` (`&mode=register`) | `AuthScreen.jsx` | `/auth/signin`, `/auth/signup`, `/auth/guest/upgrade` | validation, busy |
| Search | `#r=search` | `SearchScreen.jsx` | `GET /terms?q=` | loading, empty, offline, voice |
| Word (dictionary) | `#r=term&t=karma` | `TermScreen.jsx` | `GET /terms/:term` | not in dictionary, offline (saved words), "Not in this language yet" |
| Faith mode | hold the headword | `TermScreen.jsx` (`FaithBlock`) | same `Term.faith` | `faith: null`, alert on |
| Expert edit | inside Faith mode | `TermScreen.jsx` | `POST /terms/:term/edits` | pending review |
| Monthly question | `#r=month` (`&closed=1`) | `MonthlyScreen.jsx` | `/months/current`, `/months/current/answer` | closed, invalid, crisis words, sent |
| Ideas map | `#r=graph` | `GraphScreen.jsx`, `MapScreen.jsx` | `/maps/latest/compare` | one month only (no scrub), empty |
| Settings | `#r=settings` | `SettingsScreen.jsx` | `/me/preferences`, `/me/memory`, `DELETE /me` | guest vs member |
| Admin · accounts | `#r=admin&tab=accounts&as=admin` | `AccountsScreen.jsx` | `/admin/accounts`, reveal, log | load more |
| Admin · map draft | `#r=admin&tab=map&as=admin` | `MapDraft.jsx`, `AdminScreen.jsx` | `/maps/draft` + publish/dismiss | typed confirm, undo |
| All states | `#r=states` | `index.html` | — | reference board |

Sample data: `ui_kits/public/data.js` (`window.CA_DATA`), `ui_kits/public/faithData.js`.

## Layer 3 · Pastor, reviewer, leader — `ui_kits/pipeline/index.html`
| Screen | Route | File | Endpoints | States |
|---|---|---|---|---|
| Pastor home | `#r=home` | `PastorScreens.jsx` | `/pastor/home`, `/pastor/mentor-note` | Start here, season ring |
| Check-in | `#r=checkin` | `PastorScreens.jsx` | `POST /pastor/checkins` | consent, language, offline |
| Check-in result | `#r=result&ck=steady\|hard\|failed` | `PipelineFlow.jsx` | response of the above | steady, hard (+crisis, mentor), failed + Retry, queued, blocked |
| Tracks | `#r=tracks` | `PastorScreens.jsx` | `/pastor/tracks` | — |
| Monthly pack | `#r=pack` | `PastorScreens.jsx` | `/pastor/packs/:month` | missing pieces |
| Register / join church | `#r=register` | `ChurchScreens.jsx` | `/churches`, `/churches/join` | join code |
| Church apps | `#r=integrations` | `IntegrationsScreen.jsx` | `/integrations` | US only, not available yet |
| Planning Center sign-in | `#r=signin` | `IntegrationsScreen.jsx` | OAuth authorize/callback | demo church |
| Connected church | `#r=church` | `ChurchScreens.jsx` | `/integrations` rows | stage never changes |
| Inside Planning Center (demo) | `#r=embed` | `EmbedPreview.jsx` | `/embed/church/:id` | demo only |
| Reviewer queue | `#role=reviewer&r=queue` | `ReviewerScreens.jsx` | `/review/queue` | load more |
| Preparing → review | `#role=reviewer&r=review&id=P-0419` | `PipelineFlow.jsx`, `ReviewerScreens.jsx` | `/review/packs/:id`, ack, decision | assistant unavailable, "Review still open" |
| Leader alerts | `#role=leader&r=alerts` | `ChurchScreens.jsx` | `/alerts` | typed confirm, lift |

Sample data: `ui_kits/pipeline/data.js` (`window.CA_PIPE`).

## Marketing
| Screen | File | Notes |
|---|---|---|
| Landing | `ui_kits/landing/index.html`, `Landing.jsx` | header Sign in / Get started; inline tour; footer links |
| Tour video | `ui_kits/tour/index.html` | `#layout=16:9\|9:16`, `#bare=1` hides the timeline |

## Shared scripts (load order matters)
`../styles.css` → `guard.js` (offline, alert, demo, plain page) → `confirm.js` (typed confirm, Why, Helped, crisis line, language picker, mic, save image) → `i18n.js` (interface translation) → screen files.

## Boards for review
`All Screens.html` (phone + desktop), `Mobile Flow.html`, `Full Demo.html` (click-through), `Full Demo (offline).html` (no network).
