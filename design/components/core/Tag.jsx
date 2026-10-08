import React from "react";
const TONES = {
  hindu: ["var(--trad-hindu-tint)", "var(--trad-hindu)"], buddhist: ["var(--trad-buddhist-tint)", "var(--trad-buddhist)"], christian: ["var(--trad-christian-tint)", "var(--trad-christian)"],
  neutral: ["var(--surface-raised)", "var(--text-body)"], lamp: ["var(--lamp-tint)", "var(--lamp-400)"],
};
export function Tag({ tone = "neutral", children, style }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 10px", borderRadius: "var(--radius-pill)", background: bg, color: fg,
    font: "var(--type-label)", letterSpacing: "var(--tracking-label)", whiteSpace: "nowrap", ...style }}>{children}</span>;
}
