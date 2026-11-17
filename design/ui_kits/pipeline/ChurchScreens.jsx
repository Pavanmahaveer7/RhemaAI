const { Card: CsCard, Button: CsButton, Badge: CsBadge, Icon: CsIcon, TextField: CsField, TextArea: CsArea, Select: CsSelect, Switch: CsSwitch, SegmentedControl: CsSeg, StateBlock: CsState } = window.ChurchAIDesignSystem_06db43;

const csP = { font: "var(--type-body)", color: "var(--text-muted)", margin: 0, textWrap: "pretty" };
const csRegions = [["Bangladesh", "Dhaka Division"], ["Bangladesh", "Rajshahi Division"], ["India", "Odisha"], ["Nepal", "Koshi Province"], ["Sri Lanka", "Central Province"]];
const csCountries = [...new Set(csRegions.map(r => r[0]))];

function csChurch() { if (window.CA_CHURCH_LIVE) return window.CA_CHURCH_LIVE; try { return JSON.parse(localStorage.getItem("ca_church")); } catch (e) { return null; } }
function csCode() { const A = "ACDEFHJKMNPRTVWXY3479"; let s = ""; for (let i = 0; i < 9; i++) s += A[Math.floor(Math.random() * A.length)] + (i === 2 || i === 5 ? "-" : ""); return s; }

