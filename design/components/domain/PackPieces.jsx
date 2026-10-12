import React from "react";
import { Icon } from "../core/Icon.jsx";
export function PackPieces({ pieces = [], compact }) {
  const s = compact ? 40 : 48;
  return (
    <ul aria-label="Monthly pack pieces" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: `repeat(${pieces.length || 1}, minmax(0,1fr))`, gap: 8 }}>
      {pieces.map((p, i) => (
        <li key={p.label} aria-label={`${p.label}: ${p.in ? "in" : "not in yet"}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={{ position: "relative", width: s, height: s, borderRadius: 14, display: "grid", placeItems: "center",
            background: p.in ? "var(--surface-raised)" : "transparent", border: `1.5px ${p.in ? "solid" : "dashed"} ${p.in ? "var(--border-default)" : "var(--border-strong)"}`,
            color: p.in ? "var(--text-strong)" : "var(--text-faint)", animation: `ca-pop var(--dur-slow) var(--ease-out) ${i * 70}ms both` }}>
            <Icon name={p.icon} size={compact ? 18 : 20} />
            {p.in && <span style={{ position: "absolute", right: -5, top: -5, width: 18, height: 18, borderRadius: 99, background: "var(--lamp-400)", color: "var(--ink-0)", display: "grid", placeItems: "center", border: "2px solid var(--surface-card)" }}><Icon name="check" size={16} /></span>}
          </span>
          <span style={{ font: "600 13px/1.2 var(--font-body)", color: p.in ? "var(--text-body)" : "var(--text-faint)", textAlign: "center", overflowWrap: "anywhere" }}>{p.label}</span>
        </li>
      ))}
    </ul>
  );
}
