import React from "react";
import { Icon } from "../core/Icon.jsx";
const S = { pass: ["check", "var(--ok-400)", "var(--ok-tint)"], fail: ["x", "var(--danger-400)", "var(--danger-tint)"], pending: ["clock", "var(--text-muted)", "var(--surface-raised)"], empty: ["circle-dashed", "var(--text-faint)", "transparent"] };
export function CheckBadge({ label, status = "empty", reason }) {
  const [ic, fg, bg] = S[status] || S.empty;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 12, borderRadius: "var(--radius-md)", background: bg, border: `1px ${status === "empty" ? "dashed" : "solid"} ${status === "empty" ? "var(--border-strong)" : "transparent"}`, minWidth: 0 }}>
      <span style={{ color: fg, display: "flex", marginTop: 1 }}><Icon name={ic} size={16} /></span>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: status === "empty" ? "var(--text-muted)" : fg }}>{label}</span>
        <span style={{ font: "400 13px/1.35 var(--font-body)", color: "var(--text-muted)" }}>{reason || (status === "empty" ? "Check not run yet" : "")}</span>
      </div>
    </div>
  );
}
