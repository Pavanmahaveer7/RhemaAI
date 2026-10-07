const { Button: ObButton, TextField: ObField, Icon: ObIcon } = window.ChurchAIDesignSystem_06db43;

(() => { if (document.getElementById("ob-kf")) return; const st = document.createElement("style"); st.id = "ob-kf";
  st.textContent = "@keyframes ob-float{0%,100%{translate:0 0}50%{translate:0 -12px}}@keyframes ob-sway{0%,100%{translate:0 0}50%{translate:var(--ob-dx,6px) 0}}@keyframes ob-orbit{0%{translate:0 0}25%{translate:9px -6px}50%{translate:0 -12px}75%{translate:-9px -6px}100%{translate:0 0}}@keyframes ob-breathe{0%,100%{scale:1}50%{scale:1.08}}@keyframes ob-turn{0%,100%{rotate:-3deg}50%{rotate:3deg}}@media (prefers-reduced-motion:reduce){[data-ob-live]{animation:none!important}}[data-reduce-motion] [data-ob-live]{animation:none!important}";
  document.head.appendChild(st); })();
const obLive = (on, name, dur, delay, extra) => on ? { animation: `${name} ${dur * 1.15}s cubic-bezier(.45,0,.55,1) -${delay}s infinite`, ...(extra || {}) } : {};
const obReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const obTr = { Hindu: "var(--trad-hindu)", Buddhist: "var(--trad-buddhist)", Christian: "var(--trad-christian)" };
const obTint = { Hindu: "var(--trad-hindu-tint)", Buddhist: "var(--trad-buddhist-tint)", Christian: "var(--trad-christian-tint)" };
const obCycle = ["Hindu", "Buddhist", "Christian"];
const obEase = "cubic-bezier(.22,.61,.36,1)";
const obWord = { font: "800 clamp(34px,9vw,56px)/1 var(--font-display)", letterSpacing: "var(--tracking-display)", whiteSpace: "nowrap" };
const obTag = { font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 10, textAlign: "center" };

function useObW() { const ref = React.useRef(null); const [w, setW] = React.useState(600); React.useEffect(() => { if (!ref.current) return; const ro = new ResizeObserver(([e]) => setW(e.contentRect.width)); ro.observe(ref.current); return () => ro.disconnect(); }, []); return [ref, w]; }

const OB_STEPS = [
  { t: "Understand the language of faith across cultures.", s: "Grace, prasāda, dāna: three traditions’ words for a gift. Close, but not the same." },
  { t: "Different traditions. Shared human questions.", s: "Every month, one question like this. You answer it later, if you want. Answers are counted, never named." },
  { t: "Learn. Understand. Connect.", s: "The ideas people share become one quiet map you can explore later." },
  { t: "Many traditions. Many words. One conversation.", s: "" },
];

function ObMeet({ on }) {
  const W = [["grace", "Christian", "translate(calc(-100% - 14px), -100%)", "translate(-80vw, -100%)", "8px"], ["prasāda", "Hindu", "translate(14px, -100%)", "translate(80vw, -100%)", "-8px"], ["dāna", "Buddhist", "translate(-50%, 18px)", "translate(-50%, 60vh)", "0px"]];
  return <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>{W.map(([w, tr, to, from, dx], i) => <div key={w} data-ob-live="" style={{ position: "absolute", top: "50%", left: "50%", display: "flex", flexDirection: "column", alignItems: "center", ...obLive(on, i === 2 ? "ob-float" : "ob-sway", 5.5 + i, 1.3 + i * 0.5, { "--ob-dx": dx }),
    transform: on ? to : from, opacity: on ? 1 : 0, transition: `transform 1680ms ${obEase} ${i * 220}ms, opacity 750ms var(--ease-out) ${i * 220}ms` }}>
    <span style={{ ...obWord, color: obTr[tr] }}>{w}</span><span style={obTag}>{tr}</span></div>)}</div>;
}

