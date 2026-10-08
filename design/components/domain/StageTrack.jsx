import React from "react";
import { Icon } from "../core/Icon.jsx";
export const STAGES = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"];
export function StageTrack({ current = 0, stages = STAGES, orientation = "horizontal", compact }) {
  const vert = orientation === "vertical";
  return (
    <ol aria-label="Pastor pathway" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: vert ? "column" : "row", flexWrap: vert ? "nowrap" : "wrap", gap: vert ? 12 : 10 }}>
      {stages.map((s, i) => { const done = i < current, on = i === current;
        return <li key={s} aria-current={on ? "step" : undefined} style={{ flex: vert ? "none" : "1 1 0", minWidth: vert ? 0 : 88, display: "flex", flexDirection: vert ? "row" : "column", gap: vert ? 12 : 8, alignItems: vert ? "center" : "flex-start" }}>
          <span aria-hidden="true" style={{ width: 32, height: 32, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", font: "700 13px/1 var(--font-body)",
            background: on ? "var(--lamp-400)" : done ? "var(--surface-raised)" : "transparent", border: on ? "none" : done ? "1px solid var(--border-default)" : "1px dashed var(--border-strong)", color: on ? "var(--ink-0)" : done ? "var(--text-body)" : "var(--text-muted)" }}>
            {done ? <Icon name="check" size={16} /> : on ? <Icon name="map-pin" size={16} /> : i + 1}
          </span>
          <div style={{ font: `${on ? 700 : 400} ${compact ? 13 : 14}px/1.25 var(--font-body)`, color: on ? "var(--text-strong)" : done ? "var(--text-body)" : "var(--text-muted)" }}>{s}</div>
        </li>; })}
    </ol>
  );
}
