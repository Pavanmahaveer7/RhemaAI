import React from "react";
import { IconButton } from "../core/IconButton.jsx";
export function Dialog({ open, title, children, actions, onClose, width = 480, inline }) {
  if (!open) return null;
  const panel = (
    <div role="dialog" aria-modal={!inline} aria-label={typeof title === "string" ? title : undefined}
      style={{ width: "100%", maxWidth: width, background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-overlay)", padding: 24, display: "flex", flexDirection: "column", gap: 16, maxHeight: inline ? "none" : "calc(100dvh - 32px)", overflowY: "auto", boxSizing: "border-box", animation: "ca-rise var(--dur-base) var(--ease-out)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <h2 style={{ margin: 0, font: "700 24px/1.2 var(--font-display)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{title}</h2>
        {onClose && <IconButton icon="x" label="Close" size={36} onClick={onClose} />}
      </div>
      <div style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{children}</div>
      {actions && <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>{actions}</div>}
    </div>);
  if (inline) return panel;
  return <div onClick={e => e.target === e.currentTarget && onClose && onClose()} style={{ position: "fixed", inset: 0, background: "var(--scrim)", display: "flex", alignItems: "safe center", justifyContent: "center", padding: 16, overflowY: "auto", zIndex: 100 }}>{panel}</div>;
}
