# Moderation and data categories

Every typed input runs this pipeline **on the server**. The screens repeat steps 1 and 2 only to give quick, kind feedback.

| # | Step | Rule | What the person sees |
|---|------|------|----------------------|
| 1 | Limits | answer 3–280, check-in 3–500 (optional), alert note ≤140, report 3–280, expert edit 10–1200 chars | "Keep it under N characters." / "Write a few words." |
| 2 | Unclear | emoji/punctuation only, aaaaa, same word ×3, no vowels, keyboard runs | "That doesn't read as words yet." |
| 3 | Personal details | names, phones, emails, addresses removed before storage | "We removed 1 personal detail" |
| 4 | Sensitive | see categories below | depends on category |
| 5 | Duplicates | 1 answer per account or device per month; replace, never add; near-identical burst from one network counted once; 1 report per word per person | nothing (silent) |
| 6 | Rate | 5 sends per device per hour | "You've sent a few already." |
| 7 | Group | model groups answers into ideas | "Did we read you right?" |
| 8 | Hide small | ideas under 3 never publish; counts under 10 read "under 10"; regions show at ≥50 answers | "under 10" |
| 9 | Spike | one idea rising >3× from one region within 1 hour → flag in draft | admin: "Unusual rise · check before publishing" |
| 10 | Person review | admin renames, merges, removes, publishes | — |
| 11 | Noise | add Laplace noise (ε≈1, sensitivity 1) to each published count; record "noise applied" | "Counts shift slightly to protect people." |

## Sensitive categories

| Category | Action | Stored as |
|---|---|---|
| `selfharm` | route to a person within 24h; show crisis line | flag + idea only |
| `hate` (attacks on a faith or people) | hold for review | flag only |
| `sexual` | block | count only |
| `threat` | block; escalate to admin | flag + request id |
| `spam` (links, ads) | drop | count only |
| `injection` (tries to change rules) | block | request id |
| `unclear` / `offtopic` | not counted; admin sees count | count only |
| `duplicate` | counted once | count only |

## Storage (what is kept, and for how long)

```ts
type InputRecord = {
  id: string; kind: "answer" | "checkin" | "alertNote" | "report" | "expertEdit";
  monthId?: string; regionId?: string;        // broad region only
  idea?: string; ideas?: string[];             // the kept meaning
  category: "ok" | "selfharm" | "hate" | "sexual" | "threat" | "spam" | "injection" | "unclear" | "offtopic" | "duplicate";
  action: "counted" | "routed" | "held" | "blocked" | "dropped" | "merged";
  textHash?: string;                           // for duplicate checks; never the text
  text?: string;                               // deleted ≤24h after grouping (answers); check-ins kept for mentor only
  deviceKey?: string;                          // rotating, salted; for rate + duplicates
  createdAt: string; deleteTextAt?: string;
};
```

- Answer text: deleted within 24 hours of grouping. Reviewers never see it.
- Check-in text: mentor and assigned reviewer only; never on the map.
- Every block/route/hold writes an audit row (category, action, time, role — never a name).

## Admin view (design already built)
Map draft → "Before you publish": flagged count, unusual-rise warning, noise note, and **Kept out of the map** (counts per category). No text anywhere.

## Managing it
Store in Postgres (one `input_records` table + `ideas`, `months`, `audit`). Expose read-only admin tools through an MCP server (e.g. `list_flags`, `counts_by_category`, `publish_month`) so an agent can help triage — but publish and route actions always need a person.