function RegisterChurch({ done }) {
  const [f, setF] = React.useState({ name: "", country: "Bangladesh", region: "Dhaka Division" });
  const [phase, setPhase] = React.useState("form");
  const [mode, setMode] = React.useState("register");
  const [joinCode, setJoinCode] = React.useState("");
  const [err, setErr] = React.useState(null);
  const [code, setCode] = React.useState("");
  const regions = csRegions.filter(r => r[0] === f.country).map(r => r[1]);
  const cacheChurch = row => { localStorage.setItem("ca_church", JSON.stringify(row)); window.CA_CHURCH_LIVE = row; };
  const submitJoin = e => {
    e.preventDefault(); const c = joinCode.replace(/\s/g, "").toUpperCase(); if (c.length < 4) { setErr("Enter the join code from your church."); return; } setErr(null); setPhase("sending");
    if (window.CAApi && window.CAApi.isLive()) {
      window.CAApi.post("/churches/join", { code: c }).then(ch => {
        cacheChurch({ name: ch.name, country: ch.country, region: ch.region, code: ch.join_code, status: "joined", id: ch.id }); done();
      }, x => { setErr(x.message || "Could not join."); setPhase("form"); });
      return;
    }
    setTimeout(() => { setErr("Nothing here yet."); setPhase("form"); }, 500);
  };
  const submit = e => {
    e.preventDefault(); if (!f.name.trim()) { setErr("Enter the church name."); return; } setErr(null); setPhase("sending");
    if (window.CAApi && window.CAApi.isLive()) {
      window.CAApi.post("/churches", { name: f.name.trim(), country: f.country, region: f.region }).then(ch => {
        setCode(ch.join_code || ""); setPhase("approved"); window.CA_CHURCH_LIVE = { ...f, name: ch.name, code: ch.join_code, status: "joined", id: ch.id };
      }, x => { setErr(x.message || "Could not register."); setPhase("form"); });
      return;
    }
    setTimeout(() => setPhase("waiting"), 700);
  };
  const approve = () => { let c = csCode(); while (f.name && c.replace(/-/g, "").includes(f.name.slice(0, 3).toUpperCase())) c = csCode(); setCode(c); setPhase("approved"); };
  if (phase === "waiting") return <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={window.psLabel}>Register a church</div>
    <h1 style={window.psH1}>Waiting for a person to approve.</h1>
    <p style={csP}>You can close this page. Nothing is listed publicly.</p>
    <details data-demo="" style={{ borderTop: "1px dashed var(--border-default)", paddingTop: 10, font: "var(--type-source)", color: "var(--text-muted)" }}><summary style={{ cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", fontWeight: 600 }}>Demo controls</summary><div style={{ paddingTop: 8 }}><CsButton variant="ghost" size="sm" onClick={approve}>Approve as admin</CsButton><div style={{ font: "var(--type-source)", color: "var(--text-faint)", marginTop: 6 }}>A person approves this in real use.</div></div></details>
  </div>;
  if (phase === "approved") return <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={window.psLabel}>Approved</div>
    <h1 style={window.psH1}>Your join code</h1>
    <div aria-label="Join code" style={{ font: "700 32px/1 var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-strong)", padding: 20, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "var(--surface-card)", textAlign: "center" }}>{code}</div>
    <p style={csP}>Share it only with pastors in this church.</p>
    <CsButton variant="primary" size="lg" fullWidth onClick={() => { cacheChurch({ ...f, name: f.name.trim(), code, status: "joined" }); done(); }}>Continue</CsButton>
  </div>;
  if (mode === "join") return <form onSubmit={submitJoin} style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 16 }}>
    <div><div style={window.psLabel}>Join your church</div><h1 style={{ ...window.psH1, marginTop: 6 }}>Join code</h1></div>
    <CsField label="Join code" value={joinCode} onChange={e => setJoinCode(e.target.value)} error={err || undefined} autoComplete="off" hint="From your church leader. Not listed publicly." />
    <CsButton type="submit" variant="primary" size="lg" fullWidth loading={phase === "sending"}>Join</CsButton>
    <button type="button" onClick={() => { setMode("register"); setErr(null); }} style={{ alignSelf: "flex-start", minHeight: 44, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 16px/1 var(--font-body)", color: "var(--lamp-400)" }}>Register a new church instead</button>
  </form>;
  return <form onSubmit={submit} style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 16 }}>
    <div><div style={window.psLabel}>Register a church</div><h1 style={{ ...window.psH1, marginTop: 6 }}>Your church</h1></div>
    <CsField label="Church name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} error={err || undefined} autoComplete="off" />
    <CsSelect label="Country" value={f.country} onChange={e => { const c = e.target.value; setF({ ...f, country: c, region: csRegions.find(r => r[0] === c)[1] }); }} options={csCountries.map(c => ({ value: c, label: c }))} />
    <CsSelect label="Broad region" value={f.region} onChange={e => setF({ ...f, region: e.target.value })} options={regions.map(r => ({ value: r, label: r }))} hint="Used only to send region alerts to the right churches. No street or address." />
    <p style={{ font: "600 16px/1.45 var(--font-body)", color: "var(--text-strong)", margin: 0, padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", display: "flex", gap: 8 }}><CsIcon name="eye-off" size={18} color="var(--lamp-400)" style={{ flex: "none", marginTop: 1 }} />This church is not listed publicly.</p>
    <CsButton type="submit" variant="primary" size="lg" fullWidth loading={phase === "sending"}>Send to an admin for approval</CsButton>
    <button type="button" onClick={() => { setMode("join"); setErr(null); }} style={{ alignSelf: "flex-start", minHeight: 44, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 16px/1 var(--font-body)", color: "var(--lamp-400)" }}>Have a join code instead</button>
  </form>;
}

function CheckinConsent({ onContinue }) {
  const [model, setModel] = React.useState(false), [plain, setPlain] = React.useState(false);
  return <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 18 }}>
    <div><div style={window.psLabel}>Before your first check-in</div><h1 style={{ ...window.psH1, marginTop: 6 }}>What a check-in is</h1></div>
    <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10, font: "var(--type-body)", color: "var(--text-body)" }}>
      <li>A short note on how you are, a few times a week, when you can. No streaks. Your mentor reads it.</li>
      <li>If a note sounds hard, a person reads it.</li>
      <li>The reviewer does not see your church name.</li>
    </ul>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "16px 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
      <CsSwitch label="The assistant may prepare my review" checked={model} onChange={setModel} />
      <CsSwitch label="After a hard note, show the plain page" checked={plain} onChange={setPlain} />
    </div>
    <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>You can check in either way.</p>
    <CsButton variant="accent" size="lg" fullWidth onClick={() => onContinue({ model, plain })}>Continue</CsButton>
  </div>;
}

