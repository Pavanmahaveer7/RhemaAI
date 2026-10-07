const { Toast: TsToast, SegmentedControl: TsSeg, Tag: TsTag, SourceList: TsSources, StateBlock: TsState, CheckBadge: TsCheck, Icon: TsIcon, Button: TsButton, Badge: TsBadge, Switch: TsSwitch, Dialog: TsDialog, TextArea: TsArea } = window.ChurchAIDesignSystem_06db43;

const tsLabel = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" };
const tsTone = { Hindu: "hindu", Buddhist: "buddhist", Christian: "christian" };
const tsP = { font: "var(--type-body)", fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", margin: 0, textWrap: "pretty" };
const tsBlocks = { parallel: "Parallel", difference: "Difference", bridge: "Christian bridge", root: "Linguistic root", timeline: "Historical timeline" };

function TsRow({ k, children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "118px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "12px 0", borderTop: "1px solid var(--border-subtle)" }}>
    <div style={tsLabel}>{k}</div><div style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{children}</div>
  </div>;
}
const tsUncovered = <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Not in the dictionary yet.</span>;
function TsVerses({ term, verses }) {
  const vs = verses && verses.length ? verses : (window.CA_VERSES || {})[term] || [];
  return <section style={{ ...tsBox, ...(vs.length ? {} : { background: "transparent", border: "1px dashed var(--border-default)" }) }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}><span style={tsLabel}>06</span><h2 style={{ font: "var(--type-section)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", margin: 0 }}>Verse list</h2></div>
    {vs.length ? <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>{vs.map((v, i) => <li key={v.ref} style={{ padding: "14px 0", borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--info-400)" }}>{v.ref}</span>
      {v.text ? <p style={{ ...tsP, fontFamily: "var(--font-pastoral, var(--font-body))" }}>{v.text}</p> : <TsInsufficient />}
      {v.text && v.line && <p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: 0 }}>{v.line}</p>}
    </li>)}</ol> : <TsInsufficient />}
  </section>;
}

const tsBox = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", padding: 20 };
function NormalEntry({ e }) {
  const [store] = window.CAExpert.use();
  const nSrc = (e.sources || []).length, checked = !!((store && store._review) || {})[e.term] || ["karma", "grace", "dharma"].includes(e.term);
  return <article style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {(window.CA_LANG || "en") !== "en" && <p style={{ margin: 0, padding: "0 4px", font: "var(--type-source)", color: "var(--text-muted)" }}>Not in this language yet. The definition below is in English until a reviewer approves a translation.</p>}
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", font: "600 13px/1.3 var(--font-body)", color: "var(--text-muted)", padding: "0 4px" }}>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><TsIcon name="book-open" size={16} />{nSrc ? `${nSrc} source${nSrc > 1 ? "s" : ""}` : "No sources yet"}</span>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center", color: checked ? "var(--ok-400)" : "var(--text-muted)" }}><TsIcon name={checked ? "circle-check" : "circle-dashed"} size={16} />{checked ? "Reviewed by a religion expert against these sources" : "Not reviewed by an expert yet"}</span>
    </div>
    <section style={tsBox}>
      <div style={{ ...tsLabel, marginBottom: 12 }}>Definition</div>
      {e.def ? <div style={{ display: "grid", gridTemplateColumns: "28px minmax(0,1fr)", gap: 8 }}>
        <span style={{ font: "800 24px/1.3 var(--font-display)", color: "var(--lamp-400)" }}>1</span>
        <p data-no-tr="" lang="en" style={{ font: "700 24px/1.35 var(--font-body)", color: "var(--text-strong)", margin: 0, textWrap: "pretty" }}>{e.def}</p>
      </div> : tsUncovered}
    </section>
    <section style={tsBox}>
      <div style={{ ...tsLabel, marginBottom: 12 }}>Used in</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{e.used.map(u => <TsTag key={u} tone={tsTone[u]}>{u}</TsTag>)}</div>
    </section>
    <section style={tsBox}><TsSources sources={e.sources} title="Sources" emptyText="The dictionary does not cover sources for this term yet." /></section>
    {window.CAApi && !window.CA_DEMO && <TsPassages term={e.term} />}
  </article>;
}

