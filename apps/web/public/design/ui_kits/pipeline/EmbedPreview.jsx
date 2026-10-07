const { Button: EmButton, Icon: EmIcon, Badge: EmBadge, Toast: EmToast } = window.ChurchAIDesignSystem_06db43;

// Neutral host chrome: stands for any church app (Planning Center, Breeze…). No host branding is copied.
const emHost = { bg: "#F2F4EF", card: "#FFFFFF", line: "#DCE1D6", ink: "#1C231A", muted: "#4D5646" };
const emChurchMap = { answers: 38, min: 20, ideas: [["family", 9], ["hope", 7], ["trust", 6], ["prayer", 5], ["doubt", 4, 1], ["community", 3]] };
const emSlots = [[150, 92], [84, 58], [220, 62], [96, 130], [210, 128], [150, 30]];

function EmCard({ title, icon, children, foot }) {
  return <section style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: 18, display: "flex", flexDirection: "column", gap: 12, color: "var(--text-body)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span aria-hidden="true" style={{ width: 32, height: 32, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", color: "var(--lamp-400)" }}><EmIcon name={icon} size={16} /></span><h2 style={{ margin: 0, font: "var(--type-section)", fontSize: 18, color: "var(--text-strong)" }}>{title}</h2></div>
    {children}
    {foot && <div style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{foot}</div>}
  </section>;
}

