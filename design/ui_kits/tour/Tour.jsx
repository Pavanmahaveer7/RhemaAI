// Rhema.ai product tour — one continuous composition keyed to T and CUES.
const C = { ink0: "#0B0F0C", ink1: "#121813", ink2: "#1A211B", ink3: "#243025", ink4: "#324034", muted: "#95A08B", faint: "#808A77", bone7: "#C2CCB8", bone8: "#E3EADB", bone9: "#F3F7EE", lamp: "#CFDA5C", info: "#9DB8C9", warn: "#E9B949", ok: "#7CC08A",
  trad: { Hindu: ["#E3875C", "rgba(227,135,92,.14)"], Buddhist: ["#62B39B", "rgba(98,179,155,.14)"], Christian: ["#86A6E0", "rgba(134,166,224,.14)"] } };
const F = { d: '"Bricolage Grotesque", sans-serif', b: '"Atkinson Hyperlegible", sans-serif', m: '"IBM Plex Mono", monospace' };

// The only three motion helpers.
const MOTION = {
  enter: (start, dur = 0.5) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutCubic }),
  draw: (start, dur = 0.7) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeInOutCubic }),
  pop: (start, dur = 0.45) => animate({ from: 0, to: 1, start, end: start + dur, ease: Easing.easeOutBack }),
};
const rise = (p, d = 14) => ({ opacity: Math.min(1, Math.max(0, p)), transform: `translateY(${(1 - p) * d}px)` });
const typed = (T, text, start, per = 0.12) => text.slice(0, Math.max(0, Math.min(text.length, Math.floor((T - start) / per))));
const lerp = (a, b, k) => a + (b - a) * k;

function Caret({ T, on }) { return on ? <span style={{ display: "inline-block", width: 3, height: 22, marginLeft: 3, verticalAlign: "-4px", background: C.lamp, opacity: Math.floor(T * 2.4) % 2 ? 0.2 : 1 }}></span> : null; }
function Tap({ T, at, x, y }) { const p = MOTION.enter(at, 0.5)(T); if (T < at || p >= 1) return null; return <div style={{ position: "absolute", left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: 99, border: `3px solid ${C.bone9}`, opacity: 0.7 * (1 - p), transform: `scale(${0.4 + p * 0.8})`, pointerEvents: "none" }}></div>; }

