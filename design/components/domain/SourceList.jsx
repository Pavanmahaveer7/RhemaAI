import React from "react";
const TR = { Hindu: "var(--trad-hindu)", Buddhist: "var(--trad-buddhist)", Christian: "var(--trad-christian)" };
export function SourceList({ sources = [], title = "Sources", emptyText = "The lexicon does not cover a source for this section." }) {
  return (
    <div style={{ borderTop: "1px solid var(--border-default)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-muted)" }}>{title}</div>
      {sources.length === 0 ? <div style={{ font: "italic 400 14px/1.4 var(--font-body)", color: "var(--text-muted)" }}>{emptyText}</div> :
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {sources.map((s, i) => <li key={i} style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: 8, font: "var(--type-source)" }}>
            <span style={{ color: "var(--text-faint)" }}>{i + 1}</span>
            <span><span style={{ color: "var(--text-strong)" }}>{s.work}</span>{s.reference && <span style={{ color: "var(--text-muted)" }}> · {s.reference}</span>}
              {s.tradition && <span style={{ color: TR[s.tradition] || "var(--text-muted)" }}> — {s.tradition}</span>}
              {s.quote && <q style={{ display: "block", margin: "6px 0 2px", font: "var(--type-body)", fontSize: 15, color: "var(--text-body)", quotes: "none" }}>{s.quote}</q>}
              {s.quote && <span style={{ display: "block", fontSize: 12, color: "var(--text-faint)" }}>{[s.translation, s.license].filter(Boolean).join(" · ")}{s.url && <> · <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>Read in context</a></>}</span>}</span>
          </li>)}
        </ol>}
    </div>
  );
}
