"""Licence-checked source passages (ADR-007).

Passages live in the source_chunk table, loaded by `python -m app.ingest`.
Nothing here writes text of its own: every passage returned is a quote from
a loaded source, with its translation, licence and link.
"""

import os
import re
import threading

SOURCE_SCHEMA = """
CREATE TABLE IF NOT EXISTS source_chunk (
  id TEXT PRIMARY KEY,
  tradition TEXT NOT NULL,
  work TEXT NOT NULL,
  reference TEXT NOT NULL,
  translation TEXT,
  license TEXT NOT NULL,
  text TEXT NOT NULL,
  topic_tags TEXT[] NOT NULL DEFAULT '{}'
);
ALTER TABLE source_chunk ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE source_chunk ADD COLUMN IF NOT EXISTS tsv tsvector
  GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;
CREATE INDEX IF NOT EXISTS source_chunk_tsv ON source_chunk USING GIN (tsv);
CREATE INDEX IF NOT EXISTS source_chunk_tags ON source_chunk USING GIN (topic_tags);
"""

TRADITIONS = ("Hindu", "Buddhist", "Christian")

# Words looked for in each tradition's texts when a word is explained.
# Editorial: a reviewer can change these lists. Each list starts with the headword.
SEARCH_WORDS: dict[str, dict[str, list[str]]] = {
    "karma": {"Hindu": ["work", "works", "deed", "fruit of"], "Buddhist": ["deeds", "kamma", "result"], "Christian": ["sow", "reap", "deeds"]},
    "dharma": {"Hindu": ["duty", "law", "virtue"], "Buddhist": ["dhamma", "teaching"], "Christian": ["law", "justly", "commandment"]},
    "moksha": {"Hindu": ["release", "freed", "deliverance", "liberation"], "Buddhist": ["freedom", "released"], "Christian": ["free", "freedom", "deliver"]},
    "nirvana": {"Hindu": ["nirvana", "peace", "bliss"], "Buddhist": ["extinguishment", "nibbana", "quenched"], "Christian": ["rest", "peace"]},
    "samsara": {"Hindu": ["birth", "rebirth", "born again"], "Buddhist": ["transmigration", "rebirth", "wandering"], "Christian": ["born again", "vanity"]},
    "atman": {"Hindu": ["soul", "spirit", "self"], "Buddhist": ["self", "not-self"], "Christian": ["soul", "spirit"]},
    "ahimsa": {"Hindu": ["harmless", "harm", "kill"], "Buddhist": ["harm", "kill", "violence"], "Christian": ["murder", "kill", "peacemakers"]},
    "mantra": {"Hindu": ["om", "chant", "name"], "Buddhist": ["recite", "chant"], "Christian": ["name of the lord", "vain repetitions"]},
    "guru": {"Hindu": ["teacher", "master", "wise"], "Buddhist": ["teacher", "instructor"], "Christian": ["teacher", "rabbi", "disciple"]},
    "sangha": {"Hindu": ["assembly", "company"], "Buddhist": ["sangha", "mendicants", "community"], "Christian": ["assembly", "church", "brothers"]},
    "meditation": {"Hindu": ["meditation", "meditate", "mind", "yoga"], "Buddhist": ["absorption", "meditate", "mindfulness"], "Christian": ["meditate", "meditation"]},
    "suffering": {"Hindu": ["pain", "grief", "sorrow"], "Buddhist": ["suffering", "sorrow", "pain"], "Christian": ["suffering", "affliction", "sorrow"]},
    "compassion": {"Hindu": ["compassion", "pity", "kind"], "Buddhist": ["compassion", "love", "kindness"], "Christian": ["compassion", "mercy", "kindness"]},
    "rebirth": {"Hindu": ["birth", "born", "body"], "Buddhist": ["rebirth", "reborn", "transmigration"], "Christian": ["born again", "resurrection"]},
    "prayer": {"Hindu": ["worship", "praise", "devotion"], "Buddhist": ["homage", "devotion"], "Christian": ["pray", "prayer"]},
    "sin": {"Hindu": ["sin", "evil", "wrong"], "Buddhist": ["bad", "evil", "wrong"], "Christian": ["sin", "sins", "transgression"]},
    "salvation": {"Hindu": ["deliverance", "release", "freed"], "Buddhist": ["freedom", "liberation", "released"], "Christian": ["saved", "salvation", "save"]},
    "grace": {"Hindu": ["grace", "favour", "gift"], "Buddhist": ["kindness", "generosity", "gift"], "Christian": ["grace", "gift", "favor"]},
    "faith": {"Hindu": ["faith", "believe", "trust"], "Buddhist": ["faith", "confidence"], "Christian": ["faith", "believe", "trust"]},
    "love": {"Hindu": ["love", "dear", "devotion"], "Buddhist": ["love", "loving", "kindness"], "Christian": ["love", "loves", "loved"]},
    "forgiveness": {"Hindu": ["forgive", "forgiveness", "patience"], "Buddhist": ["hatred", "forgive", "patience"], "Christian": ["forgive", "forgiveness", "forgiven"]},
    "judgment": {"Hindu": ["judge", "judgment"], "Buddhist": ["judge", "fault"], "Christian": ["judgment", "judge", "judged"]},
    "soul": {"Hindu": ["soul", "spirit"], "Buddhist": ["self", "not-self", "consciousness"], "Christian": ["soul", "spirit"]},
    "heaven": {"Hindu": ["heaven", "heavens", "gods"], "Buddhist": ["heaven", "gods", "realm"], "Christian": ["heaven", "kingdom of heaven"]},
    "enlightenment": {"Hindu": ["light", "knowledge", "wisdom"], "Buddhist": ["awakening", "awakened", "realized"], "Christian": ["light", "enlighten"]},
    "sacrifice": {"Hindu": ["sacrifice", "offering", "offer"], "Buddhist": ["sacrifice", "offering"], "Christian": ["sacrifice", "offering", "offer"]},
    "ritual": {"Hindu": ["rite", "rites", "offering"], "Buddhist": ["rites", "rituals", "precepts"], "Christian": ["remembrance", "feast", "ordinance"]},
    "community": {"Hindu": ["kin", "kinsmen", "people"], "Buddhist": ["community", "harmony", "family"], "Christian": ["together", "fellowship", "common"]},
    "service": {"Hindu": ["service", "serve", "work"], "Buddhist": ["serve", "help", "support"], "Christian": ["serve", "servant", "service"]},
    "wisdom": {"Hindu": ["wisdom", "wise", "knowledge"], "Buddhist": ["wisdom", "wise", "understanding"], "Christian": ["wisdom", "wise", "understanding"]},
    "death": {"Hindu": ["death", "die", "dies"], "Buddhist": ["death", "die", "dying"], "Christian": ["death", "die", "resurrection"]},
    "life": {"Hindu": ["life", "live", "lives"], "Buddhist": ["life", "live", "lives"], "Christian": ["life", "live", "eternal life"]},
    "marriage": {"Hindu": ["wife", "husband", "marriage"], "Buddhist": ["wife", "husband", "couple"], "Christian": ["wife", "husband", "marriage"]},
    "ways of living": {"Hindu": ["virtue", "harmless", "truthful"], "Buddhist": ["precepts", "livelihood", "right action"], "Christian": ["neighbor", "justly", "love"]},
}