function EmbedPreview({ back, provider = "Planning Center" }) {
  const [small, setSmall] = React.useState(false);
  const [leader, setLeader] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2200); return () => clearTimeout(id); }, [toast]);
  const m = small ? { ...emChurchMap, answers: 12 } : emChurchMap;
  const enough = m.answers >= m.min;
  const max = Math.max(...m.ideas.map(i => i[1]));
  const word = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const seg = (val, set, a, b) => <div role="group" style={{ display: "flex", gap: 4, padding: 3, borderRadius: 999, border: `1px solid ${emHost.line}`, background: emHost.card }}>{[[false, a], [true, b]].map(([v, l]) => <button key={l} onClick={() => set(v)} aria-pressed={val === v} style={{ height: 32, padding: "0 12px", flex: "none", whiteSpace: "nowrap", borderRadius: 999, border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", background: val === v ? emHost.ink : "transparent", color: val === v ? "#fff" : emHost.muted }}>{l}</button>)}</div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
    <button onClick={back} style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 44, background: "none", border: 0, padding: 0, color: "var(--text-muted)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}><EmIcon name="arrow-left" size={18} />Church apps</button>
    <div>
      <h1 style={window.psH1}>Inside your church app</h1>
      <p style={{ font: "var(--type-pastoral)", color: "var(--text-muted)", margin: "6px 0 0" }}>What members see in {provider} once your church connects.</p>
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px dashed var(--border-default)", font: "var(--type-source)", color: "var(--text-muted)" }}>Prototype · {seg(leader, setLeader, "Member", "Leader")}{seg(small, setSmall, "38 answers", "12 answers")}</div>
    <div aria-label={`Preview inside ${provider}`} style={{ borderRadius: 24, background: emHost.bg, border: `1px solid ${emHost.line}`, overflow: "hidden" }}>
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", background: emHost.card, borderBottom: `1px solid ${emHost.line}`, color: emHost.ink }}>
        <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: 8, background: "#C6D0BA" }}></span>
        <span style={{ font: "700 16px/1 var(--font-body)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Living Water Fellowship</span>
        <span style={{ font: "600 13px/1 var(--font-body)", color: emHost.muted, whiteSpace: "nowrap" }}>{provider}</span>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        <EmCard title="This month at our church" icon="waypoints" foot={enough ? "Counts only. No names, no answers. Ideas under 3 mentions never show." : null}>
          <p style={{ margin: 0, font: "800 24px/1.15 var(--font-display)", color: "var(--text-strong)" }}>What does <u style={{ color: "var(--lamp-400)", textUnderlineOffset: "0.12em" }}>faith</u> mean to you?</p>
          {enough ? <>
            <svg viewBox="0 0 300 160" width="100%" height="160" role="img" aria-label={`Map of ${m.ideas.length} ideas from ${m.answers} answers`} style={{ background: "var(--ink-0)", borderRadius: "var(--radius-md)" }}>
              {m.ideas.map(([id, v, nw], i) => { const [x, y] = emSlots[i], r = 8 + (v / max) * 22; return <g key={id} transform={`translate(${x} ${y})`}><circle r={r} fill={nw ? "var(--lamp-400)" : "var(--ink-3)"} stroke={nw ? "none" : "var(--bone-7)"} strokeWidth="1" /><text y={4} textAnchor="middle" style={{ font: "600 13px var(--font-body)", fill: nw ? "var(--ink-0)" : "var(--text-strong)" }}>{id}</text></g>; })}
            </svg>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", font: "600 13px/1.2 var(--font-body)", color: "var(--text-body)" }}><span><b style={{ font: "800 18px/1 var(--font-display)", color: "var(--text-strong)" }}>{m.answers}</b> answers</span><span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 9, background: "var(--lamp-400)" }}></span>new this month</span></div>
          </> : <div role="status" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)" }}><EmIcon name="eye-off" size={20} color="var(--text-body)" style={{ flex: "none", marginTop: 2 }} /><span style={{ font: "var(--type-body)", fontSize: 16 }}>The map shows once {m.min} people have answered, so no one stands out. {m.answers} so far.</span></div>}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <EmButton size="sm" variant="primary" icon="message-square-text" onClick={() => window.open("../public/index.html#r=month", "_blank")}>Answer</EmButton>
            <EmButton size="sm" variant="secondary" icon="link-2" onClick={() => setToast("Link copied. It opens with no account and shows no names.")}>Copy link for the church</EmButton>
          </div>
        </EmCard>
        <EmCard title="Look up a word" icon="book-open" foot={word && word.sources && word.sources[0] ? `${word.sources[0].work} ${word.sources[0].reference}` : null}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}><span style={{ font: "800 32px/1 var(--font-display)", color: "var(--text-strong)" }}>karma</span><span style={{ font: "italic 400 16px/1 var(--font-body)", color: "var(--text-muted)" }}>noun</span></div>
          <p style={{ margin: 0, font: "var(--type-body)", fontSize: 16 }}>{word ? word.def : ""}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{[["Hindu", "hindu"], ["Buddhist", "buddhist"], ["Christian", "christian"]].map(([t, c]) => <span key={t} style={{ height: 26, padding: "0 10px", display: "inline-flex", alignItems: "center", borderRadius: 999, background: `var(--trad-${c}-tint)`, color: `var(--trad-${c})`, font: "600 13px/1 var(--font-body)" }}>{t}</span>)}</div>
        </EmCard>
        {leader && <EmCard title="Monthly pack is ready" icon="package" foot="Leaders only. No names. Opens in Rhema.ai.">
          <p style={{ margin: 0, font: "var(--type-body)", fontSize: 16 }}>September’s counts and encouragement for your pastors.</p>
          <div><EmButton size="sm" variant="secondary" iconRight="arrow-right" onClick={() => window.open("index.html#r=pack&pco=on", "_blank")}>Open the pack</EmButton></div>
        </EmCard>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "4px 0 2px", font: "600 13px/1 var(--font-body)", color: emHost.muted }}><EmIcon name="shield" size={16} />Rhema.ai · counts only, never names</div>
      </div>
    </div>
    <p style={{ font: "var(--type-source)", color: "var(--text-faint)", margin: 0 }}>The church app shows these cards. It never receives answer text, names or a pastor’s stage.</p>
    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 84, transform: "translateX(-50%)", zIndex: 120 }}><EmToast tone="ok" onClose={() => setToast(null)}>{toast}</EmToast></div>}
  </div>;
}
window.EmbedPreview = EmbedPreview;