function ObVoices({ on }) {
  const [ref, w] = useObW(); const narrow = w < 560;
  const V = [["keeping a promise", 18, 16, 0, -1], ["care that asks nothing back", 82, 22, 1, -1], ["patience with my parents", 12, 80, 0, 1], ["sharing a meal", 86, 78, 1, 1], ["forgiving first", 50, 94, 0.5, 1]];
  const pill = (p, i, dy) => ({ ...obLive(on, "ob-float", 5 + i * 0.7, 1.4 + i * 0.35), whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-subtle)", color: "var(--text-body)", font: `400 ${narrow ? 14 : 15}px/1.2 var(--font-pastoral, var(--font-body))`, fontStyle: "italic", transform: on ? "none" : `translateY(${dy * 24}px)`, opacity: on ? 1 : 0, transition: `transform 1400ms ${obEase} ${400 + i * 240}ms, opacity 900ms var(--ease-out) ${400 + i * 240}ms` });
  if (narrow) { const row = { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" };
    return <div ref={ref} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, overflow: "hidden" }}>
      <div style={row}>{V.slice(0, 2).map(([p], i) => <span key={p} data-ob-live="" style={pill(p, i, -1)}>“{p}”</span>)}</div>
      <p style={{ margin: 0, textAlign: "center", font: "800 clamp(26px,7vw,34px)/1.1 var(--font-display)", color: "var(--text-strong)", opacity: on ? 1 : 0, transition: "opacity 750ms var(--ease-out)" }}>What does <u style={{ color: "var(--lamp-400)", textUnderlineOffset: "0.12em" }}>love</u> mean to you?</p>
      <div style={row}>{V.slice(2).map(([p], i) => <span key={p} data-ob-live="" style={pill(p, i + 2, 1)}>“{p}”</span>)}</div>
    </div>; }
  return <div ref={ref} style={{ position: "relative", height: "100%", overflow: "hidden" }}>
    <p style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%,-50%)", margin: 0, width: "min(80%, 420px)", textAlign: "center", font: "800 clamp(26px,6.5vw,40px)/1.1 var(--font-display)", color: "var(--text-strong)", opacity: on ? 1 : 0, transition: "opacity 750ms var(--ease-out)" }}>What does <u style={{ color: "var(--lamp-400)", textUnderlineOffset: "0.12em" }}>love</u> mean to you?</p>
    {V.map(([p, x, y, dx, dy], i) => <span key={p} data-ob-live="" style={{ ...obLive(on, "ob-float", 5 + i * 0.7, 1.4 + i * 0.35), position: "absolute", left: `clamp(130px, ${x}%, calc(100% - 130px))`, top: `${y}%`, whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-subtle)", font: "400 16px/1.2 var(--font-pastoral, var(--font-body))", fontStyle: "italic", color: "var(--text-body)",
      transform: `translate(-50%,-50%) translate(${on ? 0 : (dx < 0.5 ? -40 : dx > 0.5 ? 40 : 0)}px, ${on ? 0 : dy * 30}px)`, opacity: on ? 1 : 0, transition: `transform 1400ms ${obEase} ${400 + i * 240}ms, opacity 900ms var(--ease-out) ${400 + i * 240}ms` }}>“{p}”</span>)}
  </div>;
}

function ObConstellation({ on }) {
  const [ref, w] = useObW(); const k = Math.min(1, Math.max(0.55, (w - 40) / 440));
  const N = [["love", 0, 0, 1], ["faith", -118, -62, .8], ["hope", 112, -58, .75], ["community", -132, 58, .7], ["forgiveness", 118, 64, .7], ["service", -8, -118, .6], ["meaning", 4, 118, .65]];
  return <div ref={ref} style={{ position: "relative", height: "100%", overflow: "hidden" }}><div data-ob-live="" style={{ position: "absolute", inset: 0, ...obLive(on, "ob-turn", 20, 1.4) }}>{N.map(([wd, x, y, s], i) => <span key={wd} data-ob-live="" style={{ ...(i === 0 ? obLive(on, "ob-breathe", 4.5, 1.2) : obLive(on, "ob-orbit", 7 + i * 0.9, 1.2 + i * 0.3)), position: "absolute", left: "50%", top: "50%", padding: `${(10 * s + 6) * k}px ${(16 * s + 8) * k}px`, borderRadius: 999, whiteSpace: "nowrap",
    background: i === 0 ? "var(--lamp-400)" : "var(--ink-2)", color: i === 0 ? "var(--ink-0)" : "var(--text-strong)", border: `1px solid ${i === 0 ? "var(--lamp-400)" : "var(--ink-4)"}`, font: `800 ${Math.round((14 + 12 * s) * (0.75 + 0.25 * k))}px/1 var(--font-display)`,
    transform: `translate(-50%,-50%) translate(${on ? x * k : 0}px, ${on ? y * (0.7 + 0.3 * k) : 0}px) scale(${on ? 1 : 0.4})`, opacity: on ? 1 : 0, transition: `transform 1540ms ${obEase} ${200 + i * 140}ms, opacity 750ms var(--ease-out) ${200 + i * 140}ms` }}>{wd}</span>)}</div></div>;
}