BOOKS = {
    "GEN": "Genesis", "EXO": "Exodus", "LEV": "Leviticus", "NUM": "Numbers", "DEU": "Deuteronomy", "JOS": "Joshua",
    "JDG": "Judges", "RUT": "Ruth", "1SA": "1 Samuel", "2SA": "2 Samuel", "1KI": "1 Kings", "2KI": "2 Kings",
    "1CH": "1 Chronicles", "2CH": "2 Chronicles", "EZR": "Ezra", "NEH": "Nehemiah", "EST": "Esther", "JOB": "Job",
    "PSA": "Psalms", "PRO": "Proverbs", "ECC": "Ecclesiastes", "SOL": "Song of Solomon", "ISA": "Isaiah",
    "JER": "Jeremiah", "LAM": "Lamentations", "EZE": "Ezekiel", "DAN": "Daniel", "HOS": "Hosea", "JOE": "Joel",
    "AMO": "Amos", "OBA": "Obadiah", "JON": "Jonah", "MIC": "Micah", "NAH": "Nahum", "HAB": "Habakkuk",
    "ZEP": "Zephaniah", "HAG": "Haggai", "ZEC": "Zechariah", "MAL": "Malachi", "MAT": "Matthew", "MAR": "Mark",
    "LUK": "Luke", "JOH": "John", "ACT": "Acts", "ROM": "Romans", "1CO": "1 Corinthians", "2CO": "2 Corinthians",
    "GAL": "Galatians", "EPH": "Ephesians", "PHI": "Philippians", "COL": "Colossians", "1TH": "1 Thessalonians",
    "2TH": "2 Thessalonians", "1TI": "1 Timothy", "2TI": "2 Timothy", "TIT": "Titus", "PHM": "Philemon",
    "HEB": "Hebrews", "JAM": "James", "1PE": "1 Peter", "2PE": "2 Peter", "1JO": "1 John", "2JO": "2 John",
    "3JO": "3 John", "JUD": "Jude", "REV": "Revelation",
}
BOOK_CODES = {name.lower(): code for code, name in BOOKS.items()}
COLLECTIONS = {"dn": "DN", "mn": "MN", "sn": "SN", "an": "AN", "snp": "Snp", "iti": "Iti", "thig": "Thig", "dhp": "Dhp"}

