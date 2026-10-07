const { Button: MpButton, Icon: MpIcon, StateBlock: MpState } = window.ChurchAIDesignSystem_06db43;

const mpTerms = ["salvation", "marriage", "love", "faith"];
const mpReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const mpR = w => w <= 0 ? 0 : 24 + Math.sqrt(w) * 7;
function mpPublished() { try { return JSON.parse(localStorage.getItem("ca_map_published")); } catch (e) { return null; } }

// Greedy circle packing: biggest first, each new bubble tangent to a placed one,
// pulled toward its strongest neighbour so related ideas sit together. No overlap.
function mpPack(ids, W, links) {
  const P = {}, placed = [], GAP = 8;
  const nb = id => links.filter(l => l[0] === id || l[1] === id).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]);
  ids.forEach((id, i) => {
    const r = mpR(W[id]);
    if (!i) { P[id] = { x: 0, y: 0, r }; placed.push(id); return; }
    const anchor = nb(id).find(n => P[n]);
    let best = null;
    placed.forEach(pid => { const p = P[pid];
      for (let a = 0; a < 36; a++) { const ang = a / 36 * Math.PI * 2, d = p.r + r + GAP, x = p.x + Math.cos(ang) * d, y = p.y + Math.sin(ang) * d;
        if (placed.some(q => { const o = P[q]; return Math.hypot(o.x - x, o.y - y) < o.r + r + GAP - 0.5; })) continue;
        const score = Math.hypot(x, y * 1.25) + (anchor ? Math.hypot(P[anchor].x - x, P[anchor].y - y) * 0.6 : 0);
        if (!best || score < best.s) best = { x, y, s: score }; } });
    P[id] = { x: best.x, y: best.y, r }; placed.push(id);
  });
  return P;
}