const SW = 390;
const scr = { position: "absolute", top: 0, width: SW, height: 800, padding: "26px 22px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16, fontFamily: F.b, color: C.bone8 };
const h = { margin: 0, fontFamily: F.d, fontWeight: 800, color: C.bone9, letterSpacing: "-0.02em" };
const card = { borderRadius: 18, border: `1px solid ${C.ink4}`, background: C.ink2, padding: 16, display: "flex", flexDirection: "column", gap: 10 };

function ScreenDictionary({ T, t0 }) {
  const e = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const q = typed(T, "karma", t0 + 0.8, 0.16);
  const src = e.sources && e.sources[0];
  return <div style={scr}>
    <div style={{ height: 52, borderRadius: 999, background: C.ink2, border: `1px solid ${C.ink4}`, display: "flex", alignItems: "center", gap: 10, padding: "0 18px", fontSize: 19, fontWeight: 700, color: C.bone9 }}><span style={{ width: 14, height: 14, borderRadius: 99, border: `2px solid ${C.muted}` }}></span>{q}<Caret T={T} on={T > t0 + 0.4 && q.length < 5} /></div>
    <div style={{ ...rise(MOTION.enter(t0 + 2.0)(T)), ...h, fontSize: 84, lineHeight: 0.9, marginTop: 18 }}>karma</div>
    <div style={{ ...rise(MOTION.enter(t0 + 2.6)(T)), display: "flex", flexDirection: "column", gap: 6 }}><span style={{ fontStyle: "italic", color: C.muted, fontSize: 16 }}>{e.pos}</span><span style={{ fontSize: 19, lineHeight: 1.4, color: C.bone8 }}>{e.def}</span></div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{e.used.map((u, i) => <span key={u} style={{ ...rise(MOTION.pop(t0 + 3.2 + i * 0.25)(T), 8), height: 32, padding: "0 14px", display: "inline-flex", alignItems: "center", borderRadius: 999, background: C.trad[u][1], color: C.trad[u][0], fontWeight: 700, fontSize: 15 }}>{u}</span>)}</div>
    <div style={{ ...rise(MOTION.enter(t0 + 4.4)(T)), fontSize: 22, fontWeight: 700, color: C.lamp, lineHeight: 1.25 }}>Same word. Not the same concept.</div>
    {src && <div style={{ ...rise(MOTION.enter(t0 + 5.0)(T)), fontSize: 15, color: C.info }}>{src.work} {src.reference}</div>}
  </div>;
}

function ScreenQuestion({ T, t0 }) {
  const ans = typed(T, "Trust, when I can't see the end yet.", t0 + 0.9, 0.06);
  const press = T > t0 + 3.4 && T < t0 + 3.6;
  const done = MOTION.enter(t0 + 3.8)(T);
  return <div style={{ ...scr, left: SW }}>
    <div style={{ ...h, fontSize: 40, lineHeight: 1.02, marginTop: 8 }}>What does <span style={{ color: C.lamp, textDecoration: "underline", textUnderlineOffset: "0.12em" }}>faith</span> mean to you?</div>
    <div style={{ fontSize: 16, color: C.muted }}>No account. Not tied to any pastor.</div>
    <div style={{ ...card, minHeight: 150, fontSize: 19, lineHeight: 1.4, color: C.bone9, justifyContent: "flex-start" }}><span>{ans}<Caret T={T} on={T > t0 + 0.5 && T < t0 + 3.3} /></span></div>
    <div style={{ height: 56, borderRadius: 999, background: C.lamp, color: C.ink0, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18, transform: press ? "scale(.97)" : "none" }}>Send answer</div>
    <div style={{ ...rise(done), ...card, borderColor: C.ink3, background: C.ink1 }}><span style={{ ...h, fontSize: 24 }}>Your answer is in.</span><span style={{ fontSize: 16, color: C.muted }}>It joins the map when the month is published.</span></div>
    <Tap T={T} at={t0 + 3.4} x={195} y={346} />
  </div>;
}

function ScreenMap({ T, t0 }) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice(-2);
  const [A, B] = pub;
  const k = MOTION.draw(t0 + 1.0, 2.4)(T);
  const W = m => Object.fromEntries(m.nodes.filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wa = W(A), wb = W(B);
  const ids = [...new Set([...Object.keys(wb), ...Object.keys(wa)])].sort((x, y) => (wb[y] || wa[y] || 0) - (wb[x] || wa[x] || 0)).slice(0, 16);
  const slots = [[173, 250], [92, 150], [262, 142], [96, 350], [256, 352], [173, 96], [173, 420], [50, 250], [300, 248], [60, 440], [292, 440], [130, 44], [226, 40], [36, 70], [312, 70], [173, 172]];
  const pos = {}; ids.forEach((id, i) => { pos[id] = slots[i] || [173, 250]; });
  const labelled = new Set(ids.slice(0, 7));
  const onB = k >= 0.5;
  return <div style={{ ...scr, left: SW * 2 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ ...h, fontSize: 30 }}>Map</span>
      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 999, background: C.ink2, border: `1px solid ${C.ink3}` }}>{[A, B].map((m, i) => <span key={m.id} style={{ height: 32, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, fontSize: 14, fontWeight: 700, background: (i === 1) === onB ? C.bone8 : "transparent", color: (i === 1) === onB ? C.ink0 : C.muted }}>{m.label.split(" ")[0]}</span>)}</div>
    </div>
    <svg width="346" height="500" viewBox="0 0 346 500" style={{ borderRadius: 18, background: C.ink1, border: `1px solid ${C.ink3}` }}>{ids.map(id => { const v = lerp(wa[id] || 0, wb[id] || 0, k), r = v < 0.5 ? 0 : 5 + Math.sqrt(v) * 3.2, [x, y] = pos[id], nw = !wa[id] && wb[id] && onB;
      return <g key={id} transform={`translate(${x} ${y})`}><circle r={r} fill={nw ? C.lamp : C.ink4} stroke={nw ? "none" : C.bone7} strokeWidth="1.2" />{labelled.has(id) && r > 10 && <text y={r + 15} textAnchor="middle" style={{ font: `700 13px ${F.b}`, fill: C.bone8 }}>{id}</text>}</g>; })}</svg>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ ...h, fontSize: 40, fontVariantNumeric: "tabular-nums" }}>{Math.round(lerp(A.answers, B.answers, k))}</span><span style={{ fontSize: 17, color: C.muted }}>answers · counts only</span></div>
    <div style={{ ...rise(MOTION.enter(t0 + 3.8)(T)), fontSize: 17, color: C.bone8 }}>Bigger = said more. <b style={{ color: C.lamp }}>Lime</b> = new this month.</div>
  </div>;
}