_quote_cache: dict[str, dict | None] = {}
_cache_lock = threading.Lock()


def database_url() -> str | None:
    if os.getenv("CONTRACT_STORE", "auto") == "memory":
        return None
    return os.getenv("DATABASE_URL", "").strip() or None


def _connect(url: str | None = None):
    import psycopg
    from psycopg.rows import dict_row

    return psycopg.connect(url or database_url(), row_factory=dict_row, connect_timeout=2)


def upsert_chunks(conn, chunks: list[dict]) -> int:
    conn.execute(SOURCE_SCHEMA)
    with conn.cursor() as cur:
        cur.executemany(
            """
            INSERT INTO source_chunk (id, tradition, work, reference, translation, license, text, topic_tags, source_url)
            VALUES (%(id)s, %(tradition)s, %(work)s, %(reference)s, %(translation)s, %(license)s, %(text)s,
                    %(topic_tags)s, %(source_url)s)
            ON CONFLICT (id) DO UPDATE SET
              tradition = EXCLUDED.tradition, work = EXCLUDED.work, reference = EXCLUDED.reference,
              translation = EXCLUDED.translation, license = EXCLUDED.license, text = EXCLUDED.text,
              topic_tags = EXCLUDED.topic_tags, source_url = EXCLUDED.source_url
            """,
            chunks,
        )
    with _cache_lock:
        _quote_cache.clear()
    return len(chunks)


def tags_for(text: str) -> list[str]:
    low = " " + re.sub(r"[^a-z\- ]+", " ", text.lower()) + " "
    out = []
    for term, by_trad in SEARCH_WORDS.items():
        words = {term, *(w for ws in by_trad.values() for w in ws)}
        if any(f" {w} " in low for w in words):
            out.append(term)
    return out


def _verses(spec: str) -> list[str]:
    """'13:4' -> ['13.4']; '5:21–25' -> 21..25; '22:37-40' -> 37..40."""
    spec = spec.replace("–", "-").replace(" ", "")
    m = re.fullmatch(r"(\d+):(\d+)(?:-(\d+))?", spec)
    if not m:
        return []
    chapter, first, last = int(m.group(1)), int(m.group(2)), int(m.group(3) or m.group(2))
    return [f"{chapter}.{v}" for v in range(first, min(last, first + 8) + 1)]


