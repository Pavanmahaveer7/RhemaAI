const { TextField: SsField, Button: SsButton, StateBlock: SsState, Tag: SsTag, Icon: SsIcon } = window.ChurchAIDesignSystem_06db43;

function SearchScreen({ open, initial = "" }) {
  const lk = window.CAGuard.lockdown();
  const [q, setQ] = React.useState(() => initial || (lk ? "" : sessionStorage.getItem("ca_q")) || "");
  const [note, setNote] = React.useState(() => !lk && !localStorage.getItem("ca_tabnote_seen"));
  const [team, setTeam] = React.useState(() => !lk && localStorage.getItem("ca_team_note") === "1" && !localStorage.getItem("ca_team_note_seen"));
  const [teamIn, setTeamIn] = React.useState(false);
  React.useEffect(() => { if (!team) return; const a = requestAnimationFrame(() => setTeamIn(true)); return () => cancelAnimationFrame(a); }, []);
  const hideTeam = () => { localStorage.setItem("ca_team_note_seen", "1"); localStorage.removeItem("ca_team_note"); setTeam(false); };
  const picked = window.CACurious ? window.CACurious.words() : [];
  const hideNote = () => { localStorage.setItem("ca_tabnote_seen", "1"); setNote(false); };
  const [phone, setPhone] = React.useState(() => innerWidth < 700);
  React.useEffect(() => { const f = () => setPhone(innerWidth < 700); addEventListener("resize", f); return () => removeEventListener("resize", f); }, []);
  const [res, setRes] = React.useState(null);
  const [phase, setPhase] = React.useState("idle");
  const [rid, setRid] = React.useState("");
  const [qErr, setQErr] = React.useState(null);
  const run = (term = q) => {
    const t = term.trim().toLowerCase();
    if (!t) { setQErr("Type a word to look up, like karma."); return; }
    setQErr(null);
    if (!lk) sessionStorage.setItem("ca_q", t);
    if (!window.CA_DEMO) setPhase("loading");
    setTimeout(() => {
      if (t === "error") { setPhase("error"); return; }
      if (t === "blocked" || window.CAGuard.injection(t)) { setRid(window.CAGuard.reqId()); setPhase("blocked"); return; }
      if (t === "offline") { setPhase("unavailable"); return; }
      if (t.length > 60 || /[<>{}]/.test(t)) { setPhase("invalid"); return; }
      const local = window.CA_DATA.lexicon.filter(x => x.term.includes(t)).map(x => ({ term: x.term, pos: x.pos, def: x.def, used: x.used }));
      const show = (rows) => { setRes(rows); setPhase(rows.length ? "results" : "empty"); };
      if (window.CAApi && !window.CA_DEMO) {
        window.CAApi.get("/terms?q=" + encodeURIComponent(t) + "&lang=" + (window.CA_LANG || "en")).then(rows => {
          show((rows || []).map(x => ({ term: x.term, pos: x.pos, def: x.def, used: x.used || [] })));
        }).catch(err => {
          if (err && err.kind === "blocked") { setRid(err.requestId || window.CAGuard.reqId()); setPhase("blocked"); return; }
          if (err && err.retryable) { setPhase("error"); return; }
          show(local);
        });
        return;
      }
      show(local);
    }, window.CA_DEMO ? 0 : 380);
  };
  const listAll = () => {
    setQ("");
    setQErr(null);
    if (!window.CA_DEMO) setPhase("loading");
    const local = window.CA_DATA.lexicon.map(x => ({ term: x.term, pos: x.pos, def: x.def, used: x.used }));
    const show = (rows) => { setRes(rows); setPhase(rows.length ? "results" : "empty"); };
    if (window.CAApi && !window.CA_DEMO) {
      window.CAApi.get("/terms?q=&lang=" + (window.CA_LANG || "en")).then(rows => {
        show((rows || []).map(x => ({ term: x.term, pos: x.pos, def: x.def, used: x.used || [] })));
      }).catch(() => show(local));
      return;
    }
    show(local);
  };
  React.useEffect(() => {
    try {
      if (new URLSearchParams(location.search).get("list") === "1") listAll();
    } catch (e) {}
  }, []);
  const spokenWord = (raw) => {
    const t = String(raw || "").toLowerCase().replace(/[.?!,]/g, " ").trim();
    const parts = t.split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    const skip = { search: 1, look: 1, up: 1, for: 1, find: 1, the: 1, a: 1, an: 1, word: 1 };
    const last = parts[parts.length - 1];
    if (!skip[last]) return last;
    return parts.filter(w => !skip[w]).pop() || last;
  };
  const all = ["karma", "dharma", "grace", "faith", "peace", "hope", "yoga", "bhakti", "dukkha", "metta", "gospel", "mercy", "baptism", "prayer", "love", "salvation", "mindfulness", "compassion"];
  const demo = [...picked, ...all.filter(w => !picked.includes(w))];
  return (
    <div style={{ maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "40px var(--gutter-phone) 24px" }}>
      <h1 style={{ font: "800 clamp(52px,15vw,76px)/.92 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: "0 0 14px", textWrap: "balance" }}>Comparative dictionary.</h1>
      <p style={{ font: "var(--type-body)", fontSize: 18, color: "var(--text-muted)", margin: "0 0 28px", textWrap: "pretty" }}>Type a word to see what it means in Hindu, Buddhist and Christian traditions, side by side.</p>
      {note && !team && <div role="note" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 12, marginBottom: 14, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", font: "var(--type-source)", color: "var(--text-body)" }}><span style={{ flex: 1, paddingTop: 3 }}>This tab remembers your search until you close it. On a shared computer, use a private window.</span><button onClick={hideNote} aria-label="Dismiss" style={{ width: 32, height: 32, flex: "none", display: "grid", placeItems: "center", background: "none", border: 0, borderRadius: 99, color: "var(--text-muted)", cursor: "pointer" }}><SsIcon name="x" size={16} /></button></div>}
      <form onSubmit={e => { e.preventDefault(); run(); }} style={phone ? { position: "fixed", left: 0, right: 0, bottom: lk ? 0 : 72, zIndex: 40, display: "flex", gap: 8, alignItems: "flex-end", padding: "10px var(--gutter-phone) calc(10px + env(safe-area-inset-bottom))", background: "var(--surface-page)", borderTop: "1px solid var(--border-subtle)" } : { display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 8, alignItems: "flex-end" }}><div style={{ flex: 1, minWidth: 0 }}><SsField label="Look up a word" size="lg" icon="search" type="search" enterKeyHint="search" autoComplete="off" placeholder="karma" value={q} error={qErr || undefined} onChange={e => { setQ(e.target.value); qErr && setQErr(null); }} /></div><window.CAMic size={60} onText={t => { const w = spokenWord(t); if (!w) return; setQ(w); qErr && setQErr(null); run(w); }} /></div>

        <SsButton type="submit" variant="accent" size="lg" fullWidth={!phone} loading={phase === "loading"}>Search</SsButton>
      </form>
      {team && <figure style={{ margin: "24px 0 0", padding: "18px 20px", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "flex", gap: 12, alignItems: "flex-start", opacity: teamIn ? 1 : 0, transform: teamIn ? "none" : "translateY(6px)", transition: "opacity 900ms var(--ease-out), transform 900ms var(--ease-out)" }}>
        <blockquote style={{ margin: 0, flex: 1, font: "400 24px/1.55 var(--font-hand, 'Kalam', cursive)", color: "var(--text-strong)" }}>{window.CATeamNote.lines.map(l => <span key={l} style={{ display: "block" }}>{l}</span>)}<figcaption style={{ marginTop: 8, font: "400 18px/1 var(--font-hand, 'Kalam', cursive)", color: "var(--text-muted)" }}>{window.CATeamNote.sign}</figcaption></blockquote>
        <button onClick={hideTeam} aria-label="Close note" style={{ width: 44, height: 44, margin: "-8px -10px 0 0", flex: "none", display: "grid", placeItems: "center", background: "none", border: 0, borderRadius: 99, color: "var(--text-muted)", cursor: "pointer" }}><SsIcon name="x" size={16} /></button>
      </figure>}
      {phase === "idle" && <div style={{ marginTop: phone ? 4 : 28 }}>
        <div style={{ font: "var(--type-source)", color: "var(--text-faint)", marginBottom: 10 }}>{picked.length ? `Picked first because you chose ${window.CACurious.get().map(k => window.CACurious.LABEL[k]).join(" and ")}` : "Starter words — this is a curated list, not every word"}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{demo.map(d => <button key={d} onClick={() => { window.CAHaptic && window.CAHaptic("light"); setQ(d); run(d); }} style={{ height: 40, padding: "0 16px", borderRadius: 999, border: "1px solid var(--border-default)", background: "transparent", color: "var(--text-body)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}>{d}</button>)}
          <button type="button" onClick={listAll} style={{ height: 40, padding: "0 16px", borderRadius: 999, border: "1px solid var(--border-default)", background: "var(--surface-raised)", color: "var(--text-strong)", font: "600 16px/1 var(--font-body)", cursor: "pointer" }}>See all words</button>
        </div>
        <p style={{ margin: "14px 0 0", font: "var(--type-source)", color: "var(--text-muted)" }}>If a word is not found, it is not in the dictionary yet. We do not invent an entry.</p>
      </div>}
      <div aria-live="polite" style={{ marginTop: phone ? 0 : 28, paddingBottom: phone ? 120 : 0 }}>
        {phase === "loading" && <SsState kind="loading" compact />}
        {phase === "empty" && <>
          <window.WordEmpty word={q.trim()} line="Not in the dictionary yet. This list is curated — we do not invent a missing word." />
          <div style={{ display: "flex", justifyContent: "center", marginTop: -8, paddingBottom: 16 }}><SsButton variant="secondary" size="sm" onClick={listAll}>See all words</SsButton></div>
        </>}
        {phase === "error" && <SsState kind="error" message="The dictionary service did not answer. Try again in a moment." onRetry={() => run("karma")} compact />}
        {phase === "blocked" && <SsState kind="unavailable" title="Blocked" message={`This request was blocked. It reads like an instruction to the system, not a word, so nothing was looked up. Request id: ${rid}`} compact />}
        {phase === "unavailable" && <SsState kind="unavailable" message="Search is unavailable right now. Nothing you did caused it." compact />}
        {phase === "invalid" && <SsState kind="error" title="Invalid input" message="Use a single word or short phrase, without symbols." compact />}
        {phase === "results" && <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border-subtle)" }}>
          {res.map(r => <li key={r.term}><button onClick={() => open(r.term)} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 14, padding: "18px 0", background: "none", border: 0, borderBottom: "1px solid var(--border-subtle)", cursor: "pointer", color: "inherit" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div data-hw="" style={{ font: "800 24px/1.1 var(--font-display)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)", overflowWrap: "anywhere", width: "fit-content" }}>{r.term}</div>
              <div style={{ font: "var(--type-body)", color: "var(--text-muted)", marginTop: 4, fontStyle: r.def ? "normal" : "italic" }}>{r.def || "Not in the dictionary yet."}</div>
            </div>
            <SsIcon name="arrow-right" size={20} color="var(--text-faint)" />
          </button></li>)}
        </ul>}
      </div>
    </div>
  );
}
window.SearchScreen = SearchScreen;