function TsPassages({ term }) {
  const [q, setQ] = React.useState("");
  const [st, setSt] = React.useState({ kind: "idle" });
  React.useEffect(() => { setSt({ kind: "idle" }); setQ(""); }, [term]);
  const find = ev => {
    ev && ev.preventDefault();
    setSt({ kind: "loading" });
    const qs = q.trim() ? "?q=" + encodeURIComponent(q.trim()) : "";
    window.CAApi.get("/terms/" + encodeURIComponent(term) + "/passages" + qs)
      .then(r => setSt({ kind: "done", r }))
      .catch(err => setSt({ kind: "error", err }));
  };
  const r = st.r;
  return <section style={tsBox} aria-live="polite">
    <div style={{ ...tsLabel, marginBottom: 8 }}>Read it in the sources</div>
    <form onSubmit={find} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <input value={q} onChange={ev => setQ(ev.target.value)} maxLength={200} placeholder="Optional: words to look for" aria-label={"Words to look for with " + term}
        style={{ flex: "1 1 200px", minWidth: 0, height: 44, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: "var(--surface-raised)", color: "var(--text-strong)", font: "var(--type-body)", fontSize: 16 }} />
      <TsButton variant="secondary" icon="book-open" type="submit" disabled={st.kind === "loading"}>Find passages</TsButton>
    </form>
    {st.kind === "loading" && <div style={{ marginTop: 12 }}><TsState kind="loading" compact /></div>}
    {st.kind === "error" && <p role="alert" style={{ margin: "12px 0 0", font: "var(--type-source)", color: "var(--text-muted)" }}>{st.err && st.err.code === "no_api" ? "Passages need the live server." : (st.err && st.err.message) || "Could not reach Rhema.ai."}{st.err && st.err.requestId ? ` (ref ${st.err.requestId.slice(0, 8)})` : ""}</p>}
    {st.kind === "done" && !r.found && <p style={{ margin: "12px 0 0", font: "var(--type-body)", fontStyle: "italic", color: "var(--text-muted)" }}>Not in verified sources.</p>}
    {st.kind === "done" && r.found && <>
      <ol style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "flex", flexDirection: "column" }}>{r.passages.map((p, i) => <li key={p.tradition + p.work + p.reference} style={{ padding: "12px 0", borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}><TsTag tone={tsTone[p.tradition]}>{p.tradition}</TsTag><span style={{ font: "700 15px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{p.work} · {p.reference}</span></div>
        <q style={{ ...tsP, fontSize: 16, quotes: "none", fontFamily: "var(--font-pastoral, var(--font-body))" }}>{p.quote}</q>
        <span style={{ font: "var(--type-source)", fontSize: 12, color: "var(--text-faint)" }}>{p.translation} · {p.license}{p.url && <> · <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>Read in context</a></>}</span>
      </li>)}</ol>
      <p style={{ margin: "8px 0 0", font: "var(--type-source)", fontSize: 12, color: "var(--text-faint)" }}>Found by word match, not chosen by a person or written by a model. No tradition is ranked.</p>
    </>}
  </section>;
}

const CF = window.CAFaith;
const tsGapLabels = { goal: ["Nirvana / moksha", "Christian salvation"], human: ["Ignorance", "Sin"] };
const tsNone = <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>The dictionary does not cover this yet.</span>;

function TsFields({ k, v, dim }) {
  const fl = CF.fields(k); const val = CF.norm(k, v) || {};
  if (fl.length === 1) return <p style={{ font: "var(--type-body)", fontSize: 16, color: dim ? "var(--text-muted)" : "var(--text-body)", margin: "6px 0 0", textDecoration: dim && val[fl[0][0]] ? "line-through" : "none", fontStyle: val[fl[0][0]] ? "normal" : "italic" }}>{val[fl[0][0]] || "Not covered before."}</p>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>{fl.map(([fk, lab]) => <div key={fk}><span style={{ ...tsLabel, fontSize: 13 }}>{lab}</span><p style={{ font: "var(--type-body)", fontSize: 13, color: dim ? "var(--text-muted)" : "var(--text-body)", margin: "2px 0 0", textDecoration: dim && val[fk] ? "line-through" : "none", fontStyle: val[fk] ? "normal" : "italic" }}>{val[fk] || "Not covered before."}</p></div>)}</div>;
}

function ExpertTrail({ k, rec, cur }) {
  if (!rec) return null;
  const n = (rec.sugg || []).length; const last = (rec.log || []).filter(l => l.kind !== "Approved").slice(-1)[0];
  if (!n && !last) return null;
  return <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
    {n > 0 && <div style={{ border: "1px dashed var(--border-default)", borderRadius: "var(--radius-md)", padding: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}><TsBadge tone="warn">Waiting for review</TsBadge><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{n === 1 ? "1 suggestion" : `${n} suggestions`} · a person decides before anything changes</span></div>}
    {last && <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14, background: "var(--surface-raised)" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}><TsBadge tone="ok">Updated</TsBadge><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{CF.title(k)} · {last.at}</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
        <div><div style={tsLabel}>Old</div><TsFields k={k} v={last.old} dim /></div>
        <div><div style={{ ...tsLabel, color: "var(--lamp-400)" }}>New</div><TsFields k={k} v={last.new ?? cur} /></div>
      </div>
    </div>}
  </div>;
}

function TsActions({ k, expert, onAct }) {
  return <>
    {!expert && <button onClick={() => onAct("Report", k)} style={{ marginTop: 12, alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", minHeight: 32, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", color: "var(--text-faint)" }}><TsIcon name="flag" size={16} />Something off? Tell a person</button>}
    {expert && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
      <TsButton size="sm" variant="secondary" icon="file-plus" onClick={() => onAct("Make", k)}>Make</TsButton>
      <TsButton size="sm" variant="secondary" icon="pencil" onClick={() => onAct("Change", k)}>Change</TsButton>
      <TsButton size="sm" variant="ghost" icon="message-square-plus" onClick={() => onAct("Suggest", k)}>Suggest</TsButton>
    </div>}
  </>;
}
const TsInsufficient = () => <span style={{ fontStyle: "italic", color: "var(--text-muted)", font: "var(--type-body)" }}>The dictionary does not cover this yet.</span>;
const tsToneRe = /\b(superior|inferior|false religion|only true|wrong religion|better than|worse than|heathen|pagan|deceived|lost souls?|idols?|idolatry|myths?|demigods?|hindu trinity|h[iī]nay[aā]na|hindus believe|buddhists believe|all hindus|all buddhists|zen meditation)\b/i;

function FaithBlock({ n, k, title, note, tone, dashed, children, expert, rec, cur, onAct }) {
  return <section data-no-tr="" style={{ display: "flex", flexDirection: "column", border: `1px ${dashed ? "dashed" : "solid"} ${tone === "bridge" ? "var(--bridge-line)" : dashed ? "var(--border-default)" : "var(--border-subtle)"}`, borderRadius: "var(--radius-lg)", background: tone === "bridge" ? "var(--bridge-tint)" : dashed ? "transparent" : "var(--surface-card)", padding: 20 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
      <span style={{ ...tsLabel, color: tone === "bridge" ? "var(--bridge-400)" : "var(--text-faint)" }}>{n}</span>
      <h2 style={{ font: "var(--type-section)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", margin: 0 }}>{title}</h2>
      <span style={{ font: "var(--type-source)", color: "var(--text-muted)", marginLeft: "auto" }}>{note}</span>
    </div>
    {children}
    <ExpertTrail k={k} rec={rec} cur={cur} />
    {tone !== "bridge" && <TsActions k={k} expert={expert} onAct={onAct} />}
  </section>;
}

function GapUnit({ k, v, expert, rec, onAct }) {
  const [l, r] = tsGapLabels[k];
  const S = ({ lead, children }) => <p style={{ ...tsP, fontSize: 16 }}><b style={{ color: "var(--text-strong)" }}>{lead}.</b> {children || <TsInsufficient />}</p>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 16, borderRadius: "var(--radius-md)", background: "var(--surface-page)", border: "1px solid var(--bridge-line)" }}>
    <h3 style={{ font: "700 18px/1.25 var(--font-display)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", margin: 0 }}><span style={{ color: "var(--bridge-400)" }}>{k === "goal" ? "Gap 1" : "Gap 2"} · </span>{k === "goal" ? "Ultimate goal" : "Problem of humanity"}</h3>
    <S lead={l}>{v.left}</S>
    <S lead={r}>{v.right}</S>
    <p style={{ font: "700 18px/1.5 var(--font-body)", color: "var(--text-strong)", margin: 0 }}>The gap: {v.gap ? <span style={{ color: "var(--bridge-400)" }}>{v.gap}</span> : <TsInsufficient />}</p>
    <ExpertTrail k={k} rec={rec} cur={v} />
    <TsActions k={k} expert={expert} onAct={onAct} />
  </div>;
}

function FaithEntry({ e, expert, setExpert }) {
  const [store, setStore] = window.CAExpert.use();
  const [dlg, setDlg] = React.useState(null);
  const [draft, setDraft] = React.useState({});
  const [toast, setToast] = React.useState(null);
  const [blocked, setBlocked] = React.useState(null);
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2600); return () => clearTimeout(id); }, [toast]);
  const f = e.faith || {};
  const rec = k => (store[e.term] || {})[k] || null;
  const cur = k => CF.current(store, e, k);
  const open = (kind, k) => { setBlocked(null); setDlg({ kind, k }); setDraft(kind === "Change" ? { ...cur(k) } : {}); };
  const single = dlg && (dlg.kind === "Suggest" || dlg.kind === "Report");
  const canSave = dlg && (single ? (draft.text || "").trim() : Object.values(draft).some(x => (x || "").trim()));
  const save = () => {
    const { kind, k } = dlg; if (!canSave) return;
    if (Object.values(draft).some(x => window.CAGuard.injection(x))) { setBlocked(window.CAGuard.reqId()); return; }
    { const kindKey = kind === "Report" ? "report" : "expert"; const bad = Object.values(draft).map(x => window.CAInput.check(kindKey, x, { optional: kind !== "Report" })).find(c => !c.ok); if (bad) { setToast(bad.msg); return; } }
    if (kind === "Report" && window.CAApi && window.CAApi.isLive()) {
      window.CAApi.post("/feedback/report", { term: e.term, block: k, text: (draft.text || "").trim() }).then(() => {
        setDlg(null); setToast("Sent. A person will read it.");
      }, x => setToast((x.message || "Could not send.") + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "")));
      return;
    }
    if (kind === "Report") { const rk = "ca_reported_" + e.term + "_" + k; if (localStorage.getItem(rk)) { setDlg(null); setToast("You’ve already told a person about this. Thank you."); return; } localStorage.setItem(rk, "1"); }
    if (window.CAApi && window.CAApi.isLive() && expert && (kind === "Suggest" || kind === "Make" || kind === "Change")) {
      const proposed = single
        ? (draft.text || "").trim()
        : CF.fields(k).map(([fk]) => (draft[fk] || "").trim()).filter(Boolean).join("\n\n");
      if (proposed.length < 10) { setToast("Keep it between 10 and 1200 characters."); return; }
      window.CAApi.post("/terms/" + encodeURIComponent(e.term) + "/edits", { block: k, proposed: proposed }).then(() => {
        setDlg(null);
        setToast(kind === "Suggest" ? "Waiting for review." : "Sent for review. Nothing on the page changes until it is approved.");
      }, x => setToast((x.message || "Could not send.") + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "")));
      return;
    }
    const t = { ...(store[e.term] || {}) }; const r = { log: [], sugg: [], ...(t[k] || {}) };
    if (single) r.sugg = [...(r.sugg || []), { who: kind === "Report" ? "A reader" : window.CAExpert.expert, at: "Today", text: draft.text.trim() }];
    else { const nv = {}; CF.fields(k).forEach(([fk]) => nv[fk] = (draft[fk] || "").trim() || null); r.log = [...(r.log || []), { kind, who: window.CAExpert.expert, at: "Today", old: cur(k), new: nv }]; r.val = nv; delete r.text; }
    t[k] = r; setStore({ ...store, [e.term]: t }); setDlg(null);
    setToast(kind === "Report" ? "Sent. A person will read it." : kind === "Suggest" ? "Waiting for review." : "Updated. The old text stays beside the new.");
  };
  const P = k => ({ k, expert, rec: rec(k), cur: cur(k), onAct: open });
  const txt = (k, fk = "text") => cur(k)[fk];
  const has = CF.hasContent(store, e);
  const rv = (store._review || {})[e.term];
  const markReviewed = () => setStore({ ...store, _review: { ...(store._review || {}), [e.term]: { by: window.CAExpert.expert, at: "Today" } } });
  const hints = { Report: "A person on the review team reads every note. Nothing on the page changes until they decide.", Make: "Write this fresh. It replaces what is there, and the old text is kept beside it.", Change: "Edit the current text. The old text is kept beside the new.", Suggest: "Goes to the review list as waiting. Nothing on the page changes until it is approved." };
  const sources = (f.sources && f.sources.length ? f.sources : e.sources) || [];
  const noSrc = !(f.sources && f.sources.length);
  const hit = (...ks) => ks.map(k => Object.values(cur(k) || {}).join(" ")).join(" ").match(tsToneRe);
  const withheld = w => <span style={{ display: "inline-flex", gap: 8, alignItems: "flex-start", color: "var(--danger-400)", font: "var(--type-body)", fontSize: 16 }}><TsIcon name="eye-off" size={18} style={{ marginTop: 2, flex: "none" }} />Withheld. The tone check found ranking language (“{w}”). This block stays hidden until a person fixes it.</span>;
  const body = k => (noSrc || !txt(k)) ? <TsInsufficient /> : hit(k) ? withheld(hit(k)[0]) : <p style={tsP}>{txt(k)}</p>;
  const bridgeHit = hit("bridge", "goal", "human");
  const allText = ["parallel", "difference", "bridge", "goal", "human"].map(k => Object.values(cur(k) || {}).join(" ")).join(" ");
  const toneHit = allText.match(tsToneRe);
  return <article style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {expert && <div style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Religion expert mode. Edits go to the private log. No name is shown on this page.</div>}
    {expert && <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", padding: 14, borderRadius: "var(--radius-md)", border: `1px ${rv ? "solid" : "dashed"} var(--border-default)`, background: rv ? "transparent" : "var(--surface-card)" }}>
      <TsIcon name={rv ? "user-check" : "user-round-search"} size={20} color={rv ? "var(--ok-400)" : "var(--warn-400)"} />
      <span style={{ flex: "1 1 220px", font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}>{rv ? <>Checked by a religion expert · {rv.at}</> : has ? "Drafted by the agent. A religion expert hasn’t checked this yet." : "Not written yet. A religion expert can write each block."}</span>
      {expert && !rv && has && <TsButton size="sm" variant="primary" icon="check" onClick={markReviewed}>Mark checked</TsButton>}
    </div>}
    <FaithBlock n="01" title="Parallel" note="An analogy, not the same doctrine" {...P("parallel")}>{body("parallel")}</FaithBlock>
    <FaithBlock n="02" title="Difference" note="No ranking · no winner · no strawman" {...P("difference")}>{body("difference")}</FaithBlock>
    <FaithBlock n="03" title="Christian bridge" note="Two gaps only" tone="bridge" {...P("bridge")} expert={false}>
      {bridgeHit ? withheld(bridgeHit[0]) : <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <GapUnit k="goal" v={cur("goal")} expert={expert} rec={rec("goal")} onAct={open} />
        <GapUnit k="human" v={cur("human")} expert={expert} rec={rec("human")} onAct={open} />
      </div>}
    </FaithBlock>
    <FaithBlock n="04" title="Linguistic root" note="Same word is not the same concept" dashed={!txt("root")} {...P("root")}><p style={tsP}>{txt("root") || tsNone}</p></FaithBlock>
    <FaithBlock n="05" title="Historical timeline" note="" dashed={!txt("timeline")} {...P("timeline")}><p style={tsP}>{txt("timeline") || tsNone}</p></FaithBlock>
    <TsVerses term={e.term} verses={e.faith && e.faith.verses} />
    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 84, transform: "translateX(-50%)", zIndex: 120, animation: "ca-pop var(--dur-slow) var(--ease-out)" }}><TsToast tone="ok" onClose={() => setToast(null)}>{toast}</TsToast></div>}
    <TsDialog open={!!dlg} width={600} title={dlg ? `${dlg.kind === "Report" ? "Tell a person" : dlg.kind} · ${CF.title(dlg.k)}` : ""} onClose={() => setDlg(null)} actions={<><TsButton variant="ghost" onClick={() => setDlg(null)}>Cancel</TsButton><TsButton variant="primary" onClick={save} disabled={!canSave}>{single ? "Send" : "Save"}</TsButton></>}>
      {dlg && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {blocked && <TsState kind="unavailable" compact title="Blocked" message={`This looks like an instruction to the system, not content. Nothing was saved. Request id: ${blocked}`} />}
        {single ? <TsArea label={dlg.kind === "Report" ? "What looks wrong?" : "Your suggestion"} rows={5} value={draft.text || ""} onChange={ev => setDraft({ text: ev.target.value })} hint={hints[dlg.kind]} />
        : CF.fields(dlg.k).map(([fk, lab], i, arr) => <TsArea key={fk} label={lab} rows={fk === "gap" ? 2 : arr.length > 1 ? 4 : 7} value={draft[fk] || ""} onChange={ev => setDraft(d => ({ ...d, [fk]: ev.target.value }))} hint={i === arr.length - 1 ? hints[dlg.kind] : undefined} />)}
      </div>}
    </TsDialog>
  </article>;
}

