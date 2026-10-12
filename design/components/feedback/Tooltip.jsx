import React, { useState } from "react";
export function Tooltip({ content, children, placement = "top" }) {
  const [o, setO] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setO(true)} onMouseLeave={() => setO(false)} onFocus={() => setO(true)} onBlur={() => setO(false)}>
      {children}
      {o && <span role="tooltip" style={{ position: "absolute", left: "50%", [placement === "top" ? "bottom" : "top"]: "calc(100% + 8px)", transform: "translateX(-50%)", whiteSpace: "nowrap", zIndex: 20,
        padding: "7px 10px", borderRadius: "var(--radius-sm)", background: "var(--bone-8)", color: "var(--ink-0)", font: "600 13px/1.2 var(--font-body)", boxShadow: "var(--shadow-pop)", pointerEvents: "none" }}>{content}</span>}
    </span>
  );
}
