// Shared front-end checks for anything a person types. The server repeats every one of these; these only give fast, kind feedback.
(function () {
  const LIMITS = { answer: [3, 280], checkin: [3, 500], alertNote: [0, 140], report: [3, 280], expert: [10, 1200] };
  const letters = s => (s.match(/\p{L}/gu) || []).length;
  function gibberish(t) {
    const s = String(t || "").trim(); if (!s) return false;
    if (letters(s) < 2) return true;                                   // emoji / punctuation only
    if (/(.)\1{4,}/u.test(s)) return true;                              // aaaaa
    const words = s.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length >= 3 && new Set(words).size === 1) return true;    // same word repeated
    const w = s.replace(/[^\p{L}]/gu, "");
    if (w.length >= 6 && !/[aeiouyāīūēōṛ]/i.test(w)) return true;     // asdfgh, qwrtpz
    if (/^(asdf|qwer|zxcv|hjkl|jkl;)/i.test(w)) return true;
    return false;
  }
  function check(kind, text, extra) {
    const [min, max] = LIMITS[kind] || [0, 1000], s = String(text || "").trim();
    if (extra && extra.optional && !s) return { ok: true };
    if (s.length > max) return { ok: false, why: "long", msg: `Keep it under ${max} characters.` };
    if (s.length < min) return { ok: false, why: "short", msg: "Write a few words." };
    if (gibberish(s)) return { ok: false, why: "unclear", msg: "That doesn’t read as words yet. Try a short sentence." };
    return { ok: true };
  }
  // Rate limit per device: e.g. report once per word, 5 sends per hour.
  function allow(key, perHour) {
    const k = "ca_rate_" + key; const now = Date.now();
    let a; try { a = JSON.parse(localStorage.getItem(k)) || []; } catch (e) { a = []; }
    a = a.filter(t => now - t < 3600000);
    if (a.length >= perHour) return false;
    a.push(now); localStorage.setItem(k, JSON.stringify(a)); return true;
  }
  window.CAInput = { LIMITS, gibberish, check, allow };
})();
