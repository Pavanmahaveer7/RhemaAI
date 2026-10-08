import React, { useState, useId } from "react";
import { Icon } from "../core/Icon.jsx";
function Field({ id, label, hint, error, children, count }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      {label && <label htmlFor={id} style={{ font: "700 13px/1.2 var(--font-body)", color: "var(--text-body)" }}>{label}</label>}
      {children}
      {(hint || error || count) && <div style={{ display: "flex", justifyContent: "space-between", gap: 12, font: "var(--fw-regular) var(--fs-caption)/1.4 var(--font-body)", color: error ? "var(--danger-400)" : "var(--text-muted)" }}>
        <span>{error || hint}</span>{count && <span style={{ font: "var(--type-source)" }}>{count}</span>}</div>}
    </div>
  );
}
export function Select({ label, options = [], value, onChange, hint, error, disabled, id, style }) {
  const [f, setF] = useState(false); const auto = useId(); const fid = id || auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <div style={{ position: "relative", ...style }}>
        <select id={fid} value={value} onChange={onChange} disabled={disabled} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ appearance: "none", width: "100%", height: 48, padding: "0 44px 0 16px", borderRadius: "var(--radius-md)", background: "var(--surface-card)", color: "var(--text-strong)",
            border: `1px solid ${error ? "var(--danger-400)" : f ? "var(--border-focus)" : "var(--border-default)"}`, boxShadow: f ? "0 0 0 3px var(--lamp-tint)" : "none", outline: "none", font: "400 16px/1 var(--font-body)" }}>
          {options.map(o => typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)", display: "flex" }}><Icon name="chevron-down" size={18} /></span>
      </div>
    </Field>
  );
}
