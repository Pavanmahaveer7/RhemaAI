import React from "react";
export function Wordmark({ size = 22, style }) {
  return <span aria-label="Rhema.ai" data-wordmark="" data-no-tr="" translate="no" style={{ font: `800 ${size}px/1 var(--font-display)`, letterSpacing: "-0.035em", color: "var(--text-strong)", whiteSpace: "nowrap", ...style }}>Rhema<span style={{ color: "var(--lamp-400)" }}>.</span>ai</span>;
}
