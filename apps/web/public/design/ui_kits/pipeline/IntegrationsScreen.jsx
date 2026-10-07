const { Card: InCard, Button: InButton, Badge: InBadge, Icon: InIcon, Toast: InToast } = window.ChurchAIDesignSystem_06db43;

function InList({ label, items }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={window.psLabel}>{label}</div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{items.map(i => <span key={i} style={{ height: 30, flex: "none", whiteSpace: "nowrap", padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, border: "1px solid var(--border-default)", font: "600 13px/1 var(--font-body)", color: "var(--text-body)" }}>{i}</span>)}</div>
  </div>;
}

function InRow({ name, status, statusTone, action, opens, sends, limit, dim, how, see }) {
  return <InCard padding={20} style={{ opacity: dim ? 0.72 : 1 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <div style={{ font: "600 18px/1.2 var(--font-display)", color: "var(--text-strong)" }}>{name}</div>
          <div style={{ marginTop: 8 }}><InBadge tone={statusTone}>{status}</InBadge></div>
        </div>
        {action}
      </div>
      {how && <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ font: "700 13px/1.3 var(--font-body)", color: "var(--text-strong)" }}>How does it work?</span><p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: 0, textWrap: "pretty" }}>{how}</p></div>}
      <InList label="Planning Center gets" items={opens} />
      {see}
      <InList label="church.ai reads" items={sends} />
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", font: "600 13px/1.45 var(--font-body)", color: "var(--text-strong)" }}><InIcon name="shield" size={18} color="var(--lamp-400)" style={{ marginTop: 1, flex: "none" }} />{limit}</div>
    </div>
  </InCard>;
}

