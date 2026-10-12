import React from "react";
export function Radio({ label, checked, onChange, disabled, name, value, description }) {
  const round = true;
  return (
    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, minHeight: 44, paddingTop: 10 }}>
      <input type="radio" checked={checked} onChange={onChange} disabled={disabled} name={name} value={value}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
      <span aria-hidden style={{ width: 22, height: 22, flex: "none", borderRadius: round ? 99 : 6, display: "flex", alignItems: "center", justifyContent: "center",
        border: `2px solid ${checked ? "var(--bone-8)" : "var(--border-strong)"}`, background: checked && !round ? "var(--bone-8)" : "transparent", transition: "all var(--dur-fast) var(--ease-out)" }}>
        {checked && (round ? <span style={{ width: 10, height: 10, borderRadius: 99, background: "var(--bone-8)" }} />
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-0)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ font: "400 16px/1.35 var(--font-body)", color: "var(--text-body)" }}>{label}</span>
        {description && <span style={{ font: "400 13px/1.4 var(--font-body)", color: "var(--text-muted)" }}>{description}</span>}
      </span>
    </label>
  );
}
