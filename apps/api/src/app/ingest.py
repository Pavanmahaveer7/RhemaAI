"""Load licence-checked source texts into source_chunk (ADR-007).

    python -m app.ingest            # download (cached) and load everything
    python -m app.ingest --dry-run  # parse and count, write nothing

Only the sources in SOURCES are loaded. The "do not ship" list in ADR-007
(DPD, CBETA, 84000, GRETIL, Thanissaro, Rangjung Yeshe, Prabhupada, NIV, ESV)
must never be added here.
"""

import argparse
import io
import json
import os
import re
import sys
import urllib.request
import zipfile
from pathlib import Path

from app.v1.sources import BOOKS, COLLECTIONS, tags_for, upsert_chunks

SC_BASE = "https://raw.githubusercontent.com/suttacentral/bilara-data/published/translation/en/sujato/sutta/"
SC_DHP_LIST = "https://api.github.com/repos/suttacentral/bilara-data/contents/translation/en/sujato/sutta/kn/dhp?ref=published"
DHP_RANGES = [
    "1-20", "21-32", "33-43", "44-59", "60-75", "76-89", "90-99", "100-115", "116-128", "129-145", "146-156",
    "157-166", "167-178", "179-196", "197-208", "209-220", "221-234", "235-255", "256-272", "273-289",
    "290-305", "306-319", "320-333", "334-359", "360-382", "383-423",
]
SUTTAS = [
    "an/an3/an3.65", "an/an4/an4.55", "an/an5/an5.177", "dn/dn31", "kn/iti/vagga3/iti22",
    "kn/snp/vagga1/snp1.4", "kn/snp/vagga1/snp1.8", "kn/snp/vagga3/snp3.8", "kn/thig/thig10.1", "mn/mn21",
    "sn/sn12/sn12.2", "sn/sn15/sn15.3", "sn/sn22/sn22.59", "sn/sn56/sn56.11",
]

SOURCES = {
    "web": {
        "url": "https://ebible.org/Scriptures/engwebp_vpl.zip",
        "tradition": "Christian",
        "translation": "World English Bible",
        "license": "public domain",
    },
    "sujato": {
        "url": SC_BASE,
        "tradition": "Buddhist",
        "translation": "Bhikkhu Sujato, SuttaCentral",
        "license": "CC0",
    },
    "arnold": {
        "url": "https://www.gutenberg.org/cache/epub/2388/pg2388.txt",
        "tradition": "Hindu",
        "translation": "Sir Edwin Arnold, The Song Celestial (1885)",
        "license": "public domain",
    },
}

ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"]


def cache_dir() -> Path:
    path = Path(os.getenv("SOURCE_CACHE_DIR") or Path(__file__).resolve().parents[4] / ".cache" / "sources")
    path.mkdir(parents=True, exist_ok=True)
    return path


