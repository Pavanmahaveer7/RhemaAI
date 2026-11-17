const { Button: MdButton, Badge: MdBadge, Icon: MdIcon, TextField: MdField, Dialog: MdDialog, Toast: MdToast, Switch: MdSwitch } = window.ChurchAIDesignSystem_06db43;

// Admin map draft — a review queue, not a canvas. One job per area: list of ideas (edit), checklist + publish (decide).
const mdSeed = { id: "2026-10", label: "Oct 2026", question: "What does faith mean to you?", term: "faith", answers: 97, flagged: 3, kept: { selfharm: 1, hate: 1, sexual: 0, threat: 0, spam: 4, unclear: 6, duplicate: 3 }, spikes: { worry: "Most from one region in one hour" },
  nodes: [["peace", 38], ["prayer", 30], ["family", 26], ["hope", 21], ["silence", 17], ["church", 16], ["nature", 14], ["worry", 12], ["work", 9], ["exile", 2]],
  links: [["peace", "prayer", 14, "s"], ["peace", "silence", 11, "s"], ["peace", "nature", 8, "s"], ["family", "peace", 9, "s"], ["hope", "prayer", 7, "s"], ["worry", "work", 6, "s"]] };

const mdR = w => 14 + Math.sqrt(w) * 5.2;
function mdPack(nodes, links) {
  const P = {}, placed = [], GAP = 28;
  const nb = id => links.filter(l => l[0] === id || l[1] === id).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]);
  nodes.forEach(([id, w], i) => { const r = mdR(w); if (!i) { P[id] = { x: 0, y: 0, r }; placed.push(id); return; }
    const anchor = nb(id).find(n => P[n]); let best = null;
    placed.forEach(pid => { const p = P[pid]; for (let a = 0; a < 36; a++) { const ang = a / 36 * Math.PI * 2, dd = p.r + r + GAP, x = p.x + Math.cos(ang) * dd, y = p.y + Math.sin(ang) * dd;
      if (placed.some(q => Math.hypot(P[q].x - x, P[q].y - y) < P[q].r + r + GAP - 0.5)) continue;
      const score = Math.hypot(x, y * 1.25) + (anchor ? Math.hypot(P[anchor].x - x, P[anchor].y - y) * 0.8 : 0); if (!best || score < best.s) best = { x, y, s: score }; } });
    P[id] = { x: best ? best.x : 0, y: best ? best.y : 0, r }; placed.push(id); });
  return P;
}
function MdMap({ nodes, links, hiddenIds, sel, onPick }) {
  const box = React.useRef(null); const [w, setW] = React.useState(600);
  React.useEffect(() => { const ro = new ResizeObserver(([e]) => setW(e.contentRect.width)); box.current && ro.observe(box.current); return () => ro.disconnect(); }, []);
  const P = React.useMemo(() => mdPack(nodes, links), [nodes.map(n => n.join(":")).join(), links.length]);
  const ids = Object.keys(P); if (!ids.length) return null;
  const ext = ids.reduce((b, id) => { const p = P[id]; return { x0: Math.min(b.x0, p.x - p.r), x1: Math.max(b.x1, p.x + p.r), y0: Math.min(b.y0, p.y - p.r - 4), y1: Math.max(b.y1, p.y + p.r + 4) }; }, { x0: 0, x1: 0, y0: 0, y1: 0 });
  const H = 340, pad = 18, sc = Math.min(1.25, (w - pad * 2) / (ext.x1 - ext.x0), (H - pad * 2) / (ext.y1 - ext.y0));
  const X = id => w / 2 + (P[id].x - (ext.x0 + ext.x1) / 2) * sc, Y = id => H / 2 + (P[id].y - (ext.y0 + ext.y1) / 2) * sc;
  const near = sel ? new Set([sel, ...links.filter(l => l[0] === sel || l[1] === sel).map(l => l[0] === sel ? l[1] : l[0])]) : null;
  const maxL = Math.max(1, ...links.map(l => l[2]));
  return <div ref={box} style={{ position: "relative", height: H, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-page)", overflow: "hidden" }}>
    <svg width={w} height={H} role="img" aria-label={`Preview of the public map: ${nodes.filter(n => !hiddenIds.has(n[0])).length} ideas`} style={{ display: "block" }}>
      {links.filter(l => P[l[0]] && P[l[1]]).map(l => { const lit = near && near.has(l[0]) && near.has(l[1]) && (l[0] === sel || l[1] === sel); return <line key={l[0] + l[1]} x1={X(l[0])} y1={Y(l[0])} x2={X(l[1])} y2={Y(l[1])} stroke={lit ? "var(--bone-8)" : "var(--bone-7)"} strokeOpacity={near ? (lit ? 0.9 : 0.08) : 0.35} strokeWidth={1 + (l[2] / maxL) * 3} strokeLinecap="round" />; })}
      {nodes.map(([id, cnt]) => { if (!P[id]) return null; const r = P[id].r * sc, hid = hiddenIds.has(id), on = sel === id, dim = near && !near.has(id); const fs = Math.max(11, Math.min(18, r * 0.42));
        return <g key={id} onClick={() => onPick(id)} style={{ cursor: "pointer", opacity: dim ? 0.25 : 1, transition: "opacity 200ms var(--ease-out)" }}>
          <circle cx={X(id)} cy={Y(id)} r={r} fill={hid ? "transparent" : on ? "var(--bone-8)" : "var(--ink-2)"} stroke={hid ? "var(--border-strong)" : on ? "var(--bone-8)" : "var(--ink-4)"} strokeWidth="1.25" strokeDasharray={hid ? "4 4" : undefined} />
          {r >= 18 ? <><text x={X(id)} y={Y(id) + (r > 34 ? -2 : fs * 0.35)} textAnchor="middle" style={{ font: `800 ${fs}px var(--font-display)`, fill: on ? "var(--ink-0)" : hid ? "var(--text-muted)" : "var(--text-strong)" }}>{id}</text>{r > 34 && <text x={X(id)} y={Y(id) + fs * 0.95} textAnchor="middle" style={{ font: `600 ${Math.max(10, fs * 0.6)}px var(--font-mono)`, fill: on ? "var(--ink-0)" : "var(--text-muted)" }}>{cnt}</text>}</>
            : <text x={X(id)} y={Y(id) + r + 13} textAnchor="middle" style={{ font: "600 13px var(--font-body)", fill: "var(--text-muted)" }}>{id}</text>}
        </g>; })}
    </svg>
  </div>;
}

function MapDraft() {
  const wide = window.useWide(900);
  const live = !!(window.CAApi && window.CAApi.isLive());
  const prev = window.CA_DATA.months.filter(m => m.published).slice(-1)[0];
  const pw = Object.fromEntries((prev ? prev.nodes : []).map(n => [n[0], n[1]]));
  const [d, setD] = React.useState(() => (live && window.CA_DRAFT_SEED) ? window.CA_DRAFT_SEED : mdSeed);
  const reloadDraft = () => live && window.CAApi.get("/maps/draft").then(body => {
    const seed = window.CAMapDraftBody && window.CAMapDraftBody(body);
    if (seed) { setD(seed); window.CA_DRAFT_SEED = seed; }
  }).catch(() => {});
  React.useEffect(() => { if (live) reloadDraft(); }, [live]);
  const [open, setOpen] = React.useState(null);
  const [dlg, setDlg] = React.useState(null); const [val, setVal] = React.useState(""); const [conf, setConf] = React.useState("");
  const [limit, setLimit] = React.useState(false);
  const [toast, setToast] = React.useState(null); const [undo, setUndo] = React.useState(null); const ut = React.useRef(0);
  const [showHidden, setShowHidden] = React.useState(false);
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => { setToast(null); setUndo(null); }, 5000); return () => clearTimeout(id); }, [toast]);
  const shown = d.nodes.filter(n => n[1] >= 3).sort((a, b) => b[1] - a[1]), hidden = d.nodes.filter(n => n[1] < 3);
  const flash = (msg, before) => { clearTimeout(ut.current); setUndo(before || null); setToast(msg); };
  const rename = (from, to) => { const t = to.trim().toLowerCase(); if (!t || t === from) return; const before = d; const apply = () => { setD(x => ({ ...x, nodes: x.nodes.map(n => n[0] === from ? [t, n[1]] : n), links: x.links.map(l => [l[0] === from ? t : l[0], l[1] === from ? t : l[1], l[2], l[3]]) })); setOpen(null); flash(`Renamed “${from}” to “${t}”.`, before); }; if (live) { window.CAApi.patch("/maps/draft", { op: "rename", concept: from, to: t }).then(reloadDraft, () => flash("Could not rename.", before)); return; } apply(); };
  const merge = (from, into) => { const t = into.trim().toLowerCase(); if (!t || t === from || !d.nodes.find(n => n[0] === t)) return; const before = d, add = d.nodes.find(n => n[0] === from)[1]; const apply = () => { setD(x => ({ ...x, nodes: x.nodes.filter(n => n[0] !== from).map(n => n[0] === t ? [t, n[1] + add] : n), links: x.links.filter(l => l[0] !== from && l[1] !== from) })); setOpen(null); flash(`Merged “${from}” into “${t}”.`, before); }; if (live) { window.CAApi.patch("/maps/draft", { op: "merge", concept: from, into: t }).then(reloadDraft, () => flash("Could not merge.", before)); return; } apply(); };
  const remove = id => { const before = d; const apply = () => { setD(x => ({ ...x, nodes: x.nodes.filter(n => n[0] !== id), links: x.links.filter(l => l[0] !== id && l[1] !== id) })); setOpen(null); flash(`Removed “${id}”.`, before); }; if (live) { window.CAApi.patch("/maps/draft", { op: "remove", concept: id }).then(reloadDraft, () => flash("Could not remove.", before)); return; } apply(); };
  const publish = () => {
    if (live) {
      window.CAApi.post("/maps/draft/publish", { confirm: "publish" }).then(() => {
        setDlg(null); setConf("");
        window.CAHydrate && window.CAHydrate();
        flash(`Published. The public map now shows ${d.label}.`);
      }, () => flash("Could not publish."));
      return;
    }
    localStorage.setItem("ca_map_published", JSON.stringify({ id: d.id, label: d.label, question: d.question, term: d.term, published: true, answers: d.answers, nodes: shown.map(n => [n[0], n[1], pw[n[0]] ? 0 : 1]), links: d.links }));
    setDlg(null); setConf(""); flash(`Published. The public map now shows ${d.label}.`);
  };
  const trend = id => { const a = pw[id], b = d.nodes.find(n => n[0] === id)[1]; if (!a) return ["circle-plus", "var(--lamp-400)", "New"]; const x = b - a; return x > 0 ? ["arrow-up-right", "var(--ok-400)", `+${x}`] : x < 0 ? ["arrow-down-right", "var(--text-muted)", `${x}`] : ["minus", "var(--text-muted)", "Same"]; };
  const card = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)" };
  const lab = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-muted)" };
  const Check = ({ ok, children }) => <li style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}><span aria-hidden="true" style={{ width: 24, height: 24, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: ok ? "var(--ok-tint)" : "var(--warn-tint)", color: ok ? "var(--ok-400)" : "var(--warn-400)" }}><MdIcon name={ok ? "check" : "circle-alert"} size={16} /></span><span style={{ paddingTop: 2, lineHeight: 1.4 }}>{children}</span></li>;

  const Decide = <aside aria-label="Before you publish" style={{ ...card, padding: 20, display: "flex", flexDirection: "column", gap: 16, position: wide ? "sticky" : "static", top: 20 }}>
    <h2 style={{ margin: 0, font: "var(--type-section)", color: "var(--text-strong)" }}>Before you publish</h2>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      <Check ok>{hidden.length ? `${hidden.length} idea${hidden.length > 1 ? "s" : ""} under 3 mentions stay${hidden.length > 1 ? "" : "s"} hidden.` : "No idea is under 3 mentions."}</Check>
      <Check ok>No answer text and no names go public.</Check>
      <Check ok={d.flagged === 0}>{d.flagged ? `${d.flagged} flagged answers are left out of every count.` : "Nothing was flagged."}</Check>
      {Object.keys(d.spikes || {}).length > 0 && <Check ok={false}>Unusual rise in {Object.keys(d.spikes).join(", ")}: many answers from one region within an hour. Check before publishing.</Check>}
      <Check ok>Counts shift slightly at publish to protect people.</Check>
    </ul>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
      <MdSwitch label="Limit reach" checked={limit} onChange={v => { setLimit(v); setToast(v ? "Reach limited. Outer ideas sit closer; the choice is saved to the record." : "Open reach."); setUndo(null); }} />
      <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{limit ? "Limited: concepts only, outer ideas pulled in." : "Open: anyone can see the published ideas."}</span>
    </div>
    <details style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
      <summary style={{ cursor: "pointer", minHeight: 40, display: "flex", alignItems: "center", gap: 8, font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)", listStyle: "none" }}><MdIcon name="shield" size={16} color="var(--text-muted)" />Kept out of the map · {Object.values(d.kept).reduce((a, b) => a + b, 0)}<MdIcon name="chevron-down" size={16} color="var(--text-muted)" /></summary>
      <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>{[["selfharm", "Self-harm", "heart-handshake", "Sent to a person"], ["hate", "Attacks on a faith", "shield-alert", "Held"], ["sexual", "Sexual content", "ban", "Blocked"], ["threat", "Threats", "ban", "Blocked"], ["spam", "Spam or links", "link-2", "Dropped"], ["duplicate", "Duplicates", "copy", "Counted once"], ["unclear", "Unclear or off-topic", "circle-help", "Not counted"]].map(([k, l, ic, act]) => <li key={k} style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr) auto", gap: 10, alignItems: "center", font: "var(--type-body)", fontSize: 16, color: d.kept[k] ? "var(--text-body)" : "var(--text-muted)" }}><MdIcon name={ic} size={16} /><span>{l}<span style={{ display: "block", font: "var(--type-source)", color: "var(--text-muted)" }}>{act}</span></span><span style={{ font: "600 16px/1 var(--font-mono)" }}>{d.kept[k]}</span></li>)}</ul>
      <p style={{ margin: "10px 0 0", font: "var(--type-source)", color: "var(--text-muted)" }}>Counts only. No answer text is shown here.</p>
    </details>
    <p style={{ margin: 0, font: "var(--type-source)", color: "var(--text-muted)" }}>The assistant grouped answers into ideas. It can be wrong. Nothing goes public until you publish. You confirm by typing “publish”.</p>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><MdButton variant="accent" icon="upload" onClick={() => { setConf(""); setDlg("publish"); }} style={{ whiteSpace: "nowrap" }}>Publish</MdButton><MdButton variant="ghost" onClick={() => setDlg("dismiss")}>Dismiss</MdButton></div>
  </aside>;

  const Row = (n, i) => { const [id, w] = n, on = open === id, [ic, c, t] = trend(id);
    return <li key={id} style={{ borderTop: i ? "1px solid var(--border-subtle)" : 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto auto", gap: 12, alignItems: "center", minHeight: 56, padding: "8px 16px" }}>
        <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}><span style={{ font: "800 18px/1.1 var(--font-display)", color: "var(--text-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{id}</span>{d.spikes && d.spikes[id] && <span style={{ display: "inline-flex", gap: 5, alignItems: "center", font: "600 13px/1.2 var(--font-body)", color: "var(--warn-400)" }}><MdIcon name="circle-alert" size={16} />Unusual rise · {d.spikes[id]}</span>}</span>
        <span style={{ display: "inline-flex", gap: 10, alignItems: "center", font: "600 16px/1 var(--font-mono)", color: "var(--text-body)", fontVariantNumeric: "tabular-nums" }}><span style={{ display: "inline-flex", gap: 4, alignItems: "center", color: c, font: "600 13px/1 var(--font-body)" }}><MdIcon name={ic} size={16} />{t}</span><span style={{ minWidth: 26, textAlign: "right" }}>{w}</span></span>
        <button onClick={() => setOpen(on ? null : id)} aria-expanded={on} aria-label={`Edit ${id}`} style={{ width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 99, border: "1px solid " + (on ? "var(--border-strong)" : "transparent"), background: on ? "var(--surface-raised)" : "transparent", color: "var(--text-muted)", cursor: "pointer" }}><MdIcon name={on ? "x" : "pencil"} size={16} /></button>
      </div>
      {on && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 16px 14px" }}>
        <MdButton size="sm" variant="secondary" icon="pencil" onClick={() => { setVal(id); setDlg({ k: "rename", id }); }}>Rename</MdButton>
        <MdButton size="sm" variant="secondary" icon="merge" onClick={() => { setVal(""); setDlg({ k: "merge", id }); }}>Merge into…</MdButton>
        <MdButton size="sm" variant="ghost" icon="trash-2" onClick={() => remove(id)}>Remove</MdButton>
      </div>}
    </li>; };

  return <div style={{ maxWidth: 1080, width: "100%", margin: "0 auto", padding: "24px var(--gutter-phone) 48px", display: "flex", flexDirection: "column", gap: 20 }}>
    <header style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}><span style={lab}>{d.label} draft</span><MdBadge tone="neutral">Not public</MdBadge></div>
      <h1 style={{ margin: 0, font: "800 clamp(30px,6vw,44px)/1.05 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>{window.CAQuestionText ? <window.CAQuestionText month={d} /> : d.question}</h1>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 4 }}>
        <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>{d.answers}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>answers this month</div></div>
        <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--warn-400)" }}>{d.flagged}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>flagged answers</div></div>
      </div>
    </header>
    <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1fr) 340px" : "minmax(0,1fr)", gap: 20, alignItems: "start" }}>
      <section aria-labelledby="md-ideas" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><h2 id="md-ideas" style={{ margin: 0, font: "var(--type-section)", color: "var(--text-strong)", flex: 1 }}>{shown.length} ideas go public</h2><a href="#" onClick={e => { e.preventDefault(); window.CAAdminTab && window.CAAdminTab("draftmap"); window.scrollTo(0, 0); }} style={{ minHeight: 44, display: "inline-flex", gap: 6, alignItems: "center", font: "700 16px/1 var(--font-body)", textDecoration: "none", minHeight: 40 }}>See it as a map<MdIcon name="arrow-right" size={16} /></a></div>
        <ul style={{ ...card, listStyle: "none", margin: 0, padding: 0, overflow: "hidden" }}>{shown.map(Row)}</ul>
        {hidden.length > 0 && <div style={{ ...card, padding: "4px 16px", background: "transparent" }}>
          <button onClick={() => setShowHidden(v => !v)} aria-expanded={showHidden} style={{ width: "100%", minHeight: 48, display: "flex", alignItems: "center", gap: 10, background: "none", border: 0, padding: 0, cursor: "pointer", color: "var(--text-muted)", font: "600 16px/1.3 var(--font-body)", textAlign: "left" }}><MdIcon name="eye-off" size={16} /><span style={{ flex: 1 }}>{hidden.length} hidden · under 3 mentions</span><MdIcon name={showHidden ? "chevron-up" : "chevron-down"} size={16} /></button>
          {showHidden && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 0 12px" }}>{hidden.map(n => <span key={n[0]} style={{ height: 30, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, border: "1px dashed var(--border-strong)", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)" }}>{n[0]}</span>)}</div>}
        </div>}
      </section>
      {Decide}
    </div>
    <MdDialog open={!!dlg && (dlg.k === "rename" || dlg.k === "merge")} title={dlg && dlg.k === "merge" ? `Merge “${dlg.id}” into…` : dlg ? `Rename “${dlg.id}”` : ""} onClose={() => setDlg(null)} actions={<><MdButton variant="ghost" onClick={() => setDlg(null)}>Cancel</MdButton><MdButton variant="primary" disabled={!val.trim() || (dlg && dlg.k === "merge" && !d.nodes.find(n => n[0] === val.trim().toLowerCase() && n[0] !== dlg.id))} onClick={() => { dlg.k === "merge" ? merge(dlg.id, val) : rename(dlg.id, val); setDlg(null); }}>{dlg && dlg.k === "merge" ? "Merge" : "Rename"}</MdButton></>}>
      <MdField label={dlg && dlg.k === "merge" ? "Idea to merge into" : "New label"} value={val} onChange={e => setVal(e.target.value)} hint={dlg && dlg.k === "merge" ? `One of: ${shown.filter(n => !dlg || n[0] !== dlg.id).slice(0, 5).map(n => n[0]).join(", ")}…` : "One or two plain words."} />
    </MdDialog>
    <MdDialog open={dlg === "publish"} title={`Publish ${d.label}?`} onClose={() => setDlg(null)} actions={<><MdButton variant="ghost" onClick={() => setDlg(null)}>Cancel</MdButton><MdButton variant="accent" disabled={!window.CAMatch(conf, "publish")} onClick={publish}>Publish</MdButton></>}>
      <p style={{ margin: "0 0 14px", font: "var(--type-body)", color: "var(--text-body)" }}>{shown.length} ideas become public. Hidden ideas, flagged answers and all answer text stay private.</p>
      <window.CATypeConfirm word="publish" value={conf} onChange={setConf} hint="The public map changes for everyone." />
    </MdDialog>
    <MdDialog open={dlg === "dismiss"} title="Dismiss this draft?" onClose={() => setDlg(null)} actions={<><MdButton variant="ghost" onClick={() => setDlg(null)}>Keep it</MdButton><MdButton variant="danger" onClick={() => { setDlg(null); if (live) { window.CAApi.post("/maps/draft/dismiss").then(reloadDraft, () => flash("Could not dismiss.")); return; } flash("Draft dismissed. Nothing was published."); }}>Dismiss</MdButton></>}>
      <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>The draft stays private and can be rebuilt from answers.</p>
    </MdDialog>
    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)", zIndex: 120, display: "flex", gap: 8, alignItems: "center" }}><MdToast tone="ok" onClose={() => { setToast(null); setUndo(null); }}>{toast}</MdToast>{undo && <MdButton size="sm" variant="secondary" icon="undo-2" onClick={() => { setD(undo); setUndo(null); setToast("Restored."); }}>Undo</MdButton>}</div>}
  </div>;
}
window.MapDraft = MapDraft;

