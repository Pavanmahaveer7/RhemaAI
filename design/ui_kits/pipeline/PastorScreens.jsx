const { SeasonRing: PsRing, PackPieces: PsPieces, Card: PsCard, Button: PsButton, StageTrack: PsStage, Tag: PsTag, Icon: PsIcon, TextArea: PsArea, TextField: PsField, Radio: PsRadio, SegmentedControl: PsSeg, StateBlock: PsState, Select: PsSelect } = window.ChurchAIDesignSystem_06db43;

const psLabel = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" };
const psH1 = { font: "600 32px/1.2 var(--font-display)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", margin: 0 };
const psRow = { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderTop: "1px solid var(--border-subtle)", font: "var(--type-body)", color: "var(--text-body)" };

function PsSrc({ src }) { return src ? <span style={{ font: "var(--type-source)", color: "var(--info-400)", display: "inline-flex", gap: 4, alignItems: "center" }}><PsIcon name="link-2" size={16} />{src}</span> : <span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>added here</span>; }

function ConnectCard({ pco, go }) {
  const ctry = ((window.csChurch && window.csChurch()) || window.CA_PIPE.me || {}).country;
  if (!window.CA_DEMO && ctry !== "United States") return null;
  return <PsCard eyebrow="Church app · US churches, optional" title="Connect church app" action={<span style={{ display: "inline-flex", gap: 6, alignItems: "center", font: "600 13px/1 var(--font-body)", color: pco ? "var(--ok-400)" : "var(--text-faint)" }}><PsIcon name={pco ? "circle-check" : "circle-dashed"} size={16} />{pco === "demo" ? "Demo church" : pco ? "Planning Center connected" : "Not connected"}</span>}>
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: "0 0 14px" }}>{pco ? "Ministry and community rows come from Planning Center. Optional, for US churches. It cannot move your stage." : "Bring in services and attendance. Until then, you add ministry rows by hand."}</p>
    <PsButton variant="secondary" iconRight="arrow-right" onClick={() => go("integrations")}>{pco ? "Manage church apps" : "Connect church app"}</PsButton>
  </PsCard>;
}

(() => { if (document.getElementById("ps-kf")) return; const st = document.createElement("style"); st.id = "ps-kf";
  st.textContent = "@keyframes ps-pop{0%{scale:.6;opacity:0}60%{scale:1.12;opacity:1}100%{scale:1}}@keyframes ps-glow{0%{box-shadow:0 0 0 0 var(--lamp-tint)}100%{box-shadow:0 0 0 8px transparent}}@keyframes ps-halo{0%,100%{stroke-opacity:.18}50%{stroke-opacity:.6}}@keyframes ps-settle{0%{translate:0 -10px;opacity:0}100%{translate:0 0;opacity:1}}@media (prefers-reduced-motion:reduce){[data-ps-anim]{animation:none!important}}[data-reduce-motion] [data-ps-anim]{animation:none!important}";
  document.head.appendChild(st); })();
function psSeen() { try { return JSON.parse(localStorage.getItem("ca_start_seen")) || []; } catch (e) { return []; } }

