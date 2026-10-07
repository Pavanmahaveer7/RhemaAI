"""Store for the screen contract.

The process works on these collections in memory. With CONTRACT_STORE=memory
nothing is saved, so tests run without Docker. Otherwise, when DATABASE_URL
answers, startup loads the saved collections and every write saves the ones
that changed to Postgres as JSONB documents (ADR-006).
"""

import hashlib
import hmac
import json
import os
import re
import secrets
import threading
import uuid
from datetime import datetime, timezone

from app.v1.crypto import decrypt, encrypt, key_bytes

PAUSES_WHEN_ON = [
    "faith_mode",
    "monthly_answers",
    "map_publish",
    "checkins",
    "integrations",
    "voice",
    "save_image",
]

STATE_SCHEMA = """
CREATE TABLE IF NOT EXISTS store_state (
  name TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
"""

# Saved to Postgres after every write (ADR-006). Rate-limit windows stay in memory.
PERSISTED = (
    "accounts", "identities", "reveal_log", "devices", "sessions", "preferences", "memory", "onboarding",
    "terms", "expert_edits", "months", "answers", "concepts", "links", "maps", "churches", "pastors",
    "checkins", "mentor_notes", "packs", "review_packs", "decisions", "acks", "alert_log", "alerts",
    "integrations", "imported_rows", "helped", "term_reports", "beta_surveys", "community_feedback",
    "feedback_changelog", "waitlist", "events", "audit",
)


def _database_url() -> str | None:
    if os.getenv("CONTRACT_STORE", "auto") == "memory":
        return None
    return os.getenv("DATABASE_URL", "").strip() or None


# Other spellings people type for a headword (lexicon-standards: "finds the word without the marks").
SPELLINGS = {
    "nibbana": "nirvana", "nibbāna": "nirvana", "kamma": "karma", "dhamma": "dharma", "atma": "atman",
    "mokṣa": "moksha", "moksa": "moksha", "saṃsāra": "samsara", "samsāra": "samsara", "ahiṃsā": "ahimsa",
    "sangh": "sangha", "saṅgha": "sangha", "ethics": "ways of living",
}


def _fold(text: str) -> str:
    import unicodedata

    text = text.strip().lower()
    if text in SPELLINGS:
        return text
    return "".join(ch for ch in unicodedata.normalize("NFKD", text) if not unicodedata.combining(ch))


def _dumps(value) -> str:
    return json.dumps(value, sort_keys=True, default=str)


def _digest(value) -> str:
    return hashlib.sha256(_dumps(value).encode("utf-8")).hexdigest()


def _now() -> str:
    return datetime.now(timezone.utc).date().isoformat()


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


# Month-salted so a device's answers in two months cannot be linked, while a second
# answer in the same month still replaces the first (data-model.md).
def answer_device_hash(month_id: str, device: str) -> str:
    return _hash(f"{month_id}:{device}")


_SCRYPT_N = 2**14


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode("utf-8"), salt=salt, n=_SCRYPT_N, r=8, p=1, dklen=32)
    return f"scrypt${salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        kind, salt_hex, digest_hex = stored.split("$", 2)
        if kind != "scrypt":
            return False
        digest = hashlib.scrypt(
            password.encode("utf-8"), salt=bytes.fromhex(salt_hex), n=_SCRYPT_N, r=8, p=1, dklen=32
        )
        return hmac.compare_digest(digest.hex(), digest_hex)
    except (ValueError, TypeError):
        return False


def session_key(token: str) -> str:
    """Sessions are stored under a hash of the token, so a database copy cannot be replayed."""
    return _hash(token)


def read_session(store: "ContractStore", token: str | None) -> dict | None:
    if not token:
        return None
    return store.sessions.get(session_key(token))


def _source(tradition: str, work: str, reference: str, translation: str, license_name: str) -> dict:
    return {
        "tradition": tradition,
        "work": work,
        "reference": reference,
        "translation": translation,
        "license": license_name,
    }


def _faith(parallel: str, difference: str, bridge: str, sources: list) -> dict:
    return {
        "parallel": parallel,
        "difference": difference,
        "bridge": bridge,
        "gaps": [],
        "root": None,
        "timeline": None,
        "close": None,
        "sources": sources,
        "reviewedAt": "2026-09-01",
    }