def chunk_ids(source: dict) -> list[str]:
    """The source_chunk ids that hold the quoted text of a stored reference, if any."""
    work, ref = source.get("work", ""), str(source.get("reference", ""))
    if source.get("tradition") == "Christian":
        code = BOOK_CODES.get(work.lower())
        return [f"web:{code}.{v}" for v in _verses(ref)] if code else []
    if source.get("tradition") == "Buddhist":
        if work == "Dhammapada":
            m = re.fullmatch(r"(\d+)(?:\s*[–-]\s*(\d+))?", ref.strip())
            if not m:
                return []
            first, last = int(m.group(1)), int(m.group(2) or m.group(1))
            return [f"sc:dhp{v}" for v in range(first, min(last, first + 4) + 1)]
        m = re.fullmatch(r"(DN|MN|SN|AN|Snp|Iti|Thig)\s*([\d.]+)(?:,\s*section\s*(\d+))?", ref.strip())
        if m:
            uid = m.group(1).lower() + m.group(2)
            return [f"sc:{uid}:{m.group(3) or 1}"]
    return []


def attach_quotes(sources: list[dict]) -> list[dict]:
    """Add quote, translation, licence and link to each source that has a loaded passage."""
    url = database_url()
    if not url or not sources:
        return sources
    wanted = {cid for item in sources for cid in chunk_ids(item)}
    missing = [cid for cid in wanted if cid not in _quote_cache]
    if missing:
        try:
            with _connect(url) as conn:
                rows = conn.execute(
                    "SELECT id, text, translation, license, source_url FROM source_chunk WHERE id = ANY(%s)",
                    (missing,),
                ).fetchall()
        except Exception:
            return sources
        found = {row["id"]: row for row in rows}
        with _cache_lock:
            for cid in missing:
                _quote_cache[cid] = found.get(cid)
    out = []
    for item in sources:
        rows = [_quote_cache.get(cid) for cid in chunk_ids(item)]
        rows = [row for row in rows if row]
        if rows:
            item = {
                **item,
                "quote": " ".join(row["text"] for row in rows),
                "translation": rows[0]["translation"],
                "license": rows[0]["license"],
                "url": rows[0]["source_url"],
            }
        out.append(item)
    return out


def _tsquery(words: list[str]) -> str:
    parts = []
    for word in words:
        word = re.sub(r"[^\w\s\-]", "", word).strip()
        if word:
            parts.append(f'"{word}"' if " " in word else word)
    return " or ".join(parts)


def find_passages(term: str, question: str = "", per_tradition: int = 2) -> dict:
    """Up to `per_tradition` passages from each tradition's loaded texts. Raises if the database is down."""
    url = database_url()
    if not url:
        raise RuntimeError("no_database")
    term = term.lower().strip()
    words_by_trad = SEARCH_WORDS.get(term, {})
    passages = []
    with _connect(url) as conn:
        for tradition in TRADITIONS:
            words = question.split() if question else [term, *words_by_trad.get(tradition, [])]
            query = _tsquery(words)
            if not query:
                continue
            rows = conn.execute(
                """
                SELECT id, tradition, work, reference, translation, license, source_url, text
                FROM source_chunk, websearch_to_tsquery('english', %s) AS q
                WHERE tradition = %s AND tsv @@ q AND length(text) BETWEEN 40 AND 1400
                ORDER BY ts_rank_cd(tsv, q, 1) DESC, id
                LIMIT %s
                """,
                (query, tradition, per_tradition),
            ).fetchall()
            for row in rows:
                passages.append(
                    {
                        "tradition": row["tradition"],
                        "work": row["work"],
                        "reference": row["reference"],
                        "quote": row["text"],
                        "translation": row["translation"],
                        "license": row["license"],
                        "url": row["source_url"],
                    }
                )
    return {
        "term": term,
        "question": question or None,
        "searchedFor": {t: (question.split() if question else [term, *words_by_trad.get(t, [])]) for t in TRADITIONS},
        "passages": passages,
        "found": bool(passages),
        "model": None,
        "note": "Quotes found by word match in licence-checked sources. Not reviewed, and not an answer written by a model.",
    }
