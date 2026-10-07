const { TextField: AuField, Button: AuButton, Checkbox: AuCheck, SegmentedControl: AuSeg, Wordmark: AuMark, Icon: AuIcon } = window.ChurchAIDesignSystem_06db43;

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
  const [, setSession] = useSession();
  const [tab, setTab] = React.useState(initialTab || "create");
  const [f, setF] = React.useState({ name: "", email: "", pw: "", agree: false });
  const [err, setErr] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const set = k => e => setF(s => ({ ...s, [k]: e && e.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e }));
  const submit = ev => {
    ev.preventDefault(); const e = {};
    const live = window.CAApi && window.CAApi.isLive() && tab === "signin";
    if (live) {
      if (!f.email.trim()) e.email = "Enter your email or code name.";
      if (!f.pw) e.pw = "Enter your password.";
      setErr(e); if (Object.keys(e).length) return;
      setBusy(true);
      window.CAApi.signin(f.email.trim(), f.pw).then(s => {
        setSession({ kind: s.kind === "user" ? "member" : s.kind, name: s.pseudonym || "Signed in" }); setBusy(false);
        if (["pastor", "reviewer", "leader", "mentor"].includes(s.kind)) location.href = new URL("../pipeline/index.html", location.href).href;
        else go(s.kind === "admin" ? "admin" : "search");
      }, x => { setBusy(false); setErr({ pw: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") }); });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Use an email like name@example.com.";
    if (f.pw.length < 8) e.pw = "Use at least 8 characters.";
    if (tab === "create" && !f.agree) e.agree = true;
    setErr(e); if (Object.keys(e).length) return;
    setBusy(true);
    if (window.CAApi && window.CAApi.isLive()) {
      window.CAApi.signup(f.email.trim(), f.name.trim(), f.pw).then(s => {
        setSession({ kind: "member", name: f.name.trim() || s.pseudonym || "Anonymous reader" }); setBusy(false);
        try { if (!localStorage.getItem("ca_team_note_seen")) localStorage.setItem("ca_team_note", "1"); } catch (x) {}
        go(localStorage.getItem("ca_onboarded") ? "search" : "intro");
      }, x => { setBusy(false); setErr({ email: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") }); });
      return;
    }
    setTimeout(() => { const admin = f.email.trim().toLowerCase() === "admin@church.ai";
      setSession({ kind: admin ? "admin" : "member", name: admin ? "Admin" : (f.name.trim() || "Anonymous reader"), email: f.email.trim() }); if (tab === "create" && !admin) { try { if (!localStorage.getItem("ca_team_note_seen")) localStorage.setItem("ca_team_note", "1"); } catch (x) {} }
      setBusy(false); go(admin ? "admin" : (localStorage.getItem("ca_onboarded") ? "search" : "intro")); }, 700);
  };
  const guest = () => {
    const enter = () => { setSession({ kind: "guest", name: "Guest" }); go(localStorage.getItem("ca_onboarded") ? "search" : "intro"); };
    if (!window.CAApi || !window.CAApi.isLive()) return enter();
    setBusy(true);
    window.CAApi.guest().then(() => { setBusy(false); enter(); }, x => { setBusy(false); setErr({ email: x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : "") }); });
  };
  return <div style={{ maxWidth: 440, width: "100%", margin: "0 auto", padding: "40px var(--gutter-phone) 32px", display: "flex", flexDirection: "column", gap: 20 }}>
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -24 }}><window.CALangPick /></div>
    <div>
      <h1 style={{ font: "800 clamp(44px,13vw,60px)/.95 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: 0, textWrap: "balance" }}>{tab === "create" ? "Create an account." : "Welcome back."}</h1>
      <p style={{ font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", margin: "12px 0 0" }}>{tab === "create" ? "Save words and get the monthly question." : "Sign in to pick up where you left off."}</p>
    </div>
    <AuSeg label="Account" value={tab} onChange={t => { setTab(t); setErr({}); }} options={[{ value: "create", label: "Create account" }, { value: "signin", label: "Sign in" }]} style={{ alignSelf: "flex-start" }} />
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {tab === "create" && <AuField label="Display name (optional)" value={f.name} onChange={set("name")} placeholder="A nickname is fine" hint="Optional. Nobody sees your email." />}
      <AuField label="Email" type="email" autoComplete="email" inputMode="email" icon="mail" value={f.email} onChange={set("email")} error={err.email} placeholder="name@example.com" />
      <AuField label="Password" type="password" autoComplete={tab === "create" ? "new-password" : "current-password"} icon="lock" value={f.pw} onChange={set("pw")} error={err.pw} hint={tab === "create" ? undefined : undefined} />
      {tab === "create" && <ul aria-label="Password rules" aria-live="polite" style={{ listStyle: "none", margin: "-4px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>{[["8 characters or more", f.pw.length >= 8], ["At least one number (0–9) or symbol (!?#)", /[^A-Za-z]/.test(f.pw)], ["Different from your email", !!f.pw && f.pw.toLowerCase() !== f.email.trim().toLowerCase() && !(f.email && f.pw.toLowerCase().includes(f.email.split("@")[0].toLowerCase()))]].map(([t, ok]) => <li key={t} style={{ display: "flex", alignItems: "center", gap: 8, font: "600 13px/1.3 var(--font-body)", color: ok ? "var(--text-body)" : "var(--text-muted)" }}><span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: 99, display: "grid", placeItems: "center", background: ok ? "var(--ok-tint)" : "transparent", border: ok ? "none" : "1px dashed var(--border-strong)", color: "var(--ok-400)", transition: "background 200ms var(--ease-out)" }}>{ok && <AuIcon name="check" size={16} />}</span>{t}<span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{ok ? ", done" : ", not yet"}</span></li>)}</ul>}
      {tab === "create" && <div style={{ borderRadius: "var(--radius-md)", outline: err.agree ? "1px solid var(--danger-400)" : "none", outlineOffset: 4 }}><AuCheck label="I agree to the terms and privacy policy" checked={f.agree} onChange={set("agree")} /></div>}
      {tab === "signin" && <a href="#" onClick={e => e.preventDefault()} style={{ font: "600 13px/1 var(--font-body)", alignSelf: "flex-start", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Forgot password?</a>}
      <AuButton type="submit" variant="accent" size="lg" fullWidth loading={busy}>{tab === "create" ? "Create account" : "Sign in with email"}</AuButton>
    </form>
    <div style={{ display: "flex", alignItems: "center", gap: 12, font: "var(--type-source)", color: "var(--text-faint)" }}><span style={{ flex: 1, borderTop: "1px solid var(--border-subtle)" }}></span>or<span style={{ flex: 1, borderTop: "1px solid var(--border-subtle)" }}></span></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AuButton variant="secondary" size="lg" fullWidth iconRight="arrow-right" onClick={guest}>Continue as guest</AuButton>
      <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>No email. No name. Nothing about you is stored.</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: innerWidth < 700 ? "none" : "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 6 }}>{["Look up any word", "Answer the monthly question", "See the map of ideas", "Flag an entry for review"].map(t => <li key={t} style={{ display: "flex", gap: 8, alignItems: "center", font: "var(--type-source)", color: "var(--text-body)" }}><window.ChurchAIDesignSystem_06db43.Icon name="check" size={16} color="var(--ok-400)" />{t}</li>)}</ul>
      </div>
    </div>
    {tab === "signin" && <details data-demo="" style={{ font: "var(--type-source)", color: "var(--text-muted)", textAlign: "center" }}><summary style={{ cursor: "pointer", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Demo only</summary><p style={{ margin: "4px 0 0" }}>Sign in as admin@church.ai to open admin.</p></details>}
  </div>;
}
Object.assign(window, { AuthScreen, useSession, usePrefs });
