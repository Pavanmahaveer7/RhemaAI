const { Button: PzButton, Icon: PzIcon } = window.ChurchAIDesignSystem_06db43;

// Gentle pause: after a long stretch of active use, one calm card. Never blocks, never counts streaks.
const PZ_KEY = "ca_pause_min";
const pzMinutes = () => { const v = localStorage.getItem(PZ_KEY); return v === "off" ? 0 : +(v || 25); };

function GentlePause({ route }) {
  const [show, setShow] = React.useState(false);
  const [mins, setMins] = React.useState(0);
  const active = React.useRef(0), last = React.useRef(Date.now()), snoozed = React.useRef(false), shown = React.useRef(false);
  React.useEffect(() => {
    const demo = new URLSearchParams(location.hash.slice(1)).get("pause") === "1";
    const bump = () => { last.current = Date.now(); };
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach(e => addEventListener(e, bump, { passive: true }));
    const id = setInterval(() => {
      const limit = pzMinutes(); if (!limit || snoozed.current || shown.current || document.hidden) return;
      if (Date.now() - last.current < 60000) active.current += demo ? 60 : 5;
      if (active.current >= limit * 60 && !sessionStorage.getItem("ca_paused")) { shown.current = true; clearInterval(id); setMins(Math.round(active.current / 60)); setShow(true); }
    }, demo ? 400 : 5000);
    return () => { clearInterval(id); ["pointerdown", "keydown", "scroll", "touchstart"].forEach(e => removeEventListener(e, bump)); };
  }, []);
  if (!show || ["intro", "welcome", "signin"].includes(route)) return null;
  const done = keep => { sessionStorage.setItem("ca_paused", "1"); snoozed.current = true; setShow(false); if (!keep) window.CAGuard.plain(); };
  const reduce = document.documentElement.hasAttribute("data-reduce-motion");
  return <div role="dialog" aria-modal="false" aria-labelledby="pz-t" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 150, display: "flex", justifyContent: "center", padding: "0 var(--gutter-phone) calc(16px + env(safe-area-inset-bottom))", pointerEvents: "none" }}>
    <div style={{ pointerEvents: "auto", width: "100%", maxWidth: 440, padding: 20, borderRadius: "var(--radius-xl)", background: "var(--surface-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", gap: 14, animation: reduce ? "none" : "ca-rise 700ms var(--ease-out) both" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span aria-hidden="true" style={{ width: 44, height: 44, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", color: "var(--lamp-400)", animation: reduce ? "none" : "ca-breathe 4.8s var(--ease-in-out) 1" }}><PzIcon name="sunrise" size={20} /></span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><h2 id="pz-t" style={{ margin: 0, font: "800 24px/1.15 var(--font-display)", color: "var(--text-strong)" }}>You’ve been here {mins} minutes.</h2><span style={{ font: "var(--type-pastoral)", fontSize: 18, color: "var(--text-muted)" }}>Maybe talk it over with someone.</span></div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><PzButton variant="secondary" onClick={() => done(true)}>Keep reading</PzButton><PzButton variant="ghost" onClick={() => done(false)}>Close for now</PzButton></div>
      <span style={{ font: "var(--type-source)", color: "var(--text-muted)" }}>Once per visit. Change it in Settings.</span>
    </div>
  </div>;
}
window.GentlePause = GentlePause;
window.CAPauseMinutes = { get: () => localStorage.getItem(PZ_KEY) || "25", set: v => localStorage.setItem(PZ_KEY, v) };