function StartHere({ go, joined, ckDone, pco, ckToday }) {
  const [seen] = React.useState(psSeen);
  React.useEffect(() => { const d = [joined && "join", ckDone && "ck", pco && "pco"].filter(Boolean); localStorage.setItem("ca_start_seen", JSON.stringify(d)); }, [joined, ckDone, pco]);
  const keyOf = ["join", "ck", "pco"];
  const steps = [["Join your church", "building-2", joined, "register"], ["Do your first check-in", "heart-handshake", ckDone, "checkin"], ["Connect your church app", "plug", !!pco, "integrations"]];
  const left = steps.filter(s => !s[2]).length;
  const next = steps.findIndex(s => !s[2]);
  if (!left) return <PsCard title={ckToday ? "Checked in" : "Today"}>
    {ckToday ? <p style={{ margin: 0, display: "flex", gap: 10, alignItems: "center", font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-body)" }}><span aria-hidden="true" style={{ width: 36, height: 36, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--ok-tint)", color: "var(--ok-400)" }}><PsIcon name="check" size={18} /></span>Thank you. See you tomorrow.</p>
    : <><p style={{ margin: 0, font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-body)" }}>Two minutes. Your mentor reads it.</p><div><PsButton variant="accent" icon="heart-handshake" onClick={() => go("checkin")}>Check in for today</PsButton></div></>}
  </PsCard>;
  return <PsCard title="Start here">
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>{3 - left} of 3 done.</p>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>{steps.map(([t, ic, done, to], i) => { const isNext = i === next; return <li key={t} style={{ borderTop: i ? "1px solid var(--border-subtle)" : 0 }}>
      <button onClick={() => !done && go(to)} disabled={done} style={{ width: "100%", minHeight: 56, display: "flex", alignItems: "center", gap: 14, padding: "8px 0", background: "none", border: 0, cursor: done ? "default" : "pointer", color: "inherit", textAlign: "left" }}>
        <span aria-hidden="true" data-ps-anim="" style={{ width: 40, height: 40, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: done ? "var(--ok-tint)" : isNext ? "var(--lamp-400)" : "var(--surface-raised)", color: done ? "var(--ok-400)" : isNext ? "var(--ink-0)" : "var(--text-muted)", animation: done && !seen.includes(keyOf[i]) ? "ps-pop 620ms cubic-bezier(.34,1.56,.64,1) 300ms both" : "none" }}><PsIcon name={done ? "check" : ic} size={18} /></span>
        <span style={{ flex: 1, font: `${isNext ? 700 : 400} 16px/1.3 var(--font-body)`, color: isNext ? "var(--text-strong)" : "var(--text-muted)" }}>{t}{done && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>, done</span>}</span>
        {isNext ? <span style={{ height: 36, padding: "0 16px", display: "inline-flex", alignItems: "center", borderRadius: 999, background: "var(--lamp-400)", color: "var(--ink-0)", font: "700 13px/1 var(--font-body)", flex: "none" }}>Start</span> : !done && <PsIcon name="chevron-right" size={18} color="var(--text-muted)" />}
      </button></li>; })}</ul>
  </PsCard>;
}

function WhatWeHeard() {
  const D = window.CA_DATA; if (!D) return null;
  const pub = D.months.filter(m => m.published); const cur = pub[pub.length - 1], prev = pub[pub.length - 2]; if (!cur) return null;
  const W = m => Object.fromEntries((m ? m.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const a = W(prev), b = W(cur);
  const rose = Object.keys(b).filter(k => a[k]).map(k => [k, b[k] - a[k]]).filter(x => x[1] > 0).sort((x, y) => y[1] - x[1]).slice(0, 2).map(x => x[0]);
  const fresh = Object.keys(b).filter(k => !a[k]).slice(0, 2);
  const top = Object.keys(b).sort((x, y) => b[y] - b[x])[0];
  const mon = cur.label.split(" ")[0];
  const lines = [rose.length && ["arrow-up-right", "var(--ok-400)", `${rose.join(" and ")} came up more than last month.`], fresh.length && ["circle-plus", "var(--lamp-400)", `${fresh.join(" and ")} appeared for the first time.`]].filter(Boolean);
  const prompts = [`Where did you notice ${top} this month?`, fresh[0] ? `What would you want someone to know about ${fresh[0]}?` : `What does ${cur.term || "faith"} look like on a hard day?`, "Who could you check on this week?"];
  return <PsCard title={`What we heard in ${mon}`}>
    <p style={{ margin: 0, font: "var(--type-source)", color: "var(--text-muted)" }}>From the monthly question in your region. Ideas only, never who said them.</p>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>{lines.map(([ic, c, t]) => <li key={t} style={{ display: "flex", gap: 12, alignItems: "center" }}><span aria-hidden="true" style={{ width: 36, height: 36, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", color: c }}><PsIcon name={ic} size={18} /></span><span style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{t}</span></li>)}</ul>
    <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
      <span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>For Sunday or a small group</span>
      <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6, font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-body)" }}>{prompts.map(p => <li key={p}>{p}</li>)}</ol>
    </div>
  </PsCard>;
}

function MentorNote() {
  const n = window.CA_PIPE.me.mentorNote; if (!n) return null;
  const k = "ca_note_seen_" + n.id; const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [fresh] = React.useState(() => !rm && !localStorage.getItem(k));
  const [on, setOn] = React.useState(!fresh);
  const ref = React.useRef(null);
  React.useEffect(() => { if (!fresh || !ref.current) return; let id; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); localStorage.setItem(k, "1"); id = setTimeout(() => setOn(true), 400); } }, { threshold: 0.6 }); io.observe(ref.current); return () => { io.disconnect(); clearTimeout(id); }; }, []);
  return <section ref={ref} aria-label="From your mentor" style={{ padding: 20, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span aria-hidden="true" style={{ width: 32, height: 32, borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", color: "var(--bridge-400)" }}><PsIcon name="pencil" size={16} /></span><span style={{ flex: 1, font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>From your mentor</span><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{n.date}</span></div>
    <p style={{ margin: 0, font: "400 24px/1.4 var(--font-hand)", color: "var(--bone-8)" }}>{n.text.split(" ").map((w, i) => <span key={i} style={{ opacity: on ? 1 : 0, transition: fresh ? `opacity 700ms var(--ease-out) ${i * 110}ms` : "none" }}>{w} </span>)}</p>
    <div><PsButton size="sm" variant="secondary" icon="messages-square" onClick={() => window.CATalkMentor()}>Message your mentor</PsButton></div>
  </section>;
}

function SeasonLetter({ stage }) {
  const k = "ca_letter_" + stage; const [open, setOpen] = React.useState(() => !localStorage.getItem(k));
  if (!open) return null;
  const name = window.CA_PIPE.stages[stage];
  return <div data-ps-anim="" style={{ animation: "ps-settle 700ms cubic-bezier(.22,.61,.36,1) 1500ms both" }}><PsCard title={`A new season: ${name}`}>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-body)" }}>
      <p style={{ margin: 0 }}>Your leaders agreed you are ready for {name.toLowerCase()}.</p>
      <p style={{ margin: 0 }}>Nothing about how you are cared for changes. Your mentor still reads your check-ins.</p>
      <p style={{ margin: 0, color: "var(--text-muted)" }}>“He who began a good work in you will carry it on to completion.” Philippians 1:6</p>
    </div>
    <div><PsButton size="sm" variant="secondary" onClick={() => { localStorage.setItem(k, "1"); setOpen(false); }}>Keep this</PsButton></div>
  </PsCard></div>;
}

function PastorHome({ go, church, stage, pco, setPco, decision, joined, ckDone }) {
  const me = window.CA_PIPE.me, wide = window.useWide(900);
  const outcome = { continue: "Continue", plan: "Development plan", additional: "Additional review" };
  const history = decision ? [["Today", `Leadership review: ${outcome[decision]}${decision === "continue" ? ` · moved to ${window.CA_PIPE.stages[stage]}` : ""}`], ...me.history] : me.history;
  const rows = [
    ["heart-handshake", "Check in for today", "Two minutes. Your mentor reads it.", "checkin"],
    ["file-text", "September pack", pco ? "4 of 5 pieces in" : "3 of 5 pieces in", "pack"],
    ["plug", "Church app", pco === "demo" ? "Demo church" : pco ? "Planning Center connected" : "Not connected", "integrations"],
  ];
  return <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <div>
      <h1 style={{ ...psH1, fontSize: 32 }}>Good morning.</h1>
      {church && <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: "6px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{church}</p>}
    </div>
    <PsCard>
      <div style={{ display: "flex", justifyContent: "center" }}><PsRing glow={new URLSearchParams(location.hash.slice(1)).get("anniv") === "1"} grow={decision === "continue" && !localStorage.getItem("ca_letter_" + stage)} current={stage} since={stage === 1 ? "since Jun 2026" : "from today"} caption={false} /></div>
      {new URLSearchParams(location.hash.slice(1)).get("anniv") === "1" && <p style={{ margin: 0, textAlign: "center", font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-strong)" }}>One year in {window.CA_PIPE.stages[stage]}. Thank you for staying.</p>}
      <p style={{ font: "var(--type-pastoral)", color: "var(--text-body)", margin: 0 }}>Your mentor walks with you this season. Your stage changes only when your leaders decide together.</p>
    </PsCard>
    {decision === "continue" && !localStorage.getItem("ca_letter_" + stage) && <SeasonLetter stage={stage} />}
    <StartHere go={go} joined={joined} ckDone={ckDone} pco={pco} ckToday={ckDone} />
    {new URLSearchParams(location.hash.slice(1)).get("note") !== "0" && <MentorNote />}
    {!window.matchMedia("(min-width: 900px)").matches && <nav aria-label="More" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{[["Tracks", "columns-3", "tracks"], [`${window.CA_PIPE.pack.month.split(" ")[0]} pack`, "file-text", "pack"], ["Church app", "plug", "integrations"]].map(([l, ic, to]) => <button key={to} onClick={() => go(to)} style={{ height: 44, padding: "0 16px", display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid var(--border-default)", background: "transparent", color: "var(--text-body)", font: "600 16px/1 var(--font-body)", cursor: "pointer", whiteSpace: "nowrap" }}><PsIcon name={ic} size={18} />{l}</button>)}</nav>}
    <section aria-labelledby="ps-story">
      <h2 id="ps-story" style={{ font: "var(--type-label)", color: "var(--text-muted)", margin: "0 0 4px" }}>Your story so far</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{history.slice(0, 3).map(([dd, t]) => <li key={dd + t} style={{ ...psRow, color: "var(--text-muted)" }}><span style={{ font: "var(--type-source)", width: 72, flex: "none" }}>{dd}</span>{t}</li>)}</ul>
    </section>
  </div>;
}

function PastorTracks({ go, pco }) {
  const T0 = window.CA_PIPE.tracks; const T = { ...T0, ministry: pco ? T0.ministry : T0.ministry.filter(r => !r.src) }, wide = window.useWide(1000);
  return <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div><div style={psLabel}>Pastor development</div><h1 style={{ ...psH1, marginTop: 6 }}>Three tracks</h1><p style={{ margin: "8px 0 0", font: "var(--type-body)", fontSize: 17, color: "var(--text-muted)", textWrap: "pretty" }}>Training, ministry, and character — side by side. Switch tabs below any time.</p>
      {window.CAHasLeaderCap && window.CAHasLeaderCap() && go && <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}><PsButton variant="secondary" icon="siren" onClick={() => go("alerts")}>Regional alerts</PsButton><span style={{ font: "var(--type-source)", color: "var(--text-muted)", maxWidth: 420 }}>Raise, confirm, or clear a regional alert for your area.</span></div>}
    </div>
    {!wide && <nav aria-label="Jump to track" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: -8 }}>{[["Training", "trk-training"], ["Ministry", "trk-ministry"], ["Character", "trk-character"]].map(([l, id]) => <a key={id} href={"#" + id} onClick={e => { e.preventDefault(); const el = document.getElementById(id); el && window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 76, behavior: "smooth" }); }} style={{ minHeight: 44, display: "inline-flex", alignItems: "center", padding: "0 14px", borderRadius: 999, border: "1px solid var(--border-default)", color: "var(--text-body)", font: "600 13px/1 var(--font-body)", textDecoration: "none" }}>{l}</a>)}</nav>}
    <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3,minmax(0,1fr))" : "1fr", gap: 16, alignItems: "start" }}>
      <div id="trk-training" style={{ minWidth: 0 }}>
        <PsCard eyebrow="Training" title="Courses">
          {T.training.map(c => <div key={c.t} style={{ ...psRow, flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", width: "100%", gap: 8 }}><span style={{ flex: 1 }}>{c.t}</span>{c.cert && <PsTag tone="lamp">Certificate</PsTag>}</div>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center", font: "600 13px/1 var(--font-body)", color: c.p === 100 ? "var(--ok-400)" : c.p > 0 ? "var(--text-body)" : "var(--text-muted)" }}><PsIcon name={c.p === 100 ? "circle-check" : c.p > 0 ? "circle-dot" : "circle-dashed"} size={16} />{c.p === 100 ? "Done" : c.p > 0 ? "In progress" : "Not started"}</span>
          </div>)}
          <div style={{ ...psLabel, marginTop: 14, marginBottom: 2 }}>Documents</div>
          {T.documents.map(([n, f]) => <a key={n} href="#" onClick={e => e.preventDefault()} style={{ ...psRow, alignItems: "center", textDecoration: "none" }}><PsIcon name="file-text" size={18} color="var(--text-muted)" /><span style={{ flex: 1 }}>{n}</span><PsIcon name="external-link" size={16} color="var(--text-faint)" /></a>)}
        </PsCard>
      </div>
      <div id="trk-ministry" style={{ minWidth: 0 }}>
        <PsCard eyebrow="Ministry" title="What you did">
          {!pco && <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: "0 0 8px" }}>Planning Center is not connected. Service plans will appear here once it is.</p>}
          {T.ministry.map(r => <div key={r.t} style={{ ...psRow, flexDirection: "column", gap: 4 }}><span>{r.t}</span><span style={{ display: "flex", gap: 10 }}><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{r.d}</span><PsSrc src={r.src} /></span></div>)}
        </PsCard>
      </div>
      <div id="trk-character" style={{ minWidth: 0 }}>
        <PsCard eyebrow="Character" title="Notes for you">
          {T.character.map(r => <div key={r.t} style={{ ...psRow, flexDirection: "column", gap: 4 }}><span style={psLabel}>{r.k}</span><span style={{ fontWeight: 700 }}>{r.t}</span><span style={{ color: "var(--text-muted)" }}>{r.n}</span><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{r.d}</span></div>)}
          <div style={{ ...psRow, alignItems: "center" }}><PsIcon name="heart-handshake" size={18} color="var(--lamp-400)" /><span style={{ flex: 1 }}>Check-ins this month: {T.checkins.count} of {T.checkins.days} days</span>{go && <PsButton size="sm" variant="ghost" onClick={() => go("checkin")}>Log today’s check-in</PsButton>}</div>
        </PsCard>
      </div>
    </div>
  </div>;
}

function PsPiece({ ok, title, children }) {
  return <section style={{ padding: "18px 0", borderTop: "1px solid var(--border-subtle)" }}>
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
      <PsIcon name={ok ? "circle-check" : "circle-dashed"} size={20} color={ok ? "var(--ok-400)" : "var(--text-faint)"} />
      <h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0, flex: 1 }}>{title}</h2>
      {!ok && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Waiting on this piece</span>}
    </div>
    <div style={{ paddingLeft: 30 }}>{children}</div>
  </section>;
}

function PastorPack({ pco }) {
  const P0 = window.CA_PIPE.pack; const P = { ...P0, community: P0.community.map(([k, v, s]) => pco || !s ? [k, v, s] : [k, "Not in yet. Connect Planning Center or add it by hand.", null]) };
  const [tab, setTab] = React.useState("pack");
  const icon = { form: "file-text", certificate: "award", receipt: "receipt", sermon: "mic", review: "clipboard-check", support: "paperclip" };
  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
      <div><div style={psLabel}>Monthly pack</div><h1 style={{ ...psH1, marginTop: 6 }}>{P.month}</h1></div>
      <PsSeg size="sm" label="Pack section" value={tab} onChange={setTab} options={[{ value: "pack", label: "Pack" }, { value: "community", label: "Community" }, { value: "evidence", label: "Evidence" }]} />
    </div>
    {tab === "pack" && <WhatWeHeard />}
    {tab === "pack" && <div>
      <PsPiece ok title="Report">
        <div style={{ font: "var(--type-body)", color: "var(--text-body)", display: "grid", gap: 6 }}><span>{P.report.activities} activities this month</span><span style={{ color: "var(--text-muted)" }}>Challenge: {P.report.challenges}</span><span style={{ color: "var(--text-muted)" }}>Progress: {P.report.progress}</span></div>
      </PsPiece>
      <PsPiece ok={false} title="Feedback">
        {P.feedback.map(([w, s]) => <div key={w} style={{ display: "flex", justifyContent: "space-between", minHeight: 36, alignItems: "center", font: "var(--type-body)", color: s === "in" ? "var(--text-body)" : "var(--text-muted)" }}>{w}<span style={{ font: "var(--type-source)" }}>{s === "in" ? "Received" : "Church leaders have not sent theirs yet"}</span></div>)}
      </PsPiece>
      
    </div>}
    {tab === "community" && <PsCard>{P.community.map(([k, v, src], i) => <div key={k} style={{ ...psRow, borderTop: i ? psRow.borderTop : 0, flexWrap: "wrap" }}><span style={{ ...psLabel, width: 150, flex: "none", paddingTop: 4 }}>{k}</span><span style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 4 }}>{v}<PsSrc src={src} /></span></div>)}</PsCard>}
    {tab === "evidence" && <PsCard>{P.evidence.map(([k, t, f], i) => <a key={t} href="#" onClick={e => e.preventDefault()} style={{ ...psRow, borderTop: i ? psRow.borderTop : 0, alignItems: "center", textDecoration: "none" }}><PsIcon name={icon[k]} size={20} color="var(--text-muted)" /><span style={{ flex: 1 }}>{t}</span><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{f}</span><PsIcon name="external-link" size={16} color="var(--text-faint)" /></a>)}</PsCard>}
  </div>;
}

function useEscPlain() { React.useEffect(() => { const k = ev => { if (ev.key === "Escape" && !ev.defaultPrevented && !document.querySelector('[role="dialog"], [role="listbox"], [role="menu"]')) window.CAGuard.plain(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []); }
function PsClose() { return <button type="button" onClick={() => window.CAGuard.plain()} aria-label="Close" style={{ width: 44, height: 44, flex: "none", display: "grid", placeItems: "center", background: "none", border: 0, borderRadius: 99, color: "var(--text-muted)", cursor: "pointer" }}><PsIcon name="x" size={20} /></button>; }
function PastorCheckin({ f, setF, demo, setDemo, onSend }) {
  useEscPlain();
  const [, rr] = React.useReducer(x => x + 1, 0); React.useEffect(() => { window.addEventListener("ca-lang", rr); return () => window.removeEventListener("ca-lang", rr); }, []);
  const set = k => v => setF(s => ({ ...s, [k]: v }));
  const [err, setErr] = React.useState(null);
  const submit = e => { e.preventDefault(); const c = window.CAInput.check("checkin", f.struggles, { optional: true }); if (!c.ok) { setErr(c.msg); return; } setErr(null); onSend(); };
  return <form onSubmit={submit} style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 22 }}>
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><div style={{ flex: 1 }}><div style={psLabel}>{window.CAtr("Check-in · when you can")}</div><h1 style={{ ...psH1, marginTop: 6 }}>{(window.CAT && window.CAT("title")) || "How was today?"}</h1></div><window.CALangPick /><PsClose /></div>
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)", marginBottom: 10 }}>{(window.CAT && window.CAT("usual")) || "Compared with a usual day?"}</legend>
      <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 8 }}>{[[5, "Much lighter than usual"], [4, "Lighter than usual"], [3, "About usual"], [2, "Heavier than usual"], [1, "Much heavier than usual"]].map(([n, w]) => <button type="button" role="radio" key={n} aria-checked={f.mood === n} onClick={() => set("mood")(n)} style={{ minHeight: 56, padding: "0 16px", display: "flex", alignItems: "center", gap: 12, textAlign: "left", borderRadius: "var(--radius-md)", border: `1px solid ${f.mood === n ? "var(--lamp-400)" : "var(--border-default)"}`, background: "linear-gradient(var(--lamp-tint), var(--lamp-tint)) no-repeat left / " + (f.mood === n ? "100%" : "0%") + " 100%, var(--surface-card)", transition: "background-size 520ms cubic-bezier(.22,.61,.36,1), border-color 300ms var(--ease-out)", color: f.mood === n ? "var(--text-strong)" : "var(--text-body)", font: "600 16px/1.3 var(--font-body)", cursor: "pointer" }}><span aria-hidden="true" style={{ width: 22, height: 22, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", border: `2px solid ${f.mood === n ? "var(--lamp-400)" : "var(--border-strong)"}` }}>{f.mood === n && <span style={{ width: 10, height: 10, borderRadius: 99, background: "var(--lamp-400)" }}></span>}</span>{window.CAtr(w)}</button>)}</div>
    </fieldset>
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)", marginBottom: 6 }}>{window.CAtr("Did you pray today?")}</legend>
      <div style={{ display: "flex", gap: 20 }}><PsRadio name="prayed" label={window.CAtr("Yes")} checked={f.prayed === "yes"} onChange={() => set("prayed")("yes")} /><PsRadio name="prayed" label={window.CAtr("Not today")} checked={f.prayed === "no"} onChange={() => set("prayed")("no")} /></div>
    </fieldset>
    <PsField label={window.CAtr("Visits made today")} hint={window.CAtr("Pastoral visits or calls. 0 is fine.")} type="number" inputMode="numeric" value={f.visits} onChange={e => set("visits")(e.target.value)} />
    <PsArea error={err || undefined} label={(window.CAT && window.CAT("hard")) || "What was hard?"} rows={3} maxLength={500} value={f.struggles} onChange={e => set("struggles")(e.target.value)} />
    <PsArea label={(window.CAT && window.CAT("well")) || "What went well?"} rows={3} maxLength={500} value={f.wins} onChange={e => set("wins")(e.target.value)} />
    <details data-demo="" style={{ borderTop: "1px dashed var(--border-default)", paddingTop: 10, font: "var(--type-source)", color: "var(--text-muted)" }}><summary style={{ cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center", fontWeight: 600 }}>Demo controls</summary><div style={{ paddingTop: 8 }}><PsSelect label="Result to show" value={demo} onChange={e => setDemo(e.target.value)} options={[{ value: "steady", label: "Steady" }, { value: "hard", label: "Hard note" }, { value: "failed", label: "Failed" }]} hint="Pastors never see this. Crisis words always go to a person." /></div></details>
    <PsButton type="submit" variant="accent" size="lg" fullWidth>{(window.CAT && window.CAT("send")) || "Send check-in"}</PsButton>
  </form>;
}

Object.assign(window, { useEscPlain, PsClose, PastorHome, PastorTracks, PastorPack, PastorCheckin, psLabel, psH1, psRow });

window.CATalkMentor = () => { const el = document.createElement("div"); el.setAttribute("role", "status"); el.textContent = window.CAtr("Sent. Your mentor will reach out today. Only your mentor sees this."); Object.assign(el.style, { position: "fixed", left: "50%", bottom: "84px", transform: "translateX(-50%)", zIndex: 200, maxWidth: "min(92vw,420px)", padding: "12px 16px", borderRadius: "14px", background: "var(--surface-raised)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-overlay)", font: "600 16px/1.35 var(--font-body)", color: "var(--text-strong)" }); document.body.appendChild(el); setTimeout(() => el.remove(), 3200); };
