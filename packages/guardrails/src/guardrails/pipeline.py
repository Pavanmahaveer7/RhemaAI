"""Input and output guardrails. The llm-gateway is the only caller. Ids match docs/guardrails.md."""

import re

MAX_INPUT_CHARS = 8000

EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
PHONE = re.compile(r"\+?\d[\d\s().-]{7,}\d")
STREET = re.compile(r"\b\d{1,5}\s+[A-Za-z]+\s+(road|rd|street|st|lane|ln|avenue|ave|block)\b", re.I)
NAMED = re.compile(r"\b(?i:my name is|i am|i'm|called)\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?")
INJECTION = re.compile(
    r"\b(ignore|disregard|forget|override|bypass|skip)\b[\s\S]{0,40}\b(rules?|instructions?|guardrails?|prompts?|polic(y|ies)|filters?)\b"
    r"|system prompt|jailbreak|developer mode|pretend (you are|to be)|act as (an? )?(ai|model|assistant)"
    r"|reveal (your|the) (prompt|key|secret)|api key|</?untrusted_input"
    r"|(^|\n)\s*\[?(system|assistant|developer)\]?\s*:|\b(show|give|list|send) (me )?(all )?other (pastors?|people|users?)",
    re.I,
)

ADVICE = re.compile(
    r"\b(score[sd]?|scoring|rating|rated|risk|high[- ]risk|at[- ]risk|diagnos\w*|depress\w*|disorder|bipolar|anxiety disorder"
    r"|medication|prescri\w*|dosage|you should (give|tithe|donate|save|spend|invest|borrow)|tithe more|give more money|\d{1,3}\s?/\s?100|\d{1,3}\s?%)\b",
    re.I,
)
REFUSAL = re.compile(r"\b(i can(no|')t help|i(\s+am|'m) (unable|not able) to|as an ai|i cannot assist|i won't)\b", re.I)
RANKING = re.compile(r"\b(better|worse|weaker|stronger|failing|behind|lazy|unfit)\s+(pastor|than other|than most)\b", re.I)
FAITH_CLAIM = re.compile(r"\b(the same as|identical to|is really|truly is)\b", re.I)

REFUSAL_FALLBACK = "This reply is unavailable. A person can review it."

PRINCIPLES = (
    "character",
    "relationships",
    "happiness",
    "meaning",
    "health",
    "finances",
    "faith",
)
_PRINCIPLE_CUES = {
    "character": re.compile(r"\b(honest|integrity|record|faithful|patience|kept)\w*", re.I),
    "relationships": re.compile(r"\b(mentor|family|leader|church|people|visit)\w*", re.I),
    "happiness": re.compile(r"\b(mood|tired|joy|heavy|light|steady)\w*", re.I),
    "meaning": re.compile(r"\b(calling|purpose|ministry|serve|matters)\w*", re.I),
    "health": re.compile(r"\b(sick|health|rest|sleep|ill|hospital)\w*", re.I),
    "finances": re.compile(r"\b(money|giving|tithe|offering|salary|budget|finance)\w*", re.I),
    "faith": re.compile(r"\b(faith|prayer|pray|scripture|god|christ|karma|dharma|grace)\w*", re.I),
}


class GuardrailError(Exception):
    def __init__(self, guardrail_id: str, message: str) -> None:
        self.guardrail_id = guardrail_id
        self.message = message
        super().__init__(f"{guardrail_id}: {message}")


def mask_pii(text: str) -> tuple[str, int]:
    count = 0

    def repl(_match):
        nonlocal count
        count += 1
        return "[removed]"

    for pattern in (EMAIL, PHONE, STREET, NAMED):
        text = pattern.sub(repl, text)
    return text, count


def apply_input(text: str) -> str:
    """IN-SIZE, IN-PII, IN-INJ. Returns text safe to place inside an untrusted_input envelope."""
    if not isinstance(text, str):
        raise GuardrailError("IN-SIZE", "input must be text")
    if len(text) > MAX_INPUT_CHARS:
        raise GuardrailError("IN-SIZE", "input is too long")
    masked, _count = mask_pii(text)
    return INJECTION.sub("[removed instruction-like text]", masked)


def input_flags(text: str) -> list[str]:
    return ["IN-INJ"] if isinstance(text, str) and INJECTION.search(text) else []


def _strings(value) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        return [item for entry in value for item in _strings(entry)]
    if isinstance(value, dict):
        return [item for entry in value.values() for item in _strings(entry)]
    return []


def flourishing_marks(payload: dict) -> dict[str, str]:
    """OUT-FLOURISH. Relevant or not per principle. Never a number."""
    blob = " ".join(_strings(payload))
    return {name: ("relevant" if _PRINCIPLE_CUES[name].search(blob) else "not_relevant") for name in PRINCIPLES}


def apply_output(payload: dict, *, required: tuple[str, ...] = (), pastor_facing: bool = False) -> dict:
    """OUT-SCHEMA, OUT-PII, OUT-REFUSAL, OUT-ADVICE, OUT-FLOURISH. Raises; the caller uses fallback copy."""
    if not isinstance(payload, dict):
        raise GuardrailError("OUT-SCHEMA", "model output must be a JSON object")
    missing = [key for key in required if key not in payload]
    if missing:
        raise GuardrailError("OUT-SCHEMA", "missing fields: " + ", ".join(missing))
    cleaned = _mask_tree(payload)
    blob = " ".join(_strings(cleaned))
    if REFUSAL.search(blob):
        raise GuardrailError("OUT-REFUSAL", "bare refusal")
    if pastor_facing and ADVICE.search(blob):
        raise GuardrailError("OUT-ADVICE", "score, risk label, diagnosis or money instruction")
    if RANKING.search(blob):
        raise GuardrailError("OUT-FLOURISH", "ranks the pastor")
    if FAITH_CLAIM.search(blob) and not cleaned.get("sources"):
        raise GuardrailError("OUT-FLOURISH", "faith claim without a source")
    cleaned["flourishing"] = flourishing_marks(cleaned)
    return cleaned


def _mask_tree(value):
    if isinstance(value, str):
        return mask_pii(value)[0]
    if isinstance(value, list):
        return [_mask_tree(item) for item in value]
    if isinstance(value, dict):
        return {key: _mask_tree(item) for key, item in value.items()}
    return value
