const { Card: RsCard, Button: RsButton, Badge: RsBadge, StageTrack: RsStage, Radio: RsRadio, TextArea: RsArea, Dialog: RsDialog, Icon: RsIcon, Toast: RsToast } = window.ChurchAIDesignSystem_06db43;

const rsStatus = { additional: ["danger", "Additional review"], waiting: ["warn", "Waiting for review"], stable: ["ok", "Stable"] };
const rsOutcomes = [
  { v: "continue", l: "Continue", d: "Move to the next stage." },
  { v: "plan", l: "Development plan", d: "Stay in this stage with named goals for next month." },
  { v: "additional", l: "Additional review", d: "Send to the regional authority before any change." }
];
function rsAck() { try { return JSON.parse(localStorage.getItem("ca_crisis_ack")) || {}; } catch (e) { return {}; } }
function rsSort(q) { return [...q].sort((a, b) => (b.esc - a.esc) || ((a.complete < 5) === (b.complete < 5) ? 0 : a.complete < 5 ? -1 : 1) || a.since.localeCompare(b.since)); }

function ReviewerQueue({ open, decisions }) {
  const q = rsSort(window.CA_PIPE.queue); const [n, setN] = React.useState(5);
  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div><h1 style={window.psH1}>September queue</h1><p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: "6px 0 0" }}>Escalations and incomplete packs first, then oldest first.</p></div>
    <div role="table" aria-label="Review queue" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {q.slice(0, n).map((p, i) => <button role="row" key={p.id} onClick={() => open(p.id)} style={{ width: "100%", textAlign: "left", display: "flex", gap: 14, alignItems: "center", minHeight: 60, padding: "0 16px", background: i % 2 ? "transparent" : "var(--surface-card)", border: 0, borderTop: i ? "1px solid var(--border-subtle)" : 0, cursor: "pointer", color: "inherit" }}>
          <span role="cell" style={{ font: "600 16px/1.2 var(--font-mono)", color: "var(--text-strong)", width: 72, flex: "none" }}>{p.id}</span>
          <span role="cell" style={{ flex: 1, minWidth: 0, font: "var(--type-body)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.region.split(" — ")[0]}</span>
          <RsIcon name="chevron-right" size={18} color="var(--text-faint)" />
        </button>)}
    </div>
    {q.length > n && <RsButton variant="secondary" onClick={() => setN(n + 5)}>Load more · {q.length - n} left</RsButton>}
  </div>;
}

function ReviewerReview({ id, back, decisions, decide }) {
  const p = window.CA_PIPE.queue.find(x => x.id === id);
  const wide = window.useWide(1000);
  const [pick, setPick] = React.useState(null);
  const [note, setNote] = React.useState("");
  const [confirm, setConfirm] = React.useState(false); const [conf, setConf] = React.useState("");
  const [ack, setAck] = React.useState(rsAck()[id] || null);
  const acknowledge = () => { const a = { at: "Today" }; const all = { ...rsAck(), [id]: a }; localStorage.setItem("ca_crisis_ack", JSON.stringify(all)); setAck(a); };
  const decided = decisions[id];
  const stageNow = decided === "continue" ? Math.min(p.stage + 1, 4) : p.stage;
  const pieces = ["Report", "Feedback", "Sermon", "Community", "Evidence"];
  return <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <button onClick={back} style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 40, background: "none", border: 0, padding: 0, color: "var(--text-muted)", font: "600 13px/1 var(--font-body)", cursor: "pointer" }}><RsIcon name="arrow-left" size={16} />Queue</button>
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <h1 style={{ ...window.psH1, fontFamily: "var(--font-mono)", fontSize: 24 }}>{p.id}</h1>
      <span style={{ font: "var(--type-body)", color: "var(--text-muted)" }}>{p.region}</span>
      {p.esc && <RsBadge tone="danger">Escalated</RsBadge>}
    </div>
    <RsCard padding={18}><RsStage current={stageNow} orientation={wide ? "horizontal" : "vertical"} compact={!wide} /></RsCard>
    <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.25fr) minmax(0,1fr)" : "1fr", gap: 16, alignItems: "start" }}>
      <RsCard eyebrow="Prepared by the agent" title="Summary for review" action={<RsBadge tone="neutral" dot={false}>AI text</RsBadge>}>
        <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: "0 0 16px", textWrap: "pretty" }}>{p.summary}</p>
        <div style={window.psLabel}>History</div>
        <ul style={{ listStyle: "none", margin: "6px 0 16px", padding: 0 }}>{p.history.map(h => <li key={h} style={{ font: "var(--type-source)", color: "var(--text-muted)", padding: "4px 0" }}>{h}</li>)}</ul>
        <div style={window.psLabel}>Completeness</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "8px 0 16px" }}>{pieces.map((x, i) => <span key={x} style={{ display: "inline-flex", gap: 5, alignItems: "center", height: 30, padding: "0 10px", borderRadius: 999, border: "1px solid var(--border-default)", font: "600 13px/1 var(--font-body)", color: i < p.complete ? "var(--text-body)" : "var(--warn-400)" }}><RsIcon name={i < p.complete ? "check" : "circle-dashed"} size={16} />{x}</span>)}</div>
        {p.missing.length > 0 && <><div style={window.psLabel}>Missing</div><ul style={{ margin: "8px 0 16px", paddingLeft: 18, font: "var(--type-body)", color: "var(--warn-400)" }}>{p.missing.map(m => <li key={m}>{m}</li>)}</ul></>}
        {p.crisis && <div style={{ margin: "0 0 16px", padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--danger-400)", background: "var(--danger-tint)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><RsIcon name="siren" size={18} color="var(--danger-400)" /><b style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Crisis check-in · {p.crisis.at}</b></div>
          <p data-no-tr="" style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-body)", margin: 0 }}>{p.crisis.note}</p>
          {ack ? <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>Acknowledged by you · {ack.at}. The review is still open. Only the decision on the right closes it.</p> : <div><RsButton size="sm" variant="secondary" icon="check" onClick={acknowledge}>Acknowledge</RsButton></div>}
        </div>}
        {p.flags.length > 0 && <><div style={window.psLabel}>Flagged for a person</div><ul style={{ margin: "8px 0 16px", paddingLeft: 18, font: "var(--type-body)", color: "var(--danger-400)" }}>{p.flags.map(m => <li key={m}>{m}</li>)}</ul></>}
        <div style={window.psLabel}>Evidence</div>
        <div style={{ margin: "4px 0 14px" }}>{window.CA_PIPE.pack.evidence.slice(0, p.complete).map(([k, t, f]) => <a key={t} href="#" onClick={e => e.preventDefault()} style={{ display: "flex", gap: 10, alignItems: "center", minHeight: 40, borderTop: "1px solid var(--border-subtle)", textDecoration: "none", font: "var(--type-body)", fontSize: 16, color: "var(--text-body)" }}><RsIcon name="file-text" size={16} color="var(--text-muted)" /><span style={{ flex: 1 }}>{t}</span><span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{f}</span></a>)}</div>
        <div style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>Routed to: {p.routed}</div>
        <div style={{ marginTop: 14, padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", font: "600 13px/1.4 var(--font-body)", color: "var(--text-strong)", display: "flex", gap: 8 }}><RsIcon name="user-check" size={18} color="var(--lamp-400)" />The agent does not change stages. A person still has to decide.</div>
      </RsCard>
      <RsCard eyebrow="Leadership review" title={decided ? "Decision recorded" : "Your decision"} tone={decided ? "raised" : "default"}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>{["Pastor", "Mentor", "Church leaders", "Regional authority"].map(x => <span key={x} style={{ height: 28, padding: "0 10px", display: "inline-flex", alignItems: "center", borderRadius: 999, border: "1px solid var(--border-default)", font: "600 13px/1 var(--font-body)", color: x === "Regional authority" && p.routed !== "Regional authority" ? "var(--text-faint)" : "var(--text-body)" }}>{x}</span>)}</div>
        {decided ? <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ font: "800 24px/1.1 var(--font-display)", color: "var(--lamp-400)" }}>{rsOutcomes.find(o => o.v === decided).l}</div>
          <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>{decided === "continue" ? `Next stage: ${window.CA_PIPE.stages[stageNow]}.` : decided === "plan" ? "Stage stays the same. Goals go into next month's pack." : "Stage stays the same. Sent to the regional authority."} The agent summary is kept beside this decision.</p>
          <div style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>Decided by the mentor · today. The name is kept in the private record.</div>
        </div> : <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rsOutcomes.map(o => <RsRadio key={o.v} name="outcome" value={o.v} label={o.l} description={o.d} checked={pick === o.v} onChange={() => setPick(o.v)} />)}
          <div style={{ marginTop: 10 }}><RsArea label="Note to the record" rows={3} value={note} onChange={e => setNote(e.target.value)} hint="Shared with the pastor in plain words." /></div>
          <div style={{ marginTop: 12 }}><RsButton variant="accent" fullWidth disabled={!pick} onClick={() => setConfirm(true)}>Record decision</RsButton></div>
        </div>}
      </RsCard>
    </div>
    <RsDialog open={confirm} title={`Record “${pick && rsOutcomes.find(o => o.v === pick).l}” for ${p.id}?`} onClose={() => setConfirm(false)} actions={<><RsButton variant="ghost" onClick={() => setConfirm(false)}>Cancel</RsButton><RsButton variant="primary" disabled={pick === "continue" && !window.CAMatch(conf, p.id)} onClick={() => { decide(id, pick); setConfirm(false); setConf(""); }}>Record</RsButton></>}>
      <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>{pick === "continue" ? `The stage moves from ${window.CA_PIPE.stages[p.stage]} to ${window.CA_PIPE.stages[Math.min(p.stage + 1, 4)]}.` : "The stage does not change."} This is logged with your name.</p>
      {pick === "continue" && <div style={{ marginTop: 14 }}><window.CATypeConfirm word={p.id} value={conf} onChange={setConf} hint="The stage moves for this pastor." /></div>}
    </RsDialog>
  </div>;
}
Object.assign(window, { ReviewerQueue, ReviewerReview });
