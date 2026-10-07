const { TextField: AuField, Button: AuButton, Checkbox: AuCheck, SegmentedControl: AuSeg, Wordmark: AuMark, Icon: AuIcon } = window.ChurchAIDesignSystem_06db43;

function auPipelineEntry(kind) {
  const hp = new URLSearchParams(location.hash.slice(1));
  const next = hp.get("next");
  const safeNext = next && /^[a-z]+$/.test(next) ? next : null;
  if (kind === "leader") return "/pastor#role=leader&r=" + (safeNext || "alerts");
  if (kind === "reviewer" || kind === "admin") return "/pastor#role=reviewer&r=" + (safeNext || "queue");
  if (kind === "pastor") return "/pastor#r=" + (safeNext || "tracks");
  return "/pastor#r=" + (safeNext || "home");
}
function auDemoStaffKind(code) {
  if (/^P-\d/i.test(code)) return "pastor";
  if (/^L-\d/i.test(code)) return "leader";
  if (/^R-\d/i.test(code)) return "reviewer";
  if (/^A-\d/i.test(code)) return "admin";
  return null;
}
function auPipelineFixture(kind) {
  return auPipelineEntry(kind) + "&api=0";
}

function useSession() {
  const [s, setS] = React.useState(window.CASession.get());
  React.useEffect(() => { const f = () => setS(window.CASession.get()); window.addEventListener("ca-session", f); return () => window.removeEventListener("ca-session", f); }, []);
  return [s, window.CASession.set];
}
function usePrefs() {
  const [p, setP] = React.useState(window.CAPrefs.get());
  React.useEffect(() => { const f = () => setP({ ...window.CAPrefs.get() }); window.addEventListener("ca-prefs", f); return () => window.removeEventListener("ca-prefs", f); }, []);
  return [p, patch => window.CAPrefs.set(patch)];
}

