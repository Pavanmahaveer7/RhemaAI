const { TextField: LpField, Button: LpButton, Icon: LpIcon, Wordmark: LpWordmark } = window.ChurchAIDesignSystem_06db43;

const lpReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const lpTrad = { Hindu: "hindu", Buddhist: "buddhist", Christian: "christian" };
const lpApp = "/search";
const lpTourFull = (layout) => `/tour?from=landing#layout=${layout}`;
const lpOnboard = `/welcome/1`;
const lpLex = t => window.CA_DATA.lexicon.find(x => x.term === t);

const lpEveryone = `/search?guest=1`;
const lpStaffSignIn = "/staff";
function useWideLp(bp) { const [w, setW] = React.useState(innerWidth >= bp); React.useEffect(() => { const f = () => setW(innerWidth >= bp); addEventListener("resize", f); return () => removeEventListener("resize", f); }, []); return w; }

// Hero: the word page building itself. Runs once per word, ~3s. Chips replay it.
function WordDemo({ wide }) {
  const words = ["karma", "grace", "salvation", "dharma"];
  const [word, setWord] = React.useState("karma");
  const [t, setT] = React.useState(lpReduce() ? 99 : 0);
  const e = lpLex(word);
  React.useEffect(() => {
    if (lpReduce()) { setT(99); return; }
    setT(0); let s = 0; const id = setInterval(() => { s++; setT(s); if (s > 30) clearInterval(id); }, 100);
    return () => clearInterval(id);
  }, [word]);
  const typed = word.slice(0, Math.min(word.length, Math.floor(t / 1.4)));
  const typing = typed.length < word.length;
  const at = n => t >= n;
  const step = n => ({ opacity: at(n) ? 1 : 0, transform: at(n) ? "none" : "translateY(6px)", transition: "opacity 260ms var(--ease-out), transform 260ms var(--ease-out)" });
  const src = e && e.sources && e.sources[0];
  return <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch", width: "100%", maxWidth: 380, justifySelf: "center" }}>
    <a href={`/word/${word}`} aria-label={`Open ${word} in the dictionary`} className="lp-card" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20, minHeight: 380, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "var(--surface-card)", textDecoration: "none", color: "inherit" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 16px", borderRadius: 999, background: "var(--surface-raised)", border: "1px solid var(--border-default)" }}>
        <LpIcon name="search" size={18} color="var(--text-muted)" />
        <span style={{ font: "600 18px/1 var(--font-body)", color: "var(--text-strong)" }}>{typed}<span style={{ display: typing ? "inline-block" : "none", width: 2, height: 18, marginLeft: 2, verticalAlign: "-3px", background: "var(--lamp-400)" }}></span></span>
      </div>
      <div style={{ ...step(9), font: "800 64px/.9 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", overflowWrap: "anywhere" }}>{word}</div>
      <div style={{ ...step(12), display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ font: "italic 400 16px/1 var(--font-body)", color: "var(--text-muted)" }}>{e && e.pos}</span>
        <p style={{ margin: 0, font: "var(--type-body)", fontSize: 18, color: "var(--text-body)", textWrap: "pretty" }}>{e && e.def}</p>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{(e ? e.used : []).map((u, i) => <span key={u} style={{ opacity: at(16 + i * 3) ? 1 : 0, transform: at(16 + i * 3) ? "none" : "scale(1.15)", transition: "opacity 180ms var(--ease-out), transform 220ms var(--ease-out)", height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center", borderRadius: 999, background: `var(--trad-${lpTrad[u]}-tint)`, color: `var(--trad-${lpTrad[u]})`, font: "600 13px/1 var(--font-body)" }}>{u}</span>)}</div>
      <div style={{ ...step(23), marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
        {wide && e && e.used.length > 1 && <span style={{ font: "700 18px/1.25 var(--font-body)", color: "var(--lamp-400)" }}>Same word. Not the same concept.</span>}
        {src && <span style={{ font: "var(--type-source)", color: "var(--info-400)", display: "inline-flex", gap: 6, alignItems: "center" }}><LpIcon name="link-2" size={16} />{src.work} {src.reference}</span>}
      </div>
    </a>
    <div role="group" aria-label="Try a word" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
      {words.map(w => <button key={w} onClick={() => setWord(w)} aria-pressed={w === word} className="lp-chip" style={{ height: 40, padding: "0 16px", borderRadius: 999, border: "1px solid " + (w === word ? "var(--bone-8)" : "var(--border-default)"), background: w === word ? "var(--bone-8)" : "transparent", color: w === word ? "var(--ink-0)" : "var(--text-body)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}>{w}</button>)}
    </div>
  </div>;
}

function TourCard({ wide }) {
  const ref = React.useRef(null);
  const [load, setLoad] = React.useState(false);
  const rm = lpReduce();
  React.useEffect(() => { if (rm) return; const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setLoad(true); io.disconnect(); } }, { rootMargin: "200px" }); ref.current && io.observe(ref.current); return () => io.disconnect(); }, []);
  return <section ref={ref} aria-labelledby="lp-tour" style={{ maxWidth: 1180, margin: "0 auto", padding: "24px var(--gutter-phone)", display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
      <h2 id="lp-tour" style={{ margin: 0, font: "800 clamp(28px,6vw,40px)/1 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", flex: "1 1 auto" }}>See it in one minute.</h2>
      {wide && <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>No sound.</span>}
    </div>
    <div style={{ width: wide ? "100%" : "min(100%, 420px)", alignSelf: "center", aspectRatio: wide ? "16 / 9" : "9 / 16", maxHeight: wide ? "none" : "78svh", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)", background: "var(--ink-0)" }}>
      {load ? <iframe title="Rhema.ai one-minute tour" src={`/tour?from=landing-embed#layout=${wide ? "16:9" : "9:16"}&bare=1`} loading="lazy" style={{ width: "100%", height: "100%", border: 0, display: "block" }}></iframe>
      : <a href={lpTourFull(wide ? "16:9" : "9:16")} className="lp-card" style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", textDecoration: "none", color: "var(--text-strong)" }}><span style={{ display: "inline-flex", gap: 10, alignItems: "center", font: "700 18px/1 var(--font-body)" }}><span aria-hidden="true" style={{ width: 56, height: 56, borderRadius: 999, display: "grid", placeItems: "center", background: "var(--lamp-400)", color: "var(--ink-0)" }}><LpIcon name="play" size={24} /></span>Play the tour</span></a>}
    </div>
  </section>;
}

function lpSpiral(ids) { const pos = {}; ids.forEach((id, i) => { const a = i * 2.39996, r = 16 + Math.sqrt(i) * 30; pos[id] = [Math.cos(a) * r, Math.sin(a) * r * 0.78]; }); return pos; }

// Scroll sequence: content is always there. Entering view flips Aug → Sep once.
function MonthSequence({ wide }) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice(-2);
  const [A, B] = pub.length === 2 ? pub : [null, pub[0]];
  const [k, setK] = React.useState(A ? 0 : 1);
  const ref = React.useRef(null), anim = React.useRef(0), seen = React.useRef(false);
  const go = to => { cancelAnimationFrame(anim.current); if (lpReduce()) { setK(to); return; } const from = k, t0 = performance.now(); const f = now => { const p = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - p, 3); setK(from + (to - from) * e); if (p < 1) anim.current = requestAnimationFrame(f); }; anim.current = requestAnimationFrame(f); };
  React.useEffect(() => { if (!A) return; const io = new IntersectionObserver(([en]) => { if (en.isIntersecting && !seen.current) { seen.current = true; setTimeout(() => go(1), 300); } }, { threshold: 0.4 }); ref.current && io.observe(ref.current); return () => io.disconnect(); }, []);
  const W = m => Object.fromEntries((m ? m.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wa = W(A), wb = W(B);
  const ids = [...new Set([...Object.keys(wb), ...Object.keys(wa)])].sort((x, y) => (wb[y] || wa[y] || 0) - (wb[x] || wa[x] || 0));
  const val = id => (wa[id] || 0) + ((wb[id] || 0) - (wa[id] || 0)) * k;
  const top = ids.filter(id => (k >= 0.5 ? wb : wa)[id]).slice(0, 5);
  const pos = React.useMemo(() => lpSpiral(ids.slice(0, 18)), []);
  const cur = k >= 0.5 ? B : A;
  const isNew = id => A && !wa[id] && wb[id];
  const answers = Math.round((A ? A.answers : 0) + (B.answers - (A ? A.answers : 0)) * k);
  const card = { borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: 20, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 };
  const h3 = { margin: 0, font: "var(--type-section)", color: "var(--text-strong)" };
  const Q = cur.question, T = cur.term, qi = T ? Q.toLowerCase().indexOf(T) : -1;
  return <section id="month" ref={ref} aria-labelledby="lp-month" style={{ maxWidth: 1180, margin: "0 auto", padding: "56px var(--gutter-phone) 72px", display: "flex", flexDirection: "column", gap: 24 }}>
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" }}>
      <div style={{ maxWidth: 560 }}>
        <h2 id="lp-month" style={{ margin: 0, font: "800 clamp(34px,7vw,48px)/1 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>One question a month.</h2>
        {wide && <p style={{ margin: "10px 0 0", font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", textWrap: "pretty" }}>See what people believe this month. We count ideas, never people.</p>}
      </div>
      {A && <div role="group" aria-label="Month" style={{ display: "flex", gap: 4, padding: 4, borderRadius: 999, border: "1px solid var(--border-subtle)", background: "var(--surface-raised)" }}>{[[A, 0], [B, 1]].map(([m, v]) => <button key={m.id} onClick={() => go(v)} aria-pressed={cur === m} style={{ height: 36, flex: "none", whiteSpace: "nowrap", padding: "0 14px", borderRadius: 999, border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body)", background: cur === m ? "var(--bone-8)" : "transparent", color: cur === m ? "var(--ink-0)" : "var(--text-muted)" }}>{m.label}</button>)}</div>}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3,minmax(0,1fr))" : "minmax(0,1fr)", gap: 16 }}>
      <div style={card}>
        <h3 style={h3}>You answer</h3>
        <p style={{ margin: 0, font: "800 24px/1.1 var(--font-display)", color: "var(--text-strong)", textWrap: "balance" }}>{qi < 0 ? Q : <>{Q.slice(0, qi)}<a href={`/word/${T}`} style={{ textDecoration: "underline", textUnderlineOffset: "0.12em" }}>{T}</a>{Q.slice(qi + T.length)}</>}</p>
        {wide && <p style={{ margin: 0, font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>No account. Not tied to any pastor.</p>}
        <a href="/month" className="lp-link" style={{ marginTop: "auto", display: "inline-flex", gap: 6, alignItems: "center", font: "700 16px/1 var(--font-body)", minHeight: 44 }}>Answer this month <LpIcon name="arrow-right" size={16} /></a>
      </div>
      <div style={card}>
        <h3 style={h3}>Ideas are counted</h3>
        <div style={{ font: "800 48px/1 var(--font-display)", color: "var(--text-strong)", fontVariantNumeric: "tabular-nums" }}>{answers}<span style={{ font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)", marginLeft: 8 }}>answers</span></div>
        <p style={{ margin: 0, font: "var(--type-body)", fontSize: 16, color: "var(--text-body)", textWrap: "pretty" }}>{top.length ? <>Leading ideas this month include {top.slice(0, 3).map((id, i) => <React.Fragment key={id}>{i ? ", " : ""}<span style={{ fontWeight: 700 }}>{id}</span></React.Fragment>)}.</> : "Counts update as people answer."}</p>
        {wide && <p style={{ margin: "auto 0 0", font: "var(--type-source)", color: "var(--text-muted)" }}>We never show answer text. Ideas under three mentions stay hidden.</p>}
      </div>
      <div style={card}>
        <h3 style={h3}>A person publishes the map</h3>
        <a href="/map" aria-label="Open the ideas map" className="lp-card" style={{ position: "relative", display: "block", height: 220, borderRadius: "var(--radius-md)", background: "var(--ink-1)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
          <svg viewBox="-150 -110 300 220" width="100%" height="100%" aria-hidden="true">{ids.slice(0, 18).map(id => { const v = val(id), r = v < 1 ? 0 : 4 + Math.sqrt(v) * 2.6, [x, y] = pos[id]; const nw = isNew(id) && k >= 0.5;
            return <g key={id} transform={`translate(${x} ${y})`}><circle r={r} fill={nw ? "var(--lamp-400)" : "var(--ink-4)"} stroke={nw ? "none" : "var(--bone-7)"} strokeWidth="1" />{r > 12 && <text y={r + 11} textAnchor="middle" style={{ font: "600 13px var(--font-body)", fill: "var(--text-body)" }}>{id}</text>}</g>; })}</svg>
        </a>
        {wide && <p style={{ margin: 0, font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>Bigger = said more. <span style={{ color: "var(--lamp-400)", fontWeight: 700 }}>Lime</span> = new this month.</p>}
        <a href="/map" className="lp-link" style={{ marginTop: "auto", display: "inline-flex", gap: 6, alignItems: "center", font: "700 16px/1 var(--font-body)", minHeight: 44 }}>Open the map <LpIcon name="arrow-right" size={16} /></a>
      </div>
    </div>
  </section>;
}

function Landing() {
  const wide = useWideLp(900);
  const lk = window.CAGuard.lockdown();
  const [solid, setSolid] = React.useState(scrollY > 8);
  const [q, setQ] = React.useState("");
  const [guideOpen, setGuideOpen] = React.useState(false);
  React.useEffect(() => { const f = () => setSolid(scrollY > 8); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  const submit = ev => { ev.preventDefault(); const t = q.trim().toLowerCase(); if (!t) return; location.href = lpLex(t) ? `/word/${encodeURIComponent(t)}` : `/search`; };
  const nav = [["Dictionary", "#top"], ...(lk ? [] : [["This month", "#month"]]), ["Tour", lpTourFull(wide ? "16:9" : "9:16")]];
  const hdrLink = { height: 44, padding: "0 10px", display: "inline-flex", alignItems: "center", font: "600 15px/1 var(--font-body)", textDecoration: "none", whiteSpace: "nowrap" };
  return <>
    <header style={{ position: "sticky", top: 0, zIndex: 30, height: 64, display: "flex", alignItems: "center", gap: 8, padding: "0 var(--gutter-phone)", background: solid ? "color-mix(in srgb, var(--ink-0) 94%, transparent)" : "transparent", borderBottom: "1px solid " + (solid ? "var(--border-subtle)" : "transparent"), backdropFilter: solid ? "blur(10px)" : "none", transition: "background 200ms var(--ease-out), border-color 200ms var(--ease-out)" }}>
      <a href="#top" aria-label="Rhema.ai home" style={{ display: "flex", alignItems: "center", minHeight: 44, textDecoration: "none" }}><LpWordmark size={20} /></a>
      <div style={{ flex: 1 }}></div>
      {wide && <nav aria-label="Primary" style={{ display: "flex", gap: 4 }}>{nav.map(([l, h]) => <a key={l} href={h} className="lp-nav" style={{ ...hdrLink, borderRadius: 999 }}>{l}</a>)}</nav>}
      <button type="button" className="lp-nav" style={{ ...hdrLink, borderRadius: 999, border: 0, background: "none", cursor: "pointer", color: "var(--lamp-400)" }} onClick={() => setGuideOpen(true)}>Guide</button>
      <a href="/signin" className="lp-nav" style={{ ...hdrLink, color: "var(--text-muted)" }}>Sign in</a>
      <LpButton size="sm" variant={solid ? "accent" : "secondary"} onClick={() => { location.href = lpTourFull(wide ? "16:9" : "9:16"); }}>Get started</LpButton>
    </header>
    {wide && !lk && window.GuideBanner && <window.GuideBanner variant="landing" onOpenGuide={() => setGuideOpen(true)} />}
    {window.GuideModal && <window.GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} variant="reader" go={id => { location.href = id === "search" ? lpEveryone : id === "month" ? "/month" : "/map"; }} />}
    <main id="top">
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: wide ? "40px var(--gutter-phone) 24px" : "20px var(--gutter-phone) 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: wide ? 40 : 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720, width: "100%", alignItems: wide ? "center" : "stretch", textAlign: wide ? "center" : "left" }}>
          <h1 style={{ margin: 0, font: wide ? "800 clamp(52px,13vw,96px)/.92 var(--font-display)" : "800 clamp(36px,11vw,48px)/.96 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", textWrap: "balance" }}>One word. Three faiths.</h1>
          {wide && <p style={{ margin: 0, font: "var(--type-body)", fontSize: 18, lineHeight: 1.5, color: "var(--text-body)", textWrap: "pretty" }}>Look up a word to see what it means in Hindu, Buddhist and Christian traditions. Free. Side by side, with sources, so the same word is not mistaken for the same idea. No account.</p>}
          {wide && <p style={{ margin: 0, font: "var(--type-source)", color: "var(--text-muted)" }}>New here? <a href={lpTourFull(wide ? "16:9" : "9:16")} className="lp-link" style={{ fontWeight: 700, color: "var(--lamp-400)" }}>Watch the one-minute tour</a>, then continue into the app.</p>}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: wide ? "row" : "column", gap: 10, alignItems: wide ? "flex-end" : "stretch", width: "100%", maxWidth: 560, textAlign: "left" }}>
            <div style={{ flex: 1 }}><LpField label="Word" size="lg" icon="search" type="search" placeholder="karma" value={q} onChange={e => setQ(e.target.value)} autoComplete="off" /></div>
            <LpButton type="submit" variant="accent" size="lg">Search a word</LpButton>
          </form>
        </div>
        <WordDemo wide={wide} />
      </section>
      {!lk && <TourCard wide={wide} />}
      {!lk && <MonthSequence wide={wide} />}
      {!lk && <section aria-labelledby="lp-l3" style={{ maxWidth: 1180, margin: "0 auto", padding: "32px var(--gutter-phone) 8px" }}>
        <div className="lp-card" style={{ display: "flex", flexDirection: wide ? "row" : "column", gap: 20, alignItems: wide ? "center" : "stretch", justifyContent: "space-between", padding: "24px 22px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 620 }}>
            {wide && <span style={{ font: "700 11px/1 var(--font-body)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Layer 3 · Staff beta</span>}
            <h2 id="lp-l3" style={{ margin: 0, font: "800 clamp(24px,5vw,32px)/1.12 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", textWrap: "balance" }}>Pastor, leader, or reviewer?</h2>
            {wide && <p style={{ margin: 0, font: "var(--type-body)", fontSize: 17, color: "var(--text-muted)", textWrap: "pretty" }}>This is a <strong style={{ color: "var(--text-body)", fontWeight: 700 }}>separate app</strong> from the public dictionary. Use the invite your organizer sent: <strong style={{ color: "var(--text-body)", fontWeight: 700 }}>code + password</strong>. You will not go through the public tour or create-account flow.</p>}
            {wide && <ol style={{ margin: "4px 0 0", paddingLeft: 22, font: "var(--type-body)", fontSize: 16, color: "var(--text-body)", display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Open <strong>Staff sign in</strong> (one link).</li>
              <li>Sign in with your assigned code (e.g. P-0233).</li>
              <li>Land in <strong>Staff</strong> — tracks, check-in, review, or alerts by role.</li>
            </ol>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: wide ? "flex-end" : "stretch" }}>
            <LpButton variant="secondary" size="lg" iconRight="arrow-right" onClick={() => { location.href = lpStaffSignIn; }}>Staff sign in (have a code)</LpButton>
            <LpButton variant="ghost" size="md" onClick={() => { location.href = "/staff?register=phone"; }}>Register with phone — demo</LpButton>
          </div>
        </div>
      </section>}
      {!lk && <section aria-labelledby="lp-beta" style={{ maxWidth: 1180, margin: "0 auto", padding: "8px var(--gutter-phone) 56px" }}>
        <div className="lp-card" style={{ display: "flex", flexDirection: wide ? "row" : "column", gap: 20, alignItems: wide ? "center" : "stretch", justifyContent: "space-between", padding: "24px 22px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "linear-gradient(135deg, var(--surface-card) 0%, color-mix(in srgb, var(--clay-400) 8%, var(--surface-card)) 100%)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
            <span style={{ font: "700 11px/1 var(--font-body)", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--clay-400)" }}>Beta</span>
            <h2 id="lp-beta" style={{ margin: 0, font: "800 clamp(26px,5vw,34px)/1.12 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", textWrap: "balance" }}>Help us get this right.</h2>
            {wide && <p style={{ margin: 0, font: "var(--type-body)", fontSize: 17, color: "var(--text-muted)", textWrap: "pretty" }}>About one minute. No account. Tell us what felt clear, fair, or confusing — we read every answer.</p>}
          </div>
          <LpButton variant="accent" size="lg" iconRight="arrow-right" onClick={() => { location.href = "/beta-survey?from=landing"; }}>Share beta feedback</LpButton>
        </div>
      </section>}
    </main>
    <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "24px var(--gutter-phone) 32px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", font: "var(--type-source)", color: "var(--text-muted)" }}>
        {wide && <span>We map ideas, never people.</span>}
        <nav aria-label="Footer" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>{[["App map", "/local"], ["Tour", lpTourFull("16:9")], ["Dictionary", "/dictionary"], ["Help", "/help"], ["Beta feedback", "/beta-survey?from=landing-footer"], ["Staff sign in", lpStaffSignIn], ["All screens", "/screens"]].map(([l, h]) => <a key={l} href={h} className="lp-nav" style={{ minHeight: 44, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>{l}</a>)}<a href="/settings" className="lp-nav" style={{ minHeight: 44, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>What we store</a></nav>
      </div>
    </footer>
  </>;
}
window.Landing = Landing;
