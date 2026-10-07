import React from "react";
import { Icon } from "../core/Icon.jsx";
const T = { neutral: ["info", "var(--text-body)"], ok: ["check", "var(--ok-400)"], error: ["circle-alert", "var(--danger-400)"] };
export function Toast({ tone = "neutral", children, onClose }) {
  const [ic, col] = T[tone] || T.neutral;
  return (
    <div role="status" style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 52, padding: "10px 10px 10px 16px", borderRadius: "var(--radius-lg)", background: "var(--surface-raised)",
      border: "1px solid var(--border-default)", boxShadow: "var(--shadow-overlay)", color: "var(--text-body)", font: "400 16px/1.4 var(--font-body)", maxWidth: 440, animation: "ca-rise var(--dur-base) var(--ease-out)" }}>
      <span style={{ color: col, display: "flex" }}><Icon name={ic} size={18} /></span>
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && <button type="button" aria-label="Dismiss" onClick={onClose} style={{ width: 32, height: 32, border: 0, borderRadius: 99, background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={16} /></button>}
    </div>
  );
}
