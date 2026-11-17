const { Button: SeButton, SegmentedControl: SeSeg, Switch: SeSwitch, Badge: SeBadge, Toast: SeToast, Icon: SeIcon } = window.ChurchAIDesignSystem_06db43;
const seLabel = { font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" };
const seBox = { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", padding: "4px 20px" };
const sePalettes = [["moss", "Moss", ["#0B0F0C", "#CFDA5C"]], ["lamp", "Lamp", ["#0E0D0B", "#F4C152"]], ["nocturne", "Nocturne", ["#0A0C12", "#FF6FA3"]], ["oxblood", "Oxblood", ["#120B0C", "#6FD6FF"]]];

function SeRow({ title, sub, children, stack }) {
  return <div className="se-row" style={{ display: "flex", flexDirection: stack ? "column" : "row", alignItems: stack ? "stretch" : "center", gap: 12, padding: "16px 0", flexWrap: "wrap" }}>
    <div style={{ flex: stack ? "none" : "1 1 200px", minWidth: 0 }}><div style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{title}</div>{sub && <div style={{ font: "var(--type-body)", fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>{sub}</div>}</div>
    <div style={{ flex: "none", maxWidth: "100%" }}>{children}</div>
  </div>;
}
function SeSection({ label, children }) {
  return <section><div style={{ ...seLabel, margin: "0 0 8px 4px" }}>{label}</div><div style={seBox}><div style={{ display: "flex", flexDirection: "column" }}>{React.Children.toArray(children).filter(Boolean).flatMap(c => c.type === React.Fragment ? React.Children.toArray(c.props.children).filter(Boolean) : [c]).map((c, i) => <div key={i} style={{ borderTop: i ? "1px solid var(--border-subtle)" : 0 }}>{c}</div>)}</div></div></section>;
}

function SettingsScreen({ go }) {
  const [p, setP] = window.usePrefs();
  const [s, setSession] = window.useSession();
  const [delAsk, setDelAsk] = React.useState(false), [delTxt, setDelTxt] = React.useState(""), [memTick, setMemTick] = React.useState(0);
  const mem = React.useMemo(() => { const L = localStorage, ks = Object.keys(L), out = [];
    const j = k => { try { return JSON.parse(L.getItem(k)); } catch (e) { return null; } };
    const c = j("ca_curious"); if (c && c.length) out.push({ label: "Words you’re curious about", val: c.map(k => (window.CACurious && window.CACurious.LABEL[k]) || k).join(", "), keys: ["ca_curious"] });
    const ideas = ks.filter(k => k.startsWith("ca_my_idea_")); if (ideas.length) out.push({ label: "Your idea on the map", val: ideas.map(k => L.getItem(k)).join(", "), keys: ideas });
    const ans = ks.filter(k => k.startsWith("ca_answered_")); if (ans.length) out.push({ label: "Months you answered", val: ans.length + " month" + (ans.length > 1 ? "s" : ""), keys: ans });
    const d = j("ca_on_device"); if (d && d.length) out.push({ label: "Words saved for offline", val: d.join(", "), keys: ["ca_on_device"] });
    if (L.getItem("ca_remind")) out.push({ label: "Monthly reminder", val: L.getItem("ca_remind") === "yes" ? "On" : "Off", keys: ["ca_remind"] });
    const h = ks.filter(k => k.startsWith("ca_helped_")); if (h.length) out.push({ label: "“Did this help?” taps", val: h.length + " answer" + (h.length > 1 ? "s" : ""), keys: h });
    return out; }, [memTick]);
  const forget = all => { Object.keys(localStorage).filter(k => k.startsWith("ca_") && (all || !["ca_prefs", "ca_session", "ca_pipe_route"].includes(k))).forEach(k => localStorage.removeItem(k)); };
  const [toast, setToast] = React.useState(null);
  const [pauseV, setPauseV] = React.useState(() => window.CAPauseMinutes ? window.CAPauseMinutes.get() : "25");
  React.useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 1800); return () => clearTimeout(id); }, [toast]);
  const upd = (patch, msg) => { setP(patch); setToast(msg || "Saved"); };
  const light = p.theme === "light" || (p.theme === "system" && window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches);
  const kind = s ? s.kind : "none";
  return <div style={{ maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "28px var(--gutter-phone) 32px", display: "flex", flexDirection: "column", gap: 22 }}>
    <h1 style={{ font: "800 clamp(40px,12vw,56px)/1 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: 0 }}>Settings</h1>

    <SeSection label="Account">
      {kind === "member" || kind === "admin" ? <>
        <SeRow title={s.name} sub={s.email}><SeBadge tone={kind === "admin" ? "info" : "neutral"}>{kind === "admin" ? "Admin" : "Reader"}</SeBadge></SeRow>
        {kind === "admin" && <SeRow title="Admin" sub="Accounts, map draft and faith review."><SeButton size="sm" variant="primary" iconRight="arrow-right" onClick={() => go("admin")}>Open admin</SeButton></SeRow>}
        <SeRow title="Sign out" sub="Your settings stay on this device."><SeButton size="sm" variant="secondary" onClick={() => { const out = () => { setSession(null); go("search"); }; window.CAApi && window.CAApi.isLive() ? window.CAApi.signout().then(out, out) : out(); }}>Sign out</SeButton></SeRow>
      </> : <>
        <SeRow title={kind === "guest" ? "You’re browsing as a guest" : "Not signed in"} sub="No email, no name, nothing about you is stored."><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><SeButton size="sm" variant="ghost" onClick={() => go("signin")}>Sign in</SeButton>{localStorage.getItem("ca_guest_first") !== "1" && <SeButton size="sm" variant="secondary" onClick={() => go("welcome")}>Create account</SeButton>}</div></SeRow>
      </>}
    </SeSection>

    <SeSection label="Help">
      <SeRow title="How to use Rhema" sub="Dictionary, monthly question, and map — guided steps in the app.">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <SeButton size="sm" variant="secondary" onClick={() => { try { localStorage.removeItem("ca_guide_reader"); localStorage.removeItem("ca_guide_landing"); sessionStorage.setItem("ca_guide_open", "1"); } catch (e) {} go("search"); }}>Show guide again</SeButton>
          <SeButton size="sm" variant="ghost" onClick={() => { location.href = "/"; }}>Back to home</SeButton>
        </div>
      </SeRow>
      <SeRow title="Pastor, leader, or reviewer?" sub="Separate sign-in from the public dictionary."><SeButton size="sm" variant="ghost" onClick={() => { location.href = "/staff"; }}>Staff sign in</SeButton></SeRow>
      <SeRow title="Ideas &amp; fixes" sub="Suggest missing words or product ideas (local API saves posts)."><SeButton size="sm" variant="ghost" onClick={() => { location.href = "/feedback"; }}>Feedback board</SeButton></SeRow>
    </SeSection>

    <SeSection label="Language">
      <SeRow title="App language" sub="Buttons, labels and messages. Word definitions show in English until a reviewer approves a translation."><window.CALangPick /></SeRow>
    </SeSection>

    <SeSection label="Appearance">
      <SeRow title="Theme" sub={p.theme === "system" ? `Following your phone · ${light ? "light" : "dark"} now` : undefined} stack>
        <SeSeg label="Theme" value={p.theme} onChange={v => upd({ theme: v }, v === "light" ? "Light mode on" : v === "dark" ? "Dark mode on" : "Following your phone")} options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }, { value: "system", label: "System" }]} />
      </SeRow>
      <SeRow title="Dark palette" sub={light ? "Palettes apply in dark mode." : "One accent across the whole app."} stack>
        <div role="radiogroup" aria-label="Dark palette" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 8, opacity: light ? 0.45 : 1 }}>
          {sePalettes.map(([id, name, [bg, ac]]) => { const on = p.palette === id; return <button key={id} role="radio" aria-checked={on} disabled={light} onClick={() => upd({ palette: id }, `${name} palette`)} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", padding: 8, borderRadius: "var(--radius-md)", border: `${on ? 2 : 1}px solid ${on ? "var(--lamp-400)" : "var(--border-default)"}`, background: "transparent", cursor: light ? "not-allowed" : "pointer", minHeight: 44 }}>
            <span style={{ height: 36, borderRadius: 6, background: bg, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 5, border: "1px solid rgba(255,255,255,.08)" }}><span style={{ width: 14, height: 14, borderRadius: 99, background: ac }}></span></span>
            <span style={{ font: "600 13px/1 var(--font-body)", color: on ? "var(--text-strong)" : "var(--text-muted)", textAlign: "left" }}>{name}</span>
          </button>; })}
        </div>
      </SeRow>
      <SeRow title="Text size" sub="Larger text across every screen.">
        <SeSeg size="sm" label="Text size" value={p.textSize} onChange={v => upd({ textSize: v }, v === "large" ? "Larger text on" : "Default text")} options={[{ value: "default", label: "Default" }, { value: "large", label: "Large" }]} />
      </SeRow>
    </SeSection>

    <SeSection label="What Rhema.ai remembers">
      <SeRow title="On this device only" sub="Nothing here is sent anywhere. Delete any of it." stack>
        {mem.length === 0 ? <span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>Nothing yet.</span> :
        <ul style={{ listStyle: "none", margin: 0, padding: 0, width: "100%", display: "flex", flexDirection: "column" }}>{mem.map((m, i) => <li key={m.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i ? "1px solid var(--border-subtle)" : 0 }}>
          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}><span style={{ font: "600 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{m.label}</span><span style={{ font: "var(--type-source)", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.val}</span></span>
          <SeButton size="sm" variant="ghost" icon="x" onClick={() => { m.keys.forEach(k => localStorage.removeItem(k)); setMemTick(t => t + 1); setToast(m.label + " deleted."); }}>Delete</SeButton>
        </li>)}</ul>}
        {mem.length > 0 && <div><SeButton size="sm" variant="secondary" onClick={() => { forget(false); setMemTick(t => t + 1); setToast("Cleared. This device remembers nothing about you."); }}>Clear everything</SeButton></div>}
      </SeRow>
    </SeSection>

    <SeSection label="Motion and reading">
      <SeRow title="Gentle pause" sub="A calm note after a long stretch. Once per visit." stack>
        <SeSeg size="sm" label="Gentle pause" value={pauseV} onChange={v => { setPauseV(v); window.CAPauseMinutes.set(v); setToast(v === "off" ? "Gentle pause off" : `Gentle pause after ${v} minutes`); }} options={[{ value: "15", label: "15 min" }, { value: "25", label: "25 min" }, { value: "45", label: "45 min" }, { value: "off", label: "Off" }]} />
      </SeRow>
      <SeRow title="Reduce motion" sub="Turns off slides, pops and hints."><SeSwitch aria-label="Reduce motion" checked={!!p.reduceMotion} onChange={v => upd({ reduceMotion: v }, v ? "Motion reduced" : "Motion on")} /></SeRow>
    </SeSection>

    {(kind === "member" || kind === "admin") && <SeSection label="Leave Rhema.ai">
        <SeRow title="Delete account" sub="Removes your email, display name and settings. Past answers stay only as anonymous counts and can’t be traced to you." stack>
          {delAsk ? <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}><window.CATypeConfirm word="delete" value={delTxt} onChange={setDelTxt} hint="This can’t be undone." /><div style={{ display: "flex", gap: 8 }}><SeButton size="sm" variant="danger" disabled={!window.CAMatch(delTxt, "delete")} onClick={() => { const gone = () => { forget(true); setSession(null); go("search"); }; if (!window.CAApi || !window.CAApi.isLive()) return gone(); window.CAApi.deleteMe().then(gone, x => setToast(x.message + (x.requestId ? " (" + x.requestId.slice(0, 8) + ")" : ""))); }}>Delete account</SeButton><SeButton size="sm" variant="ghost" onClick={() => { setDelAsk(false); setDelTxt(""); }}>Keep it</SeButton></div></div>
          : <div><SeButton size="sm" variant="danger" icon="trash-2" onClick={() => setDelAsk(true)}>Delete account…</SeButton></div>}
        </SeRow>
    </SeSection>}

    {toast && <div role="status" style={{ position: "fixed", left: "50%", bottom: 84, transform: "translateX(-50%)", zIndex: 120, animation: "ca-pop var(--dur-slow) var(--ease-out)" }}><SeToast tone="ok" onClose={() => setToast(null)}>{toast}</SeToast></div>}
  </div>;
}
window.SettingsScreen = SettingsScreen;