function PublicMap() {
  const [, setRev] = React.useState(0);
  React.useEffect(() => { const f = () => setRev(n => n + 1); window.addEventListener("ca-data-ready", f); return () => window.removeEventListener("ca-data-ready", f); }, []);
  const wide = window.useWide();
  const base = window.CA_DATA.months.filter(m => m.published), extra = (window.CAApi && window.CAApi.isLive()) ? null : mpPublished();
  const pub = extra ? [...base.filter(x => x.id !== extra.id), extra] : base;
  const pair = pub.slice(-2), two = pair.length === 2;
  const cur = pair[pair.length - 1], last = two ? pair[0] : null;
  const RH = window.CARhythm;
  const [release] = React.useState(() => RH ? RH.isRelease() : false);
  const [k, setK] = React.useState(() => (release && !mpReduce()) ? 0 : 1);
  const morphed = React.useRef(false);
  const [sel, setSel] = React.useState(null);
  const [tab, setTab] = React.useState("list");
  const [settled, setSettled] = React.useState(mpReduce());
  React.useEffect(() => { RH && RH.seeRelease(); }, []);
  const [calm, setCalm] = React.useState(mpReduce());
  const anim = React.useRef(0), box = React.useRef(null);
  const [bw, setBw] = React.useState({ w: 600, h: 500 });
  const [view, setView] = React.useState({ z: 1, x: 0, y: 0 }); const [touched, setTouched] = React.useState(false);
  const ptrs = React.useRef(new Map()), drag = React.useRef(null), moved = React.useRef(false), bwRef = React.useRef(bw); bwRef.current = bw;
  const ZMIN = 0.6, ZMAX = 3;
  const zoomAt = (f, mx, my) => setView(v => { const z = Math.max(ZMIN, Math.min(ZMAX, v.z * f)); if (z === v.z) return v; const b = bwRef.current, cxp = b.w / 2, cyp = b.h / 2; if (mx == null) { mx = cxp; my = cyp; } const k2 = z / v.z; return { z, x: (mx - cxp) - (mx - cxp - v.x) * k2, y: (my - cyp) - (my - cyp - v.y) * k2 }; });
  const fit = () => setView({ z: 1, x: 0, y: 0 });
  React.useEffect(() => { const el = box.current; if (!el) return; const w = e => { e.preventDefault(); setTouched(true); const r = el.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top); }; el.addEventListener("wheel", w, { passive: false }); return () => el.removeEventListener("wheel", w); });
  const onPD = e => { const el = box.current; el.setPointerCapture && el.setPointerCapture(e.pointerId); const r = el.getBoundingClientRect(); ptrs.current.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top }); moved.current = false; drag.current = { v: view, pts: new Map(ptrs.current) }; };
  const onPM = e => { if (!ptrs.current.has(e.pointerId) || !drag.current) return; const el = box.current, r = el.getBoundingClientRect(); ptrs.current.set(e.pointerId, { x: e.clientX - r.left, y: e.clientY - r.top }); const P = [...ptrs.current.values()], S = [...drag.current.pts.values()];
    if (P.length >= 2 && S.length >= 2) { const d0 = Math.hypot(S[0].x - S[1].x, S[0].y - S[1].y) || 1, d1 = Math.hypot(P[0].x - P[1].x, P[0].y - P[1].y); const m = { x: (P[0].x + P[1].x) / 2, y: (P[0].y + P[1].y) / 2 }; moved.current = true; setTouched(true); const v0 = drag.current.v, z = Math.max(ZMIN, Math.min(ZMAX, v0.z * d1 / d0)), k2 = z / v0.z, b = bwRef.current; setView({ z, x: (m.x - b.w / 2) - (m.x - b.w / 2 - v0.x) * k2, y: (m.y - b.h / 2) - (m.y - b.h / 2 - v0.y) * k2 }); return; }
    const a = S[0], p = P[0]; if (!a) return; const dx = p.x - a.x, dy = p.y - a.y; if (!moved.current && Math.hypot(dx, dy) < 5) return; moved.current = true; setTouched(true); setView({ ...drag.current.v, x: drag.current.v.x + dx, y: drag.current.v.y + dy }); };
  const onPU = e => { ptrs.current.delete(e.pointerId); if (ptrs.current.size === 0) drag.current = null; else drag.current = { v: view, pts: new Map(ptrs.current) }; };
  const onKey = e => { if (e.key === "+" || e.key === "=") { zoomAt(1.25); e.preventDefault(); } else if (e.key === "-") { zoomAt(0.8); e.preventDefault(); } else if (e.key === "0") { fit(); e.preventDefault(); } else if (e.key.startsWith("Arrow")) { const d = 40; setView(v => ({ ...v, x: v.x + (e.key === "ArrowLeft" ? d : e.key === "ArrowRight" ? -d : 0), y: v.y + (e.key === "ArrowUp" ? d : e.key === "ArrowDown" ? -d : 0) })); e.preventDefault(); } };
  React.useEffect(() => { const a = requestAnimationFrame(() => setSettled(true)); const b = setTimeout(() => setCalm(true), 1300); return () => { cancelAnimationFrame(a); clearTimeout(b); }; }, [tab]);
  React.useEffect(() => { if (!box.current) return; const ro = new ResizeObserver(([e]) => setBw({ w: e.contentRect.width, h: e.contentRect.height })); ro.observe(box.current); return () => ro.disconnect(); }, [tab, wide]);
  if (!cur) return <div style={{ maxWidth: 520, width: "100%", margin: "0 auto", padding: "40px var(--gutter-phone)" }}><MpState kind="empty" word="soon" motif="map" title="No map yet" message="The first map appears when a month is published." /></div>;

  const W = mo => Object.fromEntries((mo ? mo.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wl = W(last), wc = W(cur);
  const maxW = {}; [...Object.keys(wl), ...Object.keys(wc)].forEach(id => maxW[id] = Math.max(wl[id] || 0, wc[id] || 0));
  const ids = Object.keys(maxW).sort((a, b) => maxW[b] - maxW[a]);
  const allLinks = [...(last ? last.links : []), ...cur.links];
  const pos = React.useMemo(() => mpPack(ids, maxW, allLinks), [ids.join()]);
  const show = k >= 0.5 ? cur : last || cur;
  React.useEffect(() => { if (morphed.current || k === 1 || !two) { if (!two && k !== 1) setK(1); return; } morphed.current = true; const id = setTimeout(() => go(1), 900); return () => clearTimeout(id); }, [two]);
  const val = id => (wl[id] || 0) + ((wc[id] || 0) - (wl[id] || 0)) * (two ? k : 1);
  const side = id => (show === cur ? wc[id] : wl[id]) || 0;
  const few = n => n < 10 ? "under 10" : String(Math.round(n));
  const isNew = id => show === cur && (two ? !wl[id] && !!wc[id] : !!(cur.nodes.find(n => n[0] === id) || [])[2]);
  const delta = id => two && show === cur ? (wc[id] || 0) - (wl[id] || 0) : 0;
  const rows = ids.filter(id => side(id) > 0).sort((a, b) => side(b) - side(a));
  const nbs = id => show.links.filter(l => (l[0] === id || l[1] === id)).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]).filter(n => side(n) > 0);
  const focusSet = sel ? new Set([sel, ...nbs(sel)]) : null;
  const go = to => { cancelAnimationFrame(anim.current); setSel(null); if (mpReduce()) { setK(to); return; } const from = k, t0 = performance.now(); const dur = morphed.current && from === 0 ? 1400 : 650; const f = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); setK(from + (to - from) * e); if (p < 1) anim.current = requestAnimationFrame(f); }; anim.current = requestAnimationFrame(f); };
  const pick = id => { if (mpTerms.includes(id) && window.CAGo) { window.CAGo("term", id); return; } setSel(s => s === id ? null : id); };
  const grew = rows.filter(id => (wl[id] || 0) > 0 && delta(id) > 0).sort((a, b) => delta(b) - delta(a))[0];
  const nNew = rows.filter(isNew).length;
  const mineRaw = RH && RH.mine(show.id); const mineId = mineRaw && rows.includes(mineRaw) ? mineRaw : null;
  const sentence = show !== cur || !two ? `${rows.length} ideas in ${show.label}.` : grew ? `“${grew}” grew most since ${last.label.split(" ")[0]}.` : nNew ? `${nNew} new idea${nNew > 1 ? "s" : ""} this month.` : "About the same as last month.";

  // bubble canvas bounds
  const ext = ids.reduce((b, id) => { const p = pos[id]; return { x0: Math.min(b.x0, p.x - p.r), x1: Math.max(b.x1, p.x + p.r), y0: Math.min(b.y0, p.y - p.r), y1: Math.max(b.y1, p.y + p.r) }; }, { x0: 0, x1: 0, y0: 0, y1: 0 });
  const pad = 16, sc = Math.min(1.3, (bw.w - pad * 2) / (ext.x1 - ext.x0 || 1), (bw.h - pad * 2) / (ext.y1 - ext.y0 || 1));
  const cx = (ext.x0 + ext.x1) / 2, cy = (ext.y0 + ext.y1) / 2;

  const Trend = ({ id, size = 16 }) => { if (isNew(id)) return <MpIcon name="circle-plus" size={size} color="var(--lamp-400)" label="New this month" />; const d = delta(id); if (!d) return null; return <MpIcon name={d > 0 ? "arrow-up-right" : "arrow-down-right"} size={size} color={d > 0 ? "var(--ok-400)" : "var(--text-muted)"} label={d > 0 ? "Up" : "Down"} />; };
  const Chips = id => <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{nbs(id).slice(0, 6).map(n => <button key={n} onClick={() => pick(n)} style={{ height: 40, padding: "0 14px", borderRadius: 999, border: "1px solid var(--border-default)", background: "transparent", color: "var(--text-body)", font: "600 16px/1 var(--font-body)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>{n}{mpTerms.includes(n) && <MpIcon name="book-open" size={16} color="var(--text-muted)" />}</button>)}{!nbs(id).length && <span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>Said on its own this month.</span>}</div>;
  const Detail = (id, onBack) => { const d = delta(id); return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <button onClick={onBack} style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 40, padding: 0, background: "none", border: 0, color: "var(--text-muted)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}><MpIcon name="arrow-left" size={16} />All ideas</button>
    <div style={{ font: "800 48px/1 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", overflowWrap: "anywhere" }}>{id}</div>
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)" }}>
      <span><b style={{ font: "700 24px/1 var(--font-mono)", color: "var(--text-strong)" }}>{few(side(id))}</b> mentions</span>
      {isNew(id) ? <span style={{ display: "inline-flex", gap: 6, alignItems: "center", color: "var(--lamp-400)" }}><MpIcon name="circle-plus" size={16} />New this month</span> : d ? <span style={{ display: "inline-flex", gap: 6, alignItems: "center", color: d > 0 ? "var(--ok-400)" : "var(--text-muted)" }}><Trend id={id} />{d > 0 ? "+" : ""}{d} since {last.label.split(" ")[0]}</span> : null}
    </div>
    <div style={{ font: "700 13px/1 var(--font-body)", color: "var(--text-muted)", marginTop: 4 }}>Said with</div>
    {Chips(id)}
  </div>; };

  const Row = (id, i) => { const open = sel === id, term = mpTerms.includes(id);
    return <li key={id} style={{ borderTop: i ? "1px solid var(--border-subtle)" : 0 }}>
      <button onClick={() => pick(id)} aria-expanded={term ? undefined : open} style={{ width: "100%", minHeight: 60, display: "grid", gridTemplateColumns: "minmax(0,1fr) auto 20px", gap: 12, alignItems: "center", padding: "10px 0", background: "none", border: 0, cursor: "pointer", color: "inherit", textAlign: "left" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}><span style={{ font: `800 ${Math.round(18 + Math.min(10, side(id) / 5))}px/1.1 var(--font-display)`, letterSpacing: "var(--tracking-heading)", color: isNew(id) ? "var(--lamp-400)" : "var(--text-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{id}</span>{term && <MpIcon name="book-open" size={16} color="var(--text-muted)" label="Opens in the dictionary" />}</span>
        <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><Trend id={id} /><span style={{ font: "600 16px/1 var(--font-mono)", color: "var(--text-body)", fontVariantNumeric: "tabular-nums", minWidth: 28, textAlign: "right" }}>{few(side(id))}</span></span>
        <MpIcon name={term ? "arrow-up-right" : open ? "minus" : "chevron-right"} size={16} color="var(--text-muted)" />
      </button>
      {open && <div style={{ padding: "0 0 16px", display: "flex", flexDirection: "column", gap: 10 }}><div style={{ font: "700 13px/1 var(--font-body)", color: "var(--text-muted)" }}>Said with</div>{Chips(id)}</div>}
    </li>; };

  const Toggle = () => two ? <div role="group" aria-label="Month" style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 999, border: "1px solid var(--border-subtle)", background: "var(--surface-raised)" }}>{[[last, 0], [cur, 1]].map(([mo, v]) => <button key={mo.id} onClick={() => go(v)} aria-pressed={show === mo} style={{ height: 36, padding: "0 16px", borderRadius: 999, border: 0, whiteSpace: "nowrap", cursor: "pointer", font: "600 13px/1 var(--font-body)", background: show === mo ? "var(--bone-8)" : "transparent", color: show === mo ? "var(--ink-0)" : "var(--text-muted)" }}>{mo.label}</button>)}</div> : <span style={{ font: "600 13px/1 var(--font-body)", color: "var(--text-muted)" }}>{cur.label}</span>;

  const Head = () => <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {Toggle()}
    {release && show === cur && <div role="status" style={{ font: "700 13px/1 var(--font-body)", color: "var(--lamp-400)" }}>{cur.label.split(" ")[0]}’s map is out.</div>}
    <h1 style={{ font: "800 clamp(28px,7vw,36px)/1.05 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: "4px 0 0", textWrap: "balance" }}>{window.CAQuestionText ? <window.CAQuestionText month={show} /> : show.question}</h1>
    <div style={{ display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}><span style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)", fontVariantNumeric: "tabular-nums" }}>{Math.round((last ? last.answers : 0) + (cur.answers - (last ? last.answers : 0)) * (two ? k : 1))}</span><span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>answers · counts only, no names</span></div>
    <p style={{ font: "700 18px/1.35 var(--font-body)", color: "var(--text-strong)", margin: 0 }}>{sentence}</p>
    <p style={{ display: "flex", gap: 8, alignItems: "flex-start", font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}><MpIcon name="shield" size={16} style={{ flex: "none", marginTop: 1 }} />Ideas only, never words. Small counts show as “under 10”. A region shows once 50 people there have answered.</p>
    {mineId && <p style={{ display: "flex", gap: 8, alignItems: "center", font: "600 16px/1.3 var(--font-body)", color: "var(--text-body)", margin: 0 }}><MpIcon name="circle-dot" size={16} color="var(--bone-8)" />You said “{mineId}”. Only this device knows.</p>}
  </div>;

  const S = sc * view.z, X = id => bw.w / 2 + (pos[id].x - cx) * S + view.x, Y = id => bw.h / 2 + (pos[id].y - cy) * S + view.y;
  const ctl = { width: 44, height: 44, display: "grid", placeItems: "center", border: 0, background: "transparent", color: "var(--text-strong)", cursor: "pointer" };
  const Bubbles = () => <div ref={box} tabIndex={0} role="application" aria-label="Map of ideas. Drag to move, scroll or pinch to zoom. Plus, minus and 0 keys also work." onKeyDown={onKey} onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerCancel={onPU} onClickCapture={e => { if (moved.current) { e.stopPropagation(); e.preventDefault(); moved.current = false; } }} onDoubleClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); zoomAt(1.6, e.clientX - r.left, e.clientY - r.top); } }} style={{ position: "relative", width: "100%", height: "100%", minHeight: wide ? 0 : 420, overflow: "hidden", borderRadius: wide ? 0 : "var(--radius-lg)", background: "var(--surface-page)", border: wide ? 0 : "1px solid var(--border-subtle)", touchAction: "none", cursor: drag.current && moved.current ? "grabbing" : "grab", outline: "none" }} onClick={e => { if (e.target === e.currentTarget) setSel(null); }}>
    {sel && <svg aria-hidden="true" width={bw.w} height={bw.h} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{nbs(sel).map(n => pos[n] && <line key={n} x1={X(sel)} y1={Y(sel)} x2={X(n)} y2={Y(n)} stroke="var(--bone-7)" strokeOpacity=".55" strokeWidth="1.5" />)}</svg>}
    {ids.map((id, i) => { const p = pos[id], w = val(id), r = mpR(w) * S; if (r < 2) return null; const nw = isNew(id), on = sel === id, dim = focusSet && !focusSet.has(id), term = mpTerms.includes(id);
      const fs = Math.max(12, Math.min(26, r * 0.36));
      return <button key={id} onClick={() => pick(id)} aria-label={`${id}, ${few(w)} mentions${nw ? ", new this month" : ""}${term ? ", opens in the dictionary" : ""}`} title={r < 22 ? `${id} · ${few(w)}` : undefined} style={{ position: "absolute", left: X(id) - r, top: Y(id) - r, width: r * 2, height: r * 2, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: 4, cursor: "pointer",
        background: on ? "var(--bone-8)" : nw ? "var(--lamp-400)" : "var(--ink-2)", border: `1px solid ${on ? "var(--bone-8)" : nw ? "var(--lamp-400)" : "var(--ink-4)"}`, outline: id === mineId ? "2px solid var(--bone-8)" : "none", outlineOffset: 4, color: on || nw ? "var(--ink-0)" : "var(--text-strong)",
        opacity: settled ? (dim ? 0.22 : 1) : 0, transform: settled ? "scale(1)" : "scale(.6)", transition: `opacity 360ms var(--ease-out) ${calm ? 0 : (id === mineId ? ids.length * 30 + 420 : i * 30)}ms, transform 520ms var(--ease-out) ${calm ? 0 : (id === mineId ? ids.length * 30 + 420 : i * 30)}ms, background 150ms, border-color 150ms` }}>
        {r >= 22 && <span style={{ font: `800 ${fs}px/1 var(--font-display)`, letterSpacing: "-0.01em", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: term ? "underline" : "none", textUnderlineOffset: "0.14em", textDecorationThickness: "0.06em" }}>{id}</span>}
        {r > 38 && <span style={{ font: `600 ${Math.max(12, fs * 0.55)}px/1 var(--font-mono)`, opacity: 0.75 }}>{few(w)}</span>}
      </button>; })}
    <a href="/search" onPointerDown={e => e.stopPropagation()} onClick={e => { if (window.CAGo) { e.preventDefault(); window.CAGo("search"); } }} style={{ position: "absolute", left: 12, top: 12, minHeight: 44, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", borderRadius: 999, background: "color-mix(in srgb, var(--ink-1) 92%, transparent)", border: "1px solid var(--border-default)", color: "var(--text-strong)", font: "600 13px/1 var(--font-body)", textDecoration: "none", backdropFilter: "var(--blur-bar)" }}>← Dictionary <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ Map of ideas</span></a>
    <div role="group" aria-label="Zoom" onPointerDown={e => e.stopPropagation()} style={{ position: "absolute", right: 12, bottom: 12, display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden", background: "color-mix(in srgb, var(--ink-1) 92%, transparent)", border: "1px solid var(--border-default)", backdropFilter: "var(--blur-bar)" }}>
      <button aria-label="Zoom in" disabled={view.z >= ZMAX} onClick={() => zoomAt(1.3)} style={{ ...ctl, opacity: view.z >= ZMAX ? 0.4 : 1 }}><MpIcon name="plus" size={18} /></button>
      <button aria-label="Zoom out" disabled={view.z <= ZMIN} onClick={() => zoomAt(1 / 1.3)} style={{ ...ctl, borderTop: "1px solid var(--border-subtle)", opacity: view.z <= ZMIN ? 0.4 : 1 }}><MpIcon name="minus" size={18} /></button>
      <button aria-label="Fit the whole map" onClick={fit} style={{ ...ctl, borderTop: "1px solid var(--border-subtle)", color: view.z !== 1 || view.x || view.y ? "var(--lamp-400)" : "var(--text-muted)" }}><MpIcon name="locate-fixed" size={18} /></button>
    </div>
    {!touched && !wide && <div aria-hidden="true" style={{ position: "absolute", left: 12, bottom: 12, padding: "6px 10px", borderRadius: 999, background: "color-mix(in srgb, var(--ink-1) 88%, transparent)", border: "1px solid var(--border-subtle)", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", pointerEvents: "none", whiteSpace: "nowrap", maxWidth: "calc(100% - 80px)", overflow: "hidden", textOverflow: "ellipsis" }}>Drag · pinch or scroll to zoom</div>}
  </div>;

  const Legend = () => <div style={{ display: "flex", gap: 16, flexWrap: "wrap", font: "var(--type-source)", color: "var(--text-muted)" }}>
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: 99, background: "var(--lamp-400)" }}></span>New</span>
    {two && <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><MpIcon name="arrow-up-right" size={16} color="var(--ok-400)" />Said more</span>}
    {two && <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><MpIcon name="arrow-down-right" size={16} />Said less</span>}
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span style={{ textDecoration: "underline", textUnderlineOffset: 3, color: "var(--text-body)" }}>word</span>Opens the dictionary</span>
  </div>;

  const List = () => <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{rows.map((id, i) => Row(id, i))}</ul>;

  if (wide) return <div style={{ flex: "none", display: "grid", gridTemplateColumns: "minmax(0,1fr) 400px", gridTemplateRows: "minmax(0,1fr)", height: "calc(100svh - 60px)", minHeight: 0 }}>
    <div style={{ position: "relative", minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 0 }}>{Bubbles()}</div>
      <div style={{ padding: "12px 24px 18px" }}>{Legend()}</div>
    </div>
    <aside aria-label="This month" style={{ minHeight: 0, borderLeft: "1px solid var(--border-subtle)", background: "var(--surface-card)", overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {sel ? Detail(sel, () => setSel(null)) : <>{Head()}<div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 8 }}>{List()}</div><MapPrevious onOpen={m => { const i = [last, cur].indexOf([last, cur].find(x => x && x.id === m.id)); if (i >= 0 && two) go(i); window.scrollTo(0, 0); }} /></>}
    </aside>
  </div>;

  return <div style={{ maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "24px var(--gutter-phone) 96px", display: "flex", flexDirection: "column", gap: 18 }}>
    {Head()}
    <div role="tablist" aria-label="View" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, padding: 4, borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
      {[["list", "List", "list"], ["map", "Map", "waypoints"]].map(([v, l, ic]) => <button key={v} role="tab" aria-selected={tab === v} onClick={() => { setTab(v); setSettled(mpReduce()); setCalm(mpReduce()); }} style={{ height: 40, borderRadius: 999, border: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, font: "600 16px/1 var(--font-body)", background: tab === v ? "var(--bone-8)" : "transparent", color: tab === v ? "var(--ink-0)" : "var(--text-muted)" }}><MpIcon name={ic} size={16} />{l}</button>)}
    </div>
    {tab === "list" ? <>{List()}<MapPrevious onOpen={m => { const i = [last, cur].findIndex(x => x && x.id === m.id); if (i >= 0 && two) go(i); window.scrollTo(0, 0); }} /></> : <>
      <div style={{ height: 440 }}>{Bubbles()}</div>
      {Legend()}
      {sel && <div style={{ padding: 18, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "var(--surface-card)" }}>{Detail(sel, () => setSel(null))}</div>}
    </>}
  </div>;
}
function MapPrevious({ onOpen }) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice().reverse();
  if (pub.length < 2) return null;
  return <section aria-labelledby="mp-prev" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <h2 id="mp-prev" style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0 }}>Previous questions</h2>
    <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: "0 0 8px" }}>Counts only. No names, no answers.</p>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border-subtle)" }}>{pub.map(m => <li key={m.id}><button onClick={() => onOpen(m)} style={{ width: "100%", minHeight: 64, display: "flex", alignItems: "center", gap: 12, padding: "12px 0", background: "none", border: 0, borderBottom: "1px solid var(--border-subtle)", cursor: "pointer", color: "inherit", textAlign: "left" }}>
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}><span style={{ font: "600 13px/1.2 var(--font-body)", color: "var(--text-muted)" }}>{m.label}</span><span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{m.question}</span></span>
      <span style={{ font: "600 13px/1 var(--font-mono)", color: "var(--text-body)" }}>{m.answers}</span><MpIcon name="chevron-right" size={16} color="var(--text-muted)" />
    </button></li>)}</ul>
  </section>;
}
window.PublicMap = PublicMap;
