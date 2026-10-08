const { Wordmark, Icon, IconButton: ShIconBtn, Button: ShButton } = window.ChurchAIDesignSystem_06db43;

function useWide(bp = 860) {
  const [w, setW] = React.useState(window.innerWidth >= bp);
  React.useEffect(() => { const f = () => setW(window.innerWidth >= bp); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, [bp]);
  return w;
}

const shellNav = [["search", "Dictionary", "book-open"], ["month", "This month", "message-square-text"], ["graph", "Map", "waypoints"]];

function PublicShell({ route, go, children, bleed, bare }) {
  const wide = useWide();
  const [session] = window.useSession();
  const [guideOpen, setGuideOpen] = React.useState(false);
  React.useEffect(() => {
    try {
      if (sessionStorage.getItem("ca_guide_open") === "1") {
        sessionStorage.removeItem("ca_guide_open");
        setGuideOpen(true);
      }
    } catch (e) {}
  }, []);
  const signedIn = session && (session.kind === "member" || session.kind === "admin");
  const top = route === "term" ? "search" : route;
  const lk = window.CAGuard.lockdown && window.CAGuard.lockdown();
  const nav = lk ? shellNav.slice(0, 1) : shellNav;
  const order = ["search", "month", "graph"], prevTop = React.useRef(top), dir = React.useRef(null);
  if (prevTop.current !== top) { const a = order.indexOf(prevTop.current), b = order.indexOf(top); dir.current = a >= 0 && b >= 0 ? (b > a ? "r" : "l") : null; prevTop.current = top; }
  const goTab = id => { if (id !== top) window.CAHaptic && window.CAHaptic("light"); go(id); };
  const hpStaff = React.useMemo(() => new URLSearchParams(location.hash.slice(1)).get("staff"), []);
  const staffAuth = bare && route === "signin" && (hpStaff === "l3" || hpStaff === "pastor" || hpStaff === "leader" || hpStaff === "reviewer");
  const showReaderBanner = !bare && !lk && ["search", "term", "month", "graph"].includes(route);
  const GuideBtn = window.GuideHeaderButton;
  const GuideModalComp = window.GuideModal;
  const GuideBannerComp = window.GuideBanner;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-page)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, height: 60, display: "flex", alignItems: "center", gap: 16, padding: "0 var(--gutter-phone)", background: "color-mix(in srgb, var(--ink-0) 82%, transparent)", backdropFilter: "var(--blur-bar)", WebkitBackdropFilter: "var(--blur-bar)", borderBottom: "1px solid var(--border-subtle)" }}>
        <button onClick={() => go("search")} aria-label="Rhema.ai home" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", minHeight: 44, display: "flex", alignItems: "center" }}><Wordmark size={20} /></button>
        <div style={{ flex: 1 }} />
        {wide && !lk && <nav aria-label="Primary" style={{ display: "flex", gap: 4 }}>
          {nav.map(([id, label]) => <button key={id} onClick={() => goTab(id)} aria-current={top === id ? "page" : undefined} style={{ height: 40, padding: "0 14px", borderRadius: 999, border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", background: top === id ? "var(--surface-raised)" : "transparent", color: top === id ? "var(--text-strong)" : "var(--text-muted)" }}>{label}</button>)}
        </nav>}
        {!bare && (signedIn || wide) && <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!signedIn && <ShButton size="sm" variant="secondary" onClick={() => go("signin")}>Sign in</ShButton>}
          {session && session.kind === "admin" && wide && <ShButton size="sm" variant="ghost" onClick={() => go("admin")}>Admin</ShButton>}
        </div>}
        {!bare && GuideBtn && <GuideBtn onClick={() => setGuideOpen(true)} label={wide ? "Guide" : undefined} />}
        {!bare && <ShIconBtn icon="settings" label="Settings" size={44} variant={route === "settings" ? "filled" : "ghost"} onClick={() => go("settings")} />}
        {bare && staffAuth && GuideBtn && <GuideBtn onClick={() => setGuideOpen(true)} label="Staff guide" />}
        {bare && !staffAuth && <ShButton size="sm" variant="ghost" onClick={() => { location.href = "/"; }}>Home</ShButton>}
        {bare && !staffAuth && <ShButton size="sm" variant="ghost" onClick={() => { try { localStorage.setItem("ca_onboarded", "1"); } catch (x) {} go("search"); }}>Skip</ShButton>}
      </header>
      {showReaderBanner && GuideBannerComp && <GuideBannerComp variant="reader" go={go} onOpenGuide={() => setGuideOpen(true)} />}
      {staffAuth && GuideBannerComp && <GuideBannerComp variant="staff" onOpenGuide={() => setGuideOpen(true)} />}
      {GuideModalComp && <GuideModalComp open={guideOpen} onClose={() => setGuideOpen(false)} variant={staffAuth ? "staff" : "reader"} go={go} />}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: wide || bleed || lk ? 0 : 72 }}><div key={top} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, animation: dir.current ? `ca-tab-${dir.current} 220ms var(--ease-out)` : "none" }}>{children}</div></main>
      {!bleed && !bare && <footer style={{ padding: "28px var(--gutter-phone) 36px", display: "flex", gap: 20, flexWrap: "wrap", font: "var(--type-source)", color: "var(--text-faint)", justifyContent: "center" }}>
        {!lk && window.CASession && (window.CASession.get() || {}).kind === "admin" && <a href="#" onClick={e => { e.preventDefault(); go("admin", undefined, { tab: "map" }); }} style={{ color: "var(--text-muted)", minHeight: 44, display: "inline-flex", alignItems: "center" }}>Map draft</a>}
      </footer>}
      {!wide && !bare && !lk && <nav aria-label="Primary" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30, height: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "color-mix(in srgb, var(--ink-0) 92%, transparent)", backdropFilter: "var(--blur-bar)", WebkitBackdropFilter: "var(--blur-bar)", borderTop: "1px solid var(--border-subtle)" }}>
        {nav.map(([id, label, ic]) => <button key={id} onClick={() => goTab(id)} aria-current={top === id ? "page" : undefined} style={{ background: "none", border: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: top === id ? "var(--lamp-400)" : "var(--text-muted)", font: "700 13px/1 var(--font-body)" }}><span style={{ width: 56, height: 30, display: "grid", placeItems: "center", borderRadius: 999, background: top === id ? "var(--surface-raised)" : "transparent" }}><Icon name={ic} size={20} weight={top === id ? "fill" : "regular"} /></span>{label}</button>)}
      </nav>}
    </div>
  );
}