function Ring({ p }) {
  const n = 5, c = 110, r = 92, seg = 360 / n, gap = 8, cur = 1;
  const pt = d => { const a = (d - 90) * Math.PI / 180; return [c + r * Math.cos(a), c + r * Math.sin(a)]; };
  return <svg width="220" height="220" style={{ alignSelf: "center", transform: `scale(${0.85 + 0.15 * p})`, opacity: Math.min(1, p) }}>{[...Array(n)].map((_, i) => { const a0 = i * seg + gap / 2, a1 = (i + 1) * seg - gap / 2, [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    return <path key={i} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none" strokeLinecap="round" stroke={i === cur ? C.lamp : i < cur ? C.bone7 : C.ink4} strokeWidth={i === cur ? 14 : i < cur ? 9 : 6} strokeDasharray={i > cur ? "2 10" : "none"} />; })}
    <text x={c} y={c - 4} textAnchor="middle" style={{ font: `700 13px ${F.b}`, fill: C.lamp, letterSpacing: ".08em" }}>STAGE 2 OF 5</text>
    <text x={c} y={c + 22} textAnchor="middle" style={{ font: `700 24px ${F.d}`, fill: C.bone9 }}>Training</text></svg>;
}

function ScreenPastor({ T, t0 }) {
  const moods = ["Heavy", "Tired", "Okay", "Good", "Light"];
  const picked = T > t0 + 3.5;
  return <div style={{ ...scr, left: SW * 3 }}>
    <div style={{ ...h, fontSize: 36 }}>Good morning.</div>
    <div style={{ fontSize: 17, color: C.muted, marginTop: -8 }}>Your mentor walks with you this season.</div>
    <Ring p={MOTION.pop(t0 + 0.4, 0.7)(T)} />
    <div style={{ ...rise(MOTION.enter(t0 + 2.0)(T), 30), ...card }}>
      <span style={{ ...h, fontSize: 24 }}>How was today?</span>
      <div style={{ display: "flex", gap: 6 }}>{moods.map(m => { const on = picked && m === "Good"; return <span key={m} style={{ flex: 1, height: 42, borderRadius: 12, display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, border: `1px solid ${on ? C.bone8 : C.ink4}`, background: on ? C.bone8 : "transparent", color: on ? C.ink0 : C.bone8 }}>{m}</span>; })}</div>
    </div>
    <div style={{ ...rise(MOTION.enter(t0 + 4.4)(T)), fontSize: 22, lineHeight: 1.35, color: C.bone9 }}>Thanks. Your mentor reads it with care.</div>
    <Tap T={T} at={t0 + 3.5} x={264} y={466} />
  </div>;
}

function ScreenConnect({ T, t0 }) {
  const email = typed(T, "pastor@livingwater.church", t0 + 0.4, 0.045);
  const dots = "•".repeat(Math.max(0, Math.min(8, Math.floor((T - (t0 + 1.6)) / 0.06))));
  const toList = MOTION.draw(t0 + 2.6, 0.6)(T);
  const on = T > t0 + 4.1;
  const field = { position: "absolute", left: 22, right: 22, height: 54, borderRadius: 14, background: C.ink2, border: `1px solid ${C.ink4}`, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 17, color: C.bone9 };
  const lab = { position: "absolute", left: 22, fontSize: 14, fontWeight: 700, color: C.muted };
  const row = { position: "absolute", left: 22, right: 22, borderRadius: 18, border: `1px solid ${C.ink4}`, background: C.ink2, padding: 16, display: "flex", flexDirection: "column", gap: 8 };
  return <div style={{ ...scr, left: SW * 4, padding: 0, display: "block" }}>
    <div style={{ position: "absolute", inset: 0, opacity: 1 - toList, transform: `translateX(${-toList * 40}px)` }}>
      <div style={{ ...h, position: "absolute", left: 22, top: 30, fontSize: 32 }}>Planning Center</div>
      <div style={{ position: "absolute", left: 22, top: 76, fontSize: 16, color: C.muted }}>You sign in on their site.</div>
      <div style={{ ...lab, top: 128 }}>Email</div><div style={{ ...field, top: 150 }}>{email}<Caret T={T} on={T > t0 + 0.3 && T < t0 + 1.5} /></div>
      <div style={{ ...lab, top: 222 }}>Password</div><div style={{ ...field, top: 244, letterSpacing: ".2em" }}>{dots}</div>
      <div style={{ position: "absolute", left: 22, right: 22, top: 326, height: 56, borderRadius: 999, background: C.bone8, color: C.ink0, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>Sign in</div>
      <div style={{ position: "absolute", left: 22, right: 22, top: 400, fontSize: 15, color: C.muted, textAlign: "center" }}>We never see your password.</div>
    </div>
    <div style={{ position: "absolute", inset: 0, opacity: toList, transform: `translateX(${(1 - toList) * 40}px)` }}>
      <div style={{ ...h, position: "absolute", left: 22, top: 30, fontSize: 32 }}>Church apps</div>
      <div style={{ ...row, top: 92 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ ...h, fontSize: 21, flex: 1 }}>Planning Center</span>
          <span style={{ height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, fontSize: 13, fontWeight: 700, background: on ? "rgba(124,192,138,.14)" : C.ink3, color: on ? C.ok : C.muted }}>{on ? "Connected" : "Not connected"}</span></div>
        <span style={{ fontSize: 15, color: C.muted }}>Service plans and groups.</span>
        <div style={{ height: 44, borderRadius: 999, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 16, background: on ? "transparent" : C.bone8, color: on ? C.bone8 : C.ink0, border: `1px solid ${on ? C.ink4 : C.bone8}` }}>{on ? "Open" : "Connect"}</div>
      </div>
      <div style={{ ...row, top: 290, opacity: 0.7 }}>
        <span style={{ ...h, fontSize: 21, whiteSpace: "nowrap" }}>Another church app</span><span style={{ fontSize: 14, fontWeight: 700, color: C.muted }}>Not available yet</span>
      </div>
      <div style={{ ...row, top: 404, background: C.ink1, borderColor: C.ink3, ...rise(MOTION.enter(t0 + 4.7)(T)) }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.muted }}>Who</span>
        <span style={{ fontSize: 17, lineHeight: 1.4, color: C.bone9 }}>Your church chose this. It can't move a stage or put names on the map.</span>
      </div>
    </div>
    <Tap T={T} at={t0 + 2.3} x={195} y={354} />
    <Tap T={T} at={t0 + 3.7} x={195} y={232} />
  </div>;
}

function ScreenReview({ T, t0 }) {
  const steps = ["Read check-ins", "Read month counts", "Draft the review", "Check the draft"];
  const col = MOTION.draw(t0 + 2.9, 0.5)(T);
  const b = i => rise(MOTION.enter(t0 + 3.3 + i * 0.35)(T), 18);
  return <div style={{ ...scr, left: SW * 5 }}>
    <div><div style={{ ...h, fontSize: 32 }}>P-0419</div><div style={{ fontSize: 16, color: C.muted, marginTop: 4 }}>Bangladesh · Dhaka Division</div></div>
    <div style={{ ...card, overflow: "hidden", height: lerp(196, 52, col), justifyContent: "flex-start" }}>
      {col < 0.5 ? steps.map((s, i) => { const on = T > t0 + 0.6 + i * 0.55; return <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, height: 34, fontSize: 17, color: on ? C.bone9 : C.faint }}><span style={{ width: 18, height: 18, borderRadius: 99, flex: "none", background: on ? C.ok : "transparent", border: `2px solid ${on ? C.ok : C.ink4}` }}></span>{s}</div>; })
      : <div style={{ display: "flex", alignItems: "center", gap: 12, height: 20, fontSize: 16, color: C.muted, opacity: (col - 0.5) * 2 }}><span style={{ width: 14, height: 14, borderRadius: 99, background: C.ok }}></span>Prepared · no names</div>}
    </div>
    <div style={{ ...b(0), ...card }}><span style={{ fontSize: 14, color: C.muted, fontWeight: 700 }}>Month counts</span><div style={{ display: "flex", gap: 20 }}>{[["14", "activities"], ["22", "check-ins"], ["4 of 5", "pieces"]].map(([v, l]) => <div key={l}><div style={{ ...h, fontSize: 26 }}>{v}</div><div style={{ fontSize: 13, color: C.muted }}>{l}</div></div>)}</div></div>
    <div style={{ ...b(1), ...card }}><span style={{ fontSize: 14, color: C.muted, fontWeight: 700 }}>Encouragement</span><span style={{ fontSize: 17, lineHeight: 1.4 }}>Steady care for the youth group this month.</span></div>
    <div style={{ ...b(2), ...card, borderColor: C.warn }}><span style={{ fontSize: 14, color: C.warn, fontWeight: 700 }}>Held</span><span style={{ fontSize: 19, fontWeight: 700, color: C.bone9 }}>A person still has to decide.</span></div>
  </div>;
}

const PROMISES = [
  ["We map ideas, never people.", "No account. No names. Counts only."],
  ["Every word has a source.", "Checked by a person."],
  ["A person always decides.", "AI drafts. People publish."],
  ["Works on a weak connection.", "Words you've seen stay on your phone."],
];
const PR_AT = i => -0.2 + i * 1.9;

function ScreenPromise({ T, t0 }) {
  const e = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const src = e.sources && e.sources[0];
  const vis = i => MOTION.enter(t0 + PR_AT(i), 0.45)(T) * (i < 3 ? 1 - MOTION.enter(t0 + PR_AT(i + 1) - 0.3, 0.3)(T) : 1);
  const box = i => ({ position: "absolute", left: 22, right: 22, top: 180, ...rise(vis(i), 20), ...card, padding: 22, gap: 14 });
  const big = { ...h, fontSize: 30, lineHeight: 1.05 };
  return <div style={{ ...scr, left: SW * 6, display: "block", padding: 0 }}>
    <div style={box(0)}><span style={{ ...h, fontSize: 48 }}>212</span><span style={{ fontSize: 16, color: C.muted, marginTop: -8 }}>answers this month</span>
      {[["family", 44], ["hope", 31], ["faith", 17]].map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: C.bone8 }}><span>{k}</span><span style={{ fontFamily: F.m, color: C.muted }}>{v}</span></div>)}
      <span style={{ fontSize: 15, color: C.lamp, fontWeight: 700 }}>No names · no answer text</span></div>
    <div style={box(1)}><span style={{ ...h, fontSize: 56, lineHeight: 0.9 }}>karma</span><span style={{ fontSize: 17, lineHeight: 1.4 }}>{e.def}</span>{src && <span style={{ fontSize: 16, color: C.info, fontWeight: 700 }}>{src.work} {src.reference}</span>}<span style={{ fontSize: 15, color: C.muted }}>Checked by a person</span></div>
    <div style={{ ...box(2), borderColor: C.warn }}><span style={{ fontSize: 14, color: C.warn, fontWeight: 700 }}>Held</span><span style={big}>A person still has to decide.</span><div style={{ height: 50, borderRadius: 999, background: C.lamp, color: C.ink0, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 17 }}>Publish</div><span style={{ fontSize: 15, color: C.muted }}>Nothing is published automatically.</span></div>
    <div style={box(3)}><span style={{ alignSelf: "flex-start", height: 30, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, border: `1px solid ${C.ink4}`, fontSize: 14, fontWeight: 700, color: C.bone8, whiteSpace: "nowrap" }}>On this device.</span><span style={{ ...h, fontSize: 56, lineHeight: 0.9 }}>karma</span><span style={{ fontSize: 17, lineHeight: 1.4 }}>{e.def}</span></div>
  </div>;
}

