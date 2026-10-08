# ADR-007: Load licence-checked source texts and answer with quotes, not generated text
- Status: accepted
- Date: 2026-10-06
- Deciders: product owner, engineering

## Context
The dictionary cites sources by reference only, and there is no model key yet. The owner wants the word
pages to answer from real texts now, using the sources and licensing audit in `/references` (Parts A–C),
and to add a model later. `docs/lexicon-standards.md` says a model never invents a reference, model text
is unverified until a person approves it, and only licence-allowed translations are quoted.

## Decision
- `python -m app.ingest` (in `apps/api`) downloads, caches in `.cache/sources`, parses and upserts into
  the existing `source_chunk` table, adding `source_url` and a full-text `tsv` column with a GIN index.
- Sources loaded, and only these:

  | Tradition | Text | Translation | Licence | From |
  |---|---|---|---|---|
  | Christian | Whole Bible, one row per verse | World English Bible | public domain | ebible.org `engwebp_vpl.zip` |
  | Buddhist | Dhammapada (one row per verse), DN 31, MN 21, SN 12.2, SN 15.3, SN 22.59, SN 56.11, AN 3.65, AN 4.55, AN 5.177, Iti 22, Snp 1.4, 1.8, 3.8, Thig 10.1 (one row per section) | Bhikkhu Sujato | CC0 | SuttaCentral bilara-data, `published` branch |
  | Hindu | Bhagavad Gita, one row per paragraph | Sir Edwin Arnold, The Song Celestial (1885) | public domain | Project Gutenberg #2388 |

- Arnold's blank verse does not follow verse numbers, so Gita rows are referenced as "Chapter N, passage M"
  and a stored verse reference such as "Gita 3.9" is never given an Arnold quote.
- `GET /api/v1/terms/:term/passages?q=` returns up to two passages per tradition by Postgres full-text
  match, with translation, licence and link. `model` is `null`. Nothing found means "Not in verified sources".
- `GET /api/v1/terms/:term` adds the quote to each source whose passage is loaded; Faith mode gets
  `verses` built from those quotes.
- The search words per tradition (`SEARCH_WORDS` in `app/v1/sources.py`) are editorial and reviewable.
- New dictionary words are starter definitions marked "Not reviewed by an expert yet". New Faith mode
  content (marriage, ways of living, from Part B) is saved as drafted and stays hidden until a reviewer
  marks it checked. Claims in Part B that the loaded sources cannot show (Udanavarga 5.18, Mahabharata
  5.1517, Manusmriti, Grihya Sutras) were left out.

**Do not ship (never add to the ingest):** Digital Pali Dictionary, CBETA, 84000, GRETIL, Thanissaro
Bhikkhu's translations, Rangjung Yeshe, Prabhupada's Bhagavad Gita As It Is, NIV, ESV.

## Alternatives considered
- Generate answers with a model now: no key, and model text would need review before showing.
- pgvector embeddings: now optional behind `vocab.search_sources` and `find_passages`. `ingest --embed`
  stores vectors; `llm-gateway.embed` is the only caller (Hugging Face live or local stub). Chat
  `LLM_MODE` stays independent and can remain off. Full-text search still runs when embeddings are off.
- Telang's verse-numbered Gita (1882): public domain, but no clean machine-readable copy was found yet.

## Consequences (good, bad, follow-ups)
- Good: every passage shown is a real quote with its licence; no key and no new service.
- Bad: word match misses passages that use other words for the idea, and can surface weak matches.
- Follow-up: when a key is set, the compare agent reads these passages through the llm-gateway, cites
  only returned ids, and its output is checked against them (citation check) before it is shown.
- Follow-up: add Telang's Gita for verse-level Hindu quotes; widen the SuttaCentral list.