def fetch(url: str, name: str) -> bytes:
    target = cache_dir() / name
    if target.exists() and target.stat().st_size > 0:
        return target.read_bytes()
    request = urllib.request.Request(url, headers={"User-Agent": "church-ai-ingest/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        data = response.read()
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    return data


def _chunk(key: str, source: str, work: str, reference: str, text: str, url: str) -> dict:
    meta = SOURCES[key]
    text = re.sub(r"\s+", " ", text).strip()
    return {
        "id": source,
        "tradition": meta["tradition"],
        "work": work,
        "reference": reference,
        "translation": meta["translation"],
        "license": meta["license"],
        "text": text,
        "topic_tags": tags_for(text),
        "source_url": url,
    }


def parse_web(vpl: str) -> list[dict]:
    """One chunk per verse. Lines look like 'JOH 11:25 Jesus said to her, ...'."""
    out = []
    for line in vpl.splitlines():
        m = re.match(r"^([1-3A-Z]{3}) (\d+):(\d+) (.+)$", line.strip())
        if not m or m.group(1) not in BOOKS:
            continue
        code, chapter, verse, text = m.groups()
        out.append(
            _chunk("web", f"web:{code}.{chapter}.{verse}", BOOKS[code], f"{chapter}:{verse}", text,
                   f"https://ebible.org/engwebp/{code}{chapter}.htm")
        )
    return out


def parse_sujato(uid: str, segments: dict[str, str]) -> list[dict]:
    """Dhammapada: one chunk per verse. Suttas: one chunk per numbered section."""
    groups: dict[str, list[str]] = {}
    title = ""
    for key, value in segments.items():
        head, _, seg = key.partition(":")
        if seg.startswith("0."):
            if value.strip():
                title = value.strip()
            continue
        group = head if uid.startswith("dhp") else seg.split(".")[0]
        groups.setdefault(group, []).append(value)
    out = []
    for group, parts in groups.items():
        text = " ".join(part.replace("<j>", " ").strip() for part in parts if part.strip())
        if not text:
            continue
        if uid.startswith("dhp"):
            verse = group.removeprefix("dhp")
            out.append(_chunk("sujato", f"sc:dhp{verse}", "Dhammapada", verse, text,
                              f"https://suttacentral.net/{uid}/en/sujato#{group}"))
            continue
        m = re.match(r"([a-z]+)([\d.]+)$", uid)
        label = f"{COLLECTIONS.get(m.group(1), m.group(1).upper())} {m.group(2)}" if m else uid
        out.append(_chunk("sujato", f"sc:{uid}:{group}", title or label, f"{label}, section {group}", text,
                          f"https://suttacentral.net/{uid}/en/sujato"))
    return out


def parse_arnold(raw: str) -> list[dict]:
    """Chapters split into speaker paragraphs. Arnold's blank verse does not follow verse numbers,
    so references name the chapter and paragraph, not a verse."""
    start = raw.find("*** START")
    end = raw.find("*** END")
    body = raw[raw.find("\n", start) + 1 : end if end > 0 else None]
    marks = list(re.finditer(r"^\s*CHAPTER ([IVXL]+)\s*$", body, re.M))
    out = []
    for i, mark in enumerate(marks):
        roman = mark.group(1)
        if roman not in ROMAN:
            continue
        chapter = ROMAN.index(roman) + 1
        text = body[mark.end() : marks[i + 1].start() if i + 1 < len(marks) else len(body)]
        n = 0
        for para in re.split(r"\n\s*\n", text):
            words = para.split()
            if len(words) < 8 or para.strip().startswith("HERE ENDETH"):
                continue
            n += 1
            out.append(_chunk("arnold", f"gita:{chapter}.{n}", "Bhagavad Gita", f"Chapter {chapter}, passage {n}", para,
                              "https://www.gutenberg.org/ebooks/2388"))
    return out


def load_web() -> list[dict]:
    data = fetch(SOURCES["web"]["url"], "engwebp_vpl.zip")
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        name = next(n for n in archive.namelist() if n.endswith("_vpl.txt"))
        return parse_web(archive.read(name).decode("utf-8-sig"))


def load_sujato() -> list[dict]:
    paths = [f"kn/dhp/dhp{r}" for r in DHP_RANGES] + SUTTAS
    out = []
    for path in paths:
        uid = path.rsplit("/", 1)[-1]
        raw = fetch(f"{SC_BASE}{path}_translation-en-sujato.json", f"sujato/{uid}.json")
        out.extend(parse_sujato(uid, json.loads(raw.decode("utf-8"))))
    return out


def load_arnold() -> list[dict]:
    return parse_arnold(fetch(SOURCES["arnold"]["url"], "pg2388.txt").decode("utf-8-sig"))


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--database-url", default=os.getenv("DATABASE_URL", "postgresql://app:app@localhost:5432/church_ai"))
    args = parser.parse_args(argv)
    chunks = load_web() + load_sujato() + load_arnold()
    counts: dict[str, int] = {}
    for chunk in chunks:
        counts[chunk["translation"]] = counts.get(chunk["translation"], 0) + 1
    for name, count in counts.items():
        print(f"{count:>6}  {name}")
    if args.dry_run:
        return 0
    import psycopg

    with psycopg.connect(args.database_url, connect_timeout=5) as conn:
        written = upsert_chunks(conn, chunks)
        conn.commit()
    print(f"loaded {written} passages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
