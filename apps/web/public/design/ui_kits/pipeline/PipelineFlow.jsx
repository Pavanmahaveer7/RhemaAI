const { Card: PfCard, Button: PfButton, Badge: PfBadge, Icon: PfIcon, TextField: PfField, Radio: PfRadio, TextArea: PfArea, Dialog: PfDialog, Toast: PfToast } = window.ChurchAIDesignSystem_06db43;

const pfBack = { alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 44, background: "none", border: 0, padding: 0, color: "var(--text-muted)", font: "600 16px/1 var(--font-body)", cursor: "pointer" };
const pfBroad = r => r.split(" — ")[0];

const pfOutcome = {
  steady: ["sun", "var(--lamp-400)", "Thank you. Rest well tonight. “Come unto me, all ye that labour.” Matthew 11:28"],
  morning: ["sun", "var(--lamp-400)", "Thank you. Go gently today. “This is the day which the LORD hath made.” Psalm 118:24"],
  hard: ["hand-heart", "var(--bridge-400)", "A person will see this."],
  queued: ["clock", "var(--text-muted)", "Saved in this tab. It will send when you are online. Closing the tab removes it."],
  failed: ["wifi-off", "var(--danger-400)", "We could not send this."],
  blocked: ["shield-alert", "var(--danger-400)", "Part of this reads like an instruction, so it was not sent."]
};

