import React from "react";
export function Switch({ label, checked, onChange, disabled, "aria-label": ariaLabel }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 12, minHeight: 44, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1 }}>
      <button type="button" role="switch" aria-label={label ? undefined : ariaLabel} aria-checked={!!checked} disabled={disabled} onClick={() => onChange && onChange(!checked)}
        style={{ width: 44, height: 26, flex: "none", borderRadius: 99, border: 0, padding: 3, cursor: "inherit", background: checked ? "var(--lamp-400)" : "var(--ink-4)", transition: "background var(--dur-base) var(--ease-out)" }}>
        <span style={{ display: "block", width: 20, height: 20, borderRadius: 99, background: checked ? "var(--ink-0)" : "var(--bone-7)", transform: checked ? "translateX(18px)" : "none", transition: "transform var(--dur-base) var(--ease-out)" }} />
      </button>
      {label && <span style={{ font: "400 16px/1.3 var(--font-body)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