function ScreenEnd({ T, t0 }) {
  return <div style={{ ...scr, left: SW * 7, justifyContent: "center", gap: 14 }}>
    <div style={{ ...h, fontSize: 44, lineHeight: 1 }}>One word. Three faiths.</div>
    <div style={{ height: 56, borderRadius: 999, background: C.ink2, border: `1px solid ${C.ink4}`, display: "flex", alignItems: "center", gap: 10, padding: "0 18px", fontSize: 19, color: C.faint }}><span style={{ width: 14, height: 14, borderRadius: 99, border: `2px solid ${C.muted}` }}></span>Search a word<Caret T={T} on={T > t0 + 0.6} /></div>
    <div style={{ height: 56, borderRadius: 999, background: C.lamp, color: C.ink0, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18 }}>Search</div>
  </div>;
}

const TOUR_TEXT = [
  ["Dictionary", "Look up any word.", "Hindu, Buddhist and Christian words, side by side, with sources."],
  ["Question", "Answer one question a month.", "No account. No name. Not tied to any pastor."],
  ["Map", "See the map of ideas.", "Ideas are counted, never people. A person publishes it."],
  ["Pastor", "Pastors check in.", "A mentor reads it. Hard notes go to a person."],
  ["Connect", "Connect your church app.", "Sign in with Planning Center. It sends activity in. Only leaders move a stage."],
  ["Review", "Leaders review with care.", "The draft is prepared. A person still decides."],
  ["Promises", null, null],
  ["Close", "Look up a word.", "Rhema.ai"],
];
const MODULES = [["Dictionary", "Dictionary"], ["Question", "Monthly question"], ["Map", "Map"], ["Pastor", "Pastors"], ["Connect", "Church app"], ["Review", "Review"]];

