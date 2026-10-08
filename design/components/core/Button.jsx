import React, { useState } from "react";
import { Icon } from "./Icon.jsx";
const SIZES = { sm: { h: 36, px: 14, fs: 13, ic: 16 }, md: { h: 44, px: 18, fs: 16, ic: 18 }, lg: { h: 56, px: 22, fs: 18, ic: 20 } };
const VARIANTS = {
  primary: { bg: "var(--action-primary-bg)", fg: "var(--action-primary-fg)", hov: "var(--action-primary-hover)", prs: "var(--action-primary-press)", bd: "transparent" },
  accent: { bg: "var(--action-accent-bg)", fg: "var(--action-accent-fg)", hov: "var(--action-accent-hover)", prs: "var(--action-accent-press)", bd: "transparent" },
  secondary: { bg: "transparent", fg: "var(--text-body)", hov: "var(--surface-hover)", bd: "var(--border-strong)" },
  ghost: { bg: "transparent", fg: "var(--text-body)", hov: "var(--surface-hover)", bd: "transparent" },
  danger: { bg: "transparent", fg: "var(--danger-400)", hov: "var(--danger-tint)", bd: "var(--danger-400)" },
};
export function Button({ variant = "primary", size = "md", icon, iconRight, fullWidth, disabled, loading, type = "button", onClick, children, style }) {
  const [h, setH] = useState(false); const [p, setP] = useState(false); const [f, setF] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary; const s = SIZES[size] || SIZES.md;
  const off = disabled || loading;
  return (
    <button type={type} disabled={off} onClick={onClick} aria-busy={loading || undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }}
      onFocus={(e) => setF(e.target.matches(":focus-visible"))} onBlur={() => setF(false)}
      onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      onTouchStart={() => setP(true)} onTouchEnd={() => setP(false)} onTouchCancel={() => setP(false)}
      style={{ display: fullWidth ? "flex" : "inline-flex", width: fullWidth ? "100%" : undefined, alignItems: "center", justifyContent: "center", gap: 8,
        height: s.h, padding: `0 ${s.px}px`, borderRadius: "var(--radius-pill)", border: `1px solid ${v.bd}`,
        background: off ? (variant === "primary" || variant === "accent" ? "var(--action-disabled-bg)" : v.bg) : p && v.prs ? v.prs : h ? v.hov : v.bg, boxShadow: f ? "var(--focus-ring)" : "none", filter: "none", color: off && (variant === "primary" || variant === "accent") ? "var(--action-disabled-fg)" : v.fg, font: `700 ${s.fs}px/1 var(--font-body)`, letterSpacing: "0.01em",
        cursor: off ? "not-allowed" : "pointer", opacity: disabled && !(variant === "primary" || variant === "accent") ? 0.45 : 1, transform: p && !off ? "scale(var(--press-scale))" : "none",
        transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)", whiteSpace: "nowrap", ...style }}>
      {loading ? <span style={{ width: 14, height: 14, borderRadius: 99, border: "2px solid currentColor", borderRightColor: "transparent", animation: "ca-spin .8s linear infinite" }} /> : icon && <Icon name={icon} size={s.ic} />}
      {children}
      {iconRight && !loading && <Icon name={iconRight} size={s.ic} />}
    </button>
  );
}