function StatesScreen() {
  const { StateBlock: St } = window.ChurchAIDesignSystem_06db43;
  const items = [
    ["Loading", <St kind="loading" compact />],
    ["Empty", <St kind="empty" compact word="quiet" motif="people" title="No alerts" message="Every region is open as usual." />],
    ["Term not in the dictionary", <St kind="empty" compact word="xyz" motif="word" message="Not in the dictionary yet." />],
    ["Uncovered section", <St kind="uncovered" compact message="The dictionary does not cover this yet." />],
    ["Invalid input", <St kind="error" compact title="Invalid input" message="Use a single word or short phrase, without symbols." onRetry={() => {}} />],
    ["Not allowed", <St kind="unavailable" compact title="Not allowed" message="This page is for reviewers. Your account can’t open it." />],
    ["Service down", <St kind="error" compact title="Service down" message="The dictionary service did not answer. Try again in a moment." onRetry={() => {}} />],
    ["Unavailable", <St kind="unavailable" compact message="This part is unavailable while the assistant gateway is down. The definition still works." />],
    ["Blocked (request id)", <St kind="unavailable" compact title="Blocked" message="This request was blocked. Nothing was looked up or saved. Request id: req_7f3a9c1e2d" />],
    ["Coverage insufficient", <St kind="uncovered" compact title="Coverage is insufficient" message="No verified source for this block yet, so nothing is written." />]
  ];
  return <div style={{ maxWidth: 1040, width: "100%", margin: "0 auto", padding: "32px var(--gutter-phone)" }}>
    <h1 style={{ font: "var(--type-title)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", margin: "0 0 6px" }}>States and errors</h1>
    <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: "0 0 20px" }}>Every data screen uses these. Errors are one sentence a person can read.</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
      {items.map(([k, el]) => <div key={k} style={{ display: "flex", flexDirection: "column", gap: 8 }}><div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-label)", color: "var(--text-faint)" }}>{k}</div>{el}</div>)}
    </div>
  </div>;
}

function WordEmpty({ word, line }) {
  const { StateBlock: WeState, Button: WeBtn } = window.ChurchAIDesignSystem_06db43;
  return <><h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", margin: 0 }}>{word}</h1><WeState kind="empty" word={word} motif="word" message={line} /><div style={{ display: "flex", justifyContent: "center", paddingBottom: 24 }}><WeBtn variant="secondary" icon="search" onClick={() => { if (window.CAGo) window.CAGo("search"); else location.hash = "r=search"; }}>Search another word</WeBtn></div></>;
}

Object.assign(window, { PublicShell, StatesScreen, useWide, WordEmpty });