function TourPiece({ captions, vertical }) {
  const V = !!vertical;
  const { T, CUES, duration } = useComposition();
  const order = TOUR_TEXT.map(x => x[0]);
  const end = n => { const i = order.indexOf(n); return i < order.length - 1 ? CUES[order[i + 1]] : duration; };
  // Wordmark: centered title → corner → back to center at the end (loop seam).
  const toCorner = MOTION.draw(CUES.Dictionary - 0.9, 0.9)(T);
  const back = MOTION.draw(CUES.Close + 3.2, 1.0)(T);
  const wk = toCorner * (1 - back);
  const tag = 1 - Math.min(1, MOTION.enter(CUES.Dictionary - 1.2, 0.4)(T) * (1 - MOTION.enter(CUES.Close + 3.6, 0.6)(T)));
  const wmW = 980;
  const wx = lerp((V ? 540 : 960) - wmW / 2, V ? 70 : 120, wk), wy = lerp(V ? 780 : 380, V ? 70 : 70, wk), ws = lerp(1, V ? 0.3 : 0.24, wk);
  // Phone: rises in, sits, leaves at the end.
  const phIn = MOTION.enter(CUES.Dictionary - 0.6, 1.0)(T), phOut = MOTION.draw(CUES.Close + 2.6, 0.9)(T);
  const phY = lerp(V ? 2000 : 1150, V ? 560 : 110, phIn) + phOut * (V ? 1500 : 1040);
  const drift = 1 + 0.012 * Math.sin(T * 0.5);
  // Screen track: slide one screen per section.
  const pos = ["Question", "Map", "Pastor", "Connect", "Review", "Promises", "Close"].reduce((s, n) => s + MOTION.draw(CUES[n] - 0.35, 0.7)(T), 0) * (T > CUES.Close + 3.6 ? 0 : 1);
  const curMod = MODULES.reduce((a, [n], i) => T >= CUES[n] - 0.35 ? i : a, -1);
  const rowP = MOTION.enter(CUES.Dictionary + 0.2)(T) * (1 - MOTION.enter(CUES.Promises - 0.3, 0.4)(T));
  const prOut = 1 - MOTION.enter(CUES.Close - 0.45, 0.35)(T);
  return <div data-screen-label={`Tour ${Math.floor(T)}s`} style={{ position: "absolute", inset: 0, background: C.ink0, overflow: "hidden", fontFamily: F.b }}>
    <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0", transform: `translate(${wx}px, ${wy}px) scale(${ws})`, width: wmW, textAlign: "center" }}>
      <div style={{ ...h, fontSize: 200, lineHeight: 1, whiteSpace: "nowrap" }}>Rhema.ai</div>
      <div style={{ fontFamily: F.b, fontSize: 48, color: C.bone8, marginTop: 24, opacity: tag }}>One word. Three faiths.</div>
    </div>
    {captions && TOUR_TEXT.filter(x => x[1]).map(([n, t, s]) => { const p = MOTION.enter(CUES[n] + 0.15, 0.6)(T) * (1 - MOTION.enter(n === "Close" ? CUES.Close + 2.6 : end(n) - 0.45, 0.35)(T));
      return <div key={n} style={{ position: "absolute", left: V ? 70 : 120, top: V ? 220 : 330, width: V ? 940 : 780, ...rise(p, 24) }}>
        <div style={{ ...h, fontSize: V ? 84 : 96, lineHeight: 0.95 }}>{t}</div>
        <div style={{ fontSize: 34, lineHeight: 1.35, color: n === "Close" ? C.lamp : C.bone8, marginTop: 28, fontWeight: n === "Close" ? 700 : 400 }}>{s}</div>
      </div>; })}
    {captions && <div style={{ position: "absolute", left: V ? 70 : 120, top: V ? 170 : 220, width: V ? 940 : 900, display: "flex", flexDirection: "column", gap: 34 }}>{PROMISES.map(([t, sub], i) => { const p = MOTION.enter(CUES.Promises + PR_AT(i), 0.5)(T) * prOut; const cur = T >= CUES.Promises + PR_AT(i) && (i === 3 || T < CUES.Promises + PR_AT(i + 1));
      return <div key={t} style={V ? { position: "absolute", left: 0, top: 50, width: "100%", ...rise(cur ? p : 0, 18) } : { ...rise(p, 18) }}><div style={{ ...h, fontSize: V ? 54 : 62, lineHeight: 1, color: cur ? C.bone9 : C.faint }}>{t}</div><div style={{ fontSize: 28, marginTop: 10, color: cur ? C.bone8 : C.faint }}>{sub}</div></div>; })}</div>}
    {!V && <div style={{ position: "absolute", left: 120, top: 940, display: "flex", gap: 30, opacity: rowP }}>{MODULES.map(([n, l], i) => <span key={n} style={{ fontSize: 26, fontWeight: 700, color: i === curMod ? C.bone9 : C.faint }}>{l}</span>)}</div>}
    <div style={{ position: "absolute", left: V ? 325 : 1170, top: phY, width: 430, height: 860, borderRadius: 56, background: C.ink1, border: `2px solid ${C.ink4}`, overflow: "hidden", transform: `scale(${drift * (V ? 1.45 : 1)})`, transformOrigin: V ? "50% 0" : "50% 50%" }}>
      <div style={{ position: "absolute", left: 20, top: 30, width: SW, height: 800, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -pos * SW, top: 0, width: SW * 8, height: 800 }}>
          <ScreenDictionary T={T} t0={CUES.Dictionary} />
          <ScreenQuestion T={T} t0={CUES.Question} />
          <ScreenMap T={T} t0={CUES.Map} />
          <ScreenPastor T={T} t0={CUES.Pastor} />
          <ScreenConnect T={T} t0={CUES.Connect} />
          <ScreenReview T={T} t0={CUES.Review} />
          <ScreenPromise T={T} t0={CUES.Promises} />
          <ScreenEnd T={T} t0={CUES.Close} />
        </div>
      </div>
    </div>
  </div>;
}
window.TourPiece = TourPiece;
