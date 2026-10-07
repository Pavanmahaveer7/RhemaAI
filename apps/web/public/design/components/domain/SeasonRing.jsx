import React, { useState, useEffect } from "react";
const DEFAULT = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"];
function pt(cx, cy, r, deg) { const a = (deg - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
function arc(cx, cy, r, a0, a1) { const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1); return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`; }
export function SeasonRing({ current = 0, stages = DEFAULT, since, size = 232, caption, grow, glow }) {
  const [peek, setPeek] = useState(null);
  const rm = typeof document !== "undefined" && (document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [filled, setFilled] = useState(!grow || rm);
  useEffect(() => { if (filled) return; const id = setTimeout(() => setFilled(true), 250); return () => clearTimeout(id); }, []);
  useEffect(() => { if (peek == null) return; const id = setTimeout(() => setPeek(null), 2200); return () => clearTimeout(id); }, [peek]);
  const n = stages.length, c = size / 2, r = size / 2 - 18, gap = 7, seg = 360 / n;
  const focus = peek ?? current;
  const rel = focus < current ? "Done" : focus === current ? `Stage ${current + 1} of ${n}` : focus === current + 1 ? "Up next" : "Later";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="list" aria-label="Your path">
          {stages.map((s, i) => {
            const a0 = i * seg + gap / 2, a1 = (i + 1) * seg - gap / 2, d = arc(c, c, r, a0, a1), len = (a1 - a0) * Math.PI / 180 * r;
            const done = i < current, now = i === current;
            return <g key={s} role="listitem" aria-label={`${s}${now ? ", current" : done ? ", done" : ""}`} tabIndex={0} onClick={() => setPeek(i)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setPeek(i)} style={{ cursor: "pointer", outline: "none" }}>
              <path d={d} fill="none" stroke="transparent" strokeWidth={30} />
              {now && <path d={d} fill="none" stroke="var(--lamp-400)" strokeOpacity={0.18} strokeWidth={26} strokeLinecap="round" style={glow && !rm ? { animation: "ps-halo 2400ms ease-in-out 600ms 2" } : undefined} />}
              <path d={d} fill="none" strokeLinecap="round"
                stroke={now ? "var(--lamp-400)" : done ? "var(--bone-7)" : "var(--ink-4)"}
                strokeWidth={now ? 12 : done ? 8 : 6} strokeDasharray={!done && !now ? "2 9" : `${len} ${len}`} strokeDashoffset={now && !filled ? len : 0}
                style={{ transition: `stroke var(--dur-base), stroke-width var(--dur-base)${now ? ", stroke-dashoffset 1200ms cubic-bezier(.22,.61,.36,1)" : ""}` }} />
              {peek === i && <path d={d} fill="none" stroke="var(--bone-9)" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" transform={`translate(0 0)`} />}
            </g>;
          })}
        </svg>
        <div aria-live="polite" style={{ position: "absolute", inset: 34, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 6, pointerEvents: "none" }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: focus === current ? "var(--lamp-400)" : "var(--text-faint)" }}>{rel}</span>
          <span key={focus} style={{ font: "600 24px/1.15 var(--font-display)", color: "var(--text-strong)", textWrap: "balance", animation: "ca-rise var(--dur-base) var(--ease-out)" }}>{stages[focus]}</span>
          {focus === current && since && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{since}</span>}
        </div>
      </div>
      {caption !== false && <span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{caption || "Tap a part of the ring to see that season"}</span>}
    </div>
  );
}