const csRoles = [["mentor", "Mentor"], ["church", "Church leader"], ["regional", "Regional leader"]];
const csRole = k => (csRoles.find(r => r[0] === k) || [0, "Leader"])[1];
function csAlerts() { try { return (JSON.parse(localStorage.getItem("ca_alerts")) || []).map(a => ({ ...a, confirmedBy: Array.isArray(a.confirmedBy) ? a.confirmedBy : a.confirmedBy ? [a.confirmedBy] : [] })); } catch (e) { return []; } }

function csLog() { try { return JSON.parse(localStorage.getItem("ca_alert_log")) || []; } catch (e) { return []; } }
const csWhen = iso => { const d = new Date(iso); return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " · " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
const csAct = { raised: ["Raised", "flag"], confirmed: ["Confirmed", "check"], on: ["Turned on", "power"], cleared: ["Cleared", "x"] };

function CsSteps({ a }) {
  const steps = [["Raised", a.raisedBy], ["Confirmed", a.confirmedBy[0]], ["Confirmed", a.confirmedBy[1]]];
  const on = a.status === "on";
  return <ul aria-label="Leaders" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
    {steps.map(([lab, r], i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span aria-hidden="true" style={{ width: 32, height: 32, borderRadius: 99, display: "grid", placeItems: "center", background: r ? (on ? "var(--danger-tint)" : "var(--warn-tint)") : "transparent", border: r ? "none" : "1px dashed var(--border-strong)", color: r ? (on ? "var(--danger-400)" : "var(--warn-400)") : "var(--text-muted)" }}><CsIcon name={r ? "user-check" : "user"} size={16} /></span>
      <span style={{ font: "600 13px/1.3 var(--font-body)", color: r ? "var(--text-body)" : "var(--text-muted)" }}>{r ? csRole(r) : "Waiting"}</span>
    </li>)}
  </ul>;
}

const csLive = () => !!(window.CAApi && window.CAApi.isLive());
const csSplit = scope => { const [country, region] = String(scope).split(" — "); return { country, region: region || country }; };
const csFromApi = a => ({ id: a.id, ...csSplit(a.scope), note: a.reason, status: a.status, raisedBy: "leader", confirmedBy: Array(a.confirms || 0).fill("leader"), mine: a.mine });

function AlertsScreen() {
  const wide = window.useWide(900);
  const live = csLive();
  const [list, setListS] = React.useState(live ? [] : csAlerts);
  const [log, setLogS] = React.useState(live ? [] : csLog);
  const reload = () => Promise.all([window.CAApi.get("/alerts"), window.CAApi.get("/alerts/log")]).then(([l, g]) => {
    setListS((l || []).map(csFromApi)); setLogS((g || []).map(x => ({ at: x.at, action: x.action, role: "leader", ...csSplit(x.scope) })));
  });
  React.useEffect(() => { if (live) reload().catch(e => setMsg(e.message)); }, []);
  const api = (p, okMsg) => p.then(() => reload()).then(() => setMsg(okMsg), e => setMsg(e.message + (e.requestId ? ` · ${String(e.requestId).slice(0, 8)}` : "")));
  const write = (l, entry) => { setListS(l); localStorage.setItem("ca_alerts", JSON.stringify(l)); const nl = [{ at: new Date().toISOString(), ...entry }, ...log]; setLogS(nl); localStorage.setItem("ca_alert_log", JSON.stringify(nl)); setMsg({ raised: "Raised. Two more leaders must confirm.", confirmed: "Confirmed. One more leader is needed.", on: "Turned on.", cleared: "Cleared. Everything returns on the next fresh open." }[entry.action]); };
  const [me, setMe] = React.useState("church");
  const [raise, setRaise] = React.useState(false);
  const [sure, setSure] = React.useState(null); const [typedC, setTypedC] = React.useState(""); const [msg, setMsg] = React.useState(null); const [logN, setLogN] = React.useState(6);
  const [f, setF] = React.useState({ at: "Bangladesh|Dhaka Division", note: "" });
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => { const id = setTimeout(() => setReady(true), 350); return () => clearTimeout(id); }, []);
  const where = a => ({ country: a.country, region: a.region });
  const taken = f.at.split("|"); const dup = list.some(x => x.country === taken[0] && x.region === taken[1]);
  const send = e => { e.preventDefault(); if (dup) return; { const c = window.CAInput.check("alertNote", f.note, { optional: true }); if (!c.ok) { setMsg(c.msg); return; } } const [country, region] = f.at.split("|"); if (live) { api(window.CAApi.post("/alerts", { scope: `${country} — ${region}`, reason: f.note.trim() }), "Raised. Two more leaders must confirm."); setRaise(false); setF({ ...f, note: "" }); return; } const al = { id: Date.now(), country, region, note: f.note.trim(), status: "waiting", raisedBy: me, confirmedBy: [] }; write([al, ...list], { action: "raised", role: me, ...where(al) }); setRaise(false); setF({ ...f, note: "" }); };
  const confirm = a => { if (live) { api(window.CAApi.post(`/alerts/${encodeURIComponent(a.id)}/confirm`), a.confirmedBy.length >= 1 ? "Turned on." : "Confirmed. One more leader is needed."); return; } const cb = [...a.confirmedBy, me]; const on = cb.length >= 2; write(list.map(x => x.id === a.id ? { ...x, confirmedBy: cb, status: on ? "on" : "waiting" } : x), { action: on ? "on" : "confirmed", role: me, ...where(a) }); };
  const clear = a => { if (live) { api(window.CAApi.post(`/alerts/${encodeURIComponent(a.id)}/lift`), "Cleared. Everything returns on the next fresh open."); setSure(null); return; } write(list.filter(x => x.id !== a.id), { action: "cleared", role: me, ...where(a) }); setSure(null); };
  const done = a => live ? a.mine : a.raisedBy === me || a.confirmedBy.includes(me);
  const nOn = list.filter(x => x.status === "on").length, nWait = list.length - nOn;
  const card = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)" };
  return <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 760 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" }}>
      <div><div style={window.psLabel}>Leaders</div><h1 style={{ ...window.psH1, marginTop: 6 }}>Alerts</h1>
        <p style={{ ...csP, marginTop: 6 }}>{list.length ? `${nOn} on · ${nWait} waiting` : "Three leaders turn an alert on. Any leader can clear it."}</p></div>
      {!raise && <CsButton variant={list.some(x => x.status === "waiting") ? "secondary" : "primary"} icon="plus" onClick={() => setRaise(true)}>Raise an alert</CsButton>}
    </div>
    {msg && <div role="status" style={{ display: "flex", gap: 10, alignItems: "center", padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", font: "600 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}><CsIcon name="circle-check" size={18} color="var(--ok-400)" />{msg}</div>}
    <details data-demo="" style={{ borderTop: "1px dashed var(--border-default)", paddingTop: 10, font: "var(--type-source)", color: "var(--text-muted)" }}><summary style={{ cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", fontWeight: 600 }}>Demo controls</summary><div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", paddingTop: 8 }}>See this screen as <CsSeg size="sm" label="See this screen as" value={me} onChange={setMe} options={csRoles.map(([v, l]) => ({ value: v, label: l }))} /></div></details>
    {raise && <form onSubmit={send} style={{ ...card, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0 }}>Raise an alert</h2>
      <CsSelect label="Region" value={f.at} onChange={e => setF({ ...f, at: e.target.value })} options={csRegions.map(([c, r]) => ({ value: c + "|" + r, label: `${c} · ${r}` }))} error={dup ? "This region already has an alert." : undefined} />
      <CsArea label="Note for leaders" rows={2} maxLength={140} value={f.note} onChange={e => setF({ ...f, note: e.target.value })} hint="Leaders only. No names." />
      <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ font: "600 13px/1.4 var(--font-body)", color: "var(--text-strong)" }}>Two more leaders must confirm. Then, until it is cleared:</span>
        <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Pastors in the region open to a plain page. Everyone else loses Faith mode, the map, the monthly question, check-ins, reviews and registration.</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}><CsButton type="submit" variant="primary" disabled={dup}>Raise</CsButton><CsButton type="button" variant="ghost" onClick={() => setRaise(false)}>Cancel</CsButton></div>
    </form>}
    {!ready ? <CsState kind="loading" compact /> : list.length === 0 ? <CsState kind="empty" compact word="quiet" motif="people" title="No alerts" message="Every region is open as usual." /> :
    <div role="list" aria-label="Alerts" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {list.map(a => <div role="listitem" key={a.id} style={{ ...card, padding: 18, display: "flex", flexDirection: "column", gap: 14, borderColor: a.status === "on" ? "var(--danger-400)" : "var(--border-subtle)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <div style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{a.country}</div>
            <div style={{ font: "700 24px/1.2 var(--font-display)", color: "var(--text-strong)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.region}</div>
          </div>
          <CsBadge tone={a.status === "on" ? "danger" : "warn"}>{a.status === "on" ? "On" : `Waiting · ${2 - a.confirmedBy.length} more`}</CsBadge>
        </div>
        <CsSteps a={a} />
        {a.note && <p style={{ ...csP, fontSize: 16, color: "var(--text-body)", padding: 12, borderRadius: "var(--radius-md)", background: "var(--surface-page)" }}>{a.note}</p>}
        {sure === a.id ? <div style={{ display: "flex", flexDirection: "column", gap: 10 }}><span style={{ font: "600 13px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Clear {a.region}? Everything returns on the next fresh open.</span><window.CATypeConfirm word={a.region} value={typedC} onChange={setTypedC} hint="The clear is kept in the record." /><div style={{ display: "flex", gap: 8 }}><CsButton size="sm" variant="danger" disabled={!window.CAMatch(typedC, a.region)} onClick={() => { setTypedC(""); clear(a); }}>Clear</CsButton><CsButton size="sm" variant="ghost" onClick={() => { setTypedC(""); setSure(null); }}>Keep</CsButton></div></div>
        : <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {a.status === "waiting" && <CsButton size="sm" variant="primary" icon={done(a) ? undefined : "check"} disabled={done(a)} onClick={() => confirm(a)}>{done(a) ? "Needs another leader" : "Confirm"}</CsButton>}
          <CsButton size="sm" variant="ghost" onClick={() => setSure(a.id)}>Clear</CsButton>
        </div>}
      </div>)}
    </div>}
    <section aria-label="Record" style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 6 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0, flex: 1 }}>Record</h2><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>Kept. Cannot be edited.</span></div>
      {log.length === 0 ? <p style={{ ...csP, fontSize: 16 }}>Nothing recorded yet.</p> :
      <ol style={{ listStyle: "none", margin: 0, padding: 0, ...card, overflow: "hidden" }}>{log.slice(0, logN).map((l, i) => { const [lab, ic] = csAct[l.action] || [l.action, "dot"];
        return <li key={i} style={{ display: "grid", gridTemplateColumns: wide ? "150px 28px minmax(0,1fr)" : "28px minmax(0,1fr)", gap: 10, alignItems: "center", padding: "10px 14px", borderTop: i ? "1px solid var(--border-subtle)" : 0, font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}>
          {wide && <span style={{ font: "var(--type-source)", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{csWhen(l.at)}</span>}
          <CsIcon name={ic} size={16} color={l.action === "on" ? "var(--danger-400)" : l.action === "cleared" ? "var(--ok-400)" : "var(--text-muted)"} />
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}><span><b style={{ color: "var(--text-strong)" }}>{lab}</b> · {l.country} · {l.region}</span><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>by a {csRole(l.role).toLowerCase()}{wide ? "" : " · " + csWhen(l.at)}</span></span>
        </li>; })}</ol>}
      {log.length > logN && <div><CsButton size="sm" variant="secondary" onClick={() => setLogN(logN + 6)}>Load more · {log.length - logN} left</CsButton></div>}
    </section>
  </div>;
}

function PfUnavailable() {
  const retry = () => { const h = new URLSearchParams(location.hash.slice(1)); h.delete("state"); location.hash = h.toString(); location.reload(); };
  return <div role="status" style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", paddingTop: 24 }}>
    <p style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)", margin: 0 }}>Unavailable</p>
    <CsButton variant="primary" icon="rotate-cw" onClick={retry}>Retry</CsButton>
  </div>;
}

Object.assign(window, { RegisterChurch, CheckinConsent, AlertsScreen, PfUnavailable, csChurch, csAlerts });