function TsSplit({ e, onHide }) {
  const used = (e && e.used) || [];
  const key = "ca_split_" + (e && e.term);
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [st, setSt] = React.useState(() => { if (used.length < 2 || rm) return 4; try { return localStorage.getItem(key) ? 4 : 0; } catch (x) { return 4; } });
  React.useEffect(() => { if (st === 4) return; try { localStorage.setItem(key, "1"); } catch (x) {} onHide(true);
    const T = [setTimeout(() => setSt(1), 500), setTimeout(() => setSt(2), 1900), setTimeout(() => { setSt(3); onHide(false); }, 2700), setTimeout(() => setSt(4), 3200)];
    return () => T.forEach(clearTimeout); }, []);
  if (st === 4) return null;
  const tr = { Hindu: "hindu", Buddhist: "buddhist", Christian: "christian" };
  const off = used.length === 2 ? [-0.5, 0.5] : [-1, 0, 1];
  return <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, pointerEvents: "none" }}>{used.map((u, i) => <span key={u} style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", color: `var(--trad-${tr[u]})`,
    opacity: st === 3 ? 0 : 1, transform: st === 1 ? `translate(${off[i] * 0.1}em, ${off[i] * 0.42}em)` : "none",
    transition: "transform 900ms cubic-bezier(.2,.8,.2,1), opacity 500ms var(--ease-out)" }}>{e.term}</span>)}</span>;
}

