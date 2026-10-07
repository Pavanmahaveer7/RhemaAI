# Lexicon standards

One standard for the dictionary and Faith mode. UI and backend both follow it.
This is not a course, a flashcard app, or a second map.

## Screens

- The word page is the dictionary only: headword, a short definition, tradition labels, sources.
- There is no Normal / Faith toggle. Press-and-hold on the headword opens Faith mode. The address bar does not change. The tab title stays ordinary. The public screen does not say Faith.
- Faith mode, in order: parallel, difference, Christian bridge, linguistic root, historical timeline, verse list.
- An empty block says "The lexicon does not cover this yet."
- Back returns to the dictionary with no sign that Faith mode was open.
- The month map, the monthly question, and the draft are not changed by this file.

## A word

- The dictionary definition is one or two plain sentences. It is not a sermon.
- Tradition labels are Hindu, Buddhist, and Christian. They are labels, not a ranking.
- Same spelling is not the same idea. Karma, dharma, and moksha stay one headword each until one headword cannot say both the Hindu and the Buddhist meaning honestly.
- Search finds the word without the marks, and finds the other spelling: moksha, atman, nirvana, nibbana.
- A missing word stays not found. The search is logged for a person. The model does not publish a draft entry.

## Faith mode

- Describe the other tradition from its own texts first. If Hindu schools disagree, or if Theravāda, Mahāyāna, and Tibetan Buddhism disagree, name which one. Do not write "Hindus believe" or "Buddhists believe" when only some do.
- Parallel is an analogy, not the same doctrine.
- Difference names the gap. It does not pick a winner.
- The Christian bridge is the two gaps already chosen. Nirvana or moksha is the loss of the person. Salvation keeps the person with God. Where the human problem is ignorance, the remedy is a teacher. Christianity names sin, and the person needs a Savior.
- A verse is stored as a reference. The sentence on screen comes from a translation the license allows. KJV and WEB may be quoted. ESV and NIV need permission. The model does not invent a reference.
- A sutta or a Gītā verse is stored as a reference. Copy a sentence only after the license is checked. Do not import the Digital Pali Dictionary. It is non-commercial.

## Words to use

- Say mūrti, sacred narrative, deva, and saṃsāra.
- Say rebirth. Do not say a soul moves from body to body.
- Do not call nirvana heaven.
- Say Theravāda. Do not say Hīnayāna.
- Do not call every kind of meditation Zen.
- Do not say idol, myth, demigod, or "Hindu trinity."
- Trimūrti is not the Trinity. Avatāra is not the Incarnation. Anattā is not the soul.

## Who may publish

- A person who knows that tradition and a Christian reviewer both approve a comparison before it is public.
- The public screen does not show their names. The private log stores who changed the text, the previous text, and the new text.
- A suggestion waits. A make or a change is the approved text.
- Model text is unverified until a person approves it.

## Backend

- Normal lookup returns the dictionary only. Faith lookup returns parallel, difference, the bridge, and null for root, timeline, and verses until they are seeded.
- Do not add a public path that contains the word faith.
- Do not put pastor notes, church names, or map sentences into a lexicon prompt.
- The comparison tables in the longer Hindu and Buddhist notes are starter lines. Each one needs a source and both reviewers before the API returns it.

## Not this product

- Review cards, daily sessions, list quizzes, and course levels.
- A settings screen of Christian denominations, Hindu schools, or Buddhist schools.
- Jain and Sikh entries.
- A typed doctrine map on the public graph.
