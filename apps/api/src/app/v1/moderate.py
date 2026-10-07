"""Server copy of the moderation pipeline in contract/moderation.md.

The UI repeats the early checks for kind feedback. Storage uses only what this
module returns. A blocked input writes an audit row and nothing else.
"""

import re

INJECTION = re.compile(
    r"\b(ignore|disregard|forget|override|bypass|skip)\b[\s\S]{0,40}\b(rules?|instructions?|guardrails?|prompts?|polic(y|ies)|filters?)\b"
    r"|system prompt|jailbreak|developer mode|pretend (you are|to be)|act as (an? )?(ai|model|assistant)"
    r"|reveal (your|the) (prompt|key|secret)|api key"
    r"|(^|\n)\s*\[?(system|assistant|developer)\]?\s*:|\b(show|give|list|send) (me )?(all )?other (pastors?|people|users?)",
    re.I,
)
CRISIS = re.compile(
    r"kill(ing)? myself|end(ing)? (my life|it all)|take my (own )?life|suicid\w*|can.?t go on|want(ed)? to die"
    r"|no reason to live|(do not|don.?t) want to (live|be here)|hurt(ing)? myself|self[- ]?harm|better off dead|not be here anymore",
    re.I,
)
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
PHONE = re.compile(r"\+?\d[\d\s().-]{7,}\d")
STREET = re.compile(r"\b\d{1,5}\s+[A-Za-z]+\s+(road|rd|street|st|lane|ln|avenue|ave|block)\b", re.I)
NAME = re.compile(r"\bmy name is\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?")
HATE = re.compile(r"\b(hate|destroy|kill)\s+(all\s+)?(hindus?|buddhists?|christians?|muslims?)\b", re.I)
SEXUAL = re.compile(r"\b(porn|nude|sexual act)\b", re.I)
THREAT = re.compile(r"\b(i will (kill|hurt|attack)|bomb)\b", re.I)
SPAM = re.compile(r"https?://|www\.|\b(buy now|click here)\b", re.I)
VOWEL = re.compile(r"[aeiouy]", re.I)
KEYBOARD = re.compile(r"(asdf|qwer|zxcv){2,}", re.I)

# Reviewed groupings. The same idea in another language counts once.
# A live model is not called here: grouping waits for the graph-builder eval.
GROUPS = {
    "peace": ["peace", "shanti", "শান্তি", "शांति"],
    "family": ["family", "পরিবার", "परिवार"],
    "faith": ["faith"],
    "hope": ["hope"],
    "prayer": ["prayer"],
    "duty": ["duty", "dharma"],
    "grace": ["grace"],
    "forgiveness": ["forgiveness", "forgive"],
    "love": ["love"],
    "suffering": ["suffering", "pain"],
    "community": ["community"],
}


def redact(text: str) -> tuple[str, int]:
    count = 0

    def sub(pattern, value):
        nonlocal count

        def repl(_match):
            nonlocal count
            count += 1
            return "[removed]"

        return pattern.sub(repl, value)

    cleaned = sub(EMAIL, text)
    cleaned = sub(PHONE, cleaned)
    cleaned = sub(STREET, cleaned)
    cleaned = sub(NAME, cleaned)
    return cleaned, count


def unclear(text: str) -> bool:
    stripped = text.strip()
    if not stripped:
        return True
    letters = re.sub(r"[^A-Za-z\u0980-\u09FF\u0900-\u097F]", "", stripped)
    if not letters:
        return True
    if len(set(letters.lower())) == 1 and len(letters) >= 4:
        return True
    words = re.findall(r"\w+", stripped.lower(), re.UNICODE)
    if len(words) >= 3 and len(set(words)) == 1:
        return True
    if letters and not VOWEL.search(letters) and not re.search(r"[\u0980-\u09FF\u0900-\u097F]", letters):
        return True
    if KEYBOARD.search(stripped.lower()):
        return True
    return False


def group_ideas(text: str) -> list[str]:
    hay = text.lower()
    found = []
    for idea, words in GROUPS.items():
        if any(word.lower() in hay for word in words):
            found.append(idea)
    return found


def classify(text: str) -> str:
    # Crisis runs before injection so a hard note that also contains an instruction still reaches a person.
    if CRISIS.search(text):
        return "selfharm"
    if INJECTION.search(text):
        return "injection"
    if THREAT.search(text):
        return "threat"
    if HATE.search(text):
        return "hate"
    if SEXUAL.search(text):
        return "sexual"
    if SPAM.search(text):
        return "spam"
    if unclear(text):
        return "unclear"
    return "ok"
