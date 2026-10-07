const { SegmentedControl: AsSeg, Button: AsButton, Badge: AsBadge, StateBlock: AsState } = window.ChurchAIDesignSystem_06db43;
const asWho = w => w === "A reader" ? "A reader" : w === "Dr. Miriam Das" ? "Expert E-2" : w === "Rev. Tenzin Norbu" ? "Expert E-3" : "Expert";
const asLabel = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" };

function AsFields({ k, v, dim }) {
  const CF = window.CAFaith; const val = CF.norm(k, v) || {}; const fl = CF.fields(k);
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>{fl.map(([fk, lab]) => <div key={fk}>{fl.length > 1 && <span style={{ ...asLabel, fontSize: 13 }}>{lab}</span>}<p style={{ font: "var(--type-body)", fontSize: 16, color: dim ? "var(--text-muted)" : "var(--text-body)", margin: "2px 0 0", textDecoration: dim && val[fk] ? "line-through" : "none", fontStyle: val[fk] ? "normal" : "italic" }}>{val[fk] || "Not covered before."}</p></div>)}</div>;
}

function ExpertEdits() {
  const CF = window.CAFaith;
  const [store, setStore] = window.CAExpert.use();
  const reviews = store._review || {};
  const lex = window.CA_DATA.lexicon;
  const drafts = lex.filter(x => !reviews[x.term] && CF.hasContent(store, x));
  const unwritten = lex.filter(x => !CF.hasContent(store, x));
  const approve = term => setStore({ ...store, _review: { ...reviews, [term]: { by: window.CAExpert.expert, at: "Today" } } });
  const openTerm = term => { location.hash = `r=term&t=${term}&mode=faith&expert=1`; location.reload(); };
  const waiting = [], done = [];
  Object.entries(store).filter(([k]) => k[0] !== "_").forEach(([term, blocks]) => Object.entries(blocks).forEach(([k, r]) => {
    (r.sugg || []).forEach((s, i) => waiting.push({ term, k, i, ...s }));
    (r.log || []).forEach(l => done.push({ term, k, ...l }));
  }));
  const decide = (w, ok) => {
    const entry = lex.find(x => x.term === w.term);
    const t = { ...store[w.term] }; const r = { ...t[w.k] }; r.sugg = r.sugg.filter((_, j) => j !== w.i);
    if (ok) { const fl = CF.fields(w.k); const old = CF.current(store, entry, w.k);
      if (fl.length === 1) { const nv = { [fl[0][0]]: w.text }; r.log = [...(r.log || []), { kind: "Change", who: w.who, at: "Today", old, new: nv }]; r.val = nv; delete r.text; }
      else r.log = [...(r.log || []), { kind: "Approved", who: w.who, at: "Today", note: w.text, old, new: old }]; }
    t[w.k] = r; setStore({ ...store, [w.term]: t });
  };
  const H = ({ children, n }) => <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}><h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0 }}>{children}</h2>{n != null && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{n}</span>}</div>;
  const box = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" };
  return <div style={{ maxWidth: 880, width: "100%", margin: "0 auto", padding: "28px var(--gutter-phone) 40px", display: "flex", flexDirection: "column", gap: 28 }}>
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>Every word has the same Faith mode. Two different reviewers check a draft before it is public, and every edit keeps the old text beside the new.</p>
    <section>
      <H n={drafts.length}>Waiting for a person</H>
      {drafts.length === 0 ? <AsState kind="empty" compact word="checked" motif="check" message="Every drafted entry has been checked by a person." /> :
      <div style={box}>{drafts.map((x, i) => <div key={x.term} style={{ padding: 14, borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ font: "800 18px/1 var(--font-display)", color: "var(--text-strong)" }}>{x.term}</span><AsBadge tone="warn">{x.status === "one_checked" ? "1 of 2 checked" : "Drafted by the agent"}</AsBadge>
        <div style={{ flex: 1 }}></div><AsButton size="sm" variant="ghost" onClick={() => openTerm(x.term)}>Open</AsButton><AsButton size="sm" variant="primary" onClick={() => approve(x.term)}>{x.status === "one_checked" ? "Second check" : "Mark checked"}</AsButton>
      </div>)}</div>}
    </section>
    <section>
      <H n={unwritten.length}>Not written yet</H>
      {unwritten.length === 0 ? <AsState kind="empty" compact word="written" motif="check" message="Every word has a Faith mode draft." /> :
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>{unwritten.map(x => <button key={x.term} onClick={() => openTerm(x.term)} style={{ height: 36, padding: "0 14px", borderRadius: 999, border: "1px dashed var(--border-default)", background: "transparent", color: "var(--text-body)", font: "600 13px/1 var(--font-body)", cursor: "pointer" }}>{x.term} · Make</button>)}</div>}
    </section>
    <section>
      <H n={waiting.length}>Suggestions and reader notes</H>
      {waiting.length === 0 ? <AsState kind="empty" compact word="clear" motif="check" message="No suggestions or reader notes are waiting." /> :
      <div style={box}>{waiting.map((w, i) => <div key={w.term + w.k + w.i} style={{ padding: 16, borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}><span style={{ font: "800 18px/1 var(--font-display)", color: "var(--text-strong)" }}>{w.term}</span><span style={asLabel}>{CF.title(w.k)}</span><AsBadge tone="warn">{w.who === "A reader" ? "Reader note" : "Suggestion"}</AsBadge></div>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: "0 0 6px" }}>{w.text}</p>
          <div style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{asWho(w.who)} · {w.at}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}><AsButton size="sm" variant="ghost" onClick={() => decide(w, false)}>Decline</AsButton><AsButton size="sm" variant="primary" onClick={() => decide(w, true)}>Approve</AsButton></div>
      </div>)}</div>}
    </section>
    <section>
      <H>Made and changed</H>
      {done.length === 0 ? <AsState kind="empty" compact word="untouched" motif="check" message="No expert has made or changed a block yet." /> :
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>{done.slice().reverse().map((l, i) => { const entry = lex.find(x => x.term === l.term);
        return <div key={i} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14, background: "var(--surface-card)" }}>
        <div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginBottom: 10 }}><b style={{ color: "var(--text-strong)" }}>{l.term}</b> · {CF.title(l.k)} · {l.kind === "Make" ? "Made" : l.kind === "Approved" ? "Suggestion approved" : "Changed"} by {asWho(l.who)} · {l.at}</div>
        {l.note ? <p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-body)", margin: 0 }}>{l.note}</p> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <div><div style={asLabel}>Old</div><AsFields k={l.k} v={l.old} dim /></div>
          <div><div style={{ ...asLabel, color: "var(--lamp-400)" }}>New</div><AsFields k={l.k} v={l.new ?? CF.current(store, entry, l.k)} /></div>
        </div>}
      </div>; })}</div>}
    </section>
  </div>;
}

