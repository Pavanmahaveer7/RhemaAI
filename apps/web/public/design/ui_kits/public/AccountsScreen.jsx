const { TextField: AcField, Select: AcSelect, Button: AcButton, Badge: AcBadge, Dialog: AcDialog, StateBlock: AcState, Toast: AcToast, Icon: AcIcon } = window.ChurchAIDesignSystem_06db43;
const acLabel = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" };
const acMask = e => { const [u, d] = String(e).split("@"); return (u ? u[0] : "") + "•••@" + (d || ""); };
const AC_ROLES = ["Reader", "Religion expert", "Pastor", "Mentor", "Church leader", "Regional authority", "Admin"];
const AC_PFX = { Reader: "R", "Religion expert": "E", Pastor: "M", Mentor: "T", "Church leader": "L", "Regional authority": "G", Admin: "A" };
const AC_STATUS = { active: ["ok", "Active"], invited: ["warn", "Invited"], suspended: ["danger", "Suspended"] };
const AC_REASONS = ["Safety concern", "Support request from this person", "Account problem", "Legal request"];
const AC_API_ROLE = { admin: "Admin", expert: "Religion expert", pastor: "Pastor", reviewer: "Mentor", leader: "Church leader", guest: "Reader", reader: "Reader" };
const acLive = () => !!(window.CAApi && window.CAApi.isLive());
const acFromApi = r => ({ id: r.id, pseudonym: r.pseudonym, name: "", email: "", role: AC_API_ROLE[r.role] || r.role, church: "—", status: r.status || "active", last: r.createdAt });
function acLoadAll(after, rows) {
  rows = rows || [];
  return window.CAApi.get("/admin/accounts" + (after ? "?cursor=" + encodeURIComponent(after) : "")).then(page => {
    const all = rows.concat(page || []);
    return page && page.length === 6 ? acLoadAll(page[5].id, all) : all;
  });
}
const acHandle = a => a.pseudonym || `${AC_PFX[a.role] || "U"}-${(parseInt(String(a.id).replace(/\D/g, "").slice(-4) || "0", 10) * 7919 % 9000 + 1000)}`;
const acSeed = [
  { id: "u1", name: "Grace Mondal", email: "admin@church.ai", role: "Admin", church: "—", status: "active", last: "Now" },
  { id: "u2", name: "Dr. Miriam Das", email: "miriam.das@example.org", role: "Religion expert", church: "—", status: "active", last: "Today" },
  { id: "u3", name: "Rev. Tenzin Norbu", email: "t.norbu@example.org", role: "Religion expert", church: "—", status: "active", last: "Yesterday" },
  { id: "u4", name: "Daniel Sarkar", email: "daniel.s@example.com", role: "Pastor", church: "Living Water Fellowship, Mirpur", status: "active", last: "Today" },
  { id: "u5", name: "Pastor Samuel Roy", email: "samuel.roy@example.com", role: "Mentor", church: "Living Water Fellowship, Mirpur", status: "active", last: "Today" },
  { id: "u6", name: "Esther Baidya", email: "esther.b@example.com", role: "Church leader", church: "Living Water Fellowship, Mirpur", status: "active", last: "Sep 22" },
  { id: "u7", name: "Bishop Anil Thapa", email: "a.thapa@example.org", role: "Regional authority", church: "Koshi Province", status: "active", last: "Sep 20" },
  { id: "u8", name: "Priya Rai", email: "priya.rai@example.com", role: "Pastor", church: "Grace Chapel, Cuttack", status: "invited", last: "—" },
  { id: "u9", name: "Arif Hossain", email: "arif@example.com", role: "Reader", church: "—", status: "active", last: "Sep 25" },
  { id: "u10", name: "Nila Chakma", email: "nila.c@example.com", role: "Reader", church: "—", status: "suspended", last: "Aug 30" }
];