class ContractStore:
    def __init__(self) -> None:
        self.accounts: dict[str, dict] = {}
        self.identities: dict[str, dict] = {}
        self.reveal_log: list[dict] = []
        self.devices: dict[str, dict] = {}
        self.sessions: dict[str, dict] = {}
        self.preferences: dict[str, dict] = {}
        self.memory: dict[str, dict] = {}
        self.onboarding: dict[str, dict] = {}
        self.terms: dict[str, dict] = {}
        self.expert_edits: list[dict] = []
        self.months: dict[str, dict] = {}
        self.answers: list[dict] = []
        self.concepts: dict[str, list] = {}
        self.links: dict[str, list] = {}
        self.maps: dict[str, dict] = {}
        self.churches: dict[str, dict] = {}
        self.pastors: dict[str, dict] = {}
        self.checkins: list[dict] = []
        self.mentor_notes: list[dict] = []
        self.packs: dict[str, dict] = {}
        self.review_packs: dict[str, dict] = {}
        self.decisions: list[dict] = []
        self.acks: list[dict] = []
        self.alert_log: list[dict] = []
        self.alerts: list[dict] = []
        self.integrations: list[dict] = []
        self.imported_rows: list[dict] = []
        self.helped: list[dict] = []
        self.term_reports: list[dict] = []
        self.beta_surveys: list[dict] = []
        self.community_feedback: list[dict] = []
        self.feedback_changelog: list[dict] = []
        self.waitlist: list[dict] = []
        self.events: list[dict] = []
        self.audit: list[dict] = []
        self.rate: dict[str, list] = {}
        self.phone_otps: dict[str, dict] = {}
        self.password_salt = "church-ai-dev-salt"
        self.password_hash = ""
        self.persistent = False
        self.save_error: str | None = None
        self._saved: dict[str, str] = {}
        self._lock = threading.Lock()
        self.seed()
        self._hydrate_surveys_from_csv()

    def seed(self) -> None:
        password = os.getenv("DEMO_SIGNIN_PASSWORD", "").strip()
        if not password and os.getenv("APP_ENV", "development") != "production":
            password = "dev-only-change-me"
        self.password_hash = _hash(self.password_salt + password) if password else ""
        self._people()
        self._lexicon()
        self._months()
        self._pastor_pipeline()
        self._demo_community()
        self._apply_beta_staff_passwords()

    def _demo_community(self) -> None:
        self.feedback_changelog = [
            {"at": "2026-09-15", "text": "Ideas map publish gate and regional alert pauses wired."},
            {"at": "2026-09-01", "text": "Beta feedback board on the local API."},
        ]
        self.community_feedback = [
            {
                "id": "fb-1",
                "kind": "idea",
                "text": "Show citation count per tradition on the word page.",
                "status": "open",
                "meToo": 3,
            },
            {
                "id": "fb-2",
                "kind": "missing_word",
                "text": "Add dukkha with verified sources.",
                "status": "open",
                "meToo": 1,
            },
        ]

    def _hydrate_surveys_from_csv(self) -> None:
        """Reload surveys from the live CSV after a restart when Postgres is off."""
        if self.beta_surveys:
            return
        try:
            from app.v1.feedback_csv import load_surveys

            loaded = load_surveys()
        except Exception:
            return
        if loaded:
            self.beta_surveys = loaded

    def _beta_shared_staff_login(self) -> bool:
        return os.getenv("BETA_SHARED_STAFF_LOGIN", "").strip().lower() in ("1", "true", "yes")

    _DEMO_STAFF_CODE = re.compile(r"^[PLRAE]-\d", re.I)

    def _apply_beta_staff_passwords(self) -> None:
        """Beta/demo: set scrypt hashes from DEMO_SIGNIN_PASSWORD (production + local dev)."""
        if os.getenv("APP_ENV") == "production" and not self._beta_shared_staff_login():
            return
        password = os.getenv("DEMO_SIGNIN_PASSWORD", "").strip()
        if not password and os.getenv("APP_ENV", "development") != "production":
            password = "dev-only-change-me"
        if not password:
            return
        refresh_demo = self._beta_shared_staff_login()
        for account in self.accounts.values():
            code = str(account.get("code_name") or "")
            stored = str(account.get("password_hash") or "")
            if refresh_demo and self._DEMO_STAFF_CODE.match(code):
                account["password_hash"] = hash_password(password)
            elif not stored.startswith("scrypt$"):
                account["password_hash"] = hash_password(password)

    def _add_account(
        self,
        account_id: str,
        role: str,
        code_name: str,
        real_name: str | None,
        *,
        also_roles: list[str] | None = None,
    ) -> None:
        self.accounts[account_id] = {
            "id": account_id,
            "role": role,
            "code_name": code_name,
            "email_hash": None,
            "status": "active",
            "created_at": "2026-01-15",
        }
        if also_roles:
            self.accounts[account_id]["also_roles"] = list(also_roles)
        if real_name and key_bytes() is not None:
            self.identities[account_id] = {"real_name": encrypt(real_name), "email": None}
        self.preferences[account_id] = {
            "theme": "system",
            "lang": "en",
            "reduceMotion": False,
            "remindMonthly": False,
        }

    def _people(self) -> None:
        self._add_account("admin-1", "admin", "A-0100", "Ada Admin")
        self._add_account("pastor-0233", "pastor", "P-0233", "Daniel Sarkar", also_roles=["leader"])
        self._add_account("reviewer-1", "reviewer", "R-0100", "Rita Reviewer")
        self._add_account("leader-1", "leader", "L-0100", "Leela Leader")
        self._add_account("leader-2", "leader", "L-0101", "Luis Leader")
        self._add_account("leader-3", "leader", "L-0102", "Lina Leader")
        self._add_account("expert-1", "expert", "E-0100", "Evan Expert")
        self._add_account("pastor-us", "pastor", "P-0901", "Ursula Pastor")
        self.churches["church-bd"] = {
            "id": "church-bd",
            "name": "Living Water Fellowship",
            "country": "Bangladesh",
            "region": "Dhaka Division",
            "join_code": "MIRPUR",
        }
        self.churches["church-us"] = {
            "id": "church-us",
            "name": "Demo Church",
            "country": "US",
            "region": "Texas",
            "join_code": "DEMO-US",
        }
        self.pastors["pastor-0233"] = {
            "account_id": "pastor-0233",
            "church_id": "church-bd",
            "stage": 1,
            "mentor_id": "mentor-samuel",
            "since": "2026-01-15",
            "first": "Daniel",
            "mentor_name": "Pastor Samuel Roy",
        }
        self.pastors["pastor-us"] = {
            "account_id": "pastor-us",
            "church_id": "church-us",
            "stage": 1,
            "mentor_id": "mentor-samuel",
            "since": "2026-03-01",
            "first": "Ursula",
            "mentor_name": "Pastor Samuel Roy",
        }

    def _term(
        self, term: str, pos: str, definition: str, used: list, sources: list, faith: dict | None, reviewed: bool = True
    ) -> None:
        public_sources = [
            {"tradition": item["tradition"], "work": item["work"], "reference": item["reference"]}
            for item in sources
        ]
        self.terms[term] = {
            "term": term,
            "pos": pos,
            "def": definition,
            "used": used,
            "lang": "en",
            "sources": public_sources,
            "source_records": sources,
            "faith": faith,
            "reviewed": faith is not None and reviewed,
            "checked_by": [],
        }

    def _lexicon(self) -> None:
        web = "World English Bible"
        arnold = "Sir Edwin Arnold, The Song Celestial (1885)"
        sujato = "Bhikkhu Sujato, SuttaCentral"
        self._term(
            "karma",
            "noun",
            "Action, and the moral weight that action carries forward.",
            ["Hindu", "Buddhist", "Christian"],
            [
                _source("Hindu", "Bhagavad Gita", "3.9", arnold, "public domain"),
                _source("Buddhist", "Dhammapada", "1–2", sujato, "CC0"),
                _source("Christian", "Galatians", "6:7", web, "public domain"),
            ],
            _faith(
                "Both Hindu and Buddhist teaching treat action as morally weighted: what you do shapes what follows. Christians also say a person reaps what they sow. That resemblance is an analogy, not one doctrine.",
                "They do not share the same account of what liberates a person. Hindu traditions speak of moksha, Buddhist teaching of nirvana, and Christian teaching of grace received through Christ. None of these is ranked here.",
                "A Christian can read karma as a word for consequence and moral seriousness, while holding that grace is a gift rather than a balance of deeds. The terms can sit side by side without being treated as the same idea.",
                [_source("Hindu", "Bhagavad Gita", "4.17", arnold, "public domain")],
            ),
        )
        self._term(
            "dharma",
            "noun",
            "Duty, order, or teaching, depending on the tradition using the word.",
            ["Hindu", "Buddhist"],
            [
                _source("Hindu", "Bhagavad Gita", "18.47", arnold, "public domain"),
                _source("Buddhist", "Dhammapada", "273", sujato, "CC0"),
            ],
            _faith(
                "Each use points to a right order for living. Christians speak of a calling and of God’s law. The resemblance is an analogy.",
                "In Hindu use dharma is often one’s duty; in Buddhist use it is the Buddha’s teaching. Christian calling rests on a relationship with God, not a cosmic order.",
                "A Christian can hear dharma as a serious word about how to live, without equating it with the law of Moses or the gospel.",
                [_source("Christian", "Micah", "6:8", web, "public domain")],
            ),
        )
        self._term(
            "grace",
            "noun",
            "Favor that is given, not earned.",
            ["Christian", "Hindu"],
            [_source("Christian", "Ephesians", "2:8", web, "public domain")],
            _faith(
                "Some Hindu devotional traditions speak of the grace (prasada) of God. Christians speak of grace in Christ. The resemblance is an analogy.",
                "The accounts of who gives grace, and why, are not the same. No tradition is ranked above another here.",
                "For a Christian, grace is central. It can be explained to a neighbour by pointing to their own word for an unearned gift, while saying clearly that the two are not identical.",
                [_source("Christian", "Titus", "2:11", web, "public domain")],
            ),
        )
        for term, pos, definition, used, sources in [
            ("moksha", "noun", "Release from saṃsāra, the cycle of rebirth, as the Upaniṣads teach it.", ["Hindu"], [_source("Hindu", "Mundaka Upanishad", "3.2.8", "public-domain edition", "public domain")]),
            ("nirvana", "noun", "In Theravāda teaching, the ending of craving, suffering and rebirth.", ["Buddhist"], [_source("Buddhist", "Dhammapada", "203", sujato, "CC0")]),
            ("faith", "noun", "Trust placed in someone or something beyond proof.", ["Christian", "Hindu", "Buddhist"], [_source("Christian", "Hebrews", "11:1", web, "public domain")]),
            ("meditation", "noun", "A practice of sustained attention.", ["Hindu", "Buddhist", "Christian"], [_source("Christian", "Psalms", "1:2", web, "public domain")]),
            ("suffering", "noun", "Pain, loss, or dissatisfaction a person undergoes.", ["Buddhist", "Christian", "Hindu"], [_source("Buddhist", "Dhammacakkappavattana Sutta", "SN 56.11, section 4", sujato, "CC0")]),
            ("compassion", "noun", "Feeling with another’s suffering and wanting to relieve it.", ["Buddhist", "Christian", "Hindu"], [_source("Buddhist", "The Discourse on Love", "Snp 1.8, section 3", sujato, "CC0"), _source("Christian", "Colossians", "3:12", web, "public domain")]),
            ("love", "noun", "Care that wills the good of another.", ["Christian", "Hindu", "Buddhist"], [_source("Christian", "1 Corinthians", "13:4", web, "public domain")]),
            ("salvation", "noun", "Being rescued or made whole.", ["Christian"], [_source("Christian", "Romans", "10:9", web, "public domain")]),
            # Starter definitions for the build-plan words. Plain and neutral per lexicon-standards;
            # an expert still has to check each one (the word page says "Not reviewed by an expert yet").
            ("samsara", "noun", "The cycle of birth, death and rebirth that Hindu and Buddhist teaching describe.", ["Hindu", "Buddhist"], [_source("Buddhist", "Tears", "SN 15.3, section 1", sujato, "CC0")]),
            ("atman", "noun", "In Hindu teaching, the true self of a person, beyond body and mind. Buddhist teaching denies a lasting self of this kind.", ["Hindu", "Buddhist"], [_source("Hindu", "Bhagavad Gita", "2.20", arnold, "public domain"), _source("Buddhist", "The Characteristic of Not-Self", "SN 22.59, section 2", sujato, "CC0")]),
            ("ahimsa", "noun", "Not harming living beings, in deed, word or thought.", ["Hindu", "Buddhist"], [_source("Hindu", "Bhagavad Gita", "16.2", arnold, "public domain"), _source("Buddhist", "Dhammapada", "129–130", sujato, "CC0")]),
            ("mantra", "noun", "A sacred word or phrase repeated in prayer or meditation.", ["Hindu", "Buddhist"], []),
            ("guru", "noun", "A spiritual teacher who guides a student.", ["Hindu", "Buddhist"], [_source("Hindu", "Bhagavad Gita", "4.34", arnold, "public domain")]),
            ("sangha", "noun", "The Buddhist community, especially the community of monks and nuns.", ["Buddhist"], [_source("Buddhist", "Dhammapada", "194", sujato, "CC0")]),
            ("rebirth", "noun", "Being born again into a new life after death, as Hindu and Buddhist teaching describe it.", ["Hindu", "Buddhist"], [_source("Buddhist", "Analysis", "SN 12.2, section 4", sujato, "CC0")]),
            ("prayer", "noun", "Speaking to God or to the divine, in words or in silence.", ["Christian", "Hindu"], [_source("Christian", "Matthew", "6:9", web, "public domain")]),
            ("sin", "noun", "A wrong done against God or against what is right.", ["Christian"], [_source("Christian", "Romans", "3:23", web, "public domain")]),
            ("forgiveness", "noun", "Letting go of a debt or a wrong done to you.", ["Christian", "Buddhist", "Hindu"], [_source("Buddhist", "Dhammapada", "5", sujato, "CC0"), _source("Christian", "Matthew", "6:14", web, "public domain")]),
            ("judgment", "noun", "A decision about right and wrong. In Christian teaching, also the final account each person gives to God.", ["Christian"], [_source("Christian", "2 Corinthians", "5:10", web, "public domain")]),
            ("soul", "noun", "The inner, living self of a person. Traditions disagree about what it is and whether it lasts.", ["Christian", "Hindu", "Buddhist"], [_source("Christian", "Matthew", "10:28", web, "public domain"), _source("Buddhist", "The Characteristic of Not-Self", "SN 22.59, section 2", sujato, "CC0")]),
            ("heaven", "noun", "The dwelling of God or of gods. In Christian hope it is life with God; in Hindu and Buddhist teaching a heavenly world is not the final goal.", ["Christian", "Hindu", "Buddhist"], [_source("Christian", "Revelation", "21:3", web, "public domain")]),
            ("enlightenment", "noun", "Awakening to the truth. In Buddhist teaching it ends suffering and rebirth.", ["Buddhist", "Hindu"], [_source("Buddhist", "Rolling Forth the Wheel of Dhamma", "SN 56.11, section 2", sujato, "CC0")]),
            ("sacrifice", "noun", "Giving up something of value as an offering, or for another’s good.", ["Hindu", "Christian"], [_source("Hindu", "Bhagavad Gita", "3.9", arnold, "public domain"), _source("Christian", "Romans", "12:1", web, "public domain")]),
            ("ritual", "noun", "A set form of words and actions repeated in worship or at life’s turning points.", ["Hindu", "Buddhist", "Christian"], [_source("Christian", "Luke", "22:19", web, "public domain")]),
            ("community", "noun", "People bound together by shared faith, place or life.", ["Christian", "Buddhist", "Hindu"], [_source("Christian", "Acts", "2:44", web, "public domain")]),
            ("service", "noun", "Work done for the good of others or for God.", ["Christian", "Hindu"], [_source("Christian", "Mark", "10:45", web, "public domain")]),
            ("wisdom", "noun", "Seeing things as they really are, and living by it.", ["Hindu", "Buddhist", "Christian"], [_source("Buddhist", "Dhammapada", "372", sujato, "CC0"), _source("Christian", "Proverbs", "9:10", web, "public domain")]),
        ]:
            self._term(term, pos, definition, used, sources, None)
        # Drafted from the Part B seed in /references, cut to what the loaded sources can show.
        # Hidden from Faith mode until a reviewer marks the word checked.
        self._term(
            "marriage",
            "noun",
            "A lasting, publicly recognised union of two people.",
            ["Christian", "Hindu", "Buddhist"],
            [
                _source("Buddhist", "Equality (1st)", "AN 4.55, section 3", sujato, "CC0"),
                _source("Christian", "Genesis", "2:24", web, "public domain"),
            ],
            {
                **_faith(
                    "All three treat marriage as more than a private contract: a bond with moral weight, where faithfulness matters and duties run both ways. The Buddha’s advice that a couple be equal in faith, ethics, generosity and wisdom resembles Paul’s counsel about who to be yoked with. The resemblance is an analogy, not one teaching.",
                    "Hindu tradition treats marriage (vivāha) as a rite of the householder stage of life. Buddhist teaching honours it as a good path for lay people, while the monastic path is set apart. Christian teaching calls it a covenant that pictures Christ’s love for the church. None is ranked here.",
                    "A Christian can speak of marriage as a covenant and still recognise that a Hindu or Buddhist neighbour also treats faithfulness as sacred, without saying the three mean the same thing.",
                    [
                        _source("Buddhist", "Advice to Sigālaka", "DN 31, section 30", sujato, "CC0"),
                        _source("Christian", "Matthew", "19:6", web, "public domain"),
                        _source("Christian", "Ephesians", "5:21", web, "public domain"),
                        _source("Christian", "Ephesians", "5:25", web, "public domain"),
                        _source("Christian", "2 Corinthians", "6:14", web, "public domain"),
                    ],
                ),
                "reviewedAt": None,
            },
            reviewed=False,
        )
        self._term(
            "ways of living",
            "noun",
            "How a person should live: what to do, what to avoid, and why.",
            ["Hindu", "Buddhist", "Christian"],
            [
                _source("Hindu", "Bhagavad Gita", "16.1–3", arnold, "public domain"),
                _source("Buddhist", "Advice to Sigālaka", "DN 31, section 4", sujato, "CC0"),
                _source("Christian", "Micah", "6:8", web, "public domain"),
            ],
            {
                **_faith(
                    "All three warn against killing, stealing, lying and sexual wrongdoing, and all three say the motive behind an act matters, not only the act. Buddhist and Christian teaching both ask a person to treat others as they would themselves. The resemblance is an analogy, not one moral system.",
                    "Where moral authority comes from is not the same: dharma, the right order of things, in Hindu teaching; the path the Buddha taught, in Buddhist teaching; the character and commands of God, in Christian teaching. None is ranked here.",
                    "A Christian can explain that love of God and neighbour sums up the law, while respecting that a Hindu or Buddhist neighbour already takes non-harm and truthfulness seriously.",
                    [
                        _source("Buddhist", "Dhammapada", "129–130", sujato, "CC0"),
                        _source("Buddhist", "Rolling Forth the Wheel of Dhamma", "SN 56.11, section 3", sujato, "CC0"),
                        _source("Buddhist", "Trades", "AN 5.177, section 1", sujato, "CC0"),
                        _source("Christian", "Matthew", "22:37–40", web, "public domain"),
                        _source("Christian", "Matthew", "7:12", web, "public domain"),
                        _source("Christian", "Galatians", "5:22–23", web, "public domain"),
                    ],
                ),
                "reviewedAt": None,
            },
            reviewed=False,
        )
        self._term(
            "death",
            "noun",
            "The end of a life, and what a tradition says follows it.",
            ["Hindu", "Buddhist", "Christian"],
            [
                _source("Hindu", "Bhagavad Gita", "2.20", arnold, "public domain"),
                _source("Buddhist", "Dhammapada", "277", sujato, "CC0"),
                _source("Christian", "John", "11:25", web, "public domain"),
            ],
            _faith(
                "Hindu, Buddhist and Christian teaching all treat death as something a person must face honestly. The resemblance is an analogy, not one doctrine.",
                "They do not share one account of what continues after death. No tradition is ranked here.",
                "A Christian can speak of death and resurrection without treating another tradition’s word for release as the same claim.",
                [_source("Christian", "1 Corinthians", "15:26", web, "public domain")],
            ),
        )
        self._term(
            "life",
            "noun",
            "The span of living, and what a tradition says it is for.",
            ["Hindu", "Buddhist", "Christian"],
            [
                _source("Hindu", "Bhagavad Gita", "2.13", arnold, "public domain"),
                _source("Buddhist", "Dhammapada", "113", sujato, "CC0"),
                _source("Christian", "John", "10:10", web, "public domain"),
            ],
            _faith(
                "Each tradition treats a life as more than a stretch of days. The resemblance is an analogy.",
                "What a life is for is not the same claim in each tradition. None is ranked here.",
                "A Christian can describe life as a gift without renaming another tradition’s word for it.",
                [_source("Christian", "John", "10:10", web, "public domain")],
            ),
        )

    def _map(self, month_id: str, nodes: list, links: list, published: bool) -> None:
        concepts = []
        for node in nodes:
            concepts.append({"id": node[0], "count": node[1], "isNew": len(node) > 2 and bool(node[2])})
        kind = {"s": "shared", "t": "apart"}
        self.concepts[month_id] = concepts
        self.links[month_id] = [
            {"a": link[0], "b": link[1], "weight": link[2], "kind": kind.get(link[3], "shared")}
            for link in links
        ]
        self.maps[month_id] = {
            "status": "published" if published else "draft",
            "published_at": "2026-09-01" if published else None,
            "published_by": "admin-1" if published else None,
            "noise_applied": published,
        }

    def _months(self) -> None:
        self.months["2026-08"] = {
            "id": "2026-08",
            "label": "Aug 2026",
            "question": "What does love mean to you?",
            "term": "love",
            "open": False,
            "closesAt": "2026-08-31",
            "answers": 184,
        }
        self.months["2026-09"] = {
            "id": "2026-09",
            "label": "Sep 2026",
            "question": "What does salvation mean to you?",
            "term": "salvation",
            "open": False,
            "closesAt": "2026-09-30",
            "answers": 212,
        }
        self.months["2026-10"] = {
            "id": "2026-10",
            "label": "Oct 2026",
            "question": "What does faith mean to you?",
            "term": "faith",
            "open": True,
            "closesAt": "2026-10-31",
            "answers": 97,
        }
        self._map(
            "2026-08",
            [["family", 42], ["duty", 31], ["work", 24], ["prayer", 20], ["community", 18], ["health", 12], ["children", 15], ["honesty", 10], ["marriage", 11]],
            [["marriage", "family", 9, "s"], ["family", "duty", 14, "s"]],
            True,
        )
        self._map(
            "2026-09",
            [["family", 46], ["duty", 28], ["suffering", 26, 1], ["hope", 30, 1], ["faith", 17, 1], ["exile", 2, 1]],
            [["faith", "hope", 10, "s"], ["family", "duty", 13, "s"]],
            True,
        )
        self._map("2026-10", [["exile", 2], ["hope", 4]], [], False)

    def _pastor_pipeline(self) -> None:
        self.mentor_notes.append(
            {
                "pastor_id": "pastor-0233",
                "from": "mentor",
                "lines": ["I read your notes this week. You kept visiting even when you were tired, and that matters."],
                "at": "2026-09-28",
            }
        )
        pack = {
            "month": "Sep 2026",
            "report": {"status": "in", "activities": 14, "challenges": "Travel to the outer villages during the rains.", "progress": "Finished Foundations of Scripture."},
            "feedback": [
                {"from": "People", "status": "in"},
                {"from": "Mentor", "status": "in"},
                {"from": "Church leaders", "status": "missing"},
            ],
            "community": [
                {"area": "Local outreach", "text": "Rice distribution with two partner churches", "source": "Planning Center"},
                {"area": "Community service", "text": "Clean-water day, Ward 7", "source": None},
            ],
            "evidence": [{"kind": "form", "title": "Monthly report — Sep 2026", "file": "report-0926.pdf"}],
        }
        self.packs["pastor-0233:2026-09"] = pack
        self.review_packs["P-0419"] = {
            "id": "P-0419",
            "pastor_id": "pastor-0419",
            "region": "Nepal — Koshi Province",
            "stage": 3,
            "since": "2026-08-14",
            "status": "additional",
            "escalated": True,
            "complete": 5,
            "missing": [],
            "crisis": {"at": "2026-09-24", "note": "A check-in was marked for a person. The mentor was notified the same day."},
            "history": ["Active ministry since Jul 2025", "Jun 2026 — Continue"],
            "agent": {
                "summary": "Report and feedback are in. Two independent feedback notes describe the same concern about record keeping.",
                "flags": ["Two people raised the same concern about records"],
                "routedTo": "Regional authority",
                "generatedAt": "2026-09-28",
                "model": "template",
                "why": "This draft lists what is present and what is missing. It is not a decision.",
            },
            "pack": pack,
        }
        self.review_packs["P-0233"] = {
            "id": "P-0233",
            "pastor_id": "pastor-0233",
            "region": "Bangladesh — Dhaka Division",
            "stage": 1,
            "since": "2026-09-02",
            "status": "waiting",
            "escalated": False,
            "complete": 4,
            "missing": ["Church leaders feedback"],
            "history": ["Training since Jan 2026"],
            "agent": {
                "summary": "Finished one course with a certificate. Church leaders feedback has not arrived.",
                "flags": [],
                "routedTo": "Mentor, then church leaders",
                "generatedAt": "2026-09-28",
                "model": "template",
                "why": "This draft lists what is present and what is missing. It is not a decision.",
            },
            "pack": pack,
        }

    def public_term(self, term: str, faith_paused: bool) -> dict | None:
        row = self.terms.get(term.lower())
        if row is None:
            return None
        from app.v1.sources import attach_quotes

        sources = attach_quotes(row["sources"])
        faith = None
        if row["faith"] and row["reviewed"] and not faith_paused:
            faith_sources = attach_quotes(
                [
                    {"tradition": item["tradition"], "work": item["work"], "reference": item["reference"]}
                    for item in row["faith"]["sources"]
                ]
            )
            verses = []
            for item in [*sources, *faith_sources]:
                ref = f"{item['work']} {item['reference']}"
                if item.get("quote") and ref not in {v["ref"] for v in verses}:
                    verses.append({"ref": ref, "text": item["quote"], "translation": item["translation"], "url": item["url"]})
            faith = {
                "parallel": row["faith"]["parallel"],
                "difference": row["faith"]["difference"],
                "bridge": row["faith"]["bridge"],
                "gaps": row["faith"]["gaps"],
                "root": row["faith"]["root"],
                "timeline": row["faith"]["timeline"],
                "close": row["faith"]["close"],
                "sources": faith_sources,
                "verses": verses,
                "reviewedAt": row["faith"]["reviewedAt"],
            }
        return {
            "term": row["term"],
            "pos": row["pos"],
            "def": row["def"],
            "used": row["used"],
            "sources": sources,
            "lang": row["lang"],
            "faith": faith,
        }

    def search(self, query: str) -> list[dict]:
        needle = _fold(query)
        needle = SPELLINGS.get(needle, needle)
        rows = []
        for row in self.terms.values():
            if needle and needle not in _fold(row["term"]):
                continue
            rows.append({"term": row["term"], "pos": row["pos"], "def": row["def"], "used": row["used"]})
        return rows

    def feature_paused(self, feature: str) -> bool:
        return any(alert["status"] == "on" and feature in alert["pauses"] for alert in self.alerts)

    def published_months(self) -> list[str]:
        return sorted(month_id for month_id, meta in self.maps.items() if meta["status"] == "published")

    def public_map(self, month_id: str) -> dict | None:
        meta = self.maps.get(month_id)
        month = self.months.get(month_id)
        if not meta or meta["status"] != "published" or not month:
            return None
        visible = []
        hidden = 0
        for concept in self.concepts.get(month_id, []):
            if concept["count"] < 3:
                hidden += 1
                continue
            visible.append({"id": concept["id"], "count": concept["count"], "isNew": concept["isNew"]})
        ids = {item["id"] for item in visible}
        links = [link for link in self.links.get(month_id, []) if link["a"] in ids and link["b"] in ids]
        return {
            "id": month_id,
            "label": month["label"],
            "question": month["question"],
            "term": month["term"],
            "answers": month["answers"],
            "concepts": visible,
            "links": links,
            "hiddenRare": hidden,
            "publishedAt": meta["published_at"],
        }

    def audit_block(self, kind: str, category: str, action: str, role: str) -> None:
        self.audit.append(
            {"id": str(uuid.uuid4()), "kind": kind, "category": category, "action": action, "at": _now(), "role": role}
        )

    def allow(self, bucket: str, limit: int) -> bool:
        import time

        now = time.time()
        stamps = [stamp for stamp in self.rate.get(bucket, []) if now - stamp < 3600]
        if len(stamps) >= limit:
            self.rate[bucket] = stamps
            return False
        stamps.append(now)
        self.rate[bucket] = stamps
        return True

    def sync_postgres(self) -> str | None:
        """Load saved state, or save the seed when the database is empty. Returns an error name or None."""
        url = _database_url()
        if url is None:
            return None
        try:
            import psycopg

            with psycopg.connect(url, connect_timeout=2) as conn:
                conn.execute(STATE_SCHEMA)
                rows = conn.execute("SELECT name, data FROM store_state").fetchall()
                if rows:
                    self._load_state({name: data for name, data in rows})
                conn.commit()
            self.persistent = True
            self.save_postgres()
        except Exception as exc:
            self.persistent = False
            self.save_error = exc.__class__.__name__
            return self.save_error
        return None

    def _load_state(self, saved: dict) -> None:
        for name in PERSISTED:
            if name not in saved:
                continue
            value = saved[name]
            if name == "terms":
                # New seed words appear; saved words keep their edits.
                value = {**self.terms, **value}
            setattr(self, name, value)
            self._saved[name] = _digest(value)
        self._apply_beta_staff_passwords()

    def save_postgres(self) -> None:
        """Write every collection that changed since the last save. Raises if the database refuses."""
        if not self.persistent:
            return
        import psycopg
        from psycopg.types.json import Jsonb

        with self._lock:
            changed = {}
            for name in PERSISTED:
                value = getattr(self, name)
                digest = _digest(value)
                if self._saved.get(name) != digest:
                    changed[name] = (value, digest)
            if not changed:
                return
            with psycopg.connect(_database_url(), connect_timeout=2) as conn:
                for name, (value, _) in changed.items():
                    conn.execute(
                        """
                        INSERT INTO store_state (name, data, updated_at) VALUES (%s, %s, now())
                        ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
                        """,
                        (name, Jsonb(value, dumps=_dumps)),
                    )
                conn.commit()
            for name, (_, digest) in changed.items():
                self._saved[name] = digest
            self.save_error = None


_store: ContractStore | None = None


def get_store() -> ContractStore:
    global _store
    if _store is None:
        _store = ContractStore()
    return _store


def reset_store() -> ContractStore:
    global _store
    _store = ContractStore()
    return _store


def open_session(store: ContractStore, role: str, account_id: str | None, device_id: str | None) -> str:
    token = secrets.token_urlsafe(32)
    store.sessions[session_key(token)] = {"role": role, "account_id": account_id, "device_id": device_id}
    return token


def reveal_name(store: ContractStore, account_id: str) -> str | None:
    row = store.identities.get(account_id)
    if not row:
        return None
    return decrypt(row["real_name"])