function ExpertEditsLive() {
  const CF = window.CAFaith, A = window.CAApi;
  const [cov, setCov] = React.useState(null); const [waiting, setWaiting] = React.useState([]); const [done, setDone] = React.useState([]); const [err, setErr] = React.useState(null);
  const fail = e => setErr(e.message + (e.requestId ? ` · ${String(e.requestId).slice(0, 8)}` : ""));
  const load = () => Promise.all([A.get("/review/coverage"), A.get("/review/edits"), A.get("/review/edits?status=decided")]).then(([c, p, d]) => { setCov(c || []); setWaiting(p || []); setDone(d || []); setErr(null); }, fail);
  React.useEffect(() => { load(); }, []);
  const approve = term => A.post(`/review/coverage/${encodeURIComponent(term)}`).then(load, fail);
  const decide = (w, ok) => A.post(`/review/edits/${encodeURIComponent(w.id)}`, { approve: ok, note: "" }).then(load, fail);
  const openTerm = term => { location.hash = `r=term&t=${term}&mode=faith&expert=1`; location.reload(); };
  const one = (k, t) => ({ [(CF.fields(k) || [["text"]])[0][0]]: t });
  const H = ({ children, n }) => <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}><h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0 }}>{children}</h2>{n != null && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{n}</span>}</div>;
  const box = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" };
  if (!cov) return <div style={{ maxWidth: 880, width: "100%", margin: "0 auto", padding: "28px var(--gutter-phone)" }}>{err ? <AsState kind="error" compact title="Could not load" message={err} /> : <AsState kind="loading" compact />}</div>;
  const drafts = cov.filter(c => c.status === "drafted" || c.status === "one_checked"), unwritten = cov.filter(c => c.status === "unwritten");
  return <div style={{ maxWidth: 880, width: "100%", margin: "0 auto", padding: "28px var(--gutter-phone) 40px", display: "flex", flexDirection: "column", gap: 28 }}>
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>Every word has the same Faith mode. Two different reviewers check a draft before it is public, and every edit keeps the old text beside the new.</p>
    {err && <p role="alert" style={{ font: "var(--type-source)", color: "var(--danger-400)", margin: 0 }}>{err}</p>}
    <section>
      <H n={drafts.length}>Waiting for a person</H>
      {drafts.length === 0 ? <AsState kind="empty" compact word="checked" motif="check" message="Every drafted entry has been checked by a person." /> :
      <div style={box}>{drafts.map((x, i) => <div key={x.term} style={{ padding: 14, borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ font: "800 18px/1 var(--font-display)", color: "var(--text-strong)" }}>{x.term}</span><AsBadge tone="warn">{x.status === "one_checked" ? "1 of 2 checked" : "Drafted by the agent"}</AsBadge>
        <div style={{ flex: 1 }}></div><AsButton size="sm" variant="ghost" onClick={() => openTerm(x.term)}>Open</AsButton><AsButton size="sm" variant="primary" onClick={() => approve(x.term)}>{x.status === "one_checked" ? "Second check" : "Mark checked"}</AsButton>
      </div>)}</div>}
    </section>
    <section>
      <H n={unwritten.length}>Not written yet</H>
      {unwritten.length === 0 ? <AsState kind="empty" compact word="written" motif="check" message="Every word has a Faith mode draft." /> :
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>{unwritten.map(x => <button key={x.term} onClick={() => openTerm(x.term)} style={{ minHeight: 44, padding: "0 14px", borderRadius: 999, border: "1px dashed var(--border-default)", background: "transparent", color: "var(--text-body)", font: "600 13px/1 var(--font-body)", cursor: "pointer" }}>{x.term} · Make</button>)}</div>}
    </section>
    <section>
      <H n={waiting.length}>Suggestions and reader notes</H>
      {waiting.length === 0 ? <AsState kind="empty" compact word="clear" motif="check" message="No suggestions or reader notes are waiting." /> :
      <div style={box}>{waiting.map((w, i) => <div key={w.id} style={{ padding: 16, borderTop: i ? "1px solid var(--border-subtle)" : 0, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}><span style={{ font: "800 18px/1 var(--font-display)", color: "var(--text-strong)" }}>{w.term}</span><span style={asLabel}>{CF.title(w.block) || w.block}</span><AsBadge tone="warn">Suggestion</AsBadge></div>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: "0 0 6px" }}>{w.proposed}</p>
          <div style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>Expert · {w.submittedAt}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}><AsButton size="sm" variant="ghost" onClick={() => decide(w, false)}>Decline</AsButton><AsButton size="sm" variant="primary" onClick={() => decide(w, true)}>Approve</AsButton></div>
      </div>)}</div>}
    </section>
    <section>
      <H>Made and changed</H>
      {done.length === 0 ? <AsState kind="empty" compact word="untouched" motif="check" message="No expert has made or changed a block yet." /> :
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>{done.map(l => <div key={l.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14, background: "var(--surface-card)" }}>
        <div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginBottom: 10 }}><b style={{ color: "var(--text-strong)" }}>{l.term}</b> · {CF.title(l.block) || l.block} · {l.status === "approved" ? "Suggestion approved" : "Declined"} · {l.reviewedAt}</div>
        {l.status === "approved" ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <div><div style={asLabel}>Old</div><AsFields k={l.block} v={one(l.block, l.previous)} dim /></div>
          <div><div style={{ ...asLabel, color: "var(--lamp-400)" }}>New</div><AsFields k={l.block} v={one(l.block, l.proposed)} /></div>
        </div> : <p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: 0 }}>{l.proposed}</p>}
      </div>)}</div>}
    </section>
  </div>;
}

