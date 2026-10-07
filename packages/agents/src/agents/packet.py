"""Monday review packet draft (contract AgentPrep).

The draft lists what is present and what is missing. It never sets a stage or a
decision, never names a person, and never scores. Without a model, or when the
model or a guardrail fails, the prepared template is used and says so in `model`.
"""

from datetime import datetime, timezone

WHY = "This draft lists what is present and what is missing. It is not a decision."
SYSTEM = (
    "You prepare a short, neutral summary of a lay pastor's monthly pack for a human reviewer. "
    "State what is present and what is missing. Note when two independent feedback notes raise the same concern. "
    "Do not score, rate, rank, diagnose, label risk, give money advice, recommend a stage or a decision, or name anyone. "
    'Reply as JSON: {"summary": string under 400 characters, "flags": up to 4 short strings}.'
)
FIELDS = ("summary", "flags")


def _today() -> str:
    return datetime.now(timezone.utc).date().isoformat()


def stripped_view(pack: dict, missing: list[str]) -> str:
    """The only text the model sees: statuses, counts and the pastor's own report lines. No names."""
    report = pack.get("report") or {}
    lines = [
        f"Month: {pack.get('month', '')}",
        f"Report: {report.get('status', 'missing')}; activities: {report.get('activities', 0)}",
        f"Challenges (pastor's words): {report.get('challenges', '')}",
        f"Progress (pastor's words): {report.get('progress', '')}",
    ]
    for item in pack.get("feedback") or []:
        lines.append(f"Feedback from {item.get('from')}: {item.get('status')}")
    lines.append(f"Community rows: {len(pack.get('community') or [])}")
    lines.append(f"Evidence files: {len(pack.get('evidence') or [])}")
    if missing:
        lines.append("Missing: " + ", ".join(missing))
    return "\n".join(lines)


def template(pack: dict, missing: list[str]) -> dict:
    report = pack.get("report") or {}
    present = []
    if report.get("status") == "in":
        present.append("report")
    feedback_in = [item["from"] for item in pack.get("feedback") or [] if item.get("status") == "in"]
    if feedback_in:
        present.append("feedback from " + " and ".join(feedback_in).lower())
    if pack.get("community"):
        present.append("community rows")
    if pack.get("evidence"):
        present.append("evidence")
    summary = ("Present: " + ", ".join(present) + ".") if present else "Nothing has arrived yet."
    if missing:
        summary += " Not arrived: " + ", ".join(missing) + "."
    return {"summary": summary, "flags": [f"{item} has not arrived" for item in missing][:4]}


def prepare(pack: dict, missing: list[str], routed_to: str, complete=None) -> dict:
    """Return AgentPrep. `complete` is llm_gateway.complete; None means template only."""
    draft = None
    model = "template"
    if complete is not None:
        try:
            out = complete(
                agent="checkin-analyst",
                system=SYSTEM,
                user_text=stripped_view(pack, missing),
                required=FIELDS,
                pastor_facing=True,
                max_tokens=400,
            )
            summary = str(out.get("summary") or "").strip()[:400]
            flags = [str(item)[:120] for item in (out.get("flags") or [])][:4]
            if summary:
                draft = {"summary": summary, "flags": flags}
                model = str(out.get("model") or "unknown")
        except Exception:
            draft = None
    if draft is None:
        draft = template(pack, missing)
    return {
        "summary": draft["summary"],
        "flags": draft["flags"],
        "routedTo": routed_to,
        "generatedAt": _today(),
        "model": model,
        "why": WHY,
    }
