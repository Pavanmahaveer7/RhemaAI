const { Button: BfButton, StateBlock: BfState } = window.ChurchAIDesignSystem_06db43;

function BetaFeedbackAdmin() {
  const live = window.CAApi && window.CAApi.isLive();
  const [data, setData] = React.useState(null);
  const [err, setErr] = React.useState(null);
  React.useEffect(() => {
    if (!live) return;
    window.CAApi.get("/admin/beta-surveys")
      .then(setData, e => setErr(e.message + (e.requestId ? ` · ${String(e.requestId).slice(0, 8)}` : "")));
  }, [live]);
  const box = { maxWidth: 880, width: "100%", margin: "0 auto", padding: "28px var(--gutter-phone) 40px", display: "flex", flexDirection: "column", gap: 20 };
  if (!live) {
    return <div style={box}>
      <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>Beta feedback is saved when the API is live. Sign in as admin and deploy with Postgres to collect responses for your presentation.</p>
      <BfState kind="empty" compact word="offline" motif="people" title="No live export" message="Open /beta-survey on the deployed site after the API is connected." />
    </div>;
  }
  if (err) return <div style={box}><BfState kind="error" compact title="Could not load feedback" message={err} /></div>;
  if (!data) return <div style={box}><BfState kind="loading" compact /></div>;
  const s = data.summary || {};
  const roles = s.roles || {};
  return <div style={box}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <h2 style={{ font: "var(--type-section)", color: "var(--text-strong)", margin: 0, flex: 1 }}>Beta feedback</h2>
      <BfButton size="sm" variant="secondary" onClick={() => { window.location.href = "/api/v1/admin/beta-surveys?format=csv"; }}>Download CSV</BfButton>
      <BfButton size="sm" variant="ghost" onClick={() => { window.open("/beta-survey?from=admin-preview", "_blank"); }}>Open survey</BfButton>
    </div>
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>Responses from <code style={{ font: "var(--type-source)" }}>/beta-survey</code>. Use the summary in slides; CSV has every row.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
      {[["Total responses", s.total ?? data.total], ["Would use again", s.againYes], ["Avg. ease (1–5)", s.avgEasy ?? "—"], ["Said useful", s.usefulYes], ["Fair treatment", (s.fairYes || 0) + (s.fairMostly || 0)], ["Follow-up emails", s.withEmail]].map(([l, v]) => <div key={l} style={{ padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
        <div style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>{l}</div>
        <div style={{ font: "800 28px/1.1 var(--font-display)", color: "var(--text-strong)", marginTop: 6 }}>{v ?? 0}</div>
      </div>)}
    </div>
    {(s.topFeel || []).length > 0 && <p style={{ font: "var(--type-body)", margin: 0 }}><strong style={{ color: "var(--text-strong)" }}>How it felt:</strong> {(s.topFeel || []).map(x => `${x.word} (${x.count})`).join(" · ")}</p>}
    <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: 0 }}>Roles — curious: {roles.reader || 0}, pastor/leader: {roles.pastor || 0}, mentor: {roles.mentor || 0}, church app: {roles.church || 0}, other: {roles.other || 0}</p>
    <section>
      <h3 style={{ font: "var(--type-label)", color: "var(--text-muted)", margin: "8px 0" }}>Recent notes</h3>
      {(data.items || []).filter(r => (r.answers || {}).broken).length === 0 ? <BfState kind="empty" compact word="quiet" motif="check" message="No broken/confusing notes yet." /> :
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>{(data.items || []).filter(r => (r.answers || {}).broken).slice(0, 8).map((r, i) => <li key={i} style={{ padding: 12, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", font: "var(--type-body)", color: "var(--text-body)" }}>
        <span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{r.day || r.submittedAt || "—"} · {r.from || "unknown"}</span>
        <p style={{ margin: "6px 0 0" }}>{(r.answers || {}).broken}</p>
      </li>)}</ul>}
    </section>
  </div>;
}
window.BetaFeedbackAdmin = BetaFeedbackAdmin;
