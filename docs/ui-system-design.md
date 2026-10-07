# UI system design guide

Paste this document into Claude Design and ask it to draw the screens. It is the product we are planning: public dictionary and faith mode, an interactive concept graph, and a pastor pipeline. A church connects Planning Center (which also covers ChurchPlanner-class apps) from the pastor home. That connection feeds the pipeline. It does not replace it.

Android is not part of this UI. Web only, phone first, then desktop.

## Product

One web product, three layers, for non-denominational churches and lay pastors in low-connectivity places.

- **L1 Comparative vocabulary** (public). A dictionary, then an optional faith view. Hindu, Buddhist, and Christian stay distinct. Sources sit under the answer.
- **L2 Belief concept graph** (public submits, admin explores and publishes). Monthly free-text answers become a concept map over time. Concepts, not groups of people.
- **L3 Pastor pipeline** (pastor, mentor, church leaders, regional authority). A person moves through stages. Training, ministry, and character feed a monthly review. A human decides what happens next. Church apps such as ChurchPlanner send activity into this pipeline. They do not replace it.

**One line:** Look up a word as a dictionary. Open faith mode only if you want the resemblance, the difference, and a Christian bridge. Elsewhere, the community’s beliefs become a map you can move through, and a pastor advances only after a person reviews the month.

This is not a faith chat, a Bible app, or Religions Ocean, Interfaith Reader, Open Religion Guide, FaithGPT, or Faith Explorer.

## Who uses it

| Surface | Who | What they see |
|---|---|---|
| Public | Anyone, phone first | Search, dictionary, faith mode, monthly question, published graph |
| Pastor | Signed-in pastor or candidate | Profile, current stage, three tracks, monthly pack, their own encouragement |
| Reviewer | Mentor, church leader, or regional authority | Completeness flags, evidence, and the decision: continue, development plan, or additional review |
| Admin | Supervisor of the system | Draft graph, publish controls, review queue |

The server enforces roles. The client never holds model keys or service secrets.

## How a request moves (do not draw this as a screen)

Web → edge (rate limit) → API → intake → one agent (compare, graph builder, or check-in analyst) → guardrails → model → one of three data tools (vocab, graph, pastoral).

The public dictionary does not call a model. Intake only routes. The pastor agent prepares a review. It does not move a pastor to the next stage.

## Visual rules

- Phone first, then desktop. Dark, bold type, Gen Z tone on the public L1 screens.
- L3 copy is pastoral, not clinical. Scores, flags, and the words watch and needs support stay on reviewer and admin screens.
- One type system. L1 is bold and public. L3 is quieter. Admin and review are denser.
- Keyboard access, labelled inputs, enough contrast.
- Model text is plain text, never raw HTML.
- Sources (tradition, work, reference) sit under every comparative answer.
- Every data screen has loading, empty, error with a plain sentence and a retry, and unavailable.
- An unknown word says it is not in the verified lexicon. Switching Normal and Faith never leaves a half-updated page.
- If a section has no source, say the lexicon does not cover it.

## What is already on screen

Search, the term page (Normal and Faith mode), and a plain system status page exist and are unstyled. Draw replacements for those. Every other screen below is still to draw.

---

## Screen 1 — Search (public)

- Title: Comparative dictionary.
- One labelled field, one Search action. Placeholder: karma.
- Results: term, then a one-line definition. Each row opens the term page.
- Empty: “No matching terms in the lexicon.”
- Error: the server message, with retry.
- System status is a quiet link, not the hero.

Demo words: karma, dharma, moksha, nirvana, grace, faith, meditation, suffering, compassion, salvation.

## Screen 2 — Term (public). Two modes. Normal is the default.

Two controls: **Normal** and **Faith mode**. Faith is off until tapped. Back to search.

### Normal

A lexical entry. No comparison and no Christian bridge on this screen.

- Headword
- Short definition (a sense, not a sermon)
- “Used in” as labels only: Hindu, Buddhist, Christian
- Pronunciation — today: “Not in the lexicon yet.”
- Etymology — today: “Not in the lexicon yet.”
- Sources under the definition

### Faith mode

Not a second dictionary sense. One line at the top: this compares traditions and does not replace the definition. Then, in order:

1. **Parallel** — resemblance, labeled as analogy, not identity.
2. **Difference** — where the doctrines do not match. No ranking and no winner.
3. **Christian bridge** — how a Christian can understand the term without saying the traditions are the same. This block exists only because the person opened Faith mode.
4. **Linguistic root** — same word is not the same concept. Today: “The lexicon does not cover this yet.”
5. **Historical timeline** — how the word’s use shifted. Today: the same uncovered line.
6. Sources again.

The dictionary stays a definition. Faith mode is where the Christian explanation goes deep. The bridge names a gap in plain language. It does not merge the traditions, and Difference still has no winner.

Two gaps are the core of this mode:

- **Ultimate goal.** Nirvana or moksha is detachment and the extinction of individual identity into a universal oneness. Salvation in Christianity is the opposite: a person keeps a unique identity and lives in an eternal, personal relationship with God (heaven, the kingdom of God). The gap is the loss of personhood versus the perfection of personhood.
- **Problem of humanity.** Many traditions name the root problem as ignorance or forgetfulness, so the remedy is education, law, or enlightenment. Christianity names sin: a broken relationship and a dead spiritual nature. The gap is that a person does not only need a teacher or a list of rules. They need a Savior who brings them from death to life.

**Demo concepts for this mode:** marriage, love, faith, and salvation. Use these four when showing the gaps. The wider dictionary seed is unchanged.

**Expert review, not built yet.** A religion expert can make, change, or suggest on one area of a term: parallel, difference, Christian bridge, linguistic root, or historical timeline. The screen shows who did it. A suggestion waits. A make or a change is that expert’s edit. The log keeps the person, the term, the area, the action, and the previous text beside the new text. This review is for Faith mode content. It is not the pastor review queue.

Later on this same screen, draw empty badge slots: Lexicon, Citation, Tone audit. Each is a check or a visible reason. Never a silent pass. There is no chat thread.

### Sample: karma

- **Normal.** A short definition of action and its moral weight. Tags: Hindu, Buddhist, Christian. Pronunciation and etymology uncovered. Sources such as Bhagavad Gita, Dhammapada, KJV.
- **Faith.** Parallel: both traditions treat action as morally weighted; that resemblance is an analogy, not one doctrine. Difference: they do not share the same account of liberation or grace. Christian bridge: a Christian reading that does not collapse the three traditions. Root and timeline uncovered.

## Screen 3 — Monthly question (public, L2)

- One active question for the month. Example: “What does a good life mean to you?”
- One free-text field, 1,000 characters max, one submit.
- After submit: “Others also talked about…” followed by aggregate concept labels only. No quotes that could identify a person. No “you are in group 3.”
- Empty month: the question, and a line that no map has been published yet.

## Screen 4 — Concept graph

A force-directed map. Concepts are nodes (up to 200). Co-mentions are links (up to 1,000). Size and thickness follow how often the idea was mentioned. This is a canvas, not a poster and not a table.

Interactions:

- Pan, zoom, and drag.
- Hover or tap a concept: its label, its weight, and the concepts beside it.
- Month switch. Each month is its own snapshot. Show what is new since the previous month.
- Two readings on the same map: concepts people share, and pairs that pull apart. Still concepts, not groups of people.
- On a phone the canvas fills the screen. Month switch and “new since last month” stay reachable.

**Reach.** The map is open by default. A person far from the church’s usual place can still answer, and that view is noted on the graph as a concept. Distance does not drop it. No precise location is collected.

A limit exists for when something goes wrong (abuse, safety, noise, or a map too wide to read). It is off until someone turns it on. The limit may be a coarse region for new answers, or a cap on how far outlying concepts sit from the month’s main group. Limited views stay in the record. They are not deleted. The public map still shows concepts, not where anyone lives.

Two versions:

- **Admin draft.** Rename, merge, or remove a node, then publish or dismiss. A count of flagged answers may show. The original sentences do not.
- **Public published.** The same exploration, with no edit controls. If nothing is published, show the empty state.

Sample: one month with family, duty, suffering, and hope. The next month highlights suffering and hope as new.

---

## Layer 3 — Pastor pipeline

Draw this as a path, not one dashboard. Full workflow: [l3-pastor-pipeline.md](l3-pastor-pipeline.md).

Stages, in order: **Candidate → Training → Ministry placement → Active ministry → Ongoing development.**

Three tracks run beside the current stage:

- **Training** — courses, progress, certificates, documents.
- **Ministry** — activities, teaching, preaching, mentoring.
- **Character and behavior** — observation, feedback, concerns.

Once a month those tracks become a pack:

- **Report** — activities, challenges, progress.
- **Feedback** — people, mentor, leaders.
- **Finance** — funds, spending, receipts. The church app keeps the ledger. This screen shows a month summary and document links.

Then:

- **Community involvement** — local outreach, community service, partnerships, ministry impact, participation.
- **Documents and evidence** — forms, certificates, receipts, sermons and teaching, reviews. Show links and names, not a second file cabinet.
- **Agent preparation** — completeness, what is missing, where the pack was routed, a short history summary, and items flagged for a person. The agent does not show a “stage advanced” success.
- **Leadership review** — pastor, mentor, church leaders, regional authority. Outcomes: **Continue**, **Development plan**, or **Additional review**. Only that human outcome moves the stage.

### Church-app connection

A **Connect church app** action sits on the pastor home. It shows connected or not connected. The first connector is Planning Center. One install covers ChurchPlanner and any similar app that already uses Planning Center. Do not draw a rebuilt Planning Center or ChurchPlanner.

When connected, the pipeline may show people, service plans, calendar and check-ins, and a giving summary. Each imported row is labelled with the source, for example “Planning Center.” Giving on screen is a month summary and a receipt link, not a donor list. Stage, the pastor’s own progress, and the reviewer decision stay in this app.

| Pipeline piece | Shown as coming from the church app | Owned on our screens |
|---|---|---|
| Person and church | Their people list | Current stage, mentor, our history |
| Ministry activity | Service plans, teaching, preaching | — |
| Community | Attendance, groups, calendar | Impact summary |
| Finance | Month summary and a receipt link | Not donor-level detail |
| Documents | Links and ids | — |
| Stage change | Never | Leadership outcome only |

Admin and reviewer lists show a pseudonym and country plus broad region (example: “Bangladesh — Dhaka Division”). No street, GPS, or photo. The pastor’s own screens may show their church and stage because it is their record. Scores and risk words stay off the pastor’s own screens.

Daily check-in is one input into character and the monthly pack, not the whole pipeline. Fields: mood (1–5), prayed (yes/no), visits (a number), struggles, wins. After submit, show one plain state: pending, failed, encouragement (stable only), waiting for a person, or crisis (a human is notified). The pastor does not see clinical labels.

### Screens to draw for L3

1. **Pastor home.** Name or candidate status, church, current stage, mentor, and a short history. The five stages are visible, with the current one marked. Include **Connect church app**, with a connected or not-connected state.
2. **Three tracks.** Training, ministry, and character as three columns or three stacked cards on a phone. Ministry rows that came from a church app are labelled with that source.
3. **Monthly pack.** Report, feedback, and finance summary on one review surface. Missing pieces are named, not hidden.
4. **Community.** Outreach, service, partnerships, impact, participation.
5. **Evidence.** A list of forms, certificates, receipts, sermons, reviews.
6. **Prepared review.** The agent’s summary, missing items, and flags. A clear line that a person still has to decide.
7. **Leadership decision.** Three outcomes: Continue, Development plan, Additional review. After the decision, the stage marker moves.
8. **Reviewer queue.** Oldest first. Escalations and incomplete packs on top. AI text and the human decision sit side by side. The human choice does not erase the AI text.

Seed five pastors with mixed stages: one candidate, one in training, one in active ministry who is stable, one waiting for review, one additional review at the top of the queue.

## Screen — System status

Minor. API, database, cache, graph database, model gateway: up or down. Not part of the product story.

## Copy the UI must show

- Same word is not the same concept.
- Parallel is an analogy. Difference does not pick a winner. The bridge is not a merge.
- The public dictionary stays a definition. Christian content lives in Faith mode.
- Pastor-facing text never uses clinical or risk labels.
- A church app can fill ministry, community, and finance summaries. It cannot move a stage.
- Errors are a sentence the person can read: term not in the lexicon, invalid input, not allowed, service down, blocked for safety.

## Do not draw

- A chat box as the main way to look up a word
- A paragraph that blends the traditions into one religion
- People clusters, opinion groups, or a score on the pastor’s own screen
- Android, maps, street addresses, or profile photos
- A rebuilt ChurchPlanner or Planning Center inside this product
- A second visual language per layer
