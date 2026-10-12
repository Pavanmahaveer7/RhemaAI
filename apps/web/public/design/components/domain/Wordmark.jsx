import React from "react";
export function Wordmark({ size = 22, style }) {
  const mark = Math.round(size * 1.25);
  return (
    <span aria-label="Rhema.ai" data-wordmark="" data-no-tr="" translate="no" style={{ display: "inline-flex", alignItems: "center", gap: Math.max(6, Math.round(size * 0.35)), whiteSpace: "nowrap", ...style }}>
      <img src="/brand/mark.svg" width={mark} height={mark} alt="" />
      <span style={{ font: `800 ${size}px/1 var(--font-display)`, letterSpacing: "-0.035em", color: "var(--text-strong)" }}>Rhema<span style={{ color: "var(--lamp-400)" }}>.</span>ai</span>
    </span>
  );
}
