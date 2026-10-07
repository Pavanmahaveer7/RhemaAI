const { Button: GdBtn, Icon: GdIcon } = window.ChurchAIDesignSystem_06db43;

const gdKey = { reader: "ca_guide_reader", landing: "ca_guide_landing", staff: "ca_guide_staff" };
function gdDismissed(variant) {
  try { return localStorage.getItem(gdKey[variant] || gdKey.reader) === "1"; } catch (e) { return false; }
}
function gdDismiss(variant) {
  try { localStorage.setItem(gdKey[variant] || gdKey.reader, "1"); } catch (e) {}
}

function GuideStep({ n, title, body, action, onAction }) {
  return (
    <li style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderTop: n > 1 ? "1px solid var(--border-subtle)" : 0 }}>
      <span aria-hidden="true" style={{ width: 28, height: 28, flex: "none", borderRadius: 999, display: "grid", placeItems: "center", background: "var(--lamp-400)", color: "var(--ink-0)", font: "800 14px/1 var(--font-body)" }}>{n}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "700 16px/1.3 var(--font-body)", color: "var(--text-strong)" }}>{title}</div>
        {body && <p style={{ margin: "6px 0 0", font: "var(--type-body)", fontSize: 15, color: "var(--text-muted)" }}>{body}</p>}
        {action && onAction && <GdBtn size="sm" variant="secondary" style={{ marginTop: 10 }} onClick={onAction}>{action}</GdBtn>}
      </div>
    </li>
  );
}

function GuideModal({ open, onClose, variant, go }) {
  if (!open) return null;
  const reader = variant !== "staff";
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="gd-title" style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center", padding: 20, background: "color-mix(in srgb, var(--ink-0) 55%, transparent)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(100%, 480px)", maxHeight: "min(90svh, 640px)", overflow: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", background: "var(--surface-card)", padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 24px 80px rgba(0,0,0,.45)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h2 id="gd-title" style={{ margin: 0, font: "800 clamp(26px,6vw,32px)/1.1 var(--font-display)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>{reader ? "Your first two minutes" : "Staff beta — how to enter"}</h2>
            <p style={{ margin: "10px 0 0", font: "var(--type-body)", fontSize: 16, color: "var(--text-muted)" }}>{reader ? "Everything lives on one site. Use the tabs below — no URLs to remember." : "Pastors, leaders, and reviewers use a separate workspace from the public dictionary."}</p>
          </div>
          <button type="button" aria-label="Close guide" onClick={onClose} style={{ width: 44, height: 44, flex: "none", border: 0, borderRadius: 999, cursor: "pointer", background: "var(--surface-raised)", color: "var(--text-muted)" }}><GdIcon name="x" size={20} /></button>
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {reader ? <>
            <GuideStep n={1} title="Dictionary" body="Search a word. See Hindu, Buddhist, and Christian meanings side by side." action={go ? "Open Dictionary" : undefined} onAction={go ? () => { go("search"); onClose(); } : undefined} />
            <GuideStep n={2} title="This month" body="One question for everyone. Answers are counted, never named." action={go ? "Open This month" : undefined} onAction={go ? () => { go("month"); onClose(); } : undefined} />
            <GuideStep n={3} title="Map" body="Ideas people shared form a quiet map you can explore." action={go ? "Open Map" : undefined} onAction={go ? () => { go("graph"); onClose(); } : undefined} />
            <GuideStep n={4} title="Pastor or reviewer?" body="If you have an invite code, use Staff sign in — not the public tour." action="Staff sign in" onAction={() => { location.href = "/staff"; }} />
          </> : <>
            <GuideStep n={1} title="Open Staff sign in" body="Use the link your organizer sent. Bookmark it once — we always bring you back here." action="Go to Staff sign in" onAction={() => { location.href = "/staff"; }} />
            <GuideStep n={2} title="Code + password" body="Enter your assigned code (e.g. P-0233) and the password they sent separately." />
            <GuideStep n={3} title="After sign-in" body="You land in Staff — check-in, tracks, review, or alerts depending on your role." action="Public dictionary instead" onAction={() => { location.href = "/app#guest=1&r=search"; }} />
          </>}
        </ol>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
          {reader && <GdBtn variant="accent" size="md" onClick={() => { location.href = "/tour?from=app-guide"; }}>Watch 1-minute tour</GdBtn>}
          <GdBtn variant="ghost" size="md" onClick={() => { location.href = reader ? "/help#reader" : "/help#staff"; }}>More detail</GdBtn>
          <GdBtn variant="ghost" size="md" onClick={() => { gdDismiss(variant); onClose(); }}>Got it</GdBtn>
        </div>
      </div>
    </div>
  );
}

function GuideBanner({ variant, go, onOpenGuide }) {
  const [hidden, setHidden] = React.useState(() => gdDismissed(variant));
  const [modal, setModal] = React.useState(false);
  if (hidden) return null;
  const reader = variant !== "staff";
  const open = () => { if (onOpenGuide) onOpenGuide(); else setModal(true); };
  return <>
    <div role="region" aria-label="Getting started" style={{ background: "color-mix(in srgb, var(--lamp-400) 12%, var(--surface-raised))", borderBottom: "1px solid var(--border-subtle)", padding: "12px var(--gutter-phone)", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center" }}>
      <span style={{ font: "600 14px/1.35 var(--font-body)", color: "var(--text-body)", textAlign: "center", flex: "1 1 220px" }}>
        {reader ? (variant === "landing" ? "New here? Watch the tour, search a word, or open the in-app guide." : "New here? Use Dictionary, This month, and Map — tap Guide anytime.") : "Staff beta: sign in with your invite code, then we open Staff for you."}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {variant === "landing" && <GdBtn size="sm" variant="accent" onClick={() => { location.href = "/tour?from=landing-banner"; }}>Tour</GdBtn>}
        {reader && go && variant === "reader" && <GdBtn size="sm" variant="secondary" onClick={() => go("month")}>This month</GdBtn>}
        <GdBtn size="sm" variant="secondary" onClick={open}>Guide</GdBtn>
        <button type="button" onClick={() => { gdDismiss(variant); setHidden(true); }} style={{ minHeight: 40, padding: "0 12px", border: 0, background: "none", cursor: "pointer", font: "600 13px/1 var(--font-body)", color: "var(--text-muted)", textDecoration: "underline", textUnderlineOffset: "0.12em" }}>Dismiss</button>
      </div>
    </div>
    {!onOpenGuide && <GuideModal open={modal} onClose={() => setModal(false)} variant={variant} go={go} />}
  </>;
}

function GuideHeaderButton({ onClick, label }) {
  return (
    <button type="button" onClick={onClick} aria-label={label || "Open guide"} style={{ height: 44, padding: "0 12px", borderRadius: 999, border: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: "var(--text-muted)", font: "600 13px/1 var(--font-body)" }}>
      <GdIcon name="info" size={18} />{label || "Guide"}
    </button>
  );
}

Object.assign(window, { GuideBanner, GuideModal, GuideHeaderButton, gdDismissGuide: gdDismiss });
