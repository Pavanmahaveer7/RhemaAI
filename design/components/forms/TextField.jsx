import React, { useState, useId } from "react";
import { Icon } from "../core/Icon.jsx";
function Field({ id, label, hint, error, children, count }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      {label && <label htmlFor={id} style={{ font: "700 13px/1.2 var(--font-body)", color: "var(--text-body)" }}>{label}</label>}
      {children}
      {(hint || error || count) && <div style={{ display: "flex", justifyContent: "space-between", gap: 12, font: "var(--fw-regular) var(--fs-caption)/1.4 var(--font-body)", color: error ? "var(--danger-400)" : "var(--text-muted)" }}>
        <span id={id ? id + "-msg" : undefined} role={error ? "alert" : undefined}>{error || hint}</span>{count && <span style={{ font: "var(--type-source)" }}>{count}</span>}</div>}
    </div>
  );
}
const box = (focus, error, size) => ({ width: "100%", height: size === "lg" ? 60 : 48, padding: "0 16px", borderRadius: "var(--radius-md)", background: "var(--surface-card)", color: "var(--text-strong)",
  border: `1px solid ${error ? "var(--danger-400)" : focus ? "var(--border-focus)" : "var(--border-default)"}`, boxShadow: focus ? "0 0 0 3px var(--lamp-tint)" : "none", outline: "none",
  font: size === "lg" ? "600 20px/1 var(--font-body)" : "400 16px/1 var(--font-body)", transition: "border-color var(--dur-fast) var(--ease-out)" });
export function TextField({ label, placeholder, value, defaultValue, onChange, onKeyDown, icon, hint, error, size = "md", type = "text", disabled, id, style, autoComplete, inputMode, enterKeyHint }) {
  const [f, setF] = useState(false); const auto = useId(); const fid = id || auto;
  return (
    <Field id={fid} label={label} hint={hint} error={error}>
      <div style={{ position: "relative", ...style }}>
        {icon && <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex" }}><Icon name={icon} size={size === "lg" ? 22 : 18} /></span>}
        <input id={fid} type={type} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} onKeyDown={onKeyDown} disabled={disabled}
          autoComplete={autoComplete} inputMode={inputMode} enterKeyHint={enterKeyHint} aria-invalid={!!error || undefined} aria-describedby={hint || error ? fid + "-msg" : undefined} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ ...box(f, error, size), paddingLeft: icon ? (size === "lg" ? 50 : 44) : 16, opacity: disabled ? 0.5 : 1 }} />
      </div>
    </Field>
  );
}
