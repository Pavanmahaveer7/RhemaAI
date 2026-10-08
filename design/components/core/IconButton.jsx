import React, { useState } from "react";
import { Icon } from "./Icon.jsx";
export function IconButton({ icon, label, size = 44, variant = "ghost", onClick, disabled, style }) {
  const [h, setH] = useState(false); const [p, setP] = useState(false); const [f, setF] = useState(false);
  const bg = variant === "filled" ? (h ? "var(--surface-hover)" : "var(--surface-raised)") : (h ? "var(--surface-hover)" : "transparent");
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)} onTouchStart={() => setP(true)} onTouchEnd={() => setP(false)} onFocus={(e) => setF(e.target.matches(":focus-visible"))} onBlur={() => setF(false)}
      style={{ width: size, height: size, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-pill)",
        border: variant === "outline" ? "1px solid var(--border-strong)" : "1px solid transparent", background: bg, color: "var(--text-body)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transform: p && !disabled ? "scale(var(--press-scale))" : "none", boxShadow: f ? "var(--focus-ring)" : "none", filter: "none", transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)", padding: 0, ...style }}>
      <Icon name={icon} size={size >= 44 ? 20 : 18} />
    </button>
  );
}