function AuthScreen({ go, initialTab }) {
  const staffHint = React.useMemo(() => new URLSearchParams(location.hash.slice(1)).get("staff"), []);
  const staffL3 = staffHint === "l3" || staffHint === "pastor" || staffHint === "leader" || staffHint === "reviewer";
  const [, setSession] = useSession();
  const [tab, setTab] = React.useState(staffL3 ? "signin" : (initialTab || "create"));
  const [f, setF] = React.useState({ name: "", email: "", pw: "", agree: false });
  const [err, setErr] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const set = k => e => setF(s => ({ ...s, [k]: e && e.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e }));
  const submit = ev => {
    ev.preventDefault(); const e = {};
    const live = window.CAApi && window.CAApi.isLive() && tab === "signin";
    const codeName = f.email.trim();
    if (live) {
      if (!codeName) e.email = staffL3 ? "Enter your assigned code name." : "Enter your email or code name.";
      if (!f.pw) e.pw = "Enter your password.";
      setErr(e); if (Object.keys(e).length) return;
      setBusy(true);
      window.CAApi.signin(codeName, f.pw).then(s => {
        setSession(window.CASession.get()); setBusy(false);
        if (["pastor", "reviewer", "leader", "mentor", "expert", "admin"].includes(s.kind)) location.href = auPipelineEntry(s.kind);
        else go(s.kind === "admin" ? "admin" : "search");
      }, x => {
        setBusy(false);
        const demoKind = f.pw === "dev-only-change-me" ? auDemoStaffKind(codeName) : null;
        if (demoKind) { location.href = auPipelineFixture(demoKind); return; }
        const hint = x.code === "service_down" ? " Start the API (see scripts/run_local.ps1) or use preview: " + auPipelineFixture("pastor") + "." : "";
        setErr({ pw: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") + hint });
      });
      return;
    }
    if (tab === "signin" && f.pw === "dev-only-change-me") {
      const demoKind = auDemoStaffKind(codeName);
      if (demoKind) {
        setBusy(true);
        setTimeout(() => { setBusy(false); location.href = auPipelineFixture(demoKind); }, 400);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = staffL3 ? "Use your assigned code (e.g. P-0233), not the public create-account flow." : "Use an email like name@example.com.";
    if (f.pw.length < 8) e.pw = "Use at least 8 characters.";
    if (tab === "create" && !f.agree) e.agree = true;
    setErr(e); if (Object.keys(e).length) return;
    setBusy(true);
    if (window.CAApi && window.CAApi.isLive()) {
      window.CAApi.signup(f.email.trim(), f.name.trim(), f.pw).then(s => {
        setSession(window.CASession.get()); setBusy(false);
        try { if (!localStorage.getItem("ca_team_note_seen")) localStorage.setItem("ca_team_note", "1"); } catch (x) {}
        go(localStorage.getItem("ca_onboarded") ? "search" : "intro");
      }, x => { setBusy(false); setErr({ email: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") }); });
      return;
    }
    setTimeout(() => { const admin = f.email.trim().toLowerCase() === "admin@rhema.ai";
      setSession({ kind: admin ? "admin" : "member", name: admin ? "Admin" : (f.name.trim() || "Anonymous reader"), email: f.email.trim() }); if (tab === "create" && !admin) { try { if (!localStorage.getItem("ca_team_note_seen")) localStorage.setItem("ca_team_note", "1"); } catch (x) {} }
      setBusy(false); go(admin ? "admin" : (localStorage.getItem("ca_onboarded") ? "search" : "intro")); }, 700);
  };
  const guest = () => {
    const enter = () => { setSession({ kind: "guest", name: "Guest" }); go(localStorage.getItem("ca_onboarded") ? "search" : "intro"); };
    if (!window.CAApi || !window.CAApi.isLive()) return enter();
    setBusy(true);
    window.CAApi.guest().then(() => { setSession(window.CASession.get()); setBusy(false); enter(); }, x => { setBusy(false); setErr({ email: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") }); });
  };
  return <div style={{ maxWidth: 440, width: "100%", margin: "0 auto", padding: "40px var(--gutter-phone) 32px", display: "flex", flexDirection: "column", gap: 20 }}>
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -24 }}><window.CALangPick /></div>
    <div>
      <h1 style={{ font: "800 clamp(44px,13vw,60px)/.95 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: 0, textWrap: "balance" }}>{staffL3 && tab === "signin" ? "Staff sign in." : tab === "create" ? "Create an account." : "Welcome back."}</h1>
      <p style={{ font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", margin: "12px 0 0" }}>{staffL3 && tab === "signin" ? "Use the code your organization assigned you. You may see tracks, check-ins, review tools, or regional alerts — depending on your role. This is separate from the public create-account flow." : tab === "create" ? "Save words and get the monthly question." : "Sign in with the email you used when you created your account."}</p>
    </div>
    {!staffL3 && <AuSeg label="Account" value={tab} onChange={t => { setTab(t); setErr({}); }} options={[{ value: "create", label: "Create account" }, { value: "signin", label: "Sign in" }]} style={{ alignSelf: "flex-start" }} />}
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {tab === "create" && <AuField label="Display name (optional)" value={f.name} onChange={set("name")} placeholder="A nickname is fine" hint="Optional. Nobody sees your email." />}
      <AuField label={staffL3 && tab === "signin" ? "Code name" : "Email"} type={staffL3 && tab === "signin" ? "text" : "email"} autoComplete={staffL3 && tab === "signin" ? "username" : "email"} inputMode={staffL3 && tab === "signin" ? "text" : "email"} icon={staffL3 && tab === "signin" ? "user" : "mail"} value={f.email} onChange={set("email")} error={err.email} placeholder={staffL3 && tab === "signin" ? "P-0233" : "name@example.com"} hint={staffL3 && tab === "signin" ? "Use the password your organizer sent — not your email password." : undefined} />
      <AuField label="Password" type="password" autoComplete={tab === "create" ? "new-password" : "current-password"} icon="lock" value={f.pw} onChange={set("pw")} error={err.pw} hint={tab === "create" ? undefined : undefined} />
      {tab === "create" && <ul aria-label="Password rules" aria-live="polite" style={{ listStyle: "none", margin: "-4px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>{[["8 characters or more", f.pw.length >= 8], ["At least one number (0–9) or symbol (!?#)", /[^A-Za-z]/.test(f.pw)], ["Different from your email", !!f.pw && f.pw.toLowerCase() !== f.email.trim().toLowerCase() && !(f.email && f.pw.toLowerCase().includes(f.email.split("@")[0].toLowerCase()))]].map(([t, ok]) => <li key={t} style={{ display: "flex", alignItems: "center", gap: 8, font: "600 13px/1.3 var(--font-body)", color: ok ? "var(--text-body)" : "var(--text-muted)" }}><span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: 99, display: "grid", placeItems: "center", background: ok ? "var(--ok-tint)" : "transparent", border: ok ? "none" : "1px dashed var(--border-strong)", color: "var(--ok-400)", transition: "background 200ms var(--ease-out)" }}>{ok && <AuIcon name="check" size={16} />}</span>{t}<span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{ok ? ", done" : ", not yet"}</span></li>)}</ul>}
      {tab === "create" && <div style={{ borderRadius: "var(--radius-md)", outline: err.agree ? "1px solid var(--danger-400)" : "none", outlineOffset: 4 }}><AuCheck label="I agree to the terms and privacy policy" checked={f.agree} onChange={set("agree")} /></div>}
      {tab === "signin" && !staffL3 && <a href="#" onClick={e => e.preventDefault()} style={{ font: "600 13px/1 var(--font-body)", alignSelf: "flex-start", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Forgot password?</a>}
      {tab === "signin" && !staffL3 && <button type="button" onClick={() => { location.href = "/app#r=signin&staff=l3"; }} style={{ font: "600 13px/1 var(--font-body)", alignSelf: "flex-start", minHeight: 44, padding: 0, border: 0, background: "none", color: "var(--lamp-400)", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "0.12em" }}>Pastor, leader, or reviewer? Sign in with your assigned code</button>}
      {staffL3 && tab === "signin" && <button type="button" onClick={() => { location.href = "/app#r=signin"; }} style={{ font: "600 13px/1 var(--font-body)", alignSelf: "flex-start", minHeight: 44, padding: 0, border: 0, background: "none", color: "var(--text-muted)", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "0.12em" }}>Member sign in with email instead</button>}
      <AuButton type="submit" variant="accent" size="lg" fullWidth loading={busy}>{staffL3 && tab === "signin" ? "Sign in" : tab === "create" ? "Create account" : "Sign in with email"}</AuButton>
    </form>
    <div style={{ display: "flex", alignItems: "center", gap: 12, font: "var(--type-source)", color: "var(--text-faint)" }}><span style={{ flex: 1, borderTop: "1px solid var(--border-subtle)" }}></span>or<span style={{ flex: 1, borderTop: "1px solid var(--border-subtle)" }}></span></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AuButton variant="secondary" size="lg" fullWidth iconRight="arrow-right" onClick={guest}>Continue as guest</AuButton>
      <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>No email. No name. Nothing about you is stored.</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: innerWidth < 700 ? "none" : "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 6 }}>{["Look up any word", "Answer the monthly question", "See the map of ideas", "Flag an entry for review"].map(t => <li key={t} style={{ display: "flex", gap: 8, alignItems: "center", font: "var(--type-source)", color: "var(--text-body)" }}><window.ChurchAIDesignSystem_06db43.Icon name="check" size={16} color="var(--ok-400)" />{t}</li>)}</ul>
      </div>
    </div>
    {staffL3 && tab === "signin" && document.documentElement.hasAttribute("data-ca-demo") && <details data-demo="" style={{ font: "var(--type-source)", color: "var(--text-muted)", textAlign: "center" }}><summary style={{ cursor: "pointer", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Demo reference codes</summary><p style={{ margin: "4px 0 0" }}>Pastor <strong>P-0233</strong> or <strong>P-0901</strong> · Leader <strong>L-0100</strong> · Reviewer <strong>R-0100</strong>. Password is from your beta invite. UI preview: <a href="/pastor#r=tracks&api=0">Three tracks (offline)</a>.</p></details>}
  </div>;
}
Object.assign(window, { AuthScreen, useSession, usePrefs });
