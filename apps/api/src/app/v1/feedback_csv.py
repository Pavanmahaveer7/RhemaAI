"""Write every beta survey to a CSV as soon as it arrives.

Postgres (when DATABASE_URL is set) is the durable store on Vercel.
The CSV is a live export you can open on disk. Vercel disk is ephemeral,
so set FEEDBACK_CSV_PATH if you want a specific file; otherwise we use
church-ai-stack/data/rhema-beta-feedback.csv when that folder is writable.
"""

from __future__ import annotations

import csv
import io
import logging
import os
import threading
from pathlib import Path

log = logging.getLogger("church_ai.api")

HEADERS = [
    "day",
    "submittedAt",
    "from",
    "device",
    "lang",
    "version",
    "email",
    "role",
    "easy",
    "useful",
    "fair",
    "push",
    "feel",
    "again",
    "broken",
]

_lock = threading.Lock()


def csv_path() -> Path:
    env = os.getenv("FEEDBACK_CSV_PATH", "").strip()
    if env:
        return Path(env)
    here = Path(__file__).resolve()
    candidates = []
    if len(here.parents) > 5:
        candidates.append(here.parents[5] / "data" / "rhema-beta-feedback.csv")
    candidates.append(Path.cwd() / "data" / "rhema-beta-feedback.csv")
    candidates.append(Path(os.getenv("TMPDIR") or os.getenv("TEMP") or "/tmp") / "rhema-beta-feedback.csv")
    for path in candidates:
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            return path
        except OSError:
            continue
    return candidates[-1]


def survey_to_row(row: dict) -> list:
    answers = row.get("answers") or {}
    feel = answers.get("feel")
    return [
        row.get("day") or "",
        row.get("submittedAt") or "",
        row.get("from") or "",
        row.get("device") or "",
        row.get("lang") or "",
        row.get("version") or "",
        row.get("email") or "",
        answers.get("role") or "",
        answers.get("easy") if answers.get("easy") not in (None, "") else "",
        answers.get("useful") or "",
        answers.get("fair") or "",
        answers.get("push") or "",
        "; ".join(feel) if isinstance(feel, list) else (feel or ""),
        answers.get("again") or "",
        str(answers.get("broken") or "").replace("\n", " ").strip(),
    ]


def surveys_to_csv(rows: list[dict]) -> str:
    out = io.StringIO()
    writer = csv.writer(out)
    writer.writerow(HEADERS)
    for row in rows:
        writer.writerow(survey_to_row(row))
    return out.getvalue()


def write_surveys(rows: list[dict]) -> Path | None:
    path = csv_path()
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        tmp = path.with_suffix(path.suffix + ".tmp")
        with _lock:
            with tmp.open("w", newline="", encoding="utf-8") as handle:
                writer = csv.writer(handle)
                writer.writerow(HEADERS)
                for row in rows:
                    writer.writerow(survey_to_row(row))
                handle.flush()
            tmp.replace(path)
        return path
    except OSError as exc:
        log.warning("feedback csv write failed: %s", exc)
        try:
            tmp = path.with_suffix(path.suffix + ".tmp")
            if tmp.exists():
                tmp.unlink()
        except OSError:
            pass
        return None


def load_surveys() -> list[dict]:
    path = csv_path()
    if not path.exists() or path.stat().st_size == 0:
        return []
    rows: list[dict] = []
    with path.open(newline="", encoding="utf-8") as handle:
        for rec in csv.DictReader(handle):
            easy = rec.get("easy") or ""
            if str(easy).isdigit():
                easy = int(easy)
            feel = [part.strip() for part in (rec.get("feel") or "").split(";") if part.strip()]
            rows.append(
                {
                    "version": rec.get("version") or "",
                    "submittedAt": rec.get("submittedAt") or "",
                    "from": rec.get("from") or "",
                    "device": rec.get("device") or "",
                    "lang": rec.get("lang") or "",
                    "answers": {
                        "role": rec.get("role") or "",
                        "easy": easy,
                        "useful": rec.get("useful") or "",
                        "fair": rec.get("fair") or "",
                        "push": rec.get("push") or "",
                        "feel": feel,
                        "again": rec.get("again") or "",
                        "broken": rec.get("broken") or None,
                    },
                    "email": rec.get("email") or None,
                    "day": rec.get("day") or "",
                }
            )
    return rows