function ObPaths({ on, go, art }) {
  const W = [["dharma", "Hindu", "translateX(-80vw)"], ["dhamma", "Buddhist", "translateY(-140px)"], ["righteousness", "Christian", "translateX(80vw)"]];
  return <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, overflow: "hidden" }}>
    <div style={{ display: "flex", gap: "clamp(14px,4vw,32px)", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>{W.map(([w, tr, from], i) => <div key={w} data-ob-live="" style={{ ...obLive(on, "ob-float", 6 + i * 0.8, 1.5 + i * 0.4), display: "flex", flexDirection: "column", alignItems: "center", transform: on ? "none" : from, opacity: on ? 1 : 0, transition: `transform 1680ms ${obEase} ${i * 200}ms, opacity 750ms var(--ease-out) ${i * 200}ms` }}>
      <span style={{ ...obWord, fontSize: "clamp(26px,6.5vw,44px)", color: obTr[tr] }}>{w}</span><span style={obTag}>{tr}</span></div>)}</div>
  </div>;
}

const obDone = () => {
  try { localStorage.setItem("ca_onboarded", "1"); } catch (x) {}
  const A = window.CAApi;
  if (A && A.isLive() && A.session()) A.put("/me/onboarding", { step: 4, done: true }).catch(() => {});
};

function OnboardingScreen({ go }) {
  const [i, setI] = React.useState(() => { const s = +new URLSearchParams(location.hash.slice(1)).get("step"); return s >= 1 && s <= 4 ? s - 1 : 0; });
  const [on, setOn] = React.useState(obReduce());
  const [cur, setCur] = React.useState(() => window.CACurious.get());
  const toggle = k => { window.CAHaptic && window.CAHaptic("light"); const n = cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k]; setCur(n); window.CACurious.set(n); };
  React.useEffect(() => { if (new URLSearchParams(location.hash.slice(1)).get("step")) return; try { localStorage.setItem("ca_onboarded", "1"); } catch (x) {} }, []);
  React.useEffect(() => { if (obReduce()) { setOn(true); return; } setOn(false); const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true))); return () => cancelAnimationFrame(a); }, [i]);
  const next = () => setI(n => Math.min(3, n + 1));
  const back = () => setI(n => Math.max(0, n - 1));
  React.useEffect(() => { const k = e => { if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return; if (e.key === "ArrowRight" && i < 3) next(); if (e.key === "ArrowLeft" && i > 0) back(); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [i]);
  const S = OB_STEPS[i];
  const Art = [ObMeet, ObVoices, ObConstellation, ObPaths][i];
  return <div style={{ flex: 1, width: "100%", maxWidth: 880, margin: "0 auto", padding: "12px var(--gutter-phone) 20px", display: "flex", flexDirection: "column", gap: 16, minHeight: "calc(100svh - 60px)", boxSizing: "border-box" }}>
    <div key={i} style={{ flex: "1 1 0", minHeight: "min(300px, 38svh)" }}><Art on={on} go={go} /></div>
    <div key={"t" + i} style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center", alignItems: "center", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(8px)", transition: "opacity 750ms var(--ease-out) 200ms, transform 500ms var(--ease-out) 200ms" }}>
      <h1 style={{ margin: 0, maxWidth: 640, font: "800 min(clamp(30px,7vw,48px), 7svh)/1.02 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", textWrap: "balance" }}>{S.t}</h1>
      {S.s && <p style={{ margin: 0, maxWidth: 460, font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", textWrap: "pretty" }}>{S.s}</p>}
    </div>
    {i < 3 ? <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>{i > 0 && <ObButton variant="ghost" size="lg" icon="arrow-left" onClick={back}>Back</ObButton>}<ObButton variant="primary" size="lg" iconRight="arrow-right" onClick={next}>Next</ObButton></div>
    : <div style={{ width: "min(100%, 520px)", alignSelf: "center", display: "flex", flexDirection: "column", gap: 8, transform: on ? "none" : "translateY(16px)", opacity: on ? 1 : 0, transition: `transform 840ms ${obEase} 1100ms, opacity 750ms var(--ease-out) 1100ms` }}>
      <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
        <legend style={{ padding: 0, marginBottom: 6, textAlign: "center", font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Curious about…</legend>
        <p style={{ margin: "0 0 6px", textAlign: "center", font: "var(--type-source)", color: "var(--text-muted)" }}>Optional. It picks your first few words and stays on this device.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>{Object.keys(window.CACurious.LABEL).map(k => { const p = cur.includes(k); return <button key={k} type="button" aria-pressed={p} onClick={() => toggle(k)} style={{ height: 40, flex: "none", whiteSpace: "nowrap", padding: "0 14px", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, cursor: "pointer", font: "600 13px/1 var(--font-body)", border: "1px solid " + (p ? "var(--bone-8)" : "var(--border-default)"), background: p ? "var(--bone-8)" : "transparent", color: p ? "var(--ink-0)" : "var(--text-body)", transition: "background 200ms var(--ease-out), color 200ms var(--ease-out)" }}>{p && <ObIcon name="check" size={16} />}{window.CACurious.LABEL[k]}</button>; })}</div>
      </fieldset>
      {(() => { const gf = localStorage.getItem("ca_guest_first") === "1";
        const acct = <div key="a" style={{ display: "flex", flexDirection: "column", gap: 6 }}><ObButton variant={gf ? "secondary" : "accent"} size="lg" fullWidth onClick={() => { obDone(); go("welcome"); }}>Create an account</ObButton><span style={{ textAlign: "center", font: "var(--type-source)", color: "var(--text-muted)" }}>Saves your words and the monthly question.</span></div>;
        const guest = <div key="g" style={{ display: "flex", flexDirection: "column", gap: 6 }}><ObButton variant={gf ? "accent" : "secondary"} size="lg" fullWidth iconRight="arrow-right" onClick={() => { obDone(); if (window.CAApi) window.CAApi.guest().catch(() => {}); window.CASession.set({ kind: "guest", name: "Guest" }); go("term", window.CACurious.first()); }}>Continue as guest</ObButton><span style={{ textAlign: "center", font: "var(--type-source)", color: "var(--text-muted)" }}>Nothing about you is stored.</span></div>;
        return <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{gf ? [guest, acct] : [acct, guest]}</div>; })()}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <ObButton variant="ghost" size="sm" icon="arrow-left" onClick={back}>Back</ObButton>
        <button onClick={() => { obDone(); go("signin"); }} style={{ height: 44, padding: "0 12px", background: "none", border: 0, color: "var(--text-body)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}>I already have an account</button>
      </div>
    </div>}
  </div>;
}
function AuthArt() {
  const [i, setI] = React.useState(obReduce() ? 3 : 0), [on, setOn] = React.useState(obReduce());
  React.useEffect(() => { if (obReduce()) return; setOn(false); const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true))); const b = i < 3 ? setTimeout(() => setI(i + 1), 5200) : 0; return () => { cancelAnimationFrame(a); clearTimeout(b); }; }, [i]);
  const Art = [ObMeet, ObVoices, ObConstellation, ObPaths][i];
  return <div aria-hidden="true" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box", borderRadius: "var(--radius-xl)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)" }}>
    <div key={i} style={{ flex: "1 1 0", minHeight: 0 }}><Art on={on} art /></div>
    <p key={"c" + i} style={{ margin: 0, textAlign: "center", font: "800 24px/1.1 var(--font-display)", color: "var(--text-strong)", textWrap: "balance", opacity: on ? 1 : 0, transition: "opacity 750ms var(--ease-out) 200ms" }}>{OB_STEPS[i].t}</p>
  </div>;
}
window.OnboardingScreen = OnboardingScreen; window.AuthArt = AuthArt;
