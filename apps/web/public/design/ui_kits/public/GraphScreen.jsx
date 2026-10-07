const { Switch: GsSwitch, SegmentedControl: GsSeg, IconButton: GsIconBtn, Button: GsButton, Badge: GsBadge, StateBlock: GsState, TextField: GsField, Dialog: GsDialog, Toast: GsToast, Icon: GsIcon } = window.ChurchAIDesignSystem_06db43;

const gsDraft = { id: "2026-10", label: "Oct 2026 · draft", question: "What does faith mean to you?", term: "faith", answers: 97, flagged: 3,
  nodes: [["peace", 38, 1], ["prayer", 30], ["family", 26], ["silence", 17, 1], ["nature", 14, 1], ["hope", 21], ["worry", 12, 1], ["church", 16], ["work", 9], ["exile", 2, 1]],
  links: [["peace", "prayer", 14, "s"], ["peace", "silence", 11, "s"], ["peace", "nature", 8, "s"], ["family", "peace", 9, "s"], ["hope", "prayer", 7, "s"], ["worry", "work", 6, "s"], ["worry", "peace", 7, "t"], ["church", "prayer", 9, "s"], ["family", "work", 5, "t"], ["church", "silence", 4, "t"], ["exile", "worry", 2, "s"]] };

function gsLayout(months) {
  const ids = [...new Set(months.flatMap(m => m.nodes.map(n => n[0])))];
  const links = months.flatMap(m => m.links);
  const W = {}; months.forEach(m => m.nodes.forEach(n => W[n[0]] = Math.max(W[n[0]] || 0, n[1])));
  const P = {}; ids.forEach((id, i) => { const a = i * 2.39996; const r = 40 + 18 * Math.sqrt(i); P[id] = { x: Math.cos(a) * r, y: Math.sin(a) * r }; });
  for (let it = 0; it < 400; it++) {
    const F = {}; ids.forEach(id => F[id] = { x: -P[id].x * 0.004, y: -P[id].y * 0.004 });
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = P[ids[i]], b = P[ids[j]]; let dx = a.x - b.x, dy = a.y - b.y; const rr = 60 + Math.sqrt(W[ids[i]]) * 3.4 + Math.sqrt(W[ids[j]]) * 3.4; const d2 = Math.max(dx * dx + dy * dy, 40); const f = 9000 / d2 + (d2 < rr * rr ? (rr - Math.sqrt(d2)) * 0.5 : 0); const d = Math.sqrt(d2);
      F[ids[i]].x += dx / d * f; F[ids[i]].y += dy / d * f; F[ids[j]].x -= dx / d * f; F[ids[j]].y -= dy / d * f;
    }
    links.forEach(([s, t, w]) => { const a = P[s], b = P[t]; const dx = b.x - a.x, dy = b.y - a.y; const d = Math.sqrt(dx * dx + dy * dy) || 1; const f = (d - 170) * 0.02 * Math.min(1, w / 8); F[s].x += dx / d * f; F[s].y += dy / d * f; F[t].x -= dx / d * f; F[t].y -= dy / d * f; });
    ids.forEach(id => { P[id].x += Math.max(-8, Math.min(8, F[id].x)); P[id].y += Math.max(-8, Math.min(8, F[id].y)); });
  }
  return P;
}

