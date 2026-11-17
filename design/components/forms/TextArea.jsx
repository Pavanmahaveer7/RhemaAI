import React, { useState, useId } from "react";
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
export function TextArea({ label, placeholder, value, onChange, maxLength, rows = 5, hint, error, disabled, id, style }) {
  const [f, setF] = useState(false); const auto = useId(); const fid = id || auto;
  const n = (value || "").length;
  return (
    <Field id={fid} label={label} hint={hint} error={error} count={maxLength ? `${n.toLocaleString()} / ${maxLength.toLocaleString()}` : null}>
      <textarea id={fid} rows={rows} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength} disabled={disabled}
        onFocus={() => setF(true)} onBlur={() => setF(false)} aria-invalid={!!error || undefined} aria-describedby={hint || error ? fid + "-msg" : undefined}
        style={{ width: "100%", padding: 16, borderRadius: "var(--radius-md)", background: "var(--surface-card)", color: "var(--text-strong)", resize: "vertical",
          border: `1px solid ${error ? "var(--danger-400)" : f ? "var(--border-focus)" : "var(--border-default)"}`, boxShadow: f ? "0 0 0 3px var(--lamp-tint)" : "none", outline: "none",
          font: "var(--type-pastoral)", ...style }} />
    </Field>
  );
}
