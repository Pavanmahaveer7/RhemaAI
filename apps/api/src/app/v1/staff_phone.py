"""Staff registration by phone + OTP (beta demo surfaces code instead of SMS)."""

import hashlib
import os
import random
import re
import secrets
import uuid
from datetime import datetime, timedelta, timezone

from app.v1.crypto import encrypt, key_bytes
from app.v1.store import hash_password

_PHONE_DIGITS = re.compile(r"\D+")


def normalize_phone(raw: str) -> str | None:
    digits = _PHONE_DIGITS.sub("", str(raw or "").strip())
    if len(digits) < 10 or len(digits) > 15:
        return None
    return digits


def mask_phone(digits: str) -> str:
    if len(digits) <= 4:
        return "***"
    return f"***-***-{digits[-4:]}"


def otp_demo_visible() -> bool:
    flag = os.getenv("STAFF_PHONE_OTP_DEMO", "").strip().lower()
    if flag in ("1", "true", "yes"):
        return True
    if flag in ("0", "false", "no"):
        return False
    return os.getenv("APP_ENV", "development") != "production"


def staff_phone_register_enabled() -> bool:
    return os.getenv("STAFF_PHONE_REGISTER", "true").strip().lower() not in ("0", "false", "no")


def _otp_key(digits: str) -> str:
    return hashlib.sha256(f"staff-phone:{digits}".encode("utf-8")).hexdigest()


def _hash_code(code: str) -> str:
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def issue_otp(store, digits: str) -> tuple[str, dict]:
    if not hasattr(store, "phone_otps"):
        store.phone_otps = {}
    code = f"{random.randint(0, 999999):06d}"
    exp = datetime.now(timezone.utc) + timedelta(minutes=10)
    store.phone_otps[_otp_key(digits)] = {
        "code_hash": _hash_code(code),
        "expires_at": exp.isoformat(),
        "attempts": 0,
        "purpose": "staff_register",
    }
    payload = {
        "maskedPhone": mask_phone(digits),
        "expiresInSeconds": 600,
        "delivery": "demo_screen" if otp_demo_visible() else "sms_pending",
    }
    if otp_demo_visible():
        payload["demoCode"] = code
        payload["message"] = "Beta demo: we show the code here instead of sending SMS."
    else:
        payload["message"] = "If this number is on file, a code was sent by SMS."
    store.audit.append(
        {
            "at": datetime.now(timezone.utc).isoformat(),
            "action": "staff_phone_otp",
            "detail": mask_phone(digits),
            "channel": payload["delivery"],
        }
    )
    return code, payload


def verify_otp(store, digits: str, code: str) -> str | None:
    if not hasattr(store, "phone_otps"):
        return "No code was sent for this number."
    row = store.phone_otps.get(_otp_key(digits))
    if not row:
        return "No code was sent for this number."
    row["attempts"] = int(row.get("attempts") or 0) + 1
    if row["attempts"] > 5:
        store.phone_otps.pop(_otp_key(digits), None)
        return "Too many tries. Request a new code."
    try:
        exp = datetime.fromisoformat(row["expires_at"])
        if exp.tzinfo is None:
            exp = exp.replace(tzinfo=timezone.utc)
    except ValueError:
        store.phone_otps.pop(_otp_key(digits), None)
        return "Code expired. Request a new one."
    if datetime.now(timezone.utc) > exp:
        store.phone_otps.pop(_otp_key(digits), None)
        return "Code expired. Request a new one."
    if not secrets.compare_digest(row.get("code_hash") or "", _hash_code(str(code or "").strip())):
        return "That code did not match."
    store.phone_otps.pop(_otp_key(digits), None)
    return None


def _next_pastor_code(store) -> str:
    for _ in range(40):
        code = "P-" + f"{random.randint(0, 9999):04d}"
        if not any(a.get("code_name") == code for a in store.accounts.values()):
            return code
    return "P-" + secrets.token_hex(2).upper()[:4]


def register_staff_after_phone(store, digits: str, password: str, display_name: str | None) -> dict:
    phone_hash = hashlib.sha256(digits.encode("utf-8")).hexdigest()
    if any(
        a.get("phone_hash") == phone_hash
        for a in store.accounts.values()
        if a.get("phone_hash")
    ):
        raise ValueError("duplicate_phone")
    account_id = str(uuid.uuid4())
    code_name = _next_pastor_code(store)
    store.accounts[account_id] = {
        "id": account_id,
        "role": "pastor",
        "code_name": code_name,
        "email_hash": None,
        "phone_hash": phone_hash,
        "password_hash": hash_password(password),
        "status": "active",
        "created_at": datetime.now(timezone.utc).date().isoformat(),
    }
    if key_bytes() is not None:
        store.identities[account_id] = {
            "real_name": encrypt(display_name or code_name),
            "email": None,
            "phone": encrypt("+" + digits),
        }
    store.preferences[account_id] = {
        "theme": "system",
        "lang": "en",
        "reduceMotion": False,
        "remindMonthly": False,
    }
    pastor_key = "pastor-" + account_id[:8]
    store.pastors[pastor_key] = {
        "account_id": account_id,
        "church_id": "church-us",
        "stage": 1,
        "mentor_id": "mentor-demo",
        "since": datetime.now(timezone.utc).date().isoformat(),
        "first": (display_name or "Staff").split()[0],
        "mentor_name": "Demo mentor",
    }
    store.audit.append(
        {
            "at": datetime.now(timezone.utc).isoformat(),
            "action": "staff_phone_register",
            "account_id": account_id,
            "code_name": code_name,
        }
    )
    return store.accounts[account_id]