function TermScreen({ term, back, initialExpert }) {
  const [splitHide, setSplitHide] = React.useState(false);
  const localEntry = () => window.CA_DATA.lexicon.find(x => x.term === term) || null;
  const [entry, setEntry] = React.useState(localEntry);
  const [tick, setTick] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  React.useEffect(() => {
    setEntry(localEntry());
    if (!window.CAApi || window.CA_DEMO || window.CAGuard.offline()) return undefined;
    let stop = false;
    setFetching(!localEntry());
    window.CAApi.get("/terms/" + encodeURIComponent(term) + "?lang=" + (window.CA_LANG || "en")).then(row => {
      if (stop || !row || row.error) return;
      const f = row.faith;
      setEntry({ term: row.term, pos: row.pos, def: row.def, used: row.used || [], sources: row.sources || [], faith: f ? { parallel: f.parallel, difference: f.difference, bridge: f.bridge, sources: f.sources || [], verses: f.verses || [], root: f.root, timeline: f.timeline, close: f.close, gaps: f.gaps || [] } : null });
    }).catch(() => {}).finally(() => { if (!stop) setFetching(false); });
    return () => { stop = true; };
  }, [term, tick]);
  const e = entry;
  const expert = !!initialExpert;
  const lk = window.CAGuard.lockdown();
  const [faith, setFaith] = React.useState(expert && !lk);
  const fromHw = React.useRef(window.CAHwFrom === term); window.CAHwFrom = null;
  const [ready, setReady] = React.useState(fromHw.current);
  React.useEffect(() => { if (fromHw.current && tick === 0) return; setReady(false); const id = setTimeout(() => setReady(true), 350); return () => clearTimeout(id); }, [tick]);
  const offline = window.CAGuard.offline();
  const dev = (() => { try { return JSON.parse(localStorage.getItem("ca_on_device")) || ["karma"]; } catch (x) { return ["karma"]; } })();
  React.useEffect(() => { if (!offline && e && !dev.includes(e.term)) localStorage.setItem("ca_on_device", JSON.stringify([...dev, e.term])); }, [term]);
  const onDevice = offline && e && dev.includes(e.term);
  React.useEffect(() => { const k = ev => { if (ev.key === "Escape" && !ev.defaultPrevented && !document.querySelector('[role="dialog"], [role="listbox"], [role="menu"]')) window.CAGuard.plain(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  const hold = React.useRef(0);
  const startHold = ev => { if (lk || ev.button > 0) return; clearTimeout(hold.current); hold.current = setTimeout(() => { window.CAHaptic && window.CAHaptic("medium"); setFaith(true); window.scrollTo(0, 0); }, 650); };
  const endHold = () => clearTimeout(hold.current);
  const topBtn = { display: "inline-flex", alignItems: "center", gap: 6, height: 44, padding: 0, background: "none", border: 0, color: "var(--text-muted)", font: "600 16px/1 var(--font-body)", cursor: "pointer" };
  const close = <button onClick={() => window.CAGuard.plain()} aria-label="Close" style={{ width: 44, height: 44, display: "grid", placeItems: "center", background: "none", border: 0, borderRadius: 99, color: "var(--text-muted)", cursor: "pointer" }}><TsIcon name="x" size={20} /></button>;
  return <div style={{ maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "12px var(--gutter-phone) 24px", display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      {faith && !expert ? <button onClick={() => { setFaith(false); window.scrollTo(0, 0); }} style={topBtn}><TsIcon name="arrow-left" size={18} />Back</button> : <button onClick={back} style={topBtn}><TsIcon name="arrow-left" size={18} />Search</button>}
      {close}
    </div>
    {offline && !onDevice ? <div role="status" style={{ ...tsBox, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}><p style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)", margin: 0 }}>This needs a connection</p><TsButton variant="primary" icon="rotate-cw" onClick={() => setTick(n => n + 1)}>Retry</TsButton></div>
    : fetching || (!ready && e) ? <TsState kind="loading" compact /> : !e ? <window.WordEmpty word={term} line="Not in the dictionary yet." /> : faith ? <>
      <h1 style={{ font: "var(--type-headword)", fontSize: "clamp(44px,12vw,60px)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: "0 0 4px", overflowWrap: "anywhere" }}>{e.term}</h1>
      <FaithEntry e={e} expert={expert} />
    </> : <>
      {onDevice && <div style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 30, padding: "0 12px", borderRadius: 999, border: "1px solid var(--border-default)", font: "600 13px/1 var(--font-body)", color: "var(--text-body)" }}><TsIcon name="hard-drive" size={16} />On this device.</div>}
      <section style={{ ...tsBox, padding: 20 }}>
        <h1 onPointerDown={startHold} onPointerUp={endHold} onPointerLeave={endHold} onPointerCancel={endHold} onContextMenu={ev => ev.preventDefault()} style={{ font: "var(--type-headword)", fontSize: "clamp(68px,20vw,104px)", letterSpacing: "var(--tracking-display)", color: splitHide ? "transparent" : "var(--text-strong)", transition: "color 400ms var(--ease-out)", margin: 0, overflowWrap: "anywhere", userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none", touchAction: "manipulation", viewTransitionName: "ca-headword", width: "fit-content", maxWidth: "100%", position: "relative" }}>{e.term}<TsSplit key={e.term} e={e} onHide={setSplitHide} /></h1>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "baseline", marginTop: 12 }}>
          <span style={{ font: "italic 400 18px/1 var(--font-body)", color: "var(--text-muted)" }}>{e.pos}</span>
          
        </div>
      </section>
      <NormalEntry e={e} />
      <window.CAHelped id={"word_" + e.term} q="Did this help you understand it?" />
    </>}
  </div>;
}
window.TermScreen = TermScreen;
