import React from "react";
export function Card({ title, eyebrow, action, padding = 20, tone = "default", children, style }) {
  const bg = tone === "raised" ? "var(--surface-raised)" : tone === "lamp" ? "var(--lamp-tint)" : "var(--surface-card)";
  const bd = tone === "lamp" ? "var(--lamp-600)" : "var(--border-default)";
  return (
    <section style={{ background: bg, border: `1px solid ${bd}`, borderRadius: "var(--radius-lg)", padding, display: "flex", flexDirection: "column", gap: 12, minWidth: 0, ...style }}>
      {(title || eyebrow || action) && <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
          {eyebrow && !title && <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: tone === "lamp" ? "var(--lamp-400)" : "var(--text-muted)" }}>{eyebrow}</div>}
          {title && <h2 style={{ margin: 0, font: "var(--type-section)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{title}</h2>}
        </div>{action}</header>}
      {children}
    </section>
  );
}
