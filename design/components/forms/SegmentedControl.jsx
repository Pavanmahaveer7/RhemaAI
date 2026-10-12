import React, { useRef, useLayoutEffect, useState } from "react";
export function SegmentedControl({ options = [], value, onChange, label, size = "md", accentValue, style }) {
  const h = size === "sm" ? 36 : 48;
  const wrap = useRef(null); const [thumb, setThumb] = useState(null);
  const idx = options.findIndex(o => (typeof o === "string" ? o : o.value) === value);
  useLayoutEffect(() => { const el = wrap.current && wrap.current.children[idx + 1]; if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth }); }, [idx, options.length, size]);
  const acc = value === accentValue;
  return (
    <div ref={wrap} role="radiogroup" aria-label={label} style={{ position: "relative", display: "inline-flex", flex: "none", maxWidth: "100%", overflow: "hidden", padding: 4, gap: 4, borderRadius: "var(--radius-pill)", background: "var(--surface-card)", border: "1px solid var(--border-default)", ...style }}>
      <span aria-hidden="true" style={{ position: "absolute", top: 4, bottom: 4, left: 0, width: thumb ? thumb.w : 0, transform: `translateX(${thumb ? thumb.x : 0}px)`, borderRadius: "var(--radius-pill)", background: acc ? "var(--lamp-400)" : "var(--bone-8)", opacity: thumb ? 1 : 0, transition: "transform var(--dur-base) var(--ease-out), width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)" }}></span>
      {options.map(o => { const v = typeof o === "string" ? o : o.value; const l = typeof o === "string" ? o : o.label; const on = v === value;
        return <button key={v} type="button" role="radio" aria-checked={on} onClick={() => onChange && onChange(v)}
          style={{ position: "relative", height: h - 10, padding: size === "sm" ? "0 14px" : "0 20px", border: 0, borderRadius: "var(--radius-pill)", cursor: "pointer", whiteSpace: "nowrap", flex: "none",
            background: on && !thumb ? (v === accentValue ? "var(--lamp-400)" : "var(--bone-8)") : "transparent", color: on ? "var(--ink-0)" : "var(--text-muted)",
            font: `700 ${size === "sm" ? 13 : 15}px/1 var(--font-body)`, transition: "color var(--dur-base) var(--ease-out)" }}>{l}</button>; })}
    </div>
  );
}