const gsTerms = ["salvation", "marriage", "love", "faith"];
function gsPublished() { try { return JSON.parse(localStorage.getItem("ca_map_published")); } catch (e) { return null; } }
function GraphScreen({ admin, offset = 0 }) {
  const [, setRev] = React.useState(0);
  React.useEffect(() => { const f = () => setRev(n => n + 1); window.addEventListener("ca-data-ready", f); return () => window.removeEventListener("ca-data-ready", f); }, []);
  const wide = window.useWide();
  const pubBase = window.CA_DATA.months.filter(m => m.published); const extra = !admin && !(window.CAApi && window.CAApi.isLive()) && gsPublished(); const pub = extra ? [...pubBase.filter(x => x.id !== extra.id), extra] : pubBase;
  const [draft, setDraft] = React.useState(gsDraft);
  const pair = (admin ? [pub[pub.length - 1], draft] : pub.slice(-2)).filter(Boolean);
  const hasScrub = pair.length === 2;
  const curM = pair[pair.length - 1], lastM = hasScrub ? pair[0] : null;
  const [t, setT] = React.useState(1);
  const tt = hasScrub ? t : 1;
  const m = tt >= 0.5 ? curM : lastM;
  const before = mo => { const i = pub.findIndex(x => x.id === mo.id); return mo === draft ? pub[pub.length - 1] : i > 0 ? pub[i - 1] : null; };
  const prevM = before(m);
  const prevIds = new Set((prevM || { nodes: [] }).nodes.map(n => n[0]));
  const anim = React.useRef(0);
  const scrubTo = (to, open) => { cancelAnimationFrame(anim.current); const from = t, t0 = performance.now(); const step = now => { const k = Math.min(1, (now - t0) / 420), e = 1 - Math.pow(1 - k, 3); setT(from + (to - from) * e); if (k < 1) anim.current = requestAnimationFrame(step); }; anim.current = requestAnimationFrame(step); if (open) { setSel(null); setTotals(true); } };
  const base = React.useMemo(() => gsLayout(admin ? [pub[pub.length - 1], gsDraft].filter(Boolean) : pub), [admin, pub.length]);
  const [pos, setPos] = React.useState(base);
  React.useEffect(() => setPos(base), [base]);
  const fit = () => { const xs = [...new Set(pair.flatMap(p => p.nodes.map(n => n[0])))].map(id => [id]).map(n => base[n[0]]).filter(Boolean); if (!xs.length) return { x: 0, y: 0, k: 1 }; const pad = 40; const minX = Math.min(...xs.map(p => p.x)) - pad, maxX = Math.max(...xs.map(p => p.x)) + pad, minY = Math.min(...xs.map(p => p.y)) - pad, maxY = Math.max(...xs.map(p => p.y)) + pad + 10; const { w, h } = size.current; const hh = wide ? h - 60 : h - 210; const k = Math.max(0.4, Math.min(1.6, (w * 0.9) / (maxX - minX), (hh * 0.9) / (maxY - minY))); return { x: -((minX + maxX) / 2) * k, y: -((minY + maxY) / 2) * k + (wide ? 20 : -60), k }; };
  const [view, setView] = React.useState({ x: 0, y: 0, k: 1 });
  const [reading, setReading] = React.useState("shared");
  const [limit, setLimit] = React.useState(false);
  const [totals, setTotals] = React.useState(false);
  const [showTexts, setShowTexts] = React.useState(false);
  const [hint, setHint] = React.useState(true);
  const [record, setRecord] = React.useState([]);
  const [sel, setSel] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [dlg, setDlg] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [undo, setUndo] = React.useState(null); const [conf, setConf] = React.useState(""); const undoT = React.useRef(0);
  const [rename, setRename] = React.useState("");
  const drag = React.useRef(null); const svg = React.useRef(null); const ptrs = React.useRef(new Map()); const pinch = React.useRef(null);
  const size = React.useRef({ w: 800, h: 600 });
  const [, force] = React.useState(0);
  React.useEffect(() => { const f = () => { if (!svg.current) return; const r = svg.current.getBoundingClientRect(); size.current = { w: r.width, h: r.height }; setView(fit()); }; f(); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, [curM.id]);
  const raw = m.nodes.map(n => pos[n[0]] || { x: 0, y: 0 });
  const cx = raw.reduce((s, p) => s + p.x, 0) / (raw.length || 1), cy = raw.reduce((s, p) => s + p.y, 0) / (raw.length || 1);
  const dists = raw.map(p => Math.hypot(p.x - cx, p.y - cy)).sort((a, b) => a - b); const rad = dists[Math.floor(dists.length * 0.55)] || 0;
  const tight = p => { if (!limit) return p; const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy); if (d <= rad) return p; const nd = rad + (d - rad) * 0.6; return { x: cx + dx / d * nd, y: cy + dy / d * nd }; };
  const outerCount = dists.filter(d => d > rad).length;
  const toggleLimit = on => { setLimit(on); if (on) { const t = new Date(); setRecord(r => [{ month: m.label, at: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), n: outerCount }, ...r]); } };
  const hiddenRare = admin ? 0 : m.nodes.filter(n => n[1] < 3).length;
  const pw = mo => Object.fromEntries((mo ? mo.nodes : []).filter(n => admin || n[1] >= 3).map(n => [n[0], n[1]]));
  const WL = pw(lastM), WC = pw(curM), flag = Object.fromEntries(m.nodes.map(n => [n[0], !!n[2]]));
  const unionIds = [...new Set([...Object.keys(WL), ...Object.keys(WC)])];
  const nodes = unionIds.map(id => { const wl = WL[id] || 0, wc = WC[id] || 0, w = wl + (wc - wl) * tt, wSide = tt >= 0.5 ? wc : wl;
    const isNew = wSide > 0 && (prevM ? !prevIds.has(id) : flag[id]);
    return { id, w, wl, wc, wSide, isNew, p: tight(pos[id] || { x: 0, y: 0 }) }; }).filter(n => n.w > 0.3);
  if (limit) for (let it = 0; it < 30; it++) for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const A = nodes[i], B = nodes[j]; const min = 9 + Math.sqrt(A.w) * 3.4 + 9 + Math.sqrt(B.w) * 3.4 + 24;
    const dx = B.p.x - A.p.x, dy = B.p.y - A.p.y, d = Math.hypot(dx, dy) || 0.01;
    if (d < min) { const push = (min - d) / 2, ux = dx / d, uy = dy / d; A.p = { x: A.p.x - ux * push, y: A.p.y - uy * push }; B.p = { x: B.p.x + ux * push, y: B.p.y + uy * push }; }
  }
  const nmap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const links = m.links.filter(l => nmap[l[0]] && nmap[l[1]]);
  const drawLinks = hasScrub ? [...lastM.links.map(l => [...l, 1 - tt, "L"]), ...curM.links.map(l => [...l, tt, "C"])].filter(l => nmap[l[0]] && nmap[l[1]] && l[4] > 0.02) : links.map(l => [...l, 1, "C"]);
  const R = w => w < 1 ? 12.4 * w : 9 + Math.sqrt(w) * 3.4;
  const focus = hover || sel;
  const nb = focus ? links.filter(l => l[0] === focus || l[1] === focus).map(l => ({ id: l[0] === focus ? l[1] : l[0], w: l[2], kind: l[3] })) : [];
  const nbIds = new Set(nb.map(n => n.id));
  const dir = n => !hasScrub ? null : n.wl === 0 ? "new" : n.wc === 0 ? "gone" : n.wc > n.wl ? "up" : n.wc < n.wl ? "down" : "same";
  const toWorld = (cx, cy) => { const r = svg.current.getBoundingClientRect(); return { x: (cx - r.left - r.width / 2 - view.x) / view.k, y: (cy - r.top - r.height / 2 - view.y) / view.k }; };
  const onDown = (e, id) => { e.stopPropagation(); if (hint) setHint(false); svg.current.setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2) { const [p1, p2] = [...ptrs.current.values()]; pinch.current = { d: Math.hypot(p1.x - p2.x, p1.y - p2.y), k: view.k }; drag.current = null; return; } drag.current = id ? { id, moved: false } : { pan: true, sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: false }; };
  const onMove = e => {
    if (ptrs.current.has(e.pointerId)) ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && ptrs.current.size === 2) { const [p1, p2] = [...ptrs.current.values()]; const dd = Math.hypot(p1.x - p2.x, p1.y - p2.y); const k = Math.max(0.4, Math.min(3, pinch.current.k * dd / pinch.current.d)); setView(v => ({ ...v, k })); return; }
    const d = drag.current; if (!d) return; d.moved = true;
    if (d.pan) setView(v => ({ ...v, x: d.vx + e.clientX - d.sx, y: d.vy + e.clientY - d.sy }));
    else { const w = toWorld(e.clientX, e.clientY); setPos(p => ({ ...p, [d.id]: w })); } };
  const onUp = e => { if (e) ptrs.current.delete(e.pointerId); if (pinch.current) { if (ptrs.current.size < 2) pinch.current = null; drag.current = null; return; } const d = drag.current; drag.current = null; if (d && !d.moved) { if (d.pan) setSel(null); else pick(d.id); } };
  const pick = id => { if (!admin && gsTerms.includes(id) && window.CAGo) { window.CAGo("term", id, { m: "faith" }); return; } setTotals(false); setSel(id); };
  const zoom = f => setView(v => ({ ...v, k: Math.max(0.4, Math.min(3, v.k * f)) }));
  const newCount = nodes.filter(n => n.isNew).length;
  const selNode = sel && nmap[sel];

  const editNode = (kind) => {
    if (kind === "remove") { const prev = draft, name = sel; setDraft(d => ({ ...d, nodes: d.nodes.filter(n => n[0] !== sel), links: d.links.filter(l => l[0] !== sel && l[1] !== sel) })); clearTimeout(undoT.current); setUndo(prev); setToast(`Removed “${name}”.`); undoT.current = setTimeout(() => setUndo(null), 5000); }
    if (kind === "rename" && rename.trim()) { const nn = rename.trim().toLowerCase(); setPos(p => ({ ...p, [nn]: p[sel] })); setDraft(d => ({ ...d, nodes: d.nodes.map(n => n[0] === sel ? [nn, n[1], n[2]] : n), links: d.links.map(l => l.map((x, i) => i < 2 && x === sel ? nn : x)) })); }
    if (kind === "merge") { const into = rename.trim().toLowerCase(); if (!nmap[into]) return; setDraft(d => ({ ...d, nodes: d.nodes.filter(n => n[0] !== sel).map(n => n[0] === into ? [n[0], n[1] + nmap[sel].w, n[2]] : n), links: d.links.filter(l => !(l[0] === sel && l[1] === into) && !(l[1] === sel && l[0] === into)).map(l => l.map((x, i) => i < 2 && x === sel ? into : x)) })); }
    setSel(null); setDlg(null); setRename("");
  };

  const allNodes = m.nodes.map(([id, w, isNew]) => ({ id, w, isNew: !!isNew || (prevIds.size > 0 && !prevIds.has(id)) })).sort((a, b) => b.w - a.w);
  const listed = admin ? allNodes : allNodes.filter(n => n.w >= 3);
  const maxW = listed.length ? listed[0].w : 1;
  const totalsPanel = <>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--lamp-400)", flex: 1 }}>{m.label} · totals</div>
      <GsIconBtn icon="x" label="Close totals" size={36} onClick={() => setTotals(false)} />
    </div>
    <div style={{ font: "800 24px/1.15 var(--font-display)", color: "var(--text-strong)", textWrap: "balance" }}>{window.CAQuestionText ? <window.CAQuestionText month={m} /> : m.question}</div>
    {admin && m === draft ? <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>{m.answers}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>answers this month</div></div>
      <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--warn-400)" }}>{m.flagged}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>flagged answers</div></div>
    </div> : <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>{m.answers}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>answers</div></div>
      <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>{listed.length}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>concepts</div></div>
      <div><div style={{ font: "800 32px/1 var(--font-display)", color: "var(--lamp-400)" }}>{listed.filter(n => n.isNew).length}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>new since last month</div></div>
    </div>}
    <ul aria-label="Concept counts" style={{ listStyle: "none", margin: 0, padding: 0 }}>{listed.map(n => <li key={n.id}><button onClick={() => pick(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: 0, background: "none", border: 0, borderTop: "1px solid var(--border-subtle)", cursor: "pointer", textAlign: "left", color: "inherit" }}>
      <span style={{ width: 10 + 18 * n.w / maxW, height: 10 + 18 * n.w / maxW, flex: "none", borderRadius: 99, background: n.isNew ? "var(--lamp-400)" : "var(--ink-3)", border: `1.5px solid ${n.isNew ? "var(--lamp-300)" : "var(--bone-7)"}`, marginLeft: (28 - (10 + 18 * n.w / maxW)) / 2, marginRight: (28 - (10 + 18 * n.w / maxW)) / 2 }}></span>
      <span style={{ flex: 1, font: "var(--type-body)", color: "var(--text-body)" }}>{n.id}</span>
      {n.isNew && <GsBadge tone="info">New</GsBadge>}
      {admin && n.w < 3 && <GsBadge tone="warn">Under 3</GsBadge>}
      <span style={{ font: "600 13px/1 var(--font-mono)", color: "var(--text-strong)", minWidth: 32, textAlign: "right" }}>{n.w}</span>
    </button></li>)}</ul>
    <p style={{ font: "var(--type-source)", color: "var(--text-faint)", margin: 0 }}>{admin ? "Counts are answers that mentioned the idea. Ideas under 3 stay off the public map." : `Counts are answers that mentioned the idea. No names and no answer text.${hiddenRare ? ` ${hiddenRare} rare idea${hiddenRare > 1 ? "s" : ""} under 3 not listed.` : ""}`}</p>
  </>;
  const panel = <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {totals ? totalsPanel : selNode ? <>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ font: "800 32px/1 var(--font-display)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", flex: 1 }}>{selNode.id}</div>
        <GsIconBtn icon="x" label="Close" size={36} onClick={() => setSel(null)} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", font: "var(--type-source)", color: "var(--text-muted)" }}>Mentioned {selNode.wSide} times{hasScrub && selNode.wl > 0 && selNode.wc > 0 && selNode.wl !== selNode.wc ? ` · ${lastM.label.split(" ")[0]} ${selNode.wl} → ${curM.label.split(" ")[0]} ${selNode.wc}` : ""} {selNode.isNew && <GsBadge tone="info">New this month</GsBadge>}{admin && selNode.w < 3 && <GsBadge tone="warn">Under 3 · hidden when published</GsBadge>}</div>
      <div>
        <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)", marginBottom: 8 }}>Beside it</div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{nb.sort((a, b) => b.w - a.w).map(n => <li key={n.id}><button onClick={() => pick(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, minHeight: 44, background: "none", border: 0, borderTop: "1px solid var(--border-subtle)", color: "var(--text-body)", font: "var(--type-body)", cursor: "pointer", padding: 0, textAlign: "left" }}>
          <span style={{ width: 22, height: 0, borderTop: `${n.kind === "t" ? "2px dashed var(--graph-link-tension)" : "3px solid var(--bone-7)"}` }}></span>
          <span style={{ flex: 1 }}>{n.id}</span><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{n.kind === "t" ? "pulls apart" : "shared"} · {n.w}</span></button></li>)}</ul>
      </div>
      {admin && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 6 }}>
        <GsButton size="sm" variant="secondary" icon="pencil" onClick={() => { setRename(sel); setDlg("rename"); }}>Rename</GsButton>
        <GsButton size="sm" variant="secondary" icon="merge" onClick={() => { setRename(""); setDlg("merge"); }}>Merge</GsButton>
        <GsButton size="sm" variant="danger" icon="trash-2" onClick={() => editNode("remove")}>Remove</GsButton>
      </div>}
    </> : <>
      <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--lamp-400)" }}>{m.label}</div>
      <div style={{ font: "800 24px/1.1 var(--font-display)", color: "var(--text-strong)", textWrap: "balance" }}>{window.CAQuestionText ? <window.CAQuestionText month={m} /> : m.question}</div>
      {(() => { if (!hasScrub || m !== curM) return null; const ch = nodes.filter(n => n.wl > 0 && n.wc > n.wl).sort((a, b) => (b.wc - b.wl) - (a.wc - a.wl))[0]; const nw = nodes.filter(n => n.wl === 0 && n.wc > 0).length;
        const s = ch ? `“${ch.id}” grew most since last month.` : nw ? `${nw} new idea${nw > 1 ? "s" : ""} this month.` : "About the same as last month.";
        return <p style={{ font: "700 18px/1.35 var(--font-body)", color: "var(--text-strong)", margin: 0 }}>{s}</p>; })()}
      <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>{nodes.filter(n => n.wSide > 0).length} ideas. Bigger = said more. Tap one.</p>
      {newCount > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}><span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>New since last month:</span>{nodes.filter(n => n.isNew).map(n => <button key={n.id} onClick={() => pick(n.id)} style={{ height: 30, padding: "0 12px", borderRadius: 999, border: "1px solid var(--lamp-400)", background: "var(--lamp-tint)", color: "var(--lamp-300)", font: "600 13px/1 var(--font-body)", cursor: "pointer" }}>{n.id}</button>)}</div>}
      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" }}>Reach · {limit ? "Limited" : "Open"}</div>
        <p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: 0 }}>{limit ? `${outerCount} outer ideas pulled in tighter. This view is saved to the record.` : "Open reach. Anyone, anywhere counts as an idea. No places shown."}</p>
        <GsSwitch label="Limit" checked={limit} onChange={toggleLimit} />
        {record.length > 0 && <div><div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)", margin: "4px 0 6px" }}>Limited views on record</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{record.map((r, i) => <li key={i} style={{ font: "var(--type-source)", color: "var(--text-muted)", padding: "6px 0", borderTop: "1px solid var(--border-subtle)" }}>{r.month} · {r.at} · {r.n} outer concepts drawn tighter</li>)}</ul></div>}
      </div>
    </>}
  </div>;

  return <div style={{ position: "relative", flex: 1, display: "flex", height: wide ? `calc(100dvh - ${60 + offset}px)` : `calc(100dvh - ${124 + offset}px)`, minHeight: 420 }}>
    <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "var(--ink-0)" }}>
      {nodes.length === 0 ? <div style={{ padding: 40 }}><GsState kind="empty" word="soon" motif="map" title="Nothing published" message="No map has been published for this month yet." /></div> :
      <svg ref={svg} role="img" aria-label={`Ideas map, ${m.label}`} width="100%" height="100%" style={{ position: "absolute", inset: 0, touchAction: "none", cursor: drag.current?.pan ? "grabbing" : "grab" }}
        onPointerDown={e => onDown(e)} onPointerMove={onMove} onPointerUp={onUp} onWheel={e => zoom(e.deltaY < 0 ? 1.1 : 0.9)}>
        <g transform={`translate(${size.current.w / 2 + view.x} ${size.current.h / 2 + view.y}) scale(${view.k})`}>
          {drawLinks.map(([s, t2, w, kind, fade, side]) => { const t = t2; const a = nmap[s].p, b = nmap[t].p; const on = kind === (reading === "shared" ? "s" : "t"); const lit = focus && (s === focus || t === focus);
            return <line key={side + s + t} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={kind === "t" ? "var(--graph-link-tension)" : "var(--bone-7)"} strokeWidth={kind === "t" ? 2 : 1 + w * 0.55} strokeDasharray={kind === "t" ? "6 6" : undefined} strokeLinecap="round" opacity={fade * (focus ? (lit ? 0.95 : 0.06) : on ? (kind === "t" ? 0.9 : 0.45) : 0.07)} />; })}
          {nodes.map(n => { const r = R(n.w); const dim = focus && n.id !== focus && !nbIds.has(n.id);
            return <g key={n.id} transform={`translate(${n.p.x} ${n.p.y})`} opacity={dim ? 0.25 : 1} style={{ cursor: "pointer", transition: "opacity var(--dur-base)" }} onPointerDown={e => onDown(e, n.id)} onPointerEnter={() => setHover(n.id)} onPointerLeave={() => setHover(null)}>
              {hasScrub && (tt >= 0.5 ? n.wl : n.wc) > 0 && Math.abs(n.wc - n.wl) >= 1 && <circle r={R(tt >= 0.5 ? n.wl : n.wc)} fill="none" stroke="var(--bone-7)" strokeWidth="1.25" strokeDasharray="3 4" opacity=".7" />}
              {n.isNew && <circle r={r + 6} fill="none" stroke="var(--lamp-400)" strokeWidth="2" opacity=".55" />}
              <circle r={r} fill={n.isNew ? "var(--lamp-400)" : "var(--ink-3)"} opacity={n.wSide === 0 ? 0.5 : 1} stroke={sel === n.id ? "var(--bone-9)" : n.isNew ? "var(--lamp-300)" : "var(--bone-7)"} strokeWidth={sel === n.id ? 3 : 1.5} />
              <text y={r + 6 + 14 / view.k} textAnchor="middle" style={{ font: `700 ${(13 + Math.min(5, n.w / 10)) / view.k}px var(--font-body)`, fill: "var(--text-strong)", paintOrder: "stroke", stroke: "var(--ink-0)", strokeWidth: 4 / view.k, pointerEvents: "none", textDecoration: !admin && gsTerms.includes(n.id) ? "underline" : "none" }}>{n.id}</text>
              {focus === n.id && <text y={5} textAnchor="middle" style={{ font: "600 13px var(--font-mono)", fill: n.isNew ? "var(--ink-0)" : "var(--text-strong)", pointerEvents: "none" }}>{Math.round(n.w)}</text>}
            </g>; })}
        </g>
      </svg>}
      <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {!hasScrub && <GsButton size="sm" variant="secondary" icon="list" onClick={() => { setSel(null); setTotals(true); }}>{m.label}</GsButton>}
          {hasScrub && <div role="group" aria-label="Compare months" style={{ height: 36, display: "flex", alignItems: "center", gap: 6, padding: "0 4px", borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
            {[[lastM, 0], null, [curM, 1]].map((x, i) => x ? <button key={i} onClick={() => scrubTo(x[1], true)} aria-pressed={m === x[0]} aria-label={`${x[0].label}: open totals`} style={{ height: 28, padding: "0 10px", borderRadius: 999, border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", whiteSpace: "nowrap", background: m === x[0] ? "var(--bone-9)" : "transparent", color: m === x[0] ? "var(--ink-0)" : "var(--text-muted)" }}>{x[1] ? (admin ? "Draft" : x[0].label.split(" ")[0]) : x[0].label.split(" ")[0]}</button>
              : <input key="r" type="range" min="0" max="1" step="0.01" value={t} aria-label={`Scrub from ${lastM.label} to ${curM.label}`} onChange={e => { cancelAnimationFrame(anim.current); setT(+e.target.value); }} onPointerUp={() => scrubTo(t >= 0.5 ? 1 : 0)} style={{ width: 96, accentColor: "var(--lamp-400)", cursor: "ew-resize" }} />)}
          </div>}
          <GsSeg size="sm" label="Reading" value={reading} onChange={setReading} options={[{ value: "shared", label: "Shared" }, { value: "apart", label: "Pulls apart" }]} />
          <div style={{ height: 36, display: "flex", alignItems: "center", padding: "0 12px", borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}><GsSwitch label="Limit" checked={limit} onChange={toggleLimit} /></div>
        </div>
        {admin && <div style={{ pointerEvents: "auto", marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <GsBadge tone="neutral">Draft · not public</GsBadge>
          <GsBadge tone="warn">{draft.flagged} flagged answers · count only</GsBadge>
          <GsButton size="sm" variant="ghost" onClick={() => setDlg("dismiss")}>Discard draft</GsButton>
          <GsButton size="sm" variant="accent" icon="upload" onClick={() => { setConf(""); setDlg("publish"); }}>Publish</GsButton>
        </div>}
      </div>
      {admin && !sel && <div style={{ position: "absolute", left: 14, bottom: 14, right: 72, display: "flex", justifyContent: "flex-start", pointerEvents: "none" }}><div style={{ pointerEvents: "auto" }}><window.CAAboutDraft id="mapdraft">The assistant grouped this month’s answers into ideas. It can be wrong. Nothing goes public until you publish.</window.CAAboutDraft></div></div>}
      <div style={{ position: "absolute", right: 14, bottom: wide ? 14 : (sel ? 280 : 14), display: "flex", flexDirection: "column", gap: 6, transition: "bottom var(--dur-slow) var(--ease-out)" }}>
        <GsIconBtn icon="plus" label="Zoom in" variant="filled" onClick={() => zoom(1.2)} />
        <GsIconBtn icon="minus" label="Zoom out" variant="filled" onClick={() => zoom(0.83)} />
        <GsIconBtn icon="locate-fixed" label="Reset view" variant="filled" onClick={() => { setView(fit()); setPos(base); }} />
      </div>
      <div style={{ position: "absolute", left: 14, bottom: 14, display: wide ? "flex" : "none", gap: 16, font: "var(--type-source)", color: "var(--text-muted)" }}>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 22, borderTop: "3px solid var(--bone-7)" }}></span>shared</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 22, borderTop: "2px dashed var(--graph-link-tension)" }}></span>pulls apart</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 10, height: 10, borderRadius: 9, background: "var(--lamp-400)" }}></span>new since last month</span>
        {hasScrub && <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: 9, border: "1.25px dashed var(--bone-7)" }}></span>other month's size</span>}
      </div>
      {!wide && nodes.length > 0 && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: totals ? "62%" : sel ? 270 : 150, overflow: "auto", padding: 18, background: "color-mix(in srgb, var(--ink-1) 94%, transparent)", backdropFilter: "var(--blur-bar)", borderTop: "1px solid var(--border-default)", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>{panel}</div>}
      {hint && nodes.length > 0 && <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", pointerEvents: "none", display: "flex", gap: 8, alignItems: "center", padding: "10px 16px", borderRadius: 999, background: "color-mix(in srgb, var(--ink-2) 88%, transparent)", border: "1px solid var(--border-default)", backdropFilter: "var(--blur-bar)", font: "600 13px/1 var(--font-body)", color: "var(--text-body)", whiteSpace: "nowrap", animation: "ca-rise var(--dur-slow) var(--ease-out)" }}><GsIcon name="hand" size={16} />Drag · pinch · tap an idea</div>}
      {toast && <div style={{ position: "absolute", left: "50%", top: 70, transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}><GsToast tone="ok" onClose={() => { setToast(null); setUndo(null); }}>{toast}</GsToast>{undo && <GsButton size="sm" variant="secondary" icon="undo-2" onClick={() => { setDraft(undo); setUndo(null); setToast("Restored."); }}>Undo</GsButton>}</div>}
    </div>
    {wide && nodes.length > 0 && <aside style={{ width: 340, flex: "none", minHeight: 0, boxSizing: "border-box", borderLeft: "1px solid var(--border-subtle)", padding: 24, background: "var(--surface-card)", overflow: "auto" }}>{panel}</aside>}
    <GsDialog open={dlg === "rename" || dlg === "merge"} title={dlg === "merge" ? `Merge “${sel}” into…` : `Rename “${sel}”`} onClose={() => setDlg(null)} actions={<><GsButton variant="ghost" onClick={() => setDlg(null)}>Cancel</GsButton><GsButton variant="primary" onClick={() => editNode(dlg)}>{dlg === "merge" ? "Merge" : "Rename"}</GsButton></>}>
      <GsField label={dlg === "merge" ? "Concept to merge into" : "New label"} value={rename} onChange={e => setRename(e.target.value)} placeholder={dlg === "merge" ? "peace" : ""} hint={dlg === "merge" ? `Choose from: ${nodes.filter(n => n.id !== sel).map(n => n.id).join(", ")}` : undefined} />
    </GsDialog>
    <GsDialog open={dlg === "publish" || dlg === "dismiss"} title={dlg === "publish" ? "Publish this map?" : "Dismiss this draft?"} onClose={() => setDlg(null)} actions={<><GsButton variant="ghost" onClick={() => setDlg(null)}>Cancel</GsButton><GsButton variant={dlg === "publish" ? "accent" : "danger"} disabled={dlg === "publish" && !window.CAMatch(conf, "publish")} onClick={() => {
      setConf("");
      const live = admin && window.CAApi && window.CAApi.isLive();
      if (dlg === "publish") {
        if (live) {
          window.CAApi.post("/maps/draft/publish", { confirm: "publish" }).then(() => {
            window.CAHydrate && window.CAHydrate();
            setToast(`Published. The public map now shows ${draft.label}.`);
            setDlg(null);
          }, () => setToast("Could not publish."));
          return;
        }
        localStorage.setItem("ca_map_published", JSON.stringify({ id: draft.id, label: draft.label, question: draft.question, term: draft.term, published: true, answers: draft.answers, nodes: draft.nodes.filter(n => n[1] >= 3), links: draft.links }));
        setToast(`Published. The public map now shows ${draft.label}.`);
        setDlg(null);
        return;
      }
      if (live) {
        window.CAApi.post("/maps/draft/dismiss").then(() => {
          setToast("Draft dismissed. Nothing was published.");
          setDlg(null);
        }, () => setToast("Could not dismiss."));
        return;
      }
      setToast("Draft dismissed. Nothing was published.");
      setDlg(null);
    }}>{dlg === "publish" ? "Publish" : "Dismiss"}</GsButton></>}>
      <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>{dlg === "publish" ? `${nodes.filter(n => n.w >= 3).length} concepts become public. Ideas under 3 mentions and answer text are never published. The public map changes only now.` : "The draft stays private and can be rebuilt from answers."}</p>
      {dlg === "publish" && <div style={{ marginTop: 14 }}><window.CATypeConfirm word="publish" value={conf} onChange={setConf} hint="The public map changes for everyone." /></div>}
    </GsDialog>
  </div>;
}
window.GraphScreen = GraphScreen;
