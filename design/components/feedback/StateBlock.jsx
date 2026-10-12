import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";
const KIND = { loading: ["loader", "var(--text-body)", "var(--surface-raised)"], empty: ["inbox", "var(--text-body)", "var(--surface-raised)"], error: ["circle-alert", "var(--danger-400)", "var(--danger-tint)"], unavailable: ["cloud-off", "var(--warn-400)", "var(--warn-tint)"], uncovered: ["book-dashed", "var(--text-muted)", "var(--surface-raised)"] };
// Empty-state motifs: abstract, built from the product's own shapes (map bubbles, people circles, tradition dots, a check). Slow, quiet, off with reduced motion.
function Motif({ kind, h }) {
  const box = { display: "block", width: h * 4, maxWidth: "100%", height: h, overflow: "hidden" };
  const g = (d, dx, dy, dur) => ({ animation: `ca-fade-in 700ms var(--ease-out) ${d}ms both, ca-drift ${dur}s var(--ease-in-out) ${d}ms infinite`, "--dx": dx + "px", "--dy": dy + "px", transformBox: "fill-box", transformOrigin: "center" });
  if (kind === "map") return <svg viewBox="0 0 240 60" style={box} aria-hidden="true">
    {[[22, 32, 16, 0, 3, -3, 9], [62, 22, 11, 150, -3, 3, 11], [96, 36, 14, 300, 3, 2, 10], [132, 24, 8, 450, -2, -2, 8], [160, 38, 6, 600, 2, -3, 12]].map(([x, y, r, d, dx, dy, t], i) => <circle key={i} cx={x} cy={y} r={r} fill="var(--ink-3)" stroke="var(--bone-7)" strokeOpacity=".5" style={g(d, dx, dy, t)} />)}
    <circle cx="186" cy="28" r="5" fill="var(--lamp-400)" style={g(1100, 2, -2, 9)} />
  </svg>;
  if (kind === "people") return <svg viewBox="0 0 240 60" style={box} aria-hidden="true">
    {[22, 62, 102].map((x, i) => <circle key={x} cx={x} cy="30" r="14" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="4 5" style={{ transformBox: "fill-box", transformOrigin: "center", animation: `ca-fade-in 600ms var(--ease-out) ${i * 180}ms both, ca-breathe 4.8s var(--ease-in-out) ${i * 1.6}s infinite` }} />)}
  </svg>;
  if (kind === "word") return <svg viewBox="0 0 240 60" style={box} aria-hidden="true">
    <circle cx="30" cy="30" r="20" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
    <g style={{ transformBox: "view-box", transformOrigin: "30px 30px", animation: "ca-orbit 24s linear infinite" }}>
      {[["var(--trad-hindu)", 0], ["var(--trad-buddhist)", 120], ["var(--trad-christian)", 240]].map(([c, deg], i) => { const r = deg * Math.PI / 180; return <circle key={i} cx={30 + Math.cos(r) * 20} cy={30 + Math.sin(r) * 20} r="5" fill={c} style={{ animation: `ca-fade-in 700ms var(--ease-out) ${300 + i * 200}ms both` }} />; })}
    </g>
  </svg>;
  if (kind === "check") return <svg viewBox="0 0 240 60" style={box} aria-hidden="true">
    <circle cx="26" cy="30" r="20" fill="var(--ok-tint)" style={{ animation: "ca-fade-in 500ms var(--ease-out) both" }} />
    <path d="M16 30 l7 7 l13 -14" fill="none" stroke="var(--ok-400)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 36, "--len": 36, animation: "ca-draw 600ms var(--ease-out) 350ms both" }} />
  </svg>;
  return null;
}

export function StateBlock({ kind = "empty", title, message, onRetry, retryLabel = "Try again", compact, word, action, motif }) {
  if (word) return (
    <div role="status" style={{ display: "flex", flexDirection: "column", gap: 10, padding: compact ? "8px 0" : "24px 0" }}>
      {motif && <Motif kind={motif} h={compact ? 48 : 60} />}
      <span aria-hidden="true" style={{ font: `800 ${compact ? "clamp(40px,11vw,56px)" : "clamp(52px,14vw,80px)"}/.95 var(--font-display)`, letterSpacing: "-0.02em", color: "transparent", WebkitTextStroke: "1.25px var(--border-strong)", overflowWrap: "anywhere", animation: "ca-word-settle 900ms var(--ease-out) both" }}>{word}</span>
      {title && <div style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)", animation: "ca-rise 500ms var(--ease-out) 400ms both" }}>{title}</div>}
      {message && <div style={{ font: "400 16px/1.5 var(--font-body)", color: "var(--text-muted)", animation: "ca-rise 500ms var(--ease-out) 500ms both" }}>{message}</div>}
      {action && <div style={{ marginTop: 4, animation: "ca-rise 500ms var(--ease-out) 600ms both" }}><Button size="sm" variant="secondary" icon={action.icon} onClick={action.onClick}>{action.label}</Button></div>}
    </div>);
  const [ic, col, bg] = KIND[kind] || KIND.empty;
  if (kind === "loading" && !message) return (
    <div aria-busy="true" style={{ display: "flex", flexDirection: "column", gap: 10, padding: compact ? 0 : 8 }}>
      {[92, 78, 60].map((w, i) => <div key={i} style={{ height: 14, width: w + "%", borderRadius: 6, background: "var(--surface-hover)", animation: `ca-pulse 1.4s ${i * 0.15}s ease-in-out infinite` }} />)}
    </div>);
  return (
    <div role={kind === "error" ? "alert" : "status"} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: compact ? 0 : "20px 0" }}>
      <span aria-hidden="true" style={{ width: compact ? 36 : 40, height: compact ? 36 : 40, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: bg, color: col }}><span style={{ display: "flex", animation: kind === "loading" ? "ca-spin 1.2s linear infinite" : "none" }}><Icon name={ic} size={compact ? 18 : 20} /></span></span>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0, paddingTop: compact ? 7 : 9 }}>
        {title && <div style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{title}</div>}
        {message && <div style={{ font: `400 ${compact ? 14 : 15}px/1.5 var(--font-body)`, color: kind === "uncovered" ? "var(--text-muted)" : "var(--text-body)", fontStyle: kind === "uncovered" ? "italic" : "normal" }}>{message}</div>}
        {onRetry && <div><Button size="sm" variant="secondary" icon="rotate-cw" onClick={onRetry}>{retryLabel}</Button></div>}
      </div>
    </div>
  );
}