// Draft map — its own screen. Only the map: size, connections, hidden ideas, Sep → draft change, zoom and pan.
function DraftMap() {
  const prev = window.CA_DATA.months.filter(m => m.published).slice(-1)[0];
  const [d, setD] = React.useState(() => window.CA_DRAFT_SEED || mdSeed);
  React.useEffect(() => {
    const f = () => window.CA_DRAFT_SEED && setD(window.CA_DRAFT_SEED);
    window.addEventListener("ca-data-ready", f);
    return () => window.removeEventListener("ca-data-ready", f);
  }, []);
  const last = prev ? Object.fromEntries(prev.nodes.map(n => [n[0], n[1]])) : {};
  const ids = d.nodes.map(n => n[0]), cnt = Object.fromEntries(d.nodes);
  const box = React.useRef(null); const [bw, setBw] = React.useState({ w: 900, h: 600 });
  React.useEffect(() => { const ro = new ResizeObserver(([e]) => setBw({ w: e.contentRect.width, h: e.contentRect.height })); box.current && ro.observe(box.current); return () => ro.disconnect(); }, []);
  const [k, setK] = React.useState(1); const anim = React.useRef(0);
  const morph = to => { cancelAnimationFrame(anim.current); const from = k, t0 = performance.now(); const f = now => { const p = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - p, 3); setK(from + (to - from) * e); if (p < 1) anim.current = requestAnimationFrame(f); }; anim.current = requestAnimationFrame(f); };
  const [sel, setSel] = React.useState(null);
  const [v, setV] = React.useState({ z: 1, x: 0, y: 0 }); const drag = React.useRef(null), moved = React.useRef(false), ptrs = React.useRef(new Map());
  const P = React.useMemo(() => mdPack(d.nodes.slice().sort((a, b) => b[1] - a[1]), d.links), []);
  const ext = ids.reduce((b, id) => { const p = P[id]; return { x0: Math.min(b.x0, p.x - p.r), x1: Math.max(b.x1, p.x + p.r), y0: Math.min(b.y0, p.y - p.r), y1: Math.max(b.y1, p.y + p.r) }; }, { x0: 0, x1: 0, y0: 0, y1: 0 });
  const base = Math.min(1.5, (bw.w - 80) / (ext.x1 - ext.x0), (bw.h - 80) / (ext.y1 - ext.y0)), S = base * v.z;
  const X = id => bw.w / 2 + (P[id].x - (ext.x0 + ext.x1) / 2) * S + v.x, Y = id => bw.h / 2 + (P[id].y - (ext.y0 + ext.y1) / 2) * S + v.y;
  const val = id => (last[id] || 0) + ((cnt[id] || 0) - (last[id] || 0)) * k;
  const zoomAt = (f, mx = bw.w / 2, my = bw.h / 2) => setV(o => { const z = Math.max(0.6, Math.min(3, o.z * f)), q = z / o.z; return { z, x: (mx - bw.w / 2) - (mx - bw.w / 2 - o.x) * q, y: (my - bw.h / 2) - (my - bw.h / 2 - o.y) * q }; });
  React.useEffect(() => { const el = box.current; if (!el) return; const w = e => { e.preventDefault(); const r = el.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top); }; el.addEventListener("wheel", w, { passive: false }); return () => el.removeEventListener("wheel", w); });
  const pd = e => { const r = box.current.getBoundingClientRect(); ptrs.current.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top }); box.current.setPointerCapture(e.pointerId); moved.current = false; drag.current = { v, pts: new Map(ptrs.current) }; };
  const pm = e => { if (!drag.current || !ptrs.current.has(e.pointerId)) return; const r = box.current.getBoundingClientRect(); ptrs.current.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top }); const A = [...drag.current.pts.values()], B = [...ptrs.current.values()];
    if (A.length > 1 && B.length > 1) { const z = Math.max(0.6, Math.min(3, drag.current.v.z * Math.hypot(B[0].x - B[1].x, B[0].y - B[1].y) / (Math.hypot(A[0].x - A[1].x, A[0].y - A[1].y) || 1))); moved.current = true; setV({ ...drag.current.v, z }); return; }
    const dx = B[0].x - A[0].x, dy = B[0].y - A[0].y; if (!moved.current && Math.hypot(dx, dy) < 5) return; moved.current = true; setV({ ...drag.current.v, x: drag.current.v.x + dx, y: drag.current.v.y + dy }); };
  const pu = e => { ptrs.current.delete(e.pointerId); drag.current = ptrs.current.size ? { v, pts: new Map(ptrs.current) } : null; };
  const near = sel ? new Set([sel, ...d.links.filter(l => l[0] === sel || l[1] === sel).map(l => l[0] === sel ? l[1] : l[0])]) : null;
  const maxL = Math.max(...d.links.map(l => l[2]));
  const ctl = { width: 44, height: 44, display: "grid", placeItems: "center", border: 0, background: "transparent", color: "var(--text-strong)", cursor: "pointer" };
  const selInfo = sel && (() => { const a = last[sel] || 0, b = cnt[sel], with_ = d.links.filter(l => l[0] === sel || l[1] === sel).sort((x, y) => y[2] - x[2]).map(l => l[0] === sel ? l[1] : l[0]); return { b, a, with_ }; })();
  return <div style={{ position: "relative", height: "calc(100svh - 116px)", minHeight: 420, display: "flex", flexDirection: "column" }}><h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", margin: 0 }}>Ideas map</h1>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "12px var(--gutter-phone)", borderBottom: "1px solid var(--border-subtle)" }}>
      <a href="#" onClick={e => { e.preventDefault(); window.CAAdminTab && window.CAAdminTab("map"); window.scrollTo(0, 0); }} style={{ minHeight: 44, display: "inline-flex", gap: 6, alignItems: "center", font: "600 16px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "none", minHeight: 40 }}><MdIcon name="arrow-left" size={16} />Map draft</a>
      <span style={{ flex: 1 }}></span>
      {prev && <div role="group" aria-label="Month" style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 999, border: "1px solid var(--border-subtle)", background: "var(--surface-raised)" }}>{[[prev.label, 0], [d.label + " draft", 1]].map(([l, t]) => { const on = (k >= 0.5 ? 1 : 0) === t; return <button key={l} onClick={() => morph(t)} aria-pressed={on} style={{ height: 36, padding: "0 14px", borderRadius: 999, border: 0, whiteSpace: "nowrap", cursor: "pointer", font: "600 13px/1 var(--font-body)", background: on ? "var(--bone-8)" : "transparent", color: on ? "var(--ink-0)" : "var(--text-muted)" }}>{l}</button>; })}</div>}
    </div>
    <div ref={box} onPointerDown={pd} onPointerMove={pm} onPointerUp={pu} onPointerCancel={pu} onClickCapture={e => { if (moved.current) { e.stopPropagation(); moved.current = false; } }} onClick={e => { if (e.target === e.currentTarget || e.target.tagName === "svg") setSel(null); }} style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden", touchAction: "none", cursor: "grab", background: "var(--surface-page)" }}>
      <svg width={bw.w} height={bw.h} role="img" aria-label={`Draft map, ${ids.length} ideas`} style={{ position: "absolute", inset: 0 }}>
        {d.links.map(l => { const lit = sel && (l[0] === sel || l[1] === sel); return <line key={l[0] + l[1]} x1={X(l[0])} y1={Y(l[0])} x2={X(l[1])} y2={Y(l[1])} stroke={lit ? "var(--bone-8)" : "var(--bone-7)"} strokeOpacity={sel ? (lit ? 0.95 : 0.06) : 0.4} strokeWidth={(1 + (l[2] / maxL) * 4) * Math.min(1.4, v.z)} strokeLinecap="round" />; })}
        {ids.map(id => { const w0 = val(id), hid = cnt[id] < 3, isNew = !last[id], r = Math.max(0, mdR(Math.max(w0, 0.01)) * S * (w0 <= 0.3 ? w0 / 0.3 : 1)); if (r < 2) return null; const on = sel === id, dim = near && !near.has(id), fs = Math.max(12, Math.min(26, r * 0.4));
          return <g key={id} onClick={() => setSel(s2 => s2 === id ? null : id)} style={{ cursor: "pointer", opacity: dim ? 0.2 : 1, transition: "opacity 200ms var(--ease-out)" }}>
            <circle cx={X(id)} cy={Y(id)} r={r} fill={hid ? "transparent" : on ? "var(--bone-8)" : isNew && k >= 0.5 ? "var(--lamp-400)" : "var(--ink-2)"} stroke={hid ? "var(--border-strong)" : on ? "var(--bone-8)" : isNew && k >= 0.5 ? "var(--lamp-400)" : "var(--ink-4)"} strokeWidth="1.5" strokeDasharray={hid ? "5 5" : undefined} />
            {r >= 22 ? <><text x={X(id)} y={Y(id) + (r > 40 ? -2 : fs * 0.35)} textAnchor="middle" style={{ font: `800 ${fs}px var(--font-display)`, fill: on || (isNew && k >= 0.5 && !hid) ? "var(--ink-0)" : hid ? "var(--text-muted)" : "var(--text-strong)", pointerEvents: "none" }}>{id}</text>{r > 40 && <text x={X(id)} y={Y(id) + fs} textAnchor="middle" style={{ font: `600 ${Math.max(12, fs * 0.55)}px var(--font-mono)`, fill: on || (isNew && k >= 0.5) ? "var(--ink-0)" : "var(--text-muted)", pointerEvents: "none" }}>{Math.round(w0)}</text>}</>
              : <text x={X(id)} y={Y(id) + r + 14} textAnchor="middle" style={{ font: "600 13px var(--font-body)", fill: "var(--text-muted)", pointerEvents: "none" }}>{id}</text>}
          </g>; })}
      </svg>
      {selInfo && <div role="status" onPointerDown={e => e.stopPropagation()} style={{ position: "absolute", left: 16, top: 16, maxWidth: "min(320px, calc(100% - 96px))", padding: 16, borderRadius: "var(--radius-lg)", background: "color-mix(in srgb, var(--ink-1) 94%, transparent)", border: "1px solid var(--border-default)", backdropFilter: "var(--blur-bar)", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>{sel}</span>
        <span style={{ font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)" }}>{selInfo.b} mentions{selInfo.a ? ` · ${selInfo.b - selInfo.a >= 0 ? "+" : ""}${selInfo.b - selInfo.a} since ${prev.label.split(" ")[0]}` : " · new this month"}{selInfo.b < 3 ? " · stays hidden" : ""}</span>
        {selInfo.with_.length > 0 && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Said with {selInfo.with_.join(", ")}</span>}
      </div>}
      <div role="group" aria-label="Zoom" onPointerDown={e => e.stopPropagation()} style={{ position: "absolute", right: 16, bottom: 16, display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden", background: "color-mix(in srgb, var(--ink-1) 92%, transparent)", border: "1px solid var(--border-default)" }}>
        <button aria-label="Zoom in" onClick={() => zoomAt(1.3)} style={ctl}><MdIcon name="plus" size={18} /></button>
        <button aria-label="Zoom out" onClick={() => zoomAt(1 / 1.3)} style={{ ...ctl, borderTop: "1px solid var(--border-subtle)" }}><MdIcon name="minus" size={18} /></button>
        <button aria-label="Fit the whole map" onClick={() => setV({ z: 1, x: 0, y: 0 })} style={{ ...ctl, borderTop: "1px solid var(--border-subtle)", color: v.z !== 1 || v.x || v.y ? "var(--lamp-400)" : "var(--text-muted)" }}><MdIcon name="locate-fixed" size={18} /></button>
      </div>
    </div>
    <div style={{ display: "flex", columnGap: 16, rowGap: 8, flexWrap: "wrap", padding: "10px var(--gutter-phone)", borderTop: "1px solid var(--border-subtle)", font: "var(--type-source)", color: "var(--text-muted)", flex: "none" }}>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 99, border: "1px solid var(--ink-4)", background: "var(--ink-2)" }}></span>Bigger = said more</span>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span aria-hidden="true" style={{ width: 20, height: 3, borderRadius: 3, background: "var(--bone-7)" }}></span>Line = said together</span>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 99, background: "var(--lamp-400)" }}></span>New</span>
      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 99, border: "1px dashed var(--border-strong)" }}></span>Hidden (under 3)</span>
    </div>
  </div>;
}
window.DraftMap = DraftMap;