function PfSlowLine({ text, style }) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => { if (rm) return; const a = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(a); }, [text]);
  return <p aria-live="polite" style={style}>{text.split(" ").map((w, i) => <span key={i} style={{ opacity: on ? 1 : 0, transition: `opacity 600ms var(--ease-out) ${i * 70}ms` }}>{w} </span>)}</p>;
}
function PfSunset({ morning }) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [down, setDown] = React.useState(rm);
  React.useEffect(() => { if (rm) return; const id = setTimeout(() => setDown(true), 1400); return () => clearTimeout(id); }, []);
  return <div aria-hidden="true" style={{ position: "relative", width: 56, height: 56, borderRadius: 99, overflow: "hidden", background: (morning ? !down : down) ? "var(--ink-2)" : "var(--surface-raised)", transition: "background 2400ms var(--ease-in-out)" }}>
    <span style={{ position: "absolute", left: 14, top: 14, display: "grid", transform: (morning ? !down : down) ? "translateY(20px)" : "none", transition: "transform 2400ms cubic-bezier(.4,0,.2,1)" }}><PfIcon name="sun" size={24} color={(morning ? !down : down) ? "var(--bridge-400)" : "var(--lamp-400)"} /></span>
    <span style={{ position: "absolute", left: 8, right: 8, top: 40, height: 1, background: "var(--border-default)" }}></span>
  </div>;
}
const pfMorning = () => { const t = new URLSearchParams(location.hash.slice(1)).get("tod"); return t ? t === "morning" : new Date().getHours() < 14; };
function PfOwnWords({ text }) { // the pastor's own words: never sent for translation
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const w = String(text || "").trim().split(/\s+/).filter(Boolean); if (!w.length) return null;
  const short = w.slice(0, 9).join(" ") + (w.length > 9 ? "…" : "");
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => { if (rm) return; const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true))); return () => cancelAnimationFrame(a); }, []);
  return <p data-no-tr="" style={{ margin: 0, font: "400 24px/1.35 var(--font-hand)", color: "var(--bone-8)", opacity: on ? 1 : 0, transition: "opacity 900ms var(--ease-out)" }}>You noticed: “{short}”</p>;
}
function PfFade({ style, children }) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => { if (rm) return; const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true))); return () => cancelAnimationFrame(a); }, []);
  return <p aria-live="polite" style={{ ...style, opacity: on ? 1 : 0, transition: "opacity 900ms var(--ease-out)" }}>{children}</p>;
}
function CheckinResult({ ck, edit, retry, wins }) {
  window.useEscPlain();
  if (ck.res === "pending" || !ck.res) return <div aria-live="polite" style={{ maxWidth: 560, display: "flex", gap: 12, alignItems: "center", paddingTop: 24, font: "var(--type-body)", color: "var(--text-muted)" }}><span style={{ width: 20, height: 20, borderRadius: 99, border: "2px solid var(--lamp-400)", borderRightColor: "transparent", animation: "ca-spin .8s linear infinite" }}></span>Sending today’s note…</div>;
  const morn = ck.res === "steady" && pfMorning(); const [ic, c, t0] = pfOutcome[morn ? "morning" : ck.res];
  const t = (ck.reply && ck.reply.text) || (ck.error && ck.error.message) || t0;
  const rid = ck.error && ck.error.requestId; const bad = ck.res === "failed" || ck.res === "blocked"; const L = window.CAT || (k => null);
  return <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 18 }}>
    <div style={{ display: "flex", alignItems: "center" }}><h1 style={{ ...window.psLabel, flex: 1, margin: 0 }}>{window.CAtr("Check-in")}{ck.n > 1 ? window.CAtr(" · updated") : ""}</h1><window.PsClose /></div>
    {ck.res === "steady" ? <PfSunset key={"sun" + ck.n} morning={morn} /> : <div key={"ic" + ck.n} data-ps-anim="" style={{ width: 56, height: 56, borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", animation: "none" }}><PfIcon name={ic} size={24} color={c} /></div>}
    {ck.res === "steady" || ck.res === "hard" ? <PfFade key={"t" + ck.n} style={{ font: "var(--type-pastoral)", fontSize: 24, color: "var(--text-strong)", margin: 0, textWrap: "pretty" }}>{window.CAtr(t)}</PfFade> : <p aria-live="polite" style={{ font: "var(--type-pastoral)", fontSize: 24, color: "var(--text-strong)", margin: 0, textWrap: "pretty" }}>{window.CAtr(t)}</p>}
    {bad && rid && <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>{window.CAtr("Request id")} {String(rid).slice(0, 8)}</p>}
    {ck.res === "steady" && <PfOwnWords key={"w" + ck.n} text={wins} />}
    {ck.res === "hard" && (() => { const me = window.CA_PIPE.me, ch = (window.csChurch && window.csChurch()) || {}; const [num, what] = window.CACrisisLine[ch.country || me.country] || window.CACrisisLine["United States"]; return <>
      <a href={"tel:" + num} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-strong)", background: "var(--surface-card)", textDecoration: "none", color: "inherit" }}>
        <span aria-hidden="true" style={{ width: 44, height: 44, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--danger-tint)", color: "var(--danger-400)" }}><PfIcon name="phone" size={20} /></span>
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}><span style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{window.CAtr("In danger now? Call")} {num}</span><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{what[0].toUpperCase() + what.slice(1)} · {window.CAtr("free, any time")}</span></span>
        <PfIcon name="chevron-right" size={18} color="var(--text-muted)" />
      </a>
      <div><PfButton variant="accent" size="lg" icon="messages-square" onClick={() => window.CATalkMentor && window.CATalkMentor()}>{window.CAtr("Message your mentor")}</PfButton></div>
    </>; })()}
    {ck.res === "steady" && <window.CAWhy text={window.CAtr("Written by the assistant from today’s note. Nothing here is scored, and your words are not shared.")} />}
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {ck.res === "failed" && <PfButton variant="primary" icon="rotate-cw" onClick={retry}>{window.CAtr("Retry")}</PfButton>}
      {ck.res !== "failed" && (ck.res === "hard" ? <button onClick={edit} style={{ height: 40, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "underline", textUnderlineOffset: 3 }}>{window.CAtr("Edit today’s note")}</button> : <PfButton variant={bad ? "ghost" : "secondary"} icon="pencil" onClick={edit}>{window.CAtr("Edit today’s note")}</PfButton>)}
    </div>
  </div>;
}

function pfAcks() { try { return JSON.parse(localStorage.getItem("ca_packet_ack")) || {}; } catch (e) { return {}; } }
const pfSteps = ["Read check-ins", "Read month counts", "Draft the review", "Check the draft"];
const pfDetail = c => [`${c.ck} check-ins this month`, `${c.act} activities`, "3 blocks", "No names · 1 item held"];

function Preparing({ onDone, counts, done }) {
  const [n, setN] = React.useState(done ? pfSteps.length : 0);
  const [collapsed, setCollapsed] = React.useState(!!done);
  const [more, setMore] = React.useState(false);
  const det = pfDetail(counts || { ck: 0, act: 0, rc: 0 });
  React.useEffect(() => { if (done) return; if (n < pfSteps.length) { const id = setTimeout(() => setN(n + 1), 520); return () => clearTimeout(id); } const a = setTimeout(() => setCollapsed(true), 260); const b = setTimeout(onDone, 820); return () => { clearTimeout(a); clearTimeout(b); }; }, [n]);
  return <div aria-live="polite" aria-label="Preparing the review" style={{ maxWidth: 480, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", padding: collapsed ? "12px 16px" : 20, transition: "padding var(--dur-slow) var(--ease-out)", overflow: "hidden" }}>
    {collapsed && !more ? <div style={{ display: "flex", gap: 10, alignItems: "center", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)" }}><PfIcon name="check" size={16} color="var(--ok-400)" /><span style={{ flex: 1 }}>Prepared · 4 steps</span><PfButton size="sm" variant="ghost" iconRight="chevron-down" onClick={() => setMore(true)}>Details</PfButton></div>
    : <><div role="status" style={{ ...window.psLabel, marginBottom: 12 }}>Preparing the review · step {Math.min(n + 1, 4)} of 4 · about 5 seconds</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>{pfSteps.map((s, i) => <li key={s} style={{ display: "flex", gap: 12, alignItems: "center", minHeight: 40, font: "var(--type-body)", color: i < n ? "var(--text-body)" : i === n ? "var(--text-strong)" : "var(--text-faint)" }}>
        {i < n ? <PfIcon name="check" size={18} color="var(--ok-400)" /> : i === n ? <span style={{ width: 16, height: 16, margin: 1, borderRadius: 99, border: "2px solid var(--lamp-400)", borderRightColor: "transparent", animation: "ca-spin .8s linear infinite" }}></span> : <PfIcon name="circle-dashed" size={18} />}<span style={{ flex: 1 }}>{s}</span>{i < n && <span style={{ font: "var(--type-source)", color: "var(--text-muted)", textAlign: "right" }}>{det[i]}</span>}</li>)}</ol>{more && <div style={{ marginTop: 8 }}><PfButton size="sm" variant="ghost" iconRight="chevron-up" onClick={() => setMore(false)}>Hide details</PfButton></div>}</>}
  </div>;
}

function PfBlock({ label, children }) {
  return <section style={{ padding: "20px 0", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 12 }}><h2 style={{ ...window.psLabel, margin: 0 }}>{label}</h2>{children}</section>;
}

function ReviewFlow({ id, back, decisions, decide }) {
  const p = window.CA_PIPE.queue.find(x => x.id === id) || window.CA_PIPE.queue[0];
  const down = window.CAGuard.forced() === "unavailable";
  const [ready, setReady] = React.useState(false);
  const [ack, setAck] = React.useState(!!pfAcks()[p.id]);
  const [dlg, setDlg] = React.useState(false);
  const [pick, setPick] = React.useState(null); const [conf, setConf] = React.useState("");
  const [note, setNote] = React.useState("");
  const decided = decisions[p.id];
  const stageNow = decided === "continue" ? Math.min(p.stage + 1, 4) : p.stage;
  const acknowledge = () => { if (window.CAApi && window.CAApi.isLive()) { window.CAApi.ack(p.id).then(() => setAck(true), () => {}); return; } localStorage.setItem("ca_packet_ack", JSON.stringify({ ...pfAcks(), [p.id]: "Today" })); setAck(true); };
  const outs = [["continue", "Continue", "Move to the next stage."], ["plan", "Development plan", "Stay in this stage with goals for next month."], ["additional", "Additional review", "Send to the regional authority first."]];
  const c = p.counts;
  return <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
    <button onClick={back} style={pfBack}><PfIcon name="arrow-left" size={18} />Queue</button>
    <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
      <h1 style={{ ...window.psH1, fontFamily: "var(--font-mono)", fontSize: 24 }}>{p.id}</h1>
      <span style={{ font: "var(--type-body)", color: "var(--text-muted)" }}>{pfBroad(p.region)} · {window.CA_PIPE.stages[stageNow]}</span>
    </div>
    {down ? <div role="status" style={{ minHeight: 280, display: "grid", placeItems: "center", border: "1px dashed var(--border-default)", borderRadius: "var(--radius-lg)", font: "600 18px/1 var(--font-body)", color: "var(--text-muted)" }}>Unavailable.</div>
    : !ready ? <Preparing counts={c} onDone={() => setReady(true)} />
    : <div style={{ animation: "ca-rise var(--dur-slow) var(--ease-out)", display: "flex", flexDirection: "column", gap: 16 }}>
      <Preparing counts={c} done />
      <window.CAAboutDraft id="packet">The assistant drafted this review from counts and check-ins. It can be wrong. Nothing about this pastor changes until a person decides.</window.CAAboutDraft>
      <PfBlock label="Month counts">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 16 }}>{[["Activities", c.act], ["Check-ins this month", c.ck], ["Pieces in", `${p.complete} of 5`], ["Feedback in", c.fb]].map(([k, v]) => <div key={k}><div style={{ font: "700 24px/1.2 var(--font-display)", color: "var(--text-strong)" }}>{v}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>{k}</div></div>)}</div>
        <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>Counts only. No names. Why these: they show effort and care this month, from check-ins. They are not a score.</p>
      </PfBlock>
      <PfBlock label="Encouragement · the pastor can read this">
        <p style={{ font: "var(--type-pastoral)", color: "var(--text-body)", margin: 0, textWrap: "pretty" }}>{p.enc}</p>
        <div><PfBadge tone="neutral" dot={false}>Draft</PfBadge></div>
        <window.CAWhy text="The assistant wrote this from this month’s counts and check-ins. It never sees names. A reviewer reads it before the pastor does, and can change every word." />
      </PfBlock>
      <PfBlock label="Held">
        <div style={{ padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: "var(--surface-raised)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            <div style={{ padding: 12, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 6 }}><span style={{ display: "inline-flex", gap: 6, alignItems: "center", font: "700 13px/1 var(--font-body)", color: "var(--text-muted)" }}><PfIcon name="list-checks" size={16} />Check-ins said</span><span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}>{`${c.ck} check-ins this month · ${c.act} activities · ${p.complete} of 5 pieces · ${c.fb} feedback`}{p.crisis ? ` · 1 hard note (${p.crisis.at})` : ""}</span></div>
            <div style={{ padding: 12, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 6 }}><span style={{ display: "inline-flex", gap: 6, alignItems: "center", font: "700 13px/1 var(--font-body)", color: "var(--text-muted)" }}><PfIcon name="file-text" size={16} />The draft says</span><span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}>{p.crisis ? "Hold for a person. A hard note came in this month." : p.complete >= 5 && parseInt(c.ck) >= 8 ? "Ready for a stage decision." : "Stay in this stage with goals for next month."}</span></div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><PfIcon name="user-check" size={20} color="var(--lamp-400)" /><b style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{decided ? `Recorded: ${outs.find(o => o[0] === decided)[1]}` : ack ? "Review still open." : "A person still has to decide."}</b></div>
          {!decided && <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {!ack && <PfButton variant="secondary" icon="check" onClick={acknowledge}>Acknowledge</PfButton>}
            <PfButton variant={ack ? "primary" : "ghost"} onClick={() => setDlg(true)}>Decide</PfButton>
          </div>}
        </div>
      </PfBlock>
    </div>}
    <PfDialog open={dlg} title={`Decision for ${p.id}`} onClose={() => setDlg(false)} actions={<><PfButton variant="ghost" onClick={() => setDlg(false)}>Cancel</PfButton><PfButton variant="primary" disabled={!pick || (pick === "continue" && !window.CAMatch(conf, p.id))} onClick={() => { decide(p.id, pick); setDlg(false); setConf(""); }}>Record</PfButton></>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{outs.map(([v, l, d]) => <PfRadio key={v} name="outcome" value={v} label={l} description={d} checked={pick === v} onChange={() => setPick(v)} />)}</div>
      <div style={{ marginTop: 10 }}><PfArea label="Note to the record" rows={3} value={note} onChange={e => setNote(e.target.value)} hint="Logged with your name." /></div>
      {pick === "continue" && <div style={{ marginTop: 10 }}><window.CATypeConfirm word={p.id} value={conf} onChange={setConf} hint="The stage moves for this pastor." /></div>}
    </PfDialog>
  </div>;
}

function ChurchSignin({ back, done }) {
  const [step, setStep] = React.useState("signin");
  const [email, setEmail] = React.useState(""), [pw, setPw] = React.useState("");
  const [err, setErr] = React.useState(null), [demo, setDemo] = React.useState(false);
  const signin = (e, d) => { e && e.preventDefault(); if (!d && (!email.trim() || !pw)) { setErr("Enter your email and password."); return; } setErr(null); setDemo(!!d || /demo/i.test(email)); setStep("consent"); };
  const allow = () => { setStep("return"); setTimeout(() => done(demo ? "demo" : "on"), 1100); };
  const Perm = ({ icon, title, items, tone }) => <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{title}</div>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>{items.map(t => <li key={t} style={{ display: "flex", gap: 10, alignItems: "center", font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}>
      <span aria-hidden="true" style={{ width: 28, height: 28, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: tone === "no" ? "var(--danger-tint)" : "var(--surface-raised)", color: tone === "no" ? "var(--danger-400)" : "var(--text-body)" }}><PfIcon name={tone === "no" ? "x" : icon} size={16} /></span>{t}</li>)}</ul>
  </div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
    <button type="button" onClick={back} style={pfBack}><PfIcon name="arrow-left" size={18} />Cancel and go back</button>
    <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", overflow: "hidden", background: "var(--surface-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", background: "var(--surface-raised)", borderBottom: "1px solid var(--border-subtle)", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)" }}><PfIcon name="lock" size={16} />accounts.planningcenteronline.com</div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {step === "signin" && <form onSubmit={signin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><h1 style={window.psH1}>Sign in to Planning Center</h1><p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: "6px 0 0" }}>This is Planning Center’s page. church.ai never sees your password.</p></div>
          <PfField label="Email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} error={err && !email.trim() ? err : undefined} />
          <PfField label="Password" type="password" autoComplete="current-password" value={pw} onChange={e => setPw(e.target.value)} error={err && email.trim() && !pw ? err : undefined} />
          <PfButton type="submit" variant="primary" size="lg" fullWidth>Sign in</PfButton>
          <PfButton type="button" variant="ghost" fullWidth onClick={() => signin(null, true)}>Use a demo church</PfButton>
        </form>}
        {step === "consent" && <>
          <div><h1 style={window.psH1}>Connect church.ai?</h1><p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: "6px 0 0" }}>{demo ? "Demo church" : "Living Water Fellowship"} · you can disconnect any time.</p></div>
          <Perm title="church.ai can read" icon="file-text" items={["Services you led", "Groups you run", "Your own profile"]} />
          <Perm title="Planning Center gets" icon="book-open" items={["The dictionary inside your church app", "This month’s question for your congregation", "A notice when your monthly pack is ready"]} />
          <Perm title="Never" tone="no" items={["Move a pastor’s stage", "Put names on the map", "See donor names"]} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><PfButton variant="primary" size="lg" onClick={allow}>Allow</PfButton><PfButton variant="ghost" size="lg" onClick={back}>Don’t allow</PfButton></div>
        </>}
        {step === "return" && <div role="status" style={{ display: "flex", gap: 12, alignItems: "center", minHeight: 120, font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" }}><PfIcon name="circle-check" size={20} color="var(--ok-400)" />Allowed. Returning to church.ai…</div>}
      </div>
    </div>
  </div>;
}

function ConnectedChurch({ back, pco, stage }) {
  const T = window.CA_PIPE.tracks, P = window.CA_PIPE.pack;
  const rows = [
    ["user", "Person", `${window.CA_PIPE.me.pid} · Pastor in training`],
    ["calendar", "Ministry activity", `${T.ministry[0].t} · ${T.ministry[0].d}`],
    ["users", "Community participation", P.community.find(r => r[0] === "Participation")[1]],
    ["file-text", "Document", T.documents[0][0], null, true]
  ];
  return <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
    <button onClick={back} style={pfBack}><PfIcon name="arrow-left" size={18} />Church apps</button>
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}><h1 style={window.psH1}>Connected church</h1><PfBadge tone={pco === "demo" ? "info" : "ok"}>{pco === "demo" ? "Demo church" : "Connected"}</PfBadge></div>
    <div style={{ font: "var(--type-body)", color: "var(--text-muted)" }}>Your stage: <b style={{ color: "var(--text-body)" }}>{window.CA_PIPE.stages[stage]}</b>. Only your reviewer can change it.</div>
    <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>Rows below came from Planning Center. People show as a short code, never a name.</p>
    <div role="list" aria-label="Imported rows" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {rows.map(([ic, k, v, rid, link], i) => { const Tag = link ? "a" : "div";
        return <Tag role="listitem" key={k} {...(link ? { href: "#", onClick: e => e.preventDefault() } : {})} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", borderTop: i ? "1px solid var(--border-subtle)" : 0, background: "var(--surface-card)", textDecoration: "none", color: "inherit" }}>
          <PfIcon name={ic} size={18} color="var(--text-muted)" style={{ marginTop: 2, flex: "none" }} />
          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={window.psLabel}>{k}</span>
            <span style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{v}</span>
            <span style={{ display: "flex", gap: 10, flexWrap: "wrap", font: "var(--type-source)" }}><span style={{ color: "var(--info-400)", display: "inline-flex", gap: 4, alignItems: "center" }}><PfIcon name="link-2" size={16} />Planning Center</span>{rid && <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{rid}</span>}</span>
          </span>
          {link && <PfIcon name="external-link" size={16} color="var(--text-faint)" />}
        </Tag>; })}
    </div>
  </div>;
}

Object.assign(window, { CheckinResult, ReviewFlow, ChurchSignin, ConnectedChurch });