function AccountsScreen() {
  const wide = window.useWide(900);
  const live = acLive();
  const [list, setList] = React.useState(() => { if (live) return []; try { return JSON.parse(localStorage.getItem("ca_accounts")) || acSeed; } catch (e) { return acSeed; } });
  const [log, setLog] = React.useState([]);
  const meHandle = live ? ((window.CAApi.session() || {}).pseudonym || "A-0000") : "A-" + acHandle(acSeed[0]).slice(2);
  const loadLog = byId => window.CAApi.get("/admin/reveal-log").then(rows => setLog((rows || []).slice().reverse().map(r => ({ at: r.at, who: (byId[r.accountId] || {}).pseudonym || "Account", what: `Identity revealed · ${r.reason}`, by: r.adminPseudonym }))));
  React.useEffect(() => {
    if (!live) return;
    acLoadAll().then(rows => { const l = rows.map(acFromApi); setList(l); return loadLog(Object.fromEntries(l.map(a => [a.id, a]))); }).catch(e => setToast(e.message));
  }, []);
  const [q, setQ] = React.useState(""); const [role, setRole] = React.useState("all");
  const [sel, setSel] = React.useState(null); const [invite, setInvite] = React.useState(false);
  const [inv, setInv] = React.useState({ email: "", role: "Religion expert" }); const [invErr, setInvErr] = React.useState("");
  const [toast, setToast] = React.useState(null);
  const [reveal, setReveal] = React.useState(null);
  const [asking, setAsking] = React.useState(false);
  const [reason, setReason] = React.useState(AC_REASONS[0]); const [conf, setConf] = React.useState(""); const [nShown, setNShown] = React.useState(6);
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2200); return () => clearTimeout(id); }, [toast]);
  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const addLog = (who, what) => setLog(g => [{ who, what, at: now() }, ...g]);
  const save = (l, entry, msg) => { setList(l); localStorage.setItem("ca_accounts", JSON.stringify(l)); if (entry) addLog(entry.who, entry.what); if (msg) setToast(msg); };
  const shown = list.filter(a => (role === "all" || a.role === role) && (!q || acHandle(a).toLowerCase().includes(q.toLowerCase().trim())));
  const cur = sel && list.find(a => a.id === sel);
  const patch = (id, p, what) => {
    const who = acHandle(list.find(a => a.id === id));
    if (live) {
      window.CAApi.patch("/admin/accounts/" + encodeURIComponent(id), p).then(r => {
        setList(l => l.map(a => a.id === id ? { ...a, ...p, role: AC_API_ROLE[r.role] ? AC_API_ROLE[r.role] : a.role, status: r.status || p.status || a.status } : a));
        addLog(who, what); setToast(what);
      }, e => setToast(e.message + (e.requestId ? " · " + String(e.requestId).slice(0, 8) : "")));
      return;
    }
    save(list.map(a => a.id === id ? { ...a, ...p } : a), { who, what }, what);
  };
  const close = () => { setSel(null); setReveal(null); setAsking(false); if (live) setList(l => l.map(a => a.name ? { ...a, name: "" } : a)); };
  const doReveal = () => {
    if (!live) { setReveal(cur.id); setAsking(false); addLog(acHandle(cur), `Identity revealed · ${reason}`); return; }
    const id = cur.id;
    window.CAApi.post(`/admin/accounts/${encodeURIComponent(id)}/reveal`, { accountId: id, reason }).then(r => {
      setList(l => l.map(a => a.id === id ? { ...a, name: r.name || "No name on file" } : a)); setReveal(id); setAsking(false);
      setTimeout(() => { setReveal(v => v === id ? null : v); setList(l => l.map(a => a.id === id ? { ...a, name: "" } : a)); }, (r.expiresInSec || 60) * 1000);
      loadLog(Object.fromEntries(list.map(a => [a.id, a])));
    }, e => { setAsking(false); setToast(e.message + (e.requestId ? ` · ${String(e.requestId).slice(0, 8)}` : "")); });
  };
  const sendInvite = () => { if (!/^\S+@\S+\.\S+$/.test(inv.email)) { setInvErr("Use an email like name@example.com."); return; }
    if (live) {
      window.CAApi.post("/admin/accounts/invite", { email: inv.email.trim(), role: inv.role }).then(r => {
        const a = acFromApi(r); a.email = inv.email; setList(l => [a, ...l]); addLog(a.pseudonym, `Invited as ${inv.role}`);
        setToast(`Invite sent to ${acMask(inv.email)}`); setInvite(false); setInv({ email: "", role: "Religion expert" }); setInvErr("");
      }, e => setInvErr(e.message || "Could not send invite."));
      return;
    }
    const a = { id: "u" + Date.now(), name: "(set by them)", email: inv.email, role: inv.role, church: "—", status: "invited", last: "—" };
    save([a, ...list], { who: acHandle(a), what: `Invited as ${inv.role}` }, `Invite sent to ${acMask(inv.email)}`); setInvite(false); setInv({ email: "", role: "Religion expert" }); setInvErr(""); };
  const adminPost = (id, path, okMsg) => {
    window.CAApi.post("/admin/accounts/" + encodeURIComponent(id) + "/" + path).then(() => setToast(okMsg), e => setToast(e.message + (e.requestId ? " · " + String(e.requestId).slice(0, 8) : "")));
  };
  const counts = { total: list.length, invited: list.filter(a => a.status === "invited").length, suspended: list.filter(a => a.status === "suspended").length };
  const cols = "minmax(0,1fr) minmax(0,1.2fr) 110px 100px";

  return <div style={{ maxWidth: 1040, width: "100%", margin: "0 auto", padding: "24px var(--gutter-phone) 40px", display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 240px" }}><h1 style={{ font: "600 32px/1.2 var(--font-display)", color: "var(--text-strong)", margin: 0 }}>Accounts</h1>
        <p style={{ font: "var(--type-source)", color: "var(--text-muted)", margin: "6px 0 0" }}>{counts.total} accounts · {counts.invited} invited · {counts.suspended} suspended. Everyone is shown by an anonymous handle. Real identity opens only with a stated reason (safety, a support request, an account problem or a legal request), and every reveal is logged.</p></div>
      <AcButton variant="accent" icon="user-plus" onClick={() => setInvite(true)}>Invite</AcButton>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1fr) 240px" : "1fr", gap: 10 }}>
      <AcField label="Search by handle" icon="search" value={q} onChange={e => setQ(e.target.value)} placeholder="E-1234" />
      <AcSelect label="Role" value={role} onChange={e => setRole(e.target.value)} options={[{ value: "all", label: "All roles" }, ...AC_ROLES.map(r => ({ value: r, label: r }))]} />
    </div>
    {shown.length === 0 ? <AcState kind="empty" compact word={q.trim() || "none"} motif="people" title="No accounts match" message="Check the handle, or show every role." action={{ label: "Clear search", icon: "x", onClick: () => { setQ(""); setRole("all"); } }} /> :
    <div role="table" aria-label="Accounts" style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {wide && <div role="row" style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "10px 16px", background: "var(--surface-card)", ...acLabel }}><span>Handle</span><span>Role</span><span>Status</span><span>Last active</span></div>}
      {shown.slice(0, nShown).map(a => { const [tone, lab] = AC_STATUS[a.status];
        return <button role="row" key={a.id} onClick={() => setSel(a.id)} style={{ width: "100%", textAlign: "left", display: "grid", gridTemplateColumns: wide ? cols : "minmax(0,1fr) auto", gap: 12, alignItems: "center", padding: "14px 16px", background: "transparent", border: 0, borderTop: "1px solid var(--border-subtle)", cursor: "pointer", color: "inherit" }}>
          <span style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 10 }}><span><span style={{ display: "block", font: "600 16px/1.3 var(--font-mono)", color: "var(--text-strong)" }}>{acHandle(a)}</span>{!wide && <span style={{ display: "block", font: "var(--type-source)", color: "var(--text-muted)" }}>{a.role}</span>}</span></span>
          {wide && <span style={{ font: "var(--type-body)", fontSize: 13, color: "var(--text-body)" }}>{a.role}</span>}
          <span><AcBadge tone={tone}>{lab}</AcBadge></span>
          {wide && <span style={{ font: "var(--type-source)", color: "var(--text-faint)" }}>{a.last}</span>}
        </button>; })}
    </div>}
    {shown.length > nShown && <div><AcButton variant="secondary" onClick={() => setNShown(nShown + 6)}>Load more · {shown.length - nShown} left</AcButton></div>}
    <section><div style={{ ...acLabel, margin: "8px 0" }}>Private log</div>
      {log.length === 0 ? <p style={{ font: "var(--type-source)", color: "var(--text-faint)", margin: 0 }}>Nothing yet this session. Role changes, suspensions and identity reveals appear here with your admin handle.</p> :
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{log.map((l, i) => <li key={i} style={{ font: "var(--type-source)", color: "var(--text-muted)", padding: "8px 0", borderTop: "1px solid var(--border-subtle)" }}>{l.at} · {l.who} · {l.what} · by {l.by || meHandle}</li>)}</ul>}
    </section>

    <AcDialog open={!!cur} width={520} title={cur ? acHandle(cur) : ""} onClose={close} actions={<AcButton variant="ghost" onClick={close}>Done</AcButton>}>
      {cur && <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reveal === cur.id ? <div style={{ padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--warn-400)", background: "var(--warn-tint)", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ ...acLabel, color: "var(--warn-400)" }}>Identity · logged · {reason}</span>
          <span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{cur.name}</span>
          <span style={{ font: "var(--type-body)", fontSize: 13, color: "var(--text-body)" }}>{cur.email}</span>
          <span style={{ font: "var(--type-body)", fontSize: 13, color: "var(--text-muted)" }}>{cur.church}</span>
          <span style={{ font: "var(--type-source)", color: "var(--text-faint)", marginTop: 4 }}>Hidden again when you close this.</span>
        </div> : asking ? <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}>
          <AcSelect label="Why do you need to see who this is?" value={reason} onChange={e => setReason(e.target.value)} options={AC_REASONS} hint="The reason, your handle and the time go into the private log." />
          <window.CATypeConfirm word={acHandle(cur)} value={conf} onChange={setConf} hint="The reveal is logged." />
          <div style={{ display: "flex", gap: 8 }}><AcButton size="sm" variant="ghost" onClick={() => setAsking(false)}>Cancel</AcButton><AcButton size="sm" variant="primary" icon="eye" disabled={!window.CAMatch(conf, acHandle(cur))} onClick={() => { setConf(""); doReveal(); }}>Reveal identity</AcButton></div>
        </div> : <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)" }}>
          <AcIcon name="venetian-mask" size={18} color="var(--text-muted)" />
          <span style={{ flex: "1 1 200px", font: "var(--type-body)", fontSize: 13, color: "var(--text-body)" }}>Anonymous in the app.{cur.email ? " " + acMask(cur.email) : ""}</span>
          <AcButton size="sm" variant="secondary" icon="eye" onClick={() => { setConf(""); setAsking(true); }}>Reveal identity</AcButton>
        </div>}
        <AcSelect label="Role" value={cur.role} onChange={e => patch(cur.id, { role: e.target.value }, `Role changed to ${e.target.value}`)} options={AC_ROLES} hint={cur.role === "Pastor" ? "Changing a pastor’s role never moves their stage. Their review code name is not linked here." : "Every change is logged with your admin handle."} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cur.status === "invited" && <AcButton size="sm" variant="secondary" icon="send" onClick={() => live ? adminPost(cur.id, "resend-invite", `Invite sent again${cur.email ? " to " + acMask(cur.email) : ""}.`) : setToast(`Invite sent again to ${acMask(cur.email)}`)}>Resend invite</AcButton>}
          {cur.status !== "suspended" ? <AcButton size="sm" variant="danger" icon="user-x" disabled={live ? acHandle(cur) === meHandle : cur.id === "u1"} onClick={() => patch(cur.id, { status: "suspended" }, "Suspended")}>Suspend</AcButton>
          : <AcButton size="sm" variant="secondary" icon="user-check" onClick={() => patch(cur.id, { status: "active" }, "Reactivated")}>Reactivate</AcButton>}
          <AcButton size="sm" variant="ghost" icon="key-round" onClick={() => live ? adminPost(cur.id, "password-reset", `Password reset link sent${cur.email ? " to " + acMask(cur.email) : ""}.`) : setToast(`Password reset link sent to ${acMask(cur.email)}`)}>Send password reset</AcButton>
        </div>
        {(live ? acHandle(cur) === meHandle : cur.id === "u1") && <p style={{ font: "var(--type-source)", color: "var(--text-faint)", margin: 0 }}>You can’t suspend your own admin account.</p>}
      </div>}
    </AcDialog>
    <AcDialog open={invite} width={480} title="Invite someone" onClose={() => setInvite(false)} actions={<><AcButton variant="ghost" onClick={() => setInvite(false)}>Cancel</AcButton><AcButton variant="primary" icon="send" onClick={sendInvite}>Send invite</AcButton></>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AcField label="Email" type="email" value={inv.email} onChange={e => { setInv(v => ({ ...v, email: e.target.value })); setInvErr(""); }} error={invErr} placeholder="name@example.org" hint="Only used to send the invite. They appear by handle after joining." />
        <AcSelect label="Role" value={inv.role} onChange={e => setInv(v => ({ ...v, role: e.target.value }))} options={AC_ROLES.filter(r => r !== "Reader")} hint="Readers sign up themselves. Experts, pastors and leaders join by invite." />
      </div>
    </AcDialog>
    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 84, transform: "translateX(-50%)", zIndex: 120, animation: "ca-pop var(--dur-slow) var(--ease-out)" }}><AcToast tone="ok" onClose={() => setToast(null)}>{toast}</AcToast></div>}
  </div>;
}
window.AccountsScreen = AccountsScreen;
