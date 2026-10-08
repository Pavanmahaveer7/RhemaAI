import React from "react";
const TONES = { ok: ["var(--ok-tint)", "var(--ok-400)"], warn: ["var(--warn-tint)", "var(--warn-400)"], danger: ["var(--danger-tint)", "var(--danger-400)"],
  info: ["var(--info-tint)", "var(--info-400)"], neutral: ["var(--surface-raised)", "var(--text-muted)"] };
export function Badge({ tone = "neutral", dot = true, children, style }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 22, padding: "0 8px", borderRadius: "var(--radius-sm)", background: bg, color: fg,
    font: "600 13px/1 var(--font-body)", whiteSpace: "nowrap", ...style }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: 9, background: "currentColor" }} />}{children}</span>;
}
