"""Keyed hash stream for check-in text and real names.

No new dependency: the key comes from CHECKIN_ENCRYPTION_KEY. Production refuses
to store check-in text when that variable is missing. The ciphertext is what
lands in the database. Plain text is not logged.
"""

import base64
import hashlib
import hmac
import os


def key_bytes() -> bytes | None:
    raw = os.getenv("CHECKIN_ENCRYPTION_KEY", "").strip()
    if not raw:
        return None
    return hashlib.sha256(raw.encode("utf-8")).digest()


def _stream(key: bytes, nonce: bytes, length: int) -> bytes:
    out = bytearray()
    counter = 0
    while len(out) < length:
        block = hashlib.sha256(key + nonce + counter.to_bytes(4, "big")).digest()
        out.extend(block)
        counter += 1
    return bytes(out[:length])


def encrypt(plain: str) -> str:
    key = key_bytes()
    if key is None:
        raise RuntimeError("CHECKIN_ENCRYPTION_KEY is not set")
    nonce = os.urandom(16)
    data = plain.encode("utf-8")
    stream = _stream(key, nonce, len(data))
    cipher = bytes(a ^ b for a, b in zip(data, stream))
    tag = hmac.new(key, nonce + cipher, hashlib.sha256).digest()
    return base64.b64encode(nonce + tag + cipher).decode("ascii")


def decrypt(token: str) -> str:
    key = key_bytes()
    if key is None:
        raise RuntimeError("CHECKIN_ENCRYPTION_KEY is not set")
    raw = base64.b64decode(token.encode("ascii"))
    nonce, tag, cipher = raw[:16], raw[16:48], raw[48:]
    expected = hmac.new(key, nonce + cipher, hashlib.sha256).digest()
    if not hmac.compare_digest(tag, expected):
        raise ValueError("ciphertext failed its check")
    stream = _stream(key, nonce, len(cipher))
    return bytes(a ^ b for a, b in zip(cipher, stream)).decode("utf-8")