function IntegrationsScreen({ back, pco, setPco, go, flash }) {
  const [phase, setPhase] = React.useState(null);
  const [toast, setToast] = React.useState(flash || null);
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2400); return () => clearTimeout(id); }, [toast]);
  const connect = () => { setPhase("away"); setTimeout(() => { setPhase(null); go("signin"); }, 900); };
  const opens = ["Your church’s map", "Word lookup", "Monthly question", "Pack-ready notice"];
  const later = ["Breeze", "Church Community Builder", "Elvanto", "Rock RMS", "Tithe.ly"];
  const live = !!(window.CAApi && window.CAApi.isLive());
  const readNotify = () => { try { return JSON.parse(localStorage.getItem("ca_int_notify")) || []; } catch (e) { return []; } };
  const [notify, setNotifyS] = React.useState(readNotify);
  const persistNotify = v => {
    setNotifyS(v);
    if (live) window.CAApi.put("/me/preferences", { integrationNotify: v }).catch(() => {});
    else localStorage.setItem("ca_int_notify", JSON.stringify(v));
  };
  const toggleNotify = n => { const v = notify.includes(n) ? notify.filter(x => x !== n) : [...notify, n]; persistNotify(v); };
  React.useEffect(() => {
    if (!live) return;
    window.CAApi.get("/me/preferences").then(p => { if (p && Array.isArray(p.integrationNotify)) setNotifyS(p.integrationNotify); }).catch(() => {});
  }, []);
  const sends = ["Services", "Groups", "Your profile"];
  const limit = "Cannot move a pastor’s stage. Cannot put names on the map.";
  const [row, setRow] = React.useState(live ? null : undefined);
  React.useEffect(() => {
    if (!live) return;
    window.CAApi.get("/integrations").then(rows => setRow((rows || []).find(x => x.app === "Planning Center") || "na"), e => setRow(e.status === 404 ? "na" : { error: e }));
  }, []);
  const liveStatus = row === "na" ? ["Not offered in your country", "neutral"] : row && row.error ? ["Could not load", "danger"] : row && row.status === "connected" ? ["Connected", "ok"] : row && row.status === "error" ? ["Needs attention", "danger"] : ["Not connected", "neutral"];
  const liveAction = !row || row === "na" || row.error ? null
    : row.status === "connected" ? <InButton variant="primary" iconRight="arrow-right" onClick={() => go("church")}>Open</InButton>
    : row.connectable ? <InButton variant="primary" onClick={() => { location.href = "/api/v1/integrations/planning-center/authorize"; }}>Connect</InButton>
    : <InButton variant="secondary" disabled>Not set up yet</InButton>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
    <button onClick={back} style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", height: 44, background: "none", border: 0, padding: 0, color: "var(--text-muted)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}><InIcon name="arrow-left" size={18} />Home</button>
    <div>
      <h1 style={window.psH1}>Church apps</h1>
      <p style={{ font: "var(--type-pastoral)", color: "var(--text-muted)", margin: "6px 0 0" }}>Connect once. You sign in on their site and choose what to share.</p>
    </div>
    {live ? <InRow name="Planning Center" status={row === null ? "Checking…" : liveStatus[0]} statusTone={liveStatus[1]} action={liveAction} dim={row === "na"} opens={opens} sends={sends} limit={limit} how="You sign in on Planning Center’s site and approve access. It then sends service plans and groups here, and shows your church’s map, word lookup and the monthly question to members." />
    : <InRow name="Planning Center" status={pco === "demo" ? "Demo church" : pco ? "Connected" : "Not connected"} statusTone={pco === "demo" ? "info" : pco ? "ok" : "neutral"}
      action={pco ? <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><InButton variant="primary" iconRight="arrow-right" onClick={() => go("church")}>Open</InButton><InButton variant="ghost" onClick={() => { setPco(false); setToast("Disconnected. Planning Center rows are no longer shown."); }}>Disconnect</InButton></div>
        : <InButton variant="primary" onClick={connect}>Connect</InButton>}
      see={window.CA_DEMO && <button onClick={() => go("embed")} style={{ alignSelf: "flex-start", display: "inline-flex", gap: 6, alignItems: "center", minHeight: 44, padding: 0, background: "none", border: 0, cursor: "pointer", font: "700 16px/1 var(--font-body)", color: "var(--lamp-400)" }}>See it inside the church app<InIcon name="arrow-right" size={16} /></button>} opens={opens} sends={sends} limit={limit} how="You sign in on Planning Center’s site and approve access. It then sends service plans and groups here, and shows your church’s map, word lookup and the monthly question to members." />}
    <div style={{ ...window.psLabel, marginTop: 6 }}>Available later</div>
    <div role="list" aria-label="Church apps coming later" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>{later.map((n, i) => { const on = notify.includes(n); return <div role="listitem" key={n} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "12px 16px", borderTop: i ? "1px solid var(--border-subtle)" : 0, background: "var(--surface-card)" }}>
      <div style={{ flex: "1 1 180px", minWidth: 0 }}><div style={{ font: "600 18px/1.2 var(--font-display)", color: "var(--text-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n}</div><div style={{ font: "var(--type-source)", color: "var(--text-muted)", marginTop: 4 }}>Not available yet</div></div>
      <InButton size="sm" variant={on ? "ghost" : "secondary"} icon={on ? "check" : "bell"} onClick={() => toggleNotify(n)}>{on ? "We’ll tell you · Undo" : "Tell me when ready"}</InButton>
    </div>; })}</div>
    <InCard eyebrow="Who">
      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8, font: "var(--type-body)", color: "var(--text-body)" }}>
        <li>The church chose this connection.</li>
        <li>The connection cannot move a stage or put names on the map.</li>
      </ul>
    </InCard>
    <p style={{ font: "var(--type-source)", color: "var(--text-faint)", margin: 0 }}>When Planning Center is connected, ministry and community rows are labelled “Planning Center”. Optional. Offered for churches in the United States that already use Planning Center. Elsewhere, church.ai works fully without it.</p>
    {phase === "away" && <div role="dialog" aria-label="Leaving for Planning Center" style={{ position: "fixed", inset: 0, zIndex: 150, background: "var(--scrim)", display: "grid", placeItems: "center", padding: 20 }}>
      <div style={{ maxWidth: 360, width: "100%", padding: 24, borderRadius: "var(--radius-xl)", background: "var(--surface-raised)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-overlay)", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}>
        <span style={{ width: 22, height: 22, borderRadius: 99, border: "2px solid var(--lamp-400)", borderRightColor: "transparent", animation: "ca-spin .8s linear infinite" }}></span>
        <div style={{ font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" }}>Going to Planning Center</div>
        <p style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", margin: 0 }}>You sign in on their site. We never see your password. You’ll come back here after.</p>
      </div>
    </div>}
    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 84, transform: "translateX(-50%)", zIndex: 120, animation: "ca-pop var(--dur-slow) var(--ease-out)" }}><InToast tone="ok" onClose={() => setToast(null)}>{toast}</InToast></div>}
  </div>;
}
window.IntegrationsScreen = IntegrationsScreen;
