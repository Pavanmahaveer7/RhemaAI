const { TextArea: MqArea, Button: MqButton, Tag: MqTag, StateBlock: MqState, Icon: MqIcon } = window.ChurchAIDesignSystem_06db43;

function CAQuestionText({ month }) {
  const q = month.question || "", t = month.term, i = t ? q.toLowerCase().indexOf(t.toLowerCase()) : -1;
  if (i < 0) return q;
  const open = e => { e.preventDefault(); if (window.CAGo) window.CAGo("term", t); else location.hash = `r=term&t=${t}`; };
  return <>{q.slice(0, i)}<a data-qterm="" href={`#r=term&t=${t}`} onClick={open} aria-label={`${t}, open in the dictionary`} title="Open in the dictionary" style={{ color: "var(--lamp-400)", textDecoration: "underline", textDecorationThickness: "0.08em", textUnderlineOffset: "0.12em" }}>{q.slice(i, i + t.length)}</a>{q.slice(i + t.length)}</>;
}
window.CAQuestionText = CAQuestionText;

function MonthlyScreen({ go }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const f = () => setTick(n => n + 1); window.addEventListener("ca-data-ready", f); return () => window.removeEventListener("ca-data-ready", f); }, []);
  const months = window.CA_DATA.months;
  const cur = months[months.length - 1];
  const prev = months.filter(m => m.published).slice(-1)[0];
  const closed = new URLSearchParams(location.hash.slice(1)).get("closed") === "1" || (cur.ends && Date.now() > new Date(cur.ends + "T23:59:59").getTime());
  const key = "ca_answered_" + cur.id;
  const [prior, setPrior] = React.useState(!!localStorage.getItem(key));
  const [text, setText] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const chipPool = React.useMemo(() => { const src = (prev || cur).nodes || []; return src.filter(n => n[1] >= 3).sort((a, b) => b[1] - a[1]).slice(0, 8).map(n => n[0]); }, [tick, cur.id, prev && prev.id]);
  const [chips, setChips] = React.useState([]);
  const toggleChip = c => { window.CAHaptic && window.CAHaptic("light"); setChips(x => x.includes(c) ? x.filter(y => y !== c) : x.length < 3 ? [...x, c] : x); if (phase === "invalid") setPhase("form"); };
  const [fix, setFix] = React.useState(false); const [confirmed, setConfirmed] = React.useState(false);
  const [phase, setPhase] = React.useState(prior ? "done" : "form");
  const [removed, setRemoved] = React.useState(0);
  const [support, setSupport] = React.useState(false);
  const piiNow = window.CAGuard.pii(text);
  const [rid, setRid] = React.useState("");
  const [sent, setSent] = React.useState(null); const [stage, setStage] = React.useState(2);
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RH = window.CARhythm; const myIdea = RH && RH.mine(cur.id);
  React.useEffect(() => { if (!sent || rm) return; const id = setTimeout(() => { const el = document.querySelector("[data-qterm]"); el && el.animate && el.animate([{ textDecorationThickness: "0.08em", color: "var(--lamp-400)" }, { textDecorationThickness: "0.2em", color: "var(--bone-9)", offset: 0.45 }, { textDecorationThickness: "0.08em", color: "var(--lamp-400)" }], { duration: 900, easing: "cubic-bezier(.2,.8,.2,1)" }); }, 1000); return () => clearTimeout(id); }, [sent]);
  React.useEffect(() => { if (!sent || rm) { setStage(2); return; } setStage(0); const a = setTimeout(() => setStage(1), 700); const b = setTimeout(() => setStage(2), 1300); return () => { clearTimeout(a); clearTimeout(b); }; }, [sent]);
  const Next = () => RH ? <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}><MqIcon name="calendar" size={18} color="var(--text-muted)" /><span style={{ flex: "1 1 180px", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)" }}>Next question opens {RH.nextLabel()}.</span><MqButton size="sm" variant="secondary" icon="calendar-plus" onClick={RH.ics}>Add to calendar</MqButton></div> : null;
  const afterSend = (clean, idea, removedN, supportN) => {
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), len: clean.length }));
    RH && RH.setMine(cur.id, idea);
    setSent({ text: clean.trim() ? clean.slice(0, 90) : chips.join(" · "), idea });
    setFix(false); setConfirmed(false); setPrior(true); setPhase("done");
  };
  const submit = e => {
    e.preventDefault();
    if (!text.trim() && !chips.length) { setErrMsg("Pick an idea or write a few words."); setPhase("invalid"); return; }
    { const c = window.CAInput.check("answer", text, { optional: chips.length > 0 }); if (!c.ok) { setErrMsg(c.msg); setPhase("invalid"); return; } }
    if (window.CAGuard.injection(text)) { setRid(window.CAGuard.reqId()); setPhase("blocked"); return; }
    const n = window.CAGuard.pii(text); const clean = window.CAGuard.redact(text);
    const live = window.CAApi && window.CAApi.isLive() && !window.CA_DEMO;
    if (live) {
      setPhase("sending");
      const payload = clean.trim() || chips.join(" ");
      const guest = window.CAApi.session() ? Promise.resolve() : window.CAApi.guest();
      guest.then(() => window.CAApi.post("/months/current/answer", { text: payload, lang: window.CA_LANG || "en" })).then(res => {
        setRemoved(res.removedDetails || 0); setSupport(!!res.support);
        setPhase("sent"); window.CAHaptic && window.CAHaptic("medium");
        const idea = chips[0] || (RH ? RH.guessIdea(clean || payload) : null) || (res.othersTalkedAbout && res.othersTalkedAbout[0]) || null;
        if (!res.replacedPrevious && typeof cur.answers === "number") cur.answers += 1;
        setTimeout(() => afterSend(clean || payload, idea, res.removedDetails, res.support), rm ? 600 : 1000);
      }, err => {
        if (err && err.code === "blocked_injection") { setRid(err.requestId || window.CAGuard.reqId()); setPhase("blocked"); return; }
        if (err && err.status === 429) { setErrMsg(err.message || "You’ve sent a few already. Try again in a little while."); setPhase("invalid"); return; }
        setErrMsg((err && err.message) || "Could not send. Try again."); setPhase("invalid");
      });
      return;
    }
    if (!window.CAInput.allow("answer", 5)) { setErrMsg("You’ve sent a few already. Try again in a little while."); setPhase("invalid"); return; }
    setRemoved(n); setSupport(window.CAGuard.crisis(text)); setPhase("sending");
    setTimeout(() => { setPhase("sent"); window.CAHaptic && window.CAHaptic("medium"); }, 600);
    setTimeout(() => { const idea = chips[0] || (RH ? RH.guessIdea(clean) : null); afterSend(clean, idea, n, window.CAGuard.crisis(text)); }, rm ? 600 : 1000);
  };
  const others = ["peace", "prayer", "family", "silence", "nature", "forgiveness"];
  const [rem, setRem] = React.useState(() => localStorage.getItem("ca_remind") || "");
  const askRemind = async () => { let v = "yes"; try { if ("Notification" in window) { const p = await Notification.requestPermission(); v = p === "granted" ? "yes" : "denied"; } } catch (e) {} localStorage.setItem("ca_remind", v); setRem(v); };
  const Remind = () => rem === "no" ? null : <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 12 }}>
    {rem === "yes" ? <p style={{ margin: 0, display: "flex", gap: 8, alignItems: "center", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)" }}><MqIcon name="circle-check" size={18} color="var(--ok-400)" />We’ll tell you when the next question opens. Nothing else.</p>
    : rem === "denied" ? <p style={{ margin: 0, font: "var(--type-source)", color: "var(--text-muted)" }}>Notifications are off in your browser. Add to calendar works instead.</p>
    : <><div style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" }}>One question a month. Want a heads-up when it opens?</div>
      <div aria-label="Preview of the only notification we send" style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}><span aria-hidden="true" style={{ width: 36, height: 36, flex: "none", borderRadius: 10, display: "grid", placeItems: "center", background: "var(--lamp-400)", color: "var(--ink-0)", font: "800 16px/1 var(--font-display)" }}>c</span><span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}><span style={{ font: "700 13px/1.2 var(--font-body)", color: "var(--text-strong)" }}>church.ai</span><span style={{ font: "400 13px/1.3 var(--font-body)", color: "var(--text-body)" }}>This month’s question is open: one word, your way.</span></span></div>
      <p style={{ margin: 0, font: "var(--type-source)", color: "var(--text-muted)" }}>That’s the only message, once a month.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><MqButton size="sm" variant="secondary" icon="bell" onClick={askRemind}>Remind me</MqButton><MqButton size="sm" variant="ghost" onClick={() => { localStorage.setItem("ca_remind", "no"); setRem("no"); }}>Not now</MqButton></div></>}
  </div>;
  return <div style={{ maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "40px var(--gutter-phone) 24px" }}>
    <h1 style={{ font: "800 clamp(44px,13vw,68px)/.98 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: "0 0 14px", textWrap: "balance" }}><CAQuestionText month={cur} /></h1>
    <p style={{ font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", margin: "0 0 28px" }}>{cur.label}. Say it your way. No account, never tied to a pastor.</p>
    {closed ? <section aria-live="polite" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: 22, background: "var(--surface-card)" }}><div style={{ font: "800 24px/1.1 var(--font-display)", color: "var(--text-strong)", marginBottom: 6 }}>This month has ended.</div><p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>{cur.label} is no longer taking answers. You can still <a href="#r=graph">see what people said on the map</a>.</p><Next /></section> : !["done"].includes(phase) ? <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {phase === "blocked" && <MqState kind="unavailable" compact title="Blocked" message={`This answer was blocked. It reads like an instruction to the system, so it was not sent. Request id: ${rid}`} />}
      {prior && <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>This replaces your earlier answer for {cur.label}. One answer per person per month.</p>}
      <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <legend style={{ padding: 0, marginBottom: 8, font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Pick up to 3 ideas <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>· or write below · either one is enough</span></legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{chipPool.map(c => { const on = chips.includes(c); return <button key={c} type="button" aria-pressed={on} disabled={!on && chips.length >= 3} onClick={() => toggleChip(c)} style={{ height: 40, padding: "0 14px", flex: "none", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, cursor: !on && chips.length >= 3 ? "default" : "pointer", font: "600 16px/1 var(--font-body)", border: "1px solid " + (on ? "var(--bone-8)" : "var(--border-default)"), background: on ? "var(--bone-8)" : "transparent", color: on ? "var(--ink-0)" : "var(--text-body)", opacity: !on && chips.length >= 3 ? 0.45 : 1 }}>{on && <MqIcon name="check" size={16} />}{c}</button>; })}</div>
      </fieldset>
      <MqArea label="Your answer" rows={6} maxLength={280} value={text} onChange={e => { setText(e.target.value); if (phase === "invalid" || phase === "blocked") setPhase("form"); }} error={phase === "invalid" ? errMsg || "Pick an idea or write a few words." : undefined} hint={piiNow ? "That looks like a name, phone number, email or address. We remove it before anything reaches the map." : "Optional. We keep the idea, not your words: the text is deleted within 24 hours."} placeholder="Honestly? Peace at home. Real friends…" />
      <window.CAMic inline onText={t => { setText(x => ((x ? x + " " : "") + t).slice(0, 280)); if (phase === "invalid") setPhase("form"); }} />
      <MqButton type="submit" variant="accent" size="lg" fullWidth loading={phase === "sending"} icon={phase === "sent" ? undefined : "send"}>{phase === "sent" ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ display: "inline-flex", animation: "ca-turn 420ms var(--ease-out) both" }}><window.ChurchAIDesignSystem_06db43.Icon name="check" size={20} /></span>Counted</span> : "Send answer"}</MqButton>
    </form> : <section aria-live="polite" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: 22, background: "var(--surface-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><span aria-hidden="true" style={{ width: 36, height: 36, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--ok-tint)", color: "var(--ok-400)" }}><MqIcon name="check" size={18} /></span><span style={{ font: "800 24px/1.1 var(--font-display)", color: "var(--text-strong)" }}>Counted.</span></div>
      {cur.answers > 0 && <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: "0 0 12px" }}>You and {cur.answers} others answered in {cur.label.split(" ")[0]}.</p>}
      {sent && <div aria-hidden={stage < 2} style={{ position: "relative", height: 48, margin: "4px 0 14px" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 14px", borderRadius: "var(--radius-md)", background: "var(--surface-raised)", font: "var(--type-body)", fontSize: 16, color: "var(--text-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transformOrigin: "left center", opacity: stage === 0 ? 1 : 0, transform: stage === 0 ? "none" : "scale(.4)", transition: "opacity 320ms var(--ease-out), transform 420ms var(--ease-out)" }}>“{sent.text}”</div>
        <div style={{ position: "absolute", left: 0, top: 6, display: "inline-flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", borderRadius: 999, background: "var(--bone-8)", color: "var(--ink-0)", font: "700 16px/1 var(--font-body)", opacity: stage === 0 ? 0 : 1, transform: stage === 0 ? "scale(.85)" : "none", transition: "opacity 240ms var(--ease-out) 120ms, transform 240ms var(--ease-out) 120ms" }}><MqIcon name="circle-dot" size={16} />{sent.idea || "your idea"}</div>
      </div>}
      {!sent && myIdea && <div style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", margin: "4px 0 14px", borderRadius: 999, background: "var(--bone-8)", color: "var(--ink-0)", font: "700 16px/1 var(--font-body)" }}><MqIcon name="circle-dot" size={16} />{myIdea}</div>}
      {sent && stage === 2 && !confirmed && <div role="group" aria-label="Did we read you right?" style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 14px", padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}><span style={{ flex: "1 1 160px", font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Did we read you right?</span>
          {!fix && <><MqButton size="sm" variant="secondary" icon="check" onClick={() => setConfirmed(true)}>Yes</MqButton><MqButton size="sm" variant="ghost" onClick={() => setFix(true)}>Change idea</MqButton></>}</div>
        {fix && <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{[...new Set([...chips, ...chipPool])].filter(c => c !== sent.idea).slice(0, 6).map(c => <button key={c} type="button" onClick={() => { RH && RH.setMine(cur.id, c); setSent(s => ({ ...s, idea: c })); setFix(false); setConfirmed(true); window.CAHaptic && window.CAHaptic("light"); }} style={{ height: 36, padding: "0 14px", flex: "none", whiteSpace: "nowrap", borderRadius: 999, cursor: "pointer", font: "600 13px/1 var(--font-body)", border: "1px solid var(--border-default)", background: "transparent", color: "var(--text-body)" }}>{c}</button>)}</div>}
      </div>}
      {sent && confirmed && <p role="status" style={{ display: "flex", gap: 8, alignItems: "center", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)", margin: "0 0 12px" }}><MqIcon name="circle-check" size={18} color="var(--ok-400)" />Counted as “{sent.idea}”. Your words are not kept.</p>}
      {removed > 0 && <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: "0 0 10px" }}>We removed {removed === 1 ? "1 personal detail" : `${removed} personal details`} before sending.</p>}
      {support && (() => { const lines = window.CACrisisLine || {}; const [num, what] = lines["United States"] || ["988", "the crisis line"]; return <div role="note" style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 14px" }}>
        <p style={{ font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-body)", margin: 0 }}>It sounds heavy right now. You are not alone.</p>
        <a href={"tel:" + num} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-strong)", background: "var(--surface-raised)", textDecoration: "none", color: "inherit" }}><span aria-hidden="true" style={{ width: 40, height: 40, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--danger-tint)", color: "var(--danger-400)" }}><MqIcon name="phone" size={18} /></span><span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}><span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Talk to someone now · {num}</span><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Free, any time. No account needed.</span></span><MqIcon name="chevron-right" size={18} color="var(--text-muted)" /></a>
      </div>; })()}
      <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: "0 0 4px" }}>Joins the map on release day. Only this device knows which idea was yours.</p>
      {(!sent || confirmed) && <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
        <MqIcon name="calendar" size={18} color="var(--text-muted)" />
        <span style={{ flex: "1 1 180px", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)" }}>{RH ? `Next question opens ${RH.nextLabel()}.` : "Next question opens next month."}</span>
        {rem === "yes" ? <span style={{ display: "inline-flex", gap: 6, alignItems: "center", font: "600 13px/1 var(--font-body)", color: "var(--ok-400)" }}><MqIcon name="circle-check" size={16} />Reminder on</span>
          : <MqButton size="sm" variant="secondary" icon="bell" onClick={async () => { await askRemind(); if (localStorage.getItem("ca_remind") !== "yes" && RH) RH.ics(); }}>Remind me</MqButton>}
      </div>}
      <button onClick={() => { setRemoved(0); setSupport(false); setSent(null); setPhase("form"); }} style={{ marginTop: 14, height: 40, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "underline", textUnderlineOffset: 3 }}>Change my answer</button>
    </section>}
  </div>;
}
window.MonthlyScreen = MonthlyScreen;