function AdminScreen({ tab: initialTab }) {
  const [tab, setTab] = React.useState(initialTab || "accounts");
  React.useEffect(() => { window.CAAdminTabSeen && window.CAAdminTabSeen(tab); }, [tab]);
  React.useEffect(() => { window.CAAdminTab = setTab; return () => { if (window.CAAdminTab === setTab) window.CAAdminTab = null; }; }, []);
  return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ minHeight: 56, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "8px var(--gutter-phone)", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
      <a href="#r=search" style={{ font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "none", minHeight: 44, minWidth: 44, display: "inline-flex", alignItems: "center" }}>← App</a><span style={{ ...asLabel, color: "var(--lamp-400)" }}>Admin</span>
      <AsSeg size="sm" label="Draft section" value={tab} onChange={setTab} options={[{ value: "accounts", label: "Accounts" }, { value: "feedback", label: "Beta feedback" }, { value: "map", label: "Ideas list" }, { value: "draftmap", label: "Ideas map" }, { value: "edits", label: "Faith review" }]} />
      <div style={{ flex: 1 }}></div>
      <a href="../pipeline/index.html#role=reviewer&r=queue" style={{ font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "none", minHeight: 44, display: "inline-flex", gap: 6, alignItems: "center" }}>Review queue →</a>
    </div>
    {tab === "feedback" ? <window.BetaFeedbackAdmin /> : tab === "accounts" ? <AccountsScreen /> : tab === "draftmap" ? (window.CAGuard.lockdown() ? null : <DraftMap />) : tab === "map" ? (window.CAGuard.lockdown() ? <div style={{ maxWidth: 520, width: "100%", margin: "0 auto", padding: "32px var(--gutter-phone)" }}><AsState kind="unavailable" compact title="Unavailable" message="" /></div> : <MapDraft />) : window.CAApi && window.CAApi.isLive() ? <ExpertEditsLive /> : <ExpertEdits />}
  </div>;
}
window.AdminScreen = AdminScreen;
