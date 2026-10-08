/* @ds-bundle: {"format":4,"namespace":"ChurchAIDesignSystem_06db43","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"PackPieces","sourcePath":"components/domain/PackPieces.jsx"},{"name":"SeasonRing","sourcePath":"components/domain/SeasonRing.jsx"},{"name":"SourceList","sourcePath":"components/domain/SourceList.jsx"},{"name":"STAGES","sourcePath":"components/domain/StageTrack.jsx"},{"name":"StageTrack","sourcePath":"components/domain/StageTrack.jsx"},{"name":"Wordmark","sourcePath":"components/domain/Wordmark.jsx"},{"name":"CheckBadge","sourcePath":"components/feedback/CheckBadge.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"StateBlock","sourcePath":"components/feedback/StateBlock.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"PIPELINE_STAGE_NAMES","sourcePath":"contract/types.ts"},{"name":"LIMITS","sourcePath":"contract/types.ts"}],"sourceHashes":{"components/core/Badge.jsx":"94b7fe15aa2d","components/core/Button.jsx":"2d0a2cfeb494","components/core/Card.jsx":"97a31a400839","components/core/Icon.jsx":"f8197a2f0dac","components/core/IconButton.jsx":"0daed15e8d50","components/core/Tag.jsx":"7af32aa2adba","components/domain/PackPieces.jsx":"d7e7e70c6672","components/domain/SeasonRing.jsx":"48e31b6f34e5","components/domain/SourceList.jsx":"8754ca4b1837","components/domain/StageTrack.jsx":"b6f82c9da751","components/domain/Wordmark.jsx":"127c658ec563","components/feedback/CheckBadge.jsx":"92f28c630381","components/feedback/Dialog.jsx":"58ef95f0ca02","components/feedback/StateBlock.jsx":"c869da7549bc","components/feedback/Toast.jsx":"cd4cd07805fc","components/feedback/Tooltip.jsx":"b43d6087ddd2","components/forms/Checkbox.jsx":"e1898c04d7b6","components/forms/Radio.jsx":"ed63da4e6fec","components/forms/SegmentedControl.jsx":"804862ca897a","components/forms/Select.jsx":"ff10f753645e","components/forms/Switch.jsx":"6e3633ddce20","components/forms/TextArea.jsx":"a4f9d20d1e5a","components/forms/TextField.jsx":"c8ff76e9d40b","contract/types.ts":"d8975e38a66d","ui_kits/confirm.js":"229f75dff8ee","ui_kits/guard.js":"571f259878cf","ui_kits/i18n.js":"047c62ad649e","ui_kits/input.js":"df9ae5d82911","ui_kits/landing/Landing.jsx":"33d758065d8c","ui_kits/messy.js":"a99951ee4c65","ui_kits/pipeline/ChurchScreens.jsx":"45746682bbc1","ui_kits/pipeline/EmbedPreview.jsx":"5a8736c6bc3b","ui_kits/pipeline/IntegrationsScreen.jsx":"e3d336398b75","ui_kits/pipeline/PastorScreens.jsx":"3283bea55f96","ui_kits/pipeline/PipelineFlow.jsx":"8f03cc8e6242","ui_kits/pipeline/ReviewerScreens.jsx":"6b0e67974cef","ui_kits/pipeline/data.js":"55b415a2fe1c","ui_kits/public/AccountsScreen.jsx":"ec34563d1750","ui_kits/public/AdminScreen.jsx":"1d7a24335530","ui_kits/public/AuthScreen.jsx":"fd5d55564d9b","ui_kits/public/GentlePause.jsx":"a4e95456e033","ui_kits/public/GraphScreen.jsx":"db878d7aefaf","ui_kits/public/MapDraft.jsx":"48ecc85c9973","ui_kits/public/MapScreen.jsx":"4a4f904c9ac5","ui_kits/public/MonthlyScreen.jsx":"4b65e71a98d5","ui_kits/public/Onboarding.jsx":"ca4561b83943","ui_kits/public/SearchScreen.jsx":"a50ac8214131","ui_kits/public/SettingsScreen.jsx":"66d2a59848fb","ui_kits/public/Shell.jsx":"202dfae0636d","ui_kits/public/TermScreen.jsx":"2b6c54022a97","ui_kits/public/curious.js":"ef0b5210867c","ui_kits/public/data.js":"d3d7af715c5f","ui_kits/public/faithData.js":"c2dda9f57d74","ui_kits/public/verses.js":"bab12ffe533d","ui_kits/rhythm.js":"094f885c42d8","ui_kits/screens.js":"b49ead2b33a6","ui_kits/theme.js":"9ac15fb3ba2a","ui_kits/tour/Tour.jsx":"13b4ae2f9cc5","ui_kits/tour/animations-v3.jsx":"06ae64d470d6","ui_kits/tour/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ChurchAIDesignSystem_06db43 = window.ChurchAIDesignSystem_06db43 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const TONES = {
  ok: ["var(--ok-tint)", "var(--ok-400)"],
  warn: ["var(--warn-tint)", "var(--warn-400)"],
  danger: ["var(--danger-tint)", "var(--danger-400)"],
  info: ["var(--info-tint)", "var(--info-400)"],
  neutral: ["var(--surface-raised)", "var(--text-muted)"]
};
function Badge({
  tone = "neutral",
  dot = true,
  children,
  style
}) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 8px",
      borderRadius: "var(--radius-sm)",
      background: bg,
      color: fg,
      font: "600 13px/1 var(--font-body)",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 9,
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  title,
  eyebrow,
  action,
  padding = 20,
  tone = "default",
  children,
  style
}) {
  const bg = tone === "raised" ? "var(--surface-raised)" : tone === "lamp" ? "var(--lamp-tint)" : "var(--surface-card)";
  const bd = tone === "lamp" ? "var(--lamp-600)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      border: `1px solid ${bd}`,
      borderRadius: "var(--radius-lg)",
      padding,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minWidth: 0,
      ...style
    }
  }, (title || eyebrow || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minWidth: 0
    }
  }, eyebrow && !title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: tone === "lamp" ? "var(--lamp-400)" : "var(--text-muted)"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-section)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, title)), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Heroicons v2 (MIT). Outline 1.5 stroke by default; weight="fill" uses the solid set for the selected tab / nav item only.
// Call sites keep short semantic names; MAP turns them into Heroicons file names.
const CDN = "https://unpkg.com/heroicons@2.1.5/24/";
const MAP = {
  "arrow-left": "arrow-left",
  "arrow-right": "arrow-right",
  "arrow-up-right": "arrow-up-right",
  "arrow-down-right": "arrow-down-right",
  "book-open": "book-open",
  "building": "building-office-2",
  "building-2": "building-library",
  "check": "check",
  "chevron-down": "chevron-down",
  "chevron-right": "chevron-right",
  "circle-check": "check-circle",
  "circle-dashed": "ellipsis-horizontal-circle",
  "circle-dot": "clock",
  "circle-plus": "plus-circle",
  "circle-alert": "exclamation-circle",
  "info": "information-circle",
  "external-link": "arrow-top-right-on-square",
  "eye": "eye",
  "eye-off": "eye-slash",
  "file-plus": "document-plus",
  "file-text": "document-text",
  "flag": "flag",
  "hand": "hand-raised",
  "hard-drive": "device-phone-mobile",
  "heart-handshake": "heart",
  "key-round": "key",
  "link-2": "link",
  "list": "list-bullet",
  "list-checks": "clipboard-document-check",
  "locate-fixed": "viewfinder-circle",
  "lock": "lock-closed",
  "log-out": "arrow-right-start-on-rectangle",
  "mail": "envelope",
  "map-pin": "map-pin",
  "merge": "arrows-pointing-in",
  "message-square-plus": "chat-bubble-bottom-center-text",
  "message-square-text": "chat-bubble-bottom-center-text",
  "messages-square": "chat-bubble-left-right",
  "minus": "minus",
  "paperclip": "paper-clip",
  "pencil": "pencil",
  "play": "play",
  "plug": "puzzle-piece",
  "plus": "plus",
  "power": "power",
  "receipt": "receipt-percent",
  "rotate-cw": "arrow-path",
  "search": "magnifying-glass",
  "send": "paper-airplane",
  "settings": "cog-6-tooth",
  "shield": "shield-check",
  "siren": "bell-alert",
  "trash-2": "trash",
  "undo-2": "arrow-uturn-left",
  "upload": "arrow-up-tray",
  "user": "user",
  "user-check": "check-badge",
  "user-plus": "user-plus",
  "user-round-search": "identification",
  "user-x": "user-minus",
  "users": "users",
  "venetian-mask": "eye-slash",
  "waypoints": "share",
  "x": "x-mark",
  "house": "home",
  "columns-3": "view-columns",
  "wifi-off": "signal-slash",
  "shield-alert": "shield-exclamation",
  "loader": "arrow-path",
  "inbox": "inbox",
  "cloud-off": "signal-slash",
  "book-dashed": "book-open",
  "circle": "ellipsis-horizontal-circle",
  "hand-heart": "heart",
  "church": "building-library",
  "calendar-plus": "calendar-days",
  "bell": "bell",
  "ban": "prohibit",
  "circle-help": "question",
  "sun": "sun",
  "moon": "moon",
  "monitor": "computer-desktop",
  "type": "language",
  "clock": "clock",
  "calendar": "calendar",
  "package": "archive-box",
  "chevron-up": "chevron-up",
  "sunrise": "sun",
  "sunset": "moon",
  "sparkles": "sparkles",
  "gift": "gift",
  "bookmark": "bookmark",
  "share": "share",
  "copy": "document-duplicate",
  "globe": "globe-alt",
  "phone": "device-phone-mobile",
  "sliders": "adjustments-horizontal",
  "home": "home",
  "star": "star",
  "trophy": "trophy"
};
function Icon({
  name,
  size = 20,
  color = "currentColor",
  label,
  style,
  weight = "regular"
}) {
  const f = MAP[name] || "ellipsis-horizontal-circle";
  const url = `url(${CDN}${weight === "fill" ? "solid" : "outline"}/${f}.svg)`;
  return /*#__PURE__*/React.createElement("span", {
    role: label ? "img" : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: "inline-block",
      flex: "none",
      width: size,
      height: size,
      background: color,
      WebkitMask: `${url} center / contain no-repeat`,
      mask: `${url} center / contain no-repeat`,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const SIZES = {
  sm: {
    h: 36,
    px: 14,
    fs: 13,
    ic: 16
  },
  md: {
    h: 44,
    px: 18,
    fs: 16,
    ic: 18
  },
  lg: {
    h: 56,
    px: 22,
    fs: 18,
    ic: 20
  }
};
const VARIANTS = {
  primary: {
    bg: "var(--action-primary-bg)",
    fg: "var(--action-primary-fg)",
    hov: "var(--action-primary-hover)",
    prs: "var(--action-primary-press)",
    bd: "transparent"
  },
  accent: {
    bg: "var(--action-accent-bg)",
    fg: "var(--action-accent-fg)",
    hov: "var(--action-accent-hover)",
    prs: "var(--action-accent-press)",
    bd: "transparent"
  },
  secondary: {
    bg: "transparent",
    fg: "var(--text-body)",
    hov: "var(--surface-hover)",
    bd: "var(--border-strong)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--text-body)",
    hov: "var(--surface-hover)",
    bd: "transparent"
  },
  danger: {
    bg: "transparent",
    fg: "var(--danger-400)",
    hov: "var(--danger-tint)",
    bd: "var(--danger-400)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  fullWidth,
  disabled,
  loading,
  type = "button",
  onClick,
  children,
  style
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const [f, setF] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const off = disabled || loading;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: off,
    onClick: onClick,
    "aria-busy": loading || undefined,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onFocus: e => setF(e.target.matches(":focus-visible")),
    onBlur: () => setF(false),
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    onTouchStart: () => setP(true),
    onTouchEnd: () => setP(false),
    onTouchCancel: () => setP(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: s.h,
      padding: `0 ${s.px}px`,
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${v.bd}`,
      background: off ? variant === "primary" || variant === "accent" ? "var(--action-disabled-bg)" : v.bg : p && v.prs ? v.prs : h ? v.hov : v.bg,
      boxShadow: f ? "var(--focus-ring)" : "none",
      filter: "none",
      color: off && (variant === "primary" || variant === "accent") ? "var(--action-disabled-fg)" : v.fg,
      font: `700 ${s.fs}px/1 var(--font-body)`,
      letterSpacing: "0.01em",
      cursor: off ? "not-allowed" : "pointer",
      opacity: disabled && !(variant === "primary" || variant === "accent") ? 0.45 : 1,
      transform: p && !off ? "scale(var(--press-scale))" : "none",
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
      whiteSpace: "nowrap",
      ...style
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      border: "2px solid currentColor",
      borderRightColor: "transparent",
      animation: "ca-spin .8s linear infinite"
    }
  }) : icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic
  }), children, iconRight && !loading && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const {
  useState
} = React;
function IconButton({
  icon,
  label,
  size = 44,
  variant = "ghost",
  onClick,
  disabled,
  style
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const [f, setF] = useState(false);
  const bg = variant === "filled" ? h ? "var(--surface-hover)" : "var(--surface-raised)" : h ? "var(--surface-hover)" : "transparent";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    onTouchStart: () => setP(true),
    onTouchEnd: () => setP(false),
    onFocus: e => setF(e.target.matches(":focus-visible")),
    onBlur: () => setF(false),
    style: {
      width: size,
      height: size,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      border: variant === "outline" ? "1px solid var(--border-strong)" : "1px solid transparent",
      background: bg,
      color: "var(--text-body)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform: p && !disabled ? "scale(var(--press-scale))" : "none",
      boxShadow: f ? "var(--focus-ring)" : "none",
      filter: "none",
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
      padding: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size >= 44 ? 20 : 18
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const TONES = {
  hindu: ["var(--trad-hindu-tint)", "var(--trad-hindu)"],
  buddhist: ["var(--trad-buddhist-tint)", "var(--trad-buddhist)"],
  christian: ["var(--trad-christian-tint)", "var(--trad-christian)"],
  neutral: ["var(--surface-raised)", "var(--text-body)"],
  lamp: ["var(--lamp-tint)", "var(--lamp-400)"]
};
function Tag({
  tone = "neutral",
  children,
  style
}) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 26,
      padding: "0 10px",
      borderRadius: "var(--radius-pill)",
      background: bg,
      color: fg,
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      whiteSpace: "nowrap",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/domain/PackPieces.jsx
try { (() => {
function PackPieces({
  pieces = [],
  compact
}) {
  const s = compact ? 40 : 48;
  return /*#__PURE__*/React.createElement("ul", {
    "aria-label": "Monthly pack pieces",
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: `repeat(${pieces.length || 1}, minmax(0,1fr))`,
      gap: 8
    }
  }, pieces.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p.label,
    "aria-label": `${p.label}: ${p.in ? "in" : "not in yet"}`,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: s,
      height: s,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      background: p.in ? "var(--surface-raised)" : "transparent",
      border: `1.5px ${p.in ? "solid" : "dashed"} ${p.in ? "var(--border-default)" : "var(--border-strong)"}`,
      color: p.in ? "var(--text-strong)" : "var(--text-faint)",
      animation: `ca-pop var(--dur-slow) var(--ease-out) ${i * 70}ms both`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: p.icon,
    size: compact ? 18 : 20
  }), p.in && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -5,
      top: -5,
      width: 18,
      height: 18,
      borderRadius: 99,
      background: "var(--lamp-400)",
      color: "var(--ink-0)",
      display: "grid",
      placeItems: "center",
      border: "2px solid var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.2 var(--font-body)",
      color: p.in ? "var(--text-body)" : "var(--text-faint)",
      textAlign: "center",
      overflowWrap: "anywhere"
    }
  }, p.label))));
}
Object.assign(__ds_scope, { PackPieces });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/domain/PackPieces.jsx", error: String((e && e.message) || e) }); }

// components/domain/SeasonRing.jsx
try { (() => {
const {
  useState,
  useEffect
} = React;
const DEFAULT = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"];
function pt(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arc(cx, cy, r, a0, a1) {
  const [x0, y0] = pt(cx, cy, r, a0),
    [x1, y1] = pt(cx, cy, r, a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}
function SeasonRing({
  current = 0,
  stages = DEFAULT,
  since,
  size = 232,
  caption,
  grow,
  glow
}) {
  const [peek, setPeek] = useState(null);
  const rm = typeof document !== "undefined" && (document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [filled, setFilled] = useState(!grow || rm);
  useEffect(() => {
    if (filled) return;
    const id = setTimeout(() => setFilled(true), 250);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (peek == null) return;
    const id = setTimeout(() => setPeek(null), 2200);
    return () => clearTimeout(id);
  }, [peek]);
  const n = stages.length,
    c = size / 2,
    r = size / 2 - 18,
    gap = 7,
    seg = 360 / n;
  const focus = peek ?? current;
  const rel = focus < current ? "Done" : focus === current ? `Stage ${current + 1} of ${n}` : focus === current + 1 ? "Up next" : "Later";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    role: "list",
    "aria-label": "Your path"
  }, stages.map((s, i) => {
    const a0 = i * seg + gap / 2,
      a1 = (i + 1) * seg - gap / 2,
      d = arc(c, c, r, a0, a1),
      len = (a1 - a0) * Math.PI / 180 * r;
    const done = i < current,
      now = i === current;
    return /*#__PURE__*/React.createElement("g", {
      key: s,
      role: "listitem",
      "aria-label": `${s}${now ? ", current" : done ? ", done" : ""}`,
      tabIndex: 0,
      onClick: () => setPeek(i),
      onKeyDown: e => (e.key === "Enter" || e.key === " ") && setPeek(i),
      style: {
        cursor: "pointer",
        outline: "none"
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: "transparent",
      strokeWidth: 30
    }), now && /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: "var(--lamp-400)",
      strokeOpacity: 0.18,
      strokeWidth: 26,
      strokeLinecap: "round",
      style: glow && !rm ? {
        animation: "ps-halo 2400ms ease-in-out 600ms 2"
      } : undefined
    }), /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      strokeLinecap: "round",
      stroke: now ? "var(--lamp-400)" : done ? "var(--bone-7)" : "var(--ink-4)",
      strokeWidth: now ? 12 : done ? 8 : 6,
      strokeDasharray: !done && !now ? "2 9" : `${len} ${len}`,
      strokeDashoffset: now && !filled ? len : 0,
      style: {
        transition: `stroke var(--dur-base), stroke-width var(--dur-base)${now ? ", stroke-dashoffset 1200ms cubic-bezier(.22,.61,.36,1)" : ""}`
      }
    }), peek === i && /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: "var(--bone-9)",
      strokeOpacity: 0.5,
      strokeWidth: 2,
      strokeLinecap: "round",
      transform: `translate(0 0)`
    }));
  })), /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      position: "absolute",
      inset: 34,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 6,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: focus === current ? "var(--lamp-400)" : "var(--text-faint)"
    }
  }, rel), /*#__PURE__*/React.createElement("span", {
    key: focus,
    style: {
      font: "600 24px/1.15 var(--font-display)",
      color: "var(--text-strong)",
      textWrap: "balance",
      animation: "ca-rise var(--dur-base) var(--ease-out)"
    }
  }, stages[focus]), focus === current && since && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, since))), caption !== false && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, caption || "Tap a part of the ring to see that season"));
}
Object.assign(__ds_scope, { SeasonRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/domain/SeasonRing.jsx", error: String((e && e.message) || e) }); }

// components/domain/SourceList.jsx
try { (() => {
const TR = {
  Hindu: "var(--trad-hindu)",
  Buddhist: "var(--trad-buddhist)",
  Christian: "var(--trad-christian)"
};
function SourceList({
  sources = [],
  title = "Sources",
  emptyText = "The lexicon does not cover a source for this section."
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      paddingTop: 14,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-muted)"
    }
  }, title), sources.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: "italic 400 14px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, emptyText) : /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, sources.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "20px minmax(0,1fr)",
      gap: 8,
      font: "var(--type-source)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)"
    }
  }, s.work), s.reference && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, " \xB7 ", s.reference), s.tradition && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TR[s.tradition] || "var(--text-muted)"
    }
  }, " \u2014 ", s.tradition), s.quote && /*#__PURE__*/React.createElement("q", {
    style: {
      display: "block",
      margin: "6px 0 2px",
      font: "var(--type-body)",
      fontSize: 15,
      color: "var(--text-body)",
      quotes: "none"
    }
  }, s.quote), s.quote && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12,
      color: "var(--text-faint)"
    }
  }, [s.translation, s.license].filter(Boolean).join(" \xB7 "), s.url && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: s.url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: "var(--text-muted)"
    }
  }, "Read in context"))))))));
}
Object.assign(__ds_scope, { SourceList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/domain/SourceList.jsx", error: String((e && e.message) || e) }); }

// components/domain/StageTrack.jsx
try { (() => {
const STAGES = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"];
function StageTrack({
  current = 0,
  stages = STAGES,
  orientation = "horizontal",
  compact
}) {
  const vert = orientation === "vertical";
  return /*#__PURE__*/React.createElement("ol", {
    "aria-label": "Pastor pathway",
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: vert ? "column" : "row",
      flexWrap: vert ? "nowrap" : "wrap",
      gap: vert ? 12 : 10
    }
  }, stages.map((s, i) => {
    const done = i < current,
      on = i === current;
    return /*#__PURE__*/React.createElement("li", {
      key: s,
      "aria-current": on ? "step" : undefined,
      style: {
        flex: vert ? "none" : "1 1 0",
        minWidth: vert ? 0 : 88,
        display: "flex",
        flexDirection: vert ? "row" : "column",
        gap: vert ? 12 : 8,
        alignItems: vert ? "center" : "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 32,
        height: 32,
        flex: "none",
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        font: "700 13px/1 var(--font-body)",
        background: on ? "var(--lamp-400)" : done ? "var(--surface-raised)" : "transparent",
        border: on ? "none" : done ? "1px solid var(--border-default)" : "1px dashed var(--border-strong)",
        color: on ? "var(--ink-0)" : done ? "var(--text-body)" : "var(--text-muted)"
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 16
    }) : on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "map-pin",
      size: 16
    }) : i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        font: `${on ? 700 : 400} ${compact ? 13 : 14}px/1.25 var(--font-body)`,
        color: on ? "var(--text-strong)" : done ? "var(--text-body)" : "var(--text-muted)"
      }
    }, s));
  }));
}
Object.assign(__ds_scope, { STAGES, StageTrack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/domain/StageTrack.jsx", error: String((e && e.message) || e) }); }

// components/domain/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 22,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "Rhema.ai",
    "data-wordmark": "",
    "data-no-tr": "",
    translate: "no",
    style: {
      font: `800 ${size}px/1 var(--font-display)`,
      letterSpacing: "-0.035em",
      color: "var(--text-strong)",
      whiteSpace: "nowrap",
      ...style
    }
  }, "Rhema", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--lamp-400)"
    }
  }, "."), "ai");
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/domain/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CheckBadge.jsx
try { (() => {
const S = {
  pass: ["check", "var(--ok-400)", "var(--ok-tint)"],
  fail: ["x", "var(--danger-400)", "var(--danger-tint)"],
  pending: ["clock", "var(--text-muted)", "var(--surface-raised)"],
  empty: ["circle-dashed", "var(--text-faint)", "transparent"]
};
function CheckBadge({
  label,
  status = "empty",
  reason
}) {
  const [ic, fg, bg] = S[status] || S.empty;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      padding: 12,
      borderRadius: "var(--radius-md)",
      background: bg,
      border: `1px ${status === "empty" ? "dashed" : "solid"} ${status === "empty" ? "var(--border-strong)" : "transparent"}`,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: fg,
      display: "flex",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: status === "empty" ? "var(--text-muted)" : fg
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13px/1.35 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, reason || (status === "empty" ? "Check not run yet" : ""))));
}
Object.assign(__ds_scope, { CheckBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CheckBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  width = 480,
  inline
}) {
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": !inline,
    "aria-label": typeof title === "string" ? title : undefined,
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-overlay)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxHeight: inline ? "none" : "calc(100dvh - 32px)",
      overflowY: "auto",
      boxSizing: "border-box",
      animation: "ca-rise var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 24px/1.2 var(--font-display)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: 36,
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end",
      flexWrap: "wrap"
    }
  }, actions));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => e.target === e.currentTarget && onClose && onClose(),
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--scrim)",
      display: "flex",
      alignItems: "safe center",
      justifyContent: "center",
      padding: 16,
      overflowY: "auto",
      zIndex: 100
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StateBlock.jsx
try { (() => {
const KIND = {
  loading: ["loader", "var(--text-body)", "var(--surface-raised)"],
  empty: ["inbox", "var(--text-body)", "var(--surface-raised)"],
  error: ["circle-alert", "var(--danger-400)", "var(--danger-tint)"],
  unavailable: ["cloud-off", "var(--warn-400)", "var(--warn-tint)"],
  uncovered: ["book-dashed", "var(--text-muted)", "var(--surface-raised)"]
};
// Empty-state motifs: abstract, built from the product's own shapes (map bubbles, people circles, tradition dots, a check). Slow, quiet, off with reduced motion.
function Motif({
  kind,
  h
}) {
  const box = {
    display: "block",
    width: h * 4,
    maxWidth: "100%",
    height: h,
    overflow: "hidden"
  };
  const g = (d, dx, dy, dur) => ({
    animation: `ca-fade-in 700ms var(--ease-out) ${d}ms both, ca-drift ${dur}s var(--ease-in-out) ${d}ms infinite`,
    "--dx": dx + "px",
    "--dy": dy + "px",
    transformBox: "fill-box",
    transformOrigin: "center"
  });
  if (kind === "map") return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 60",
    style: box,
    "aria-hidden": "true"
  }, [[22, 32, 16, 0, 3, -3, 9], [62, 22, 11, 150, -3, 3, 11], [96, 36, 14, 300, 3, 2, 10], [132, 24, 8, 450, -2, -2, 8], [160, 38, 6, 600, 2, -3, 12]].map(([x, y, r, d, dx, dy, t], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: y,
    r: r,
    fill: "var(--ink-3)",
    stroke: "var(--bone-7)",
    strokeOpacity: ".5",
    style: g(d, dx, dy, t)
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "186",
    cy: "28",
    r: "5",
    fill: "var(--lamp-400)",
    style: g(1100, 2, -2, 9)
  }));
  if (kind === "people") return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 60",
    style: box,
    "aria-hidden": "true"
  }, [22, 62, 102].map((x, i) => /*#__PURE__*/React.createElement("circle", {
    key: x,
    cx: x,
    cy: "30",
    r: "14",
    fill: "none",
    stroke: "var(--border-strong)",
    strokeWidth: "1.5",
    strokeDasharray: "4 5",
    style: {
      transformBox: "fill-box",
      transformOrigin: "center",
      animation: `ca-fade-in 600ms var(--ease-out) ${i * 180}ms both, ca-breathe 4.8s var(--ease-in-out) ${i * 1.6}s infinite`
    }
  })));
  if (kind === "word") return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 60",
    style: box,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "30",
    cy: "30",
    r: "20",
    fill: "none",
    stroke: "var(--border-subtle)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("g", {
    style: {
      transformBox: "view-box",
      transformOrigin: "30px 30px",
      animation: "ca-orbit 24s linear infinite"
    }
  }, [["var(--trad-hindu)", 0], ["var(--trad-buddhist)", 120], ["var(--trad-christian)", 240]].map(([c, deg], i) => {
    const r = deg * Math.PI / 180;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: 30 + Math.cos(r) * 20,
      cy: 30 + Math.sin(r) * 20,
      r: "5",
      fill: c,
      style: {
        animation: `ca-fade-in 700ms var(--ease-out) ${300 + i * 200}ms both`
      }
    });
  })));
  if (kind === "check") return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 60",
    style: box,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "30",
    r: "20",
    fill: "var(--ok-tint)",
    style: {
      animation: "ca-fade-in 500ms var(--ease-out) both"
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 30 l7 7 l13 -14",
    fill: "none",
    stroke: "var(--ok-400)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      strokeDasharray: 36,
      "--len": 36,
      animation: "ca-draw 600ms var(--ease-out) 350ms both"
    }
  }));
  return null;
}
function StateBlock({
  kind = "empty",
  title,
  message,
  onRetry,
  retryLabel = "Try again",
  compact,
  word,
  action,
  motif
}) {
  if (word) return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: compact ? "8px 0" : "24px 0"
    }
  }, motif && /*#__PURE__*/React.createElement(Motif, {
    kind: motif,
    h: compact ? 48 : 60
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      font: `800 ${compact ? "clamp(40px,11vw,56px)" : "clamp(52px,14vw,80px)"}/.95 var(--font-display)`,
      letterSpacing: "-0.02em",
      color: "transparent",
      WebkitTextStroke: "1.25px var(--border-strong)",
      overflowWrap: "anywhere",
      animation: "ca-word-settle 900ms var(--ease-out) both"
    }
  }, word), title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      animation: "ca-rise 500ms var(--ease-out) 400ms both"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 16px/1.5 var(--font-body)",
      color: "var(--text-muted)",
      animation: "ca-rise 500ms var(--ease-out) 500ms both"
    }
  }, message), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      animation: "ca-rise 500ms var(--ease-out) 600ms both"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    icon: action.icon,
    onClick: action.onClick
  }, action.label)));
  const [ic, col, bg] = KIND[kind] || KIND.empty;
  if (kind === "loading" && !message) return /*#__PURE__*/React.createElement("div", {
    "aria-busy": "true",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: compact ? 0 : 8
    }
  }, [92, 78, 60].map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 14,
      width: w + "%",
      borderRadius: 6,
      background: "var(--surface-hover)",
      animation: `ca-pulse 1.4s ${i * 0.15}s ease-in-out infinite`
    }
  })));
  return /*#__PURE__*/React.createElement("div", {
    role: kind === "error" ? "alert" : "status",
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      padding: compact ? 0 : "20px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: compact ? 36 : 40,
      height: compact ? 36 : 40,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: bg,
      color: col
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      animation: kind === "loading" ? "ca-spin 1.2s linear infinite" : "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: compact ? 18 : 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      minWidth: 0,
      paddingTop: compact ? 7 : 9
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      font: `400 ${compact ? 14 : 15}px/1.5 var(--font-body)`,
      color: kind === "uncovered" ? "var(--text-muted)" : "var(--text-body)",
      fontStyle: kind === "uncovered" ? "italic" : "normal"
    }
  }, message), onRetry && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    icon: "rotate-cw",
    onClick: onRetry
  }, retryLabel))));
}
Object.assign(__ds_scope, { StateBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StateBlock.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const T = {
  neutral: ["info", "var(--text-body)"],
  ok: ["check", "var(--ok-400)"],
  error: ["circle-alert", "var(--danger-400)"]
};
function Toast({
  tone = "neutral",
  children,
  onClose
}) {
  const [ic, col] = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      minHeight: 52,
      padding: "10px 10px 10px 16px",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-overlay)",
      color: "var(--text-body)",
      font: "400 16px/1.4 var(--font-body)",
      maxWidth: 440,
      animation: "ca-rise var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: col,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      width: 32,
      height: 32,
      border: 0,
      borderRadius: 99,
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  content,
  children,
  placement = "top"
}) {
  const [o, setO] = useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setO(true),
    onMouseLeave: () => setO(false),
    onFocus: () => setO(true),
    onBlur: () => setO(false)
  }, children, o && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      left: "50%",
      [placement === "top" ? "bottom" : "top"]: "calc(100% + 8px)",
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",
      zIndex: 20,
      padding: "7px 10px",
      borderRadius: "var(--radius-sm)",
      background: "var(--bone-8)",
      color: "var(--ink-0)",
      font: "600 13px/1.2 var(--font-body)",
      boxShadow: "var(--shadow-pop)",
      pointerEvents: "none"
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  name,
  value,
  description
}) {
  const round = false;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      minHeight: 44,
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    name: name,
    value: value,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 22,
      height: 22,
      flex: "none",
      borderRadius: round ? 99 : 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `2px solid ${checked ? "var(--bone-8)" : "var(--border-strong)"}`,
      background: checked && !round ? "var(--bone-8)" : "transparent",
      transition: "all var(--dur-fast) var(--ease-out)"
    }
  }, checked && (round ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: "var(--bone-8)"
    }
  }) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--ink-0)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 16px/1.35 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  disabled,
  name,
  value,
  description
}) {
  const round = true;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      minHeight: 44,
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    name: name,
    value: value,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 22,
      height: 22,
      flex: "none",
      borderRadius: round ? 99 : 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `2px solid ${checked ? "var(--bone-8)" : "var(--border-strong)"}`,
      background: checked && !round ? "var(--bone-8)" : "transparent",
      transition: "all var(--dur-fast) var(--ease-out)"
    }
  }, checked && (round ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: "var(--bone-8)"
    }
  }) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--ink-0)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 16px/1.35 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
const {
  useRef,
  useLayoutEffect,
  useState
} = React;
function SegmentedControl({
  options = [],
  value,
  onChange,
  label,
  size = "md",
  accentValue,
  style
}) {
  const h = size === "sm" ? 36 : 48;
  const wrap = useRef(null);
  const [thumb, setThumb] = useState(null);
  const idx = options.findIndex(o => (typeof o === "string" ? o : o.value) === value);
  useLayoutEffect(() => {
    const el = wrap.current && wrap.current.children[idx + 1];
    if (el) setThumb({
      x: el.offsetLeft,
      w: el.offsetWidth
    });
  }, [idx, options.length, size]);
  const acc = value === accentValue;
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap,
    role: "radiogroup",
    "aria-label": label,
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      maxWidth: "100%",
      overflow: "hidden",
      padding: 4,
      gap: 4,
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 4,
      bottom: 4,
      left: 0,
      width: thumb ? thumb.w : 0,
      transform: `translateX(${thumb ? thumb.x : 0}px)`,
      borderRadius: "var(--radius-pill)",
      background: acc ? "var(--lamp-400)" : "var(--bone-8)",
      opacity: thumb ? 1 : 0,
      transition: "transform var(--dur-base) var(--ease-out), width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)"
    }
  }), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange && onChange(v),
      style: {
        position: "relative",
        height: h - 10,
        padding: size === "sm" ? "0 14px" : "0 20px",
        border: 0,
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flex: "none",
        background: on && !thumb ? v === accentValue ? "var(--lamp-400)" : "var(--bone-8)" : "transparent",
        color: on ? "var(--ink-0)" : "var(--text-muted)",
        font: `700 ${size === "sm" ? 13 : 15}px/1 var(--font-body)`,
        transition: "color var(--dur-base) var(--ease-out)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState,
  useId
} = React;
function Field({
  id,
  label,
  hint,
  error,
  children,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      font: "700 13px/1.2 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label), children, (hint || error || count) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      font: "var(--fw-regular) var(--fs-caption)/1.4 var(--font-body)",
      color: error ? "var(--danger-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, error || hint), count && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)"
    }
  }, count)));
}
function Select({
  label,
  options = [],
  value,
  onChange,
  hint,
  error,
  disabled,
  id,
  style
}) {
  const [f, setF] = useState(false);
  const auto = useId();
  const fid = id || auto;
  return /*#__PURE__*/React.createElement(Field, {
    id: fid,
    label: label,
    hint: hint,
    error: error
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: fid,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      appearance: "none",
      width: "100%",
      height: 48,
      padding: "0 44px 0 16px",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      border: `1px solid ${error ? "var(--danger-400)" : f ? "var(--border-focus)" : "var(--border-default)"}`,
      boxShadow: f ? "0 0 0 3px var(--lamp-tint)" : "none",
      outline: "none",
      font: "400 16px/1 var(--font-body)"
    }
  }, options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  onChange,
  disabled,
  "aria-label": ariaLabel
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      minHeight: 44,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-label": label ? undefined : ariaLabel,
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      flex: "none",
      borderRadius: 99,
      border: 0,
      padding: 3,
      cursor: "inherit",
      background: checked ? "var(--lamp-400)" : "var(--ink-4)",
      transition: "background var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 20,
      height: 20,
      borderRadius: 99,
      background: checked ? "var(--ink-0)" : "var(--bone-7)",
      transform: checked ? "translateX(18px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 16px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
const {
  useState,
  useId
} = React;
function Field({
  id,
  label,
  hint,
  error,
  children,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      font: "700 13px/1.2 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label), children, (hint || error || count) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      font: "var(--fw-regular) var(--fs-caption)/1.4 var(--font-body)",
      color: error ? "var(--danger-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: id ? id + "-msg" : undefined,
    role: error ? "alert" : undefined
  }, error || hint), count && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)"
    }
  }, count)));
}
function TextArea({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  rows = 5,
  hint,
  error,
  disabled,
  id,
  style
}) {
  const [f, setF] = useState(false);
  const auto = useId();
  const fid = id || auto;
  const n = (value || "").length;
  return /*#__PURE__*/React.createElement(Field, {
    id: fid,
    label: label,
    hint: hint,
    error: error,
    count: maxLength ? `${n.toLocaleString()} / ${maxLength.toLocaleString()}` : null
  }, /*#__PURE__*/React.createElement("textarea", {
    id: fid,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    maxLength: maxLength,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    "aria-invalid": !!error || undefined,
    "aria-describedby": hint || error ? fid + "-msg" : undefined,
    style: {
      width: "100%",
      padding: 16,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      color: "var(--text-strong)",
      resize: "vertical",
      border: `1px solid ${error ? "var(--danger-400)" : f ? "var(--border-focus)" : "var(--border-default)"}`,
      boxShadow: f ? "0 0 0 3px var(--lamp-tint)" : "none",
      outline: "none",
      font: "var(--type-pastoral)",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const {
  useState,
  useId
} = React;
function Field({
  id,
  label,
  hint,
  error,
  children,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      font: "700 13px/1.2 var(--font-body)",
      color: "var(--text-body)"
    }
  }, label), children, (hint || error || count) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      font: "var(--fw-regular) var(--fs-caption)/1.4 var(--font-body)",
      color: error ? "var(--danger-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: id ? id + "-msg" : undefined,
    role: error ? "alert" : undefined
  }, error || hint), count && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)"
    }
  }, count)));
}
const box = (focus, error, size) => ({
  width: "100%",
  height: size === "lg" ? 60 : 48,
  padding: "0 16px",
  borderRadius: "var(--radius-md)",
  background: "var(--surface-card)",
  color: "var(--text-strong)",
  border: `1px solid ${error ? "var(--danger-400)" : focus ? "var(--border-focus)" : "var(--border-default)"}`,
  boxShadow: focus ? "0 0 0 3px var(--lamp-tint)" : "none",
  outline: "none",
  font: size === "lg" ? "600 20px/1 var(--font-body)" : "400 16px/1 var(--font-body)",
  transition: "border-color var(--dur-fast) var(--ease-out)"
});
function TextField({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  icon,
  hint,
  error,
  size = "md",
  type = "text",
  disabled,
  id,
  style,
  autoComplete,
  inputMode,
  enterKeyHint
}) {
  const [f, setF] = useState(false);
  const auto = useId();
  const fid = id || auto;
  return /*#__PURE__*/React.createElement(Field, {
    id: fid,
    label: label,
    hint: hint,
    error: error
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 16,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? 22 : 18
  })), /*#__PURE__*/React.createElement("input", {
    id: fid,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onKeyDown: onKeyDown,
    disabled: disabled,
    autoComplete: autoComplete,
    inputMode: inputMode,
    enterKeyHint: enterKeyHint,
    "aria-invalid": !!error || undefined,
    "aria-describedby": hint || error ? fid + "-msg" : undefined,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...box(f, error, size),
      paddingLeft: icon ? size === "lg" ? 50 : 44 : 16,
      opacity: disabled ? 0.5 : 1
    }
  })));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// contract/types.ts
try { (() => {
// Rhema.ai shared contract. Frontend and backend both import these types.
// Rule: the server sends exactly these shapes. Anything not listed here must not be sent.

// ---------- Common ----------
// "2026-09-27"
// "2026-09"
// "req_3fa9c1…" — shown to user on error/blocked

// English, Hindi, Bengali, Nepali, Burmese, Khmer

/** Every screen maps to exactly one of these. Matches #state=… in the UI kit. */

// e.g. Romans 10:9 (KJV)

// ---------- Layer 1: Dictionary ----------

/** Expert edit. Never public until a human approves. */

// ---------- Layer 2: Monthly question + concept map ----------

// 1..280 chars

/** Public map for one month. Aggregates only. */

// isNew = absent last month

/** Scrub: this month + last month. `previous` is null when only one month exists -> UI hides scrub. */

/** Admin-only draft. The one place anonymous answer text may appear. */

// ---------- Accounts / settings ----------

// Faith mode is never a default or a setting

/** Admin list shows pseudonyms. Real name only via reveal, which is logged. */

// reason required, >= 10 chars

// ---------- Layer 3: Pastor pipeline ----------
// Candidate, Training, Ministry placement, Active ministry, Ongoing development
const PIPELINE_STAGE_NAMES = ["Candidate", "Training", "Ministry placement", "Active ministry", "Ongoing development"];

/** What the pastor sees about themself. No scores, no risk words. */

// no finance, ever

/** "When you can" check-in. Not daily, no streaks. mood: 1 much lighter … 3 about usual … 5 much heavier than usual. */

/** Pastor only sees the plain outcome. Never clinical labels. "queued" exists only on the phone (offline). */

// ---------- Reviewer ----------

/** Reviewer row. Pseudonym + country + broad region ONLY. No street, GPS, photo. */

// ---------- Integrations ----------

// ---------- System status ----------

/** Field limits the backend must enforce and the UI is tested against (#messy=1 in any kit). */
const LIMITS = {
  termLength: 40,
  // headword; longer words wrap, never overflow
  definitionLength: 600,
  // longer is rejected at authoring
  answerLength: 280,
  // monthly answer (UI counter shows 280)
  checkinFieldLength: 500,
  // each check-in text field
  churchNameLength: 90,
  // shown on one line with an ellipsis
  regionLength: 80,
  // broad region; one line with an ellipsis
  alertNoteLength: 140,
  pageSize: {
    accounts: 6,
    queue: 5,
    alertRecord: 6
  } // first page; the rest via "Load more"
};
/** Every optional field above may be missing or empty; the UI shows "Not in the dictionary yet" or an empty state, never "undefined". */

// ---------- People, safety, rhythm ----------
// written by the mentor, never by the assistant

// keeps saved words; past answers never re-linked

// no text, no ids of people
// leader only; UI asks to type "alert"
// interface strings only

// attach to every assistant-written text
Object.assign(__ds_scope, { PIPELINE_STAGE_NAMES, LIMITS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "contract/types.ts", error: String((e && e.message) || e) }); }

// ui_kits/confirm.js
try { (() => {
// Shared "type to confirm" field for serious actions, plus a matcher.
(function () {
  window.CAMatch = function (v, w) {
    return String(v || "").trim().toLowerCase() === String(w).toLowerCase();
  };
  window.CATypeConfirm = function (props) {
    var TF = window.ChurchAIDesignSystem_06db43.TextField;
    return React.createElement(TF, {
      label: "Type " + props.word + " to confirm",
      value: props.value,
      autoComplete: "off",
      hint: props.hint || "This can’t be undone.",
      onChange: function (e) {
        props.onChange(e.target.value);
      }
    });
  };
  window.CAAboutDraft = function (props) {
    var NS = window.ChurchAIDesignSystem_06db43,
      h = React.createElement,
      k = "ca_about_" + props.id;
    var st = React.useState(function () {
        try {
          return !localStorage.getItem(k);
        } catch (e) {
          return true;
        }
      }),
      open = st[0],
      setOpen = st[1];
    if (!open) return null;
    return h("div", {
      role: "note",
      "aria-label": "About this draft",
      style: Object.assign({
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: 16,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        background: "var(--surface-card)",
        maxWidth: 480
      }, props.style)
    }, h("span", {
      "aria-hidden": "true",
      style: {
        width: 36,
        height: 36,
        flex: "none",
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        background: "var(--surface-raised)",
        color: "var(--text-body)"
      }
    }, h(NS.Icon, {
      name: "user-check",
      size: 18
    })), h("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, h("div", {
      style: {
        font: "700 18px/1.3 var(--font-body)",
        color: "var(--text-strong)"
      }
    }, "About this draft"), h("p", {
      style: {
        margin: 0,
        font: "var(--type-body)",
        fontSize: 16,
        lineHeight: 1.45,
        color: "var(--text-body)"
      }
    }, props.children), h("div", {
      style: {
        marginTop: 4
      }
    }, h(NS.Button, {
      size: "sm",
      variant: "secondary",
      onClick: function () {
        try {
          localStorage.setItem(k, "1");
        } catch (e) {}
        setOpen(false);
      }
    }, "Got it"))));
  };
  // "Did this help?" — one tap, anonymous count only.
  window.CAHelped = function (props) {
    var e = React.createElement,
      k = "ca_helped_" + props.id;
    var st = React.useState(function () {
        try {
          return localStorage.getItem(k);
        } catch (x) {
          return null;
        }
      }),
      v = st[0],
      setV = st[1];
    var pick = function (a) {
      try {
        localStorage.setItem(k, a);
      } catch (x) {}
      setV(a);
      window.CAHaptic && window.CAHaptic("light");
    };
    var btn = function (a, label) {
      return e("button", {
        type: "button",
        onClick: function () {
          pick(a);
        },
        style: {
          height: 36,
          padding: "0 14px",
          flex: "none",
          whiteSpace: "nowrap",
          borderRadius: 999,
          cursor: "pointer",
          font: "600 13px/1 var(--font-body)",
          border: "1px solid var(--border-default)",
          background: "transparent",
          color: "var(--text-body)"
        }
      }, label);
    };
    return e("div", {
      role: "group",
      "aria-label": "Did this help?",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "6px 4px"
      }
    }, v ? e("span", {
      role: "status",
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, window.CAtr("Thanks. Counted, with no name.")) : [e("span", {
      key: "q",
      style: {
        font: "600 13px/1.3 var(--font-body)",
        color: "var(--text-muted)",
        marginRight: 2
      }
    }, window.CAtr(props.q || "Did this help?")), e(React.Fragment, {
      key: "y"
    }, btn("yes", window.CAtr("Yes"))), e(React.Fragment, {
      key: "n"
    }, btn("no", window.CAtr("Not really")))]);
  };
  // "Why am I seeing this?" — one quiet link that opens a single plain line. Used only on assistant-written text.
  window.CAWhy = function (props) {
    var e = React.createElement,
      st = React.useState(false),
      o = st[0],
      setO = st[1];
    return e("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, e("button", {
      type: "button",
      "aria-expanded": o,
      onClick: function () {
        setO(!o);
      },
      style: {
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 36,
        padding: 0,
        background: "none",
        border: 0,
        cursor: "pointer",
        font: "600 13px/1.3 var(--font-body)",
        color: "var(--text-muted)",
        textDecoration: "underline",
        textUnderlineOffset: 3
      }
    }, window.CAtr(props.label || "Why am I seeing this?")), o ? e("p", {
      role: "note",
      style: {
        margin: 0,
        font: "var(--type-source)",
        color: "var(--text-body)",
        maxWidth: "52ch",
        textWrap: "pretty"
      }
    }, props.text) : null);
  };
  // Languages for the pastor check-in. Needs native-speaker review before launch.
  window.CA_LANGS = [["en", "English"], ["hi", "हिन्दी"], ["bn", "বাংলা"], ["ne", "नेपाली"], ["my", "မြန်မာ"], ["km", "ខ្មែរ"]];
  var CA_STR = {
    hi: {
      title: "आज का दिन कैसा रहा?",
      usual: "सामान्य दिन की तुलना में?",
      hard: "क्या कठिन था?",
      well: "क्या अच्छा रहा?",
      send: "भेजें",
      queued: "इस फ़ोन पर सहेजा गया। ऑनलाइन होने पर भेजा जाएगा।"
    },
    bn: {
      title: "আজকের দিনটা কেমন গেল?",
      usual: "সাধারণ দিনের তুলনায়?",
      hard: "কী কঠিন ছিল?",
      well: "কী ভালো হয়েছে?",
      send: "পাঠান",
      queued: "এই ফোনে সংরক্ষিত। অনলাইনে এলে পাঠানো হবে।"
    },
    ne: {
      title: "आजको दिन कस्तो रह्यो?",
      usual: "सामान्य दिनको तुलनामा?",
      hard: "के गाह्रो भयो?",
      well: "के राम्रो भयो?",
      send: "पठाउनुहोस्",
      queued: "यो फोनमा सुरक्षित गरियो। अनलाइन हुँदा पठाइनेछ।"
    },
    my: {
      title: "ဒီနေ့ ဘယ်လိုရှိလဲ။",
      usual: "ပုံမှန်နေ့နဲ့ ယှဉ်ရင်။",
      hard: "ဘာက ခက်ခဲခဲ့လဲ။",
      well: "ဘာက ကောင်းခဲ့လဲ။",
      send: "ပို့မည်",
      queued: "ဤဖုန်းတွင် သိမ်းထားသည်။ အင်တာနက်ရလျှင် ပို့ပါမည်။"
    },
    km: {
      title: "ថ្ងៃនេះយ៉ាងម៉េចដែរ?",
      usual: "ធៀបនឹងថ្ងៃធម្មតា?",
      hard: "តើអ្វីដែលពិបាក?",
      well: "តើអ្វីដែលល្អ?",
      send: "ផ្ញើ",
      queued: "បានរក្សាទុកនៅលើទូរស័ព្ទនេះ។ នឹងផ្ញើនៅពេលមានអ៊ីនធឺណិត។"
    }
  };
  window.CA_LANG = function () {
    var h = /(?:^|[#&])lang=(en|hi|bn|ne|my|km)\b/.exec(location.hash);
    if (h) return h[1];
    try {
      return localStorage.getItem("ca_lang") || "en";
    } catch (e) {
      return "en";
    }
  }();
  var CA_TR = {
    "Check-in · when you can": ["हाल-चाल · जब समय मिले", "খবরাখবর · যখন সময় পান", "हालखबर · जब समय मिल्छ", "အခြေအနေ မှတ်တမ်း · အချိန်ရသလို", "ការរាយការណ៍ · ពេលអ្នកទំនេរ"],
    "Much lighter than usual": ["सामान्य से बहुत हल्का", "স্বাভাবিকের চেয়ে অনেক হালকা", "सामान्यभन्दा धेरै हलुका", "ပုံမှန်ထက် အများကြီး ပေါ့ပါး", "ស្រាលជាងធម្មតាច្រើន"],
    "Lighter than usual": ["सामान्य से हल्का", "স্বাভাবিকের চেয়ে হালকা", "सामान्यभन्दा हलुका", "ပုံမှန်ထက် ပေါ့ပါး", "ស្រាលជាងធម្មតា"],
    "About usual": ["लगभग सामान्य", "প্রায় স্বাভাবিক", "लगभग सामान्य", "ပုံမှန်လောက်ပဲ", "ប្រហែលធម្មតា"],
    "Heavier than usual": ["सामान्य से भारी", "স্বাভাবিকের চেয়ে ভারী", "सामान्यभन्दा गह्रौं", "ပုံမှန်ထက် လေးလံ", "ធ្ងន់ជាងធម្មតា"],
    "Much heavier than usual": ["सामान्य से बहुत भारी", "স্বাভাবিকের চেয়ে অনেক ভারী", "सामान्यभन्दा धेरै गह्रौं", "ပုံမှန်ထက် အများကြီး လေးလံ", "ធ្ងន់ជាងធម្មតាច្រើន"],
    "Did you pray today?": ["क्या आपने आज प्रार्थना की?", "আপনি কি আজ প্রার্থনা করেছেন?", "के तपाईंले आज प्रार्थना गर्नुभयो?", "ဒီနေ့ ဆုတောင်းခဲ့သလား။", "តើអ្នកបានអធិស្ឋានថ្ងៃនេះទេ?"],
    "Yes": ["हाँ", "হ্যাঁ", "हो", "ဟုတ်ကဲ့", "បាទ/ចាស"],
    "Not today": ["आज नहीं", "আজ না", "आज होइन", "ဒီနေ့ မဟုတ်ဘူး", "មិនមែនថ្ងៃនេះទេ"],
    "Visits made today": ["आज की मुलाक़ातें", "আজকের সাক্ষাৎ", "आजका भेटघाट", "ဒီနေ့ သွားရောက်တွေ့ဆုံမှု", "ការសួរសុខទុក្ខថ្ងៃនេះ"],
    "Pastoral visits or calls. 0 is fine.": ["पास्टरीय मुलाक़ातें या फ़ोन। 0 भी ठीक है।", "পালকীয় সাক্ষাৎ বা ফোন। ০ হলেও ঠিক আছে।", "पास्टरीय भेट वा फोन। ० पनि ठीक छ।", "သွားရောက်တွေ့ဆုံမှု သို့မဟုတ် ဖုန်းခေါ်မှု။ 0 ဖြစ်လည်း ရပါတယ်။", "ការសួរសុខទុក្ខ ឬការហៅទូរស័ព្ទ។ 0 ក៏មិនអីដែរ។"],
    "Check-in": ["हाल-चाल", "খবরাখবর", "हालखबर", "အခြေအနေ မှတ်တမ်း", "ការរាយការណ៍"],
    " · updated": [" · अपडेट किया गया", " · হালনাগাদ", " · अद्यावधिक", " · ပြင်ဆင်ပြီး", " · បានកែប្រែ"],
    "Thank you. Rest well tonight. “Come unto me, all ye that labour.” Matthew 11:28": ["धन्यवाद। आज रात अच्छे से आराम करें। — मत्ती 11:28", "ধন্যবাদ। আজ রাতে ভালো করে বিশ্রাম নিন। — মথি ১১:২৮", "धन्यवाद। आज राति राम्ररी आराम गर्नुहोस्। — मत्ती ११:२८", "ကျေးဇူးတင်ပါတယ်။ ဒီည ကောင်းကောင်း အနားယူပါ။ — မဿဲ ၁၁:၂၈", "សូមអរគុណ។ សូមសម្រាកឲ្យបានល្អនៅយប់នេះ។ — ម៉ាថាយ ១១:២៨"],
    "Thank you. Go gently today. “This is the day which the LORD hath made.” Psalm 118:24": ["धन्यवाद। आज का दिन धीरे से बिताइए। — भजन संहिता 118:24", "ধন্যবাদ। আজকের দিনটা ধীরে চলুন। — গীতসংহিতা ১১৮:২৪", "धन्यवाद। आजको दिन बिस्तारै बिताउनुहोस्। — भजनसंग्रह ११८:२४", "ကျေးဇူးတင်ပါတယ်။ ဒီနေ့ ဖြည်းဖြည်းချင်း သွားပါ။ — ဆာလံ ၁၁၈:၂၄", "សូមអរគុណ។ សូមដើរយឺតៗថ្ងៃនេះ។ — ទំនុកតម្កើង ១១៨:២៤"],
    "A person will see this.": ["एक व्यक्ति इसे देखेगा।", "একজন মানুষ এটি দেখবেন।", "एक जना व्यक्तिले यो हेर्नुहुनेछ।", "လူတစ်ဦး ဒါကို ကြည့်ပါလိမ့်မည်။", "មនុស្សម្នាក់នឹងមើលវា។"],
    "Saved on this phone. It will send when you are online.": ["इस फ़ोन पर सहेजा गया। ऑनलाइन होने पर भेजा जाएगा।", "এই ফোনে সংরক্ষিত। অনলাইনে এলে পাঠানো হবে।", "यो फोनमा सुरक्षित गरियो। अनलाइन हुँदा पठाइनेछ।", "ဤဖုန်းတွင် သိမ်းထားသည်။ အင်တာနက်ရလျှင် ပို့ပါမည်။", "បានរក្សាទុកនៅលើទូរស័ព្ទនេះ។ នឹងផ្ញើនៅពេលមានអ៊ីនធឺណិត។"],
    "We could not send this.": ["हम इसे भेज नहीं सके।", "আমরা এটি পাঠাতে পারিনি।", "हामीले यो पठाउन सकेनौं।", "ဒါကို ပို့လို့ မရခဲ့ပါ။", "យើងមិនអាចផ្ញើវាបានទេ។"],
    "Part of this reads like an instruction, so it was not sent.": ["इसका एक हिस्सा निर्देश जैसा लगता है, इसलिए इसे नहीं भेजा गया।", "এর একটি অংশ নির্দেশের মতো শোনায়, তাই এটি পাঠানো হয়নি।", "यसको एउटा भाग निर्देशनजस्तो लाग्छ, त्यसैले पठाइएन।", "ဒီထဲက တစ်စိတ်တစ်ပိုင်းက ညွှန်ကြားချက်လို ဖြစ်နေလို့ မပို့ခဲ့ပါ။", "ផ្នែកមួយនៃនេះមើលទៅដូចជាការណែនាំ ដូច្នេះវាមិនត្រូវបានផ្ញើទេ។"],
    "In danger now? Call": ["अभी ख़तरे में हैं? कॉल करें", "এখন বিপদে আছেন? কল করুন", "अहिले खतरामा हुनुहुन्छ? फोन गर्नुहोस्", "အခု အန္တရာယ်ရှိနေလား။ ခေါ်ပါ", "កំពុងមានគ្រោះថ្នាក់? សូមហៅ"],
    "free, any time": ["मुफ़्त, किसी भी समय", "বিনামূল্যে, যেকোনো সময়", "निःशुल्क, जुनसुकै बेला", "အခမဲ့၊ အချိန်မရွေး", "ឥតគិតថ្លៃ គ្រប់ពេល"],
    "Message your mentor": ["अपने मार्गदर्शक को संदेश भेजें", "আপনার মেন্টরকে বার্তা পাঠান", "आफ्नो मार्गदर्शकलाई सन्देश पठाउनुहोस्", "သင့်လမ်းပြဆရာထံ စာပို့ပါ", "ផ្ញើសារទៅអ្នកណែនាំរបស់អ្នក"],
    "Why am I seeing this?": ["मुझे यह क्यों दिख रहा है?", "আমি এটি কেন দেখছি?", "मैले यो किन देखिरहेको छु?", "ဒါကို ဘာကြောင့် မြင်နေရတာလဲ။", "ហេតុអ្វីខ្ញុំឃើញនេះ?"],
    "Written by the assistant from today’s note. Nothing here is scored, and your words are not shared.": ["यह सहायक ने आज के नोट से लिखा है। यहाँ कुछ भी अंकित नहीं होता, और आपके शब्द साझा नहीं किए जाते।", "সহকারী আজকের নোট থেকে এটি লিখেছে। এখানে কিছুই নম্বর দেওয়া হয় না, এবং আপনার কথা শেয়ার করা হয় না।", "यो सहायकले आजको नोटबाट लेखेको हो। यहाँ केही अंक दिइँदैन, र तपाईंका शब्दहरू साझा गरिँदैनन्।", "ဒီနေ့ မှတ်စုကနေ အကူအညီပေးစနစ်က ရေးထားတာပါ။ ဘာမှ အမှတ်မပေးပါ၊ သင့်စကားတွေကို မမျှဝေပါ။", "ជំនួយការបានសរសេរនេះពីកំណត់ត្រាថ្ងៃនេះ។ គ្មានអ្វីត្រូវបានដាក់ពិន្ទុទេ ហើយពាក្យរបស់អ្នកមិនត្រូវបានចែករំលែកទេ។"],
    "Did this help today?": ["क्या आज इससे मदद मिली?", "এটি কি আজ সাহায্য করেছে?", "के यसले आज मद्दत गर्‍यो?", "ဒါက ဒီနေ့ အထောက်အကူ ဖြစ်ခဲ့လား။", "តើនេះបានជួយថ្ងៃនេះទេ?"],
    "Not really": ["ज़्यादा नहीं", "তেমন না", "खासै होइन", "သိပ်မဟုတ်ဘူး", "មិនសូវទេ"],
    "Thanks. Counted, with no name.": ["धन्यवाद। बिना नाम के गिना गया।", "ধন্যবাদ। নাম ছাড়াই গণনা করা হয়েছে।", "धन्यवाद। नाम बिना गनियो।", "ကျေးဇူးပါ။ အမည်မပါဘဲ ရေတွက်ထားပါတယ်။", "សូមអរគុណ។ បានរាប់ដោយគ្មានឈ្មោះ។"],
    "Retry": ["फिर से कोशिश करें", "আবার চেষ্টা করুন", "फेरि प्रयास गर्नुहोस्", "ထပ်ကြိုးစားပါ", "ព្យាយាមម្ដងទៀត"],
    "Edit today’s note": ["आज का नोट बदलें", "আজকের নোট সম্পাদনা করুন", "आजको नोट सम्पादन गर्नुहोस्", "ဒီနေ့ မှတ်စုကို ပြင်ပါ", "កែកំណត់ត្រាថ្ងៃនេះ"],
    "Sent. Your mentor will reach out today. Only your mentor sees this.": ["भेज दिया। आपके मार्गदर्शक आज संपर्क करेंगे। इसे सिर्फ़ आपके मार्गदर्शक देखते हैं।", "পাঠানো হয়েছে। আপনার মেন্টর আজ যোগাযোগ করবেন। শুধু আপনার মেন্টর এটি দেখেন।", "पठाइयो। तपाईंका मार्गदर्शकले आज सम्पर्क गर्नुहुनेछ। यो तपाईंका मार्गदर्शकले मात्र देख्नुहुन्छ।", "ပို့ပြီးပါပြီ။ သင့်လမ်းပြဆရာက ဒီနေ့ ဆက်သွယ်ပါလိမ့်မယ်။ သင့်လမ်းပြဆရာသာ မြင်ရပါတယ်။", "បានផ្ញើ។ អ្នកណែនាំរបស់អ្នកនឹងទាក់ទងថ្ងៃនេះ។ មានតែអ្នកណែនាំរបស់អ្នកប៉ុណ្ណោះដែលឃើញនេះ។"]
  };
  var CA_IX = {
    hi: 0,
    bn: 1,
    ne: 2,
    my: 3,
    km: 4
  };
  window.CAtr = function (s) {
    var r = CA_TR[s],
      i = CA_IX[window.CA_LANG];
    return r && i != null ? r[i] : s;
  };
  window.CAT = function (k) {
    var s = CA_STR[window.CA_LANG];
    return s && s[k] || null;
  };
  window.CA_LANG_EN = {
    en: "English",
    hi: "Hindi",
    bn: "Bengali",
    ne: "Nepali",
    my: "Burmese",
    km: "Khmer"
  };
  window.CALangPick = function () {
    var e = React.createElement,
      st = React.useState(window.CA_LANG),
      v = st[0],
      setV = st[1],
      os = React.useState(false),
      open = os[0],
      setOpen = os[1];
    var root = React.useRef(null),
      list = React.useRef(null);
    var pick = function (n) {
      try {
        localStorage.setItem("ca_lang", n);
      } catch (x) {}
      window.CA_LANG = n;
      document.documentElement.lang = n;
      setV(n);
      setOpen(false);
      window.dispatchEvent(new Event("ca-lang"));
      window.CAHaptic && window.CAHaptic("light");
      root.current && root.current.querySelector("button").focus();
    };
    React.useEffect(function () {
      if (!open) return;
      var out = function (ev) {
        if (root.current && !root.current.contains(ev.target)) setOpen(false);
      };
      var key = function (ev) {
        if (ev.key === "Escape") {
          ev.stopPropagation();
          setOpen(false);
          root.current.querySelector("button").focus();
        }
      };
      document.addEventListener("pointerdown", out);
      document.addEventListener("keydown", key, true);
      var sel = list.current && list.current.querySelector('[aria-selected="true"]');
      sel && sel.focus();
      return function () {
        document.removeEventListener("pointerdown", out);
        document.removeEventListener("keydown", key, true);
      };
    }, [open]);
    var nav = function (ev) {
      var items = Array.prototype.slice.call(list.current.querySelectorAll('[role="option"]')),
        i = items.indexOf(document.activeElement);
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        items[Math.min(i + 1, items.length - 1)].focus();
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        items[Math.max(i - 1, 0)].focus();
      } else if (ev.key === "Home") {
        ev.preventDefault();
        items[0].focus();
      } else if (ev.key === "End") {
        ev.preventDefault();
        items[items.length - 1].focus();
      }
    };
    var cur = (window.CA_LANGS.find(function (l) {
      return l[0] === v;
    }) || window.CA_LANGS[0])[1];
    var globe = e("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, e("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), e("path", {
      d: "M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"
    }));
    var chev = e("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      style: {
        transition: "transform 200ms var(--ease-out)",
        transform: open ? "rotate(180deg)" : "none"
      }
    }, e("path", {
      d: "M6 9l6 6 6-6"
    }));
    var check = e("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, e("path", {
      d: "M5 12.5l4.5 4.5L19 7.5"
    }));
    return e("div", {
      ref: root,
      "data-no-tr": "",
      style: {
        position: "relative",
        flex: "none"
      }
    }, e("button", {
      type: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-label": "Language: " + (window.CA_LANG_EN[v] || "English"),
      onClick: function () {
        setOpen(!open);
      },
      className: "ca-lang-btn",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 44,
        padding: "0 12px",
        borderRadius: 999,
        border: "1px solid " + (open ? "var(--lamp-400)" : "var(--border-default)"),
        background: open ? "var(--surface-raised)" : "transparent",
        color: "var(--text-body)",
        font: "600 13px/1 var(--font-body)",
        cursor: "pointer",
        transition: "border-color 200ms var(--ease-out), background 200ms var(--ease-out)"
      }
    }, globe, e("span", null, cur), chev), open ? e("ul", {
      ref: list,
      role: "listbox",
      "aria-label": "Language",
      onKeyDown: nav,
      style: {
        position: "absolute",
        right: 0,
        top: "calc(100% + 6px)",
        zIndex: 200,
        minWidth: 200,
        margin: 0,
        padding: 6,
        listStyle: "none",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface-raised)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--elev-3, 0 12px 32px rgba(0,0,0,.4))",
        animation: "ca-pop 160ms var(--ease-out)"
      }
    }, window.CA_LANGS.map(function (l) {
      var on = l[0] === v;
      return e("li", {
        key: l[0],
        role: "option",
        "aria-selected": on,
        tabIndex: -1,
        lang: l[0],
        onClick: function () {
          pick(l[0]);
        },
        onKeyDown: function (ev) {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            pick(l[0]);
          }
        },
        className: "ca-lang-opt",
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          minHeight: 52,
          padding: "8px 10px",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          background: on ? "var(--lamp-tint)" : "transparent",
          color: on ? "var(--text-strong)" : "var(--text-body)",
          outline: "none"
        }
      }, e("span", {
        style: {
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0
        }
      }, e("span", {
        style: {
          font: "600 16px/1.45 var(--font-body)"
        }
      }, l[1]), l[0] !== "en" ? e("span", {
        lang: "en",
        style: {
          font: "400 13px/1.3 var(--font-body)",
          color: "var(--text-muted)"
        }
      }, window.CA_LANG_EN[l[0]]) : null), on ? e("span", {
        style: {
          color: "var(--lamp-400)",
          display: "grid"
        }
      }, check) : null);
    })) : null);
  };
  (function () {
    if (document.getElementById("ca-lang-css")) return;
    var s = document.createElement("style");
    s.id = "ca-lang-css";
    s.textContent = "@keyframes ca-pop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}.ca-lang-btn:hover{border-color:var(--border-strong)!important;background:var(--surface-raised)!important}.ca-lang-btn:active{transform:scale(.97)}.ca-lang-btn:focus-visible{outline:2px solid var(--focus-ring,var(--lamp-400));outline-offset:2px}.ca-lang-opt:hover{background:var(--surface-card)!important}.ca-lang-opt[aria-selected=true]:hover{background:var(--lamp-tint)!important}.ca-lang-opt:focus-visible{box-shadow:inset 0 0 0 1px var(--border-strong)}.ca-lang-opt[aria-selected=true]:focus-visible{box-shadow:none}@media (prefers-reduced-motion:reduce){.ca-lang-btn,.ca-lang-btn svg{transition:none!important}[role=listbox]{animation:none!important}}";
    (document.head || document.documentElement).appendChild(s);
  })();
  // Voice input — the browser's own speech-to-text. No audio is recorded or stored by Rhema.ai. Hidden where unsupported.
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SR_LANG = {
    en: "en-US",
    hi: "hi-IN",
    bn: "bn-BD",
    ne: "ne-NP",
    my: "my-MM",
    km: "km-KH"
  };
  window.CAMic = function (props) {
    var e = React.createElement,
      st = React.useState(false),
      on = st[0],
      setOn = st[1],
      rec = React.useRef(null);
    React.useEffect(function () {
      return function () {
        try {
          rec.current && rec.current.abort();
        } catch (x) {}
      };
    }, []);
    if (!SR || window.CAGuard && window.CAGuard.lockdown && window.CAGuard.lockdown()) return null;
    var toggle = function () {
      if (on) {
        try {
          rec.current.stop();
        } catch (x) {}
        return;
      }
      var r = new SR();
      rec.current = r;
      r.lang = SR_LANG[window.CA_LANG] || "en-US";
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.onresult = function (ev) {
        var t = ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript;
        if (t) props.onText(t.trim());
      };
      r.onend = function () {
        setOn(false);
      };
      r.onerror = function () {
        setOn(false);
      };
      try {
        r.start();
        setOn(true);
        window.CAHaptic && window.CAHaptic("light");
      } catch (x) {
        setOn(false);
      }
    };
    var mic = e("svg", {
      width: props.inline ? 16 : 20,
      height: props.inline ? 16 : 20,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, e("rect", {
      x: 9,
      y: 3,
      width: 6,
      height: 11,
      rx: 3
    }), e("path", {
      d: "M5 11a7 7 0 0 0 14 0M12 18v3"
    }));
    var label = on ? "Listening… tap to stop" : "Speak instead";
    if (props.inline) return e("button", {
      type: "button",
      onClick: toggle,
      "aria-pressed": on,
      className: "ca-mic",
      style: {
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 36,
        padding: "0 2px",
        background: "none",
        border: 0,
        cursor: "pointer",
        font: "600 13px/1.3 var(--font-body)",
        color: on ? "var(--lamp-400)" : "var(--text-muted)"
      }
    }, e("span", {
      className: on ? "ca-mic-on" : "",
      style: {
        display: "grid",
        placeItems: "center",
        width: 28,
        height: 28,
        borderRadius: 99
      }
    }, mic), label);
    var sz = props.size || 52;
    return e("button", {
      type: "button",
      onClick: toggle,
      "aria-pressed": on,
      "aria-label": on ? "Stop listening" : "Speak a word",
      className: "ca-mic ca-mic-btn" + (on ? " ca-mic-on" : ""),
      style: {
        width: sz,
        height: sz,
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: 999,
        border: "1px solid " + (on ? "var(--lamp-400)" : "var(--border-default)"),
        background: on ? "var(--lamp-tint)" : "var(--surface-card)",
        color: on ? "var(--lamp-400)" : "var(--text-body)",
        cursor: "pointer"
      }
    }, mic);
  };
  // "Save as image" — a quiet word card, saved or sent through the phone's own share sheet. Dictionary only; never Faith mode, answers or pastor screens. Off during an alert.
  window.CASaveCard = function (props) {
    var e = React.createElement,
      st = React.useState(""),
      msg = st[0],
      setMsg = st[1],
      w = props.entry;
    if (!w || window.CAGuard && window.CAGuard.lockdown && window.CAGuard.lockdown()) return null;
    var css = function (v, f) {
      return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || f;
    };
    var make = async function () {
      try {
        await document.fonts.ready;
      } catch (x) {}
      var W = 1080,
        H = 1350,
        cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      var g = cv.getContext("2d");
      var bg = css("--ink-0", "#0B0F0C"),
        ink = css("--bone-0", "#F3F7EE"),
        mute = css("--bone-5", "#A9B3A2"),
        lamp = css("--lamp-400", "#CFDA5C"),
        line = css("--ink-4", "#324034");
      var disp = css("--font-display", "sans-serif"),
        body = css("--font-body", "sans-serif");
      g.fillStyle = bg;
      g.fillRect(0, 0, W, H);
      g.fillStyle = mute;
      g.font = "600 34px " + body;
      g.fillText((w.pos || "word").toUpperCase(), 96, 200);
      g.fillStyle = ink;
      g.font = "800 150px " + disp;
      g.fillText(w.term, 90, 350);
      g.fillStyle = ink;
      g.font = "400 52px " + body;
      var words = String(w.def || "").split(" "),
        ln = "",
        y = 480;
      words.forEach(function (x) {
        var t = ln ? ln + " " + x : x;
        if (g.measureText(t).width > W - 192) {
          g.fillText(ln, 96, y);
          y += 72;
          ln = x;
        } else ln = t;
      });
      if (ln) g.fillText(ln, 96, y);
      y += 110;
      g.font = "600 36px " + body;
      var x0 = 96;
      (w.used || []).forEach(function (t) {
        var tw = g.measureText(t).width + 56;
        g.strokeStyle = line;
        g.lineWidth = 3;
        g.beginPath();
        g.roundRect ? g.roundRect(x0, y - 48, tw, 68, 34) : g.rect(x0, y - 48, tw, 68);
        g.stroke();
        g.fillStyle = ink;
        g.fillText(t, x0 + 28, y);
        x0 += tw + 18;
      });
      g.fillStyle = lamp;
      g.fillRect(96, H - 170, 64, 6);
      g.fillStyle = ink;
      g.font = "800 44px " + disp;
      g.fillText("Rhema.ai", 96, H - 96);
      g.fillStyle = mute;
      g.font = "400 30px " + body;
      g.textAlign = "right";
      g.fillText("One word. Three faiths.", W - 96, H - 96);
      return new Promise(function (res) {
        cv.toBlob(res, "image/png");
      });
    };
    var go = async function () {
      var blob = await make();
      if (!blob) {
        setMsg("Could not make the image.");
        return;
      }
      var file = new File([blob], "rhema-ai-" + w.term + ".png", {
        type: "image/png"
      });
      try {
        if (navigator.canShare && navigator.canShare({
          files: [file]
        })) {
          await navigator.share({
            files: [file]
          });
          setMsg("Shared.");
          return;
        }
      } catch (x) {
        if (x && x.name === "AbortError") return;
      }
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4000);
      setMsg("Saved to your downloads.");
    };
    var ic = e("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, e("rect", {
      x: 3,
      y: 4,
      width: 18,
      height: 16,
      rx: 2
    }), e("circle", {
      cx: 9,
      cy: 10,
      r: 2
    }), e("path", {
      d: "M21 16l-5-5-9 9"
    }));
    return e("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "0 4px"
      }
    }, e("button", {
      type: "button",
      onClick: go,
      className: "ca-save",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 36,
        padding: 0,
        background: "none",
        border: 0,
        cursor: "pointer",
        font: "600 13px/1.3 var(--font-body)",
        color: "var(--text-muted)",
        textDecoration: "underline",
        textUnderlineOffset: 3
      }
    }, ic, "Save as image"), msg ? e("span", {
      role: "status",
      style: {
        font: "400 13px/1.3 var(--font-body)",
        color: "var(--text-muted)"
      }
    }, msg) : null);
  };
  (function () {
    if (document.getElementById("ca-mic-css")) return;
    var s = document.createElement("style");
    s.id = "ca-mic-css";
    s.textContent = "@keyframes ca-mic-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--lamp-400) 45%,transparent)}100%{box-shadow:0 0 0 10px transparent}}.ca-mic-on{animation:ca-mic-pulse 1.6s ease-out infinite}.ca-mic-btn{transition:border-color 200ms var(--ease-out),background 200ms var(--ease-out),transform 120ms var(--ease-out)}.ca-mic-btn:hover{border-color:var(--border-strong)!important}.ca-mic-btn:active,.ca-save:active{transform:scale(.96)}.ca-mic:focus-visible,.ca-save:focus-visible{outline:2px solid var(--lamp-400);outline-offset:2px}.ca-mic:hover,.ca-save:hover{color:var(--text-body)!important}@media (prefers-reduced-motion:reduce){.ca-mic-on{animation:none}}";
    (document.head || document.documentElement).appendChild(s);
  })();
  window.CACrisisLine = {
    Bangladesh: ["999", "national emergency"],
    India: ["112", "emergency"],
    Nepal: ["1166", "suicide prevention line"],
    "Sri Lanka": ["1926", "mental health helpline"],
    "United States": ["988", "Suicide & Crisis Lifeline"]
  };
  // Light / medium taps. Phones with vibration only; never on errors, blocked or the plain page.
  window.CAHaptic = function (kind) {
    try {
      if (!navigator.vibrate) return;
      if (document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      navigator.vibrate(kind === "medium" ? 18 : 8);
    } catch (e) {}
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/confirm.js", error: String((e && e.message) || e) }); }

// ui_kits/guard.js
try { (() => {
(() => {
  const INJ = /\b(ignore|disregard|forget|override|bypass|skip)\b[\s\S]{0,30}\b(rules?|instructions?|guardrails?|prompts?|polic(y|ies)|filters?)\b|system prompt|jailbreak|developer mode|pretend (you are|to be)|act as (an? )?(ai|model|assistant)|reveal (your|the) (prompt|key|secret)|api key/i;
  const forced = new URLSearchParams(location.hash.slice(1)).get("state");
  const rid = () => "req_" + Math.random().toString(16).slice(2, 8) + Date.now().toString(16).slice(-4);
  const MSG = {
    loading: [null, null],
    empty: ["Nothing here yet", "There is nothing to show on this screen yet."],
    error: ["Something went wrong", "The service did not answer. Try again."],
    unavailable: ["Unavailable right now", "This part is switched off for the moment. Nothing you did caused it."],
    blocked: ["Blocked", null]
  };
  function State({
    kind,
    onRetry
  }) {
    const DS = window.ChurchAIDesignSystem_06db43;
    const [t, m] = MSG[kind] || MSG.error;
    const id = React.useMemo(rid, []);
    const k = kind === "blocked" ? "unavailable" : kind;
    return React.createElement("div", {
      style: {
        maxWidth: "var(--content-read)",
        width: "100%",
        margin: "0 auto",
        padding: "32px var(--gutter-phone)"
      }
    }, React.createElement(DS.StateBlock, {
      kind: k,
      title: t || undefined,
      message: kind === "blocked" ? `This action was blocked. Nothing was saved or sent. Request id: ${id}` : m || undefined,
      onRetry: kind === "error" ? onRetry || (() => location.reload()) : undefined
    }));
  }
  const CRISIS = /(kill myself|end my life|suicid\w*|can.?t go on|want to die|no reason to live|hurt myself|self[- ]?harm|better off dead)/i;
  const PII = [/[\w.+-]+@[\w-]+\.[\w.]+/g, /\+?\d[\d\s().-]{7,}\d/g, /\b\d{1,5}\s+[A-Za-z]+\s+(road|rd|street|st|lane|ln|avenue|ave|block)\b/gi, /\bmy name is\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?/g];
  const pii = s => PII.reduce((n, re) => n + (String(s || "").match(re) || []).length, 0);
  const redact = s => PII.reduce((t, re) => t.replace(re, "[removed]"), String(s || ""));
  const plainURL = new URL("../plain.html", location.href).href;
  const plain = () => {
    try {
      sessionStorage.clear();
    } catch (e) {}
    location.replace(plainURL);
  };
  const offline = () => forced === "offline" || navigator.onLine === false;
  // Demo mode: inside the Full Demo board (or #demo=1) states resolve instantly — no spinners in front of judges.
  try {
    window.CA_DEMO = window.self !== window.top || /(^|[#&])demo=1/.test(location.hash);
  } catch (e) {
    window.CA_DEMO = true;
  }
  window.CAGuard = {
    plain,
    offline,
    injection: s => INJ.test(String(s || "")),
    crisis: s => CRISIS.test(String(s || "")),
    pii,
    redact,
    reqId: rid,
    forced: () => forced,
    State
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/guard.js", error: String((e && e.message) || e) }); }

// ui_kits/i18n.js
try { (() => {
// Interface translation for all 3 layers. Covers interface text only: labels, buttons, messages.
// Content (definitions, Faith mode text, sources, verses, what people type) is never machine-translated.
// Mark content with data-no-tr. Strings come from the reviewed list in confirm.js (CA_TR), then a cached
// draft list per language. Every draft needs native-speaker review before launch: see contract/i18n.md.
(function () {
  var NAMES = {
    hi: "Hindi",
    bn: "Bengali",
    ne: "Nepali",
    my: "Burmese (Myanmar)",
    km: "Khmer"
  };
  var orig = new WeakMap(),
    origAttr = new WeakMap(),
    ATTRS = ["aria-label", "placeholder", "title"];
  var pending = {},
    timer = null,
    busy = false,
    applying = false,
    fails = 0;
  var KEEP = {
    church: 1,
    ai: 1,
    "Rhema.ai": 1,
    "Rhema.ai": 1,
    "Planning Center": 1
  };
  function lang() {
    return window.CA_LANG || "en";
  }
  function cache(l) {
    try {
      var c = JSON.parse(localStorage.getItem("ca_tr_" + l)) || {};
      Object.keys(KEEP).forEach(function (k) {
        delete c[k];
      });
      return c;
    } catch (e) {
      return {};
    }
  }
  function save(l, c) {
    try {
      localStorage.setItem("ca_tr_" + l, JSON.stringify(c));
    } catch (e) {}
  }
  function wanted(s) {
    return s && !KEEP[s] && s.length > 1 && s.length < 220 && /[A-Za-z]{2}/.test(s) && !/^[\w.+-]+@|^https?:|^[A-Z]-\d|^[\d\s·.,:%/-]+$/.test(s);
  }
  function skip(el) {
    return !el || el.closest("[data-no-tr],[aria-label*=\"Rhema.ai\" i],[aria-label*=\"Rhema.ai\"],[data-wordmark],script,style,code,pre,textarea,input,select,option,svg,[contenteditable],[lang]:not(html)");
  }
  function look(s, l, c) {
    var r = window.CAtr ? window.CAtr(s) : s;
    if (r !== s) return r;
    if (c[s]) return c[s];
    pending[s] = 1;
    if (fails > 2 && Object.keys(pending).length === 1) fails = 0;
    return null;
  }
  function apply() {
    if (applying || !document.body) return;
    applying = true;
    var l = lang(),
      c = l === "en" ? null : cache(l);
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT),
      n;
    while (n = w.nextNode()) {
      if (skip(n.parentElement)) continue;
      if (!orig.has(n) || n.nodeValue !== orig.get(n).en && n.nodeValue !== orig.get(n).out) orig.set(n, {
        en: n.nodeValue,
        out: null
      });
      var o = orig.get(n),
        en = o.en,
        core = en.trim();
      if (l === "en") {
        if (n.nodeValue !== en) n.nodeValue = en;
        o.out = null;
        continue;
      }
      if (!wanted(core)) continue;
      var t = look(core, l, c);
      if (t) {
        var v = en.replace(core, t);
        if (n.nodeValue !== v) n.nodeValue = v;
        o.out = v;
      }
    }
    document.querySelectorAll("[aria-label],[placeholder],[title]").forEach(function (el) {
      if (el.closest("[data-no-tr]")) return;
      var m = origAttr.get(el) || {};
      origAttr.set(el, m);
      ATTRS.forEach(function (a) {
        var cur = el.getAttribute(a);
        if (cur == null) return;
        if (!(a in m) || cur !== m[a].en && cur !== m[a].out) m[a] = {
          en: cur,
          out: null
        };
        if (l === "en") {
          if (cur !== m[a].en) el.setAttribute(a, m[a].en);
          return;
        }
        if (!wanted(m[a].en)) return;
        var t = look(m[a].en, l, c);
        if (t && cur !== t) {
          el.setAttribute(a, t);
          m[a].out = t;
        }
      });
    });
    applying = false;
    if (l !== "en" && Object.keys(pending).length) {
      clearTimeout(timer);
      timer = setTimeout(fetchDrafts, 500);
    }
  }
  async function fetchDrafts() {
    var l = lang();
    if (l === "en" || !(window.claude && window.claude.complete)) {
      pending = {};
      return;
    }
    if (busy) {
      clearTimeout(timer);
      timer = setTimeout(fetchDrafts, 400);
      return;
    }
    var all = Object.keys(pending),
      c0 = cache(l);
    all = all.filter(function (k) {
      return !c0[k];
    });
    var list = all.slice(0, 16);
    list.forEach(function (k) {
      delete pending[k];
    });
    if (!list.length) return;
    busy = true;
    var got = 0;
    try {
      var p = "Translate these app interface strings from English into " + NAMES[l] + ". This is a calm, respectful faith-vocabulary app for pastors and students. Keep these exactly as written: Rhema.ai, Planning Center, numbers, ids, and religious terms such as karma, dharma, moksha, nirvana, saṃsāra, mūrti, deva, Theravāda, avatāra, anattā. Use plain everyday words, polite register. Reply ONLY with a JSON object mapping each English string to its translation.\n\n" + JSON.stringify(list);
      var r = await Promise.race([window.claude.complete(p), new Promise(function (_, no) {
        setTimeout(function () {
          no(new Error("timeout"));
        }, 20000);
      })]);
      var c = cache(l),
        re = /"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g,
        mm;
      while (mm = re.exec(String(r || ""))) {
        try {
          var k = JSON.parse('"' + mm[1] + '"'),
            v = JSON.parse('"' + mm[2] + '"');
          if (!KEEP[k] && v.trim() && list.indexOf(k) >= 0) {
            c[k] = v;
            got++;
          }
        } catch (x) {}
      }
      if (got) save(l, c);
    } catch (e) {}
    busy = false;
    if (!got) {
      fails++;
      if (fails <= 2) list.forEach(function (k) {
        pending[k] = 1;
      });
    } else fails = 0;
    if (fails > 2) setTimeout(function () {
      fails = 0;
    }, 15000);
    if (lang() === l) apply();
    if (Object.keys(pending).length) {
      clearTimeout(timer);
      timer = setTimeout(fetchDrafts, got ? 200 : 1500);
    }
  }
  var obs = new MutationObserver(function () {
    if (!applying) {
      clearTimeout(window.__caTrT);
      window.__caTrT = setTimeout(apply, 60);
    }
  });
  function start() {
    document.documentElement.lang = lang();
    loadFile(lang()).then(apply);
    apply();
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });
  }
  window.addEventListener("ca-lang", function () {
    var l = lang();
    document.documentElement.lang = l;
    note(l);
    loadFile(l).then(apply);
    apply();
  });
  window.addEventListener("storage", function (e) {
    if (e.key === "ca_lang") {
      window.CA_LANG = e.newValue || "en";
      window.dispatchEvent(new Event("ca-lang"));
    }
  });
  // Ready-made language files (ui_kits/i18n/<lang>.json). Loaded first so switching is instant and works offline.
  var BASE = document.currentScript && document.currentScript.src || location.href,
    files = {};
  function loadFile(l) {
    if (l === "en" || files[l]) return Promise.resolve();
    files[l] = fetch(new URL("i18n/" + l + ".json", BASE)).then(function (r) {
      return r.ok ? r.json() : {};
    }).then(function (j) {
      var c = cache(l);
      Object.keys(j || {}).forEach(function (k) {
        if (!KEEP[k] && typeof j[k] === "string") c[k] = j[k];
      });
      save(l, c);
    }).catch(function () {});
    return files[l];
  }
  function note(l) {
    if (l === "en") return;
    var n = (window.CA_LANGS || []).find(function (x) {
      return x[0] === l;
    });
    if (!n) return;
    var el = document.createElement("div");
    el.setAttribute("role", "status");
    el.setAttribute("data-no-tr", "");
    el.lang = l;
    el.textContent = n[1];
    el.style.cssText = "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:300;padding:10px 16px;border-radius:999px;background:var(--surface-raised);border:1px solid var(--border-default);color:var(--text-strong);font:600 16px/1.3 var(--font-body);box-shadow:var(--elev-3,0 8px 24px rgba(0,0,0,.35));transition:opacity .3s ease;pointer-events:none";
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
    }, 900);
    setTimeout(function () {
      el.remove();
    }, 1300);
  }
  function collect() {
    var out = {},
      w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT),
      n;
    var add = function (t) {
      t = (t || "").trim();
      if (wanted(t) && !(window.CAtr && window.CAtr(t) !== t)) out[t] = 1;
    };
    while (n = w.nextNode()) {
      if (!skip(n.parentElement)) add(orig.has(n) ? orig.get(n).en : n.nodeValue);
    }
    document.querySelectorAll("[aria-label],[placeholder],[title]").forEach(function (el) {
      if (el.closest("[data-no-tr]")) return;
      ATTRS.forEach(function (a) {
        var m = origAttr.get(el);
        add(m && m[a] ? m[a].en : el.getAttribute(a));
      });
    });
    return Object.keys(out);
  }
  window.CAi18n = {
    apply: apply,
    cache: cache,
    collect: collect,
    pending: function () {
      return Object.keys(pending).length + (busy ? 1 : 0);
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);else start();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/i18n.js", error: String((e && e.message) || e) }); }

// ui_kits/input.js
try { (() => {
// Shared front-end checks for anything a person types. The server repeats every one of these; these only give fast, kind feedback.
(function () {
  const LIMITS = {
    answer: [3, 280],
    checkin: [3, 500],
    alertNote: [0, 140],
    report: [3, 280],
    expert: [10, 1200]
  };
  const letters = s => (s.match(/\p{L}/gu) || []).length;
  function gibberish(t) {
    const s = String(t || "").trim();
    if (!s) return false;
    if (letters(s) < 2) return true; // emoji / punctuation only
    if (/(.)\1{4,}/u.test(s)) return true; // aaaaa
    const words = s.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length >= 3 && new Set(words).size === 1) return true; // same word repeated
    const w = s.replace(/[^\p{L}]/gu, "");
    if (w.length >= 6 && !/[aeiouyāīūēōṛ]/i.test(w)) return true; // asdfgh, qwrtpz
    if (/^(asdf|qwer|zxcv|hjkl|jkl;)/i.test(w)) return true;
    return false;
  }
  function check(kind, text, extra) {
    const [min, max] = LIMITS[kind] || [0, 1000],
      s = String(text || "").trim();
    if (extra && extra.optional && !s) return {
      ok: true
    };
    if (s.length > max) return {
      ok: false,
      why: "long",
      msg: `Keep it under ${max} characters.`
    };
    if (s.length < min) return {
      ok: false,
      why: "short",
      msg: "Write a few words."
    };
    if (gibberish(s)) return {
      ok: false,
      why: "unclear",
      msg: "That doesn’t read as words yet. Try a short sentence."
    };
    return {
      ok: true
    };
  }
  // Rate limit per device: e.g. report once per word, 5 sends per hour.
  function allow(key, perHour) {
    const k = "ca_rate_" + key;
    const now = Date.now();
    let a;
    try {
      a = JSON.parse(localStorage.getItem(k)) || [];
    } catch (e) {
      a = [];
    }
    a = a.filter(t => now - t < 3600000);
    if (a.length >= perHour) return false;
    a.push(now);
    localStorage.setItem(k, JSON.stringify(a));
    return true;
  }
  window.CAInput = {
    LIMITS,
    gibberish,
    check,
    allow
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/input.js", error: String((e && e.message) || e) }); }

// ui_kits/landing/Landing.jsx
try { (() => {
const {
  TextField: LpField,
  Button: LpButton,
  Icon: LpIcon,
  Wordmark: LpWordmark
} = window.ChurchAIDesignSystem_06db43;
const lpReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const lpTrad = {
  Hindu: "hindu",
  Buddhist: "buddhist",
  Christian: "christian"
};
const lpApp = "../public/index.html";
const lpLex = t => window.CA_DATA.lexicon.find(x => x.term === t);
function useWideLp(bp) {
  const [w, setW] = React.useState(innerWidth >= bp);
  React.useEffect(() => {
    const f = () => setW(innerWidth >= bp);
    addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);
  return w;
}

// Hero: the word page building itself. Runs once per word, ~3s. Chips replay it.
function WordDemo() {
  const words = ["karma", "grace", "salvation", "dharma"];
  const [word, setWord] = React.useState("karma");
  const [t, setT] = React.useState(lpReduce() ? 99 : 0);
  const e = lpLex(word);
  React.useEffect(() => {
    if (lpReduce()) {
      setT(99);
      return;
    }
    setT(0);
    let s = 0;
    const id = setInterval(() => {
      s++;
      setT(s);
      if (s > 30) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [word]);
  const typed = word.slice(0, Math.min(word.length, Math.floor(t / 1.4)));
  const typing = typed.length < word.length;
  const at = n => t >= n;
  const step = n => ({
    opacity: at(n) ? 1 : 0,
    transform: at(n) ? "none" : "translateY(6px)",
    transition: "opacity 260ms var(--ease-out), transform 260ms var(--ease-out)"
  });
  const src = e && e.sources && e.sources[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "stretch",
      width: "100%",
      maxWidth: 380,
      justifySelf: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=term&t=${word}`,
    "aria-label": `Open ${word} in the dictionary`,
    className: "lp-card",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: 20,
      minHeight: 380,
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-card)",
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 16px",
      borderRadius: 999,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(LpIcon, {
    name: "search",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 18px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, typed, /*#__PURE__*/React.createElement("span", {
    style: {
      display: typing ? "inline-block" : "none",
      width: 2,
      height: 18,
      marginLeft: 2,
      verticalAlign: "-3px",
      background: "var(--lamp-400)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...step(9),
      font: "800 64px/.9 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      overflowWrap: "anywhere"
    }
  }, word), /*#__PURE__*/React.createElement("div", {
    style: {
      ...step(12),
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "italic 400 16px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, e && e.pos), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-body)",
      textWrap: "pretty"
    }
  }, e && e.def)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, (e ? e.used : []).map((u, i) => /*#__PURE__*/React.createElement("span", {
    key: u,
    style: {
      opacity: at(16 + i * 3) ? 1 : 0,
      transform: at(16 + i * 3) ? "none" : "scale(1.15)",
      transition: "opacity 180ms var(--ease-out), transform 220ms var(--ease-out)",
      height: 28,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      background: `var(--trad-${lpTrad[u]}-tint)`,
      color: `var(--trad-${lpTrad[u]})`,
      font: "600 13px/1 var(--font-body)"
    }
  }, u))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...step(23),
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, e && e.used.length > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 18px/1.25 var(--font-body)",
      color: "var(--lamp-400)"
    }
  }, "Same word. Not the same concept."), src && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--info-400)",
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(LpIcon, {
    name: "link-2",
    size: 16
  }), src.work, " ", src.reference))), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Try a word",
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, words.map(w => /*#__PURE__*/React.createElement("button", {
    key: w,
    onClick: () => setWord(w),
    "aria-pressed": w === word,
    className: "lp-chip",
    style: {
      height: 40,
      padding: "0 16px",
      borderRadius: 999,
      border: "1px solid " + (w === word ? "var(--bone-8)" : "var(--border-default)"),
      background: w === word ? "var(--bone-8)" : "transparent",
      color: w === word ? "var(--ink-0)" : "var(--text-body)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, w))));
}

// "What you get": four real snippets of the product. Still, no rail.
function FlowStrip({
  wide,
  lk
}) {
  const steps = [{
    k: "Look up a word",
    d: "Know what a word means to each faith.",
    href: `${lpApp}#r=search`,
    prev: "search"
  }, {
    k: "See who uses it",
    d: "See where the traditions meet and part, with the source.",
    href: `${lpApp}#r=term&t=karma`,
    prev: "tags"
  }, ...(lk ? [] : [{
    k: "Answer one question",
    d: "Once a month. No account, no name.",
    href: `${lpApp}#r=month`,
    prev: "question"
  }, {
    k: "See the map of ideas",
    d: "Counts of ideas, published by a person.",
    href: `${lpApp}#r=graph`,
    prev: "map"
  }])];
  const tag = (t, c) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      height: 24,
      padding: "0 10px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      background: `var(--trad-${c}-tint)`,
      color: `var(--trad-${c})`,
      font: "600 13px/1 var(--font-body)"
    }
  }, t);
  const Prev = ({
    p
  }) => /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      padding: "0 12px",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)"
    }
  }, p === "search" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LpIcon, {
    name: "search",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 16px/1 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "karma")), p === "tags" && [tag("Hindu", "hindu"), tag("Buddhist", "buddhist"), tag("Christian", "christian")], p === "question" && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 13px/1.25 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "What does ", /*#__PURE__*/React.createElement("u", {
    style: {
      color: "var(--lamp-400)",
      textUnderlineOffset: "0.12em"
    }
  }, "faith"), " mean to you?"), p === "map" && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 44",
    width: "100%",
    height: "44"
  }, [[22, 22, 12, 0], [52, 16, 8, 0], [74, 28, 10, 1], [98, 18, 6, 0], [40, 34, 5, 0]].map(([x, y, r, nw], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x,
    cy: y,
    r: r,
    fill: nw ? "var(--lamp-400)" : "var(--ink-4)",
    stroke: nw ? "none" : "var(--bone-7)",
    strokeWidth: "1"
  }))));
  return /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "lp-flow",
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "40px var(--gutter-phone) 24px",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "lp-flow",
    style: {
      margin: 0,
      font: "800 clamp(34px,7vw,48px)/1 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, "What you get."), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: wide ? `repeat(${steps.length},minmax(0,1fr))` : "minmax(0,1fr)",
      gap: 16
    }
  }, steps.map(st => /*#__PURE__*/React.createElement("li", {
    key: st.k,
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: st.href,
    className: "lp-card",
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 16,
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-card)",
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement(Prev, {
    p: st.prev
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 18px/1.25 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, st.k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, st.d))))));
}
function TourCard({
  wide
}) {
  const ref = React.useRef(null);
  const [load, setLoad] = React.useState(false);
  const rm = lpReduce();
  React.useEffect(() => {
    if (rm) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        setLoad(true);
        io.disconnect();
      }
    }, {
      rootMargin: "200px"
    });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "aria-labelledby": "lp-tour",
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "24px var(--gutter-phone)",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "lp-tour",
    style: {
      margin: 0,
      font: "800 clamp(28px,6vw,40px)/1 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      flex: "1 1 auto"
    }
  }, "See it in one minute."), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "No sound.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: wide ? "100%" : "min(100%, 420px)",
      alignSelf: "center",
      aspectRatio: wide ? "16 / 9" : "9 / 16",
      maxHeight: wide ? "none" : "78svh",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--border-subtle)",
      background: "var(--ink-0)"
    }
  }, load ? /*#__PURE__*/React.createElement("iframe", {
    title: "Rhema.ai one-minute tour",
    src: `../tour/index.html#layout=${wide ? "16:9" : "9:16"}`,
    loading: "lazy",
    style: {
      width: "100%",
      height: "100%",
      border: 0,
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("a", {
    href: `../tour/index.html#layout=${wide ? "16:9" : "9:16"}`,
    className: "lp-card",
    style: {
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      textDecoration: "none",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 10,
      alignItems: "center",
      font: "700 18px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 56,
      height: 56,
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--lamp-400)",
      color: "var(--ink-0)"
    }
  }, /*#__PURE__*/React.createElement(LpIcon, {
    name: "play",
    size: 24
  })), "Play the tour"))));
}
function lpSpiral(ids) {
  const pos = {};
  ids.forEach((id, i) => {
    const a = i * 2.39996,
      r = 16 + Math.sqrt(i) * 30;
    pos[id] = [Math.cos(a) * r, Math.sin(a) * r * 0.78];
  });
  return pos;
}

// Scroll sequence: content is always there. Entering view flips Aug → Sep once.
function MonthSequence({
  wide
}) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice(-2);
  const [A, B] = pub.length === 2 ? pub : [null, pub[0]];
  const [k, setK] = React.useState(A ? 0 : 1);
  const ref = React.useRef(null),
    anim = React.useRef(0),
    seen = React.useRef(false);
  const go = to => {
    cancelAnimationFrame(anim.current);
    if (lpReduce()) {
      setK(to);
      return;
    }
    const from = k,
      t0 = performance.now();
    const f = now => {
      const p = Math.min(1, (now - t0) / 700),
        e = 1 - Math.pow(1 - p, 3);
      setK(from + (to - from) * e);
      if (p < 1) anim.current = requestAnimationFrame(f);
    };
    anim.current = requestAnimationFrame(f);
  };
  React.useEffect(() => {
    if (!A) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !seen.current) {
        seen.current = true;
        setTimeout(() => go(1), 300);
      }
    }, {
      threshold: 0.4
    });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const W = m => Object.fromEntries((m ? m.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wa = W(A),
    wb = W(B);
  const ids = [...new Set([...Object.keys(wb), ...Object.keys(wa)])].sort((x, y) => (wb[y] || wa[y] || 0) - (wb[x] || wa[x] || 0));
  const val = id => (wa[id] || 0) + ((wb[id] || 0) - (wa[id] || 0)) * k;
  const top = ids.slice(0, 5),
    max = Math.max(...top.map(id => Math.max(wa[id] || 0, wb[id] || 0)));
  const pos = React.useMemo(() => lpSpiral(ids.slice(0, 18)), []);
  const cur = k >= 0.5 ? B : A;
  const isNew = id => A && !wa[id] && wb[id];
  const answers = Math.round((A ? A.answers : 0) + (B.answers - (A ? A.answers : 0)) * k);
  const card = {
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--border-subtle)",
    background: "var(--surface-card)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    minWidth: 0
  };
  const num = {
    font: "700 13px/1 var(--font-mono)",
    color: "var(--text-faint)"
  };
  const h3 = {
    margin: 0,
    font: "var(--type-section)",
    color: "var(--text-strong)"
  };
  const Q = cur.question,
    T = cur.term,
    qi = T ? Q.toLowerCase().indexOf(T) : -1;
  return /*#__PURE__*/React.createElement("section", {
    id: "month",
    ref: ref,
    "aria-labelledby": "lp-month",
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "56px var(--gutter-phone) 72px",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "lp-month",
    style: {
      margin: 0,
      font: "800 clamp(34px,7vw,48px)/1 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, "One question a month."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, "See what people believe this month. We count ideas, never people.")), A && /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Month",
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-raised)"
    }
  }, [[A, 0], [B, 1]].map(([m, v]) => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    onClick: () => go(v),
    "aria-pressed": cur === m,
    style: {
      height: 36,
      flex: "none",
      whiteSpace: "nowrap",
      padding: "0 14px",
      borderRadius: 999,
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      background: cur === m ? "var(--bone-8)" : "transparent",
      color: cur === m ? "var(--ink-0)" : "var(--text-muted)"
    }
  }, m.label)))), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: wide ? "repeat(3,minmax(0,1fr))" : "minmax(0,1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: card
  }, /*#__PURE__*/React.createElement("h3", {
    style: h3
  }, "You answer"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--text-strong)",
      textWrap: "balance"
    }
  }, qi < 0 ? Q : /*#__PURE__*/React.createElement(React.Fragment, null, Q.slice(0, qi), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=term&t=${T}`,
    style: {
      textDecoration: "underline",
      textUnderlineOffset: "0.12em"
    }
  }, T), Q.slice(qi + T.length))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, "No account. Not tied to any pastor."), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=month`,
    className: "lp-link",
    style: {
      marginTop: "auto",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "700 16px/1 var(--font-body)",
      minHeight: 44
    }
  }, "Answer this month ", /*#__PURE__*/React.createElement(LpIcon, {
    name: "arrow-right",
    size: 16
  }))), /*#__PURE__*/React.createElement("li", {
    style: card
  }, /*#__PURE__*/React.createElement("h3", {
    style: h3
  }, "Ideas are counted"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 48px/1 var(--font-display)",
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, answers, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      marginLeft: 8
    }
  }, "answers")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, top.map(id => /*#__PURE__*/React.createElement("li", {
    key: id,
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 20px 36px",
      gap: 10,
      alignItems: "center",
      font: "600 16px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, id), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      placeItems: "center",
      opacity: k >= 0.5 ? 1 : 0
    }
  }, (() => {
    const a = wa[id] || 0,
      b = wb[id] || 0;
    const [ic, c] = isNew(id) ? ["circle-plus", "var(--lamp-400)"] : b > a ? ["arrow-up-right", "var(--ok-400)"] : b < a ? ["arrow-down-right", "var(--text-muted)"] : ["minus", "var(--text-muted)"];
    return /*#__PURE__*/React.createElement(LpIcon, {
      name: ic,
      size: 16,
      color: c
    });
  })()), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1 var(--font-mono)",
      color: "var(--text-muted)",
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round(val(id)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "auto 0 0",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Ideas under 3 mentions never show. No answer text.")), /*#__PURE__*/React.createElement("li", {
    style: card
  }, /*#__PURE__*/React.createElement("h3", {
    style: h3
  }, "A person publishes the map"), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=graph`,
    "aria-label": "Open the ideas map",
    className: "lp-card",
    style: {
      position: "relative",
      display: "block",
      height: 220,
      borderRadius: "var(--radius-md)",
      background: "var(--ink-1)",
      border: "1px solid var(--border-subtle)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "-150 -110 300 220",
    width: "100%",
    height: "100%",
    "aria-hidden": "true"
  }, ids.slice(0, 18).map(id => {
    const v = val(id),
      r = v < 1 ? 0 : 4 + Math.sqrt(v) * 2.6,
      [x, y] = pos[id];
    const nw = isNew(id) && k >= 0.5;
    return /*#__PURE__*/React.createElement("g", {
      key: id,
      transform: `translate(${x} ${y})`
    }, /*#__PURE__*/React.createElement("circle", {
      r: r,
      fill: nw ? "var(--lamp-400)" : "var(--ink-4)",
      stroke: nw ? "none" : "var(--bone-7)",
      strokeWidth: "1"
    }), r > 12 && /*#__PURE__*/React.createElement("text", {
      y: r + 11,
      textAnchor: "middle",
      style: {
        font: "600 13px var(--font-body)",
        fill: "var(--text-body)"
      }
    }, id));
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, "Bigger = said more. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--lamp-400)",
      fontWeight: 700
    }
  }, "Lime"), " = new this month."), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=graph`,
    className: "lp-link",
    style: {
      marginTop: "auto",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "700 16px/1 var(--font-body)",
      minHeight: 44
    }
  }, "Open the map ", /*#__PURE__*/React.createElement(LpIcon, {
    name: "arrow-right",
    size: 16
  })))));
}
function Landing() {
  const wide = useWideLp(900);
  const lk = window.CAGuard.lockdown();
  const [solid, setSolid] = React.useState(scrollY > 8);
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    const f = () => setSolid(scrollY > 8);
    addEventListener("scroll", f, {
      passive: true
    });
    return () => removeEventListener("scroll", f);
  }, []);
  const submit = ev => {
    ev.preventDefault();
    const t = q.trim().toLowerCase();
    if (!t) return;
    location.href = lpLex(t) ? `${lpApp}#r=term&t=${encodeURIComponent(t)}` : `${lpApp}#r=search`;
  };
  const nav = [["Dictionary", "#top"], ...(lk ? [] : [["This month", "#month"]]), ["For pastors", "../pipeline/index.html"]];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 var(--gutter-phone)",
      background: solid ? "color-mix(in srgb, var(--ink-0) 94%, transparent)" : "transparent",
      borderBottom: "1px solid " + (solid ? "var(--border-subtle)" : "transparent"),
      backdropFilter: solid ? "blur(10px)" : "none",
      transition: "background 200ms var(--ease-out), border-color 200ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "Rhema.ai home",
    style: {
      display: "flex",
      alignItems: "center",
      minHeight: 44,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(LpWordmark, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), wide && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: "flex",
      gap: 4
    }
  }, nav.map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    className: "lp-nav",
    style: {
      height: 40,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      font: "600 16px/1 var(--font-body)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=signin`,
    className: "lp-nav",
    style: {
      height: 44,
      padding: "0 8px",
      display: "inline-flex",
      alignItems: "center",
      font: "600 16px/1 var(--font-body)",
      color: "var(--text-body)",
      textDecoration: "none"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(LpButton, {
    size: "sm",
    variant: solid ? "accent" : "secondary",
    onClick: () => location.href = `${lpApp}#r=intro&step=1`
  }, "Get started")), /*#__PURE__*/React.createElement("main", {
    id: "top"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: wide ? "40px var(--gutter-phone) 24px" : "20px var(--gutter-phone) 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: wide ? 40 : 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: 720,
      width: "100%",
      alignItems: wide ? "center" : "stretch",
      textAlign: wide ? "center" : "left"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "800 clamp(52px,13vw,96px)/.92 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      textWrap: "balance"
    }
  }, "One word. Three faiths."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 18,
      lineHeight: 1.5,
      color: "var(--text-body)",
      textWrap: "pretty"
    }
  }, "Look up a word to see what it means in Hindu, Buddhist and Christian traditions. Free. Side by side, with sources, so the same word is not mistaken for the same idea. No account."), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: wide ? "row" : "column",
      gap: 10,
      alignItems: wide ? "flex-end" : "stretch",
      width: "100%",
      maxWidth: 560,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(LpField, {
    label: "Word",
    size: "lg",
    icon: "search",
    type: "search",
    placeholder: "karma",
    value: q,
    onChange: e => setQ(e.target.value),
    autoComplete: "off"
  })), /*#__PURE__*/React.createElement(LpButton, {
    type: "submit",
    variant: "accent",
    size: "lg"
  }, "Search a word"))), /*#__PURE__*/React.createElement(WordDemo, null)), !lk && /*#__PURE__*/React.createElement(TourCard, {
    wide: wide
  }), !lk && /*#__PURE__*/React.createElement(MonthSequence, {
    wide: wide
  })), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      padding: "24px var(--gutter-phone) 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "We map ideas, never people."), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Footer",
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap"
    }
  }, [...nav.slice(1), ["Continue as guest", `${lpApp}#guest=1&r=search`], ["Create account", `${lpApp}#r=signin&mode=register`], ["For churches · Planning Center", "../pipeline/index.html#r=integrations"], ["What we store", `${lpApp}#r=settings&as=guest`]].map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    className: "lp-nav",
    style: {
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none"
    }
  }, l)), /*#__PURE__*/React.createElement("a", {
    href: `${lpApp}#r=status`,
    className: "lp-nav",
    style: {
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none"
    }
  }, "System status")))));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/messy.js
try { (() => {
// Messy-data mode: add #messy=1 to any kit URL (#messy=0 to leave). Loads ugly data on purpose
// so layout breaks show up before real data does. Stays on for this tab until turned off.
(function () {
  var h = new URLSearchParams(location.hash.slice(1)).get("messy");
  try {
    if (h === "1") sessionStorage.setItem("ca_messy", "1");
    if (h === "0") sessionStorage.removeItem("ca_messy");
  } catch (e) {}
  var on = false;
  try {
    on = sessionStorage.getItem("ca_messy") === "1";
  } catch (e) {}
  window.CA_MESSY = on;
  if (!on) return;
  var LONG = "Living Water Fellowship of the Greater Mirpur, Pallabi and Kafrul Area Congregations";
  var REG = "Bangladesh — Dhaka Division, Mirpur-Pallabi-Kafrul Upazila Cluster";
  var D = window.CA_DATA,
    P = window.CA_PIPE;
  if (D) {
    D.lexicon.forEach(function (e, i) {
      if (i === 0) e.def = e.def + " In some schools it also names the unseen residue that actions leave, carried across lifetimes until it ripens, which is why the same word can point to a law, a process and a moral account at once.";
      if (i === 1) {
        e.sources = [];
        e.pos = "";
      }
    });
    D.lexicon.push({
      term: "pratītyasamutpāda-and-interdependence",
      pos: "noun",
      def: "",
      used: ["Buddhist"],
      sources: []
    });
    D.months.forEach(function (m) {
      if (m.published && m.nodes) m.nodes.push(["forgiveness-and-reconciliation-in-families", 7], ["x", 3]);
    });
  }
  if (P) {
    P.me.church = LONG;
    P.me.region = REG;
    var base = P.queue.slice();
    for (var i = 0; i < 44; i++) {
      var q = JSON.parse(JSON.stringify(base[i % base.length]));
      q.id = "P-" + (1000 + i);
      q.region = i % 3 ? REG : q.region;
      if (i % 5 === 0) q.enc = "";
      P.queue.push(q);
    }
    P.me.history = P.me.history.concat([["Aug 2026", "Leadership review: Additional review requested because the monthly pack was missing feedback from two of three church leaders"]]);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/messy.js", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/ChurchScreens.jsx
try { (() => {
const {
  Card: CsCard,
  Button: CsButton,
  Badge: CsBadge,
  Icon: CsIcon,
  TextField: CsField,
  TextArea: CsArea,
  Select: CsSelect,
  Switch: CsSwitch,
  SegmentedControl: CsSeg,
  StateBlock: CsState
} = window.ChurchAIDesignSystem_06db43;
const csP = {
  font: "var(--type-body)",
  color: "var(--text-muted)",
  margin: 0,
  textWrap: "pretty"
};
const csRegions = [["Bangladesh", "Dhaka Division"], ["Bangladesh", "Rajshahi Division"], ["India", "Odisha"], ["Nepal", "Koshi Province"], ["Sri Lanka", "Central Province"]];
const csCountries = [...new Set(csRegions.map(r => r[0]))];
function csChurch() {
  try {
    return JSON.parse(localStorage.getItem("ca_church"));
  } catch (e) {
    return null;
  }
}
function csCode() {
  const A = "ACDEFHJKMNPRTVWXY3479";
  let s = "";
  for (let i = 0; i < 9; i++) s += A[Math.floor(Math.random() * A.length)] + (i === 2 || i === 5 ? "-" : "");
  return s;
}
function RegisterChurch({
  done
}) {
  const [f, setF] = React.useState({
    name: "",
    country: "Bangladesh",
    region: "Dhaka Division"
  });
  const [phase, setPhase] = React.useState("form");
  const [err, setErr] = React.useState(null);
  const [code, setCode] = React.useState("");
  const regions = csRegions.filter(r => r[0] === f.country).map(r => r[1]);
  const submit = e => {
    e.preventDefault();
    if (!f.name.trim()) {
      setErr("Enter the church name.");
      return;
    }
    setErr(null);
    setPhase("sending");
    setTimeout(() => setPhase("waiting"), 700);
  };
  const approve = () => {
    let c = csCode();
    while (f.name && c.replace(/-/g, "").includes(f.name.slice(0, 3).toUpperCase())) c = csCode();
    setCode(c);
    setPhase("approved");
  };
  if (phase === "waiting") return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Register a church"), /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Waiting for a person to approve."), /*#__PURE__*/React.createElement("p", {
    style: csP
  }, "You can close this page. Nothing is listed publicly."), /*#__PURE__*/React.createElement("details", {
    "data-demo": "",
    style: {
      borderTop: "1px dashed var(--border-default)",
      paddingTop: 10,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      fontWeight: 600
    }
  }, "Demo controls"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(CsButton, {
    variant: "ghost",
    size: "sm",
    onClick: approve
  }, "Approve as admin"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      marginTop: 6
    }
  }, "A person approves this in real use."))));
  if (phase === "approved") return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Approved"), /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Your join code"), /*#__PURE__*/React.createElement("div", {
    "aria-label": "Join code",
    style: {
      font: "700 32px/1 var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--text-strong)",
      padding: 20,
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-card)",
      textAlign: "center"
    }
  }, code), /*#__PURE__*/React.createElement("p", {
    style: csP
  }, "Share it only with pastors in this church."), /*#__PURE__*/React.createElement(CsButton, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => {
      localStorage.setItem("ca_church", JSON.stringify({
        ...f,
        name: f.name.trim(),
        code,
        status: "joined"
      }));
      done();
    }
  }, "Join"));
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      maxWidth: 480,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Register a church"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psH1,
      marginTop: 6
    }
  }, "Your church")), /*#__PURE__*/React.createElement(CsField, {
    label: "Church name",
    value: f.name,
    onChange: e => setF({
      ...f,
      name: e.target.value
    }),
    error: err || undefined,
    autoComplete: "off"
  }), /*#__PURE__*/React.createElement(CsSelect, {
    label: "Country",
    value: f.country,
    onChange: e => {
      const c = e.target.value;
      setF({
        ...f,
        country: c,
        region: csRegions.find(r => r[0] === c)[1]
      });
    },
    options: csCountries.map(c => ({
      value: c,
      label: c
    }))
  }), /*#__PURE__*/React.createElement(CsSelect, {
    label: "Broad region",
    value: f.region,
    onChange: e => setF({
      ...f,
      region: e.target.value
    }),
    options: regions.map(r => ({
      value: r,
      label: r
    })),
    hint: "Used only to send region alerts to the right churches. No street or address."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "600 16px/1.45 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0,
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CsIcon, {
    name: "eye-off",
    size: 18,
    color: "var(--lamp-400)",
    style: {
      flex: "none",
      marginTop: 1
    }
  }), "This church is not listed publicly."), /*#__PURE__*/React.createElement(CsButton, {
    type: "submit",
    variant: "primary",
    size: "lg",
    fullWidth: true,
    loading: phase === "sending"
  }, "Send to an admin for approval"));
}
function CheckinConsent({
  onContinue
}) {
  const [model, setModel] = React.useState(false),
    [plain, setPlain] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Before your first check-in"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psH1,
      marginTop: 6
    }
  }, "What a check-in is")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "A short note on how you are, a few times a week, when you can. No streaks. Your mentor reads it."), /*#__PURE__*/React.createElement("li", null, "If a note sounds hard, a person reads it."), /*#__PURE__*/React.createElement("li", null, "The reviewer does not see your church name.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "16px 0",
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(CsSwitch, {
    label: "The assistant may prepare my review",
    checked: model,
    onChange: setModel
  }), /*#__PURE__*/React.createElement(CsSwitch, {
    label: "After a hard note, show the plain page",
    checked: plain,
    onChange: setPlain
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "You can check in either way."), /*#__PURE__*/React.createElement(CsButton, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: () => onContinue({
      model,
      plain
    })
  }, "Continue"));
}
const csRoles = [["mentor", "Mentor"], ["church", "Church leader"], ["regional", "Regional leader"]];
const csRole = k => (csRoles.find(r => r[0] === k) || [0, "Leader"])[1];
function csAlerts() {
  try {
    return (JSON.parse(localStorage.getItem("ca_alerts")) || []).map(a => ({
      ...a,
      confirmedBy: Array.isArray(a.confirmedBy) ? a.confirmedBy : a.confirmedBy ? [a.confirmedBy] : []
    }));
  } catch (e) {
    return [];
  }
}
function csLog() {
  try {
    return JSON.parse(localStorage.getItem("ca_alert_log")) || [];
  } catch (e) {
    return [];
  }
}
const csWhen = iso => {
  const d = new Date(iso);
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric"
  }) + " · " + d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};
const csAct = {
  raised: ["Raised", "flag"],
  confirmed: ["Confirmed", "check"],
  on: ["Turned on", "power"],
  cleared: ["Cleared", "x"]
};
function CsSteps({
  a
}) {
  const steps = [["Raised", a.raisedBy], ["Confirmed", a.confirmedBy[0]], ["Confirmed", a.confirmedBy[1]]];
  const on = a.status === "on";
  return /*#__PURE__*/React.createElement("ul", {
    "aria-label": "Leaders",
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      gap: 16,
      flexWrap: "wrap"
    }
  }, steps.map(([lab, r], i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 32,
      height: 32,
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: r ? on ? "var(--danger-tint)" : "var(--warn-tint)" : "transparent",
      border: r ? "none" : "1px dashed var(--border-strong)",
      color: r ? on ? "var(--danger-400)" : "var(--warn-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(CsIcon, {
    name: r ? "user-check" : "user",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.3 var(--font-body)",
      color: r ? "var(--text-body)" : "var(--text-muted)"
    }
  }, r ? csRole(r) : "Waiting"))));
}
function AlertsScreen() {
  const wide = window.useWide(900);
  const [list, setListS] = React.useState(csAlerts);
  const [log, setLogS] = React.useState(csLog);
  const write = (l, entry) => {
    setListS(l);
    localStorage.setItem("ca_alerts", JSON.stringify(l));
    const nl = [{
      at: new Date().toISOString(),
      ...entry
    }, ...log];
    setLogS(nl);
    localStorage.setItem("ca_alert_log", JSON.stringify(nl));
    setMsg({
      raised: "Raised. Two more leaders must confirm.",
      confirmed: "Confirmed. One more leader is needed.",
      on: "Turned on.",
      cleared: "Cleared. Everything returns on the next fresh open."
    }[entry.action]);
  };
  const [me, setMe] = React.useState("church");
  const [raise, setRaise] = React.useState(false);
  const [sure, setSure] = React.useState(null);
  const [typedC, setTypedC] = React.useState("");
  const [msg, setMsg] = React.useState(null);
  const [logN, setLogN] = React.useState(6);
  const [f, setF] = React.useState({
    at: "Bangladesh|Dhaka Division",
    note: ""
  });
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(id);
  }, []);
  const where = a => ({
    country: a.country,
    region: a.region
  });
  const taken = f.at.split("|");
  const dup = list.some(x => x.country === taken[0] && x.region === taken[1]);
  const send = e => {
    e.preventDefault();
    if (dup) return;
    {
      const c = window.CAInput.check("alertNote", f.note, {
        optional: true
      });
      if (!c.ok) {
        setMsg(c.msg);
        return;
      }
    }
    const [country, region] = f.at.split("|");
    const al = {
      id: Date.now(),
      country,
      region,
      note: f.note.trim(),
      status: "waiting",
      raisedBy: me,
      confirmedBy: []
    };
    write([al, ...list], {
      action: "raised",
      role: me,
      ...where(al)
    });
    setRaise(false);
    setF({
      ...f,
      note: ""
    });
  };
  const confirm = a => {
    const cb = [...a.confirmedBy, me];
    const on = cb.length >= 2;
    write(list.map(x => x.id === a.id ? {
      ...x,
      confirmedBy: cb,
      status: on ? "on" : "waiting"
    } : x), {
      action: on ? "on" : "confirmed",
      role: me,
      ...where(a)
    });
  };
  const clear = a => {
    write(list.filter(x => x.id !== a.id), {
      action: "cleared",
      role: me,
      ...where(a)
    });
    setSure(null);
  };
  const done = a => a.raisedBy === me || a.confirmedBy.includes(me);
  const nOn = list.filter(x => x.status === "on").length,
    nWait = list.length - nOn;
  const card = {
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-lg)",
    background: "var(--surface-card)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Leaders"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psH1,
      marginTop: 6
    }
  }, "Alerts"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...csP,
      marginTop: 6
    }
  }, list.length ? `${nOn} on · ${nWait} waiting` : "Three leaders turn an alert on. Any leader can clear it.")), !raise && /*#__PURE__*/React.createElement(CsButton, {
    variant: list.some(x => x.status === "waiting") ? "secondary" : "primary",
    icon: "plus",
    onClick: () => setRaise(true)
  }, "Raise an alert")), msg && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(CsIcon, {
    name: "circle-check",
    size: 18,
    color: "var(--ok-400)"
  }), msg), /*#__PURE__*/React.createElement("details", {
    "data-demo": "",
    style: {
      borderTop: "1px dashed var(--border-default)",
      paddingTop: 10,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      fontWeight: 600
    }
  }, "Demo controls"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      paddingTop: 8
    }
  }, "See this screen as ", /*#__PURE__*/React.createElement(CsSeg, {
    size: "sm",
    label: "See this screen as",
    value: me,
    onChange: setMe,
    options: csRoles.map(([v, l]) => ({
      value: v,
      label: l
    }))
  }))), raise && /*#__PURE__*/React.createElement("form", {
    onSubmit: send,
    style: {
      ...card,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Raise an alert"), /*#__PURE__*/React.createElement(CsSelect, {
    label: "Region",
    value: f.at,
    onChange: e => setF({
      ...f,
      at: e.target.value
    }),
    options: csRegions.map(([c, r]) => ({
      value: c + "|" + r,
      label: `${c} · ${r}`
    })),
    error: dup ? "This region already has an alert." : undefined
  }), /*#__PURE__*/React.createElement(CsArea, {
    label: "Note for leaders",
    rows: 2,
    maxLength: 140,
    value: f.note,
    onChange: e => setF({
      ...f,
      note: e.target.value
    }),
    hint: "Leaders only. No names."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.4 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Two more leaders must confirm. Then, until it is cleared:"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Pastors in the region open to a plain page. Everyone else loses Faith mode, the map, the monthly question, check-ins, reviews and registration.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CsButton, {
    type: "submit",
    variant: "primary",
    disabled: dup
  }, "Raise"), /*#__PURE__*/React.createElement(CsButton, {
    type: "button",
    variant: "ghost",
    onClick: () => setRaise(false)
  }, "Cancel"))), !ready ? /*#__PURE__*/React.createElement(CsState, {
    kind: "loading",
    compact: true
  }) : list.length === 0 ? /*#__PURE__*/React.createElement(CsState, {
    kind: "empty",
    compact: true,
    word: "quiet",
    motif: "people",
    title: "No alerts",
    message: "Every region is open as usual."
  }) : /*#__PURE__*/React.createElement("div", {
    role: "list",
    "aria-label": "Alerts",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, list.map(a => /*#__PURE__*/React.createElement("div", {
    role: "listitem",
    key: a.id,
    style: {
      ...card,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      borderColor: a.status === "on" ? "var(--danger-400)" : "var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 220px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, a.country), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 24px/1.2 var(--font-display)",
      color: "var(--text-strong)",
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, a.region)), /*#__PURE__*/React.createElement(CsBadge, {
    tone: a.status === "on" ? "danger" : "warn"
  }, a.status === "on" ? "On" : `Waiting · ${2 - a.confirmedBy.length} more`)), /*#__PURE__*/React.createElement(CsSteps, {
    a: a
  }), a.note && /*#__PURE__*/React.createElement("p", {
    style: {
      ...csP,
      fontSize: 16,
      color: "var(--text-body)",
      padding: 12,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-page)"
    }
  }, a.note), sure === a.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Clear ", a.region, "? Everything returns on the next fresh open."), /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: a.region,
    value: typedC,
    onChange: setTypedC,
    hint: "The clear is kept in the record."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CsButton, {
    size: "sm",
    variant: "danger",
    disabled: !window.CAMatch(typedC, a.region),
    onClick: () => {
      setTypedC("");
      clear(a);
    }
  }, "Clear"), /*#__PURE__*/React.createElement(CsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      setTypedC("");
      setSure(null);
    }
  }, "Keep"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, a.status === "waiting" && /*#__PURE__*/React.createElement(CsButton, {
    size: "sm",
    variant: "primary",
    icon: done(a) ? undefined : "check",
    disabled: done(a),
    onClick: () => confirm(a)
  }, done(a) ? "Needs another leader" : "Confirm"), /*#__PURE__*/React.createElement(CsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => setSure(a.id)
  }, "Clear"))))), /*#__PURE__*/React.createElement("section", {
    "aria-label": "Record",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      color: "var(--text-strong)",
      margin: 0,
      flex: 1
    }
  }, "Record"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, "Kept. Cannot be edited.")), log.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...csP,
      fontSize: 16
    }
  }, "Nothing recorded yet.") : /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...card,
      overflow: "hidden"
    }
  }, log.slice(0, logN).map((l, i) => {
    const [lab, ic] = csAct[l.action] || [l.action, "dot"];
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: wide ? "150px 28px minmax(0,1fr)" : "28px minmax(0,1fr)",
        gap: 10,
        alignItems: "center",
        padding: "10px 14px",
        borderTop: i ? "1px solid var(--border-subtle)" : 0,
        font: "var(--type-body)",
        fontSize: 16,
        color: "var(--text-body)"
      }
    }, wide && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-source)",
        fontFamily: "var(--font-mono)",
        color: "var(--text-faint)"
      }
    }, csWhen(l.at)), /*#__PURE__*/React.createElement(CsIcon, {
      name: ic,
      size: 16,
      color: l.action === "on" ? "var(--danger-400)" : l.action === "cleared" ? "var(--ok-400)" : "var(--text-muted)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-strong)"
      }
    }, lab), " \xB7 ", l.country, " \xB7 ", l.region), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, "by a ", csRole(l.role).toLowerCase(), wide ? "" : " · " + csWhen(l.at))));
  })), log.length > logN && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CsButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => setLogN(logN + 6)
  }, "Load more \xB7 ", log.length - logN, " left"))));
}
function PfUnavailable() {
  const retry = () => {
    const h = new URLSearchParams(location.hash.slice(1));
    h.delete("state");
    location.hash = h.toString();
    location.reload();
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      maxWidth: 480,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "flex-start",
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Unavailable"), /*#__PURE__*/React.createElement(CsButton, {
    variant: "primary",
    icon: "rotate-cw",
    onClick: retry
  }, "Retry"));
}
Object.assign(window, {
  RegisterChurch,
  CheckinConsent,
  AlertsScreen,
  PfUnavailable,
  csChurch,
  csAlerts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/ChurchScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/EmbedPreview.jsx
try { (() => {
const {
  Button: EmButton,
  Icon: EmIcon,
  Badge: EmBadge,
  Toast: EmToast
} = window.ChurchAIDesignSystem_06db43;

// Neutral host chrome: stands for any church app (Planning Center, Breeze…). No host branding is copied.
const emHost = {
  bg: "#F2F4EF",
  card: "#FFFFFF",
  line: "#DCE1D6",
  ink: "#1C231A",
  muted: "#4D5646"
};
const emChurchMap = {
  answers: 38,
  min: 20,
  ideas: [["family", 9], ["hope", 7], ["trust", 6], ["prayer", 5], ["doubt", 4, 1], ["community", 3]]
};
const emSlots = [[150, 92], [84, 58], [220, 62], [96, 130], [210, 128], [150, 30]];
function EmCard({
  title,
  icon,
  children,
  foot
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 32,
      height: 32,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-raised)",
      color: "var(--lamp-400)"
    }
  }, /*#__PURE__*/React.createElement(EmIcon, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-section)",
      fontSize: 18,
      color: "var(--text-strong)"
    }
  }, title)), children, foot && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, foot));
}
function EmbedPreview({
  back,
  provider = "Planning Center"
}) {
  const [small, setSmall] = React.useState(false);
  const [leader, setLeader] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);
  const m = small ? {
    ...emChurchMap,
    answers: 12
  } : emChurchMap;
  const enough = m.answers >= m.min;
  const max = Math.max(...m.ideas.map(i => i[1]));
  const word = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const seg = (val, set, a, b) => /*#__PURE__*/React.createElement("div", {
    role: "group",
    style: {
      display: "flex",
      gap: 4,
      padding: 3,
      borderRadius: 999,
      border: `1px solid ${emHost.line}`,
      background: emHost.card
    }
  }, [[false, a], [true, b]].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => set(v),
    "aria-pressed": val === v,
    style: {
      height: 32,
      padding: "0 12px",
      flex: "none",
      whiteSpace: "nowrap",
      borderRadius: 999,
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      background: val === v ? emHost.ink : "transparent",
      color: val === v ? "#fff" : emHost.muted
    }
  }, l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      alignSelf: "flex-start",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      height: 44,
      background: "none",
      border: 0,
      padding: 0,
      color: "var(--text-muted)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(EmIcon, {
    name: "arrow-left",
    size: 18
  }), "Church apps"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Inside your church app"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-pastoral)",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "What members see in ", provider, " once your church connects.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      padding: "8px 12px",
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--border-default)",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Prototype \xB7 ", seg(leader, setLeader, "Member", "Leader"), seg(small, setSmall, "38 answers", "12 answers")), /*#__PURE__*/React.createElement("div", {
    "aria-label": `Preview inside ${provider}`,
    style: {
      borderRadius: 24,
      background: emHost.bg,
      border: `1px solid ${emHost.line}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 16px",
      background: emHost.card,
      borderBottom: `1px solid ${emHost.line}`,
      color: emHost.ink
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: "#C6D0BA"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1 var(--font-body)",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, "Living Water Fellowship"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1 var(--font-body)",
      color: emHost.muted,
      whiteSpace: "nowrap"
    }
  }, provider)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(EmCard, {
    title: "This month at our church",
    icon: "waypoints",
    foot: enough ? "Counts only. No names, no answers. Ideas under 3 mentions never show." : null
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "800 24px/1.15 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "What does ", /*#__PURE__*/React.createElement("u", {
    style: {
      color: "var(--lamp-400)",
      textUnderlineOffset: "0.12em"
    }
  }, "faith"), " mean to you?"), enough ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 160",
    width: "100%",
    height: "160",
    role: "img",
    "aria-label": `Map of ${m.ideas.length} ideas from ${m.answers} answers`,
    style: {
      background: "var(--ink-0)",
      borderRadius: "var(--radius-md)"
    }
  }, m.ideas.map(([id, v, nw], i) => {
    const [x, y] = emSlots[i],
      r = 8 + v / max * 22;
    return /*#__PURE__*/React.createElement("g", {
      key: id,
      transform: `translate(${x} ${y})`
    }, /*#__PURE__*/React.createElement("circle", {
      r: r,
      fill: nw ? "var(--lamp-400)" : "var(--ink-3)",
      stroke: nw ? "none" : "var(--bone-7)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      y: 4,
      textAnchor: "middle",
      style: {
        font: "600 13px var(--font-body)",
        fill: nw ? "var(--ink-0)" : "var(--text-strong)"
      }
    }, id));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      font: "600 13px/1.2 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "800 18px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, m.answers), " answers"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 10,
      height: 10,
      borderRadius: 9,
      background: "var(--lamp-400)"
    }
  }), "new this month"))) : /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement(EmIcon, {
    name: "eye-off",
    size: 20,
    color: "var(--text-body)",
    style: {
      flex: "none",
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16
    }
  }, "The map shows once ", m.min, " people have answered, so no one stands out. ", m.answers, " so far.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(EmButton, {
    size: "sm",
    variant: "primary",
    icon: "message-square-text",
    onClick: () => window.open("../public/index.html#r=month", "_blank")
  }, "Answer"), /*#__PURE__*/React.createElement(EmButton, {
    size: "sm",
    variant: "secondary",
    icon: "link-2",
    onClick: () => setToast("Link copied. It opens with no account and shows no names.")
  }, "Copy link for the church"))), /*#__PURE__*/React.createElement(EmCard, {
    title: "Look up a word",
    icon: "book-open",
    foot: word && word.sources && word.sources[0] ? `${word.sources[0].work} ${word.sources[0].reference}` : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "karma"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "italic 400 16px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "noun")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 16
    }
  }, word ? word.def : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, [["Hindu", "hindu"], ["Buddhist", "buddhist"], ["Christian", "christian"]].map(([t, c]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      height: 26,
      padding: "0 10px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      background: `var(--trad-${c}-tint)`,
      color: `var(--trad-${c})`,
      font: "600 13px/1 var(--font-body)"
    }
  }, t)))), leader && /*#__PURE__*/React.createElement(EmCard, {
    title: "Monthly pack is ready",
    icon: "package",
    foot: "Leaders only. No names. Opens in Rhema.ai."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: 16
    }
  }, "September\u2019s counts and encouragement for your pastors."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmButton, {
    size: "sm",
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => window.open("index.html#r=pack&pco=on", "_blank")
  }, "Open the pack"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "4px 0 2px",
      font: "600 13px/1 var(--font-body)",
      color: emHost.muted
    }
  }, /*#__PURE__*/React.createElement(EmIcon, {
    name: "shield",
    size: 16
  }), "Rhema.ai \xB7 counts only, never names"))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      margin: 0
    }
  }, "The church app shows these cards. It never receives answer text, names or a pastor\u2019s stage."), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 84,
      transform: "translateX(-50%)",
      zIndex: 120
    }
  }, /*#__PURE__*/React.createElement(EmToast, {
    tone: "ok",
    onClose: () => setToast(null)
  }, toast)));
}
window.EmbedPreview = EmbedPreview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/EmbedPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/IntegrationsScreen.jsx
try { (() => {
const {
  Card: InCard,
  Button: InButton,
  Badge: InBadge,
  Icon: InIcon,
  Toast: InToast
} = window.ChurchAIDesignSystem_06db43;
function InList({
  label,
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 30,
      flex: "none",
      whiteSpace: "nowrap",
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, i))));
}
function InRow({
  name,
  status,
  statusTone,
  action,
  opens,
  sends,
  limit,
  dim,
  how,
  see
}) {
  return /*#__PURE__*/React.createElement(InCard, {
    padding: 20,
    style: {
      opacity: dim ? 0.72 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 200px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 18px/1.2 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(InBadge, {
    tone: statusTone
  }, status))), action), how && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 13px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "How does it work?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: 0,
      textWrap: "pretty"
    }
  }, how)), /*#__PURE__*/React.createElement(InList, {
    label: "Planning Center gets",
    items: opens
  }), see, /*#__PURE__*/React.createElement(InList, {
    label: "Rhema.ai reads",
    items: sends
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      font: "600 13px/1.45 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(InIcon, {
    name: "shield",
    size: 18,
    color: "var(--lamp-400)",
    style: {
      marginTop: 1,
      flex: "none"
    }
  }), limit)));
}
function IntegrationsScreen({
  back,
  pco,
  setPco,
  go,
  flash
}) {
  const [phase, setPhase] = React.useState(null);
  const [toast, setToast] = React.useState(flash || null);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);
  const connect = () => {
    setPhase("away");
    setTimeout(() => {
      setPhase(null);
      go("signin");
    }, 900);
  };
  const opens = ["Your church’s map", "Word lookup", "Monthly question", "Pack-ready notice"];
  const later = ["Breeze", "Church Community Builder", "Elvanto", "Rock RMS", "Tithe.ly"];
  const [notify, setNotifyS] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ca_int_notify")) || [];
    } catch (e) {
      return [];
    }
  });
  const toggleNotify = n => {
    const v = notify.includes(n) ? notify.filter(x => x !== n) : [...notify, n];
    setNotifyS(v);
    localStorage.setItem("ca_int_notify", JSON.stringify(v));
  };
  const sends = ["Services", "Groups", "Giving month total", "Your profile"];
  const limit = "Cannot move a pastor’s stage. Cannot put names on the map.";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      alignSelf: "flex-start",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      height: 44,
      background: "none",
      border: 0,
      padding: 0,
      color: "var(--text-muted)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(InIcon, {
    name: "arrow-left",
    size: 18
  }), "Home"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Church apps"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-pastoral)",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "Connect once. You sign in on their site and choose what to share.")), /*#__PURE__*/React.createElement(InRow, {
    name: "Planning Center",
    status: pco === "demo" ? "Demo church" : pco ? "Connected" : "Not connected",
    statusTone: pco === "demo" ? "info" : pco ? "ok" : "neutral",
    action: pco ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(InButton, {
      variant: "primary",
      iconRight: "arrow-right",
      onClick: () => go("church")
    }, "Open"), /*#__PURE__*/React.createElement(InButton, {
      variant: "ghost",
      onClick: () => {
        setPco(false);
        setToast("Disconnected. Planning Center rows are no longer shown.");
      }
    }, "Disconnect")) : /*#__PURE__*/React.createElement(InButton, {
      variant: "primary",
      onClick: connect
    }, "Connect"),
    see: window.CA_DEMO && /*#__PURE__*/React.createElement("button", {
      onClick: () => go("embed"),
      style: {
        alignSelf: "flex-start",
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        minHeight: 44,
        padding: 0,
        background: "none",
        border: 0,
        cursor: "pointer",
        font: "700 16px/1 var(--font-body)",
        color: "var(--lamp-400)"
      }
    }, "See it inside the church app", /*#__PURE__*/React.createElement(InIcon, {
      name: "arrow-right",
      size: 16
    })),
    opens: opens,
    sends: sends,
    limit: limit,
    how: "You sign in on Planning Center\u2019s site and approve access. It then sends service plans, groups and a month finance total here, and shows your church\u2019s map, word lookup and the monthly question to members."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.psLabel,
      marginTop: 6
    }
  }, "Available later"), /*#__PURE__*/React.createElement("div", {
    role: "list",
    "aria-label": "Church apps coming later",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, later.map((n, i) => {
    const on = notify.includes(n);
    return /*#__PURE__*/React.createElement("div", {
      role: "listitem",
      key: n,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        padding: "12px 16px",
        borderTop: i ? "1px solid var(--border-subtle)" : 0,
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "1 1 180px",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "600 18px/1.2 var(--font-display)",
        color: "var(--text-strong)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)",
        marginTop: 4
      }
    }, "Not available yet")), /*#__PURE__*/React.createElement(InButton, {
      size: "sm",
      variant: on ? "ghost" : "secondary",
      icon: on ? "check" : "bell",
      onClick: () => toggleNotify(n)
    }, on ? "We’ll tell you · Undo" : "Tell me when ready"));
  })), /*#__PURE__*/React.createElement(InCard, {
    eyebrow: "Who"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "The church chose this connection."), /*#__PURE__*/React.createElement("li", null, "The connection cannot move a stage or put names on the map."))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      margin: 0
    }
  }, "When Planning Center is connected, ministry and community rows are labelled \u201CPlanning Center\u201D. Optional. Offered for churches in the United States that already use Planning Center. Elsewhere, Rhema.ai works fully without it."), phase === "away" && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Leaving for Planning Center",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 150,
      background: "var(--scrim)",
      display: "grid",
      placeItems: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360,
      width: "100%",
      padding: 24,
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-overlay)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 99,
      border: "2px solid var(--lamp-400)",
      borderRightColor: "transparent",
      animation: "ca-spin .8s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Going to Planning Center"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "You sign in on their site. We never see your password. You\u2019ll come back here after."))), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 84,
      transform: "translateX(-50%)",
      zIndex: 120,
      animation: "ca-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(InToast, {
    tone: "ok",
    onClose: () => setToast(null)
  }, toast)));
}
window.IntegrationsScreen = IntegrationsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/IntegrationsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/PastorScreens.jsx
try { (() => {
const {
  SeasonRing: PsRing,
  PackPieces: PsPieces,
  Card: PsCard,
  Button: PsButton,
  StageTrack: PsStage,
  Tag: PsTag,
  Icon: PsIcon,
  TextArea: PsArea,
  TextField: PsField,
  Radio: PsRadio,
  SegmentedControl: PsSeg,
  StateBlock: PsState,
  Select: PsSelect
} = window.ChurchAIDesignSystem_06db43;
const psLabel = {
  font: "var(--type-label)",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-faint)"
};
const psH1 = {
  font: "600 32px/1.2 var(--font-display)",
  letterSpacing: "var(--tracking-heading)",
  color: "var(--text-strong)",
  margin: 0
};
const psRow = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: "12px 0",
  borderTop: "1px solid var(--border-subtle)",
  font: "var(--type-body)",
  color: "var(--text-body)"
};
function PsSrc({
  src
}) {
  return src ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--info-400)",
      display: "inline-flex",
      gap: 4,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "link-2",
    size: 16
  }), src) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, "added here");
}
function ConnectCard({
  pco,
  go
}) {
  const ctry = (window.csChurch && window.csChurch() || window.CA_PIPE.me || {}).country;
  if (!window.CA_DEMO && ctry !== "United States") return null;
  return /*#__PURE__*/React.createElement(PsCard, {
    eyebrow: "Church app \xB7 US churches, optional",
    title: "Connect church app",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        font: "600 13px/1 var(--font-body)",
        color: pco ? "var(--ok-400)" : "var(--text-faint)"
      }
    }, /*#__PURE__*/React.createElement(PsIcon, {
      name: pco ? "circle-check" : "circle-dashed",
      size: 16
    }), pco === "demo" ? "Demo church" : pco ? "Planning Center connected" : "Not connected")
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: "0 0 14px"
    }
  }, pco ? "Ministry and community rows come from Planning Center. Optional, for US churches. It cannot move your stage." : "Bring in services, attendance and a month finance summary. Until then, you add ministry rows by hand."), /*#__PURE__*/React.createElement(PsButton, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => go("integrations")
  }, pco ? "Manage church apps" : "Connect church app"));
}
(() => {
  if (document.getElementById("ps-kf")) return;
  const st = document.createElement("style");
  st.id = "ps-kf";
  st.textContent = "@keyframes ps-pop{0%{scale:.6;opacity:0}60%{scale:1.12;opacity:1}100%{scale:1}}@keyframes ps-glow{0%{box-shadow:0 0 0 0 var(--lamp-tint)}100%{box-shadow:0 0 0 8px transparent}}@keyframes ps-halo{0%,100%{stroke-opacity:.18}50%{stroke-opacity:.6}}@keyframes ps-settle{0%{translate:0 -10px;opacity:0}100%{translate:0 0;opacity:1}}@media (prefers-reduced-motion:reduce){[data-ps-anim]{animation:none!important}}[data-reduce-motion] [data-ps-anim]{animation:none!important}";
  document.head.appendChild(st);
})();
function psSeen() {
  try {
    return JSON.parse(localStorage.getItem("ca_start_seen")) || [];
  } catch (e) {
    return [];
  }
}
function StartHere({
  go,
  joined,
  ckDone,
  pco,
  ckToday
}) {
  const [seen] = React.useState(psSeen);
  React.useEffect(() => {
    const d = [joined && "join", ckDone && "ck", pco && "pco"].filter(Boolean);
    localStorage.setItem("ca_start_seen", JSON.stringify(d));
  }, [joined, ckDone, pco]);
  const keyOf = ["join", "ck", "pco"];
  const steps = [["Join your church", "building-2", joined, "register"], ["Do your first check-in", "heart-handshake", ckDone, "checkin"], ["Connect your church app", "plug", !!pco, "integrations"]];
  const left = steps.filter(s => !s[2]).length;
  const next = steps.findIndex(s => !s[2]);
  if (!left) return /*#__PURE__*/React.createElement(PsCard, {
    title: ckToday ? "Checked in" : "Today"
  }, ckToday ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      display: "flex",
      gap: 10,
      alignItems: "center",
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--ok-tint)",
      color: "var(--ok-400)"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "check",
    size: 18
  })), "Thank you. See you tomorrow.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-body)"
    }
  }, "Two minutes. Your mentor reads it."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PsButton, {
    variant: "accent",
    icon: "heart-handshake",
    onClick: () => go("checkin")
  }, "Check in for today"))));
  return /*#__PURE__*/React.createElement(PsCard, {
    title: "Start here"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, 3 - left, " of 3 done."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, steps.map(([t, ic, done, to], i) => {
    const isNext = i === next;
    return /*#__PURE__*/React.createElement("li", {
      key: t,
      style: {
        borderTop: i ? "1px solid var(--border-subtle)" : 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => !done && go(to),
      disabled: done,
      style: {
        width: "100%",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 0",
        background: "none",
        border: 0,
        cursor: done ? "default" : "pointer",
        color: "inherit",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      "data-ps-anim": "",
      style: {
        width: 40,
        height: 40,
        flex: "none",
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        background: done ? "var(--ok-tint)" : isNext ? "var(--lamp-400)" : "var(--surface-raised)",
        color: done ? "var(--ok-400)" : isNext ? "var(--ink-0)" : "var(--text-muted)",
        animation: done && !seen.includes(keyOf[i]) ? "ps-pop 620ms cubic-bezier(.34,1.56,.64,1) 300ms both" : "none"
      }
    }, /*#__PURE__*/React.createElement(PsIcon, {
      name: done ? "check" : ic,
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        font: `${isNext ? 700 : 400} 16px/1.3 var(--font-body)`,
        color: isNext ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, t, done && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)"
      }
    }, ", done")), isNext ? /*#__PURE__*/React.createElement("span", {
      style: {
        height: 36,
        padding: "0 16px",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        background: "var(--lamp-400)",
        color: "var(--ink-0)",
        font: "700 13px/1 var(--font-body)",
        flex: "none"
      }
    }, "Start") : !done && /*#__PURE__*/React.createElement(PsIcon, {
      name: "chevron-right",
      size: 18,
      color: "var(--text-muted)"
    })));
  })));
}
function WhatWeHeard() {
  const D = window.CA_DATA;
  if (!D) return null;
  const pub = D.months.filter(m => m.published);
  const cur = pub[pub.length - 1],
    prev = pub[pub.length - 2];
  if (!cur) return null;
  const W = m => Object.fromEntries((m ? m.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const a = W(prev),
    b = W(cur);
  const rose = Object.keys(b).filter(k => a[k]).map(k => [k, b[k] - a[k]]).filter(x => x[1] > 0).sort((x, y) => y[1] - x[1]).slice(0, 2).map(x => x[0]);
  const fresh = Object.keys(b).filter(k => !a[k]).slice(0, 2);
  const top = Object.keys(b).sort((x, y) => b[y] - b[x])[0];
  const mon = cur.label.split(" ")[0];
  const lines = [rose.length && ["arrow-up-right", "var(--ok-400)", `${rose.join(" and ")} came up more than last month.`], fresh.length && ["circle-plus", "var(--lamp-400)", `${fresh.join(" and ")} appeared for the first time.`]].filter(Boolean);
  const prompts = [`Where did you notice ${top} this month?`, fresh[0] ? `What would you want someone to know about ${fresh[0]}?` : `What does ${cur.term || "faith"} look like on a hard day?`, "Who could you check on this week?"];
  return /*#__PURE__*/React.createElement(PsCard, {
    title: `What we heard in ${mon}`
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "From the monthly question in your region. Ideas only, never who said them."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, lines.map(([ic, c, t]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-raised)",
      color: c
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: ic,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      paddingTop: 12,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "For Sunday or a small group"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-body)"
    }
  }, prompts.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, p)))));
}
function MentorNote() {
  const n = window.CA_PIPE.me.mentorNote;
  if (!n) return null;
  const k = "ca_note_seen_" + n.id;
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [fresh] = React.useState(() => !rm && !localStorage.getItem(k));
  const [on, setOn] = React.useState(!fresh);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!fresh || !ref.current) return;
    let id;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        localStorage.setItem(k, "1");
        id = setTimeout(() => setOn(true), 400);
      }
    }, {
      threshold: 0.6
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      clearTimeout(id);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "aria-label": "From your mentor",
    style: {
      padding: 20,
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 32,
      height: 32,
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-raised)",
      color: "var(--bridge-400)"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "pencil",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "From your mentor"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, n.date)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 24px/1.4 var(--font-hand)",
      color: "var(--bone-8)"
    }
  }, n.text.split(" ").map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      opacity: on ? 1 : 0,
      transition: fresh ? `opacity 700ms var(--ease-out) ${i * 110}ms` : "none"
    }
  }, w, " "))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PsButton, {
    size: "sm",
    variant: "secondary",
    icon: "messages-square",
    onClick: () => window.CATalkMentor()
  }, "Message your mentor")));
}
function SeasonLetter({
  stage
}) {
  const k = "ca_letter_" + stage;
  const [open, setOpen] = React.useState(() => !localStorage.getItem(k));
  if (!open) return null;
  const name = window.CA_PIPE.stages[stage];
  return /*#__PURE__*/React.createElement("div", {
    "data-ps-anim": "",
    style: {
      animation: "ps-settle 700ms cubic-bezier(.22,.61,.36,1) 1500ms both"
    }
  }, /*#__PURE__*/React.createElement(PsCard, {
    title: `A new season: ${name}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Your leaders agreed you are ready for ", name.toLowerCase(), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Nothing about how you are cared for changes. Your mentor still reads your check-ins."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-muted)"
    }
  }, "\u201CHe who began a good work in you will carry it on to completion.\u201D Philippians 1:6")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PsButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => {
      localStorage.setItem(k, "1");
      setOpen(false);
    }
  }, "Keep this"))));
}
function PastorHome({
  go,
  church,
  stage,
  pco,
  setPco,
  decision,
  joined,
  ckDone
}) {
  const me = window.CA_PIPE.me,
    wide = window.useWide(900);
  const outcome = {
    continue: "Continue",
    plan: "Development plan",
    additional: "Additional review"
  };
  const history = decision ? [["Today", `Leadership review: ${outcome[decision]}${decision === "continue" ? ` · moved to ${window.CA_PIPE.stages[stage]}` : ""}`], ...me.history] : me.history;
  const rows = [["heart-handshake", "Check in for today", "Two minutes. Your mentor reads it.", "checkin"], ["file-text", "September pack", pco ? "4 of 5 pieces in" : "3 of 5 pieces in", "pack"], ["plug", "Church app", pco === "demo" ? "Demo church" : pco ? "Planning Center connected" : "Not connected", "integrations"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...psH1,
      fontSize: 32
    }
  }, "Good morning."), church && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: "6px 0 0",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, church)), /*#__PURE__*/React.createElement(PsCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PsRing, {
    glow: new URLSearchParams(location.hash.slice(1)).get("anniv") === "1",
    grow: decision === "continue" && !localStorage.getItem("ca_letter_" + stage),
    current: stage,
    since: stage === 1 ? "since Jun 2026" : "from today",
    caption: false
  })), new URLSearchParams(location.hash.slice(1)).get("anniv") === "1" && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: "center",
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-strong)"
    }
  }, "One year in ", window.CA_PIPE.stages[stage], ". Thank you for staying."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-pastoral)",
      color: "var(--text-body)",
      margin: 0
    }
  }, "Your mentor walks with you this season. Your stage changes only when your leaders decide together.")), decision === "continue" && !localStorage.getItem("ca_letter_" + stage) && /*#__PURE__*/React.createElement(SeasonLetter, {
    stage: stage
  }), /*#__PURE__*/React.createElement(StartHere, {
    go: go,
    joined: joined,
    ckDone: ckDone,
    pco: pco,
    ckToday: ckDone
  }), new URLSearchParams(location.hash.slice(1)).get("note") !== "0" && /*#__PURE__*/React.createElement(MentorNote, null), !window.matchMedia("(min-width: 900px)").matches && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "More",
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, [["Tracks", "columns-3", "tracks"], [`${window.CA_PIPE.pack.month.split(" ")[0]} pack`, "file-text", "pack"], ["Church app", "plug", "integrations"]].map(([l, ic, to]) => /*#__PURE__*/React.createElement("button", {
    key: to,
    onClick: () => go(to),
    style: {
      height: 44,
      padding: "0 16px",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      background: "transparent",
      color: "var(--text-body)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: ic,
    size: 18
  }), l))), /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "ps-story"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "ps-story",
    style: {
      font: "var(--type-label)",
      color: "var(--text-muted)",
      margin: "0 0 4px"
    }
  }, "Your story so far"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, history.slice(0, 3).map(([dd, t]) => /*#__PURE__*/React.createElement("li", {
    key: dd + t,
    style: {
      ...psRow,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      width: 72,
      flex: "none"
    }
  }, dd), t)))));
}
function PastorTracks({
  go,
  pco
}) {
  const T0 = window.CA_PIPE.tracks;
  const T = {
      ...T0,
      ministry: pco ? T0.ministry : T0.ministry.filter(r => !r.src)
    },
    wide = window.useWide(1000);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: psH1
  }, "Three tracks"), !wide && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Jump to track",
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: -8
    }
  }, [["Training", "trk-training"], ["Ministry", "trk-ministry"], ["Character", "trk-character"]].map(([l, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: e => {
      e.preventDefault();
      const el = document.getElementById(id);
      el && window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - 76,
        behavior: "smooth"
      });
    },
    style: {
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center",
      padding: "0 14px",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      color: "var(--text-body)",
      font: "600 13px/1 var(--font-body)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "repeat(3,minmax(0,1fr))" : "1fr",
      gap: 16,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "trk-training"
  }), /*#__PURE__*/React.createElement(PsCard, {
    eyebrow: "Training",
    title: "Courses"
  }, T.training.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    style: {
      ...psRow,
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, c.t), c.cert && /*#__PURE__*/React.createElement(PsTag, {
    tone: "lamp"
  }, "Certificate")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "600 13px/1 var(--font-body)",
      color: c.p === 100 ? "var(--ok-400)" : c.p > 0 ? "var(--text-body)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: c.p === 100 ? "circle-check" : c.p > 0 ? "circle-dot" : "circle-dashed",
    size: 16
  }), c.p === 100 ? "Done" : c.p > 0 ? "In progress" : "Not started"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...psLabel,
      marginTop: 14,
      marginBottom: 2
    }
  }, "Documents"), T.documents.map(([n, f]) => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      ...psRow,
      alignItems: "center",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "file-text",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, n), /*#__PURE__*/React.createElement(PsIcon, {
    name: "external-link",
    size: 16,
    color: "var(--text-faint)"
  })))), /*#__PURE__*/React.createElement("div", {
    id: "trk-ministry"
  }), /*#__PURE__*/React.createElement(PsCard, {
    eyebrow: "Ministry",
    title: "What you did"
  }, !pco && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: "0 0 8px"
    }
  }, "Planning Center is not connected. Service plans will appear here once it is."), T.ministry.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.t,
    style: {
      ...psRow,
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, r.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, r.d), /*#__PURE__*/React.createElement(PsSrc, {
    src: r.src
  }))))), /*#__PURE__*/React.createElement("div", {
    id: "trk-character"
  }), /*#__PURE__*/React.createElement(PsCard, {
    eyebrow: "Character",
    title: "Notes for you"
  }, T.character.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.t,
    style: {
      ...psRow,
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: psLabel
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, r.t), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, r.n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, r.d))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...psRow,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "heart-handshake",
    size: 18,
    color: "var(--lamp-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Check-ins this month: ", T.checkins.count, " of ", T.checkins.days, " days"), go && /*#__PURE__*/React.createElement(PsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => go("checkin")
  }, "Log today\u2019s check-in")))));
}
function PsPiece({
  ok,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "18px 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: ok ? "circle-check" : "circle-dashed",
    size: 20,
    color: ok ? "var(--ok-400)" : "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      color: "var(--text-strong)",
      margin: 0,
      flex: 1
    }
  }, title), !ok && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Waiting on this piece")), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 30
    }
  }, children));
}
function PastorPack({
  pco
}) {
  const P0 = window.CA_PIPE.pack;
  const P = {
    ...P0,
    community: P0.community.map(([k, v, s]) => pco || !s ? [k, v, s] : [k, "Not in yet. Connect Planning Center or add it by hand.", null])
  };
  const [tab, setTab] = React.useState("pack");
  const icon = {
    form: "file-text",
    certificate: "award",
    receipt: "receipt",
    sermon: "mic",
    review: "clipboard-check",
    support: "paperclip"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 16,
      flexWrap: "wrap",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: psLabel
  }, "Monthly pack"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...psH1,
      marginTop: 6
    }
  }, P.month)), /*#__PURE__*/React.createElement(PsSeg, {
    size: "sm",
    label: "Pack section",
    value: tab,
    onChange: setTab,
    options: [{
      value: "pack",
      label: "Pack"
    }, {
      value: "community",
      label: "Community"
    }, {
      value: "evidence",
      label: "Evidence"
    }]
  })), tab === "pack" && /*#__PURE__*/React.createElement(WhatWeHeard, null), tab === "pack" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PsPiece, {
    ok: true,
    title: "Report"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, P.report.activities, " activities this month"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Challenge: ", P.report.challenges), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Progress: ", P.report.progress))), /*#__PURE__*/React.createElement(PsPiece, {
    ok: false,
    title: "Feedback"
  }, P.feedback.map(([w, s]) => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: 36,
      alignItems: "center",
      font: "var(--type-body)",
      color: s === "in" ? "var(--text-body)" : "var(--text-muted)"
    }
  }, w, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)"
    }
  }, s === "in" ? "Received" : "Church leaders have not sent theirs yet"))))), tab === "community" && /*#__PURE__*/React.createElement(PsCard, null, P.community.map(([k, v, src], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      ...psRow,
      borderTop: i ? psRow.borderTop : 0,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...psLabel,
      width: 150,
      flex: "none",
      paddingTop: 4
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 180,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, v, /*#__PURE__*/React.createElement(PsSrc, {
    src: src
  }))))), tab === "evidence" && /*#__PURE__*/React.createElement(PsCard, null, P.evidence.map(([k, t, f], i) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      ...psRow,
      borderTop: i ? psRow.borderTop : 0,
      alignItems: "center",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: icon[k],
    size: 20,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, f), /*#__PURE__*/React.createElement(PsIcon, {
    name: "external-link",
    size: 16,
    color: "var(--text-faint)"
  })))));
}
function useEscPlain() {
  React.useEffect(() => {
    const k = ev => {
      if (ev.key === "Escape" && !document.querySelector('[role="dialog"]')) window.CAGuard.plain();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
}
function PsClose() {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => window.CAGuard.plain(),
    "aria-label": "Close",
    style: {
      width: 44,
      height: 44,
      flex: "none",
      display: "grid",
      placeItems: "center",
      background: "none",
      border: 0,
      borderRadius: 99,
      color: "var(--text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(PsIcon, {
    name: "x",
    size: 20
  }));
}
function PastorCheckin({
  f,
  setF,
  demo,
  setDemo,
  onSend
}) {
  useEscPlain();
  const [, rr] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    window.addEventListener("ca-lang", rr);
    return () => window.removeEventListener("ca-lang", rr);
  }, []);
  const set = k => v => setF(s => ({
    ...s,
    [k]: v
  }));
  const [err, setErr] = React.useState(null);
  const submit = e => {
    e.preventDefault();
    const c = window.CAInput.check("checkin", f.struggles, {
      optional: true
    });
    if (!c.ok) {
      setErr(c.msg);
      return;
    }
    setErr(null);
    onSend();
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      maxWidth: 560,
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: psLabel
  }, window.CAtr("Check-in · when you can")), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...psH1,
      marginTop: 6
    }
  }, window.CAT && window.CAT("title") || "How was today?")), /*#__PURE__*/React.createElement(window.CALangPick, null), /*#__PURE__*/React.createElement(PsClose, null)), /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 0,
      padding: 0,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("legend", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, window.CAT && window.CAT("usual") || "Compared with a usual day?"), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [[5, "Much lighter than usual"], [4, "Lighter than usual"], [3, "About usual"], [2, "Heavier than usual"], [1, "Much heavier than usual"]].map(([n, w]) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "radio",
    key: n,
    "aria-checked": f.mood === n,
    onClick: () => set("mood")(n),
    style: {
      minHeight: 56,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      textAlign: "left",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${f.mood === n ? "var(--lamp-400)" : "var(--border-default)"}`,
      background: "linear-gradient(var(--lamp-tint), var(--lamp-tint)) no-repeat left / " + (f.mood === n ? "100%" : "0%") + " 100%, var(--surface-card)",
      transition: "background-size 520ms cubic-bezier(.22,.61,.36,1), border-color 300ms var(--ease-out)",
      color: f.mood === n ? "var(--text-strong)" : "var(--text-body)",
      font: "600 16px/1.3 var(--font-body)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      border: `2px solid ${f.mood === n ? "var(--lamp-400)" : "var(--border-strong)"}`
    }
  }, f.mood === n && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: "var(--lamp-400)"
    }
  })), window.CAtr(w))))), /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 0,
      padding: 0,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("legend", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      marginBottom: 6
    }
  }, window.CAtr("Did you pray today?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(PsRadio, {
    name: "prayed",
    label: window.CAtr("Yes"),
    checked: f.prayed === "yes",
    onChange: () => set("prayed")("yes")
  }), /*#__PURE__*/React.createElement(PsRadio, {
    name: "prayed",
    label: window.CAtr("Not today"),
    checked: f.prayed === "no",
    onChange: () => set("prayed")("no")
  }))), /*#__PURE__*/React.createElement(PsField, {
    label: window.CAtr("Visits made today"),
    hint: window.CAtr("Pastoral visits or calls. 0 is fine."),
    type: "number",
    inputMode: "numeric",
    value: f.visits,
    onChange: e => set("visits")(e.target.value)
  }), /*#__PURE__*/React.createElement(PsArea, {
    error: err || undefined,
    label: window.CAT && window.CAT("hard") || "What was hard?",
    rows: 3,
    maxLength: 500,
    value: f.struggles,
    onChange: e => set("struggles")(e.target.value)
  }), /*#__PURE__*/React.createElement(PsArea, {
    label: window.CAT && window.CAT("well") || "What went well?",
    rows: 3,
    maxLength: 500,
    value: f.wins,
    onChange: e => set("wins")(e.target.value)
  }), /*#__PURE__*/React.createElement("details", {
    "data-demo": "",
    style: {
      borderTop: "1px dashed var(--border-default)",
      paddingTop: 10,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      fontWeight: 600
    }
  }, "Demo controls"), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(PsSelect, {
    label: "Result to show",
    value: demo,
    onChange: e => setDemo(e.target.value),
    options: [{
      value: "steady",
      label: "Steady"
    }, {
      value: "hard",
      label: "Hard note"
    }, {
      value: "failed",
      label: "Failed"
    }],
    hint: "Pastors never see this. Crisis words always go to a person."
  }))), /*#__PURE__*/React.createElement(PsButton, {
    type: "submit",
    variant: "accent",
    size: "lg",
    fullWidth: true
  }, window.CAT && window.CAT("send") || "Send check-in"));
}
Object.assign(window, {
  useEscPlain,
  PsClose,
  PastorHome,
  PastorTracks,
  PastorPack,
  PastorCheckin,
  psLabel,
  psH1,
  psRow
});
window.CATalkMentor = () => {
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.textContent = window.CAtr("Sent. Your mentor will reach out today. Only your mentor sees this.");
  Object.assign(el.style, {
    position: "fixed",
    left: "50%",
    bottom: "84px",
    transform: "translateX(-50%)",
    zIndex: 200,
    maxWidth: "min(92vw,420px)",
    padding: "12px 16px",
    borderRadius: "14px",
    background: "var(--surface-raised)",
    border: "1px solid var(--border-default)",
    boxShadow: "var(--shadow-overlay)",
    font: "600 16px/1.35 var(--font-body)",
    color: "var(--text-strong)"
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/PastorScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/PipelineFlow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card: PfCard,
  Button: PfButton,
  Badge: PfBadge,
  Icon: PfIcon,
  TextField: PfField,
  Radio: PfRadio,
  TextArea: PfArea,
  Dialog: PfDialog,
  Toast: PfToast
} = window.ChurchAIDesignSystem_06db43;
const pfBack = {
  alignSelf: "flex-start",
  display: "inline-flex",
  gap: 6,
  alignItems: "center",
  height: 44,
  background: "none",
  border: 0,
  padding: 0,
  color: "var(--text-muted)",
  font: "600 16px/1 var(--font-body)",
  cursor: "pointer"
};
const pfBroad = r => r.split(" — ")[0];
const pfOutcome = {
  steady: ["sun", "var(--lamp-400)", "Thank you. Rest well tonight. “Come unto me, all ye that labour.” Matthew 11:28"],
  morning: ["sun", "var(--lamp-400)", "Thank you. Go gently today. “This is the day which the LORD hath made.” Psalm 118:24"],
  hard: ["hand-heart", "var(--bridge-400)", "A person will see this."],
  queued: ["clock", "var(--text-muted)", "Saved on this phone. It will send when you are online."],
  failed: ["wifi-off", "var(--danger-400)", "We could not send this."],
  blocked: ["shield-alert", "var(--danger-400)", "Part of this reads like an instruction, so it was not sent."]
};
function PfSlowLine({
  text,
  style
}) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => {
    if (rm) return;
    const a = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(a);
  }, [text]);
  return /*#__PURE__*/React.createElement("p", {
    "aria-live": "polite",
    style: style
  }, text.split(" ").map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      opacity: on ? 1 : 0,
      transition: `opacity 600ms var(--ease-out) ${i * 70}ms`
    }
  }, w, " ")));
}
function PfSunset({
  morning
}) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [down, setDown] = React.useState(rm);
  React.useEffect(() => {
    if (rm) return;
    const id = setTimeout(() => setDown(true), 1400);
    return () => clearTimeout(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      width: 56,
      height: 56,
      borderRadius: 99,
      overflow: "hidden",
      background: (morning ? !down : down) ? "var(--ink-2)" : "var(--surface-raised)",
      transition: "background 2400ms var(--ease-in-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      top: 14,
      display: "grid",
      transform: (morning ? !down : down) ? "translateY(20px)" : "none",
      transition: "transform 2400ms cubic-bezier(.4,0,.2,1)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "sun",
    size: 24,
    color: (morning ? !down : down) ? "var(--bridge-400)" : "var(--lamp-400)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 8,
      right: 8,
      top: 40,
      height: 1,
      background: "var(--border-default)"
    }
  }));
}
const pfMorning = () => {
  const t = new URLSearchParams(location.hash.slice(1)).get("tod");
  return t ? t === "morning" : new Date().getHours() < 14;
};
function PfOwnWords({
  text
}) {
  // the pastor's own words: never sent for translation
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const w = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!w.length) return null;
  const short = w.slice(0, 9).join(" ") + (w.length > 9 ? "…" : "");
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => {
    if (rm) return;
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(a);
  }, []);
  return /*#__PURE__*/React.createElement("p", {
    "data-no-tr": "",
    style: {
      margin: 0,
      font: "400 24px/1.35 var(--font-hand)",
      color: "var(--bone-8)",
      opacity: on ? 1 : 0,
      transition: "opacity 900ms var(--ease-out)"
    }
  }, "You noticed: \u201C", short, "\u201D");
}
function PfFade({
  style,
  children
}) {
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [on, setOn] = React.useState(rm);
  React.useEffect(() => {
    if (rm) return;
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(a);
  }, []);
  return /*#__PURE__*/React.createElement("p", {
    "aria-live": "polite",
    style: {
      ...style,
      opacity: on ? 1 : 0,
      transition: "opacity 900ms var(--ease-out)"
    }
  }, children);
}
function CheckinResult({
  ck,
  edit,
  retry,
  wins
}) {
  window.useEscPlain();
  if (ck.res === "pending" || !ck.res) return /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      maxWidth: 560,
      display: "flex",
      gap: 12,
      alignItems: "center",
      paddingTop: 24,
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 99,
      border: "2px solid var(--lamp-400)",
      borderRightColor: "transparent",
      animation: "ca-spin .8s linear infinite"
    }
  }), "Sending today\u2019s note\u2026");
  const morn = ck.res === "steady" && pfMorning();
  const [ic, c, t] = pfOutcome[morn ? "morning" : ck.res];
  const bad = ck.res === "failed" || ck.res === "blocked";
  const L = window.CAT || (k => null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psLabel,
      flex: 1,
      margin: 0
    }
  }, window.CAtr("Check-in"), ck.n > 1 ? window.CAtr(" · updated") : ""), /*#__PURE__*/React.createElement(window.PsClose, null)), ck.res === "steady" ? /*#__PURE__*/React.createElement(PfSunset, {
    key: "sun" + ck.n,
    morning: morn
  }) : /*#__PURE__*/React.createElement("div", {
    key: "ic" + ck.n,
    "data-ps-anim": "",
    style: {
      width: 56,
      height: 56,
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-raised)",
      animation: "none"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: ic,
    size: 24,
    color: c
  })), ck.res === "steady" || ck.res === "hard" ? /*#__PURE__*/React.createElement(PfFade, {
    key: "t" + ck.n,
    style: {
      font: "var(--type-pastoral)",
      fontSize: 24,
      color: "var(--text-strong)",
      margin: 0,
      textWrap: "pretty"
    }
  }, window.CAtr(t)) : /*#__PURE__*/React.createElement("p", {
    "aria-live": "polite",
    style: {
      font: "var(--type-pastoral)",
      fontSize: 24,
      color: "var(--text-strong)",
      margin: 0,
      textWrap: "pretty"
    }
  }, window.CAtr(t)), ck.res === "steady" && /*#__PURE__*/React.createElement(PfOwnWords, {
    key: "w" + ck.n,
    text: wins
  }), ck.res === "hard" && (() => {
    const me = window.CA_PIPE.me,
      ch = window.csChurch && window.csChurch() || {};
    const [num, what] = window.CACrisisLine[ch.country || me.country] || window.CACrisisLine["United States"];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: "tel:" + num,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 16,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-strong)",
        background: "var(--surface-card)",
        textDecoration: "none",
        color: "inherit"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 44,
        height: 44,
        flex: "none",
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        background: "var(--danger-tint)",
        color: "var(--danger-400)"
      }
    }, /*#__PURE__*/React.createElement(PfIcon, {
      name: "phone",
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "700 18px/1.3 var(--font-body)",
        color: "var(--text-strong)"
      }
    }, window.CAtr("In danger now? Call"), " ", num), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, what[0].toUpperCase() + what.slice(1), " \xB7 ", window.CAtr("free, any time"))), /*#__PURE__*/React.createElement(PfIcon, {
      name: "chevron-right",
      size: 18,
      color: "var(--text-muted)"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PfButton, {
      variant: "accent",
      size: "lg",
      icon: "messages-square",
      onClick: () => window.CATalkMentor && window.CATalkMentor()
    }, window.CAtr("Message your mentor"))));
  })(), ck.res === "steady" && /*#__PURE__*/React.createElement(window.CAWhy, {
    text: window.CAtr("Written by the assistant from today’s note. Nothing here is scored, and your words are not shared.")
  }), ck.res === "steady" && /*#__PURE__*/React.createElement(window.CAHelped, {
    id: "ck_" + new Date().toDateString(),
    q: "Did this help today?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, ck.res === "failed" && /*#__PURE__*/React.createElement(PfButton, {
    variant: "primary",
    icon: "rotate-cw",
    onClick: retry
  }, window.CAtr("Retry")), ck.res !== "failed" && (ck.res === "hard" ? /*#__PURE__*/React.createElement("button", {
    onClick: edit,
    style: {
      height: 40,
      padding: 0,
      background: "none",
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, window.CAtr("Edit today’s note")) : /*#__PURE__*/React.createElement(PfButton, {
    variant: bad ? "ghost" : "secondary",
    icon: "pencil",
    onClick: edit
  }, window.CAtr("Edit today’s note")))));
}
function pfAcks() {
  try {
    return JSON.parse(localStorage.getItem("ca_packet_ack")) || {};
  } catch (e) {
    return {};
  }
}
const pfSteps = ["Read check-ins", "Read month counts", "Draft the review", "Check the draft"];
const pfDetail = c => [`${c.ck} check-ins this month`, `${c.act} activities`, "3 blocks", "No names · 1 item held"];
function Preparing({
  onDone,
  counts,
  done
}) {
  const [n, setN] = React.useState(done ? pfSteps.length : 0);
  const [collapsed, setCollapsed] = React.useState(!!done);
  const [more, setMore] = React.useState(false);
  const det = pfDetail(counts || {
    ck: 0,
    act: 0,
    rc: 0
  });
  React.useEffect(() => {
    if (done) return;
    if (n < pfSteps.length) {
      const id = setTimeout(() => setN(n + 1), 520);
      return () => clearTimeout(id);
    }
    const a = setTimeout(() => setCollapsed(true), 260);
    const b = setTimeout(onDone, 820);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [n]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    "aria-label": "Preparing the review",
    style: {
      maxWidth: 480,
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      padding: collapsed ? "12px 16px" : 20,
      transition: "padding var(--dur-slow) var(--ease-out)",
      overflow: "hidden"
    }
  }, collapsed && !more ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "check",
    size: 16,
    color: "var(--ok-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Prepared \xB7 4 steps"), /*#__PURE__*/React.createElement(PfButton, {
    size: "sm",
    variant: "ghost",
    iconRight: "chevron-down",
    onClick: () => setMore(true)
  }, "Details")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      ...window.psLabel,
      marginBottom: 12
    }
  }, "Preparing the review \xB7 step ", Math.min(n + 1, 4), " of 4 \xB7 about 5 seconds"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, pfSteps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      minHeight: 40,
      font: "var(--type-body)",
      color: i < n ? "var(--text-body)" : i === n ? "var(--text-strong)" : "var(--text-faint)"
    }
  }, i < n ? /*#__PURE__*/React.createElement(PfIcon, {
    name: "check",
    size: 18,
    color: "var(--ok-400)"
  }) : i === n ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      margin: 1,
      borderRadius: 99,
      border: "2px solid var(--lamp-400)",
      borderRightColor: "transparent",
      animation: "ca-spin .8s linear infinite"
    }
  }) : /*#__PURE__*/React.createElement(PfIcon, {
    name: "circle-dashed",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, s), i < n && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      textAlign: "right"
    }
  }, det[i])))), more && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(PfButton, {
    size: "sm",
    variant: "ghost",
    iconRight: "chevron-up",
    onClick: () => setMore(false)
  }, "Hide details"))));
}
function PfBlock({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "20px 0",
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.psLabel,
      margin: 0
    }
  }, label), children);
}
function ReviewFlow({
  id,
  back,
  decisions,
  decide
}) {
  const p = window.CA_PIPE.queue.find(x => x.id === id) || window.CA_PIPE.queue[0];
  const down = window.CAGuard.forced() === "unavailable";
  const [ready, setReady] = React.useState(false);
  const [ack, setAck] = React.useState(!!pfAcks()[p.id]);
  const [dlg, setDlg] = React.useState(false);
  const [pick, setPick] = React.useState(null);
  const [conf, setConf] = React.useState("");
  const [note, setNote] = React.useState("");
  const decided = decisions[p.id];
  const stageNow = decided === "continue" ? Math.min(p.stage + 1, 4) : p.stage;
  const acknowledge = () => {
    localStorage.setItem("ca_packet_ack", JSON.stringify({
      ...pfAcks(),
      [p.id]: "Today"
    }));
    setAck(true);
  };
  const outs = [["continue", "Continue", "Move to the next stage."], ["plan", "Development plan", "Stay in this stage with goals for next month."], ["additional", "Additional review", "Send to the regional authority first."]];
  const c = p.counts;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: pfBack
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "arrow-left",
    size: 18
  }), "Queue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psH1,
      fontFamily: "var(--font-mono)",
      fontSize: 24
    }
  }, p.id), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, pfBroad(p.region), " \xB7 ", window.CA_PIPE.stages[stageNow])), down ? /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      minHeight: 280,
      display: "grid",
      placeItems: "center",
      border: "1px dashed var(--border-default)",
      borderRadius: "var(--radius-lg)",
      font: "600 18px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "Unavailable.") : !ready ? /*#__PURE__*/React.createElement(Preparing, {
    counts: c,
    onDone: () => setReady(true)
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "ca-rise var(--dur-slow) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Preparing, {
    counts: c,
    done: true
  }), /*#__PURE__*/React.createElement(window.CAAboutDraft, {
    id: "packet"
  }, "The assistant drafted this review from counts and check-ins. It can be wrong. Nothing about this pastor changes until a person decides."), /*#__PURE__*/React.createElement(PfBlock, {
    label: "Month counts"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
      gap: 16
    }
  }, [["Activities", c.act], ["Check-ins this month", c.ck], ["Pieces in", `${p.complete} of 5`], ["Feedback in", c.fb]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 24px/1.2 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, k)))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Counts only. No names. Why these: they show effort and care this month, from check-ins. They are not a score.")), /*#__PURE__*/React.createElement(PfBlock, {
    label: "Encouragement \xB7 the pastor can read this"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-pastoral)",
      color: "var(--text-body)",
      margin: 0,
      textWrap: "pretty"
    }
  }, p.enc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PfBadge, {
    tone: "neutral",
    dot: false
  }, "Draft")), /*#__PURE__*/React.createElement(window.CAWhy, {
    text: "The assistant wrote this from this month\u2019s counts and check-ins. It never sees names. A reviewer reads it before the pastor does, and can change every word."
  })), /*#__PURE__*/React.createElement(PfBlock, {
    label: "Held"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-raised)",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "700 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "list-checks",
    size: 16
  }), "Check-ins said"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, `${c.ck} check-ins this month · ${c.act} activities · ${p.complete} of 5 pieces · ${c.fb} feedback`, p.crisis ? ` · 1 hard note (${p.crisis.at})` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "700 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "file-text",
    size: 16
  }), "The draft says"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, p.crisis ? "Hold for a person. A hard note came in this month." : p.complete >= 5 && parseInt(c.ck) >= 8 ? "Ready for a stage decision." : "Stay in this stage with goals for next month."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "user-check",
    size: 20,
    color: "var(--lamp-400)"
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, decided ? `Recorded: ${outs.find(o => o[0] === decided)[1]}` : ack ? "Review still open." : "A person still has to decide.")), !decided && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, !ack && /*#__PURE__*/React.createElement(PfButton, {
    variant: "secondary",
    icon: "check",
    onClick: acknowledge
  }, "Acknowledge"), /*#__PURE__*/React.createElement(PfButton, {
    variant: ack ? "primary" : "ghost",
    onClick: () => setDlg(true)
  }, "Decide"))))), /*#__PURE__*/React.createElement(PfDialog, {
    open: dlg,
    title: `Decision for ${p.id}`,
    onClose: () => setDlg(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PfButton, {
      variant: "ghost",
      onClick: () => setDlg(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(PfButton, {
      variant: "primary",
      disabled: !pick || pick === "continue" && !window.CAMatch(conf, p.id),
      onClick: () => {
        decide(p.id, pick);
        setDlg(false);
        setConf("");
      }
    }, "Record"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, outs.map(([v, l, d]) => /*#__PURE__*/React.createElement(PfRadio, {
    key: v,
    name: "outcome",
    value: v,
    label: l,
    description: d,
    checked: pick === v,
    onChange: () => setPick(v)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(PfArea, {
    label: "Note to the record",
    rows: 3,
    value: note,
    onChange: e => setNote(e.target.value),
    hint: "Logged with your name."
  })), pick === "continue" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: p.id,
    value: conf,
    onChange: setConf,
    hint: "The stage moves for this pastor."
  }))));
}
function ChurchSignin({
  back,
  done
}) {
  const [step, setStep] = React.useState("signin");
  const [email, setEmail] = React.useState(""),
    [pw, setPw] = React.useState("");
  const [err, setErr] = React.useState(null),
    [demo, setDemo] = React.useState(false);
  const signin = (e, d) => {
    e && e.preventDefault();
    if (!d && (!email.trim() || !pw)) {
      setErr("Enter your email and password.");
      return;
    }
    setErr(null);
    setDemo(!!d || /demo/i.test(email));
    setStep("consent");
  };
  const allow = () => {
    setStep("return");
    setTimeout(() => done(demo ? "demo" : "on"), 1100);
  };
  const Perm = ({
    icon,
    title,
    items,
    tone
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 28,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: tone === "no" ? "var(--danger-tint)" : "var(--surface-raised)",
      color: tone === "no" ? "var(--danger-400)" : "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: tone === "no" ? "x" : icon,
    size: 16
  })), t))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: back,
    style: pfBack
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "arrow-left",
    size: 18
  }), "Cancel and go back"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-default)",
      overflow: "hidden",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 40,
      padding: "0 14px",
      background: "var(--surface-raised)",
      borderBottom: "1px solid var(--border-subtle)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "lock",
    size: 16
  }), "accounts.planningcenteronline.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, step === "signin" && /*#__PURE__*/React.createElement("form", {
    onSubmit: signin,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Sign in to Planning Center"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "This is Planning Center\u2019s page. Rhema.ai never sees your password.")), /*#__PURE__*/React.createElement(PfField, {
    label: "Email",
    type: "email",
    autoComplete: "username",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: err && !email.trim() ? err : undefined
  }), /*#__PURE__*/React.createElement(PfField, {
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    value: pw,
    onChange: e => setPw(e.target.value),
    error: err && email.trim() && !pw ? err : undefined
  }), /*#__PURE__*/React.createElement(PfButton, {
    type: "submit",
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Sign in"), /*#__PURE__*/React.createElement(PfButton, {
    type: "button",
    variant: "ghost",
    fullWidth: true,
    onClick: () => signin(null, true)
  }, "Use a demo church")), step === "consent" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Connect Rhema.ai?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, demo ? "Demo church" : "Living Water Fellowship", " \xB7 you can disconnect any time.")), /*#__PURE__*/React.createElement(Perm, {
    title: "Rhema.ai can read",
    icon: "file-text",
    items: ["Services you led", "Groups you run", "Your own profile"]
  }), /*#__PURE__*/React.createElement(Perm, {
    title: "Planning Center gets",
    icon: "book-open",
    items: ["The dictionary inside your church app", "This month’s question for your congregation", "A notice when your monthly pack is ready"]
  }), /*#__PURE__*/React.createElement(Perm, {
    title: "Never",
    tone: "no",
    items: ["Move a pastor’s stage", "Put names on the map", "See donor names"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(PfButton, {
    variant: "primary",
    size: "lg",
    onClick: allow
  }, "Allow"), /*#__PURE__*/React.createElement(PfButton, {
    variant: "ghost",
    size: "lg",
    onClick: back
  }, "Don\u2019t allow"))), step === "return" && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      minHeight: 120,
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "circle-check",
    size: 20,
    color: "var(--ok-400)"
  }), "Allowed. Returning to Rhema.ai\u2026"))));
}
function ConnectedChurch({
  back,
  pco,
  stage
}) {
  const T = window.CA_PIPE.tracks,
    P = window.CA_PIPE.pack;
  const rows = [["user", "Person", `${window.CA_PIPE.me.pid} · Pastor in training`], ["calendar", "Ministry activity", `${T.ministry[0].t} · ${T.ministry[0].d}`], ["users", "Community participation", P.community.find(r => r[0] === "Participation")[1]], ["file-text", "Document", T.documents[0][0], null, true]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: pfBack
  }, /*#__PURE__*/React.createElement(PfIcon, {
    name: "arrow-left",
    size: 18
  }), "Church apps"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "Connected church"), /*#__PURE__*/React.createElement(PfBadge, {
    tone: pco === "demo" ? "info" : "ok"
  }, pco === "demo" ? "Demo church" : "Connected")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, "Your stage: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, window.CA_PIPE.stages[stage]), ". Only your reviewer can change it."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Rows below came from Planning Center. People show as a short code, never a name."), /*#__PURE__*/React.createElement("div", {
    role: "list",
    "aria-label": "Imported rows",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, rows.map(([ic, k, v, rid, link], i) => {
    const Tag = link ? "a" : "div";
    return /*#__PURE__*/React.createElement(Tag, _extends({
      role: "listitem",
      key: k
    }, link ? {
      href: "#",
      onClick: e => e.preventDefault()
    } : {}, {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "14px 16px",
        borderTop: i ? "1px solid var(--border-subtle)" : 0,
        background: "var(--surface-card)",
        textDecoration: "none",
        color: "inherit"
      }
    }), /*#__PURE__*/React.createElement(PfIcon, {
      name: ic,
      size: 18,
      color: "var(--text-muted)",
      style: {
        marginTop: 2,
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: window.psLabel
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body)",
        color: "var(--text-body)"
      }
    }, v), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        font: "var(--type-source)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--info-400)",
        display: "inline-flex",
        gap: 4,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(PfIcon, {
      name: "link-2",
      size: 16
    }), "Planning Center"), rid && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        color: "var(--text-faint)"
      }
    }, rid))), link && /*#__PURE__*/React.createElement(PfIcon, {
      name: "external-link",
      size: 16,
      color: "var(--text-faint)"
    }));
  })));
}
Object.assign(window, {
  CheckinResult,
  ReviewFlow,
  ChurchSignin,
  ConnectedChurch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/PipelineFlow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/ReviewerScreens.jsx
try { (() => {
const {
  Card: RsCard,
  Button: RsButton,
  Badge: RsBadge,
  StageTrack: RsStage,
  Radio: RsRadio,
  TextArea: RsArea,
  Dialog: RsDialog,
  Icon: RsIcon,
  Toast: RsToast
} = window.ChurchAIDesignSystem_06db43;
const rsStatus = {
  additional: ["danger", "Additional review"],
  waiting: ["warn", "Waiting for review"],
  stable: ["ok", "Stable"]
};
const rsOutcomes = [{
  v: "continue",
  l: "Continue",
  d: "Move to the next stage."
}, {
  v: "plan",
  l: "Development plan",
  d: "Stay in this stage with named goals for next month."
}, {
  v: "additional",
  l: "Additional review",
  d: "Send to the regional authority before any change."
}];
function rsAck() {
  try {
    return JSON.parse(localStorage.getItem("ca_crisis_ack")) || {};
  } catch (e) {
    return {};
  }
}
function rsSort(q) {
  return [...q].sort((a, b) => b.esc - a.esc || (a.complete < 5 === b.complete < 5 ? 0 : a.complete < 5 ? -1 : 1) || a.since.localeCompare(b.since));
}
function ReviewerQueue({
  open,
  decisions
}) {
  const q = rsSort(window.CA_PIPE.queue);
  const [n, setN] = React.useState(5);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: window.psH1
  }, "September queue"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "Escalations and incomplete packs first, then oldest first.")), /*#__PURE__*/React.createElement("div", {
    role: "table",
    "aria-label": "Review queue",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, q.slice(0, n).map((p, i) => /*#__PURE__*/React.createElement("button", {
    role: "row",
    key: p.id,
    onClick: () => open(p.id),
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      gap: 14,
      alignItems: "center",
      minHeight: 60,
      padding: "0 16px",
      background: i % 2 ? "transparent" : "var(--surface-card)",
      border: 0,
      borderTop: i ? "1px solid var(--border-subtle)" : 0,
      cursor: "pointer",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "cell",
    style: {
      font: "600 16px/1.2 var(--font-mono)",
      color: "var(--text-strong)",
      width: 72,
      flex: "none"
    }
  }, p.id), /*#__PURE__*/React.createElement("span", {
    role: "cell",
    style: {
      flex: 1,
      minWidth: 0,
      font: "var(--type-body)",
      color: "var(--text-muted)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, p.region.split(" — ")[0]), /*#__PURE__*/React.createElement(RsIcon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-faint)"
  })))), q.length > n && /*#__PURE__*/React.createElement(RsButton, {
    variant: "secondary",
    onClick: () => setN(n + 5)
  }, "Load more \xB7 ", q.length - n, " left"));
}
function ReviewerReview({
  id,
  back,
  decisions,
  decide
}) {
  const p = window.CA_PIPE.queue.find(x => x.id === id);
  const wide = window.useWide(1000);
  const [pick, setPick] = React.useState(null);
  const [note, setNote] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [conf, setConf] = React.useState("");
  const [ack, setAck] = React.useState(rsAck()[id] || null);
  const acknowledge = () => {
    const a = {
      at: "Today"
    };
    const all = {
      ...rsAck(),
      [id]: a
    };
    localStorage.setItem("ca_crisis_ack", JSON.stringify(all));
    setAck(a);
  };
  const decided = decisions[id];
  const stageNow = decided === "continue" ? Math.min(p.stage + 1, 4) : p.stage;
  const pieces = ["Report", "Feedback", "Sermon", "Community", "Evidence"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      alignSelf: "flex-start",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      height: 40,
      background: "none",
      border: 0,
      padding: 0,
      color: "var(--text-muted)",
      font: "600 13px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(RsIcon, {
    name: "arrow-left",
    size: 16
  }), "Queue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.psH1,
      fontFamily: "var(--font-mono)",
      fontSize: 24
    }
  }, p.id), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, p.region), p.esc && /*#__PURE__*/React.createElement(RsBadge, {
    tone: "danger"
  }, "Escalated")), /*#__PURE__*/React.createElement(RsCard, {
    padding: 18
  }, /*#__PURE__*/React.createElement(RsStage, {
    current: stageNow,
    orientation: wide ? "horizontal" : "vertical",
    compact: !wide
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1.25fr) minmax(0,1fr)" : "1fr",
      gap: 16,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(RsCard, {
    eyebrow: "Prepared by the agent",
    title: "Summary for review",
    action: /*#__PURE__*/React.createElement(RsBadge, {
      tone: "neutral",
      dot: false
    }, "AI text")
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: "0 0 16px",
      textWrap: "pretty"
    }
  }, p.summary), /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "History"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "6px 0 16px",
      padding: 0
    }
  }, p.history.map(h => /*#__PURE__*/React.createElement("li", {
    key: h,
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      padding: "4px 0"
    }
  }, h))), /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Completeness"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      margin: "8px 0 16px"
    }
  }, pieces.map((x, i) => /*#__PURE__*/React.createElement("span", {
    key: x,
    style: {
      display: "inline-flex",
      gap: 5,
      alignItems: "center",
      height: 30,
      padding: "0 10px",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      font: "600 13px/1 var(--font-body)",
      color: i < p.complete ? "var(--text-body)" : "var(--warn-400)"
    }
  }, /*#__PURE__*/React.createElement(RsIcon, {
    name: i < p.complete ? "check" : "circle-dashed",
    size: 16
  }), x))), p.missing.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Missing"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 16px",
      paddingLeft: 18,
      font: "var(--type-body)",
      color: "var(--warn-400)"
    }
  }, p.missing.map(m => /*#__PURE__*/React.createElement("li", {
    key: m
  }, m)))), p.crisis && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 0 16px",
      padding: 14,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--danger-400)",
      background: "var(--danger-tint)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(RsIcon, {
    name: "siren",
    size: 18,
    color: "var(--danger-400)"
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Crisis check-in \xB7 ", p.crisis.at)), /*#__PURE__*/React.createElement("p", {
    "data-no-tr": "",
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)",
      margin: 0
    }
  }, p.crisis.note), ack ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Acknowledged by you \xB7 ", ack.at, ". The review is still open. Only the decision on the right closes it.") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RsButton, {
    size: "sm",
    variant: "secondary",
    icon: "check",
    onClick: acknowledge
  }, "Acknowledge"))), p.flags.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Flagged for a person"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 16px",
      paddingLeft: 18,
      font: "var(--type-body)",
      color: "var(--danger-400)"
    }
  }, p.flags.map(m => /*#__PURE__*/React.createElement("li", {
    key: m
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: window.psLabel
  }, "Evidence"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "4px 0 14px"
    }
  }, window.CA_PIPE.pack.evidence.slice(0, p.complete).map(([k, t, f]) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      minHeight: 40,
      borderTop: "1px solid var(--border-subtle)",
      textDecoration: "none",
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(RsIcon, {
    name: "file-text",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, "Routed to: ", p.routed), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      font: "600 13px/1.4 var(--font-body)",
      color: "var(--text-strong)",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(RsIcon, {
    name: "user-check",
    size: 18,
    color: "var(--lamp-400)"
  }), "The agent does not change stages. A person still has to decide.")), /*#__PURE__*/React.createElement(RsCard, {
    eyebrow: "Leadership review",
    title: decided ? "Decision recorded" : "Your decision",
    tone: decided ? "raised" : "default"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 14
    }
  }, ["Pastor", "Mentor", "Church leaders", "Regional authority"].map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    style: {
      height: 28,
      padding: "0 10px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      font: "600 13px/1 var(--font-body)",
      color: x === "Regional authority" && p.routed !== "Regional authority" ? "var(--text-faint)" : "var(--text-body)"
    }
  }, x))), decided ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--lamp-400)"
    }
  }, rsOutcomes.find(o => o.v === decided).l), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, decided === "continue" ? `Next pipeline stage: ${window.CA_PIPE.stages[stageNow]}.` : decided === "plan" ? "Stage stays the same. Goals go into next month's pack." : "Stage stays the same. Sent to the regional authority.", " The agent summary is kept beside this decision."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, "Decided by the mentor \xB7 today. The name is kept in the private record.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, rsOutcomes.map(o => /*#__PURE__*/React.createElement(RsRadio, {
    key: o.v,
    name: "outcome",
    value: o.v,
    label: o.l,
    description: o.d,
    checked: pick === o.v,
    onChange: () => setPick(o.v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(RsArea, {
    label: "Note to the record",
    rows: 3,
    value: note,
    onChange: e => setNote(e.target.value),
    hint: "Shared with the pastor in plain words."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(RsButton, {
    variant: "accent",
    fullWidth: true,
    disabled: !pick,
    onClick: () => setConfirm(true)
  }, "Record decision"))))), /*#__PURE__*/React.createElement(RsDialog, {
    open: confirm,
    title: `Record “${pick && rsOutcomes.find(o => o.v === pick).l}” for ${p.id}?`,
    onClose: () => setConfirm(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RsButton, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(RsButton, {
      variant: "primary",
      disabled: pick === "continue" && !window.CAMatch(conf, p.id),
      onClick: () => {
        decide(id, pick);
        setConfirm(false);
        setConf("");
      }
    }, "Record"))
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, pick === "continue" ? `The stage moves from ${window.CA_PIPE.stages[p.stage]} to ${window.CA_PIPE.stages[Math.min(p.stage + 1, 4)]}.` : "The stage does not change.", " This is logged with your name."), pick === "continue" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: p.id,
    value: conf,
    onChange: setConf,
    hint: "The stage moves for this pastor."
  }))));
}
Object.assign(window, {
  ReviewerQueue,
  ReviewerReview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/ReviewerScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/data.js
try { (() => {
window.CA_PIPE = {
  me: {
    name: "Daniel Sarkar",
    first: "Daniel",
    pid: "P-0233",
    church: "Living Water Fellowship, Mirpur",
    country: "Bangladesh",
    region: "Dhaka Division",
    stage: 1,
    mentor: "Pastor Samuel Roy",
    mentorSince: "Jan 2026",
    mentorNote: {
      id: "2026-09-28",
      text: "I read your notes this week. You kept visiting even when you were tired, and that matters. I am praying for your Sunday.",
      date: "Sep 28"
    },
    since: "In the pipeline since Jan 2026",
    history: [["Sep 2026", "Leadership review: Continue in Training"], ["Jun 2026", "Moved to Training after review"], ["Jan 2026", "Welcomed as a candidate"]]
  },
  tracks: {
    training: [{
      t: "Foundations of Scripture",
      p: 100,
      cert: true
    }, {
      t: "Pastoral care basics",
      p: 60
    }, {
      t: "Preaching workshop",
      p: 20
    }],
    documents: [["Training agreement", "agreement-2026.pdf"], ["Course syllabus — Pastoral care", "pc-syllabus.pdf"]],
    ministry: [{
      t: "Sunday service — reading",
      d: "Sep 21",
      src: "Planning Center"
    }, {
      t: "Youth group teaching",
      d: "Sep 18",
      src: "Planning Center"
    }, {
      t: "Home visit, two families",
      d: "Sep 15",
      src: null
    }, {
      t: "Midweek prayer — leading",
      d: "Sep 10",
      src: "Planning Center"
    }, {
      t: "Mentoring two youth leaders",
      d: "Sep 08",
      src: null
    }],
    character: [{
      k: "Observation",
      t: "Mentor visit",
      d: "Sep 12",
      n: "Warm with families; kept time well at the youth meeting."
    }, {
      k: "Feedback",
      t: "From the elders",
      d: "Aug 30",
      n: "Thankful for patience with the youth."
    }, {
      k: "Something to grow in",
      t: "Rest",
      d: "Sep 12",
      n: "Talked about rest and keeping a Sabbath day."
    }],
    checkins: {
      count: 18,
      days: 30
    }
  },
  pack: {
    month: "Sep 2026",
    report: {
      status: "in",
      activities: 14,
      challenges: "Travel to the outer villages during the rains.",
      progress: "Finished Foundations of Scripture."
    },
    feedback: [["People", "in"], ["Mentor", "in"], ["Church leaders", "missing"]],
    finance: {
      status: "in",
      funds: "৳ 18,400",
      spent: "৳ 15,950",
      receipts: 6,
      src: "Planning Center",
      links: [["Receipts — Sep 1–15", "PCO-rcpt-0915"], ["Receipts — Sep 16–30", "PCO-rcpt-0930"]]
    },
    community: [["Local outreach", "Rice distribution with two partner churches", "Planning Center"], ["Community service", "Clean-water day, Ward 7", null], ["Partnerships", "Mirpur Christian School", null], ["Ministry impact", "3 new families attending", null], ["Participation", "Avg. 42 on Sundays · 3 small groups", "Planning Center"]],
    evidence: [["form", "Monthly report — Sep 2026", "report-0926.pdf"], ["certificate", "Foundations of Scripture", "cert-FS-2026.pdf"], ["sermon", "Youth teaching — Psalm 23", "sermon-0918.mp3"], ["review", "Mentor review — Sep", "review-mentor-09.pdf"], ["support", "Letter from partner church", "letter-mcs.pdf"]]
  },
  queue: [{
    id: "P-0419",
    counts: {
      act: 11,
      ck: "9",
      fb: "3 of 3"
    },
    enc: "Your people saw you stay close to them in a hard month. Lean on your mentor as you carry this.",
    crisis: {
      at: "Sep 24",
      note: "A daily check-in was marked crisis. The mentor was notified and called the same day."
    },
    region: "Nepal — Koshi Province",
    stage: 3,
    since: "Aug 14",
    status: "additional",
    esc: true,
    complete: 5,
    missing: [],
    flags: ["Two people raised the same concern about records", "Check-in waiting on a person twice in August"],
    routed: "Regional authority",
    summary: "Report and feedback are in. Two independent feedback notes describe the same concern about handling of the benevolence fund. Receipts match the monthly summary.",
    history: ["Active ministry since Jul 2025", "Jun 2026 · Continue", "Aug 2026 · Additional review"]
  }, {
    id: "P-0233",
    counts: {
      act: 14,
      ck: "7",
      fb: "2 of 3"
    },
    enc: "You finished Foundations of Scripture. The youth you teach are seeing steady care.",
    region: "Bangladesh — Dhaka Division",
    stage: 1,
    since: "Sep 02",
    status: "waiting",
    esc: false,
    complete: 4,
    missing: ["Church leaders feedback"],
    flags: [],
    routed: "Mentor, then church leaders",
    summary: "Finished one course with a certificate; two courses in progress. Ministry activity is steady, most rows came from Planning Center. Church leaders feedback has not arrived.",
    history: ["Training since Jan 2026", "Jun 2026 · Continue", "Sep 2026 · pack incomplete"]
  }, {
    id: "P-0508",
    counts: {
      act: 6,
      ck: "5",
      fb: "1 of 3"
    },
    enc: "Your first month is in. Showing up for the report and your people is a good start.",
    region: "India — Odisha",
    stage: 0,
    since: "Sep 09",
    status: "waiting",
    esc: false,
    complete: 3,
    missing: ["Mentor feedback"],
    flags: [],
    routed: "Mentor",
    summary: "Report and people feedback are in. Community notes not in yet.",
    history: ["Candidate since Aug 2026", "First monthly pack"]
  }, {
    id: "P-0177",
    counts: {
      act: 16,
      ck: "11",
      fb: "3 of 3"
    },
    enc: "A steady month. Your care on Sundays is noticed.",
    region: "Bangladesh — Rajshahi Division",
    stage: 3,
    since: "Sep 18",
    status: "stable",
    esc: false,
    complete: 5,
    missing: [],
    flags: [],
    routed: "Mentor",
    summary: "All five pieces in. Check-ins were steady all month.",
    history: ["Active ministry since Mar 2024", "Aug 2026 · Continue"]
  }, {
    id: "P-0342",
    counts: {
      act: 9,
      ck: "8",
      fb: "3 of 3"
    },
    enc: "Your mentor noticed your work in the preaching workshop. Keep going.",
    region: "Sri Lanka — Central Province",
    stage: 1,
    since: "Sep 20",
    status: "stable",
    esc: false,
    complete: 5,
    missing: [],
    flags: [],
    routed: "Mentor",
    summary: "All pieces in. Attendance at the preaching workshop is noted by the mentor.",
    history: ["Training since Jun 2026", "Aug 2026 · Development plan"]
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/data.js", error: String((e && e.message) || e) }); }

// ui_kits/public/AccountsScreen.jsx
try { (() => {
const {
  TextField: AcField,
  Select: AcSelect,
  Button: AcButton,
  Badge: AcBadge,
  Dialog: AcDialog,
  StateBlock: AcState,
  Toast: AcToast,
  Icon: AcIcon
} = window.ChurchAIDesignSystem_06db43;
const acLabel = {
  font: "var(--type-label)",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-faint)"
};
const acMask = e => {
  const [u, d] = String(e).split("@");
  return (u ? u[0] : "") + "•••@" + (d || "");
};
const AC_ROLES = ["Reader", "Religion expert", "Pastor", "Mentor", "Church leader", "Regional authority", "Admin"];
const AC_PFX = {
  Reader: "R",
  "Religion expert": "E",
  Pastor: "M",
  Mentor: "T",
  "Church leader": "L",
  "Regional authority": "G",
  Admin: "A"
};
const AC_STATUS = {
  active: ["ok", "Active"],
  invited: ["warn", "Invited"],
  suspended: ["danger", "Suspended"]
};
const AC_REASONS = ["Safety concern", "Support request from this person", "Account problem", "Legal request"];
const acHandle = a => `${AC_PFX[a.role] || "U"}-${parseInt(String(a.id).replace(/\D/g, "").slice(-4) || "0", 10) * 7919 % 9000 + 1000}`;
const acSeed = [{
  id: "u1",
  name: "Grace Mondal",
  email: "admin@rhema.ai",
  role: "Admin",
  church: "—",
  status: "active",
  last: "Now"
}, {
  id: "u2",
  name: "Dr. Miriam Das",
  email: "miriam.das@example.org",
  role: "Religion expert",
  church: "—",
  status: "active",
  last: "Today"
}, {
  id: "u3",
  name: "Rev. Tenzin Norbu",
  email: "t.norbu@example.org",
  role: "Religion expert",
  church: "—",
  status: "active",
  last: "Yesterday"
}, {
  id: "u4",
  name: "Daniel Sarkar",
  email: "daniel.s@example.com",
  role: "Pastor",
  church: "Living Water Fellowship, Mirpur",
  status: "active",
  last: "Today"
}, {
  id: "u5",
  name: "Pastor Samuel Roy",
  email: "samuel.roy@example.com",
  role: "Mentor",
  church: "Living Water Fellowship, Mirpur",
  status: "active",
  last: "Today"
}, {
  id: "u6",
  name: "Esther Baidya",
  email: "esther.b@example.com",
  role: "Church leader",
  church: "Living Water Fellowship, Mirpur",
  status: "active",
  last: "Sep 22"
}, {
  id: "u7",
  name: "Bishop Anil Thapa",
  email: "a.thapa@example.org",
  role: "Regional authority",
  church: "Koshi Province",
  status: "active",
  last: "Sep 20"
}, {
  id: "u8",
  name: "Priya Rai",
  email: "priya.rai@example.com",
  role: "Pastor",
  church: "Grace Chapel, Cuttack",
  status: "invited",
  last: "—"
}, {
  id: "u9",
  name: "Arif Hossain",
  email: "arif@example.com",
  role: "Reader",
  church: "—",
  status: "active",
  last: "Sep 25"
}, {
  id: "u10",
  name: "Nila Chakma",
  email: "nila.c@example.com",
  role: "Reader",
  church: "—",
  status: "suspended",
  last: "Aug 30"
}];
function AccountsScreen() {
  const wide = window.useWide(900);
  const [list, setList] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ca_accounts")) || acSeed;
    } catch (e) {
      return acSeed;
    }
  });
  const [log, setLog] = React.useState([]);
  const [q, setQ] = React.useState("");
  const [role, setRole] = React.useState("all");
  const [sel, setSel] = React.useState(null);
  const [invite, setInvite] = React.useState(false);
  const [inv, setInv] = React.useState({
    email: "",
    role: "Religion expert"
  });
  const [invErr, setInvErr] = React.useState("");
  const [toast, setToast] = React.useState(null);
  const [reveal, setReveal] = React.useState(null);
  const [asking, setAsking] = React.useState(false);
  const [reason, setReason] = React.useState(AC_REASONS[0]);
  const [conf, setConf] = React.useState("");
  const [nShown, setNShown] = React.useState(6);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);
  const now = () => new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  const addLog = (who, what) => setLog(g => [{
    who,
    what,
    at: now()
  }, ...g]);
  const save = (l, entry, msg) => {
    setList(l);
    localStorage.setItem("ca_accounts", JSON.stringify(l));
    if (entry) addLog(entry.who, entry.what);
    if (msg) setToast(msg);
  };
  const shown = list.filter(a => (role === "all" || a.role === role) && (!q || acHandle(a).toLowerCase().includes(q.toLowerCase().trim())));
  const cur = sel && list.find(a => a.id === sel);
  const patch = (id, p, what) => save(list.map(a => a.id === id ? {
    ...a,
    ...p
  } : a), {
    who: acHandle(list.find(a => a.id === id)),
    what
  }, what);
  const close = () => {
    setSel(null);
    setReveal(null);
    setAsking(false);
  };
  const doReveal = () => {
    setReveal(cur.id);
    setAsking(false);
    addLog(acHandle(cur), `Identity revealed · ${reason}`);
  };
  const sendInvite = () => {
    if (!/^\S+@\S+\.\S+$/.test(inv.email)) {
      setInvErr("Use an email like name@example.com.");
      return;
    }
    const a = {
      id: "u" + Date.now(),
      name: "(set by them)",
      email: inv.email,
      role: inv.role,
      church: "—",
      status: "invited",
      last: "—"
    };
    save([a, ...list], {
      who: acHandle(a),
      what: `Invited as ${inv.role}`
    }, `Invite sent to ${acMask(inv.email)}`);
    setInvite(false);
    setInv({
      email: "",
      role: "Religion expert"
    });
    setInvErr("");
  };
  const counts = {
    total: list.length,
    invited: list.filter(a => a.status === "invited").length,
    suspended: list.filter(a => a.status === "suspended").length
  };
  const cols = "minmax(0,1fr) minmax(0,1.2fr) 110px 100px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      width: "100%",
      margin: "0 auto",
      padding: "24px var(--gutter-phone) 40px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 240px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "600 32px/1.2 var(--font-display)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Accounts"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, counts.total, " accounts \xB7 ", counts.invited, " invited \xB7 ", counts.suspended, " suspended. Everyone is shown by an anonymous handle. Real identity opens only with a stated reason (safety, a support request, an account problem or a legal request), and every reveal is logged.")), /*#__PURE__*/React.createElement(AcButton, {
    variant: "accent",
    icon: "user-plus",
    onClick: () => setInvite(true)
  }, "Invite")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1fr) 240px" : "1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(AcField, {
    label: "Search by handle",
    icon: "search",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "E-1234"
  }), /*#__PURE__*/React.createElement(AcSelect, {
    label: "Role",
    value: role,
    onChange: e => setRole(e.target.value),
    options: [{
      value: "all",
      label: "All roles"
    }, ...AC_ROLES.map(r => ({
      value: r,
      label: r
    }))]
  })), shown.length === 0 ? /*#__PURE__*/React.createElement(AcState, {
    kind: "empty",
    compact: true,
    word: q.trim() || "none",
    motif: "people",
    title: "No accounts match",
    message: "Check the handle, or show every role.",
    action: {
      label: "Clear search",
      icon: "x",
      onClick: () => {
        setQ("");
        setRole("all");
      }
    }
  }) : /*#__PURE__*/React.createElement("div", {
    role: "table",
    "aria-label": "Accounts",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, wide && /*#__PURE__*/React.createElement("div", {
    role: "row",
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      gap: 12,
      padding: "10px 16px",
      background: "var(--surface-card)",
      ...acLabel
    }
  }, /*#__PURE__*/React.createElement("span", null, "Handle"), /*#__PURE__*/React.createElement("span", null, "Role"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Last active")), shown.slice(0, nShown).map(a => {
    const [tone, lab] = AC_STATUS[a.status];
    return /*#__PURE__*/React.createElement("button", {
      role: "row",
      key: a.id,
      onClick: () => setSel(a.id),
      style: {
        width: "100%",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: wide ? cols : "minmax(0,1fr) auto",
        gap: 12,
        alignItems: "center",
        padding: "14px 16px",
        background: "transparent",
        border: 0,
        borderTop: "1px solid var(--border-subtle)",
        cursor: "pointer",
        color: "inherit"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        font: "600 16px/1.3 var(--font-mono)",
        color: "var(--text-strong)"
      }
    }, acHandle(a)), !wide && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, a.role))), wide && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body)",
        fontSize: 13,
        color: "var(--text-body)"
      }
    }, a.role), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(AcBadge, {
      tone: tone
    }, lab)), wide && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-faint)"
      }
    }, a.last));
  })), shown.length > nShown && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AcButton, {
    variant: "secondary",
    onClick: () => setNShown(nShown + 6)
  }, "Load more \xB7 ", shown.length - nShown, " left")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...acLabel,
      margin: "8px 0"
    }
  }, "Private log"), log.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      margin: 0
    }
  }, "Nothing yet this session. Role changes, suspensions and identity reveals appear here with your admin handle.") : /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, log.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      padding: "8px 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, l.at, " \xB7 ", l.who, " \xB7 ", l.what, " \xB7 by A-", acHandle(acSeed[0]).slice(2))))), /*#__PURE__*/React.createElement(AcDialog, {
    open: !!cur,
    width: 520,
    title: cur ? acHandle(cur) : "",
    onClose: close,
    actions: /*#__PURE__*/React.createElement(AcButton, {
      variant: "ghost",
      onClick: close
    }, "Done")
  }, cur && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, reveal === cur.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--warn-400)",
      background: "var(--warn-tint)",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...acLabel,
      color: "var(--warn-400)"
    }
  }, "Identity \xB7 logged \xB7 ", reason), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, cur.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 13,
      color: "var(--text-body)"
    }
  }, cur.email), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, cur.church), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, "Hidden again when you close this.")) : asking ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 14,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(AcSelect, {
    label: "Why do you need to see who this is?",
    value: reason,
    onChange: e => setReason(e.target.value),
    options: AC_REASONS,
    hint: "The reason, your handle and the time go into the private log."
  }), /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: acHandle(cur),
    value: conf,
    onChange: setConf,
    hint: "The reveal is logged."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => setAsking(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "primary",
    icon: "eye",
    disabled: !window.CAMatch(conf, acHandle(cur)),
    onClick: () => {
      setConf("");
      doReveal();
    }
  }, "Reveal identity"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement(AcIcon, {
    name: "venetian-mask",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 200px",
      font: "var(--type-body)",
      fontSize: 13,
      color: "var(--text-body)"
    }
  }, "Anonymous in the app. ", acMask(cur.email)), /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "secondary",
    icon: "eye",
    onClick: () => {
      setConf("");
      setAsking(true);
    }
  }, "Reveal identity")), /*#__PURE__*/React.createElement(AcSelect, {
    label: "Role",
    value: cur.role,
    onChange: e => patch(cur.id, {
      role: e.target.value
    }, `Role changed to ${e.target.value}`),
    options: AC_ROLES,
    hint: cur.role === "Pastor" ? "Changing a pastor’s role never moves their stage. Their review code name is not linked here." : "Every change is logged with your admin handle."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, cur.status === "invited" && /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "secondary",
    icon: "send",
    onClick: () => setToast(`Invite sent again to ${acMask(cur.email)}`)
  }, "Resend invite"), cur.status !== "suspended" ? /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "danger",
    icon: "user-x",
    disabled: cur.id === "u1",
    onClick: () => patch(cur.id, {
      status: "suspended"
    }, "Suspended")
  }, "Suspend") : /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "secondary",
    icon: "user-check",
    onClick: () => patch(cur.id, {
      status: "active"
    }, "Reactivated")
  }, "Reactivate"), /*#__PURE__*/React.createElement(AcButton, {
    size: "sm",
    variant: "ghost",
    icon: "key-round",
    onClick: () => setToast(`Password reset link sent to ${acMask(cur.email)}`)
  }, "Send password reset")), cur.id === "u1" && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      margin: 0
    }
  }, "You can\u2019t suspend your own admin account."))), /*#__PURE__*/React.createElement(AcDialog, {
    open: invite,
    width: 480,
    title: "Invite someone",
    onClose: () => setInvite(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AcButton, {
      variant: "ghost",
      onClick: () => setInvite(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(AcButton, {
      variant: "primary",
      icon: "send",
      onClick: sendInvite
    }, "Send invite"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(AcField, {
    label: "Email",
    type: "email",
    value: inv.email,
    onChange: e => {
      setInv(v => ({
        ...v,
        email: e.target.value
      }));
      setInvErr("");
    },
    error: invErr,
    placeholder: "name@example.org",
    hint: "Only used to send the invite. They appear by handle after joining."
  }), /*#__PURE__*/React.createElement(AcSelect, {
    label: "Role",
    value: inv.role,
    onChange: e => setInv(v => ({
      ...v,
      role: e.target.value
    })),
    options: AC_ROLES.filter(r => r !== "Reader"),
    hint: "Readers sign up themselves. Experts, pastors and leaders join by invite."
  }))), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 84,
      transform: "translateX(-50%)",
      zIndex: 120,
      animation: "ca-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(AcToast, {
    tone: "ok",
    onClose: () => setToast(null)
  }, toast)));
}
window.AccountsScreen = AccountsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/AccountsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/AdminScreen.jsx
try { (() => {
const {
  SegmentedControl: AsSeg,
  Button: AsButton,
  Badge: AsBadge,
  StateBlock: AsState
} = window.ChurchAIDesignSystem_06db43;
const asWho = w => w === "A reader" ? "A reader" : w === "Dr. Miriam Das" ? "Expert E-2" : w === "Rev. Tenzin Norbu" ? "Expert E-3" : "Expert";
const asLabel = {
  font: "var(--type-label)",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-faint)"
};
function AsFields({
  k,
  v,
  dim
}) {
  const CF = window.CAFaith;
  const val = CF.norm(k, v) || {};
  const fl = CF.fields(k);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 6
    }
  }, fl.map(([fk, lab]) => /*#__PURE__*/React.createElement("div", {
    key: fk
  }, fl.length > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      ...asLabel,
      fontSize: 13
    }
  }, lab), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: dim ? "var(--text-muted)" : "var(--text-body)",
      margin: "2px 0 0",
      textDecoration: dim && val[fk] ? "line-through" : "none",
      fontStyle: val[fk] ? "normal" : "italic"
    }
  }, val[fk] || "Not covered before."))));
}
function ExpertEdits() {
  const CF = window.CAFaith;
  const [store, setStore] = window.CAExpert.use();
  const reviews = store._review || {};
  const lex = window.CA_DATA.lexicon;
  const drafts = lex.filter(x => !reviews[x.term] && CF.hasContent(store, x));
  const unwritten = lex.filter(x => !CF.hasContent(store, x));
  const approve = term => setStore({
    ...store,
    _review: {
      ...reviews,
      [term]: {
        by: window.CAExpert.expert,
        at: "Today"
      }
    }
  });
  const openTerm = term => {
    location.hash = `r=term&t=${term}&mode=faith&expert=1`;
    location.reload();
  };
  const waiting = [],
    done = [];
  Object.entries(store).filter(([k]) => k[0] !== "_").forEach(([term, blocks]) => Object.entries(blocks).forEach(([k, r]) => {
    (r.sugg || []).forEach((s, i) => waiting.push({
      term,
      k,
      i,
      ...s
    }));
    (r.log || []).forEach(l => done.push({
      term,
      k,
      ...l
    }));
  }));
  const decide = (w, ok) => {
    const entry = lex.find(x => x.term === w.term);
    const t = {
      ...store[w.term]
    };
    const r = {
      ...t[w.k]
    };
    r.sugg = r.sugg.filter((_, j) => j !== w.i);
    if (ok) {
      const fl = CF.fields(w.k);
      const old = CF.current(store, entry, w.k);
      if (fl.length === 1) {
        const nv = {
          [fl[0][0]]: w.text
        };
        r.log = [...(r.log || []), {
          kind: "Change",
          who: w.who,
          at: "Today",
          old,
          new: nv
        }];
        r.val = nv;
        delete r.text;
      } else r.log = [...(r.log || []), {
        kind: "Approved",
        who: w.who,
        at: "Today",
        note: w.text,
        old,
        new: old
      }];
    }
    t[w.k] = r;
    setStore({
      ...store,
      [w.term]: t
    });
  };
  const H = ({
    children,
    n
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, children), n != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, n));
  const box = {
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      width: "100%",
      margin: "0 auto",
      padding: "28px var(--gutter-phone) 40px",
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Every word has the same Faith mode. The agent drafts it, a religion expert checks it, and every edit keeps the old text beside the new."), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: drafts.length
  }, "Waiting for a person"), drafts.length === 0 ? /*#__PURE__*/React.createElement(AsState, {
    kind: "empty",
    compact: true,
    word: "checked",
    motif: "check",
    message: "Every drafted entry has been checked by a person."
  }) : /*#__PURE__*/React.createElement("div", {
    style: box
  }, drafts.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: x.term,
    style: {
      padding: 14,
      borderTop: i ? "1px solid var(--border-subtle)" : 0,
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 18px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, x.term), /*#__PURE__*/React.createElement(AsBadge, {
    tone: "warn"
  }, "Drafted by the agent"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(AsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => openTerm(x.term)
  }, "Open"), /*#__PURE__*/React.createElement(AsButton, {
    size: "sm",
    variant: "primary",
    onClick: () => approve(x.term)
  }, "Mark checked"))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: unwritten.length
  }, "Not written yet"), unwritten.length === 0 ? /*#__PURE__*/React.createElement(AsState, {
    kind: "empty",
    compact: true,
    word: "written",
    motif: "check",
    message: "Every word has a Faith mode draft."
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 6
    }
  }, unwritten.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.term,
    onClick: () => openTerm(x.term),
    style: {
      height: 36,
      padding: "0 14px",
      borderRadius: 999,
      border: "1px dashed var(--border-default)",
      background: "transparent",
      color: "var(--text-body)",
      font: "600 13px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, x.term, " \xB7 Make")))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: waiting.length
  }, "Suggestions and reader notes"), waiting.length === 0 ? /*#__PURE__*/React.createElement(AsState, {
    kind: "empty",
    compact: true,
    word: "clear",
    motif: "check",
    message: "No suggestions or reader notes are waiting."
  }) : /*#__PURE__*/React.createElement("div", {
    style: box
  }, waiting.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: w.term + w.k + w.i,
    style: {
      padding: 16,
      borderTop: i ? "1px solid var(--border-subtle)" : 0,
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 320px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 18px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, w.term), /*#__PURE__*/React.createElement("span", {
    style: asLabel
  }, CF.title(w.k)), /*#__PURE__*/React.createElement(AsBadge, {
    tone: "warn"
  }, w.who === "A reader" ? "Reader note" : "Suggestion")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: "0 0 6px"
    }
  }, w.text), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, asWho(w.who), " \xB7 ", w.at)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => decide(w, false)
  }, "Decline"), /*#__PURE__*/React.createElement(AsButton, {
    size: "sm",
    variant: "primary",
    onClick: () => decide(w, true)
  }, "Approve")))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, null, "Made and changed"), done.length === 0 ? /*#__PURE__*/React.createElement(AsState, {
    kind: "empty",
    compact: true,
    word: "untouched",
    motif: "check",
    message: "No expert has made or changed a block yet."
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 6
    }
  }, done.slice().reverse().map((l, i) => {
    const entry = lex.find(x => x.term === l.term);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: 14,
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-strong)"
      }
    }, l.term), " \xB7 ", CF.title(l.k), " \xB7 ", l.kind === "Make" ? "Made" : l.kind === "Approved" ? "Suggestion approved" : "Changed", " by ", asWho(l.who), " \xB7 ", l.at), l.note ? /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body)",
        fontSize: 16,
        color: "var(--text-body)",
        margin: 0
      }
    }, l.note) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: asLabel
    }, "Old"), /*#__PURE__*/React.createElement(AsFields, {
      k: l.k,
      v: l.old,
      dim: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        ...asLabel,
        color: "var(--lamp-400)"
      }
    }, "New"), /*#__PURE__*/React.createElement(AsFields, {
      k: l.k,
      v: l.new ?? CF.current(store, entry, l.k)
    }))));
  }))));
}
function AdminScreen({
  tab: initialTab
}) {
  const [tab, setTab] = React.useState(initialTab || "accounts");
  React.useEffect(() => {
    window.CAAdminTabSeen && window.CAAdminTabSeen(tab);
  }, [tab]);
  React.useEffect(() => {
    window.CAAdminTab = setTab;
    return () => {
      if (window.CAAdminTab === setTab) window.CAAdminTab = null;
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 56,
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
      padding: "8px var(--gutter-phone)",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#r=search",
    style: {
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "none",
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center"
    }
  }, "\u2190 App"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...asLabel,
      color: "var(--lamp-400)"
    }
  }, "Admin"), /*#__PURE__*/React.createElement(AsSeg, {
    size: "sm",
    label: "Draft section",
    value: tab,
    onChange: setTab,
    options: [{
      value: "accounts",
      label: "Accounts"
    }, {
      value: "map",
      label: "Ideas list"
    }, {
      value: "draftmap",
      label: "Ideas map"
    }, {
      value: "edits",
      label: "Faith review"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "../pipeline/index.html#role=reviewer&r=queue",
    style: {
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "none",
      minHeight: 44,
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, "Review queue \u2192")), tab === "accounts" ? /*#__PURE__*/React.createElement(AccountsScreen, null) : tab === "draftmap" ? window.CAGuard.lockdown() ? null : /*#__PURE__*/React.createElement(DraftMap, null) : tab === "map" ? window.CAGuard.lockdown() ? /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      width: "100%",
      margin: "0 auto",
      padding: "32px var(--gutter-phone)"
    }
  }, /*#__PURE__*/React.createElement(AsState, {
    kind: "unavailable",
    compact: true,
    title: "Unavailable",
    message: ""
  })) : /*#__PURE__*/React.createElement(MapDraft, null) : /*#__PURE__*/React.createElement(ExpertEdits, null));
}
window.AdminScreen = AdminScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/AdminScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/AuthScreen.jsx
try { (() => {
const {
  TextField: AuField,
  Button: AuButton,
  Checkbox: AuCheck,
  SegmentedControl: AuSeg,
  Wordmark: AuMark,
  Icon: AuIcon
} = window.ChurchAIDesignSystem_06db43;
function useSession() {
  const [s, setS] = React.useState(window.CASession.get());
  React.useEffect(() => {
    const f = () => setS(window.CASession.get());
    window.addEventListener("ca-session", f);
    return () => window.removeEventListener("ca-session", f);
  }, []);
  return [s, window.CASession.set];
}
function usePrefs() {
  const [p, setP] = React.useState(window.CAPrefs.get());
  React.useEffect(() => {
    const f = () => setP({
      ...window.CAPrefs.get()
    });
    window.addEventListener("ca-prefs", f);
    return () => window.removeEventListener("ca-prefs", f);
  }, []);
  return [p, patch => window.CAPrefs.set(patch)];
}
function AuthScreen({
  go,
  initialTab
}) {
  const [, setSession] = useSession();
  const [tab, setTab] = React.useState(initialTab || "create");
  const [f, setF] = React.useState({
    name: "",
    email: "",
    pw: "",
    agree: false
  });
  const [err, setErr] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const set = k => e => setF(s => ({
    ...s,
    [k]: e && e.target ? e.target.type === "checkbox" ? e.target.checked : e.target.value : e
  }));
  const submit = ev => {
    ev.preventDefault();
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Use an email like name@example.com.";
    if (f.pw.length < 8) e.pw = "Use at least 8 characters.";
    if (tab === "create" && !f.agree) e.agree = true;
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setTimeout(() => {
      const admin = f.email.trim().toLowerCase() === "admin@rhema.ai";
      setSession({
        kind: admin ? "admin" : "member",
        name: admin ? "Admin" : f.name.trim() || "Anonymous reader",
        email: f.email.trim()
      });
      if (tab === "create" && !admin) {
        try {
          if (!localStorage.getItem("ca_team_note_seen")) localStorage.setItem("ca_team_note", "1");
        } catch (x) {}
      }
      setBusy(false);
      go(admin ? "admin" : localStorage.getItem("ca_onboarded") ? "search" : "intro");
    }, 700);
  };
  const guest = () => {
    setSession({
      kind: "guest",
      name: "Guest"
    });
    go(localStorage.getItem("ca_onboarded") ? "search" : "intro");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440,
      width: "100%",
      margin: "0 auto",
      padding: "40px var(--gutter-phone) 32px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: -24
    }
  }, /*#__PURE__*/React.createElement(window.CALangPick, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "800 clamp(44px,13vw,60px)/.95 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: 0,
      textWrap: "balance"
    }
  }, tab === "create" ? "Create an account." : "Welcome back."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-muted)",
      margin: "12px 0 0"
    }
  }, tab === "create" ? "Save words and get the monthly question." : "Sign in to pick up where you left off.")), /*#__PURE__*/React.createElement(AuSeg, {
    label: "Account",
    value: tab,
    onChange: t => {
      setTab(t);
      setErr({});
    },
    options: [{
      value: "create",
      label: "Create account"
    }, {
      value: "signin",
      label: "Sign in"
    }],
    style: {
      alignSelf: "flex-start"
    }
  }), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, tab === "create" && /*#__PURE__*/React.createElement(AuField, {
    label: "Display name (optional)",
    value: f.name,
    onChange: set("name"),
    placeholder: "A nickname is fine",
    hint: "Optional. Nobody sees your email."
  }), /*#__PURE__*/React.createElement(AuField, {
    label: "Email",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    icon: "mail",
    value: f.email,
    onChange: set("email"),
    error: err.email,
    placeholder: "name@example.com"
  }), /*#__PURE__*/React.createElement(AuField, {
    label: "Password",
    type: "password",
    autoComplete: tab === "create" ? "new-password" : "current-password",
    icon: "lock",
    value: f.pw,
    onChange: set("pw"),
    error: err.pw,
    hint: tab === "create" ? undefined : undefined
  }), tab === "create" && /*#__PURE__*/React.createElement("ul", {
    "aria-label": "Password rules",
    "aria-live": "polite",
    style: {
      listStyle: "none",
      margin: "-4px 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, [["8 characters or more", f.pw.length >= 8], ["At least one number (0–9) or symbol (!?#)", /[^A-Za-z]/.test(f.pw)], ["Different from your email", !!f.pw && f.pw.toLowerCase() !== f.email.trim().toLowerCase() && !(f.email && f.pw.toLowerCase().includes(f.email.split("@")[0].toLowerCase()))]].map(([t, ok]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      font: "600 13px/1.3 var(--font-body)",
      color: ok ? "var(--text-body)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: ok ? "var(--ok-tint)" : "transparent",
      border: ok ? "none" : "1px dashed var(--border-strong)",
      color: "var(--ok-400)",
      transition: "background 200ms var(--ease-out)"
    }
  }, ok && /*#__PURE__*/React.createElement(AuIcon, {
    name: "check",
    size: 16
  })), t, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)"
    }
  }, ok ? ", done" : ", not yet")))), tab === "create" && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-md)",
      outline: err.agree ? "1px solid var(--danger-400)" : "none",
      outlineOffset: 4
    }
  }, /*#__PURE__*/React.createElement(AuCheck, {
    label: "I agree to the terms and privacy policy",
    checked: f.agree,
    onChange: set("agree")
  })), tab === "signin" && /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      font: "600 13px/1 var(--font-body)",
      alignSelf: "flex-start",
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center"
    }
  }, "Forgot password?"), /*#__PURE__*/React.createElement(AuButton, {
    type: "submit",
    variant: "accent",
    size: "lg",
    fullWidth: true,
    loading: busy
  }, tab === "create" ? "Create account" : "Sign in with email")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderTop: "1px solid var(--border-subtle)"
    }
  }), "or", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderTop: "1px solid var(--border-subtle)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AuButton, {
    variant: "secondary",
    size: "lg",
    fullWidth: true,
    iconRight: "arrow-right",
    onClick: guest
  }, "Continue as guest"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "No email. No name. Nothing about you is stored."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: innerWidth < 700 ? "none" : "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
      gap: 6
    }
  }, ["Look up any word", "Answer the monthly question", "See the map of ideas", "Flag an entry for review"].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      font: "var(--type-source)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(window.ChurchAIDesignSystem_06db43.Icon, {
    name: "check",
    size: 16,
    color: "var(--ok-400)"
  }), t))))), tab === "signin" && /*#__PURE__*/React.createElement("details", {
    "data-demo": "",
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center"
    }
  }, "Demo only"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0"
    }
  }, "Sign in as admin@rhema.ai to open admin.")));
}
Object.assign(window, {
  AuthScreen,
  useSession,
  usePrefs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/AuthScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/GentlePause.jsx
try { (() => {
const {
  Button: PzButton,
  Icon: PzIcon
} = window.ChurchAIDesignSystem_06db43;

// Gentle pause: after a long stretch of active use, one calm card. Never blocks, never counts streaks.
const PZ_KEY = "ca_pause_min";
const pzMinutes = () => {
  const v = localStorage.getItem(PZ_KEY);
  return v === "off" ? 0 : +(v || 25);
};
function GentlePause({
  route
}) {
  const [show, setShow] = React.useState(false);
  const [mins, setMins] = React.useState(0);
  const active = React.useRef(0),
    last = React.useRef(Date.now()),
    snoozed = React.useRef(false),
    shown = React.useRef(false);
  React.useEffect(() => {
    const demo = new URLSearchParams(location.hash.slice(1)).get("pause") === "1";
    const bump = () => {
      last.current = Date.now();
    };
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach(e => addEventListener(e, bump, {
      passive: true
    }));
    const id = setInterval(() => {
      const limit = pzMinutes();
      if (!limit || snoozed.current || shown.current || document.hidden) return;
      if (Date.now() - last.current < 60000) active.current += demo ? 60 : 5;
      if (active.current >= limit * 60 && !sessionStorage.getItem("ca_paused")) {
        shown.current = true;
        clearInterval(id);
        setMins(Math.round(active.current / 60));
        setShow(true);
      }
    }, demo ? 400 : 5000);
    return () => {
      clearInterval(id);
      ["pointerdown", "keydown", "scroll", "touchstart"].forEach(e => removeEventListener(e, bump));
    };
  }, []);
  if (!show || ["intro", "welcome", "signin"].includes(route)) return null;
  const done = keep => {
    sessionStorage.setItem("ca_paused", "1");
    snoozed.current = true;
    setShow(false);
    if (!keep) window.CAGuard.plain();
  };
  const reduce = document.documentElement.hasAttribute("data-reduce-motion");
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "false",
    "aria-labelledby": "pz-t",
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 150,
      display: "flex",
      justifyContent: "center",
      padding: "0 var(--gutter-phone) calc(16px + env(safe-area-inset-bottom))",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto",
      width: "100%",
      maxWidth: 440,
      padding: 20,
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-lg)",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      animation: reduce ? "none" : "ca-rise 700ms var(--ease-out) both"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 44,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-raised)",
      color: "var(--lamp-400)",
      animation: reduce ? "none" : "ca-breathe 4.8s var(--ease-in-out) 1"
    }
  }, /*#__PURE__*/React.createElement(PzIcon, {
    name: "sunrise",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "pz-t",
    style: {
      margin: 0,
      font: "800 24px/1.15 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "You\u2019ve been here ", mins, " minutes."), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-pastoral)",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "Maybe talk it over with someone."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(PzButton, {
    variant: "secondary",
    onClick: () => done(true)
  }, "Keep reading"), /*#__PURE__*/React.createElement(PzButton, {
    variant: "ghost",
    onClick: () => done(false)
  }, "Close for now")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Once per visit. Change it in Settings.")));
}
window.GentlePause = GentlePause;
window.CAPauseMinutes = {
  get: () => localStorage.getItem(PZ_KEY) || "25",
  set: v => localStorage.setItem(PZ_KEY, v)
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/GentlePause.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/GraphScreen.jsx
try { (() => {
const {
  Switch: GsSwitch,
  SegmentedControl: GsSeg,
  IconButton: GsIconBtn,
  Button: GsButton,
  Badge: GsBadge,
  StateBlock: GsState,
  TextField: GsField,
  Dialog: GsDialog,
  Toast: GsToast,
  Icon: GsIcon
} = window.ChurchAIDesignSystem_06db43;
const gsDraft = {
  id: "2026-10",
  label: "Oct 2026 · draft",
  question: "What does faith mean to you?",
  term: "faith",
  answers: 97,
  flagged: 3,
  nodes: [["peace", 38, 1], ["prayer", 30], ["family", 26], ["silence", 17, 1], ["nature", 14, 1], ["hope", 21], ["worry", 12, 1], ["church", 16], ["work", 9], ["exile", 2, 1]],
  links: [["peace", "prayer", 14, "s"], ["peace", "silence", 11, "s"], ["peace", "nature", 8, "s"], ["family", "peace", 9, "s"], ["hope", "prayer", 7, "s"], ["worry", "work", 6, "s"], ["worry", "peace", 7, "t"], ["church", "prayer", 9, "s"], ["family", "work", 5, "t"], ["church", "silence", 4, "t"], ["exile", "worry", 2, "s"]]
};
function gsLayout(months) {
  const ids = [...new Set(months.flatMap(m => m.nodes.map(n => n[0])))];
  const links = months.flatMap(m => m.links);
  const W = {};
  months.forEach(m => m.nodes.forEach(n => W[n[0]] = Math.max(W[n[0]] || 0, n[1])));
  const P = {};
  ids.forEach((id, i) => {
    const a = i * 2.39996;
    const r = 40 + 18 * Math.sqrt(i);
    P[id] = {
      x: Math.cos(a) * r,
      y: Math.sin(a) * r
    };
  });
  for (let it = 0; it < 400; it++) {
    const F = {};
    ids.forEach(id => F[id] = {
      x: -P[id].x * 0.004,
      y: -P[id].y * 0.004
    });
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = P[ids[i]],
        b = P[ids[j]];
      let dx = a.x - b.x,
        dy = a.y - b.y;
      const rr = 60 + Math.sqrt(W[ids[i]]) * 3.4 + Math.sqrt(W[ids[j]]) * 3.4;
      const d2 = Math.max(dx * dx + dy * dy, 40);
      const f = 9000 / d2 + (d2 < rr * rr ? (rr - Math.sqrt(d2)) * 0.5 : 0);
      const d = Math.sqrt(d2);
      F[ids[i]].x += dx / d * f;
      F[ids[i]].y += dy / d * f;
      F[ids[j]].x -= dx / d * f;
      F[ids[j]].y -= dy / d * f;
    }
    links.forEach(([s, t, w]) => {
      const a = P[s],
        b = P[t];
      const dx = b.x - a.x,
        dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - 170) * 0.02 * Math.min(1, w / 8);
      F[s].x += dx / d * f;
      F[s].y += dy / d * f;
      F[t].x -= dx / d * f;
      F[t].y -= dy / d * f;
    });
    ids.forEach(id => {
      P[id].x += Math.max(-8, Math.min(8, F[id].x));
      P[id].y += Math.max(-8, Math.min(8, F[id].y));
    });
  }
  return P;
}
const gsTerms = ["salvation", "marriage", "love", "faith"];
function gsPublished() {
  try {
    return JSON.parse(localStorage.getItem("ca_map_published"));
  } catch (e) {
    return null;
  }
}
function GraphScreen({
  admin,
  offset = 0
}) {
  const wide = window.useWide();
  const pubBase = window.CA_DATA.months.filter(m => m.published);
  const extra = !admin && gsPublished();
  const pub = extra ? [...pubBase.filter(x => x.id !== extra.id), extra] : pubBase;
  const [draft, setDraft] = React.useState(gsDraft);
  const pair = (admin ? [pub[pub.length - 1], draft] : pub.slice(-2)).filter(Boolean);
  const hasScrub = pair.length === 2;
  const curM = pair[pair.length - 1],
    lastM = hasScrub ? pair[0] : null;
  const [t, setT] = React.useState(1);
  const tt = hasScrub ? t : 1;
  const m = tt >= 0.5 ? curM : lastM;
  const before = mo => {
    const i = pub.findIndex(x => x.id === mo.id);
    return mo === draft ? pub[pub.length - 1] : i > 0 ? pub[i - 1] : null;
  };
  const prevM = before(m);
  const prevIds = new Set((prevM || {
    nodes: []
  }).nodes.map(n => n[0]));
  const anim = React.useRef(0);
  const scrubTo = (to, open) => {
    cancelAnimationFrame(anim.current);
    const from = t,
      t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / 420),
        e = 1 - Math.pow(1 - k, 3);
      setT(from + (to - from) * e);
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
    if (open) {
      setSel(null);
      setTotals(true);
    }
  };
  const base = React.useMemo(() => gsLayout(admin ? [pub[pub.length - 1], gsDraft].filter(Boolean) : pub), [admin, pub.length]);
  const [pos, setPos] = React.useState(base);
  React.useEffect(() => setPos(base), [base]);
  const fit = () => {
    const xs = [...new Set(pair.flatMap(p => p.nodes.map(n => n[0])))].map(id => [id]).map(n => base[n[0]]).filter(Boolean);
    if (!xs.length) return {
      x: 0,
      y: 0,
      k: 1
    };
    const pad = 40;
    const minX = Math.min(...xs.map(p => p.x)) - pad,
      maxX = Math.max(...xs.map(p => p.x)) + pad,
      minY = Math.min(...xs.map(p => p.y)) - pad,
      maxY = Math.max(...xs.map(p => p.y)) + pad + 10;
    const {
      w,
      h
    } = size.current;
    const hh = wide ? h - 60 : h - 210;
    const k = Math.max(0.4, Math.min(1.6, w * 0.9 / (maxX - minX), hh * 0.9 / (maxY - minY)));
    return {
      x: -((minX + maxX) / 2) * k,
      y: -((minY + maxY) / 2) * k + (wide ? 20 : -60),
      k
    };
  };
  const [view, setView] = React.useState({
    x: 0,
    y: 0,
    k: 1
  });
  const [reading, setReading] = React.useState("shared");
  const [limit, setLimit] = React.useState(false);
  const [totals, setTotals] = React.useState(false);
  const [showTexts, setShowTexts] = React.useState(false);
  const [hint, setHint] = React.useState(true);
  const [record, setRecord] = React.useState([]);
  const [sel, setSel] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [dlg, setDlg] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [undo, setUndo] = React.useState(null);
  const [conf, setConf] = React.useState("");
  const undoT = React.useRef(0);
  const [rename, setRename] = React.useState("");
  const drag = React.useRef(null);
  const svg = React.useRef(null);
  const ptrs = React.useRef(new Map());
  const pinch = React.useRef(null);
  const size = React.useRef({
    w: 800,
    h: 600
  });
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const f = () => {
      if (!svg.current) return;
      const r = svg.current.getBoundingClientRect();
      size.current = {
        w: r.width,
        h: r.height
      };
      setView(fit());
    };
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [curM.id]);
  const raw = m.nodes.map(n => pos[n[0]] || {
    x: 0,
    y: 0
  });
  const cx = raw.reduce((s, p) => s + p.x, 0) / (raw.length || 1),
    cy = raw.reduce((s, p) => s + p.y, 0) / (raw.length || 1);
  const dists = raw.map(p => Math.hypot(p.x - cx, p.y - cy)).sort((a, b) => a - b);
  const rad = dists[Math.floor(dists.length * 0.55)] || 0;
  const tight = p => {
    if (!limit) return p;
    const dx = p.x - cx,
      dy = p.y - cy,
      d = Math.hypot(dx, dy);
    if (d <= rad) return p;
    const nd = rad + (d - rad) * 0.6;
    return {
      x: cx + dx / d * nd,
      y: cy + dy / d * nd
    };
  };
  const outerCount = dists.filter(d => d > rad).length;
  const toggleLimit = on => {
    setLimit(on);
    if (on) {
      const t = new Date();
      setRecord(r => [{
        month: m.label,
        at: t.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        n: outerCount
      }, ...r]);
    }
  };
  const hiddenRare = admin ? 0 : m.nodes.filter(n => n[1] < 3).length;
  const pw = mo => Object.fromEntries((mo ? mo.nodes : []).filter(n => admin || n[1] >= 3).map(n => [n[0], n[1]]));
  const WL = pw(lastM),
    WC = pw(curM),
    flag = Object.fromEntries(m.nodes.map(n => [n[0], !!n[2]]));
  const unionIds = [...new Set([...Object.keys(WL), ...Object.keys(WC)])];
  const nodes = unionIds.map(id => {
    const wl = WL[id] || 0,
      wc = WC[id] || 0,
      w = wl + (wc - wl) * tt,
      wSide = tt >= 0.5 ? wc : wl;
    const isNew = wSide > 0 && (prevM ? !prevIds.has(id) : flag[id]);
    return {
      id,
      w,
      wl,
      wc,
      wSide,
      isNew,
      p: tight(pos[id] || {
        x: 0,
        y: 0
      })
    };
  }).filter(n => n.w > 0.3);
  if (limit) for (let it = 0; it < 30; it++) for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const A = nodes[i],
      B = nodes[j];
    const min = 9 + Math.sqrt(A.w) * 3.4 + 9 + Math.sqrt(B.w) * 3.4 + 24;
    const dx = B.p.x - A.p.x,
      dy = B.p.y - A.p.y,
      d = Math.hypot(dx, dy) || 0.01;
    if (d < min) {
      const push = (min - d) / 2,
        ux = dx / d,
        uy = dy / d;
      A.p = {
        x: A.p.x - ux * push,
        y: A.p.y - uy * push
      };
      B.p = {
        x: B.p.x + ux * push,
        y: B.p.y + uy * push
      };
    }
  }
  const nmap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const links = m.links.filter(l => nmap[l[0]] && nmap[l[1]]);
  const drawLinks = hasScrub ? [...lastM.links.map(l => [...l, 1 - tt, "L"]), ...curM.links.map(l => [...l, tt, "C"])].filter(l => nmap[l[0]] && nmap[l[1]] && l[4] > 0.02) : links.map(l => [...l, 1, "C"]);
  const R = w => w < 1 ? 12.4 * w : 9 + Math.sqrt(w) * 3.4;
  const focus = hover || sel;
  const nb = focus ? links.filter(l => l[0] === focus || l[1] === focus).map(l => ({
    id: l[0] === focus ? l[1] : l[0],
    w: l[2],
    kind: l[3]
  })) : [];
  const nbIds = new Set(nb.map(n => n.id));
  const dir = n => !hasScrub ? null : n.wl === 0 ? "new" : n.wc === 0 ? "gone" : n.wc > n.wl ? "up" : n.wc < n.wl ? "down" : "same";
  const toWorld = (cx, cy) => {
    const r = svg.current.getBoundingClientRect();
    return {
      x: (cx - r.left - r.width / 2 - view.x) / view.k,
      y: (cy - r.top - r.height / 2 - view.y) / view.k
    };
  };
  const onDown = (e, id) => {
    e.stopPropagation();
    if (hint) setHint(false);
    svg.current.setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY
    });
    if (ptrs.current.size === 2) {
      const [p1, p2] = [...ptrs.current.values()];
      pinch.current = {
        d: Math.hypot(p1.x - p2.x, p1.y - p2.y),
        k: view.k
      };
      drag.current = null;
      return;
    }
    drag.current = id ? {
      id,
      moved: false
    } : {
      pan: true,
      sx: e.clientX,
      sy: e.clientY,
      vx: view.x,
      vy: view.y,
      moved: false
    };
  };
  const onMove = e => {
    if (ptrs.current.has(e.pointerId)) ptrs.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY
    });
    if (pinch.current && ptrs.current.size === 2) {
      const [p1, p2] = [...ptrs.current.values()];
      const dd = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const k = Math.max(0.4, Math.min(3, pinch.current.k * dd / pinch.current.d));
      setView(v => ({
        ...v,
        k
      }));
      return;
    }
    const d = drag.current;
    if (!d) return;
    d.moved = true;
    if (d.pan) setView(v => ({
      ...v,
      x: d.vx + e.clientX - d.sx,
      y: d.vy + e.clientY - d.sy
    }));else {
      const w = toWorld(e.clientX, e.clientY);
      setPos(p => ({
        ...p,
        [d.id]: w
      }));
    }
  };
  const onUp = e => {
    if (e) ptrs.current.delete(e.pointerId);
    if (pinch.current) {
      if (ptrs.current.size < 2) pinch.current = null;
      drag.current = null;
      return;
    }
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) {
      if (d.pan) setSel(null);else pick(d.id);
    }
  };
  const pick = id => {
    if (!admin && gsTerms.includes(id) && window.CAGo) {
      window.CAGo("term", id, {
        m: "faith"
      });
      return;
    }
    setTotals(false);
    setSel(id);
  };
  const zoom = f => setView(v => ({
    ...v,
    k: Math.max(0.4, Math.min(3, v.k * f))
  }));
  const newCount = nodes.filter(n => n.isNew).length;
  const selNode = sel && nmap[sel];
  const editNode = kind => {
    if (kind === "remove") {
      const prev = draft,
        name = sel;
      setDraft(d => ({
        ...d,
        nodes: d.nodes.filter(n => n[0] !== sel),
        links: d.links.filter(l => l[0] !== sel && l[1] !== sel)
      }));
      clearTimeout(undoT.current);
      setUndo(prev);
      setToast(`Removed “${name}”.`);
      undoT.current = setTimeout(() => setUndo(null), 5000);
    }
    if (kind === "rename" && rename.trim()) {
      const nn = rename.trim().toLowerCase();
      setPos(p => ({
        ...p,
        [nn]: p[sel]
      }));
      setDraft(d => ({
        ...d,
        nodes: d.nodes.map(n => n[0] === sel ? [nn, n[1], n[2]] : n),
        links: d.links.map(l => l.map((x, i) => i < 2 && x === sel ? nn : x))
      }));
    }
    if (kind === "merge") {
      const into = rename.trim().toLowerCase();
      if (!nmap[into]) return;
      setDraft(d => ({
        ...d,
        nodes: d.nodes.filter(n => n[0] !== sel).map(n => n[0] === into ? [n[0], n[1] + nmap[sel].w, n[2]] : n),
        links: d.links.filter(l => !(l[0] === sel && l[1] === into) && !(l[1] === sel && l[0] === into)).map(l => l.map((x, i) => i < 2 && x === sel ? into : x))
      }));
    }
    setSel(null);
    setDlg(null);
    setRename("");
  };
  const allNodes = m.nodes.map(([id, w, isNew]) => ({
    id,
    w,
    isNew: !!isNew || prevIds.size > 0 && !prevIds.has(id)
  })).sort((a, b) => b.w - a.w);
  const listed = admin ? allNodes : allNodes.filter(n => n.w >= 3);
  const maxW = listed.length ? listed[0].w : 1;
  const totalsPanel = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--lamp-400)",
      flex: 1
    }
  }, m.label, " \xB7 totals"), /*#__PURE__*/React.createElement(GsIconBtn, {
    icon: "x",
    label: "Close totals",
    size: 36,
    onClick: () => setTotals(false)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px/1.15 var(--font-display)",
      color: "var(--text-strong)",
      textWrap: "balance"
    }
  }, window.CAQuestionText ? /*#__PURE__*/React.createElement(window.CAQuestionText, {
    month: m
  }) : m.question), admin && m === draft ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, m.answers), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "answers this month")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--warn-400)"
    }
  }, m.flagged), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "flagged answers"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, m.answers), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "answers")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, listed.length), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "concepts")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--lamp-400)"
    }
  }, listed.filter(n => n.isNew).length), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "new since last month"))), /*#__PURE__*/React.createElement("ul", {
    "aria-label": "Concept counts",
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, listed.map(n => /*#__PURE__*/React.createElement("li", {
    key: n.id
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => pick(n.id),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      minHeight: 44,
      padding: 0,
      background: "none",
      border: 0,
      borderTop: "1px solid var(--border-subtle)",
      cursor: "pointer",
      textAlign: "left",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10 + 18 * n.w / maxW,
      height: 10 + 18 * n.w / maxW,
      flex: "none",
      borderRadius: 99,
      background: n.isNew ? "var(--lamp-400)" : "var(--ink-3)",
      border: `1.5px solid ${n.isNew ? "var(--lamp-300)" : "var(--bone-7)"}`,
      marginLeft: (28 - (10 + 18 * n.w / maxW)) / 2,
      marginRight: (28 - (10 + 18 * n.w / maxW)) / 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, n.id), n.isNew && /*#__PURE__*/React.createElement(GsBadge, {
    tone: "info"
  }, "New"), admin && n.w < 3 && /*#__PURE__*/React.createElement(GsBadge, {
    tone: "warn"
  }, "Under 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1 var(--font-mono)",
      color: "var(--text-strong)",
      minWidth: 32,
      textAlign: "right"
    }
  }, n.w))))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      margin: 0
    }
  }, admin ? "Counts are answers that mentioned the idea. Ideas under 3 stay off the public map." : `Counts are answers that mentioned the idea. No names and no answer text.${hiddenRare ? ` ${hiddenRare} rare idea${hiddenRare > 1 ? "s" : ""} under 3 not listed.` : ""}`));
  const panel = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, totals ? totalsPanel : selNode ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      flex: 1
    }
  }, selNode.id), /*#__PURE__*/React.createElement(GsIconBtn, {
    icon: "x",
    label: "Close",
    size: 36,
    onClick: () => setSel(null)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Mentioned ", selNode.wSide, " times", hasScrub && selNode.wl > 0 && selNode.wc > 0 && selNode.wl !== selNode.wc ? ` · ${lastM.label.split(" ")[0]} ${selNode.wl} → ${curM.label.split(" ")[0]} ${selNode.wc}` : "", " ", selNode.isNew && /*#__PURE__*/React.createElement(GsBadge, {
    tone: "info"
  }, "New this month"), admin && selNode.w < 3 && /*#__PURE__*/React.createElement(GsBadge, {
    tone: "warn"
  }, "Under 3 \xB7 hidden when published")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-faint)",
      marginBottom: 8
    }
  }, "Beside it"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, nb.sort((a, b) => b.w - a.w).map(n => /*#__PURE__*/React.createElement("li", {
    key: n.id
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => pick(n.id),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      minHeight: 44,
      background: "none",
      border: 0,
      borderTop: "1px solid var(--border-subtle)",
      color: "var(--text-body)",
      font: "var(--type-body)",
      cursor: "pointer",
      padding: 0,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 0,
      borderTop: `${n.kind === "t" ? "2px dashed var(--graph-link-tension)" : "3px solid var(--bone-7)"}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, n.id), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)"
    }
  }, n.kind === "t" ? "pulls apart" : "shared", " \xB7 ", n.w)))))), admin && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "secondary",
    icon: "pencil",
    onClick: () => {
      setRename(sel);
      setDlg("rename");
    }
  }, "Rename"), /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "secondary",
    icon: "merge",
    onClick: () => {
      setRename("");
      setDlg("merge");
    }
  }, "Merge"), /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "danger",
    icon: "trash-2",
    onClick: () => editNode("remove")
  }, "Remove"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--lamp-400)"
    }
  }, m.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--text-strong)",
      textWrap: "balance"
    }
  }, window.CAQuestionText ? /*#__PURE__*/React.createElement(window.CAQuestionText, {
    month: m
  }) : m.question), (() => {
    if (!hasScrub || m !== curM) return null;
    const ch = nodes.filter(n => n.wl > 0 && n.wc > n.wl).sort((a, b) => b.wc - b.wl - (a.wc - a.wl))[0];
    const nw = nodes.filter(n => n.wl === 0 && n.wc > 0).length;
    const s = ch ? `“${ch.id}” grew most since last month.` : nw ? `${nw} new idea${nw > 1 ? "s" : ""} this month.` : "About the same as last month.";
    return /*#__PURE__*/React.createElement("p", {
      style: {
        font: "700 18px/1.35 var(--font-body)",
        color: "var(--text-strong)",
        margin: 0
      }
    }, s);
  })(), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, nodes.filter(n => n.wSide > 0).length, " ideas. Bigger = said more. Tap one."), newCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "New since last month:"), nodes.filter(n => n.isNew).map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    onClick: () => pick(n.id),
    style: {
      height: 30,
      padding: "0 12px",
      borderRadius: 999,
      border: "1px solid var(--lamp-400)",
      background: "var(--lamp-tint)",
      color: "var(--lamp-300)",
      font: "600 13px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, n.id))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 14,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-faint)"
    }
  }, "Reach \xB7 ", limit ? "Limited" : "Open"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: 0
    }
  }, limit ? `${outerCount} outer ideas pulled in tighter. This view is saved to the record.` : "Open reach. Anyone, anywhere counts as an idea. No places shown."), /*#__PURE__*/React.createElement(GsSwitch, {
    label: "Limit",
    checked: limit,
    onChange: toggleLimit
  }), record.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-faint)",
      margin: "4px 0 6px"
    }
  }, "Limited views on record"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, record.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      padding: "6px 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, r.month, " \xB7 ", r.at, " \xB7 ", r.n, " outer concepts drawn tighter")))))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      height: wide ? `calc(100dvh - ${60 + offset}px)` : `calc(100dvh - ${124 + offset}px)`,
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      overflow: "hidden",
      background: "var(--ink-0)"
    }
  }, nodes.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40
    }
  }, /*#__PURE__*/React.createElement(GsState, {
    kind: "empty",
    word: "soon",
    motif: "map",
    title: "Nothing published",
    message: "No map has been published for this month yet."
  })) : /*#__PURE__*/React.createElement("svg", {
    ref: svg,
    role: "img",
    "aria-label": `Ideas map, ${m.label}`,
    width: "100%",
    height: "100%",
    style: {
      position: "absolute",
      inset: 0,
      touchAction: "none",
      cursor: drag.current?.pan ? "grabbing" : "grab"
    },
    onPointerDown: e => onDown(e),
    onPointerMove: onMove,
    onPointerUp: onUp,
    onWheel: e => zoom(e.deltaY < 0 ? 1.1 : 0.9)
  }, /*#__PURE__*/React.createElement("g", {
    transform: `translate(${size.current.w / 2 + view.x} ${size.current.h / 2 + view.y}) scale(${view.k})`
  }, drawLinks.map(([s, t2, w, kind, fade, side]) => {
    const t = t2;
    const a = nmap[s].p,
      b = nmap[t].p;
    const on = kind === (reading === "shared" ? "s" : "t");
    const lit = focus && (s === focus || t === focus);
    return /*#__PURE__*/React.createElement("line", {
      key: side + s + t,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: kind === "t" ? "var(--graph-link-tension)" : "var(--bone-7)",
      strokeWidth: kind === "t" ? 2 : 1 + w * 0.55,
      strokeDasharray: kind === "t" ? "6 6" : undefined,
      strokeLinecap: "round",
      opacity: fade * (focus ? lit ? 0.95 : 0.06 : on ? kind === "t" ? 0.9 : 0.45 : 0.07)
    });
  }), nodes.map(n => {
    const r = R(n.w);
    const dim = focus && n.id !== focus && !nbIds.has(n.id);
    return /*#__PURE__*/React.createElement("g", {
      key: n.id,
      transform: `translate(${n.p.x} ${n.p.y})`,
      opacity: dim ? 0.25 : 1,
      style: {
        cursor: "pointer",
        transition: "opacity var(--dur-base)"
      },
      onPointerDown: e => onDown(e, n.id),
      onPointerEnter: () => setHover(n.id),
      onPointerLeave: () => setHover(null)
    }, hasScrub && (tt >= 0.5 ? n.wl : n.wc) > 0 && Math.abs(n.wc - n.wl) >= 1 && /*#__PURE__*/React.createElement("circle", {
      r: R(tt >= 0.5 ? n.wl : n.wc),
      fill: "none",
      stroke: "var(--bone-7)",
      strokeWidth: "1.25",
      strokeDasharray: "3 4",
      opacity: ".7"
    }), n.isNew && /*#__PURE__*/React.createElement("circle", {
      r: r + 6,
      fill: "none",
      stroke: "var(--lamp-400)",
      strokeWidth: "2",
      opacity: ".55"
    }), /*#__PURE__*/React.createElement("circle", {
      r: r,
      fill: n.isNew ? "var(--lamp-400)" : "var(--ink-3)",
      opacity: n.wSide === 0 ? 0.5 : 1,
      stroke: sel === n.id ? "var(--bone-9)" : n.isNew ? "var(--lamp-300)" : "var(--bone-7)",
      strokeWidth: sel === n.id ? 3 : 1.5
    }), /*#__PURE__*/React.createElement("text", {
      y: r + 6 + 14 / view.k,
      textAnchor: "middle",
      style: {
        font: `700 ${(13 + Math.min(5, n.w / 10)) / view.k}px var(--font-body)`,
        fill: "var(--text-strong)",
        paintOrder: "stroke",
        stroke: "var(--ink-0)",
        strokeWidth: 4 / view.k,
        pointerEvents: "none",
        textDecoration: !admin && gsTerms.includes(n.id) ? "underline" : "none"
      }
    }, n.id), focus === n.id && /*#__PURE__*/React.createElement("text", {
      y: 5,
      textAnchor: "middle",
      style: {
        font: "600 13px var(--font-mono)",
        fill: n.isNew ? "var(--ink-0)" : "var(--text-strong)",
        pointerEvents: "none"
      }
    }, Math.round(n.w)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 14,
      right: 14,
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto",
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, !hasScrub && /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "secondary",
    icon: "list",
    onClick: () => {
      setSel(null);
      setTotals(true);
    }
  }, m.label), hasScrub && /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Compare months",
    style: {
      height: 36,
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "0 4px",
      borderRadius: 999,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)"
    }
  }, [[lastM, 0], null, [curM, 1]].map((x, i) => x ? /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => scrubTo(x[1], true),
    "aria-pressed": m === x[0],
    "aria-label": `${x[0].label}: open totals`,
    style: {
      height: 28,
      padding: "0 10px",
      borderRadius: 999,
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      whiteSpace: "nowrap",
      background: m === x[0] ? "var(--bone-9)" : "transparent",
      color: m === x[0] ? "var(--ink-0)" : "var(--text-muted)"
    }
  }, x[1] ? admin ? "Draft" : x[0].label.split(" ")[0] : x[0].label.split(" ")[0]) : /*#__PURE__*/React.createElement("input", {
    key: "r",
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    value: t,
    "aria-label": `Scrub from ${lastM.label} to ${curM.label}`,
    onChange: e => {
      cancelAnimationFrame(anim.current);
      setT(+e.target.value);
    },
    onPointerUp: () => scrubTo(t >= 0.5 ? 1 : 0),
    style: {
      width: 96,
      accentColor: "var(--lamp-400)",
      cursor: "ew-resize"
    }
  }))), /*#__PURE__*/React.createElement(GsSeg, {
    size: "sm",
    label: "Reading",
    value: reading,
    onChange: setReading,
    options: [{
      value: "shared",
      label: "Shared"
    }, {
      value: "apart",
      label: "Pulls apart"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      borderRadius: 999,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(GsSwitch, {
    label: "Limit",
    checked: limit,
    onChange: toggleLimit
  }))), admin && /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto",
      marginLeft: "auto",
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(GsBadge, {
    tone: "neutral"
  }, "Draft \xB7 not public"), /*#__PURE__*/React.createElement(GsBadge, {
    tone: "warn"
  }, draft.flagged, " flagged answers \xB7 count only"), /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => setDlg("dismiss")
  }, "Discard draft"), /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "accent",
    icon: "upload",
    onClick: () => {
      setConf("");
      setDlg("publish");
    }
  }, "Publish"))), admin && !sel && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 14,
      right: 72,
      display: "flex",
      justifyContent: "flex-start",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "auto"
    }
  }, /*#__PURE__*/React.createElement(window.CAAboutDraft, {
    id: "mapdraft"
  }, "The assistant grouped this month\u2019s answers into ideas. It can be wrong. Nothing goes public until you publish."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 14,
      bottom: wide ? 14 : sel ? 280 : 14,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      transition: "bottom var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(GsIconBtn, {
    icon: "plus",
    label: "Zoom in",
    variant: "filled",
    onClick: () => zoom(1.2)
  }), /*#__PURE__*/React.createElement(GsIconBtn, {
    icon: "minus",
    label: "Zoom out",
    variant: "filled",
    onClick: () => zoom(0.83)
  }), /*#__PURE__*/React.createElement(GsIconBtn, {
    icon: "locate-fixed",
    label: "Reset view",
    variant: "filled",
    onClick: () => {
      setView(fit());
      setPos(base);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 14,
      display: wide ? "flex" : "none",
      gap: 16,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      borderTop: "3px solid var(--bone-7)"
    }
  }), "shared"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      borderTop: "2px dashed var(--graph-link-tension)"
    }
  }), "pulls apart"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 9,
      background: "var(--lamp-400)"
    }
  }), "new since last month"), hasScrub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 9,
      border: "1.25px dashed var(--bone-7)"
    }
  }), "other month's size")), !wide && nodes.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: totals ? "62%" : sel ? 270 : 150,
      overflow: "auto",
      padding: 18,
      background: "color-mix(in srgb, var(--ink-1) 94%, transparent)",
      backdropFilter: "var(--blur-bar)",
      borderTop: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0"
    }
  }, panel), hint && nodes.length > 0 && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "50%",
      top: "46%",
      transform: "translate(-50%,-50%)",
      pointerEvents: "none",
      display: "flex",
      gap: 8,
      alignItems: "center",
      padding: "10px 16px",
      borderRadius: 999,
      background: "color-mix(in srgb, var(--ink-2) 88%, transparent)",
      border: "1px solid var(--border-default)",
      backdropFilter: "var(--blur-bar)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-body)",
      whiteSpace: "nowrap",
      animation: "ca-rise var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(GsIcon, {
    name: "hand",
    size: 16
  }), "Drag \xB7 pinch \xB7 tap an idea"), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: 70,
      transform: "translateX(-50%)",
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(GsToast, {
    tone: "ok",
    onClose: () => {
      setToast(null);
      setUndo(null);
    }
  }, toast), undo && /*#__PURE__*/React.createElement(GsButton, {
    size: "sm",
    variant: "secondary",
    icon: "undo-2",
    onClick: () => {
      setDraft(undo);
      setUndo(null);
      setToast("Restored.");
    }
  }, "Undo"))), wide && nodes.length > 0 && /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 340,
      flex: "none",
      minHeight: 0,
      boxSizing: "border-box",
      borderLeft: "1px solid var(--border-subtle)",
      padding: 24,
      background: "var(--surface-card)",
      overflow: "auto"
    }
  }, panel), /*#__PURE__*/React.createElement(GsDialog, {
    open: dlg === "rename" || dlg === "merge",
    title: dlg === "merge" ? `Merge “${sel}” into…` : `Rename “${sel}”`,
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GsButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(GsButton, {
      variant: "primary",
      onClick: () => editNode(dlg)
    }, dlg === "merge" ? "Merge" : "Rename"))
  }, /*#__PURE__*/React.createElement(GsField, {
    label: dlg === "merge" ? "Concept to merge into" : "New label",
    value: rename,
    onChange: e => setRename(e.target.value),
    placeholder: dlg === "merge" ? "peace" : "",
    hint: dlg === "merge" ? `Choose from: ${nodes.filter(n => n.id !== sel).map(n => n.id).join(", ")}` : undefined
  })), /*#__PURE__*/React.createElement(GsDialog, {
    open: dlg === "publish" || dlg === "dismiss",
    title: dlg === "publish" ? "Publish this map?" : "Dismiss this draft?",
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GsButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(GsButton, {
      variant: dlg === "publish" ? "accent" : "danger",
      disabled: dlg === "publish" && !window.CAMatch(conf, "publish"),
      onClick: () => {
        setConf("");
        if (dlg === "publish") localStorage.setItem("ca_map_published", JSON.stringify({
          id: draft.id,
          label: "Oct 2026",
          question: draft.question,
          term: draft.term,
          published: true,
          answers: draft.answers,
          nodes: draft.nodes.filter(n => n[1] >= 3),
          links: draft.links
        }));
        setToast(dlg === "publish" ? "Published. The public map now shows Oct 2026." : "Draft dismissed. Nothing was published.");
        setDlg(null);
      }
    }, dlg === "publish" ? "Publish" : "Dismiss"))
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, dlg === "publish" ? `${nodes.filter(n => n.w >= 3).length} concepts become public. Ideas under 3 mentions and answer text are never published. The public map changes only now.` : "The draft stays private and can be rebuilt from answers."), dlg === "publish" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: "publish",
    value: conf,
    onChange: setConf,
    hint: "The public map changes for everyone."
  }))));
}
window.GraphScreen = GraphScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/GraphScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/MapDraft.jsx
try { (() => {
const {
  Button: MdButton,
  Badge: MdBadge,
  Icon: MdIcon,
  TextField: MdField,
  Dialog: MdDialog,
  Toast: MdToast,
  Switch: MdSwitch
} = window.ChurchAIDesignSystem_06db43;

// Admin map draft — a review queue, not a canvas. One job per area: list of ideas (edit), checklist + publish (decide).
const mdSeed = {
  id: "2026-10",
  label: "Oct 2026",
  question: "What does faith mean to you?",
  term: "faith",
  answers: 97,
  flagged: 3,
  kept: {
    selfharm: 1,
    hate: 1,
    sexual: 0,
    threat: 0,
    spam: 4,
    unclear: 6,
    duplicate: 3
  },
  spikes: {
    worry: "Most from one region in one hour"
  },
  nodes: [["peace", 38], ["prayer", 30], ["family", 26], ["hope", 21], ["silence", 17], ["church", 16], ["nature", 14], ["worry", 12], ["work", 9], ["exile", 2]],
  links: [["peace", "prayer", 14, "s"], ["peace", "silence", 11, "s"], ["peace", "nature", 8, "s"], ["family", "peace", 9, "s"], ["hope", "prayer", 7, "s"], ["worry", "work", 6, "s"]]
};
const mdR = w => 14 + Math.sqrt(w) * 5.2;
function mdPack(nodes, links) {
  const P = {},
    placed = [],
    GAP = 28;
  const nb = id => links.filter(l => l[0] === id || l[1] === id).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]);
  nodes.forEach(([id, w], i) => {
    const r = mdR(w);
    if (!i) {
      P[id] = {
        x: 0,
        y: 0,
        r
      };
      placed.push(id);
      return;
    }
    const anchor = nb(id).find(n => P[n]);
    let best = null;
    placed.forEach(pid => {
      const p = P[pid];
      for (let a = 0; a < 36; a++) {
        const ang = a / 36 * Math.PI * 2,
          dd = p.r + r + GAP,
          x = p.x + Math.cos(ang) * dd,
          y = p.y + Math.sin(ang) * dd;
        if (placed.some(q => Math.hypot(P[q].x - x, P[q].y - y) < P[q].r + r + GAP - 0.5)) continue;
        const score = Math.hypot(x, y * 1.25) + (anchor ? Math.hypot(P[anchor].x - x, P[anchor].y - y) * 0.8 : 0);
        if (!best || score < best.s) best = {
          x,
          y,
          s: score
        };
      }
    });
    P[id] = {
      x: best ? best.x : 0,
      y: best ? best.y : 0,
      r
    };
    placed.push(id);
  });
  return P;
}
function MdMap({
  nodes,
  links,
  hiddenIds,
  sel,
  onPick
}) {
  const box = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    box.current && ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const P = React.useMemo(() => mdPack(nodes, links), [nodes.map(n => n.join(":")).join(), links.length]);
  const ids = Object.keys(P);
  if (!ids.length) return null;
  const ext = ids.reduce((b, id) => {
    const p = P[id];
    return {
      x0: Math.min(b.x0, p.x - p.r),
      x1: Math.max(b.x1, p.x + p.r),
      y0: Math.min(b.y0, p.y - p.r - 4),
      y1: Math.max(b.y1, p.y + p.r + 4)
    };
  }, {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0
  });
  const H = 340,
    pad = 18,
    sc = Math.min(1.25, (w - pad * 2) / (ext.x1 - ext.x0), (H - pad * 2) / (ext.y1 - ext.y0));
  const X = id => w / 2 + (P[id].x - (ext.x0 + ext.x1) / 2) * sc,
    Y = id => H / 2 + (P[id].y - (ext.y0 + ext.y1) / 2) * sc;
  const near = sel ? new Set([sel, ...links.filter(l => l[0] === sel || l[1] === sel).map(l => l[0] === sel ? l[1] : l[0])]) : null;
  const maxL = Math.max(1, ...links.map(l => l[2]));
  return /*#__PURE__*/React.createElement("div", {
    ref: box,
    style: {
      position: "relative",
      height: H,
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-page)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: H,
    role: "img",
    "aria-label": `Preview of the public map: ${nodes.filter(n => !hiddenIds.has(n[0])).length} ideas`,
    style: {
      display: "block"
    }
  }, links.filter(l => P[l[0]] && P[l[1]]).map(l => {
    const lit = near && near.has(l[0]) && near.has(l[1]) && (l[0] === sel || l[1] === sel);
    return /*#__PURE__*/React.createElement("line", {
      key: l[0] + l[1],
      x1: X(l[0]),
      y1: Y(l[0]),
      x2: X(l[1]),
      y2: Y(l[1]),
      stroke: lit ? "var(--bone-8)" : "var(--bone-7)",
      strokeOpacity: near ? lit ? 0.9 : 0.08 : 0.35,
      strokeWidth: 1 + l[2] / maxL * 3,
      strokeLinecap: "round"
    });
  }), nodes.map(([id, cnt]) => {
    if (!P[id]) return null;
    const r = P[id].r * sc,
      hid = hiddenIds.has(id),
      on = sel === id,
      dim = near && !near.has(id);
    const fs = Math.max(11, Math.min(18, r * 0.42));
    return /*#__PURE__*/React.createElement("g", {
      key: id,
      onClick: () => onPick(id),
      style: {
        cursor: "pointer",
        opacity: dim ? 0.25 : 1,
        transition: "opacity 200ms var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: X(id),
      cy: Y(id),
      r: r,
      fill: hid ? "transparent" : on ? "var(--bone-8)" : "var(--ink-2)",
      stroke: hid ? "var(--border-strong)" : on ? "var(--bone-8)" : "var(--ink-4)",
      strokeWidth: "1.25",
      strokeDasharray: hid ? "4 4" : undefined
    }), r >= 18 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + (r > 34 ? -2 : fs * 0.35),
      textAnchor: "middle",
      style: {
        font: `800 ${fs}px var(--font-display)`,
        fill: on ? "var(--ink-0)" : hid ? "var(--text-muted)" : "var(--text-strong)"
      }
    }, id), r > 34 && /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + fs * 0.95,
      textAnchor: "middle",
      style: {
        font: `600 ${Math.max(10, fs * 0.6)}px var(--font-mono)`,
        fill: on ? "var(--ink-0)" : "var(--text-muted)"
      }
    }, cnt)) : /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + r + 13,
      textAnchor: "middle",
      style: {
        font: "600 13px var(--font-body)",
        fill: "var(--text-muted)"
      }
    }, id));
  })));
}
function MapDraft() {
  const wide = window.useWide(900);
  const prev = window.CA_DATA.months.filter(m => m.published).slice(-1)[0];
  const pw = Object.fromEntries((prev ? prev.nodes : []).map(n => [n[0], n[1]]));
  const [d, setD] = React.useState(mdSeed);
  const [open, setOpen] = React.useState(null);
  const [dlg, setDlg] = React.useState(null);
  const [val, setVal] = React.useState("");
  const [conf, setConf] = React.useState("");
  const [limit, setLimit] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [undo, setUndo] = React.useState(null);
  const ut = React.useRef(0);
  const [showHidden, setShowHidden] = React.useState(false);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => {
      setToast(null);
      setUndo(null);
    }, 5000);
    return () => clearTimeout(id);
  }, [toast]);
  const shown = d.nodes.filter(n => n[1] >= 3).sort((a, b) => b[1] - a[1]),
    hidden = d.nodes.filter(n => n[1] < 3);
  const flash = (msg, before) => {
    clearTimeout(ut.current);
    setUndo(before || null);
    setToast(msg);
  };
  const rename = (from, to) => {
    const t = to.trim().toLowerCase();
    if (!t || t === from) return;
    const before = d;
    setD(x => ({
      ...x,
      nodes: x.nodes.map(n => n[0] === from ? [t, n[1]] : n),
      links: x.links.map(l => [l[0] === from ? t : l[0], l[1] === from ? t : l[1], l[2], l[3]])
    }));
    setOpen(null);
    flash(`Renamed “${from}” to “${t}”.`, before);
  };
  const merge = (from, into) => {
    const t = into.trim().toLowerCase();
    if (!t || t === from || !d.nodes.find(n => n[0] === t)) return;
    const before = d,
      add = d.nodes.find(n => n[0] === from)[1];
    setD(x => ({
      ...x,
      nodes: x.nodes.filter(n => n[0] !== from).map(n => n[0] === t ? [t, n[1] + add] : n),
      links: x.links.filter(l => l[0] !== from && l[1] !== from)
    }));
    setOpen(null);
    flash(`Merged “${from}” into “${t}”.`, before);
  };
  const remove = id => {
    const before = d;
    setD(x => ({
      ...x,
      nodes: x.nodes.filter(n => n[0] !== id),
      links: x.links.filter(l => l[0] !== id && l[1] !== id)
    }));
    setOpen(null);
    flash(`Removed “${id}”.`, before);
  };
  const publish = () => {
    localStorage.setItem("ca_map_published", JSON.stringify({
      id: d.id,
      label: d.label,
      question: d.question,
      term: d.term,
      published: true,
      answers: d.answers,
      nodes: shown.map(n => [n[0], n[1], pw[n[0]] ? 0 : 1]),
      links: d.links
    }));
    setDlg(null);
    setConf("");
    flash(`Published. The public map now shows ${d.label}.`);
  };
  const trend = id => {
    const a = pw[id],
      b = d.nodes.find(n => n[0] === id)[1];
    if (!a) return ["circle-plus", "var(--lamp-400)", "New"];
    const x = b - a;
    return x > 0 ? ["arrow-up-right", "var(--ok-400)", `+${x}`] : x < 0 ? ["arrow-down-right", "var(--text-muted)", `${x}`] : ["minus", "var(--text-muted)", "Same"];
  };
  const card = {
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-lg)",
    background: "var(--surface-card)"
  };
  const lab = {
    font: "var(--type-label)",
    letterSpacing: "var(--tracking-label)",
    color: "var(--text-muted)"
  };
  const Check = ({
    ok,
    children
  }) => /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 24,
      height: 24,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: ok ? "var(--ok-tint)" : "var(--warn-tint)",
      color: ok ? "var(--ok-400)" : "var(--warn-400)"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: ok ? "check" : "circle-alert",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      paddingTop: 2,
      lineHeight: 1.4
    }
  }, children));
  const Decide = /*#__PURE__*/React.createElement("aside", {
    "aria-label": "Before you publish",
    style: {
      ...card,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      position: wide ? "sticky" : "static",
      top: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-section)",
      color: "var(--text-strong)"
    }
  }, "Before you publish"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Check, {
    ok: true
  }, hidden.length ? `${hidden.length} idea${hidden.length > 1 ? "s" : ""} under 3 mentions stay${hidden.length > 1 ? "" : "s"} hidden.` : "No idea is under 3 mentions."), /*#__PURE__*/React.createElement(Check, {
    ok: true
  }, "No answer text and no names go public."), /*#__PURE__*/React.createElement(Check, {
    ok: d.flagged === 0
  }, d.flagged ? `${d.flagged} flagged answers are left out of every count.` : "Nothing was flagged."), Object.keys(d.spikes || {}).length > 0 && /*#__PURE__*/React.createElement(Check, {
    ok: false
  }, "Unusual rise in ", Object.keys(d.spikes).join(", "), ": many answers from one region within an hour. Check before publishing."), /*#__PURE__*/React.createElement(Check, {
    ok: true
  }, "Counts shift slightly at publish to protect people.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      paddingTop: 14,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(MdSwitch, {
    label: "Limit reach",
    checked: limit,
    onChange: v => {
      setLimit(v);
      setToast(v ? "Reach limited. Outer ideas sit closer; the choice is saved to the record." : "Open reach.");
      setUndo(null);
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, limit ? "Limited: concepts only, outer ideas pulled in." : "Open: anyone can see the published ideas.")), /*#__PURE__*/React.createElement("details", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      minHeight: 40,
      display: "flex",
      alignItems: "center",
      gap: 8,
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      listStyle: "none"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "shield",
    size: 16,
    color: "var(--text-muted)"
  }), "Kept out of the map \xB7 ", Object.values(d.kept).reduce((a, b) => a + b, 0), /*#__PURE__*/React.createElement(MdIcon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "8px 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, [["selfharm", "Self-harm", "heart-handshake", "Sent to a person"], ["hate", "Attacks on a faith", "shield-alert", "Held"], ["sexual", "Sexual content", "ban", "Blocked"], ["threat", "Threats", "ban", "Blocked"], ["spam", "Spam or links", "link-2", "Dropped"], ["duplicate", "Duplicates", "copy", "Counted once"], ["unclear", "Unclear or off-topic", "circle-help", "Not counted"]].map(([k, l, ic, act]) => /*#__PURE__*/React.createElement("li", {
    key: k,
    style: {
      display: "grid",
      gridTemplateColumns: "20px minmax(0,1fr) auto",
      gap: 10,
      alignItems: "center",
      font: "var(--type-body)",
      fontSize: 16,
      color: d.kept[k] ? "var(--text-body)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: ic,
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, l, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, act)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 16px/1 var(--font-mono)"
    }
  }, d.kept[k])))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Counts only. No answer text is shown here.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "The assistant grouped answers into ideas. It can be wrong. Nothing goes public until you publish. You confirm by typing \u201Cpublish\u201D."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(MdButton, {
    variant: "accent",
    icon: "upload",
    onClick: () => {
      setConf("");
      setDlg("publish");
    },
    style: {
      whiteSpace: "nowrap"
    }
  }, "Publish"), /*#__PURE__*/React.createElement(MdButton, {
    variant: "ghost",
    onClick: () => setDlg("dismiss")
  }, "Dismiss")));
  const Row = (n, i) => {
    const [id, w] = n,
      on = open === id,
      [ic, c, t] = trend(id);
    return /*#__PURE__*/React.createElement("li", {
      key: id,
      style: {
        borderTop: i ? "1px solid var(--border-subtle)" : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) auto auto",
        gap: 12,
        alignItems: "center",
        minHeight: 56,
        padding: "8px 16px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "800 18px/1.1 var(--font-display)",
        color: "var(--text-strong)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, id), d.spikes && d.spikes[id] && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 5,
        alignItems: "center",
        font: "600 13px/1.2 var(--font-body)",
        color: "var(--warn-400)"
      }
    }, /*#__PURE__*/React.createElement(MdIcon, {
      name: "circle-alert",
      size: 16
    }), "Unusual rise \xB7 ", d.spikes[id])), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 10,
        alignItems: "center",
        font: "600 16px/1 var(--font-mono)",
        color: "var(--text-body)",
        fontVariantNumeric: "tabular-nums"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 4,
        alignItems: "center",
        color: c,
        font: "600 13px/1 var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement(MdIcon, {
      name: ic,
      size: 16
    }), t), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 26,
        textAlign: "right"
      }
    }, w)), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(on ? null : id),
      "aria-expanded": on,
      "aria-label": `Edit ${id}`,
      style: {
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: 99,
        border: "1px solid " + (on ? "var(--border-strong)" : "transparent"),
        background: on ? "var(--surface-raised)" : "transparent",
        color: "var(--text-muted)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(MdIcon, {
      name: on ? "x" : "pencil",
      size: 16
    }))), on && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        padding: "0 16px 14px"
      }
    }, /*#__PURE__*/React.createElement(MdButton, {
      size: "sm",
      variant: "secondary",
      icon: "pencil",
      onClick: () => {
        setVal(id);
        setDlg({
          k: "rename",
          id
        });
      }
    }, "Rename"), /*#__PURE__*/React.createElement(MdButton, {
      size: "sm",
      variant: "secondary",
      icon: "merge",
      onClick: () => {
        setVal("");
        setDlg({
          k: "merge",
          id
        });
      }
    }, "Merge into\u2026"), /*#__PURE__*/React.createElement(MdButton, {
      size: "sm",
      variant: "ghost",
      icon: "trash-2",
      onClick: () => remove(id)
    }, "Remove")));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      width: "100%",
      margin: "0 auto",
      padding: "24px var(--gutter-phone) 48px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lab
  }, d.label, " draft"), /*#__PURE__*/React.createElement(MdBadge, {
    tone: "neutral"
  }, "Not public")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "800 clamp(30px,6vw,44px)/1.05 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, window.CAQuestionText ? /*#__PURE__*/React.createElement(window.CAQuestionText, {
    month: d
  }) : d.question), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      flexWrap: "wrap",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, d.answers), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "answers this month")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--warn-400)"
    }
  }, d.flagged), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "flagged answers")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1fr) 340px" : "minmax(0,1fr)",
      gap: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "md-ideas",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "md-ideas",
    style: {
      margin: 0,
      font: "var(--type-section)",
      color: "var(--text-strong)",
      flex: 1
    }
  }, shown.length, " ideas go public"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.CAAdminTab && window.CAAdminTab("draftmap");
      window.scrollTo(0, 0);
    },
    style: {
      minHeight: 44,
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "700 16px/1 var(--font-body)",
      textDecoration: "none",
      minHeight: 40
    }
  }, "See it as a map", /*#__PURE__*/React.createElement(MdIcon, {
    name: "arrow-right",
    size: 16
  }))), /*#__PURE__*/React.createElement("ul", {
    style: {
      ...card,
      listStyle: "none",
      margin: 0,
      padding: 0,
      overflow: "hidden"
    }
  }, shown.map(Row)), hidden.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: "4px 16px",
      background: "transparent"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowHidden(v => !v),
    "aria-expanded": showHidden,
    style: {
      width: "100%",
      minHeight: 48,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "none",
      border: 0,
      padding: 0,
      cursor: "pointer",
      color: "var(--text-muted)",
      font: "600 16px/1.3 var(--font-body)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "eye-off",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, hidden.length, " hidden \xB7 under 3 mentions"), /*#__PURE__*/React.createElement(MdIcon, {
    name: showHidden ? "chevron-up" : "chevron-down",
    size: 16
  })), showHidden && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      padding: "0 0 12px"
    }
  }, hidden.map(n => /*#__PURE__*/React.createElement("span", {
    key: n[0],
    style: {
      height: 30,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      border: "1px dashed var(--border-strong)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, n[0]))))), Decide), /*#__PURE__*/React.createElement(MdDialog, {
    open: !!dlg && (dlg.k === "rename" || dlg.k === "merge"),
    title: dlg && dlg.k === "merge" ? `Merge “${dlg.id}” into…` : dlg ? `Rename “${dlg.id}”` : "",
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MdButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(MdButton, {
      variant: "primary",
      disabled: !val.trim() || dlg && dlg.k === "merge" && !d.nodes.find(n => n[0] === val.trim().toLowerCase() && n[0] !== dlg.id),
      onClick: () => {
        dlg.k === "merge" ? merge(dlg.id, val) : rename(dlg.id, val);
        setDlg(null);
      }
    }, dlg && dlg.k === "merge" ? "Merge" : "Rename"))
  }, /*#__PURE__*/React.createElement(MdField, {
    label: dlg && dlg.k === "merge" ? "Idea to merge into" : "New label",
    value: val,
    onChange: e => setVal(e.target.value),
    hint: dlg && dlg.k === "merge" ? `One of: ${shown.filter(n => !dlg || n[0] !== dlg.id).slice(0, 5).map(n => n[0]).join(", ")}…` : "One or two plain words."
  })), /*#__PURE__*/React.createElement(MdDialog, {
    open: dlg === "publish",
    title: `Publish ${d.label}?`,
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MdButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(MdButton, {
      variant: "accent",
      disabled: !window.CAMatch(conf, "publish"),
      onClick: publish
    }, "Publish"))
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, shown.length, " ideas become public. Hidden ideas, flagged answers and all answer text stay private."), /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: "publish",
    value: conf,
    onChange: setConf,
    hint: "The public map changes for everyone."
  })), /*#__PURE__*/React.createElement(MdDialog, {
    open: dlg === "dismiss",
    title: "Dismiss this draft?",
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MdButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Keep it"), /*#__PURE__*/React.createElement(MdButton, {
      variant: "danger",
      onClick: () => {
        setDlg(null);
        flash("Draft dismissed. Nothing was published.");
      }
    }, "Dismiss"))
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, "The draft stays private and can be rebuilt from answers.")), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 24,
      transform: "translateX(-50%)",
      zIndex: 120,
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MdToast, {
    tone: "ok",
    onClose: () => {
      setToast(null);
      setUndo(null);
    }
  }, toast), undo && /*#__PURE__*/React.createElement(MdButton, {
    size: "sm",
    variant: "secondary",
    icon: "undo-2",
    onClick: () => {
      setD(undo);
      setUndo(null);
      setToast("Restored.");
    }
  }, "Undo")));
}
window.MapDraft = MapDraft;

// Draft map — its own screen. Only the map: size, connections, hidden ideas, Sep → draft change, zoom and pan.
function DraftMap() {
  const prev = window.CA_DATA.months.filter(m => m.published).slice(-1)[0];
  const d = mdSeed,
    last = prev ? Object.fromEntries(prev.nodes.map(n => [n[0], n[1]])) : {};
  const ids = d.nodes.map(n => n[0]),
    cnt = Object.fromEntries(d.nodes);
  const box = React.useRef(null);
  const [bw, setBw] = React.useState({
    w: 900,
    h: 600
  });
  React.useEffect(() => {
    const ro = new ResizeObserver(([e]) => setBw({
      w: e.contentRect.width,
      h: e.contentRect.height
    }));
    box.current && ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const [k, setK] = React.useState(1);
  const anim = React.useRef(0);
  const morph = to => {
    cancelAnimationFrame(anim.current);
    const from = k,
      t0 = performance.now();
    const f = now => {
      const p = Math.min(1, (now - t0) / 700),
        e = 1 - Math.pow(1 - p, 3);
      setK(from + (to - from) * e);
      if (p < 1) anim.current = requestAnimationFrame(f);
    };
    anim.current = requestAnimationFrame(f);
  };
  const [sel, setSel] = React.useState(null);
  const [v, setV] = React.useState({
    z: 1,
    x: 0,
    y: 0
  });
  const drag = React.useRef(null),
    moved = React.useRef(false),
    ptrs = React.useRef(new Map());
  const P = React.useMemo(() => mdPack(d.nodes.slice().sort((a, b) => b[1] - a[1]), d.links), []);
  const ext = ids.reduce((b, id) => {
    const p = P[id];
    return {
      x0: Math.min(b.x0, p.x - p.r),
      x1: Math.max(b.x1, p.x + p.r),
      y0: Math.min(b.y0, p.y - p.r),
      y1: Math.max(b.y1, p.y + p.r)
    };
  }, {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0
  });
  const base = Math.min(1.5, (bw.w - 80) / (ext.x1 - ext.x0), (bw.h - 80) / (ext.y1 - ext.y0)),
    S = base * v.z;
  const X = id => bw.w / 2 + (P[id].x - (ext.x0 + ext.x1) / 2) * S + v.x,
    Y = id => bw.h / 2 + (P[id].y - (ext.y0 + ext.y1) / 2) * S + v.y;
  const val = id => (last[id] || 0) + ((cnt[id] || 0) - (last[id] || 0)) * k;
  const zoomAt = (f, mx = bw.w / 2, my = bw.h / 2) => setV(o => {
    const z = Math.max(0.6, Math.min(3, o.z * f)),
      q = z / o.z;
    return {
      z,
      x: mx - bw.w / 2 - (mx - bw.w / 2 - o.x) * q,
      y: my - bw.h / 2 - (my - bw.h / 2 - o.y) * q
    };
  });
  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const w = e => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", w, {
      passive: false
    });
    return () => el.removeEventListener("wheel", w);
  });
  const pd = e => {
    const r = box.current.getBoundingClientRect();
    ptrs.current.set(e.pointerId, {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    });
    box.current.setPointerCapture(e.pointerId);
    moved.current = false;
    drag.current = {
      v,
      pts: new Map(ptrs.current)
    };
  };
  const pm = e => {
    if (!drag.current || !ptrs.current.has(e.pointerId)) return;
    const r = box.current.getBoundingClientRect();
    ptrs.current.set(e.pointerId, {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    });
    const A = [...drag.current.pts.values()],
      B = [...ptrs.current.values()];
    if (A.length > 1 && B.length > 1) {
      const z = Math.max(0.6, Math.min(3, drag.current.v.z * Math.hypot(B[0].x - B[1].x, B[0].y - B[1].y) / (Math.hypot(A[0].x - A[1].x, A[0].y - A[1].y) || 1)));
      moved.current = true;
      setV({
        ...drag.current.v,
        z
      });
      return;
    }
    const dx = B[0].x - A[0].x,
      dy = B[0].y - A[0].y;
    if (!moved.current && Math.hypot(dx, dy) < 5) return;
    moved.current = true;
    setV({
      ...drag.current.v,
      x: drag.current.v.x + dx,
      y: drag.current.v.y + dy
    });
  };
  const pu = e => {
    ptrs.current.delete(e.pointerId);
    drag.current = ptrs.current.size ? {
      v,
      pts: new Map(ptrs.current)
    } : null;
  };
  const near = sel ? new Set([sel, ...d.links.filter(l => l[0] === sel || l[1] === sel).map(l => l[0] === sel ? l[1] : l[0])]) : null;
  const maxL = Math.max(...d.links.map(l => l[2]));
  const ctl = {
    width: 44,
    height: 44,
    display: "grid",
    placeItems: "center",
    border: 0,
    background: "transparent",
    color: "var(--text-strong)",
    cursor: "pointer"
  };
  const selInfo = sel && (() => {
    const a = last[sel] || 0,
      b = cnt[sel],
      with_ = d.links.filter(l => l[0] === sel || l[1] === sel).sort((x, y) => y[2] - x[2]).map(l => l[0] === sel ? l[1] : l[0]);
    return {
      b,
      a,
      with_
    };
  })();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "calc(100svh - 116px)",
      minHeight: 420,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      margin: 0
    }
  }, "Ideas map"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
      padding: "12px var(--gutter-phone)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.CAAdminTab && window.CAAdminTab("map");
      window.scrollTo(0, 0);
    },
    style: {
      minHeight: 44,
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "600 16px/1 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "none",
      minHeight: 40
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "arrow-left",
    size: 16
  }), "Map draft"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), prev && /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Month",
    style: {
      display: "inline-flex",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-raised)"
    }
  }, [[prev.label, 0], [d.label + " draft", 1]].map(([l, t]) => {
    const on = (k >= 0.5 ? 1 : 0) === t;
    return /*#__PURE__*/React.createElement("button", {
      key: l,
      onClick: () => morph(t),
      "aria-pressed": on,
      style: {
        height: 36,
        padding: "0 14px",
        borderRadius: 999,
        border: 0,
        whiteSpace: "nowrap",
        cursor: "pointer",
        font: "600 13px/1 var(--font-body)",
        background: on ? "var(--bone-8)" : "transparent",
        color: on ? "var(--ink-0)" : "var(--text-muted)"
      }
    }, l);
  }))), /*#__PURE__*/React.createElement("div", {
    ref: box,
    onPointerDown: pd,
    onPointerMove: pm,
    onPointerUp: pu,
    onPointerCancel: pu,
    onClickCapture: e => {
      if (moved.current) {
        e.stopPropagation();
        moved.current = false;
      }
    },
    onClick: e => {
      if (e.target === e.currentTarget || e.target.tagName === "svg") setSel(null);
    },
    style: {
      position: "relative",
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
      touchAction: "none",
      cursor: "grab",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: bw.w,
    height: bw.h,
    role: "img",
    "aria-label": `Draft map, ${ids.length} ideas`,
    style: {
      position: "absolute",
      inset: 0
    }
  }, d.links.map(l => {
    const lit = sel && (l[0] === sel || l[1] === sel);
    return /*#__PURE__*/React.createElement("line", {
      key: l[0] + l[1],
      x1: X(l[0]),
      y1: Y(l[0]),
      x2: X(l[1]),
      y2: Y(l[1]),
      stroke: lit ? "var(--bone-8)" : "var(--bone-7)",
      strokeOpacity: sel ? lit ? 0.95 : 0.06 : 0.4,
      strokeWidth: (1 + l[2] / maxL * 4) * Math.min(1.4, v.z),
      strokeLinecap: "round"
    });
  }), ids.map(id => {
    const w0 = val(id),
      hid = cnt[id] < 3,
      isNew = !last[id],
      r = Math.max(0, mdR(Math.max(w0, 0.01)) * S * (w0 <= 0.3 ? w0 / 0.3 : 1));
    if (r < 2) return null;
    const on = sel === id,
      dim = near && !near.has(id),
      fs = Math.max(12, Math.min(26, r * 0.4));
    return /*#__PURE__*/React.createElement("g", {
      key: id,
      onClick: () => setSel(s2 => s2 === id ? null : id),
      style: {
        cursor: "pointer",
        opacity: dim ? 0.2 : 1,
        transition: "opacity 200ms var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: X(id),
      cy: Y(id),
      r: r,
      fill: hid ? "transparent" : on ? "var(--bone-8)" : isNew && k >= 0.5 ? "var(--lamp-400)" : "var(--ink-2)",
      stroke: hid ? "var(--border-strong)" : on ? "var(--bone-8)" : isNew && k >= 0.5 ? "var(--lamp-400)" : "var(--ink-4)",
      strokeWidth: "1.5",
      strokeDasharray: hid ? "5 5" : undefined
    }), r >= 22 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + (r > 40 ? -2 : fs * 0.35),
      textAnchor: "middle",
      style: {
        font: `800 ${fs}px var(--font-display)`,
        fill: on || isNew && k >= 0.5 && !hid ? "var(--ink-0)" : hid ? "var(--text-muted)" : "var(--text-strong)",
        pointerEvents: "none"
      }
    }, id), r > 40 && /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + fs,
      textAnchor: "middle",
      style: {
        font: `600 ${Math.max(12, fs * 0.55)}px var(--font-mono)`,
        fill: on || isNew && k >= 0.5 ? "var(--ink-0)" : "var(--text-muted)",
        pointerEvents: "none"
      }
    }, Math.round(w0))) : /*#__PURE__*/React.createElement("text", {
      x: X(id),
      y: Y(id) + r + 14,
      textAnchor: "middle",
      style: {
        font: "600 13px var(--font-body)",
        fill: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, id));
  })), selInfo && /*#__PURE__*/React.createElement("div", {
    role: "status",
    onPointerDown: e => e.stopPropagation(),
    style: {
      position: "absolute",
      left: 16,
      top: 16,
      maxWidth: "min(320px, calc(100% - 96px))",
      padding: 16,
      borderRadius: "var(--radius-lg)",
      background: "color-mix(in srgb, var(--ink-1) 94%, transparent)",
      border: "1px solid var(--border-default)",
      backdropFilter: "var(--blur-bar)",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, sel), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, selInfo.b, " mentions", selInfo.a ? ` · ${selInfo.b - selInfo.a >= 0 ? "+" : ""}${selInfo.b - selInfo.a} since ${prev.label.split(" ")[0]}` : " · new this month", selInfo.b < 3 ? " · stays hidden" : ""), selInfo.with_.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Said with ", selInfo.with_.join(", "))), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Zoom",
    onPointerDown: e => e.stopPropagation(),
    style: {
      position: "absolute",
      right: 16,
      bottom: 16,
      display: "flex",
      flexDirection: "column",
      borderRadius: 14,
      overflow: "hidden",
      background: "color-mix(in srgb, var(--ink-1) 92%, transparent)",
      border: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom in",
    onClick: () => zoomAt(1.3),
    style: ctl
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "plus",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom out",
    onClick: () => zoomAt(1 / 1.3),
    style: {
      ...ctl,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "minus",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Fit the whole map",
    onClick: () => setV({
      z: 1,
      x: 0,
      y: 0
    }),
    style: {
      ...ctl,
      borderTop: "1px solid var(--border-subtle)",
      color: v.z !== 1 || v.x || v.y ? "var(--lamp-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(MdIcon, {
    name: "locate-fixed",
    size: 18
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      columnGap: 16,
      rowGap: 8,
      flexWrap: "wrap",
      padding: "10px var(--gutter-phone)",
      borderTop: "1px solid var(--border-subtle)",
      font: "var(--type-source)",
      color: "var(--text-muted)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      border: "1px solid var(--ink-4)",
      background: "var(--ink-2)"
    }
  }), "Bigger = said more"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 3,
      borderRadius: 3,
      background: "var(--bone-7)"
    }
  }), "Line = said together"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      background: "var(--lamp-400)"
    }
  }), "New"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      border: "1px dashed var(--border-strong)"
    }
  }), "Hidden (under 3)")));
}
window.DraftMap = DraftMap;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/MapDraft.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/MapScreen.jsx
try { (() => {
const {
  Button: MpButton,
  Icon: MpIcon,
  StateBlock: MpState
} = window.ChurchAIDesignSystem_06db43;
const mpTerms = ["salvation", "marriage", "love", "faith"];
const mpReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const mpR = w => w <= 0 ? 0 : 24 + Math.sqrt(w) * 7;
function mpPublished() {
  try {
    return JSON.parse(localStorage.getItem("ca_map_published"));
  } catch (e) {
    return null;
  }
}

// Greedy circle packing: biggest first, each new bubble tangent to a placed one,
// pulled toward its strongest neighbour so related ideas sit together. No overlap.
function mpPack(ids, W, links) {
  const P = {},
    placed = [],
    GAP = 8;
  const nb = id => links.filter(l => l[0] === id || l[1] === id).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]);
  ids.forEach((id, i) => {
    const r = mpR(W[id]);
    if (!i) {
      P[id] = {
        x: 0,
        y: 0,
        r
      };
      placed.push(id);
      return;
    }
    const anchor = nb(id).find(n => P[n]);
    let best = null;
    placed.forEach(pid => {
      const p = P[pid];
      for (let a = 0; a < 36; a++) {
        const ang = a / 36 * Math.PI * 2,
          d = p.r + r + GAP,
          x = p.x + Math.cos(ang) * d,
          y = p.y + Math.sin(ang) * d;
        if (placed.some(q => {
          const o = P[q];
          return Math.hypot(o.x - x, o.y - y) < o.r + r + GAP - 0.5;
        })) continue;
        const score = Math.hypot(x, y * 1.25) + (anchor ? Math.hypot(P[anchor].x - x, P[anchor].y - y) * 0.6 : 0);
        if (!best || score < best.s) best = {
          x,
          y,
          s: score
        };
      }
    });
    P[id] = {
      x: best.x,
      y: best.y,
      r
    };
    placed.push(id);
  });
  return P;
}
function PublicMap() {
  const wide = window.useWide();
  const base = window.CA_DATA.months.filter(m => m.published),
    extra = mpPublished();
  const pub = extra ? [...base.filter(x => x.id !== extra.id), extra] : base;
  const pair = pub.slice(-2),
    two = pair.length === 2;
  const cur = pair[pair.length - 1],
    last = two ? pair[0] : null;
  const RH = window.CARhythm;
  const [release] = React.useState(() => RH ? RH.isRelease() : false);
  const [k, setK] = React.useState(() => release && !mpReduce() ? 0 : 1);
  const morphed = React.useRef(false);
  const [sel, setSel] = React.useState(null);
  const [tab, setTab] = React.useState("list");
  const [settled, setSettled] = React.useState(mpReduce());
  React.useEffect(() => {
    RH && RH.seeRelease();
  }, []);
  const [calm, setCalm] = React.useState(mpReduce());
  const anim = React.useRef(0),
    box = React.useRef(null);
  const [bw, setBw] = React.useState({
    w: 600,
    h: 500
  });
  const [view, setView] = React.useState({
    z: 1,
    x: 0,
    y: 0
  });
  const [touched, setTouched] = React.useState(false);
  const ptrs = React.useRef(new Map()),
    drag = React.useRef(null),
    moved = React.useRef(false),
    bwRef = React.useRef(bw);
  bwRef.current = bw;
  const ZMIN = 0.6,
    ZMAX = 3;
  const zoomAt = (f, mx, my) => setView(v => {
    const z = Math.max(ZMIN, Math.min(ZMAX, v.z * f));
    if (z === v.z) return v;
    const b = bwRef.current,
      cxp = b.w / 2,
      cyp = b.h / 2;
    if (mx == null) {
      mx = cxp;
      my = cyp;
    }
    const k2 = z / v.z;
    return {
      z,
      x: mx - cxp - (mx - cxp - v.x) * k2,
      y: my - cyp - (my - cyp - v.y) * k2
    };
  });
  const fit = () => setView({
    z: 1,
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const w = e => {
      e.preventDefault();
      setTouched(true);
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0022)), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", w, {
      passive: false
    });
    return () => el.removeEventListener("wheel", w);
  });
  const onPD = e => {
    const el = box.current;
    el.setPointerCapture && el.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    ptrs.current.set(e.pointerId, {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    });
    moved.current = false;
    drag.current = {
      v: view,
      pts: new Map(ptrs.current)
    };
  };
  const onPM = e => {
    if (!ptrs.current.has(e.pointerId) || !drag.current) return;
    const el = box.current,
      r = el.getBoundingClientRect();
    ptrs.current.set(e.pointerId, {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    });
    const P = [...ptrs.current.values()],
      S = [...drag.current.pts.values()];
    if (P.length >= 2 && S.length >= 2) {
      const d0 = Math.hypot(S[0].x - S[1].x, S[0].y - S[1].y) || 1,
        d1 = Math.hypot(P[0].x - P[1].x, P[0].y - P[1].y);
      const m = {
        x: (P[0].x + P[1].x) / 2,
        y: (P[0].y + P[1].y) / 2
      };
      moved.current = true;
      setTouched(true);
      const v0 = drag.current.v,
        z = Math.max(ZMIN, Math.min(ZMAX, v0.z * d1 / d0)),
        k2 = z / v0.z,
        b = bwRef.current;
      setView({
        z,
        x: m.x - b.w / 2 - (m.x - b.w / 2 - v0.x) * k2,
        y: m.y - b.h / 2 - (m.y - b.h / 2 - v0.y) * k2
      });
      return;
    }
    const a = S[0],
      p = P[0];
    if (!a) return;
    const dx = p.x - a.x,
      dy = p.y - a.y;
    if (!moved.current && Math.hypot(dx, dy) < 5) return;
    moved.current = true;
    setTouched(true);
    setView({
      ...drag.current.v,
      x: drag.current.v.x + dx,
      y: drag.current.v.y + dy
    });
  };
  const onPU = e => {
    ptrs.current.delete(e.pointerId);
    if (ptrs.current.size === 0) drag.current = null;else drag.current = {
      v: view,
      pts: new Map(ptrs.current)
    };
  };
  const onKey = e => {
    if (e.key === "+" || e.key === "=") {
      zoomAt(1.25);
      e.preventDefault();
    } else if (e.key === "-") {
      zoomAt(0.8);
      e.preventDefault();
    } else if (e.key === "0") {
      fit();
      e.preventDefault();
    } else if (e.key.startsWith("Arrow")) {
      const d = 40;
      setView(v => ({
        ...v,
        x: v.x + (e.key === "ArrowLeft" ? d : e.key === "ArrowRight" ? -d : 0),
        y: v.y + (e.key === "ArrowUp" ? d : e.key === "ArrowDown" ? -d : 0)
      }));
      e.preventDefault();
    }
  };
  React.useEffect(() => {
    const a = requestAnimationFrame(() => setSettled(true));
    const b = setTimeout(() => setCalm(true), 1300);
    return () => {
      cancelAnimationFrame(a);
      clearTimeout(b);
    };
  }, [tab]);
  React.useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setBw({
      w: e.contentRect.width,
      h: e.contentRect.height
    }));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [tab, wide]);
  if (!cur) return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      width: "100%",
      margin: "0 auto",
      padding: "40px var(--gutter-phone)"
    }
  }, /*#__PURE__*/React.createElement(MpState, {
    kind: "empty",
    word: "soon",
    motif: "map",
    title: "No map yet",
    message: "The first map appears when a month is published."
  }));
  const W = mo => Object.fromEntries((mo ? mo.nodes : []).filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wl = W(last),
    wc = W(cur);
  const maxW = {};
  [...Object.keys(wl), ...Object.keys(wc)].forEach(id => maxW[id] = Math.max(wl[id] || 0, wc[id] || 0));
  const ids = Object.keys(maxW).sort((a, b) => maxW[b] - maxW[a]);
  const allLinks = [...(last ? last.links : []), ...cur.links];
  const pos = React.useMemo(() => mpPack(ids, maxW, allLinks), [ids.join()]);
  const show = k >= 0.5 ? cur : last || cur;
  React.useEffect(() => {
    if (morphed.current || k === 1 || !two) {
      if (!two && k !== 1) setK(1);
      return;
    }
    morphed.current = true;
    const id = setTimeout(() => go(1), 900);
    return () => clearTimeout(id);
  }, [two]);
  const val = id => (wl[id] || 0) + ((wc[id] || 0) - (wl[id] || 0)) * (two ? k : 1);
  const side = id => (show === cur ? wc[id] : wl[id]) || 0;
  const few = n => n < 10 ? "under 10" : String(Math.round(n));
  const isNew = id => show === cur && (two ? !wl[id] && !!wc[id] : !!(cur.nodes.find(n => n[0] === id) || [])[2]);
  const delta = id => two && show === cur ? (wc[id] || 0) - (wl[id] || 0) : 0;
  const rows = ids.filter(id => side(id) > 0).sort((a, b) => side(b) - side(a));
  const nbs = id => show.links.filter(l => l[0] === id || l[1] === id).sort((a, b) => b[2] - a[2]).map(l => l[0] === id ? l[1] : l[0]).filter(n => side(n) > 0);
  const focusSet = sel ? new Set([sel, ...nbs(sel)]) : null;
  const go = to => {
    cancelAnimationFrame(anim.current);
    setSel(null);
    if (mpReduce()) {
      setK(to);
      return;
    }
    const from = k,
      t0 = performance.now();
    const dur = morphed.current && from === 0 ? 1400 : 650;
    const f = now => {
      const p = Math.min(1, (now - t0) / dur),
        e = 1 - Math.pow(1 - p, 3);
      setK(from + (to - from) * e);
      if (p < 1) anim.current = requestAnimationFrame(f);
    };
    anim.current = requestAnimationFrame(f);
  };
  const pick = id => {
    if (mpTerms.includes(id) && window.CAGo) {
      window.CAGo("term", id);
      return;
    }
    setSel(s => s === id ? null : id);
  };
  const grew = rows.filter(id => (wl[id] || 0) > 0 && delta(id) > 0).sort((a, b) => delta(b) - delta(a))[0];
  const nNew = rows.filter(isNew).length;
  const mineRaw = RH && RH.mine(show.id);
  const mineId = mineRaw && rows.includes(mineRaw) ? mineRaw : null;
  const sentence = show !== cur || !two ? `${rows.length} ideas in ${show.label}.` : grew ? `“${grew}” grew most since ${last.label.split(" ")[0]}.` : nNew ? `${nNew} new idea${nNew > 1 ? "s" : ""} this month.` : "About the same as last month.";

  // bubble canvas bounds
  const ext = ids.reduce((b, id) => {
    const p = pos[id];
    return {
      x0: Math.min(b.x0, p.x - p.r),
      x1: Math.max(b.x1, p.x + p.r),
      y0: Math.min(b.y0, p.y - p.r),
      y1: Math.max(b.y1, p.y + p.r)
    };
  }, {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0
  });
  const pad = 16,
    sc = Math.min(1.3, (bw.w - pad * 2) / (ext.x1 - ext.x0 || 1), (bw.h - pad * 2) / (ext.y1 - ext.y0 || 1));
  const cx = (ext.x0 + ext.x1) / 2,
    cy = (ext.y0 + ext.y1) / 2;
  const Trend = ({
    id,
    size = 16
  }) => {
    if (isNew(id)) return /*#__PURE__*/React.createElement(MpIcon, {
      name: "circle-plus",
      size: size,
      color: "var(--lamp-400)",
      label: "New this month"
    });
    const d = delta(id);
    if (!d) return null;
    return /*#__PURE__*/React.createElement(MpIcon, {
      name: d > 0 ? "arrow-up-right" : "arrow-down-right",
      size: size,
      color: d > 0 ? "var(--ok-400)" : "var(--text-muted)",
      label: d > 0 ? "Up" : "Down"
    });
  };
  const Chips = id => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, nbs(id).slice(0, 6).map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => pick(n),
    style: {
      height: 40,
      padding: "0 14px",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      background: "transparent",
      color: "var(--text-body)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, n, mpTerms.includes(n) && /*#__PURE__*/React.createElement(MpIcon, {
    name: "book-open",
    size: 16,
    color: "var(--text-muted)"
  }))), !nbs(id).length && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, "Said on its own this month."));
  const Detail = (id, onBack) => {
    const d = delta(id);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        alignSelf: "flex-start",
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        height: 40,
        padding: 0,
        background: "none",
        border: 0,
        color: "var(--text-muted)",
        font: "600 16px/1 var(--font-body)",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(MpIcon, {
      name: "arrow-left",
      size: 16
    }), "All ideas"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "800 48px/1 var(--font-display)",
        letterSpacing: "var(--tracking-display)",
        color: "var(--text-strong)",
        overflowWrap: "anywhere"
      }
    }, id), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap",
        font: "600 16px/1.3 var(--font-body)",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        font: "700 24px/1 var(--font-mono)",
        color: "var(--text-strong)"
      }
    }, few(side(id))), " mentions"), isNew(id) ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        color: "var(--lamp-400)"
      }
    }, /*#__PURE__*/React.createElement(MpIcon, {
      name: "circle-plus",
      size: 16
    }), "New this month") : d ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 6,
        alignItems: "center",
        color: d > 0 ? "var(--ok-400)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Trend, {
      id: id
    }), d > 0 ? "+" : "", d, " since ", last.label.split(" ")[0]) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "700 13px/1 var(--font-body)",
        color: "var(--text-muted)",
        marginTop: 4
      }
    }, "Said with"), Chips(id));
  };
  const Row = (id, i) => {
    const open = sel === id,
      term = mpTerms.includes(id);
    return /*#__PURE__*/React.createElement("li", {
      key: id,
      style: {
        borderTop: i ? "1px solid var(--border-subtle)" : 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => pick(id),
      "aria-expanded": term ? undefined : open,
      style: {
        width: "100%",
        minHeight: 60,
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) auto 20px",
        gap: 12,
        alignItems: "center",
        padding: "10px 0",
        background: "none",
        border: 0,
        cursor: "pointer",
        color: "inherit",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: `800 ${Math.round(18 + Math.min(10, side(id) / 5))}px/1.1 var(--font-display)`,
        letterSpacing: "var(--tracking-heading)",
        color: isNew(id) ? "var(--lamp-400)" : "var(--text-strong)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, id), term && /*#__PURE__*/React.createElement(MpIcon, {
      name: "book-open",
      size: 16,
      color: "var(--text-muted)",
      label: "Opens in the dictionary"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Trend, {
      id: id
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "600 16px/1 var(--font-mono)",
        color: "var(--text-body)",
        fontVariantNumeric: "tabular-nums",
        minWidth: 28,
        textAlign: "right"
      }
    }, few(side(id)))), /*#__PURE__*/React.createElement(MpIcon, {
      name: term ? "arrow-up-right" : open ? "minus" : "chevron-right",
      size: 16,
      color: "var(--text-muted)"
    })), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 0 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "700 13px/1 var(--font-body)",
        color: "var(--text-muted)"
      }
    }, "Said with"), Chips(id)));
  };
  const Toggle = () => two ? /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Month",
    style: {
      display: "inline-flex",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-raised)"
    }
  }, [[last, 0], [cur, 1]].map(([mo, v]) => /*#__PURE__*/React.createElement("button", {
    key: mo.id,
    onClick: () => go(v),
    "aria-pressed": show === mo,
    style: {
      height: 36,
      padding: "0 16px",
      borderRadius: 999,
      border: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      background: show === mo ? "var(--bone-8)" : "transparent",
      color: show === mo ? "var(--ink-0)" : "var(--text-muted)"
    }
  }, mo.label))) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, cur.label);
  const Head = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, Toggle(), release && show === cur && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      font: "700 13px/1 var(--font-body)",
      color: "var(--lamp-400)"
    }
  }, cur.label.split(" ")[0], "\u2019s map is out."), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "800 clamp(28px,7vw,36px)/1.05 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: "4px 0 0",
      textWrap: "balance"
    }
  }, window.CAQuestionText ? /*#__PURE__*/React.createElement(window.CAQuestionText, {
    month: show
  }) : show.question), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "baseline",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 32px/1 var(--font-display)",
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round((last ? last.answers : 0) + (cur.answers - (last ? last.answers : 0)) * (two ? k : 1))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, "answers \xB7 counts only, no names")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "700 18px/1.35 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, sentence), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "shield",
    size: 16,
    style: {
      flex: "none",
      marginTop: 1
    }
  }), "Ideas only, never words. Small counts show as \u201Cunder 10\u201D. A region shows once 50 people there have answered."), mineId && /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "circle-dot",
    size: 16,
    color: "var(--bone-8)"
  }), "You said \u201C", mineId, "\u201D. Only this device knows."));
  const S = sc * view.z,
    X = id => bw.w / 2 + (pos[id].x - cx) * S + view.x,
    Y = id => bw.h / 2 + (pos[id].y - cy) * S + view.y;
  const ctl = {
    width: 44,
    height: 44,
    display: "grid",
    placeItems: "center",
    border: 0,
    background: "transparent",
    color: "var(--text-strong)",
    cursor: "pointer"
  };
  const Bubbles = () => /*#__PURE__*/React.createElement("div", {
    ref: box,
    tabIndex: 0,
    role: "application",
    "aria-label": "Map of ideas. Drag to move, scroll or pinch to zoom. Plus, minus and 0 keys also work.",
    onKeyDown: onKey,
    onPointerDown: onPD,
    onPointerMove: onPM,
    onPointerUp: onPU,
    onPointerCancel: onPU,
    onClickCapture: e => {
      if (moved.current) {
        e.stopPropagation();
        e.preventDefault();
        moved.current = false;
      }
    },
    onDoubleClick: e => {
      if (e.target === e.currentTarget) {
        const r = e.currentTarget.getBoundingClientRect();
        zoomAt(1.6, e.clientX - r.left, e.clientY - r.top);
      }
    },
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: wide ? 0 : 420,
      overflow: "hidden",
      borderRadius: wide ? 0 : "var(--radius-lg)",
      background: "var(--surface-page)",
      border: wide ? 0 : "1px solid var(--border-subtle)",
      touchAction: "none",
      cursor: drag.current && moved.current ? "grabbing" : "grab",
      outline: "none"
    },
    onClick: e => {
      if (e.target === e.currentTarget) setSel(null);
    }
  }, sel && /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    width: bw.w,
    height: bw.h,
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none"
    }
  }, nbs(sel).map(n => pos[n] && /*#__PURE__*/React.createElement("line", {
    key: n,
    x1: X(sel),
    y1: Y(sel),
    x2: X(n),
    y2: Y(n),
    stroke: "var(--bone-7)",
    strokeOpacity: ".55",
    strokeWidth: "1.5"
  }))), ids.map((id, i) => {
    const p = pos[id],
      w = val(id),
      r = mpR(w) * S;
    if (r < 2) return null;
    const nw = isNew(id),
      on = sel === id,
      dim = focusSet && !focusSet.has(id),
      term = mpTerms.includes(id);
    const fs = Math.max(12, Math.min(26, r * 0.36));
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => pick(id),
      "aria-label": `${id}, ${few(w)} mentions${nw ? ", new this month" : ""}${term ? ", opens in the dictionary" : ""}`,
      title: r < 22 ? `${id} · ${few(w)}` : undefined,
      style: {
        position: "absolute",
        left: X(id) - r,
        top: Y(id) - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 4,
        cursor: "pointer",
        background: on ? "var(--bone-8)" : nw ? "var(--lamp-400)" : "var(--ink-2)",
        border: `1px solid ${on ? "var(--bone-8)" : nw ? "var(--lamp-400)" : "var(--ink-4)"}`,
        outline: id === mineId ? "2px solid var(--bone-8)" : "none",
        outlineOffset: 4,
        color: on || nw ? "var(--ink-0)" : "var(--text-strong)",
        opacity: settled ? dim ? 0.22 : 1 : 0,
        transform: settled ? "scale(1)" : "scale(.6)",
        transition: `opacity 360ms var(--ease-out) ${calm ? 0 : id === mineId ? ids.length * 30 + 420 : i * 30}ms, transform 520ms var(--ease-out) ${calm ? 0 : id === mineId ? ids.length * 30 + 420 : i * 30}ms, background 150ms, border-color 150ms`
      }
    }, r >= 22 && /*#__PURE__*/React.createElement("span", {
      style: {
        font: `800 ${fs}px/1 var(--font-display)`,
        letterSpacing: "-0.01em",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textDecoration: term ? "underline" : "none",
        textUnderlineOffset: "0.14em",
        textDecorationThickness: "0.06em"
      }
    }, id), r > 38 && /*#__PURE__*/React.createElement("span", {
      style: {
        font: `600 ${Math.max(12, fs * 0.55)}px/1 var(--font-mono)`,
        opacity: 0.75
      }
    }, few(w)));
  }), /*#__PURE__*/React.createElement("a", {
    href: "#r=search",
    onPointerDown: e => e.stopPropagation(),
    style: {
      position: "absolute",
      left: 12,
      top: 12,
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "0 14px",
      borderRadius: 999,
      background: "color-mix(in srgb, var(--ink-1) 92%, transparent)",
      border: "1px solid var(--border-default)",
      color: "var(--text-strong)",
      font: "600 13px/1 var(--font-body)",
      textDecoration: "none",
      backdropFilter: "var(--blur-bar)"
    }
  }, "\u2190 Dictionary ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontWeight: 400
    }
  }, "/ Map of ideas")), /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Zoom",
    onPointerDown: e => e.stopPropagation(),
    style: {
      position: "absolute",
      right: 12,
      bottom: 12,
      display: "flex",
      flexDirection: "column",
      borderRadius: 14,
      overflow: "hidden",
      background: "color-mix(in srgb, var(--ink-1) 92%, transparent)",
      border: "1px solid var(--border-default)",
      backdropFilter: "var(--blur-bar)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom in",
    disabled: view.z >= ZMAX,
    onClick: () => zoomAt(1.3),
    style: {
      ...ctl,
      opacity: view.z >= ZMAX ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "plus",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom out",
    disabled: view.z <= ZMIN,
    onClick: () => zoomAt(1 / 1.3),
    style: {
      ...ctl,
      borderTop: "1px solid var(--border-subtle)",
      opacity: view.z <= ZMIN ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "minus",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Fit the whole map",
    onClick: fit,
    style: {
      ...ctl,
      borderTop: "1px solid var(--border-subtle)",
      color: view.z !== 1 || view.x || view.y ? "var(--lamp-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "locate-fixed",
    size: 18
  }))), !touched && !wide && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 12,
      bottom: 12,
      padding: "6px 10px",
      borderRadius: 999,
      background: "color-mix(in srgb, var(--ink-1) 88%, transparent)",
      border: "1px solid var(--border-subtle)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      maxWidth: "calc(100% - 80px)",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "Drag \xB7 pinch or scroll to zoom"));
  const Legend = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 99,
      background: "var(--lamp-400)"
    }
  }), "New"), two && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "arrow-up-right",
    size: 16,
    color: "var(--ok-400)"
  }), "Said more"), two && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: "arrow-down-right",
    size: 16
  }), "Said less"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: "underline",
      textUnderlineOffset: 3,
      color: "var(--text-body)"
    }
  }, "word"), "Opens the dictionary"));
  const List = () => /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, rows.map((id, i) => Row(id, i)));
  if (wide) return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 400px",
      gridTemplateRows: "minmax(0,1fr)",
      height: "calc(100svh - 60px)",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minWidth: 0,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, Bubbles()), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 24px 18px"
    }
  }, Legend())), /*#__PURE__*/React.createElement("aside", {
    "aria-label": "This month",
    style: {
      minHeight: 0,
      borderLeft: "1px solid var(--border-subtle)",
      background: "var(--surface-card)",
      overflowY: "auto",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, sel ? Detail(sel, () => setSel(null)) : /*#__PURE__*/React.createElement(React.Fragment, null, Head(), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 8
    }
  }, List()), /*#__PURE__*/React.createElement(MapPrevious, {
    onOpen: m => {
      const i = [last, cur].indexOf([last, cur].find(x => x && x.id === m.id));
      if (i >= 0 && two) go(i);
      window.scrollTo(0, 0);
    }
  }))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-read)",
      width: "100%",
      margin: "0 auto",
      padding: "24px var(--gutter-phone) 96px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, Head(), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    "aria-label": "View",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)"
    }
  }, [["list", "List", "list"], ["map", "Map", "waypoints"]].map(([v, l, ic]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    role: "tab",
    "aria-selected": tab === v,
    onClick: () => {
      setTab(v);
      setSettled(mpReduce());
      setCalm(mpReduce());
    },
    style: {
      height: 40,
      borderRadius: 999,
      border: 0,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      font: "600 16px/1 var(--font-body)",
      background: tab === v ? "var(--bone-8)" : "transparent",
      color: tab === v ? "var(--ink-0)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(MpIcon, {
    name: ic,
    size: 16
  }), l))), tab === "list" ? /*#__PURE__*/React.createElement(React.Fragment, null, List(), /*#__PURE__*/React.createElement(MapPrevious, {
    onOpen: m => {
      const i = [last, cur].findIndex(x => x && x.id === m.id);
      if (i >= 0 && two) go(i);
      window.scrollTo(0, 0);
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 440
    }
  }, Bubbles()), Legend(), sel && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-card)"
    }
  }, Detail(sel, () => setSel(null)))));
}
function MapPrevious({
  onOpen
}) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice().reverse();
  if (pub.length < 2) return null;
  return /*#__PURE__*/React.createElement("section", {
    "aria-labelledby": "mp-prev",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "mp-prev",
    style: {
      font: "var(--type-section)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Previous questions"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: "0 0 8px"
    }
  }, "Counts only. No names, no answers."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, pub.map(m => /*#__PURE__*/React.createElement("li", {
    key: m.id
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(m),
    style: {
      width: "100%",
      minHeight: 64,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      background: "none",
      border: 0,
      borderBottom: "1px solid var(--border-subtle)",
      cursor: "pointer",
      color: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.2 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, m.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, m.question)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1 var(--font-mono)",
      color: "var(--text-body)"
    }
  }, m.answers), /*#__PURE__*/React.createElement(MpIcon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  }))))));
}
window.PublicMap = PublicMap;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/MapScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/MonthlyScreen.jsx
try { (() => {
const {
  TextArea: MqArea,
  Button: MqButton,
  Tag: MqTag,
  StateBlock: MqState,
  Icon: MqIcon
} = window.ChurchAIDesignSystem_06db43;
function CAQuestionText({
  month
}) {
  const q = month.question || "",
    t = month.term,
    i = t ? q.toLowerCase().indexOf(t.toLowerCase()) : -1;
  if (i < 0) return q;
  const open = e => {
    e.preventDefault();
    if (window.CAGo) window.CAGo("term", t);else location.hash = `r=term&t=${t}`;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, q.slice(0, i), /*#__PURE__*/React.createElement("a", {
    "data-qterm": "",
    href: `#r=term&t=${t}`,
    onClick: open,
    "aria-label": `${t}, open in the dictionary`,
    title: "Open in the dictionary",
    style: {
      color: "var(--lamp-400)",
      textDecoration: "underline",
      textDecorationThickness: "0.08em",
      textUnderlineOffset: "0.12em"
    }
  }, q.slice(i, i + t.length)), q.slice(i + t.length));
}
window.CAQuestionText = CAQuestionText;
function MonthlyScreen({
  go
}) {
  const months = window.CA_DATA.months;
  const cur = months[months.length - 1];
  const prev = months.filter(m => m.published).slice(-1)[0];
  const closed = new URLSearchParams(location.hash.slice(1)).get("closed") === "1" || cur.ends && Date.now() > new Date(cur.ends + "T23:59:59").getTime();
  const key = "ca_answered_" + cur.id;
  const [prior, setPrior] = React.useState(!!localStorage.getItem(key));
  const [text, setText] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const chipPool = React.useMemo(() => {
    const src = (prev || cur).nodes || [];
    return src.filter(n => n[1] >= 3).sort((a, b) => b[1] - a[1]).slice(0, 8).map(n => n[0]);
  }, []);
  const [chips, setChips] = React.useState([]);
  const toggleChip = c => {
    window.CAHaptic && window.CAHaptic("light");
    setChips(x => x.includes(c) ? x.filter(y => y !== c) : x.length < 3 ? [...x, c] : x);
    if (phase === "invalid") setPhase("form");
  };
  const [fix, setFix] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [phase, setPhase] = React.useState(prior ? "done" : "form");
  const [removed, setRemoved] = React.useState(0);
  const [support, setSupport] = React.useState(false);
  const piiNow = window.CAGuard.pii(text);
  const [rid, setRid] = React.useState("");
  const [sent, setSent] = React.useState(null);
  const [stage, setStage] = React.useState(2);
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RH = window.CARhythm;
  const myIdea = RH && RH.mine(cur.id);
  React.useEffect(() => {
    if (!sent || rm) return;
    const id = setTimeout(() => {
      const el = document.querySelector("[data-qterm]");
      el && el.animate && el.animate([{
        textDecorationThickness: "0.08em",
        color: "var(--lamp-400)"
      }, {
        textDecorationThickness: "0.2em",
        color: "var(--bone-9)",
        offset: 0.45
      }, {
        textDecorationThickness: "0.08em",
        color: "var(--lamp-400)"
      }], {
        duration: 900,
        easing: "cubic-bezier(.2,.8,.2,1)"
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [sent]);
  React.useEffect(() => {
    if (!sent || rm) {
      setStage(2);
      return;
    }
    setStage(0);
    const a = setTimeout(() => setStage(1), 700);
    const b = setTimeout(() => setStage(2), 1300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [sent]);
  const Next = () => RH ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "calendar",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 180px",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, "Next question opens ", RH.nextLabel(), "."), /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "secondary",
    icon: "calendar-plus",
    onClick: RH.ics
  }, "Add to calendar")) : null;
  const submit = e => {
    e.preventDefault();
    if (!text.trim() && !chips.length) {
      setErrMsg("Pick an idea or write a few words.");
      setPhase("invalid");
      return;
    }
    {
      const c = window.CAInput.check("answer", text, {
        optional: chips.length > 0
      });
      if (!c.ok) {
        setErrMsg(c.msg);
        setPhase("invalid");
        return;
      }
    }
    if (!window.CAInput.allow("answer", 5)) {
      setErrMsg("You’ve sent a few already. Try again in a little while.");
      setPhase("invalid");
      return;
    }
    if (window.CAGuard.injection(text)) {
      setRid(window.CAGuard.reqId());
      setPhase("blocked");
      return;
    }
    const n = window.CAGuard.pii(text);
    const clean = window.CAGuard.redact(text);
    setRemoved(n);
    setSupport(window.CAGuard.crisis(text));
    setPhase("sending");
    setTimeout(() => {
      setPhase("sent");
      window.CAHaptic && window.CAHaptic("medium");
    }, 600);
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify({
        at: Date.now(),
        len: clean.length
      }));
      const idea = chips[0] || (RH ? RH.guessIdea(clean) : null);
      RH && RH.setMine(cur.id, idea);
      setSent({
        text: clean.trim() ? clean.slice(0, 90) : chips.join(" · "),
        idea
      });
      setFix(false);
      setConfirmed(false);
      setPrior(true);
      setPhase("done");
    }, rm ? 600 : 1000);
  };
  const others = ["peace", "prayer", "family", "silence", "nature", "forgiveness"];
  const [rem, setRem] = React.useState(() => localStorage.getItem("ca_remind") || "");
  const askRemind = async () => {
    let v = "yes";
    try {
      if ("Notification" in window) {
        const p = await Notification.requestPermission();
        v = p === "granted" ? "yes" : "denied";
      }
    } catch (e) {}
    localStorage.setItem("ca_remind", v);
    setRem(v);
  };
  const Remind = () => rem === "no" ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, rem === "yes" ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      display: "flex",
      gap: 8,
      alignItems: "center",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "circle-check",
    size: 18,
    color: "var(--ok-400)"
  }), "We\u2019ll tell you when the next question opens. Nothing else.") : rem === "denied" ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Notifications are off in your browser. Add to calendar works instead.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "One question a month. Want a heads-up when it opens?"), /*#__PURE__*/React.createElement("div", {
    "aria-label": "Preview of the only notification we send",
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 10,
      display: "grid",
      placeItems: "center",
      background: "var(--lamp-400)",
      color: "var(--ink-0)",
      font: "800 16px/1 var(--font-display)"
    }
  }, "c"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 13px/1.2 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Rhema.ai"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, "This month\u2019s question is open: one word, your way."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "That\u2019s the only message, once a month."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "secondary",
    icon: "bell",
    onClick: askRemind
  }, "Remind me"), /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      localStorage.setItem("ca_remind", "no");
      setRem("no");
    }
  }, "Not now"))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-read)",
      width: "100%",
      margin: "0 auto",
      padding: "40px var(--gutter-phone) 24px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "800 clamp(44px,13vw,68px)/.98 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: "0 0 14px",
      textWrap: "balance"
    }
  }, /*#__PURE__*/React.createElement(CAQuestionText, {
    month: cur
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-muted)",
      margin: "0 0 28px"
    }
  }, cur.label, ". Say it your way. No account, never tied to a pastor."), closed ? /*#__PURE__*/React.createElement("section", {
    "aria-live": "polite",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--text-strong)",
      marginBottom: 6
    }
  }, "This month has ended."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, cur.label, " is no longer taking answers. You can still ", /*#__PURE__*/React.createElement("a", {
    href: "#r=graph"
  }, "see what people said on the map"), "."), /*#__PURE__*/React.createElement(Next, null)) : !["done"].includes(phase) ? /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, phase === "blocked" && /*#__PURE__*/React.createElement(MqState, {
    kind: "unavailable",
    compact: true,
    title: "Blocked",
    message: `This answer was blocked. It reads like an instruction to the system, so it was not sent. Request id: ${rid}`
  }), prior && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "This replaces your earlier answer for ", cur.label, ". One answer per person per month."), /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 0,
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("legend", {
    style: {
      padding: 0,
      marginBottom: 8,
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Pick up to 3 ideas ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: "var(--text-muted)"
    }
  }, "\xB7 or write below \xB7 either one is enough")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, chipPool.map(c => {
    const on = chips.includes(c);
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      type: "button",
      "aria-pressed": on,
      disabled: !on && chips.length >= 3,
      onClick: () => toggleChip(c),
      style: {
        height: 40,
        padding: "0 14px",
        flex: "none",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        cursor: !on && chips.length >= 3 ? "default" : "pointer",
        font: "600 16px/1 var(--font-body)",
        border: "1px solid " + (on ? "var(--bone-8)" : "var(--border-default)"),
        background: on ? "var(--bone-8)" : "transparent",
        color: on ? "var(--ink-0)" : "var(--text-body)",
        opacity: !on && chips.length >= 3 ? 0.45 : 1
      }
    }, on && /*#__PURE__*/React.createElement(MqIcon, {
      name: "check",
      size: 16
    }), c);
  }))), /*#__PURE__*/React.createElement(MqArea, {
    label: "Your answer",
    rows: 6,
    maxLength: 280,
    value: text,
    onChange: e => {
      setText(e.target.value);
      if (phase === "invalid" || phase === "blocked") setPhase("form");
    },
    error: phase === "invalid" ? errMsg || "Pick an idea or write a few words." : undefined,
    hint: piiNow ? "That looks like a name, phone number, email or address. We remove it before anything reaches the map." : "Optional. We keep the idea, not your words: the text is deleted within 24 hours.",
    placeholder: "Honestly? Peace at home. Real friends\u2026"
  }), /*#__PURE__*/React.createElement(window.CAMic, {
    inline: true,
    onText: t => {
      setText(x => ((x ? x + " " : "") + t).slice(0, 280));
      if (phase === "invalid") setPhase("form");
    }
  }), /*#__PURE__*/React.createElement(MqButton, {
    type: "submit",
    variant: "accent",
    size: "lg",
    fullWidth: true,
    loading: phase === "sending",
    icon: phase === "sent" ? undefined : "send"
  }, phase === "sent" ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      animation: "ca-turn 420ms var(--ease-out) both"
    }
  }, /*#__PURE__*/React.createElement(window.ChurchAIDesignSystem_06db43.Icon, {
    name: "check",
    size: 20
  })), "Counted") : "Send answer")) : /*#__PURE__*/React.createElement("section", {
    "aria-live": "polite",
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 99,
      display: "grid",
      placeItems: "center",
      background: "var(--ok-tint)",
      color: "var(--ok-400)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "check",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--text-strong)"
    }
  }, "Counted.")), cur.answers > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: "0 0 12px"
    }
  }, "You and ", cur.answers, " others answered in ", cur.label.split(" ")[0], "."), sent && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": stage < 2,
    style: {
      position: "relative",
      height: 48,
      margin: "4px 0 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      transformOrigin: "left center",
      opacity: stage === 0 ? 1 : 0,
      transform: stage === 0 ? "none" : "scale(.4)",
      transition: "opacity 320ms var(--ease-out), transform 420ms var(--ease-out)"
    }
  }, "\u201C", sent.text, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 6,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 36,
      padding: "0 14px",
      borderRadius: 999,
      background: "var(--bone-8)",
      color: "var(--ink-0)",
      font: "700 16px/1 var(--font-body)",
      opacity: stage === 0 ? 0 : 1,
      transform: stage === 0 ? "scale(.85)" : "none",
      transition: "opacity 240ms var(--ease-out) 120ms, transform 240ms var(--ease-out) 120ms"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "circle-dot",
    size: 16
  }), sent.idea || "your idea")), !sent && myIdea && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 36,
      padding: "0 14px",
      margin: "4px 0 14px",
      borderRadius: 999,
      background: "var(--bone-8)",
      color: "var(--ink-0)",
      font: "700 16px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "circle-dot",
    size: 16
  }), myIdea), sent && stage === 2 && !confirmed && /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Did we read you right?",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      margin: "0 0 14px",
      padding: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 160px",
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Did we read you right?"), !fix && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "secondary",
    icon: "check",
    onClick: () => setConfirmed(true)
  }, "Yes"), /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => setFix(true)
  }, "Change idea"))), fix && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, [...new Set([...chips, ...chipPool])].filter(c => c !== sent.idea).slice(0, 6).map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    type: "button",
    onClick: () => {
      RH && RH.setMine(cur.id, c);
      setSent(s => ({
        ...s,
        idea: c
      }));
      setFix(false);
      setConfirmed(true);
      window.CAHaptic && window.CAHaptic("light");
    },
    style: {
      height: 36,
      padding: "0 14px",
      flex: "none",
      whiteSpace: "nowrap",
      borderRadius: 999,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      border: "1px solid var(--border-default)",
      background: "transparent",
      color: "var(--text-body)"
    }
  }, c)))), sent && confirmed && /*#__PURE__*/React.createElement("p", {
    role: "status",
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)",
      margin: "0 0 12px"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "circle-check",
    size: 18,
    color: "var(--ok-400)"
  }), "Counted as \u201C", sent.idea, "\u201D. Your words are not kept."), removed > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: "0 0 10px"
    }
  }, "We removed ", removed === 1 ? "1 personal detail" : `${removed} personal details`, " before sending."), support && (() => {
    const lines = window.CACrisisLine || {};
    const [num, what] = lines["United States"] || ["988", "the crisis line"];
    return /*#__PURE__*/React.createElement("div", {
      role: "note",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        margin: "0 0 14px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-pastoral)",
        fontSize: 18,
        color: "var(--text-body)",
        margin: 0
      }
    }, "It sounds heavy right now. You are not alone."), /*#__PURE__*/React.createElement("a", {
      href: "tel:" + num,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-strong)",
        background: "var(--surface-raised)",
        textDecoration: "none",
        color: "inherit"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 40,
        height: 40,
        flex: "none",
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        background: "var(--danger-tint)",
        color: "var(--danger-400)"
      }
    }, /*#__PURE__*/React.createElement(MqIcon, {
      name: "phone",
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "700 16px/1.3 var(--font-body)",
        color: "var(--text-strong)"
      }
    }, "Talk to someone now \xB7 ", num), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, "Free, any time. No account needed.")), /*#__PURE__*/React.createElement(MqIcon, {
      name: "chevron-right",
      size: 18,
      color: "var(--text-muted)"
    })));
  })(), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      margin: "0 0 4px"
    }
  }, "Joins the map on release day. Only this device knows which idea was yours."), (!sent || confirmed) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: 16,
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "calendar",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 180px",
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-body)"
    }
  }, RH ? `Next question opens ${RH.nextLabel()}.` : "Next question opens next month."), rem === "yes" ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      font: "600 13px/1 var(--font-body)",
      color: "var(--ok-400)"
    }
  }, /*#__PURE__*/React.createElement(MqIcon, {
    name: "circle-check",
    size: 16
  }), "Reminder on") : /*#__PURE__*/React.createElement(MqButton, {
    size: "sm",
    variant: "secondary",
    icon: "bell",
    onClick: async () => {
      await askRemind();
      if (localStorage.getItem("ca_remind") !== "yes" && RH) RH.ics();
    }
  }, "Remind me")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setRemoved(0);
      setSupport(false);
      setSent(null);
      setPhase("form");
    },
    style: {
      marginTop: 14,
      height: 40,
      padding: 0,
      background: "none",
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Change my answer")));
}
window.MonthlyScreen = MonthlyScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/MonthlyScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/Onboarding.jsx
try { (() => {
const {
  Button: ObButton,
  TextField: ObField,
  Icon: ObIcon
} = window.ChurchAIDesignSystem_06db43;
(() => {
  if (document.getElementById("ob-kf")) return;
  const st = document.createElement("style");
  st.id = "ob-kf";
  st.textContent = "@keyframes ob-float{0%,100%{translate:0 0}50%{translate:0 -12px}}@keyframes ob-sway{0%,100%{translate:0 0}50%{translate:var(--ob-dx,6px) 0}}@keyframes ob-orbit{0%{translate:0 0}25%{translate:9px -6px}50%{translate:0 -12px}75%{translate:-9px -6px}100%{translate:0 0}}@keyframes ob-breathe{0%,100%{scale:1}50%{scale:1.08}}@keyframes ob-turn{0%,100%{rotate:-3deg}50%{rotate:3deg}}@media (prefers-reduced-motion:reduce){[data-ob-live]{animation:none!important}}[data-reduce-motion] [data-ob-live]{animation:none!important}";
  document.head.appendChild(st);
})();
const obLive = (on, name, dur, delay, extra) => on ? {
  animation: `${name} ${dur * 1.15}s cubic-bezier(.45,0,.55,1) -${delay}s infinite`,
  ...(extra || {})
} : {};
const obReduce = () => document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
const obTr = {
  Hindu: "var(--trad-hindu)",
  Buddhist: "var(--trad-buddhist)",
  Christian: "var(--trad-christian)"
};
const obTint = {
  Hindu: "var(--trad-hindu-tint)",
  Buddhist: "var(--trad-buddhist-tint)",
  Christian: "var(--trad-christian-tint)"
};
const obCycle = ["Hindu", "Buddhist", "Christian"];
const obEase = "cubic-bezier(.22,.61,.36,1)";
const obWord = {
  font: "800 clamp(34px,9vw,56px)/1 var(--font-display)",
  letterSpacing: "var(--tracking-display)",
  whiteSpace: "nowrap"
};
const obTag = {
  font: "600 13px/1 var(--font-body)",
  color: "var(--text-muted)",
  marginTop: 10,
  textAlign: "center"
};
function useObW() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}
const OB_STEPS = [{
  t: "Understand the language of faith across cultures.",
  s: "Grace, prasāda, dāna: three traditions’ words for a gift. Close, but not the same."
}, {
  t: "Different traditions. Shared human questions.",
  s: "Every month, one question like this. You answer it later, if you want. Answers are counted, never named."
}, {
  t: "Learn. Understand. Connect.",
  s: "The ideas people share become one quiet map you can explore later."
}, {
  t: "Many traditions. Many words. One conversation.",
  s: ""
}];
function ObMeet({
  on
}) {
  const W = [["grace", "Christian", "translate(calc(-100% - 14px), -100%)", "translate(-80vw, -100%)", "8px"], ["prasāda", "Hindu", "translate(14px, -100%)", "translate(80vw, -100%)", "-8px"], ["dāna", "Buddhist", "translate(-50%, 18px)", "translate(-50%, 60vh)", "0px"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      overflow: "hidden"
    }
  }, W.map(([w, tr, to, from, dx], i) => /*#__PURE__*/React.createElement("div", {
    key: w,
    "data-ob-live": "",
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...obLive(on, i === 2 ? "ob-float" : "ob-sway", 5.5 + i, 1.3 + i * 0.5, {
        "--ob-dx": dx
      }),
      transform: on ? to : from,
      opacity: on ? 1 : 0,
      transition: `transform 1680ms ${obEase} ${i * 220}ms, opacity 750ms var(--ease-out) ${i * 220}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...obWord,
      color: obTr[tr]
    }
  }, w), /*#__PURE__*/React.createElement("span", {
    style: obTag
  }, tr))));
}
function ObVoices({
  on
}) {
  const [ref, w] = useObW();
  const narrow = w < 560;
  const V = [["keeping a promise", 18, 16, 0, -1], ["care that asks nothing back", 82, 22, 1, -1], ["patience with my parents", 12, 80, 0, 1], ["sharing a meal", 86, 78, 1, 1], ["forgiving first", 50, 94, 0.5, 1]];
  const pill = (p, i, dy) => ({
    ...obLive(on, "ob-float", 5 + i * 0.7, 1.4 + i * 0.35),
    whiteSpace: "nowrap",
    padding: "8px 14px",
    borderRadius: 999,
    background: "var(--surface-raised)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-body)",
    font: `400 ${narrow ? 14 : 15}px/1.2 var(--font-pastoral, var(--font-body))`,
    fontStyle: "italic",
    transform: on ? "none" : `translateY(${dy * 24}px)`,
    opacity: on ? 1 : 0,
    transition: `transform 1400ms ${obEase} ${400 + i * 240}ms, opacity 900ms var(--ease-out) ${400 + i * 240}ms`
  });
  if (narrow) {
    const row = {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center"
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 18,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: row
    }, V.slice(0, 2).map(([p], i) => /*#__PURE__*/React.createElement("span", {
      key: p,
      "data-ob-live": "",
      style: pill(p, i, -1)
    }, "\u201C", p, "\u201D"))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        textAlign: "center",
        font: "800 clamp(26px,7vw,34px)/1.1 var(--font-display)",
        color: "var(--text-strong)",
        opacity: on ? 1 : 0,
        transition: "opacity 750ms var(--ease-out)"
      }
    }, "What does ", /*#__PURE__*/React.createElement("u", {
      style: {
        color: "var(--lamp-400)",
        textUnderlineOffset: "0.12em"
      }
    }, "love"), " mean to you?"), /*#__PURE__*/React.createElement("div", {
      style: row
    }, V.slice(2).map(([p], i) => /*#__PURE__*/React.createElement("span", {
      key: p,
      "data-ob-live": "",
      style: pill(p, i + 2, 1)
    }, "\u201C", p, "\u201D"))));
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      height: "100%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      position: "absolute",
      left: "50%",
      top: "48%",
      transform: "translate(-50%,-50%)",
      margin: 0,
      width: "min(80%, 420px)",
      textAlign: "center",
      font: "800 clamp(26px,6.5vw,40px)/1.1 var(--font-display)",
      color: "var(--text-strong)",
      opacity: on ? 1 : 0,
      transition: "opacity 750ms var(--ease-out)"
    }
  }, "What does ", /*#__PURE__*/React.createElement("u", {
    style: {
      color: "var(--lamp-400)",
      textUnderlineOffset: "0.12em"
    }
  }, "love"), " mean to you?"), V.map(([p, x, y, dx, dy], i) => /*#__PURE__*/React.createElement("span", {
    key: p,
    "data-ob-live": "",
    style: {
      ...obLive(on, "ob-float", 5 + i * 0.7, 1.4 + i * 0.35),
      position: "absolute",
      left: `clamp(130px, ${x}%, calc(100% - 130px))`,
      top: `${y}%`,
      whiteSpace: "nowrap",
      padding: "8px 14px",
      borderRadius: 999,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-subtle)",
      font: "400 16px/1.2 var(--font-pastoral, var(--font-body))",
      fontStyle: "italic",
      color: "var(--text-body)",
      transform: `translate(-50%,-50%) translate(${on ? 0 : dx < 0.5 ? -40 : dx > 0.5 ? 40 : 0}px, ${on ? 0 : dy * 30}px)`,
      opacity: on ? 1 : 0,
      transition: `transform 1400ms ${obEase} ${400 + i * 240}ms, opacity 900ms var(--ease-out) ${400 + i * 240}ms`
    }
  }, "\u201C", p, "\u201D")));
}
function ObConstellation({
  on
}) {
  const [ref, w] = useObW();
  const k = Math.min(1, Math.max(0.55, (w - 40) / 440));
  const N = [["love", 0, 0, 1], ["faith", -118, -62, .8], ["hope", 112, -58, .75], ["community", -132, 58, .7], ["forgiveness", 118, 64, .7], ["service", -8, -118, .6], ["meaning", 4, 118, .65]];
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      height: "100%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-ob-live": "",
    style: {
      position: "absolute",
      inset: 0,
      ...obLive(on, "ob-turn", 20, 1.4)
    }
  }, N.map(([wd, x, y, s], i) => /*#__PURE__*/React.createElement("span", {
    key: wd,
    "data-ob-live": "",
    style: {
      ...(i === 0 ? obLive(on, "ob-breathe", 4.5, 1.2) : obLive(on, "ob-orbit", 7 + i * 0.9, 1.2 + i * 0.3)),
      position: "absolute",
      left: "50%",
      top: "50%",
      padding: `${(10 * s + 6) * k}px ${(16 * s + 8) * k}px`,
      borderRadius: 999,
      whiteSpace: "nowrap",
      background: i === 0 ? "var(--lamp-400)" : "var(--ink-2)",
      color: i === 0 ? "var(--ink-0)" : "var(--text-strong)",
      border: `1px solid ${i === 0 ? "var(--lamp-400)" : "var(--ink-4)"}`,
      font: `800 ${Math.round((14 + 12 * s) * (0.75 + 0.25 * k))}px/1 var(--font-display)`,
      transform: `translate(-50%,-50%) translate(${on ? x * k : 0}px, ${on ? y * (0.7 + 0.3 * k) : 0}px) scale(${on ? 1 : 0.4})`,
      opacity: on ? 1 : 0,
      transition: `transform 1540ms ${obEase} ${200 + i * 140}ms, opacity 750ms var(--ease-out) ${200 + i * 140}ms`
    }
  }, wd))));
}
function ObPaths({
  on,
  go,
  art
}) {
  const W = [["dharma", "Hindu", "translateX(-80vw)"], ["dhamma", "Buddhist", "translateY(-140px)"], ["righteousness", "Christian", "translateX(80vw)"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "clamp(14px,4vw,32px)",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }, W.map(([w, tr, from], i) => /*#__PURE__*/React.createElement("div", {
    key: w,
    "data-ob-live": "",
    style: {
      ...obLive(on, "ob-float", 6 + i * 0.8, 1.5 + i * 0.4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transform: on ? "none" : from,
      opacity: on ? 1 : 0,
      transition: `transform 1680ms ${obEase} ${i * 200}ms, opacity 750ms var(--ease-out) ${i * 200}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...obWord,
      fontSize: "clamp(26px,6.5vw,44px)",
      color: obTr[tr]
    }
  }, w), /*#__PURE__*/React.createElement("span", {
    style: obTag
  }, tr)))));
}
function OnboardingScreen({
  go
}) {
  const [i, setI] = React.useState(() => {
    const s = +new URLSearchParams(location.hash.slice(1)).get("step");
    return s >= 1 && s <= 4 ? s - 1 : 0;
  });
  const [on, setOn] = React.useState(obReduce());
  const [cur, setCur] = React.useState(() => window.CACurious.get());
  const toggle = k => {
    window.CAHaptic && window.CAHaptic("light");
    const n = cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k];
    setCur(n);
    window.CACurious.set(n);
  };
  React.useEffect(() => {
    if (new URLSearchParams(location.hash.slice(1)).get("step")) return;
    try {
      localStorage.setItem("ca_onboarded", "1");
    } catch (x) {}
  }, []);
  React.useEffect(() => {
    if (obReduce()) {
      setOn(true);
      return;
    }
    setOn(false);
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(a);
  }, [i]);
  const next = () => setI(n => Math.min(3, n + 1));
  const back = () => setI(n => Math.max(0, n - 1));
  React.useEffect(() => {
    const k = e => {
      if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      if (e.key === "ArrowRight" && i < 3) next();
      if (e.key === "ArrowLeft" && i > 0) back();
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [i]);
  const S = OB_STEPS[i];
  const Art = [ObMeet, ObVoices, ObConstellation, ObPaths][i];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: "100%",
      maxWidth: 880,
      margin: "0 auto",
      padding: "12px var(--gutter-phone) 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      minHeight: "calc(100svh - 60px)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: "1 1 0",
      minHeight: "min(300px, 38svh)"
    }
  }, /*#__PURE__*/React.createElement(Art, {
    on: on,
    go: go
  })), /*#__PURE__*/React.createElement("div", {
    key: "t" + i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      textAlign: "center",
      alignItems: "center",
      opacity: on ? 1 : 0,
      transform: on ? "none" : "translateY(8px)",
      transition: "opacity 750ms var(--ease-out) 200ms, transform 500ms var(--ease-out) 200ms"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: 640,
      font: "800 min(clamp(30px,7vw,48px), 7svh)/1.02 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      textWrap: "balance"
    }
  }, S.t), S.s && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 460,
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, S.s)), i < 3 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10
    }
  }, i > 0 && /*#__PURE__*/React.createElement(ObButton, {
    variant: "ghost",
    size: "lg",
    icon: "arrow-left",
    onClick: back
  }, "Back"), /*#__PURE__*/React.createElement(ObButton, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: next
  }, "Next")) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100%, 520px)",
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      transform: on ? "none" : "translateY(16px)",
      opacity: on ? 1 : 0,
      transition: `transform 840ms ${obEase} 1100ms, opacity 750ms var(--ease-out) 1100ms`
    }
  }, /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 0,
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("legend", {
    style: {
      padding: 0,
      marginBottom: 6,
      textAlign: "center",
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, "Curious about\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      textAlign: "center",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Optional. It picks your first few words and stays on this device."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center"
    }
  }, Object.keys(window.CACurious.LABEL).map(k => {
    const p = cur.includes(k);
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      "aria-pressed": p,
      onClick: () => toggle(k),
      style: {
        height: 40,
        flex: "none",
        whiteSpace: "nowrap",
        padding: "0 14px",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        cursor: "pointer",
        font: "600 13px/1 var(--font-body)",
        border: "1px solid " + (p ? "var(--bone-8)" : "var(--border-default)"),
        background: p ? "var(--bone-8)" : "transparent",
        color: p ? "var(--ink-0)" : "var(--text-body)",
        transition: "background 200ms var(--ease-out), color 200ms var(--ease-out)"
      }
    }, p && /*#__PURE__*/React.createElement(ObIcon, {
      name: "check",
      size: 16
    }), window.CACurious.LABEL[k]);
  }))), (() => {
    const gf = localStorage.getItem("ca_guest_first") === "1";
    const acct = /*#__PURE__*/React.createElement("div", {
      key: "a",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(ObButton, {
      variant: gf ? "secondary" : "accent",
      size: "lg",
      fullWidth: true,
      onClick: () => go("welcome")
    }, "Create an account"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center",
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, "Saves your words and the monthly question."));
    const guest = /*#__PURE__*/React.createElement("div", {
      key: "g",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(ObButton, {
      variant: gf ? "accent" : "secondary",
      size: "lg",
      fullWidth: true,
      iconRight: "arrow-right",
      onClick: () => {
        window.CASession.set({
          kind: "guest",
          name: "Guest"
        });
        go("term", window.CACurious.first());
      }
    }, "Continue as guest"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center",
        font: "var(--type-source)",
        color: "var(--text-muted)"
      }
    }, "Nothing about you is stored."));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, gf ? [guest, acct] : [acct, guest]);
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(ObButton, {
    variant: "ghost",
    size: "sm",
    icon: "arrow-left",
    onClick: back
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("signin"),
    style: {
      height: 44,
      padding: "0 12px",
      background: "none",
      border: 0,
      color: "var(--text-body)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, "I already have an account"))));
}
function AuthArt() {
  const [i, setI] = React.useState(obReduce() ? 3 : 0),
    [on, setOn] = React.useState(obReduce());
  React.useEffect(() => {
    if (obReduce()) return;
    setOn(false);
    const a = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    const b = i < 3 ? setTimeout(() => setI(i + 1), 5200) : 0;
    return () => {
      cancelAnimationFrame(a);
      clearTimeout(b);
    };
  }, [i]);
  const Art = [ObMeet, ObVoices, ObConstellation, ObPaths][i];
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: 32,
      boxSizing: "border-box",
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: "1 1 0",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Art, {
    on: on,
    art: true
  })), /*#__PURE__*/React.createElement("p", {
    key: "c" + i,
    style: {
      margin: 0,
      textAlign: "center",
      font: "800 24px/1.1 var(--font-display)",
      color: "var(--text-strong)",
      textWrap: "balance",
      opacity: on ? 1 : 0,
      transition: "opacity 750ms var(--ease-out) 200ms"
    }
  }, OB_STEPS[i].t));
}
window.OnboardingScreen = OnboardingScreen;
window.AuthArt = AuthArt;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/SearchScreen.jsx
try { (() => {
const {
  TextField: SsField,
  Button: SsButton,
  StateBlock: SsState,
  Tag: SsTag,
  Icon: SsIcon
} = window.ChurchAIDesignSystem_06db43;
function SearchScreen({
  open,
  initial = ""
}) {
  const lk = window.CAGuard.lockdown();
  const [q, setQ] = React.useState(() => initial || (lk ? "" : sessionStorage.getItem("ca_q")) || "");
  const [note, setNote] = React.useState(() => !lk && !localStorage.getItem("ca_tabnote_seen"));
  const [team, setTeam] = React.useState(() => !lk && localStorage.getItem("ca_team_note") === "1" && !localStorage.getItem("ca_team_note_seen"));
  const [teamIn, setTeamIn] = React.useState(false);
  React.useEffect(() => {
    if (!team) return;
    const a = requestAnimationFrame(() => setTeamIn(true));
    return () => cancelAnimationFrame(a);
  }, []);
  const hideTeam = () => {
    localStorage.setItem("ca_team_note_seen", "1");
    localStorage.removeItem("ca_team_note");
    setTeam(false);
  };
  const picked = window.CACurious ? window.CACurious.words() : [];
  const hideNote = () => {
    localStorage.setItem("ca_tabnote_seen", "1");
    setNote(false);
  };
  const [phone, setPhone] = React.useState(() => innerWidth < 700);
  React.useEffect(() => {
    const f = () => setPhone(innerWidth < 700);
    addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);
  const [res, setRes] = React.useState(null);
  const [phase, setPhase] = React.useState("idle");
  const [rid, setRid] = React.useState("");
  const [qErr, setQErr] = React.useState(null);
  const run = (term = q) => {
    const t = term.trim().toLowerCase();
    if (!t) {
      setQErr("Type a word to look up, like karma.");
      return;
    }
    setQErr(null);
    if (!lk) sessionStorage.setItem("ca_q", t);
    if (!window.CA_DEMO) setPhase("loading");
    setTimeout(() => {
      if (t === "error") {
        setPhase("error");
        return;
      }
      if (t === "blocked" || window.CAGuard.injection(t)) {
        setRid(window.CAGuard.reqId());
        setPhase("blocked");
        return;
      }
      if (t === "offline") {
        setPhase("unavailable");
        return;
      }
      if (t.length > 60 || /[<>{}]/.test(t)) {
        setPhase("invalid");
        return;
      }
      const r = window.CA_DATA.lexicon.filter(x => x.term.includes(t));
      setRes(r);
      setPhase(r.length ? "results" : "empty");
    }, window.CA_DEMO ? 0 : 380);
  };
  const all = ["karma", "dharma", "moksha", "nirvana", "grace", "faith", "salvation", "marriage", "love", "meditation", "suffering", "compassion"];
  const demo = [...picked, ...all.filter(w => !picked.includes(w))];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-read)",
      width: "100%",
      margin: "0 auto",
      padding: "40px var(--gutter-phone) 24px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "800 clamp(52px,15vw,76px)/.92 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: "0 0 14px",
      textWrap: "balance"
    }
  }, "Comparative dictionary."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 18,
      color: "var(--text-muted)",
      margin: "0 0 28px",
      textWrap: "pretty"
    }
  }, "Type a word to see what it means in Hindu, Buddhist and Christian traditions, side by side."), note && !team && /*#__PURE__*/React.createElement("div", {
    role: "note",
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      padding: 12,
      marginBottom: 14,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      font: "var(--type-source)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      paddingTop: 3
    }
  }, "This tab remembers your search until you close it. On a shared computer, use a private window."), /*#__PURE__*/React.createElement("button", {
    onClick: hideNote,
    "aria-label": "Dismiss",
    style: {
      width: 32,
      height: 32,
      flex: "none",
      display: "grid",
      placeItems: "center",
      background: "none",
      border: 0,
      borderRadius: 99,
      color: "var(--text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(SsIcon, {
    name: "x",
    size: 16
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      run();
    },
    style: phone ? {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: lk ? 0 : 72,
      zIndex: 40,
      display: "flex",
      gap: 8,
      alignItems: "flex-end",
      padding: "10px var(--gutter-phone) calc(10px + env(safe-area-inset-bottom))",
      background: "var(--surface-page)",
      borderTop: "1px solid var(--border-subtle)"
    } : {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      gap: 8,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(SsField, {
    label: "Look up a word",
    size: "lg",
    icon: "search",
    type: "search",
    enterKeyHint: "search",
    autoComplete: "off",
    placeholder: "karma",
    value: q,
    error: qErr || undefined,
    onChange: e => {
      setQ(e.target.value);
      qErr && setQErr(null);
    }
  })), /*#__PURE__*/React.createElement(window.CAMic, {
    size: 60,
    onText: t => {
      const w = t.toLowerCase().replace(/[.?!,]/g, "");
      setQ(w);
      qErr && setQErr(null);
      run(w);
    }
  })), /*#__PURE__*/React.createElement(SsButton, {
    type: "submit",
    variant: "accent",
    size: "lg",
    fullWidth: !phone,
    loading: phase === "loading"
  }, "Search")), team && /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: "24px 0 0",
      padding: "18px 20px",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      opacity: teamIn ? 1 : 0,
      transform: teamIn ? "none" : "translateY(6px)",
      transition: "opacity 900ms var(--ease-out), transform 900ms var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      flex: 1,
      font: "400 24px/1.55 var(--font-hand, 'Kalam', cursive)",
      color: "var(--text-strong)"
    }
  }, window.CATeamNote.lines.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: "block"
    }
  }, l)), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 8,
      font: "400 18px/1 var(--font-hand, 'Kalam', cursive)",
      color: "var(--text-muted)"
    }
  }, window.CATeamNote.sign)), /*#__PURE__*/React.createElement("button", {
    onClick: hideTeam,
    "aria-label": "Close note",
    style: {
      width: 44,
      height: 44,
      margin: "-8px -10px 0 0",
      flex: "none",
      display: "grid",
      placeItems: "center",
      background: "none",
      border: 0,
      borderRadius: 99,
      color: "var(--text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(SsIcon, {
    name: "x",
    size: 16
  }))), phase === "idle" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: phone ? 4 : 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-faint)",
      marginBottom: 10
    }
  }, picked.length ? `Picked first because you chose ${window.CACurious.get().map(k => window.CACurious.LABEL[k]).join(" and ")}` : "Tap one"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, demo.map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => {
      window.CAHaptic && window.CAHaptic("light");
      setQ(d);
      run(d);
    },
    style: {
      height: 40,
      padding: "0 16px",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      background: "transparent",
      color: "var(--text-body)",
      font: "600 16px/1 var(--font-body)",
      cursor: "pointer"
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      marginTop: phone ? 0 : 28,
      paddingBottom: phone ? 120 : 0
    }
  }, phase === "loading" && /*#__PURE__*/React.createElement(SsState, {
    kind: "loading",
    compact: true
  }), phase === "empty" && /*#__PURE__*/React.createElement(window.WordEmpty, {
    word: q.trim(),
    line: "Not in the dictionary yet."
  }), phase === "error" && /*#__PURE__*/React.createElement(SsState, {
    kind: "error",
    message: "The dictionary service did not answer. Try again in a moment.",
    onRetry: () => run("karma"),
    compact: true
  }), phase === "blocked" && /*#__PURE__*/React.createElement(SsState, {
    kind: "unavailable",
    title: "Blocked",
    message: `This request was blocked. It reads like an instruction to the system, not a word, so nothing was looked up. Request id: ${rid}`,
    compact: true
  }), phase === "unavailable" && /*#__PURE__*/React.createElement(SsState, {
    kind: "unavailable",
    message: "Search is unavailable right now. Nothing you did caused it.",
    compact: true
  }), phase === "invalid" && /*#__PURE__*/React.createElement(SsState, {
    kind: "error",
    title: "Invalid input",
    message: "Use a single word or short phrase, without symbols.",
    compact: true
  }), phase === "results" && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, res.map(r => /*#__PURE__*/React.createElement("li", {
    key: r.term
  }, /*#__PURE__*/React.createElement("button", {
    onClick: ev => {
      const el = ev.currentTarget.querySelector("[data-hw]");
      const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (document.startViewTransition && el && !rm) {
        el.style.viewTransitionName = "ca-headword";
        window.CAHwFrom = r.term;
        document.startViewTransition(() => ReactDOM.flushSync(() => open(r.term)));
      } else open(r.term);
    },
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 0",
      background: "none",
      border: 0,
      borderBottom: "1px solid var(--border-subtle)",
      cursor: "pointer",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-hw": "",
    style: {
      font: "800 24px/1.1 var(--font-display)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      overflowWrap: "anywhere",
      width: "fit-content"
    }
  }, r.term), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      marginTop: 4,
      fontStyle: r.def ? "normal" : "italic"
    }
  }, r.def || "Not in the dictionary yet.")), /*#__PURE__*/React.createElement(SsIcon, {
    name: "arrow-right",
    size: 20,
    color: "var(--text-faint)"
  })))))));
}
window.SearchScreen = SearchScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/SearchScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/SettingsScreen.jsx
try { (() => {
const {
  Button: SeButton,
  SegmentedControl: SeSeg,
  Switch: SeSwitch,
  Badge: SeBadge,
  Toast: SeToast,
  Icon: SeIcon
} = window.ChurchAIDesignSystem_06db43;
const seLabel = {
  font: "var(--type-label)",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-faint)"
};
const seBox = {
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-lg)",
  background: "var(--surface-card)",
  padding: "4px 20px"
};
const sePalettes = [["moss", "Moss", ["#0B0F0C", "#CFDA5C"]], ["lamp", "Lamp", ["#0E0D0B", "#F4C152"]], ["nocturne", "Nocturne", ["#0A0C12", "#FF6FA3"]], ["oxblood", "Oxblood", ["#120B0C", "#6FD6FF"]]];
function SeRow({
  title,
  sub,
  children,
  stack
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "se-row",
    style: {
      display: "flex",
      flexDirection: stack ? "column" : "row",
      alignItems: stack ? "stretch" : "center",
      gap: 12,
      padding: "16px 0",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: stack ? "none" : "1 1 200px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      fontSize: 13,
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      maxWidth: "100%"
    }
  }, children));
}
function SeSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...seLabel,
      margin: "0 0 8px 4px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: seBox
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, React.Children.toArray(children).filter(Boolean).flatMap(c => c.type === React.Fragment ? React.Children.toArray(c.props.children).filter(Boolean) : [c]).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderTop: i ? "1px solid var(--border-subtle)" : 0
    }
  }, c)))));
}
function SettingsScreen({
  go
}) {
  const [p, setP] = window.usePrefs();
  const [s, setSession] = window.useSession();
  const [delAsk, setDelAsk] = React.useState(false),
    [delTxt, setDelTxt] = React.useState(""),
    [memTick, setMemTick] = React.useState(0);
  const mem = React.useMemo(() => {
    const L = localStorage,
      ks = Object.keys(L),
      out = [];
    const j = k => {
      try {
        return JSON.parse(L.getItem(k));
      } catch (e) {
        return null;
      }
    };
    const c = j("ca_curious");
    if (c && c.length) out.push({
      label: "Words you’re curious about",
      val: c.map(k => window.CACurious && window.CACurious.LABEL[k] || k).join(", "),
      keys: ["ca_curious"]
    });
    const ideas = ks.filter(k => k.startsWith("ca_my_idea_"));
    if (ideas.length) out.push({
      label: "Your idea on the map",
      val: ideas.map(k => L.getItem(k)).join(", "),
      keys: ideas
    });
    const ans = ks.filter(k => k.startsWith("ca_answered_"));
    if (ans.length) out.push({
      label: "Months you answered",
      val: ans.length + " month" + (ans.length > 1 ? "s" : ""),
      keys: ans
    });
    const d = j("ca_on_device");
    if (d && d.length) out.push({
      label: "Words saved for offline",
      val: d.join(", "),
      keys: ["ca_on_device"]
    });
    if (L.getItem("ca_remind")) out.push({
      label: "Monthly reminder",
      val: L.getItem("ca_remind") === "yes" ? "On" : "Off",
      keys: ["ca_remind"]
    });
    const h = ks.filter(k => k.startsWith("ca_helped_"));
    if (h.length) out.push({
      label: "“Did this help?” taps",
      val: h.length + " answer" + (h.length > 1 ? "s" : ""),
      keys: h
    });
    return out;
  }, [memTick]);
  const forget = all => {
    Object.keys(localStorage).filter(k => k.startsWith("ca_") && (all || !["ca_prefs", "ca_session", "ca_pipe_route"].includes(k))).forEach(k => localStorage.removeItem(k));
  };
  const [toast, setToast] = React.useState(null);
  const [pauseV, setPauseV] = React.useState(() => window.CAPauseMinutes ? window.CAPauseMinutes.get() : "25");
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(id);
  }, [toast]);
  const upd = (patch, msg) => {
    setP(patch);
    setToast(msg || "Saved");
  };
  const light = p.theme === "light" || p.theme === "system" && window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches;
  const kind = s ? s.kind : "none";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-read)",
      width: "100%",
      margin: "0 auto",
      padding: "28px var(--gutter-phone) 32px",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "800 clamp(40px,12vw,56px)/1 var(--font-display)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Settings"), /*#__PURE__*/React.createElement(SeSection, {
    label: "Account"
  }, kind === "member" || kind === "admin" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SeRow, {
    title: s.name,
    sub: s.email
  }, /*#__PURE__*/React.createElement(SeBadge, {
    tone: kind === "admin" ? "info" : "neutral"
  }, kind === "admin" ? "Admin" : "Reader")), kind === "admin" && /*#__PURE__*/React.createElement(SeRow, {
    title: "Admin",
    sub: "Accounts, map draft and faith review."
  }, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => go("admin")
  }, "Open admin")), /*#__PURE__*/React.createElement(SeRow, {
    title: "Sign out",
    sub: "Your settings stay on this device."
  }, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => {
      setSession(null);
      window.CAGuard.plain();
    }
  }, "Sign out"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SeRow, {
    title: kind === "guest" ? "You’re browsing as a guest" : "Not signed in",
    sub: "No email, no name, nothing about you is stored."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => go("signin")
  }, "Sign in"), localStorage.getItem("ca_guest_first") !== "1" && /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => go("welcome")
  }, "Create account"))))), /*#__PURE__*/React.createElement(SeSection, {
    label: "Language"
  }, /*#__PURE__*/React.createElement(SeRow, {
    title: "App language",
    sub: "Buttons, labels and messages. Word definitions show in English until a reviewer approves a translation."
  }, /*#__PURE__*/React.createElement(window.CALangPick, null))), /*#__PURE__*/React.createElement(SeSection, {
    label: "Appearance"
  }, /*#__PURE__*/React.createElement(SeRow, {
    title: "Theme",
    sub: p.theme === "system" ? `Following your phone · ${light ? "light" : "dark"} now` : undefined,
    stack: true
  }, /*#__PURE__*/React.createElement(SeSeg, {
    label: "Theme",
    value: p.theme,
    onChange: v => upd({
      theme: v
    }, v === "light" ? "Light mode on" : v === "dark" ? "Dark mode on" : "Following your phone"),
    options: [{
      value: "dark",
      label: "Dark"
    }, {
      value: "light",
      label: "Light"
    }, {
      value: "system",
      label: "System"
    }]
  })), /*#__PURE__*/React.createElement(SeRow, {
    title: "Dark palette",
    sub: light ? "Palettes apply in dark mode." : "One accent across the whole app.",
    stack: true
  }, /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Dark palette",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: 8,
      opacity: light ? 0.45 : 1
    }
  }, sePalettes.map(([id, name, [bg, ac]]) => {
    const on = p.palette === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "radio",
      "aria-checked": on,
      disabled: light,
      onClick: () => upd({
        palette: id
      }, `${name} palette`),
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "stretch",
        padding: 8,
        borderRadius: "var(--radius-md)",
        border: `${on ? 2 : 1}px solid ${on ? "var(--lamp-400)" : "var(--border-default)"}`,
        background: "transparent",
        cursor: light ? "not-allowed" : "pointer",
        minHeight: 44
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        height: 36,
        borderRadius: 6,
        background: bg,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 5,
        border: "1px solid rgba(255,255,255,.08)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 99,
        background: ac
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "600 13px/1 var(--font-body)",
        color: on ? "var(--text-strong)" : "var(--text-muted)",
        textAlign: "left"
      }
    }, name));
  }))), /*#__PURE__*/React.createElement(SeRow, {
    title: "Text size",
    sub: "Larger text across every screen."
  }, /*#__PURE__*/React.createElement(SeSeg, {
    size: "sm",
    label: "Text size",
    value: p.textSize,
    onChange: v => upd({
      textSize: v
    }, v === "large" ? "Larger text on" : "Default text"),
    options: [{
      value: "default",
      label: "Default"
    }, {
      value: "large",
      label: "Large"
    }]
  }))), /*#__PURE__*/React.createElement(SeSection, {
    label: "What Rhema.ai remembers"
  }, /*#__PURE__*/React.createElement(SeRow, {
    title: "On this device only",
    sub: "Nothing here is sent anywhere. Delete any of it.",
    stack: true
  }, mem.length === 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, "Nothing yet.") : /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, mem.map((m, i) => /*#__PURE__*/React.createElement("li", {
    key: m.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 16px/1.3 var(--font-body)",
      color: "var(--text-strong)"
    }
  }, m.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, m.val)), /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "ghost",
    icon: "x",
    onClick: () => {
      m.keys.forEach(k => localStorage.removeItem(k));
      setMemTick(t => t + 1);
      setToast(m.label + " deleted.");
    }
  }, "Delete")))), mem.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => {
      forget(false);
      setMemTick(t => t + 1);
      setToast("Cleared. This device remembers nothing about you.");
    }
  }, "Clear everything")))), /*#__PURE__*/React.createElement(SeSection, {
    label: "Motion and reading"
  }, /*#__PURE__*/React.createElement(SeRow, {
    title: "Gentle pause",
    sub: "A calm note after a long stretch. Once per visit.",
    stack: true
  }, /*#__PURE__*/React.createElement(SeSeg, {
    size: "sm",
    label: "Gentle pause",
    value: pauseV,
    onChange: v => {
      setPauseV(v);
      window.CAPauseMinutes.set(v);
      setToast(v === "off" ? "Gentle pause off" : `Gentle pause after ${v} minutes`);
    },
    options: [{
      value: "15",
      label: "15 min"
    }, {
      value: "25",
      label: "25 min"
    }, {
      value: "45",
      label: "45 min"
    }, {
      value: "off",
      label: "Off"
    }]
  })), /*#__PURE__*/React.createElement(SeRow, {
    title: "Reduce motion",
    sub: "Turns off slides, pops and hints."
  }, /*#__PURE__*/React.createElement(SeSwitch, {
    checked: !!p.reduceMotion,
    onChange: v => upd({
      reduceMotion: v
    }, v ? "Motion reduced" : "Motion on")
  }))), (kind === "member" || kind === "admin") && /*#__PURE__*/React.createElement(SeSection, {
    label: "Leave Rhema.ai"
  }, /*#__PURE__*/React.createElement(SeRow, {
    title: "Delete account",
    sub: "Removes your email, display name and settings. Past answers stay only as anonymous counts and can\u2019t be traced to you.",
    stack: true
  }, delAsk ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(window.CATypeConfirm, {
    word: "delete",
    value: delTxt,
    onChange: setDelTxt,
    hint: "This can\u2019t be undone."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "danger",
    disabled: !window.CAMatch(delTxt, "delete"),
    onClick: () => {
      forget(true);
      setSession(null);
      go("search");
    }
  }, "Delete account"), /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      setDelAsk(false);
      setDelTxt("");
    }
  }, "Keep it"))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SeButton, {
    size: "sm",
    variant: "danger",
    icon: "trash-2",
    onClick: () => setDelAsk(true)
  }, "Delete account\u2026")))), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 84,
      transform: "translateX(-50%)",
      zIndex: 120,
      animation: "ca-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(SeToast, {
    tone: "ok",
    onClose: () => setToast(null)
  }, toast)));
}
window.SettingsScreen = SettingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/Shell.jsx
try { (() => {
const {
  Wordmark,
  Icon,
  IconButton: ShIconBtn,
  Button: ShButton
} = window.ChurchAIDesignSystem_06db43;
function useWide(bp = 860) {
  const [w, setW] = React.useState(window.innerWidth >= bp);
  React.useEffect(() => {
    const f = () => setW(window.innerWidth >= bp);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [bp]);
  return w;
}
const shellNav = [["search", "Dictionary", "book-open"], ["month", "This month", "message-square-text"], ["graph", "Map", "waypoints"]];
function PublicShell({
  route,
  go,
  children,
  bleed,
  bare
}) {
  const wide = useWide();
  const [session] = window.useSession();
  const signedIn = session && (session.kind === "member" || session.kind === "admin");
  const top = route === "term" ? "search" : route;
  const lk = window.CAGuard.lockdown && window.CAGuard.lockdown();
  const nav = lk ? shellNav.slice(0, 1) : shellNav;
  const order = ["search", "month", "graph"],
    prevTop = React.useRef(top),
    dir = React.useRef(null);
  if (prevTop.current !== top) {
    const a = order.indexOf(prevTop.current),
      b = order.indexOf(top);
    dir.current = a >= 0 && b >= 0 ? b > a ? "r" : "l" : null;
    prevTop.current = top;
  }
  const goTab = id => {
    if (id !== top) window.CAHaptic && window.CAHaptic("light");
    go(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      height: 60,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 var(--gutter-phone)",
      background: "color-mix(in srgb, var(--ink-0) 82%, transparent)",
      backdropFilter: "var(--blur-bar)",
      WebkitBackdropFilter: "var(--blur-bar)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go("search"),
    "aria-label": "Rhema.ai home",
    style: {
      background: "none",
      border: 0,
      padding: 0,
      cursor: "pointer",
      minHeight: 44,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), wide && !lk && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: "flex",
      gap: 4
    }
  }, nav.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => goTab(id),
    "aria-current": top === id ? "page" : undefined,
    style: {
      height: 40,
      padding: "0 14px",
      borderRadius: 999,
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      background: top === id ? "var(--surface-raised)" : "transparent",
      color: top === id ? "var(--text-strong)" : "var(--text-muted)"
    }
  }, label))), !bare && (signedIn || wide) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, !signedIn && /*#__PURE__*/React.createElement(ShButton, {
    size: "sm",
    variant: "secondary",
    onClick: () => go("signin")
  }, "Sign in"), session && session.kind === "admin" && wide && /*#__PURE__*/React.createElement(ShButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => go("admin")
  }, "Admin")), !bare && /*#__PURE__*/React.createElement(ShIconBtn, {
    icon: "settings",
    label: "Settings",
    size: 44,
    variant: route === "settings" ? "filled" : "ghost",
    onClick: () => go("settings")
  }), bare && /*#__PURE__*/React.createElement(ShButton, {
    size: "sm",
    variant: "ghost",
    onClick: () => {
      try {
        localStorage.setItem("ca_onboarded", "1");
      } catch (x) {}
      go("search");
    }
  }, "Skip")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      paddingBottom: wide || bleed || lk ? 0 : 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: top,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      animation: dir.current ? `ca-tab-${dir.current} 220ms var(--ease-out)` : "none"
    }
  }, children)), !bleed && !bare && /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "28px var(--gutter-phone) 36px",
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
      font: "var(--type-source)",
      color: "var(--text-faint)",
      justifyContent: "center"
    }
  }, !lk && window.CASession && (window.CASession.get() || {}).kind === "admin" && /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("admin", undefined, {
        tab: "map"
      });
    },
    style: {
      color: "var(--text-muted)",
      minHeight: 44,
      display: "inline-flex",
      alignItems: "center"
    }
  }, "Map draft")), !wide && !bare && !lk && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
      height: 64,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      background: "color-mix(in srgb, var(--ink-0) 92%, transparent)",
      backdropFilter: "var(--blur-bar)",
      WebkitBackdropFilter: "var(--blur-bar)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, nav.map(([id, label, ic]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => goTab(id),
    "aria-current": top === id ? "page" : undefined,
    style: {
      background: "none",
      border: 0,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      color: top === id ? "var(--lamp-400)" : "var(--text-muted)",
      font: "700 13px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 30,
      display: "grid",
      placeItems: "center",
      borderRadius: 999,
      background: top === id ? "var(--surface-raised)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    weight: top === id ? "fill" : "regular"
  })), label))));
}
function StatesScreen() {
  const {
    StateBlock: St
  } = window.ChurchAIDesignSystem_06db43;
  const items = [["Loading", /*#__PURE__*/React.createElement(St, {
    kind: "loading",
    compact: true
  })], ["Empty", /*#__PURE__*/React.createElement(St, {
    kind: "empty",
    compact: true,
    word: "quiet",
    motif: "people",
    title: "No alerts",
    message: "Every region is open as usual."
  })], ["Term not in the dictionary", /*#__PURE__*/React.createElement(St, {
    kind: "empty",
    compact: true,
    word: "xyz",
    motif: "word",
    message: "Not in the dictionary yet."
  })], ["Uncovered section", /*#__PURE__*/React.createElement(St, {
    kind: "uncovered",
    compact: true,
    message: "The dictionary does not cover this yet."
  })], ["Invalid input", /*#__PURE__*/React.createElement(St, {
    kind: "error",
    compact: true,
    title: "Invalid input",
    message: "Use a single word or short phrase, without symbols.",
    onRetry: () => {}
  })], ["Not allowed", /*#__PURE__*/React.createElement(St, {
    kind: "unavailable",
    compact: true,
    title: "Not allowed",
    message: "This page is for reviewers. Your account can\u2019t open it."
  })], ["Service down", /*#__PURE__*/React.createElement(St, {
    kind: "error",
    compact: true,
    title: "Service down",
    message: "The dictionary service did not answer. Try again in a moment.",
    onRetry: () => {}
  })], ["Unavailable", /*#__PURE__*/React.createElement(St, {
    kind: "unavailable",
    compact: true,
    message: "This part is unavailable while the assistant gateway is down. The definition still works."
  })], ["Blocked (request id)", /*#__PURE__*/React.createElement(St, {
    kind: "unavailable",
    compact: true,
    title: "Blocked",
    message: "This request was blocked. Nothing was looked up or saved. Request id: req_7f3a9c1e2d"
  })], ["Coverage insufficient", /*#__PURE__*/React.createElement(St, {
    kind: "uncovered",
    compact: true,
    title: "Coverage is insufficient",
    message: "No verified source for this block yet, so nothing is written."
  })]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      width: "100%",
      margin: "0 auto",
      padding: "32px var(--gutter-phone)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-title)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      margin: "0 0 6px"
    }
  }, "States and errors"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      margin: "0 0 20px"
    }
  }, "Every data screen uses these. Errors are one sentence a person can read."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
      gap: 16
    }
  }, items.map(([k, el]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-faint)"
    }
  }, k), el))));
}
function WordEmpty({
  word,
  line
}) {
  const {
    StateBlock: WeState,
    Button: WeBtn
  } = window.ChurchAIDesignSystem_06db43;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      position: "absolute",
      width: 1,
      height: 1,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      margin: 0
    }
  }, word), /*#__PURE__*/React.createElement(WeState, {
    kind: "empty",
    word: word,
    motif: "word",
    message: line
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement(WeBtn, {
    variant: "secondary",
    icon: "search",
    onClick: () => {
      location.hash = "r=search";
    }
  }, "Search another word")));
}
Object.assign(window, {
  PublicShell,
  StatesScreen,
  useWide,
  WordEmpty
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/TermScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Toast: TsToast,
  SegmentedControl: TsSeg,
  Tag: TsTag,
  SourceList: TsSources,
  StateBlock: TsState,
  CheckBadge: TsCheck,
  Icon: TsIcon,
  Button: TsButton,
  Badge: TsBadge,
  Switch: TsSwitch,
  Dialog: TsDialog,
  TextArea: TsArea
} = window.ChurchAIDesignSystem_06db43;
const tsLabel = {
  font: "var(--type-label)",
  letterSpacing: "var(--tracking-label)",
  color: "var(--text-faint)"
};
const tsTone = {
  Hindu: "hindu",
  Buddhist: "buddhist",
  Christian: "christian"
};
const tsP = {
  font: "var(--type-body)",
  fontSize: 18,
  lineHeight: 1.65,
  color: "var(--text-body)",
  margin: 0,
  textWrap: "pretty"
};
const tsBlocks = {
  parallel: "Parallel",
  difference: "Difference",
  bridge: "Christian bridge",
  root: "Linguistic root",
  timeline: "Historical timeline"
};
function TsRow({
  k,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "118px minmax(0,1fr)",
      gap: 12,
      alignItems: "baseline",
      padding: "12px 0",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: tsLabel
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, children));
}
const tsUncovered = /*#__PURE__*/React.createElement("span", {
  style: {
    color: "var(--text-muted)",
    fontStyle: "italic"
  }
}, "Not in the dictionary yet.");
function TsVerses({
  term
}) {
  const vs = (window.CA_VERSES || {})[term] || [];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...tsBox,
      ...(vs.length ? {} : {
        background: "transparent",
        border: "1px dashed var(--border-default)"
      })
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: tsLabel
  }, "06"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Verse list")), vs.length ? /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, vs.map((v, i) => /*#__PURE__*/React.createElement("li", {
    key: v.ref,
    style: {
      padding: "14px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : 0,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-body)",
      color: "var(--info-400)"
    }
  }, v.ref), v.text ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...tsP,
      fontFamily: "var(--font-pastoral, var(--font-body))"
    }
  }, v.text) : /*#__PURE__*/React.createElement(TsInsufficient, null), v.text && v.line && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-muted)",
      margin: 0
    }
  }, v.line)))) : /*#__PURE__*/React.createElement(TsInsufficient, null));
}
const tsBox = {
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-lg)",
  background: "var(--surface-card)",
  padding: 20
};
function NormalEntry({
  e
}) {
  const [store] = window.CAExpert.use();
  const nSrc = (e.sources || []).length,
    checked = !!(store && store._review || {})[e.term] || ["karma", "grace", "dharma"].includes(e.term);
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, (window.CA_LANG || "en") !== "en" && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: "0 4px",
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Not in this language yet. The definition below is in English until a reviewer approves a translation."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      alignItems: "center",
      font: "600 13px/1.3 var(--font-body)",
      color: "var(--text-muted)",
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "book-open",
    size: 16
  }), nSrc ? `${nSrc} source${nSrc > 1 ? "s" : ""}` : "No sources yet"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      color: checked ? "var(--ok-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: checked ? "circle-check" : "circle-dashed",
    size: 16
  }), checked ? "Reviewed by a religion expert against these sources" : "Not reviewed by an expert yet")), /*#__PURE__*/React.createElement("section", {
    style: tsBox
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tsLabel,
      marginBottom: 12
    }
  }, "Definition"), e.def ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "28px minmax(0,1fr)",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "800 24px/1.3 var(--font-display)",
      color: "var(--lamp-400)"
    }
  }, "1"), /*#__PURE__*/React.createElement("p", {
    "data-no-tr": "",
    lang: "en",
    style: {
      font: "700 24px/1.35 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0,
      textWrap: "pretty"
    }
  }, e.def)) : tsUncovered), /*#__PURE__*/React.createElement("section", {
    style: tsBox
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tsLabel,
      marginBottom: 12
    }
  }, "Used in"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, e.used.map(u => /*#__PURE__*/React.createElement(TsTag, {
    key: u,
    tone: tsTone[u]
  }, u)))), /*#__PURE__*/React.createElement("section", {
    style: tsBox
  }, /*#__PURE__*/React.createElement(TsSources, {
    sources: e.sources,
    title: "Sources",
    emptyText: "The dictionary does not cover sources for this term yet."
  })));
}
const CF = window.CAFaith;
const tsGapLabels = {
  goal: ["Nirvana / moksha", "Christian salvation"],
  human: ["Ignorance", "Sin"]
};
const tsNone = /*#__PURE__*/React.createElement("span", {
  style: {
    fontStyle: "italic",
    color: "var(--text-muted)"
  }
}, "The dictionary does not cover this yet.");
function TsFields({
  k,
  v,
  dim
}) {
  const fl = CF.fields(k);
  const val = CF.norm(k, v) || {};
  if (fl.length === 1) return /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 16,
      color: dim ? "var(--text-muted)" : "var(--text-body)",
      margin: "6px 0 0",
      textDecoration: dim && val[fl[0][0]] ? "line-through" : "none",
      fontStyle: val[fl[0][0]] ? "normal" : "italic"
    }
  }, val[fl[0][0]] || "Not covered before.");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 6
    }
  }, fl.map(([fk, lab]) => /*#__PURE__*/React.createElement("div", {
    key: fk
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tsLabel,
      fontSize: 13
    }
  }, lab), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      fontSize: 13,
      color: dim ? "var(--text-muted)" : "var(--text-body)",
      margin: "2px 0 0",
      textDecoration: dim && val[fk] ? "line-through" : "none",
      fontStyle: val[fk] ? "normal" : "italic"
    }
  }, val[fk] || "Not covered before."))));
}
function ExpertTrail({
  k,
  rec,
  cur
}) {
  if (!rec) return null;
  const n = (rec.sugg || []).length;
  const last = (rec.log || []).filter(l => l.kind !== "Approved").slice(-1)[0];
  if (!n && !last) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 14
    }
  }, n > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: 14,
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(TsBadge, {
    tone: "warn"
  }, "Waiting for review"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, n === 1 ? "1 suggestion" : `${n} suggestions`, " \xB7 a person decides before anything changes")), last && /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      padding: 14,
      background: "var(--surface-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(TsBadge, {
    tone: "ok"
  }, "Updated"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, CF.title(k), " \xB7 ", last.at)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: tsLabel
  }, "Old"), /*#__PURE__*/React.createElement(TsFields, {
    k: k,
    v: last.old,
    dim: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tsLabel,
      color: "var(--lamp-400)"
    }
  }, "New"), /*#__PURE__*/React.createElement(TsFields, {
    k: k,
    v: last.new ?? cur
  })))));
}
function TsActions({
  k,
  expert,
  onAct
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, !expert && /*#__PURE__*/React.createElement("button", {
    onClick: () => onAct("Report", k),
    style: {
      marginTop: 12,
      alignSelf: "flex-start",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      minHeight: 32,
      padding: 0,
      background: "none",
      border: 0,
      cursor: "pointer",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "flag",
    size: 16
  }), "Something off? Tell a person"), expert && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 14,
      paddingTop: 12,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(TsButton, {
    size: "sm",
    variant: "secondary",
    icon: "file-plus",
    onClick: () => onAct("Make", k)
  }, "Make"), /*#__PURE__*/React.createElement(TsButton, {
    size: "sm",
    variant: "secondary",
    icon: "pencil",
    onClick: () => onAct("Change", k)
  }, "Change"), /*#__PURE__*/React.createElement(TsButton, {
    size: "sm",
    variant: "ghost",
    icon: "message-square-plus",
    onClick: () => onAct("Suggest", k)
  }, "Suggest")));
}
const TsInsufficient = () => /*#__PURE__*/React.createElement("span", {
  style: {
    fontStyle: "italic",
    color: "var(--text-muted)",
    font: "var(--type-body)"
  }
}, "The dictionary does not cover this yet.");
const tsToneRe = /\b(superior|inferior|false religion|only true|wrong religion|better than|worse than|heathen|pagan|deceived|lost souls?|idols?|idolatry|myths?|demigods?|hindu trinity|h[iī]nay[aā]na|hindus believe|buddhists believe|all hindus|all buddhists|zen meditation)\b/i;
function FaithBlock({
  n,
  k,
  title,
  note,
  tone,
  dashed,
  children,
  expert,
  rec,
  cur,
  onAct
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-no-tr": "",
    style: {
      display: "flex",
      flexDirection: "column",
      border: `1px ${dashed ? "dashed" : "solid"} ${tone === "bridge" ? "var(--bridge-line)" : dashed ? "var(--border-default)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-lg)",
      background: tone === "bridge" ? "var(--bridge-tint)" : dashed ? "transparent" : "var(--surface-card)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...tsLabel,
      color: tone === "bridge" ? "var(--bridge-400)" : "var(--text-faint)"
    }
  }, n), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-section)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)",
      marginLeft: "auto"
    }
  }, note)), children, /*#__PURE__*/React.createElement(ExpertTrail, {
    k: k,
    rec: rec,
    cur: cur
  }), tone !== "bridge" && /*#__PURE__*/React.createElement(TsActions, {
    k: k,
    expert: expert,
    onAct: onAct
  }));
}
function GapUnit({
  k,
  v,
  expert,
  rec,
  onAct
}) {
  const [l, r] = tsGapLabels[k];
  const S = ({
    lead,
    children
  }) => /*#__PURE__*/React.createElement("p", {
    style: {
      ...tsP,
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-strong)"
    }
  }, lead, "."), " ", children || /*#__PURE__*/React.createElement(TsInsufficient, null));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 16,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-page)",
      border: "1px solid var(--bridge-line)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "700 18px/1.25 var(--font-display)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--bridge-400)"
    }
  }, k === "goal" ? "Gap 1" : "Gap 2", " \xB7 "), k === "goal" ? "Ultimate goal" : "Problem of humanity"), /*#__PURE__*/React.createElement(S, {
    lead: l
  }, v.left), /*#__PURE__*/React.createElement(S, {
    lead: r
  }, v.right), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "700 18px/1.5 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "The gap: ", v.gap ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--bridge-400)"
    }
  }, v.gap) : /*#__PURE__*/React.createElement(TsInsufficient, null)), /*#__PURE__*/React.createElement(ExpertTrail, {
    k: k,
    rec: rec,
    cur: v
  }), /*#__PURE__*/React.createElement(TsActions, {
    k: k,
    expert: expert,
    onAct: onAct
  }));
}
function FaithEntry({
  e,
  expert,
  setExpert
}) {
  const [store, setStore] = window.CAExpert.use();
  const [dlg, setDlg] = React.useState(null);
  const [draft, setDraft] = React.useState({});
  const [toast, setToast] = React.useState(null);
  const [blocked, setBlocked] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);
  const f = e.faith || {};
  const rec = k => (store[e.term] || {})[k] || null;
  const cur = k => CF.current(store, e, k);
  const open = (kind, k) => {
    setBlocked(null);
    setDlg({
      kind,
      k
    });
    setDraft(kind === "Change" ? {
      ...cur(k)
    } : {});
  };
  const single = dlg && (dlg.kind === "Suggest" || dlg.kind === "Report");
  const canSave = dlg && (single ? (draft.text || "").trim() : Object.values(draft).some(x => (x || "").trim()));
  const save = () => {
    const {
      kind,
      k
    } = dlg;
    if (!canSave) return;
    if (Object.values(draft).some(x => window.CAGuard.injection(x))) {
      setBlocked(window.CAGuard.reqId());
      return;
    }
    {
      const kindKey = kind === "Report" ? "report" : "expert";
      const bad = Object.values(draft).map(x => window.CAInput.check(kindKey, x, {
        optional: kind !== "Report"
      })).find(c => !c.ok);
      if (bad) {
        setToast(bad.msg);
        return;
      }
    }
    if (kind === "Report") {
      const rk = "ca_reported_" + e.term + "_" + k;
      if (localStorage.getItem(rk)) {
        setDlg(null);
        setToast("You’ve already told a person about this. Thank you.");
        return;
      }
      localStorage.setItem(rk, "1");
    }
    const t = {
      ...(store[e.term] || {})
    };
    const r = {
      log: [],
      sugg: [],
      ...(t[k] || {})
    };
    if (single) r.sugg = [...(r.sugg || []), {
      who: kind === "Report" ? "A reader" : window.CAExpert.expert,
      at: "Today",
      text: draft.text.trim()
    }];else {
      const nv = {};
      CF.fields(k).forEach(([fk]) => nv[fk] = (draft[fk] || "").trim() || null);
      r.log = [...(r.log || []), {
        kind,
        who: window.CAExpert.expert,
        at: "Today",
        old: cur(k),
        new: nv
      }];
      r.val = nv;
      delete r.text;
    }
    t[k] = r;
    setStore({
      ...store,
      [e.term]: t
    });
    setDlg(null);
    setToast(kind === "Report" ? "Sent. A person will read it." : kind === "Suggest" ? "Waiting for review." : "Updated. The old text stays beside the new.");
  };
  const P = k => ({
    k,
    expert,
    rec: rec(k),
    cur: cur(k),
    onAct: open
  });
  const txt = (k, fk = "text") => cur(k)[fk];
  const has = CF.hasContent(store, e);
  const rv = (store._review || {})[e.term];
  const markReviewed = () => setStore({
    ...store,
    _review: {
      ...(store._review || {}),
      [e.term]: {
        by: window.CAExpert.expert,
        at: "Today"
      }
    }
  });
  const hints = {
    Report: "A person on the review team reads every note. Nothing on the page changes until they decide.",
    Make: "Write this fresh. It replaces what is there, and the old text is kept beside it.",
    Change: "Edit the current text. The old text is kept beside the new.",
    Suggest: "Goes to the review list as waiting. Nothing on the page changes until it is approved."
  };
  const sources = (f.sources && f.sources.length ? f.sources : e.sources) || [];
  const noSrc = !(f.sources && f.sources.length);
  const hit = (...ks) => ks.map(k => Object.values(cur(k) || {}).join(" ")).join(" ").match(tsToneRe);
  const withheld = w => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 8,
      alignItems: "flex-start",
      color: "var(--danger-400)",
      font: "var(--type-body)",
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "eye-off",
    size: 18,
    style: {
      marginTop: 2,
      flex: "none"
    }
  }), "Withheld. The tone check found ranking language (\u201C", w, "\u201D). This block stays hidden until a person fixes it.");
  const body = k => noSrc || !txt(k) ? /*#__PURE__*/React.createElement(TsInsufficient, null) : hit(k) ? withheld(hit(k)[0]) : /*#__PURE__*/React.createElement("p", {
    style: tsP
  }, txt(k));
  const bridgeHit = hit("bridge", "goal", "human");
  const allText = ["parallel", "difference", "bridge", "goal", "human"].map(k => Object.values(cur(k) || {}).join(" ")).join(" ");
  const toneHit = allText.match(tsToneRe);
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, expert && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-source)",
      color: "var(--text-muted)"
    }
  }, "Religion expert mode. Edits go to the private log. No name is shown on this page."), expert && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      flexWrap: "wrap",
      padding: 14,
      borderRadius: "var(--radius-md)",
      border: `1px ${rv ? "solid" : "dashed"} var(--border-default)`,
      background: rv ? "transparent" : "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: rv ? "user-check" : "user-round-search",
    size: 20,
    color: rv ? "var(--ok-400)" : "var(--warn-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "1 1 220px",
      font: "var(--type-body)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, rv ? /*#__PURE__*/React.createElement(React.Fragment, null, "Checked by a religion expert \xB7 ", rv.at) : has ? "Drafted by the agent. A religion expert hasn’t checked this yet." : "Not written yet. A religion expert can write each block."), expert && !rv && has && /*#__PURE__*/React.createElement(TsButton, {
    size: "sm",
    variant: "primary",
    icon: "check",
    onClick: markReviewed
  }, "Mark checked")), /*#__PURE__*/React.createElement(FaithBlock, _extends({
    n: "01",
    title: "Parallel",
    note: "An analogy, not the same doctrine"
  }, P("parallel")), body("parallel")), /*#__PURE__*/React.createElement(FaithBlock, _extends({
    n: "02",
    title: "Difference",
    note: "No ranking \xB7 no winner \xB7 no strawman"
  }, P("difference")), body("difference")), /*#__PURE__*/React.createElement(FaithBlock, _extends({
    n: "03",
    title: "Christian bridge",
    note: "Two gaps only",
    tone: "bridge"
  }, P("bridge"), {
    expert: false
  }), bridgeHit ? withheld(bridgeHit[0]) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(GapUnit, {
    k: "goal",
    v: cur("goal"),
    expert: expert,
    rec: rec("goal"),
    onAct: open
  }), /*#__PURE__*/React.createElement(GapUnit, {
    k: "human",
    v: cur("human"),
    expert: expert,
    rec: rec("human"),
    onAct: open
  }))), /*#__PURE__*/React.createElement(FaithBlock, _extends({
    n: "04",
    title: "Linguistic root",
    note: "Same word is not the same concept",
    dashed: !txt("root")
  }, P("root")), /*#__PURE__*/React.createElement("p", {
    style: tsP
  }, txt("root") || tsNone)), /*#__PURE__*/React.createElement(FaithBlock, _extends({
    n: "05",
    title: "Historical timeline",
    note: "",
    dashed: !txt("timeline")
  }, P("timeline")), /*#__PURE__*/React.createElement("p", {
    style: tsP
  }, txt("timeline") || tsNone)), /*#__PURE__*/React.createElement(TsVerses, {
    term: e.term
  }), toast && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 84,
      transform: "translateX(-50%)",
      zIndex: 120,
      animation: "ca-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(TsToast, {
    tone: "ok",
    onClose: () => setToast(null)
  }, toast)), /*#__PURE__*/React.createElement(TsDialog, {
    open: !!dlg,
    width: 600,
    title: dlg ? `${dlg.kind === "Report" ? "Tell a person" : dlg.kind} · ${CF.title(dlg.k)}` : "",
    onClose: () => setDlg(null),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TsButton, {
      variant: "ghost",
      onClick: () => setDlg(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(TsButton, {
      variant: "primary",
      onClick: save,
      disabled: !canSave
    }, single ? "Send" : "Save"))
  }, dlg && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, blocked && /*#__PURE__*/React.createElement(TsState, {
    kind: "unavailable",
    compact: true,
    title: "Blocked",
    message: `This looks like an instruction to the system, not content. Nothing was saved. Request id: ${blocked}`
  }), single ? /*#__PURE__*/React.createElement(TsArea, {
    label: dlg.kind === "Report" ? "What looks wrong?" : "Your suggestion",
    rows: 5,
    value: draft.text || "",
    onChange: ev => setDraft({
      text: ev.target.value
    }),
    hint: hints[dlg.kind]
  }) : CF.fields(dlg.k).map(([fk, lab], i, arr) => /*#__PURE__*/React.createElement(TsArea, {
    key: fk,
    label: lab,
    rows: fk === "gap" ? 2 : arr.length > 1 ? 4 : 7,
    value: draft[fk] || "",
    onChange: ev => setDraft(d => ({
      ...d,
      [fk]: ev.target.value
    })),
    hint: i === arr.length - 1 ? hints[dlg.kind] : undefined
  })))));
}
function TsSplit({
  e,
  onHide
}) {
  const used = e && e.used || [];
  const key = "ca_split_" + (e && e.term);
  const rm = document.documentElement.hasAttribute("data-reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [st, setSt] = React.useState(() => {
    if (used.length < 2 || rm) return 4;
    try {
      return localStorage.getItem(key) ? 4 : 0;
    } catch (x) {
      return 4;
    }
  });
  React.useEffect(() => {
    if (st === 4) return;
    try {
      localStorage.setItem(key, "1");
    } catch (x) {}
    onHide(true);
    const T = [setTimeout(() => setSt(1), 500), setTimeout(() => setSt(2), 1900), setTimeout(() => {
      setSt(3);
      onHide(false);
    }, 2700), setTimeout(() => setSt(4), 3200)];
    return () => T.forEach(clearTimeout);
  }, []);
  if (st === 4) return null;
  const tr = {
    Hindu: "hindu",
    Buddhist: "buddhist",
    Christian: "christian"
  };
  const off = used.length === 2 ? [-0.5, 0.5] : [-1, 0, 1];
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none"
    }
  }, used.map((u, i) => /*#__PURE__*/React.createElement("span", {
    key: u,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      whiteSpace: "nowrap",
      color: `var(--trad-${tr[u]})`,
      opacity: st === 3 ? 0 : 1,
      transform: st === 1 ? `translate(${off[i] * 0.1}em, ${off[i] * 0.42}em)` : "none",
      transition: "transform 900ms cubic-bezier(.2,.8,.2,1), opacity 500ms var(--ease-out)"
    }
  }, e.term)));
}
function TermScreen({
  term,
  back,
  initialExpert
}) {
  const [splitHide, setSplitHide] = React.useState(false);
  const e = window.CA_DATA.lexicon.find(x => x.term === term);
  const expert = !!initialExpert;
  const lk = window.CAGuard.lockdown();
  const [faith, setFaith] = React.useState(expert && !lk);
  const fromHw = React.useRef(window.CAHwFrom === term);
  window.CAHwFrom = null;
  const [ready, setReady] = React.useState(fromHw.current);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (fromHw.current && tick === 0) return;
    setReady(false);
    const id = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(id);
  }, [tick]);
  const offline = window.CAGuard.offline();
  const dev = (() => {
    try {
      return JSON.parse(localStorage.getItem("ca_on_device")) || ["karma"];
    } catch (x) {
      return ["karma"];
    }
  })();
  React.useEffect(() => {
    if (!offline && e && !dev.includes(e.term)) localStorage.setItem("ca_on_device", JSON.stringify([...dev, e.term]));
  }, [term]);
  const onDevice = offline && e && dev.includes(e.term);
  React.useEffect(() => {
    const k = ev => {
      if (ev.key === "Escape" && !document.querySelector('[role="dialog"]')) window.CAGuard.plain();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const hold = React.useRef(0);
  const startHold = ev => {
    if (lk || ev.button > 0) return;
    clearTimeout(hold.current);
    hold.current = setTimeout(() => {
      window.CAHaptic && window.CAHaptic("medium");
      setFaith(true);
      window.scrollTo(0, 0);
    }, 650);
  };
  const endHold = () => clearTimeout(hold.current);
  const topBtn = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 44,
    padding: 0,
    background: "none",
    border: 0,
    color: "var(--text-muted)",
    font: "600 16px/1 var(--font-body)",
    cursor: "pointer"
  };
  const close = /*#__PURE__*/React.createElement("button", {
    onClick: () => window.CAGuard.plain(),
    "aria-label": "Close",
    style: {
      width: 44,
      height: 44,
      display: "grid",
      placeItems: "center",
      background: "none",
      border: 0,
      borderRadius: 99,
      color: "var(--text-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "x",
    size: 20
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-read)",
      width: "100%",
      margin: "0 auto",
      padding: "12px var(--gutter-phone) 24px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, faith && !expert ? /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setFaith(false);
      window.scrollTo(0, 0);
    },
    style: topBtn
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "arrow-left",
    size: 18
  }), "Back") : /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: topBtn
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "arrow-left",
    size: 18
  }), "Search"), close), offline && !onDevice ? /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      ...tsBox,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "700 18px/1.3 var(--font-body)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, "This needs a connection"), /*#__PURE__*/React.createElement(TsButton, {
    variant: "primary",
    icon: "rotate-cw",
    onClick: () => setTick(n => n + 1)
  }, "Retry")) : !ready ? /*#__PURE__*/React.createElement(TsState, {
    kind: "loading",
    compact: true
  }) : !e ? /*#__PURE__*/React.createElement(window.WordEmpty, {
    word: term,
    line: "Not in the dictionary yet."
  }) : faith ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-headword)",
      fontSize: "clamp(44px,12vw,60px)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      margin: "0 0 4px",
      overflowWrap: "anywhere"
    }
  }, e.term), /*#__PURE__*/React.createElement(FaithEntry, {
    e: e,
    expert: expert
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, onDevice && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-start",
      display: "inline-flex",
      gap: 6,
      alignItems: "center",
      height: 30,
      padding: "0 12px",
      borderRadius: 999,
      border: "1px solid var(--border-default)",
      font: "600 13px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(TsIcon, {
    name: "hard-drive",
    size: 16
  }), "On this device."), /*#__PURE__*/React.createElement("section", {
    style: {
      ...tsBox,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("h1", {
    onPointerDown: startHold,
    onPointerUp: endHold,
    onPointerLeave: endHold,
    onPointerCancel: endHold,
    onContextMenu: ev => ev.preventDefault(),
    style: {
      font: "var(--type-headword)",
      fontSize: "clamp(68px,20vw,104px)",
      letterSpacing: "var(--tracking-display)",
      color: splitHide ? "transparent" : "var(--text-strong)",
      transition: "color 400ms var(--ease-out)",
      margin: 0,
      overflowWrap: "anywhere",
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      touchAction: "manipulation",
      viewTransitionName: "ca-headword",
      width: "fit-content",
      maxWidth: "100%",
      position: "relative"
    }
  }, e.term, /*#__PURE__*/React.createElement(TsSplit, {
    key: e.term,
    e: e,
    onHide: setSplitHide
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      alignItems: "baseline",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "italic 400 18px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, e.pos))), /*#__PURE__*/React.createElement(NormalEntry, {
    e: e
  }), /*#__PURE__*/React.createElement(window.CAHelped, {
    id: "word_" + e.term,
    q: "Did this help you understand it?"
  }), /*#__PURE__*/React.createElement(window.CASaveCard, {
    entry: e
  })));
}
window.TermScreen = TermScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/TermScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/public/curious.js
try { (() => {
(function () {
  var SETS = {
    mine: ["grace", "faith", "salvation", "love", "marriage"],
    friend: ["karma", "dharma", "moksha", "nirvana", "meditation"],
    online: ["karma", "nirvana", "meditation", "suffering", "compassion"]
  };
  var LABEL = {
    mine: "My faith",
    friend: "A friend’s faith",
    online: "Heard online"
  };
  window.CACurious = {
    SETS: SETS,
    LABEL: LABEL,
    get: function () {
      try {
        return JSON.parse(localStorage.getItem("ca_curious")) || [];
      } catch (e) {
        return [];
      }
    },
    set: function (a) {
      try {
        localStorage.setItem("ca_curious", JSON.stringify(a));
      } catch (e) {}
    },
    words: function () {
      var out = [];
      this.get().forEach(function (k) {
        (SETS[k] || []).forEach(function (w) {
          if (out.indexOf(w) < 0) out.push(w);
        });
      });
      return out;
    },
    first: function () {
      var w = this.words();
      return w[0] || "karma";
    }
  };
  window.CATeamNote = {
    lines: ["We built Rhema.ai because the same word can carry", "very different hopes. Take your time with each one."],
    sign: "— the Rhema.ai team"
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/curious.js", error: String((e && e.message) || e) }); }

// ui_kits/public/data.js
try { (() => {
window.CA_DATA = {
  lexicon: [{
    term: "karma",
    pos: "noun",
    def: "Action, and the moral weight that action carries forward.",
    used: ["Hindu", "Buddhist", "Christian"],
    sources: [{
      tradition: "Hindu",
      work: "Bhagavad Gita",
      reference: "3.9"
    }, {
      tradition: "Buddhist",
      work: "Dhammapada",
      reference: "1.1–1.2"
    }, {
      tradition: "Christian",
      work: "Galatians",
      reference: "6:7 (KJV)"
    }],
    faith: {
      parallel: "Both Hindu and Buddhist teaching treat action as morally weighted: what you do shapes what follows. Christians also say a person reaps what they sow. That resemblance is an analogy, not one doctrine.",
      difference: "They do not share the same account of what liberates a person. Hindu traditions speak of moksha, Buddhist teaching of nirvana, and Christian teaching of grace received through Christ. None of these is ranked here.",
      bridge: "A Christian can read karma as a word for consequence and moral seriousness, while holding that grace is a gift rather than a balance of deeds. The terms can sit side by side without being treated as the same idea.",
      sources: [{
        tradition: "Hindu",
        work: "Bhagavad Gita",
        reference: "4.17"
      }, {
        tradition: "Buddhist",
        work: "Anguttara Nikaya",
        reference: "6.63"
      }, {
        tradition: "Christian",
        work: "Ephesians",
        reference: "2:8–9 (KJV)"
      }]
    }
  }, {
    term: "dharma",
    pos: "noun",
    def: "Duty, order, or teaching, depending on the tradition using the word.",
    used: ["Hindu", "Buddhist"],
    sources: [{
      tradition: "Hindu",
      work: "Bhagavad Gita",
      reference: "18.47"
    }, {
      tradition: "Buddhist",
      work: "Dhammapada",
      reference: "20.1"
    }],
    faith: {
      parallel: "Each use points to a right order for living. Christians speak of a calling and of God’s law. The resemblance is an analogy.",
      difference: "In Hindu use dharma is often one’s duty; in Buddhist use it is the Buddha’s teaching. Christian calling rests on a relationship with God, not a cosmic order.",
      bridge: "A Christian can hear dharma as a serious word about how to live, without equating it with the law of Moses or the gospel.",
      sources: [{
        tradition: "Hindu",
        work: "Manusmriti",
        reference: "1.108"
      }, {
        tradition: "Christian",
        work: "Micah",
        reference: "6:8 (KJV)"
      }]
    }
  }, {
    term: "moksha",
    pos: "noun",
    def: "Release from saṃsāra, the cycle of rebirth, as the Upaniṣads teach it.",
    used: ["Hindu"],
    sources: [{
      tradition: "Hindu",
      work: "Mundaka Upanishad",
      reference: "3.2.8"
    }]
  }, {
    term: "nirvana",
    pos: "noun",
    def: "In Theravāda teaching, the ending of craving, suffering and rebirth.",
    used: ["Buddhist"],
    sources: [{
      tradition: "Buddhist",
      work: "Dhammapada",
      reference: "15.203"
    }]
  }, {
    term: "grace",
    pos: "noun",
    def: "Favor that is given, not earned.",
    used: ["Christian", "Hindu"],
    sources: [{
      tradition: "Christian",
      work: "Ephesians",
      reference: "2:8 (KJV)"
    }],
    faith: {
      parallel: "Some Hindu devotional traditions speak of the grace (prasada) of God. Christians speak of grace in Christ. The resemblance is an analogy.",
      difference: "The accounts of who gives grace, and why, are not the same. No tradition is ranked above another here.",
      bridge: "For a Christian, grace is central. It can be explained to a neighbour by pointing to their own word for an unearned gift, while saying clearly that the two are not identical.",
      sources: [{
        tradition: "Hindu",
        work: "Bhagavad Gita",
        reference: "18.56"
      }, {
        tradition: "Christian",
        work: "Titus",
        reference: "2:11 (KJV)"
      }]
    }
  }, {
    term: "faith",
    pos: "noun",
    def: "Trust placed in someone or something beyond proof.",
    used: ["Christian", "Hindu", "Buddhist"],
    sources: [{
      tradition: "Christian",
      work: "Hebrews",
      reference: "11:1 (KJV)"
    }]
  }, {
    term: "meditation",
    pos: "noun",
    def: "A practice of sustained attention.",
    used: ["Hindu", "Buddhist", "Christian"],
    sources: [{
      tradition: "Buddhist",
      work: "Satipatthana Sutta",
      reference: "MN 10"
    }, {
      tradition: "Christian",
      work: "Psalms",
      reference: "1:2 (KJV)"
    }]
  }, {
    term: "suffering",
    pos: "noun",
    def: "Pain, loss, or dissatisfaction a person undergoes.",
    used: ["Buddhist", "Christian", "Hindu"],
    sources: [{
      tradition: "Buddhist",
      work: "Dhammacakkappavattana Sutta",
      reference: "SN 56.11"
    }]
  }, {
    term: "compassion",
    pos: "noun",
    def: "Feeling with another’s suffering and wanting to relieve it.",
    used: ["Buddhist", "Christian", "Hindu"],
    sources: []
  }, {
    term: "love",
    pos: "noun",
    def: "Care that wills the good of another.",
    used: ["Christian", "Hindu", "Buddhist"],
    sources: [{
      tradition: "Christian",
      work: "1 Corinthians",
      reference: "13:4 (KJV)"
    }]
  }, {
    term: "marriage",
    pos: "noun",
    def: "A lasting, publicly recognised union of two people.",
    used: ["Christian", "Hindu", "Buddhist"],
    sources: []
  }, {
    term: "salvation",
    pos: "noun",
    def: "Being rescued or made whole.",
    used: ["Christian"],
    sources: [{
      tradition: "Christian",
      work: "Romans",
      reference: "10:9 (KJV)"
    }]
  }],
  months: [{
    id: "2026-08",
    label: "Aug 2026",
    question: "What does love mean to you?",
    term: "love",
    published: true,
    answers: 184,
    nodes: [["family", 42], ["duty", 31], ["work", 24], ["prayer", 20], ["community", 18], ["health", 12], ["children", 15], ["honesty", 10], ["marriage", 11]],
    links: [["marriage", "family", 9, "s"], ["marriage", "duty", 5, "s"], ["family", "duty", 14, "s"], ["family", "children", 12, "s"], ["duty", "work", 9, "s"], ["prayer", "community", 8, "s"], ["family", "community", 7, "s"], ["work", "health", 5, "t"], ["duty", "honesty", 6, "s"], ["work", "family", 6, "t"], ["prayer", "honesty", 4, "s"]]
  }, {
    id: "2026-09",
    label: "Sep 2026",
    question: "What does salvation mean to you?",
    term: "salvation",
    published: true,
    answers: 212,
    nodes: [["family", 46], ["duty", 28], ["suffering", 26, 1], ["hope", 30, 1], ["work", 20], ["prayer", 22], ["community", 19], ["children", 13], ["forgiveness", 11, 1], ["health", 9], ["faith", 17, 1], ["salvation", 12, 1], ["exile", 2, 1]],
    links: [["faith", "hope", 10, "s"], ["salvation", "faith", 8, "s"], ["salvation", "forgiveness", 6, "s"], ["family", "duty", 13, "s"], ["suffering", "hope", 15, "s"], ["hope", "prayer", 11, "s"], ["family", "children", 10, "s"], ["suffering", "work", 7, "t"], ["duty", "work", 8, "s"], ["prayer", "community", 9, "s"], ["forgiveness", "family", 6, "s"], ["suffering", "family", 8, "s"], ["hope", "duty", 5, "t"], ["work", "health", 4, "t"], ["forgiveness", "hope", 5, "s"]]
  }, {
    id: "2026-10",
    label: "Oct 2026",
    question: "What does faith mean to you?",
    term: "faith",
    published: false,
    ends: "2026-10-31",
    answers: 97,
    nodes: [],
    links: []
  }],
  status: [["API", "up"], ["Database", "up"], ["Cache", "up"], ["Graph database", "up"], ["Model gateway", "down"]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/data.js", error: String((e && e.message) || e) }); }

// ui_kits/public/faithData.js
try { (() => {
(() => {
  const L = window.CA_DATA.lexicon;
  const GAP = {
    goal: "Nirvana or moksha is the loss of the person. Salvation keeps the person with God.",
    human: "Where the human problem is ignorance, a teacher is the answer. Christians say a teacher is not enough: sin needs a Savior."
  };
  const gapGoal = (left, right) => ({
    key: "goal",
    title: "Ultimate goal",
    left: {
      label: "Nirvana / moksha",
      text: left
    },
    right: {
      label: "Christian salvation",
      text: right
    },
    gap: GAP.goal
  });
  const gapHuman = (left, right) => ({
    key: "human",
    title: "Problem of humanity",
    left: {
      label: "Ignorance",
      text: left
    },
    right: {
      label: "Sin",
      text: right
    },
    gap: GAP.human
  });
  const entries = {
    salvation: {
      def: "Being rescued or made whole.",
      used: ["Christian", "Hindu", "Buddhist"],
      sources: [{
        tradition: "Christian",
        work: "Romans",
        reference: "10:9 (KJV)"
      }],
      faith: {
        parallel: "All three traditions say the human condition needs more than ordinary life can give, and each names a final release or rescue: moksha, nirvana, salvation. Each asks for a whole-life response, not a single act. That resemblance is an analogy, not one doctrine.",
        difference: "They do not agree on what a person is rescued from, what they are rescued into, or who does the rescuing. Hindu schools differ: Advaita Vedānta teaches non-duality with Brahman, while Viśiṣṭādvaita keeps the self distinct in devotion to God. Theravāda teaching speaks of no lasting self; Christian teaching speaks of a personal God who saves. None of these is ranked here.",
        bridge: "When a Hindu or Buddhist neighbour hears a Christian say “salvation,” it is natural to hear their own word for final release. The words sit near each other, and a Christian can honour that nearness. But the two words point to different ends and start from different diagnoses. A Christian can explain salvation through two gaps, without saying the other traditions are the same and without arguing them down.",
        gaps: [gapGoal("The goal is release. In Advaita Vedānta the self (ātman) is realised as one with Brahman, like a river that loses its name in the sea. In Theravāda teaching craving ends, the sense of a lasting self is let go (anattā: there is none to keep), and rebirth in saṃsāra stops. Neither is a person living on with God.", "The goal is relationship. A unique person is raised, known by name, and lives with God forever. The self is not dissolved into God; it is healed and completed, and it stays itself. Eternal life is knowing God, and being known."), gapHuman("In Advaita Vedānta and in Theravāda teaching, the root problem is not seeing reality as it is (avidyā). The answer is a teacher who shows the way, a law or path of right living, or an enlightenment that clears ignorance away. The person is lost, and needs light.", "The root problem is a broken relationship with God and a spiritual nature that is dead, not merely uninformed. A teacher or a law can show what is right but cannot make a dead person live. It needs a Savior who brings a person from death to life, as a gift.")],
        close: "So a Christian can say: “Your tradition and mine both know that something is deeply wrong and that we need release. I believe the answer is not that I disappear into oneness, and not that I learn enough to be free, but that God gives me new life and keeps me as myself with him forever.”",
        sources: [{
          tradition: "Hindu",
          work: "Mundaka Upanishad",
          reference: "3.2.8"
        }, {
          tradition: "Buddhist",
          work: "Dhammapada",
          reference: "15.203"
        }, {
          tradition: "Christian",
          work: "John",
          reference: "17:3 (KJV)"
        }, {
          tradition: "Christian",
          work: "Ephesians",
          reference: "2:1–5 (KJV)"
        }]
      }
    },
    marriage: {
      pos: "noun",
      def: "A lifelong union between two people, publicly made.",
      used: ["Hindu", "Buddhist", "Christian"],
      sources: [{
        tradition: "Hindu",
        work: "Rig Veda",
        reference: "10.85"
      }, {
        tradition: "Buddhist",
        work: "Sigalovada Sutta",
        reference: "DN 31"
      }, {
        tradition: "Christian",
        work: "Genesis",
        reference: "2:24 (KJV)"
      }],
      faith: {
        parallel: "Each tradition treats marriage as a serious bond with duties on both sides: faithfulness, care for the household, and honour for each other. That resemblance is an analogy, not one doctrine.",
        difference: "Hindu marriage (vivaha) is a sacrament within dharma, sometimes spoken of across lifetimes. Theravāda texts such as the Sigālovāda Sutta treat marriage mainly as a householder’s ethical duty, not a religious rite. Christian marriage is a covenant that pictures Christ and the church. None is ranked here.",
        bridge: "A Christian can recognise the seriousness a Hindu or Buddhist neighbour gives to marriage and learn from it. The difference shows most clearly when you ask where marriage is heading. If the final goal is release from individual identity, marriage belongs to this life and to the path, and it falls away at the end. In Christian hope, persons are not dissolved, so love between persons is a picture of something that lasts.",
        gaps: [gapGoal("Marriage is a duty and a discipline within this life. In Advaita Vedānta, final release leaves the separate self behind in Brahman; in Theravāda teaching, nirvana ends rebirth. In neither does the bond continue as a bond between two persons.", "Marriage is a covenant between two persons that points to a greater one: Christ and his people. Earthly marriage ends at death, but the persons it joined remain, and the love it pictured, between God and his people, is forever.")],
        close: "The bridge is to say: “We both take marriage seriously. For me it is a small picture of a relationship with God that never ends, because in the end I am not lost; I am kept.”",
        sources: [{
          tradition: "Hindu",
          work: "Rig Veda",
          reference: "10.85"
        }, {
          tradition: "Buddhist",
          work: "Sigalovada Sutta",
          reference: "DN 31"
        }, {
          tradition: "Christian",
          work: "Ephesians",
          reference: "5:31–32 (KJV)"
        }]
      }
    },
    love: {
      pos: "noun",
      def: "Deep care and commitment toward another.",
      used: ["Hindu", "Buddhist", "Christian"],
      sources: [{
        tradition: "Hindu",
        work: "Bhagavad Gita",
        reference: "12.13"
      }, {
        tradition: "Buddhist",
        work: "Karaniya Metta Sutta",
        reference: "Sn 1.8"
      }, {
        tradition: "Christian",
        work: "1 Corinthians",
        reference: "13:4–7 (KJV)"
      }],
      faith: {
        parallel: "Hindu devotion (bhakti), Buddhist loving-kindness (metta) and compassion (karuna), and Christian love (agape) all ask a person to wish good for others beyond their own circle. That resemblance is an analogy, not one doctrine.",
        difference: "Bhakti is loving devotion to God; metta is a cultivated goodwill toward all beings, often as a meditative practice; agape is love that God first gives and that a Christian then gives to others. No tradition is ranked here.",
        bridge: "Many neighbours will recognise Christian love in their own words, and a Christian can gladly say so. The gap appears when you ask what love is for in the end. If the final goal is oneness, love is a way of dissolving the boundary between self and other. In Christian teaching, love needs two persons, and it lasts because God himself is love among persons.",
        gaps: [gapGoal("In Advaita Vedānta, love and devotion can wear down the sense of a separate self until lover and loved are no longer two. In Theravāda teaching, metta is cultivated on the path, and at nirvana there is no lasting self to go on loving.", "Love is between persons, and it never ends. God is love, and he keeps each person as a person so that love can go on forever. Distinction is not the problem to be removed; it is what makes love possible.")],
        close: "The bridge is to say: “Your word for love and mine are close. I believe love is forever because God keeps us, you and me, as ourselves.”",
        sources: [{
          tradition: "Hindu",
          work: "Bhagavad Gita",
          reference: "12.13–14"
        }, {
          tradition: "Buddhist",
          work: "Karaniya Metta Sutta",
          reference: "Sn 1.8"
        }, {
          tradition: "Christian",
          work: "1 John",
          reference: "4:8 (KJV)"
        }]
      }
    },
    faith: {
      pos: "noun",
      def: "Trust placed in someone or something beyond proof.",
      used: ["Christian", "Hindu", "Buddhist"],
      sources: [{
        tradition: "Christian",
        work: "Hebrews",
        reference: "11:1 (KJV)"
      }],
      faith: {
        parallel: "Hindu shraddha and Buddhist saddha both name a confident trust that starts a person on a path; Christian faith is trust too. That resemblance is an analogy, not one doctrine.",
        difference: "In the Bhagavad Gītā, śraddhā shapes the path a person walks; in the Kālāma Sutta (Theravāda), trust is tested and finally replaced by one’s own insight. In Christian use, faith is trust in a person, Christ, rather than confidence in a method. None is ranked here.",
        bridge: "A Christian can agree that faith begins with trust and leads to a changed life. The gap is about what faith is trusting for. That depends on what the human problem is.",
        gaps: [gapHuman("In Advaita Vedānta the problem is ignorance (avidyā) of the true self; in Theravāda it is ignorance and craving. Faith is trust in a teacher, a law, or a path until you see for yourself. Faith is a starting point; in the end, insight replaces it.", "If the problem is sin, a broken relationship and a dead spiritual nature, then more insight is not enough. Faith is trusting a Savior to do what I cannot: bring me from death to life. Faith is not replaced by seeing; it is the relationship itself.")],
        close: "The bridge is to say: “We both begin by trusting. I trust not a method that frees me, but a person who gives me life.”",
        sources: [{
          tradition: "Hindu",
          work: "Bhagavad Gita",
          reference: "17.3"
        }, {
          tradition: "Buddhist",
          work: "Kalama Sutta",
          reference: "AN 3.65"
        }, {
          tradition: "Christian",
          work: "Ephesians",
          reference: "2:1–5, 8 (KJV)"
        }]
      }
    }
  };
  for (const [term, e] of Object.entries(entries)) {
    const i = L.findIndex(x => x.term === term);
    const full = {
      term,
      pos: "noun",
      ...e
    };
    if (i >= 0) L[i] = {
      ...L[i],
      ...full
    };else L.push(full);
  }
  const KEY = "ca_expert_edits";
  const seed = {
    _review: {
      karma: {
        by: "Dr. Miriam Das",
        at: "Sep 20"
      },
      salvation: {
        by: "Dr. Miriam Das",
        at: "Sep 22"
      },
      marriage: {
        by: "Rev. Tenzin Norbu",
        at: "Sep 23"
      },
      love: {
        by: "Dr. Miriam Das",
        at: "Sep 24"
      },
      faith: {
        by: "Rev. Tenzin Norbu",
        at: "Sep 24"
      }
    },
    love: {
      parallel: {
        log: [{
          kind: "Change",
          who: "Dr. Miriam Das",
          at: "Sep 24",
          old: "Bhakti, metta and agape all ask a person to wish good for others.",
          new: null
        }],
        sugg: []
      }
    },
    salvation: {
      difference: {
        log: [],
        sugg: [{
          who: "Rev. Tenzin Norbu",
          at: "Sep 25",
          text: "Add that Pure Land Buddhism speaks of reliance on Amida’s vow, which is closer to grace than other schools."
        }]
      }
    }
  };
  const F = {
    parallel: [["text", "Parallel"]],
    difference: [["text", "Difference"]],
    bridge: [["text", "Bridge"]],
    goal: [["left", "Nirvana / moksha"], ["right", "Christian salvation"], ["gap", "The gap"]],
    human: [["left", "Ignorance"], ["right", "Sin"], ["gap", "The gap"]],
    root: [["text", "Linguistic root"]],
    timeline: [["text", "Historical timeline"]]
  };
  const T = {
    parallel: "Parallel",
    difference: "Difference",
    bridge: "Christian bridge",
    goal: "Gap 1 · Ultimate goal",
    human: "Gap 2 · Problem of humanity",
    root: "Linguistic root",
    timeline: "Historical timeline"
  };
  const norm = (k, v) => v == null ? null : typeof v === "string" ? {
    [F[k][0][0]]: v
  } : v;
  window.CAFaith = {
    fields: k => F[k],
    title: k => T[k],
    norm,
    defaults(e, k) {
      const f = e.faith || {};
      if (k === "goal" || k === "human") {
        const g = (f.gaps || []).find(x => x.key === k);
        return {
          left: g ? g.left.text : null,
          right: g ? g.right.text : null,
          gap: g ? g.gap : GAP[k]
        };
      }
      if (k === "bridge") return {
        text: f.bridge || null,
        close: f.close || null
      };
      return {
        text: f[k] || null
      };
    },
    current(store, e, k) {
      const r = (store[e.term] || {})[k];
      const d = this.defaults(e, k);
      if (r && r.val) return {
        ...d,
        ...r.val
      };
      if (r && typeof r.text === "string") return {
        ...d,
        [F[k][0][0]]: r.text
      };
      return d;
    },
    empty(v) {
      return !v || Object.values(v).every(x => !x);
    },
    hasContent(store, e) {
      return ["parallel", "difference", "bridge", "goal", "human"].some(k => !this.empty(this.current(store, e, k)));
    }
  };
  window.CAExpert = {
    expert: "Dr. Miriam Das",
    get() {
      try {
        const v = JSON.parse(localStorage.getItem(KEY));
        if (v) {
          if (!v._review) v._review = seed._review;
          return v;
        }
      } catch (e) {}
      localStorage.setItem(KEY, JSON.stringify(seed));
      return JSON.parse(JSON.stringify(seed));
    },
    set(v) {
      localStorage.setItem(KEY, JSON.stringify(v));
      window.dispatchEvent(new Event("ca-expert"));
    },
    use() {
      const [v, setV] = React.useState(window.CAExpert.get());
      React.useEffect(() => {
        const f = () => setV(window.CAExpert.get());
        window.addEventListener("ca-expert", f);
        window.addEventListener("storage", f);
        return () => {
          window.removeEventListener("ca-expert", f);
          window.removeEventListener("storage", f);
        };
      }, []);
      return [v, window.CAExpert.set];
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/faithData.js", error: String((e && e.message) || e) }); }

// ui_kits/public/verses.js
try { (() => {
window.CA_VERSES = {
  salvation: [{
    ref: "Romans 10:9 (KJV)",
    text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
    line: "Salvation is received by trusting a person, not by reaching a state."
  }, {
    ref: "John 17:3 (KJV)",
    text: "And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.",
    line: "The goal is knowing God, so the one who knows stays a person."
  }, {
    ref: "Ephesians 2:1 (KJV)",
    text: "And you hath he quickened, who were dead in trespasses and sins;",
    line: "The problem is named as death, so the answer is new life, not more light."
  }],
  marriage: [{
    ref: "Genesis 2:24 (KJV)",
    text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
    line: "Marriage is a new household made by two people, publicly."
  }, {
    ref: "Ephesians 5:31 (KJV)",
    text: "For this cause shall a man leave his father and mother, and shall be joined unto his wife, and they two shall be one flesh.",
    line: "Paul repeats Genesis and says it points to Christ and the church."
  }],
  love: [{
    ref: "1 Corinthians 13:4 (KJV)",
    text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,",
    line: "Love is described by how it acts toward another person."
  }, {
    ref: "1 John 4:8 (KJV)",
    text: "He that loveth not knoweth not God; for God is love.",
    line: "Love starts with who God is, not with a practice."
  }],
  faith: [{
    ref: "Hebrews 11:1 (KJV)",
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    line: "Faith here is trust that stands on what is promised."
  }, {
    ref: "Ephesians 2:8 (KJV)",
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:",
    line: "Faith receives a gift; it is not the price paid for it."
  }],
  grace: [{
    ref: "Ephesians 2:8 (KJV)",
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:",
    line: "Grace is named as a gift, which is the heart of the word."
  }, {
    ref: "Titus 2:11 (KJV)",
    text: "For the grace of God that bringeth salvation hath appeared to all men,",
    line: "Grace is offered to everyone, not earned by some."
  }],
  karma: [{
    ref: "Galatians 6:7 (KJV)",
    text: "Be not deceived; God is not mocked: for whatsoever a man soweth, that shall he also reap.",
    line: "Christians also say actions carry weight, which is where the words meet."
  }, {
    ref: "Ephesians 2:8 (KJV)",
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:",
    line: "Rescue comes as a gift, which is where the words part."
  }],
  dharma: [{
    ref: "Micah 6:8 (KJV)",
    text: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    line: "A right way to live, given by a God who walks with you."
  }],
  meditation: [{
    ref: "Psalm 1:2 (KJV)",
    text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night.",
    line: "Christian meditation is attention given to God’s words."
  }],
  suffering: [{
    ref: "Romans 8:18 (KJV)",
    text: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.",
    line: "Suffering is real, and it is not the last word."
  }, {
    ref: "Matthew 11:28 (KJV)",
    text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    line: "Rest is offered by a person to the one who is tired."
  }],
  compassion: [{
    ref: "Colossians 3:12 (KJV)",
    text: "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;",
    line: "Compassion is worn like clothing by people who are loved first."
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/public/verses.js", error: String((e && e.message) || e) }); }

// ui_kits/rhythm.js
try { (() => {
// Monthly rhythm: next-question date, calendar file, the reader's own idea (this device only), release-day flag.
(function () {
  var D = function () {
    return window.CA_DATA;
  };
  var cur = function () {
    var m = D().months;
    return m[m.length - 1];
  };
  var latest = function () {
    var p = D().months.filter(function (m) {
      return m.published;
    });
    var x = null;
    try {
      x = JSON.parse(localStorage.getItem("ca_map_published"));
    } catch (e) {}
    return x || p[p.length - 1];
  };
  var nextOpen = function () {
    var c = cur();
    var e = c.ends ? new Date(c.ends + "T12:00:00") : new Date();
    return new Date(e.getFullYear(), e.getMonth() + 1, 1, 9, 0, 0);
  };
  var fmt = function (d) {
    return d.toLocaleDateString([], {
      month: "short",
      day: "numeric"
    });
  };
  var ics = function () {
    var d = nextOpen(),
      p = function (n) {
        return String(n).padStart(2, "0");
      };
    var day = d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
    var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Rhema.ai//monthly//EN", "BEGIN:VEVENT", "UID:churchai-" + day + "@Rhema.ai", "DTSTART;VALUE=DATE:" + day, "SUMMARY:Rhema.ai — a new question", "DESCRIPTION:One question this month. No account, no name.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], {
      type: "text/calendar"
    }));
    a.download = "rhema-ai-next-question.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  var ideas = function () {
    var s = {};
    D().months.forEach(function (m) {
      (m.nodes || []).forEach(function (n) {
        s[n[0]] = 1;
      });
    });
    return Object.keys(s);
  };
  var guessIdea = function (text) {
    var t = " " + String(text).toLowerCase() + " ";
    var hit = ideas().filter(function (k) {
      return new RegExp("\\b" + k + "\\b").test(t);
    });
    return hit.sort(function (a, b) {
      return t.indexOf(a) - t.indexOf(b);
    })[0] || null;
  };
  var setMine = function (monthId, idea) {
    try {
      if (idea) localStorage.setItem("ca_my_idea_" + monthId, idea);else localStorage.removeItem("ca_my_idea_" + monthId);
    } catch (e) {}
  };
  var mine = function (monthId) {
    try {
      return localStorage.getItem("ca_my_idea_" + monthId);
    } catch (e) {
      return null;
    }
  };
  var isRelease = function () {
    var l = latest();
    try {
      return !!l && localStorage.getItem("ca_seen_release") !== l.id;
    } catch (e) {
      return false;
    }
  };
  var seeRelease = function () {
    var l = latest();
    try {
      l && localStorage.setItem("ca_seen_release", l.id);
    } catch (e) {}
  };
  var month = function (m) {
    return (m.label || "").split(" ")[0];
  };
  window.CARhythm = {
    cur: cur,
    latest: latest,
    nextOpen: nextOpen,
    nextLabel: function () {
      return fmt(nextOpen());
    },
    ics: ics,
    guessIdea: guessIdea,
    setMine: setMine,
    mine: mine,
    isRelease: isRelease,
    seeRelease: seeRelease,
    month: month
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/rhythm.js", error: String((e && e.message) || e) }); }

// ui_kits/screens.js
try { (() => {
window.CA_SCREENS = (() => {
  const P = "public/index.html#",
    Q = "pipeline/index.html#";
  return [["Landing", "landing/index.html"], ["Search", P + "r=search"], ["Guest search", P + "r=search&guest=1"], ["Word karma", P + "r=term&t=karma"], ["Word missing", P + "r=term&t=zzzz"], ["Monthly", P + "r=month"], ["Monthly closed", P + "r=month&closed=1"], ["Map", P + "r=graph"], ["Onboarding 1", P + "r=intro&step=1"], ["Onboarding 2", P + "r=intro&step=2"], ["Onboarding 3", P + "r=intro&step=3"], ["Onboarding 4", P + "r=intro&step=4"], ["Welcome", P + "r=welcome"], ["Sign in", P + "r=signin"], ["Settings", P + "r=settings&as=member"], ["States", P + "r=states"], ["Admin accounts", P + "r=admin&tab=accounts&as=admin"], ["Admin map draft", P + "r=admin&tab=map&as=admin"], ["Admin draft map", P + "r=admin&tab=draftmap&as=admin"], ["Pastor home", Q + "r=home&pco=on"], ["Check-in", Q + "r=checkin"], ["Result steady", Q + "r=result&ck=steady"], ["Result hard", Q + "r=result&ck=hard"], ["Tracks", Q + "r=tracks&pco=on"], ["Pack", Q + "r=pack&pco=on"], ["Church apps", Q + "r=integrations&pco=off"], ["Sign-in PCO", Q + "r=signin"], ["Connected church", Q + "r=church&pco=on"], ["Inside church app", Q + "r=embed"], ["Register", Q + "r=register"], ["Reviewer queue", Q + "role=reviewer&r=queue"], ["Packet", Q + "role=reviewer&r=review&id=P-0419"], ["Alerts", Q + "role=leader&r=alerts"], ["Tour", "tour/index.html"]];
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/screens.js", error: String((e && e.message) || e) }); }

// ui_kits/theme.js
try { (() => {
(() => {
  const base = new URL("../../", location.href).href;
  const PK = "ca_prefs",
    SK = "ca_session";
  const DEF = {
    theme: "dark",
    palette: "moss",
    textSize: "default",
    reduceMotion: false,
    defaultMode: "normal"
  };
  const hp = new URLSearchParams(location.hash.slice(1));
  const read = (k, d) => {
    try {
      return {
        ...d,
        ...(JSON.parse(localStorage.getItem(k)) || {})
      };
    } catch (e) {
      return {
        ...d
      };
    }
  };
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: light)") : null;
  let prefs = read(PK, DEF);
  if (hp.get("theme")) prefs = {
    ...prefs,
    ...(hp.get("theme") === "light" ? {
      theme: "light"
    } : {
      theme: "dark",
      palette: hp.get("theme")
    })
  };
  if (hp.get("rm") === "1") prefs = {
    ...prefs,
    reduceMotion: true
  };
  const link = id => {
    let l = document.getElementById(id);
    if (!l) {
      l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      document.head.appendChild(l);
    }
    return l;
  };
  function apply() {
    const light = prefs.theme === "light" || prefs.theme === "system" && mq && mq.matches;
    const pal = link("ca-palette");
    const p = !light && prefs.palette !== "moss" ? prefs.palette : null;
    if (p) pal.href = base + "palettes/" + p + ".css";else pal.removeAttribute("href");
    const lt = link("ca-light");
    if (light) lt.href = base + "palettes/light.css";else lt.removeAttribute("href");
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    document.documentElement.style.zoom = prefs.textSize === "large" ? "1.12" : "";
    document.documentElement.toggleAttribute("data-reduce-motion", !!prefs.reduceMotion);
  }
  apply();
  if (mq && mq.addEventListener) mq.addEventListener("change", apply);
  const st = document.createElement("style");
  st.textContent = "[data-reduce-motion] *,[data-reduce-motion] *::before,[data-reduce-motion] *::after{animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:1ms!important}";
  document.head.appendChild(st);
  const tame = () => {
    if (!document.documentElement.hasAttribute("data-reduce-motion") || !document.getAnimations) return;
    document.getAnimations().forEach(a => {
      try {
        const t = a.effect.getComputedTiming();
        if (t.iterations === Infinity || t.duration > 1) {
          a.effect.updateTiming({
            duration: 1,
            iterations: 1,
            delay: 0
          });
          a.finish();
        }
      } catch (e) {}
    });
  };
  const ani = Element.prototype.animate;
  Element.prototype.animate = function (k, o) {
    if (document.documentElement.hasAttribute("data-reduce-motion")) o = typeof o === "number" ? 1 : {
      ...(o || {}),
      duration: 1,
      iterations: 1,
      delay: 0
    };
    return ani.call(this, k, o);
  };
  setInterval(tame, 250);
  document.addEventListener("animationstart", tame, true);
  document.addEventListener("transitionrun", tame, true);
  const fire = () => window.dispatchEvent(new Event("ca-prefs"));
  window.CAPrefs = {
    get: () => prefs,
    set(patch) {
      prefs = {
        ...prefs,
        ...patch
      };
      localStorage.setItem(PK, JSON.stringify(prefs));
      apply();
      fire();
    }
  };
  const asHash = hp.get("as");
  let session = asHash ? {
    kind: asHash,
    name: asHash === "admin" ? "Admin" : asHash === "member" ? "Anonymous reader" : "Guest",
    email: asHash === "admin" ? "admin@rhema.ai" : "arif@example.com"
  } : (() => {
    try {
      return JSON.parse(localStorage.getItem(SK));
    } catch (e) {
      return null;
    }
  })();
  window.CASession = {
    get: () => session,
    set(s) {
      session = s;
      if (!asHash) {
        if (s) localStorage.setItem(SK, JSON.stringify(s));else localStorage.removeItem(SK);
      }
      window.dispatchEvent(new Event("ca-session"));
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/theme.js", error: String((e && e.message) || e) }); }

// ui_kits/tour/Tour.jsx
try { (() => {
// Rhema.ai product tour — one continuous composition keyed to T and CUES.
const C = {
  ink0: "#0B0F0C",
  ink1: "#121813",
  ink2: "#1A211B",
  ink3: "#243025",
  ink4: "#324034",
  muted: "#95A08B",
  faint: "#808A77",
  bone7: "#C2CCB8",
  bone8: "#E3EADB",
  bone9: "#F3F7EE",
  lamp: "#CFDA5C",
  info: "#9DB8C9",
  warn: "#E9B949",
  ok: "#7CC08A",
  trad: {
    Hindu: ["#E3875C", "rgba(227,135,92,.14)"],
    Buddhist: ["#62B39B", "rgba(98,179,155,.14)"],
    Christian: ["#86A6E0", "rgba(134,166,224,.14)"]
  }
};
const F = {
  d: '"Bricolage Grotesque", sans-serif',
  b: '"Atkinson Hyperlegible", sans-serif',
  m: '"IBM Plex Mono", monospace'
};

// The only three motion helpers.
const MOTION = {
  enter: (start, dur = 0.5) => animate({
    from: 0,
    to: 1,
    start,
    end: start + dur,
    ease: Easing.easeOutCubic
  }),
  draw: (start, dur = 0.7) => animate({
    from: 0,
    to: 1,
    start,
    end: start + dur,
    ease: Easing.easeInOutCubic
  }),
  pop: (start, dur = 0.45) => animate({
    from: 0,
    to: 1,
    start,
    end: start + dur,
    ease: Easing.easeOutBack
  })
};
const rise = (p, d = 14) => ({
  opacity: Math.min(1, Math.max(0, p)),
  transform: `translateY(${(1 - p) * d}px)`
});
const typed = (T, text, start, per = 0.12) => text.slice(0, Math.max(0, Math.min(text.length, Math.floor((T - start) / per))));
const lerp = (a, b, k) => a + (b - a) * k;
function Caret({
  T,
  on
}) {
  return on ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 3,
      height: 22,
      marginLeft: 3,
      verticalAlign: "-4px",
      background: C.lamp,
      opacity: Math.floor(T * 2.4) % 2 ? 0.2 : 1
    }
  }) : null;
}
function Tap({
  T,
  at,
  x,
  y
}) {
  const p = MOTION.enter(at, 0.5)(T);
  if (T < at || p >= 1) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: x - 30,
      top: y - 30,
      width: 60,
      height: 60,
      borderRadius: 99,
      border: `3px solid ${C.bone9}`,
      opacity: 0.7 * (1 - p),
      transform: `scale(${0.4 + p * 0.8})`,
      pointerEvents: "none"
    }
  });
}
const SW = 390;
const scr = {
  position: "absolute",
  top: 0,
  width: SW,
  height: 800,
  padding: "26px 22px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  fontFamily: F.b,
  color: C.bone8
};
const h = {
  margin: 0,
  fontFamily: F.d,
  fontWeight: 800,
  color: C.bone9,
  letterSpacing: "-0.02em"
};
const card = {
  borderRadius: 18,
  border: `1px solid ${C.ink4}`,
  background: C.ink2,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 10
};
function ScreenDictionary({
  T,
  t0
}) {
  const e = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const q = typed(T, "karma", t0 + 0.8, 0.16);
  const src = e.sources && e.sources[0];
  return /*#__PURE__*/React.createElement("div", {
    style: scr
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      borderRadius: 999,
      background: C.ink2,
      border: `1px solid ${C.ink4}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 18px",
      fontSize: 19,
      fontWeight: 700,
      color: C.bone9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      border: `2px solid ${C.muted}`
    }
  }), q, /*#__PURE__*/React.createElement(Caret, {
    T: T,
    on: T > t0 + 0.4 && q.length < 5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 2.0)(T)),
      ...h,
      fontSize: 84,
      lineHeight: 0.9,
      marginTop: 18
    }
  }, "karma"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 2.6)(T)),
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      color: C.muted,
      fontSize: 16
    }
  }, e.pos), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19,
      lineHeight: 1.4,
      color: C.bone8
    }
  }, e.def)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, e.used.map((u, i) => /*#__PURE__*/React.createElement("span", {
    key: u,
    style: {
      ...rise(MOTION.pop(t0 + 3.2 + i * 0.25)(T), 8),
      height: 32,
      padding: "0 14px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      background: C.trad[u][1],
      color: C.trad[u][0],
      fontWeight: 700,
      fontSize: 15
    }
  }, u))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 4.4)(T)),
      fontSize: 22,
      fontWeight: 700,
      color: C.lamp,
      lineHeight: 1.25
    }
  }, "Same word. Not the same concept."), src && /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 5.0)(T)),
      fontSize: 15,
      color: C.info
    }
  }, src.work, " ", src.reference));
}
function ScreenQuestion({
  T,
  t0
}) {
  const ans = typed(T, "Trust, when I can't see the end yet.", t0 + 0.9, 0.06);
  const press = T > t0 + 3.4 && T < t0 + 3.6;
  const done = MOTION.enter(t0 + 3.8)(T);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 40,
      lineHeight: 1.02,
      marginTop: 8
    }
  }, "What does ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.lamp,
      textDecoration: "underline",
      textUnderlineOffset: "0.12em"
    }
  }, "faith"), " mean to you?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: C.muted
    }
  }, "No account. Not tied to any pastor."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      minHeight: 150,
      fontSize: 19,
      lineHeight: 1.4,
      color: C.bone9,
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", null, ans, /*#__PURE__*/React.createElement(Caret, {
    T: T,
    on: T > t0 + 0.5 && T < t0 + 3.3
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      borderRadius: 999,
      background: C.lamp,
      color: C.ink0,
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 18,
      transform: press ? "scale(.97)" : "none"
    }
  }, "Send answer"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(done),
      ...card,
      borderColor: C.ink3,
      background: C.ink1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 24
    }
  }, "Your answer is in."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: C.muted
    }
  }, "It joins the map when the month is published.")), /*#__PURE__*/React.createElement(Tap, {
    T: T,
    at: t0 + 3.4,
    x: 195,
    y: 346
  }));
}
function ScreenMap({
  T,
  t0
}) {
  const pub = window.CA_DATA.months.filter(m => m.published).slice(-2);
  const [A, B] = pub;
  const k = MOTION.draw(t0 + 1.0, 2.4)(T);
  const W = m => Object.fromEntries(m.nodes.filter(n => n[1] >= 3).map(n => [n[0], n[1]]));
  const wa = W(A),
    wb = W(B);
  const ids = [...new Set([...Object.keys(wb), ...Object.keys(wa)])].sort((x, y) => (wb[y] || wa[y] || 0) - (wb[x] || wa[x] || 0)).slice(0, 16);
  const slots = [[173, 250], [92, 150], [262, 142], [96, 350], [256, 352], [173, 96], [173, 420], [50, 250], [300, 248], [60, 440], [292, 440], [130, 44], [226, 40], [36, 70], [312, 70], [173, 172]];
  const pos = {};
  ids.forEach((id, i) => {
    pos[id] = slots[i] || [173, 250];
  });
  const labelled = new Set(ids.slice(0, 7));
  const onB = k >= 0.5;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 30
    }
  }, "Map"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      borderRadius: 999,
      background: C.ink2,
      border: `1px solid ${C.ink3}`
    }
  }, [A, B].map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: m.id,
    style: {
      height: 32,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      fontSize: 14,
      fontWeight: 700,
      background: i === 1 === onB ? C.bone8 : "transparent",
      color: i === 1 === onB ? C.ink0 : C.muted
    }
  }, m.label.split(" ")[0])))), /*#__PURE__*/React.createElement("svg", {
    width: "346",
    height: "500",
    viewBox: "0 0 346 500",
    style: {
      borderRadius: 18,
      background: C.ink1,
      border: `1px solid ${C.ink3}`
    }
  }, ids.map(id => {
    const v = lerp(wa[id] || 0, wb[id] || 0, k),
      r = v < 0.5 ? 0 : 5 + Math.sqrt(v) * 3.2,
      [x, y] = pos[id],
      nw = !wa[id] && wb[id] && onB;
    return /*#__PURE__*/React.createElement("g", {
      key: id,
      transform: `translate(${x} ${y})`
    }, /*#__PURE__*/React.createElement("circle", {
      r: r,
      fill: nw ? C.lamp : C.ink4,
      stroke: nw ? "none" : C.bone7,
      strokeWidth: "1.2"
    }), labelled.has(id) && r > 10 && /*#__PURE__*/React.createElement("text", {
      y: r + 15,
      textAnchor: "middle",
      style: {
        font: `700 13px ${F.b}`,
        fill: C.bone8
      }
    }, id));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 40,
      fontVariantNumeric: "tabular-nums"
    }
  }, Math.round(lerp(A.answers, B.answers, k))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      color: C.muted
    }
  }, "answers \xB7 counts only")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 3.8)(T)),
      fontSize: 17,
      color: C.bone8
    }
  }, "Bigger = said more. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.lamp
    }
  }, "Lime"), " = new this month."));
}
function Ring({
  p
}) {
  const n = 5,
    c = 110,
    r = 92,
    seg = 360 / n,
    gap = 8,
    cur = 1;
  const pt = d => {
    const a = (d - 90) * Math.PI / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: "220",
    height: "220",
    style: {
      alignSelf: "center",
      transform: `scale(${0.85 + 0.15 * p})`,
      opacity: Math.min(1, p)
    }
  }, [...Array(n)].map((_, i) => {
    const a0 = i * seg + gap / 2,
      a1 = (i + 1) * seg - gap / 2,
      [x0, y0] = pt(a0),
      [x1, y1] = pt(a1);
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`,
      fill: "none",
      strokeLinecap: "round",
      stroke: i === cur ? C.lamp : i < cur ? C.bone7 : C.ink4,
      strokeWidth: i === cur ? 14 : i < cur ? 9 : 6,
      strokeDasharray: i > cur ? "2 10" : "none"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: c,
    y: c - 4,
    textAnchor: "middle",
    style: {
      font: `700 13px ${F.b}`,
      fill: C.lamp,
      letterSpacing: ".08em"
    }
  }, "STAGE 2 OF 5"), /*#__PURE__*/React.createElement("text", {
    x: c,
    y: c + 22,
    textAnchor: "middle",
    style: {
      font: `700 24px ${F.d}`,
      fill: C.bone9
    }
  }, "Training"));
}
function ScreenPastor({
  T,
  t0
}) {
  const moods = ["Heavy", "Tired", "Okay", "Good", "Light"];
  const picked = T > t0 + 3.5;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 36
    }
  }, "Good morning."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      color: C.muted,
      marginTop: -8
    }
  }, "Your mentor walks with you this season."), /*#__PURE__*/React.createElement(Ring, {
    p: MOTION.pop(t0 + 0.4, 0.7)(T)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 2.0)(T), 30),
      ...card
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 24
    }
  }, "How was today?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, moods.map(m => {
    const on = picked && m === "Good";
    return /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        flex: 1,
        height: 42,
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        fontSize: 14,
        fontWeight: 700,
        border: `1px solid ${on ? C.bone8 : C.ink4}`,
        background: on ? C.bone8 : "transparent",
        color: on ? C.ink0 : C.bone8
      }
    }, m);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rise(MOTION.enter(t0 + 4.4)(T)),
      fontSize: 22,
      lineHeight: 1.35,
      color: C.bone9
    }
  }, "Thanks. Your mentor reads it with care."), /*#__PURE__*/React.createElement(Tap, {
    T: T,
    at: t0 + 3.5,
    x: 264,
    y: 466
  }));
}
function ScreenConnect({
  T,
  t0
}) {
  const email = typed(T, "pastor@livingwater.church", t0 + 0.4, 0.045);
  const dots = "•".repeat(Math.max(0, Math.min(8, Math.floor((T - (t0 + 1.6)) / 0.06))));
  const toList = MOTION.draw(t0 + 2.6, 0.6)(T);
  const on = T > t0 + 4.1;
  const field = {
    position: "absolute",
    left: 22,
    right: 22,
    height: 54,
    borderRadius: 14,
    background: C.ink2,
    border: `1px solid ${C.ink4}`,
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    fontSize: 17,
    color: C.bone9
  };
  const lab = {
    position: "absolute",
    left: 22,
    fontSize: 14,
    fontWeight: 700,
    color: C.muted
  };
  const row = {
    position: "absolute",
    left: 22,
    right: 22,
    borderRadius: 18,
    border: `1px solid ${C.ink4}`,
    background: C.ink2,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 4,
      padding: 0,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 1 - toList,
      transform: `translateX(${-toList * 40}px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      position: "absolute",
      left: 22,
      top: 30,
      fontSize: 32
    }
  }, "Planning Center"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 22,
      top: 76,
      fontSize: 16,
      color: C.muted
    }
  }, "You sign in on their site."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lab,
      top: 128
    }
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...field,
      top: 150
    }
  }, email, /*#__PURE__*/React.createElement(Caret, {
    T: T,
    on: T > t0 + 0.3 && T < t0 + 1.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...lab,
      top: 222
    }
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...field,
      top: 244,
      letterSpacing: ".2em"
    }
  }, dots), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 22,
      right: 22,
      top: 326,
      height: 56,
      borderRadius: 999,
      background: C.bone8,
      color: C.ink0,
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 18
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 22,
      right: 22,
      top: 400,
      fontSize: 15,
      color: C.muted,
      textAlign: "center"
    }
  }, "We never see your password.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: toList,
      transform: `translateX(${(1 - toList) * 40}px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      position: "absolute",
      left: 22,
      top: 30,
      fontSize: 32
    }
  }, "Church apps"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...row,
      top: 92
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 21,
      flex: 1
    }
  }, "Planning Center"), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 28,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 700,
      background: on ? "rgba(124,192,138,.14)" : C.ink3,
      color: on ? C.ok : C.muted
    }
  }, on ? "Connected" : "Not connected")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: C.muted
    }
  }, "Service plans, groups and a month finance total."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      borderRadius: 999,
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 16,
      background: on ? "transparent" : C.bone8,
      color: on ? C.bone8 : C.ink0,
      border: `1px solid ${on ? C.ink4 : C.bone8}`
    }
  }, on ? "Open" : "Connect")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...row,
      top: 290,
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 21,
      whiteSpace: "nowrap"
    }
  }, "Another church app"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.muted
    }
  }, "Not available yet")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...row,
      top: 404,
      background: C.ink1,
      borderColor: C.ink3,
      ...rise(MOTION.enter(t0 + 4.7)(T))
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.muted
    }
  }, "Who"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      lineHeight: 1.4,
      color: C.bone9
    }
  }, "Your church chose this. It can't move a stage or put names on the map."))), /*#__PURE__*/React.createElement(Tap, {
    T: T,
    at: t0 + 2.3,
    x: 195,
    y: 354
  }), /*#__PURE__*/React.createElement(Tap, {
    T: T,
    at: t0 + 3.7,
    x: 195,
    y: 232
  }));
}
function ScreenReview({
  T,
  t0
}) {
  const steps = ["Read check-ins", "Read month counts", "Draft the review", "Check the draft"];
  const col = MOTION.draw(t0 + 2.9, 0.5)(T);
  const b = i => rise(MOTION.enter(t0 + 3.3 + i * 0.35)(T), 18);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 5
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 32
    }
  }, "P-0419"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: C.muted,
      marginTop: 4
    }
  }, "Bangladesh \xB7 Dhaka Division")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      overflow: "hidden",
      height: lerp(196, 52, col),
      justifyContent: "flex-start"
    }
  }, col < 0.5 ? steps.map((s, i) => {
    const on = T > t0 + 0.6 + i * 0.55;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 34,
        fontSize: 17,
        color: on ? C.bone9 : C.faint
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 99,
        flex: "none",
        background: on ? C.ok : "transparent",
        border: `2px solid ${on ? C.ok : C.ink4}`
      }
    }), s);
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: 20,
      fontSize: 16,
      color: C.muted,
      opacity: (col - 0.5) * 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      background: C.ok
    }
  }), "Prepared \xB7 no names")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...b(0),
      ...card
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.muted,
      fontWeight: 700
    }
  }, "Month counts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, [["14", "activities"], ["22", "check-ins"], ["4 of 5", "pieces"]].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 26
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...b(1),
      ...card
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.muted,
      fontWeight: 700
    }
  }, "Encouragement"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      lineHeight: 1.4
    }
  }, "Steady care for the youth group this month.")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...b(2),
      ...card,
      borderColor: C.warn
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.warn,
      fontWeight: 700
    }
  }, "Held"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19,
      fontWeight: 700,
      color: C.bone9
    }
  }, "A person still has to decide.")));
}
const PROMISES = [["We map ideas, never people.", "No account. No names. Counts only."], ["Every word has a source.", "Checked by a person."], ["A person always decides.", "AI drafts. People publish."], ["Works on a weak connection.", "Words you've seen stay on your phone."]];
const PR_AT = i => -0.2 + i * 1.9;
function ScreenPromise({
  T,
  t0
}) {
  const e = window.CA_DATA.lexicon.find(x => x.term === "karma");
  const src = e.sources && e.sources[0];
  const vis = i => MOTION.enter(t0 + PR_AT(i), 0.45)(T) * (i < 3 ? 1 - MOTION.enter(t0 + PR_AT(i + 1) - 0.3, 0.3)(T) : 1);
  const box = i => ({
    position: "absolute",
    left: 22,
    right: 22,
    top: 180,
    ...rise(vis(i), 20),
    ...card,
    padding: 22,
    gap: 14
  });
  const big = {
    ...h,
    fontSize: 30,
    lineHeight: 1.05
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 6,
      display: "block",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: box(0)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 48
    }
  }, "212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: C.muted,
      marginTop: -8
    }
  }, "answers this month"), [["family", 44], ["hope", 31], ["faith", 17]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 18,
      color: C.bone8
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: F.m,
      color: C.muted
    }
  }, v))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: C.lamp,
      fontWeight: 700
    }
  }, "No names \xB7 no answer text")), /*#__PURE__*/React.createElement("div", {
    style: box(1)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 56,
      lineHeight: 0.9
    }
  }, "karma"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      lineHeight: 1.4
    }
  }, e.def), src && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: C.info,
      fontWeight: 700
    }
  }, src.work, " ", src.reference), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: C.muted
    }
  }, "Checked by a person")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...box(2),
      borderColor: C.warn
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.warn,
      fontWeight: 700
    }
  }, "Held"), /*#__PURE__*/React.createElement("span", {
    style: big
  }, "A person still has to decide."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 999,
      background: C.lamp,
      color: C.ink0,
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 17
    }
  }, "Publish"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: C.muted
    }
  }, "Nothing is published automatically.")), /*#__PURE__*/React.createElement("div", {
    style: box(3)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: "flex-start",
      height: 30,
      padding: "0 12px",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      border: `1px solid ${C.ink4}`,
      fontSize: 14,
      fontWeight: 700,
      color: C.bone8,
      whiteSpace: "nowrap"
    }
  }, "On this device."), /*#__PURE__*/React.createElement("span", {
    style: {
      ...h,
      fontSize: 56,
      lineHeight: 0.9
    }
  }, "karma"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      lineHeight: 1.4
    }
  }, e.def)));
}
function ScreenEnd({
  T,
  t0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...scr,
      left: SW * 7,
      justifyContent: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 44,
      lineHeight: 1
    }
  }, "One word. Three faiths."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      borderRadius: 999,
      background: C.ink2,
      border: `1px solid ${C.ink4}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 18px",
      fontSize: 19,
      color: C.faint
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 99,
      border: `2px solid ${C.muted}`
    }
  }), "Search a word", /*#__PURE__*/React.createElement(Caret, {
    T: T,
    on: T > t0 + 0.6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      borderRadius: 999,
      background: C.lamp,
      color: C.ink0,
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: 18
    }
  }, "Search"));
}
const TOUR_TEXT = [["Dictionary", "Look up any word.", "Hindu, Buddhist and Christian words, side by side, with sources."], ["Question", "Answer one question a month.", "No account. No name. Not tied to any pastor."], ["Map", "See the map of ideas.", "Ideas are counted, never people. A person publishes it."], ["Pastor", "Pastors check in.", "A mentor reads it. Hard notes go to a person."], ["Connect", "Connect your church app.", "Sign in with Planning Center. It sends activity in. Only leaders move a stage."], ["Review", "Leaders review with care.", "The draft is prepared. A person still decides."], ["Promises", null, null], ["Close", "Look up a word.", "Rhema.ai"]];
const MODULES = [["Dictionary", "Dictionary"], ["Question", "Monthly question"], ["Map", "Map"], ["Pastor", "Pastors"], ["Connect", "Church app"], ["Review", "Review"]];
function TourPiece({
  captions,
  vertical
}) {
  const V = !!vertical;
  const {
    T,
    CUES,
    duration
  } = useComposition();
  const order = TOUR_TEXT.map(x => x[0]);
  const end = n => {
    const i = order.indexOf(n);
    return i < order.length - 1 ? CUES[order[i + 1]] : duration;
  };
  // Wordmark: centered title → corner → back to center at the end (loop seam).
  const toCorner = MOTION.draw(CUES.Dictionary - 0.9, 0.9)(T);
  const back = MOTION.draw(CUES.Close + 3.2, 1.0)(T);
  const wk = toCorner * (1 - back);
  const tag = 1 - Math.min(1, MOTION.enter(CUES.Dictionary - 1.2, 0.4)(T) * (1 - MOTION.enter(CUES.Close + 3.6, 0.6)(T)));
  const wmW = 980;
  const wx = lerp((V ? 540 : 960) - wmW / 2, V ? 70 : 120, wk),
    wy = lerp(V ? 780 : 380, V ? 70 : 70, wk),
    ws = lerp(1, V ? 0.3 : 0.24, wk);
  // Phone: rises in, sits, leaves at the end.
  const phIn = MOTION.enter(CUES.Dictionary - 0.6, 1.0)(T),
    phOut = MOTION.draw(CUES.Close + 2.6, 0.9)(T);
  const phY = lerp(V ? 2000 : 1150, V ? 560 : 110, phIn) + phOut * (V ? 1500 : 1040);
  const drift = 1 + 0.012 * Math.sin(T * 0.5);
  // Screen track: slide one screen per section.
  const pos = ["Question", "Map", "Pastor", "Connect", "Review", "Promises", "Close"].reduce((s, n) => s + MOTION.draw(CUES[n] - 0.35, 0.7)(T), 0) * (T > CUES.Close + 3.6 ? 0 : 1);
  const curMod = MODULES.reduce((a, [n], i) => T >= CUES[n] - 0.35 ? i : a, -1);
  const rowP = MOTION.enter(CUES.Dictionary + 0.2)(T) * (1 - MOTION.enter(CUES.Promises - 0.3, 0.4)(T));
  const prOut = 1 - MOTION.enter(CUES.Close - 0.45, 0.35)(T);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": `Tour ${Math.floor(T)}s`,
    style: {
      position: "absolute",
      inset: 0,
      background: C.ink0,
      overflow: "hidden",
      fontFamily: F.b
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transformOrigin: "0 0",
      transform: `translate(${wx}px, ${wy}px) scale(${ws})`,
      width: wmW,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...h,
      fontSize: 200,
      lineHeight: 1,
      whiteSpace: "nowrap"
    }
  }, "Rhema.ai"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: F.b,
      fontSize: 48,
      color: C.bone8,
      marginTop: 24,
      opacity: tag
    }
  }, "One word. Three faiths.")), captions && TOUR_TEXT.filter(x => x[1]).map(([n, t, s]) => {
    const p = MOTION.enter(CUES[n] + 0.15, 0.6)(T) * (1 - MOTION.enter(n === "Close" ? CUES.Close + 2.6 : end(n) - 0.45, 0.35)(T));
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        position: "absolute",
        left: V ? 70 : 120,
        top: V ? 220 : 330,
        width: V ? 940 : 780,
        ...rise(p, 24)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...h,
        fontSize: V ? 84 : 96,
        lineHeight: 0.95
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 34,
        lineHeight: 1.35,
        color: n === "Close" ? C.lamp : C.bone8,
        marginTop: 28,
        fontWeight: n === "Close" ? 700 : 400
      }
    }, s));
  }), captions && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: V ? 70 : 120,
      top: V ? 170 : 220,
      width: V ? 940 : 900,
      display: "flex",
      flexDirection: "column",
      gap: 34
    }
  }, PROMISES.map(([t, sub], i) => {
    const p = MOTION.enter(CUES.Promises + PR_AT(i), 0.5)(T) * prOut;
    const cur = T >= CUES.Promises + PR_AT(i) && (i === 3 || T < CUES.Promises + PR_AT(i + 1));
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      style: V ? {
        position: "absolute",
        left: 0,
        top: 50,
        width: "100%",
        ...rise(cur ? p : 0, 18)
      } : {
        ...rise(p, 18)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...h,
        fontSize: V ? 54 : 62,
        lineHeight: 1,
        color: cur ? C.bone9 : C.faint
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 28,
        marginTop: 10,
        color: cur ? C.bone8 : C.faint
      }
    }, sub));
  })), !V && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 120,
      top: 940,
      display: "flex",
      gap: 30,
      opacity: rowP
    }
  }, MODULES.map(([n, l], i) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: i === curMod ? C.bone9 : C.faint
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: V ? 325 : 1170,
      top: phY,
      width: 430,
      height: 860,
      borderRadius: 56,
      background: C.ink1,
      border: `2px solid ${C.ink4}`,
      overflow: "hidden",
      transform: `scale(${drift * (V ? 1.45 : 1)})`,
      transformOrigin: V ? "50% 0" : "50% 50%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      top: 30,
      width: SW,
      height: 800,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -pos * SW,
      top: 0,
      width: SW * 8,
      height: 800
    }
  }, /*#__PURE__*/React.createElement(ScreenDictionary, {
    T: T,
    t0: CUES.Dictionary
  }), /*#__PURE__*/React.createElement(ScreenQuestion, {
    T: T,
    t0: CUES.Question
  }), /*#__PURE__*/React.createElement(ScreenMap, {
    T: T,
    t0: CUES.Map
  }), /*#__PURE__*/React.createElement(ScreenPastor, {
    T: T,
    t0: CUES.Pastor
  }), /*#__PURE__*/React.createElement(ScreenConnect, {
    T: T,
    t0: CUES.Connect
  }), /*#__PURE__*/React.createElement(ScreenReview, {
    T: T,
    t0: CUES.Review
  }), /*#__PURE__*/React.createElement(ScreenPromise, {
    T: T,
    t0: CUES.Promises
  }), /*#__PURE__*/React.createElement(ScreenEnd, {
    T: T,
    t0: CUES.Close
  })))));
}
window.TourPiece = TourPiece;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/tour/Tour.jsx", error: String((e && e.message) || e) }); }

// ui_kits/tour/animations-v3.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// animations-v3.jsx — continuous-composition animation engine.
//
// THE MODEL: the animation is ONE element tree rendered as a pure function
// of one authored-time axis. Nothing mounts or unmounts at section
// boundaries, so any element can move, morph, or persist across them by
// ordinary interpolation. The scene list (OM_SCENES) is the user-control
// view — names, order, playback durations — and the engine derives the cue
// table from it, so structure has exactly one source and cannot drift.
//
// API INDEX (every export is a window global):
//   <CompositionStage width height scenes={window.OM_SCENES}
//                     playback={window.OM_PLAYBACK} bg>
//     <Piece />   — ONE component, the whole animation
//   </CompositionStage>
//   useComposition() -> {T, CUES, time, duration, authoredTotal, playing}
//     T: authored seconds (warped per-section by user trims/speeds) —
//        key ALL choreography to T, never to wall-clock time
//     CUES: {SectionName: authoredStart} derived from OM_SCENES; an unknown
//        name returns NaN and raises a preview-only badge (never exports);
//        duplicate section names bind to the first occurrence
//   <Shot from={CUES.Build} to={CUES.Close}> — children visible between two
//     authored times (an authored hard cut in one line); children stay
//     mounted (media keeps its readiness) and are hidden outside the window
//   <Captions items={[{at, until?, text}, ...]} /> — ONE caption element,
//     at most one visible at a time, keyed to T; 'until' defaults to the
//     next item's 'at'; a last item with no 'until' stays to the end
//   WATERCOLOR (only when the Watercolor illustration skill is active —
//   otherwise ignore these entries). A painting is a function(p) written
//   against the paint kit, on a width x height sheet; it needs
//   watercolor_kit.js loaded by a <script> tag before this engine, must
//   be a stable function defined once (module scope, never an inline
//   arrow), and every component below renders <img> elements, so it all
//   exports by construction.
//   <WatercolorPainting painting={fn} from={CUES.X} to={CUES.Y} width height
//     seed scale quality style /> — the painting assembled from its own
//     STROKES: each wash / ink line / splatter is a separate layer
//     stacked over the paper, appearing in painting order between two
//     authored times (washes bloom in, ink draws tip to tail). This is the
//     default way to show a watercolor being painted. It keeps the sheet's
//     aspect ratio (size it with style, e.g. {position:'absolute', left,
//     top, width}). scale is the layers' render resolution over width x
//     height (default 1, a deliberate weight-over-dpi trade — raise it
//     toward the zoom factor if the composition zooms into the painting,
//     or toward the devicePixelRatio for a hero-sized sheet); quality is
//     0..1 layer image quality (default 0.92; 1 is the encoder's maximum).
//   useWatercolorLayers(fn, {width, height, seed, scale, quality}) -> L
//     (null if the kit isn't loaded — load watercolor_kit.js before the
//     engine — or if the painting fails to build) — the painting taken apart into strokes, for
//     choreography beyond in-order painting: L.count strokes, L.kind(i)
//     ('wash' | 'gradedWash' | 'glaze' | 'ink' | 'hatch' | 'splatter' |
//     'dryStroke' | 'reserve' | 'caption'), L.span(i) = the stroke's
//     {from, to} share of the painting's 0..1 timeline; call L.warm()
//     once after load so finished strokes pre-render off the critical
//     path (WatercolorPainting does this itself). Compose with:
//   <WatercolorSheet layers={L} style>children</WatercolorSheet> — the
//     paper the strokes sit on (keeps the sheet's aspect ratio), and
//   <WatercolorStroke index={i} at={0..1} style /> — stroke i as its own
//     element, placed where it was painted; at is its painting progress
//     (0 hidden, 1 finished — drive it from T with animate()); style lets
//     you move, scale, rotate, or fade the stroke (transform / opacity).
//     Strokes are paint, so they multiply: overlapping strokes darken
//     where they cross, as in the still image, within a few 8-bit levels
//     (tighter still at quality 1). The sheet clips to its
//     box — for strokes that fly in from outside it, set
//     style={{overflow: 'visible'}} on the WatercolorSheet. 'reserve' strokes
//     are erasures (lifted paper) — keep them where they were painted and
//     reveal them in order after the strokes they erase; moving an erase
//     around has no sensible meaning.
//   <WatercolorReveal painting={fn} from={CUES.X} to={CUES.Y} width height
//     seed steps scale format quality style />, or <WatercolorReveal
//     frames={[src, ...]} from to /> — the whole painting as ONE flat
//     image that paints on (frames pre-baked in the background, so it is
//     the lightest option and the one to zoom or pan over as a single
//     picture). Prefer WatercolorPainting when the strokes themselves
//     should appear one by one or be individually animated. format is
//     the image MIME type (default image/jpeg), quality 0..1 (default
//     0.88). Frames bake at width x height times scale (default: the
//     device pixel ratio, capped at 2) — if the composition zooms INTO
//     the painting, raise scale toward the maximum zoom so frames stay
//     crisp. The kit caps a sheet at ~12M pixels and the components clamp
//     scale to stay under it; exported video sharpness also depends on
//     the export dialog's own resolution choice.
//   Motion: Easing.{linear, easeIn|Out|InOutQuad/Cubic/Quart/Expo/Sine,
//     easeIn|Out|InOutBack, easeOutElastic}, interpolate(input, output, ease),
//     animate({from, to, start, end, ease}) -> fn(T), clamp(v, min, max)
//   Plumbing (rarely needed): Stage, PlaybackBar, TimelineContext,
//     useTime, useTimeline
//   Seek event (host/export transport): 'data-om-seek-to-time-frame',
//     detail {time, sync, playing} — the stage owns it; never implement it
//     yourself
//
// THE AUTHORING CONTRACT — this is what makes the host timeline's trim and
// speed gestures write back into YOUR file, so follow it exactly:
//   1. Declare the scene list as a JSON string literal in a plain inline
//      <script> of the main document (NOT type="text/babel", NOT a sibling
//      .jsx — only vanilla inline scripts are addressable for write-back):
//        <script>window.OM_SCENES = '[{"name":"Opening","dur":3,"desc":"The logo fades in and the title settles"},{"name":"Build","dur":5,"desc":"Bars grow to their final values"}]';</script>
//      Give every entry a "desc": one short plain-words sentence saying
//      what happens in that section. The user reads it in the timeline's
//      section popover — keep it true whenever you edit the section.
//   2. Pass the string through untouched:
//        <CompositionStage scenes={window.OM_SCENES} ...>
//   3. ALSO declare the playback setting the same way:
//        <script>window.OM_PLAYBACK = '{"mode":"loop"}';</script>
//      and pass it through untouched (values: '{"mode":"loop"}' or
//      '{"mode":"times","count":N}'; omitting keeps loop behavior but
//      leaves the host Repeat control read-only for this document).
//   IMPORTANT — the exportable-video contract: CompositionStage/Stage OWNS
//   it (the data-om-exportable-video-with-duration-secs attribute, the
//   data-om-seek-to-time-frame listener, the svg/foreignObject wrapper,
//   and font inlining). NEVER put the exportable attribute on any other
//   element — a second "exportable root" makes the host timeline and the
//   video exporter bind to the wrong element, and playback control /
//   export silently break.
//
// HOW TIME WORKS: each OM_SCENES entry is a named slice of the authored
// timeline. CUES.Name is that section's authored start (the running sum of
// authored lengths, in literal order). useComposition().T is the authored
// clock: when the user trims or speeds a section on the host timeline, the
// engine replays that section's SAME authored slice over the new playback
// length — your choreography retimes, never cuts off. The optional "nat"
// field on an entry is the engine's authored-length anchor — the host
// timeline stamps it on the first retime; don't set it by hand.
//
// CUE-FIRST DISCIPLINE (what makes a piece read as one continuous video):
//   1. Write the OM_SCENES literal FIRST — it is the piece's outline.
//   2. One helper component per section for readability, but ALL of them
//      render ALL the time inside the one tree, keyed to CUES — never
//      conditionally mounted per section.
//   3. Define exactly three motion helpers up front (e.g.
//      MOTION = {enter, draw, pop} wrapping Easing curves) and use no
//      easing or transform outside them; one caption element, one visible
//      at a time (<Captions> has this built in).
//   A shared element that crosses a boundary is just motion whose start
//   and end straddle a cue: animate({from, to, start: CUES.Build - 0.4,
//   end: CUES.Build + 0.6})(T) glides through the boundary, and a user
//   slowing either section slows the glide without breaking it.
//
// RENDER FROM T ONLY: the exporter seeks each frame with a synchronous
// commit and may serialize the stage the moment the seek event returns —
// anything painted from useEffect or your own requestAnimationFrame lags
// that commit and exports stale. Render everything visible from T and this
// is automatic. A seeked frame is a deterministic render at that time.
//
// HARD CUTS are content now, not structure: wrap a shot's elements in
// <Shot from to> (visibility toggles at the cues; children stay mounted so
// images and videos hold their readiness). Shot also doubles as the
// perf gate for heavy far-away beats.
//
// LOOP SEAMS are the one surviving boundary rule: a looping piece shows
// its last authored frame immediately before its first — make them match
// (settle your choreography by authoredTotal, open it at 0).
//
// DIAGNOSTICS: choreography that references an unknown section name (a
// rename or deletion in OM_SCENES) shows a badge below the stage in the
// preview, outside the exportable svg — visible in preview screenshots,
// never in the exported video. An OM_SCENES section with no choreography
// keyed to it is a valid empty beat, not an error.
/* END USAGE */

// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// How long a marked (detail.playing === true) host seek keeps the
// external-playback latch alive with no successor. The host play bar's
// seek pump is one-in-flight/latest-wins, so its inter-seek gap is tens
// of milliseconds in the worst case — 400ms is far above that, so a
// marked stream that dies mid-play decays the latch promptly.
var SS_EXT_PLAY_MS = 400;

// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try {
          cssRules = ss.cssRules;
        } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => {
                if (!r.ok) throw 0;
                return r.text();
              });
              for (const ff of txt.match(/@font-face\s*{[^}]*}/g) || []) rules.push({
                css: ff,
                base: ss.href
              });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({
              css: r.cssText,
              base: ss.href || location.href
            });
          }
        }
      }
      const toDataURL = url => fetch(url).then(r => {
        if (!r.ok) throw 0;
        return r.blob();
      }).then(b => new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => res(url);
        fr.readAsDataURL(b);
      })).catch(() => url);
      const parts = await Promise.all(rules.map(async ({
        css,
        base
      }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css,
          m;
        while (m = re.exec(css)) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs;
          try {
            abs = new URL(u, base).href;
          } catch {
            continue;
          }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  // Parsed playback object ({mode:'loop'} | {mode:'times',count:N}) or
  // null. When present it overrides the legacy loop prop — CompositionStage
  // passes the validated value from the OM_PLAYBACK authoring contract.
  playback = null,
  persistKey = 'animstage-v3',
  children
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280;
  height = +height || 720;
  duration = +duration || 10;
  fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';
  const playTimes = playback && playback.mode === 'times' ? playback.count : null;
  const loopEff = playback ? playback.mode === 'loop' : loop;
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  // The external-playback latch: true while the HOST play bar is driving
  // time forward as genuine continuous playback (its play-loop seeks
  // carry detail.playing === true). The engine's own clock stays paused
  // the whole time — exactly one clock ever drives — so this is a
  // separate bit, not a second meaning for `playing`. Set and cleared
  // in the seek handler below; decays via SS_EXT_PLAY_MS when the
  // marked stream stops without a parting unmarked seek.
  const [extPlay, setExtPlay] = React.useState(false);
  const extPlayTimerRef = React.useRef(null);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Passes completed since playback last started. Lives in a ref so the
  // per-frame wrap can count without re-running this effect; reset on
  // every (re)start so a fresh play (or a host restart) gets the full
  // run count again.
  const passesRef = React.useRef(0);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    passesRef.current = 0;
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (playTimes !== null) {
            // Play N times then hold the last frame — the partial pass a
            // mid-timeline start produces counts as a pass, so the piece
            // never runs longer than N full durations.
            passesRef.current += 1;
            if (passesRef.current >= playTimes) {
              next = duration;
              setPlaying(false);
            } else {
              next = next % duration;
            }
          } else if (loopEff) {
            next = next % duration;
          } else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loopEff, playTimes]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol + the editor's play bar: hosts dispatch this
  // event per frame; pause + sync the playhead so the frame shows exactly
  // that timestamp. The host play bar marks its play-loop seeks with
  // detail.playing === true — the mark latches extPlay (playback is
  // playback even when a host clock drives it), while ANY unmarked seek
  // (scrub, step, export frame, the transport's pause park) clears the
  // latch in the same commit it retimes, so a seeked frame still renders
  // exactly one scene's state. The engine's own clock pauses either way.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    // Sync-seek capability: a dispatcher that marks its seek with
    // detail.sync === true gets the commit applied via ReactDOM.flushSync,
    // so the stage DOM reflects the seeked frame the moment dispatchEvent
    // returns. The video exporter keys off the data-om-sync-seek
    // advertisement to drop its two-display-refresh settle (that wait only
    // exists to let React's async commit land — serialization needs the
    // committed DOM, not the paint). Feature-detected: a runtime without
    // ReactDOM.flushSync never advertises and every seek takes the async
    // path. Unmarked seeks (scrubs, the host play bar) stay async — a
    // forced sync render per pointermove would tax the editor for no one.
    const canSyncSeek = typeof ReactDOM !== 'undefined' && typeof ReactDOM.flushSync === 'function';
    const onSeek = e => {
      const apply = () => {
        setPlaying(false);
        const hostPlay = !!(e.detail && e.detail.playing === true);
        if (extPlayTimerRef.current) {
          clearTimeout(extPlayTimerRef.current);
          extPlayTimerRef.current = null;
        }
        if (hostPlay) {
          // Watchdog: the latch is only as alive as its seek stream. If the
          // host stops without a parting seek (tab jank, bar unmount), the
          // latch decays on its own rather than stranding extPlaying true.
          extPlayTimerRef.current = setTimeout(() => {
            extPlayTimerRef.current = null;
            setExtPlay(false);
          }, SS_EXT_PLAY_MS);
        }
        setExtPlay(hostPlay);
        setTime(clamp(e.detail.time, 0, duration));
      };
      // flushSync is safe here: a native DOM listener runs outside React's
      // lifecycle, and the exporter's dispatchEvent is synchronous, so the
      // commit lands in the same JS task — the engine's own rAF loop can
      // never interleave between seek and serialize.
      if (canSyncSeek && e.detail && e.detail.sync === true) {
        ReactDOM.flushSync(apply);
      } else {
        apply();
      }
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    if (canSyncSeek) el.setAttribute('data-om-sync-seek', 'true');
    return () => {
      el.removeEventListener('data-om-seek-to-time-frame', onSeek);
      el.removeAttribute('data-om-sync-seek');
      if (extPlayTimerRef.current) {
        clearTimeout(extPlayTimerRef.current);
        extPlayTimerRef.current = null;
      }
      // Drop the latch too: this cleanup runs on every duration change
      // (an agent edit can retime mid-host-play, no gesture involved) and
      // the new effect instance arms no watchdog — clearing only the
      // timer could strand extPlay true forever if the marked stream died
      // in the gap. Fail toward cut: the next marked seek re-latches.
      setExtPlay(false);
    };
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(
  // extPlaying is ADDITIVE: "time is advancing under an external
  // driver's continuous playback". `playing` keeps meaning the
  // engine's OWN clock — the hidden PlaybackBar glyph (and through it
  // the host's clock-reporter/adoption channel) reads that — and
  // CompositionClock is the one consumer that widens to either.
  () => ({
    time: displayTime,
    duration,
    playing,
    extPlaying: extPlay,
    setTime,
    setPlaying
  }), [displayTime, duration, playing, extPlay]);
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      ref: stageRef,
      "data-om-starter": "animations-v3",
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      ref: canvasRef,
      width: width,
      height: height,
      "data-om-exportable-video-with-duration-secs": duration,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("foreignObject", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement("div", {
      xmlns: "http://www.w3.org/1999/xhtml",
      style: {
        width,
        height,
        background,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
      value: ctxValue
    }, children))))), /*#__PURE__*/React.createElement(PlaybackBar, {
      time: displayTime,
      actualTime: time,
      duration: duration,
      playing: playing,
      onPlayPause: () => setPlaying(p => !p),
      onReset: () => {
        setTime(0);
      },
      onSeek: t => setTime(t),
      onHover: t => setHoverTime(t)
    }))
  );
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    "data-omelette-chrome": true,
    style: {
      // Slimmed to visually match the host editor bar's basic row (the
      // single-scrubber look): transport first, tighter metrics, quieter
      // chrome. Shown only outside the app — the host bar suppresses this
      // whenever it is present.
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 12px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 6,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)), typeof VideoEncoder !== 'undefined' && /*#__PURE__*/React.createElement(IconButton, {
    title: "Export video",
    onClick: () => window.parent.postMessage({
      type: 'omelette:request-video-export'
    }, '*')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v7m0 0L4 6m3 3l3-3M2 12h10",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}

// ── Scene-list plumbing ──────────────────────────────────────────────────
// Guest-side validation of a scene list (the engine's own inputs: the
// authored prop, and host-dispatched updates). Mirrors the host parser's
// shape rules and constants — keep in sync with parseTimelineScenes in
// apps/web/src/shared/timeline.ts (16KB raw cap, 50 entries, dur finite in
// (0, 300]); returns null on any violation.
function ssParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 16 * 1024) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 50) return null;
  for (var i = 0; i < parsed.length; i++) {
    var s = parsed[i];
    if (typeof s !== 'object' || s === null) return null;
    if (typeof s.name !== 'string' || typeof s.dur !== 'number') return null;
    if (!isFinite(s.dur) || s.dur <= 0 || s.dur > 300) return null;
  }
  return parsed;
}

// Guest-side validation of the playback value — mirrors the host parser
// (shared/timeline.ts parseTimelinePlayback): {"mode":"loop"} or
// {"mode":"times","count":1..99}, strict all-or-nothing, null otherwise.
// Callers treat null as the loop default.
function ppParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 256) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
  var keys = Object.keys(parsed);
  if (parsed.mode === 'loop') return keys.length === 1 ? {
    mode: 'loop'
  } : null;
  if (parsed.mode === 'times') {
    if (keys.length !== 2) return null;
    var c = parsed.count;
    if (typeof c !== 'number' || c !== Math.floor(c) || c < 1 || c > 99) return null;
    return {
      mode: 'times',
      count: c
    };
  }
  return null;
}

// Stamps the playback attribute VERBATIM from the authored raw string (the
// host's write-back anchors on that exact value) and listens for the
// host's post-write update event. Same shape as SceneSync; only rendered
// when the document authors a playback literal — an absent contract means
// the attribute stays absent and the document plays its default.
function PlaybackSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-playback', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      if (ppParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-playback-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-playback-update', onEvent);
      root.removeAttribute('data-om-timeline-playback');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}

// Renders inside the Stage (so it can reach the exportable root via
// closest()): stamps the scenes attribute VERBATIM from the current raw
// string — the host's write-back anchors on that exact value — and listens
// for the host's post-write update event.
function SceneSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-scenes', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      // Ignore anything that doesn't validate — a bad update must not tear
      // down a working composition.
      if (ssParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-scenes-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-scenes-update', onEvent);
      root.removeAttribute('data-om-timeline-scenes');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}

// ── Continuous composition ──────────────────────────────────────────────

var CompositionContext = React.createContext(null);
function useComposition() {
  var ctx = React.useContext(CompositionContext);
  if (!ctx) throw new Error('useComposition() must be called inside <CompositionStage>');
  return ctx;
}
function ccDerive(scenes) {
  var playStart = 0;
  var authStart = 0;
  var sections = [];
  var table = Object.create(null);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];
    var nat = typeof s.nat === 'number' && isFinite(s.nat) && s.nat > 0 ? s.nat : s.dur;
    sections.push({
      name: s.name,
      playStart: playStart,
      dur: s.dur,
      authStart: authStart,
      nat: nat
    });
    if (!Object.prototype.hasOwnProperty.call(table, s.name)) {
      table[s.name] = Math.round(authStart * 1000) / 1000;
    }
    playStart += s.dur;
    authStart += nat;
  }
  return {
    sections: sections,
    table: table,
    total: Math.round(playStart * 1000) / 1000,
    authoredTotal: Math.round(authStart * 1000) / 1000
  };
}
function ccWarp(d, t) {
  var ss = d.sections;
  if (ss.length === 0) return 0;
  var idx = ss.length - 1;
  for (var i = 0; i < ss.length; i++) {
    if (t < ss[i].playStart + ss[i].dur) {
      idx = i;
      break;
    }
  }
  var s = ss[idx];
  var local = Math.min(Math.max(t - s.playStart, 0), s.dur);
  var T = s.authStart + (s.dur > 0 ? local * (s.nat / s.dur) : 0);
  return Math.min(T, d.authoredTotal);
}
var CC_META = Object.assign(Object.create(null), {
  toString: 1,
  toLocaleString: 1,
  valueOf: 1,
  toJSON: 1,
  then: 1,
  constructor: 1,
  hasOwnProperty: 1,
  isPrototypeOf: 1,
  propertyIsEnumerable: 1,
  default: 1
});
function ccCueProxy(table, unknownRef) {
  if (typeof Proxy !== 'function') return table;
  return new Proxy(table, {
    get: function (target, prop) {
      if (typeof prop !== 'string' || prop in target) return target[prop];
      if (CC_META[prop] || prop.indexOf('@@') === 0) return Object.prototype[prop];
      unknownRef.current[prop] = true;
      return NaN;
    }
  });
}
function CcUnknownWatch(props) {
  var tl = useTimeline();
  React.useEffect(function () {
    var next = Object.keys(props.unknownRef.current).sort().join(', ');
    if (next !== props.badge) props.setBadge(next);
  }, [tl.time]);
  return null;
}
function CompositionClock(props) {
  var tl = useTimeline();
  var d = props.derived;
  var T = ccWarp(d, tl.time);
  var value = React.useMemo(function () {
    return {
      T: T,
      CUES: props.cues,
      time: tl.time,
      duration: tl.duration,
      authoredTotal: d.authoredTotal,
      playing: tl.playing || tl.extPlaying === true
    };
  }, [T, props.cues, tl.time, tl.duration, d, tl.playing, tl.extPlaying]);
  return /*#__PURE__*/React.createElement(CompositionContext.Provider, {
    value: value
  }, props.children);
}
function Shot(props) {
  var c = useComposition();
  var from = +props.from;
  var to = props.to == null ? Infinity : +props.to;
  var on = isFinite(from) && c.T >= from && c.T < to;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      visibility: on ? 'visible' : 'hidden'
    }
  }, props.children);
}
var CAPTION_FADE = 0.18;
function Captions(props) {
  var c = useComposition();
  var t = c.T;
  var items = (props.items || []).filter(function (it) {
    return it && isFinite(+it.at);
  }).sort(function (a, b) {
    return a.at - b.at;
  });
  var active = null;
  var end = Infinity;
  for (var i = 0; i < items.length; i++) {
    if (t < items[i].at) break;
    active = items[i];
    end = typeof active.until === 'number' && isFinite(active.until) ? active.until : i + 1 < items.length ? items[i + 1].at : Infinity;
  }
  if (!active || t >= end) return null;
  var o = Math.min(1, (t - active.at) / CAPTION_FADE);
  if (isFinite(end)) o = Math.min(o, (end - t) / CAPTION_FADE);
  o = Math.max(0, Math.min(1, o));
  return /*#__PURE__*/React.createElement("div", {
    "data-om-caption": true,
    style: Object.assign({
      position: 'absolute',
      left: '8%',
      right: '8%',
      bottom: '7%',
      textAlign: 'center',
      opacity: o,
      pointerEvents: 'none',
      font: '500 30px Inter, system-ui, sans-serif',
      color: '#f6f4ef',
      textShadow: '0 1px 14px rgba(0,0,0,0.45)'
    }, props.style)
  }, active.text);
}
function CompositionStage(props) {
  var width = +props.width || 1280;
  var height = +props.height || 720;
  var bg = props.bg || '#0b0b0e';
  var autoplay = props.autoplay == null ? true : String(props.autoplay) !== 'false';
  var loop = props.loop == null ? true : String(props.loop) !== 'false';
  var state = React.useState(props.scenes);
  var raw = state[0];
  var setRaw = state[1];
  var scenes = React.useMemo(function () {
    return ssParse(raw);
  }, [raw]);
  var pstate = React.useState(props.playback);
  var praw = pstate[0];
  var setPraw = pstate[1];
  var pb = React.useMemo(function () {
    return ppParse(praw);
  }, [praw]);
  var unknownRef = React.useRef({});
  var badgeState = React.useState('');
  var badge = badgeState[0];
  var setBadge = badgeState[1];
  var derived = React.useMemo(function () {
    unknownRef.current = {};
    return scenes ? ccDerive(scenes) : null;
  }, [scenes]);
  var cues = React.useMemo(function () {
    return derived ? ccCueProxy(derived.table, unknownRef) : null;
  }, [derived]);
  React.useEffect(function () {
    var next = Object.keys(unknownRef.current).sort().join(', ');
    if (next !== badge) setBadge(next);
  });
  if (!scenes) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0e',
        color: '#c96442',
        font: '500 16px Inter, system-ui, sans-serif',
        textAlign: 'center'
      }
    }, "animations-v3: the scenes prop isn't a valid JSON scene list", /*#__PURE__*/React.createElement("br", null), "(expected '[", '{', "\"name\":\"\u2026\",\"dur\":N", '}', ", \u2026]')");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stage, {
    width: width,
    height: height,
    duration: derived.total,
    background: bg,
    autoplay: autoplay,
    loop: loop,
    playback: pb
  }, /*#__PURE__*/React.createElement(SceneSync, {
    raw: raw,
    onUpdate: setRaw
  }), typeof praw === 'string' && praw !== '' && /*#__PURE__*/React.createElement(PlaybackSync, {
    raw: praw,
    onUpdate: setPraw
  }), /*#__PURE__*/React.createElement(CompositionClock, {
    derived: derived,
    cues: cues
  }, props.children), /*#__PURE__*/React.createElement(CcUnknownWatch, {
    unknownRef: unknownRef,
    badge: badge,
    setBadge: setBadge
  })), badge !== '' &&
  /*#__PURE__*/
  // Sibling of Stage, outside the exportable <svg>: visible in the
  // preview (and its screenshots), never in the exported video.
  React.createElement("div", {
    "data-om-unknown-cues": true,
    style: {
      position: 'absolute',
      left: 12,
      bottom: 56,
      zIndex: 10,
      padding: '6px 10px',
      borderRadius: 6,
      background: 'rgba(0,0,0,0.72)',
      color: '#e8906a',
      font: '500 12px Inter, system-ui, sans-serif',
      pointerEvents: 'none'
    }
  }, "choreography references unknown section", badge.indexOf(',') >= 0 ? 's' : '', ": ", badge));
}

// Strokes as layers: paint multiplies, so stroke images stacked with
// mix-blend-mode:multiply over the paper reproduce the flat render.

var WC_PIXEL_CAP = 11000000;
function wcLayerOpts(props) {
  var w = +props.width || 900,
    h = +props.height || 1200;
  var askScale = +props.scale || 1;
  return {
    width: w,
    height: h,
    scale: Math.min(askScale, Math.sqrt(WC_PIXEL_CAP / (w * h))),
    seed: props.seed == null ? undefined : +props.seed,
    quality: props.quality == null ? undefined : +props.quality
  };
}
var wcWarned = {};
function wcWarnOnce(key, message, err) {
  if (wcWarned[key]) return;
  wcWarned[key] = true;
  console.warn(message, err);
}
function useWatercolorLayers(painting, opts) {
  var kit = window.WatercolorKit;
  if (typeof painting !== 'function' || !kit || typeof kit.layers !== 'function') return null;
  try {
    return kit.layers(painting, wcLayerOpts(opts || {}));
  } catch (e) {
    wcWarnOnce('layers:' + e, 'watercolor painting failed to build; rendering the fallback sheet', e);
    return null;
  }
}
var WatercolorSheetContext = React.createContext(null);
function WatercolorSheet(props) {
  var L = props.layers || null;
  var style = Object.assign({
    position: 'relative',
    display: 'block',
    width: '100%',
    aspectRatio: L ? L.width + ' / ' + L.height : '3 / 4',
    isolation: 'isolate',
    overflow: 'hidden'
  }, props.style);
  if (!L) {
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign(style, {
        background: '#f4f1e8',
        color: '#8a8270',
        font: '12px system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
    }, "watercolor-kit.js not loaded (or the painting failed to build)");
  }
  return /*#__PURE__*/React.createElement(WatercolorSheetContext.Provider, {
    value: L
  }, /*#__PURE__*/React.createElement("div", {
    style: style,
    "data-om-watercolor-sheet": true
  }, /*#__PURE__*/React.createElement("img", {
    src: L.paper,
    alt: props.alt || '',
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'block'
    }
  }), props.children));
}
function WatercolorStroke(props) {
  var fromSheet = React.useContext(WatercolorSheetContext);
  var L = props.layers || fromSheet;
  if (!L) return null;
  var i = +props.index;
  if (!(i >= 0) || i >= L.count) return null;
  var at = props.at == null ? 1 : clamp(+props.at, 0, 1);
  if (!(at > 0)) return null;
  var box, src;
  try {
    box = L.box(i);
    src = box ? L.src(i, at) : null;
  } catch (e) {
    wcWarnOnce('stroke:' + i + ':' + e, 'watercolor stroke ' + i + ' failed to render; skipping it', e);
    return null;
  }
  if (!box || !src) return null;
  var style = Object.assign({
    position: 'absolute',
    display: 'block',
    left: box.x * 100 + '%',
    top: box.y * 100 + '%',
    width: box.w * 100 + '%',
    height: box.h * 100 + '%',
    mixBlendMode: L.kind(i) === 'reserve' ? 'normal' : 'multiply',
    pointerEvents: 'none'
  }, props.style);
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    "data-om-watercolor-stroke": i,
    "data-om-stroke-kind": L.kind(i),
    style: style
  });
}

// The default watercolor moment: the painting assembled from its strokes,
// each appearing in painting order (a pure function of T).
function WatercolorPainting(props) {
  var c = useComposition();
  var from = +props.from || 0;
  var to = props.to == null ? from + 6 : +props.to;
  var u = clamp((c.T - from) / Math.max(to - from, 0.001), 0, 1);
  var eased = Easing.easeInOutQuad(u);
  var L = useWatercolorLayers(props.painting, props);
  var tick = React.useState(0)[1];
  var warmed = React.useRef(null);
  React.useEffect(function () {
    if (!L || typeof L.warm !== 'function') return;
    var p = L.warm();
    if (warmed.current === p) return;
    var live = true;
    p.then(function () {
      warmed.current = p;
      if (live) tick(function (x) {
        return x + 1;
      });
    });
    return function () {
      live = false;
    };
  }, [L && L.paper, props.painting]);
  var strokes = [];
  if (L) {
    for (var i = 0; i < L.count; i++) {
      var sp = L.span(i);
      var at = clamp((eased - sp.from) / Math.max(sp.to - sp.from, 1e-6), 0, 1);
      if (at <= 0) break;
      strokes.push(/*#__PURE__*/React.createElement(WatercolorStroke, {
        key: i,
        layers: L,
        index: i,
        at: at
      }));
    }
  }
  return /*#__PURE__*/React.createElement(WatercolorSheet, {
    layers: L,
    style: props.style,
    alt: props.alt
  }, strokes);
}

// Paint-on watercolor reveal as a pure function of T — an <img> with a data:
// URL (the exporter serializes those as-is; a live canvas would export blank).
function WatercolorReveal(props) {
  var c = useComposition();
  var from = +props.from || 0;
  var to = props.to == null ? from + 6 : +props.to;
  var u = clamp((c.T - from) / Math.max(to - from, 0.001), 0, 1);
  var style = Object.assign({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }, props.style);
  var frames = Array.isArray(props.frames) && props.frames.length ? props.frames : null;
  var steps = frames ? frames.length - 1 : Math.max(1, Math.round(+props.steps || 36));
  var i = Math.min(steps, Math.round(Easing.easeInOutQuad(u) * steps));
  var painting = typeof props.painting === 'function' ? props.painting : null;
  var kit = window.WatercolorKit;
  var w = +props.width || 900,
    h = +props.height || 1200;
  var askScale = +props.scale || Math.min(2, window.devicePixelRatio || 1);
  var opts = {
    width: w,
    height: h,
    scale: Math.min(askScale, Math.sqrt(11000000 / (w * h))),
    seed: props.seed == null ? undefined : +props.seed,
    steps: steps,
    type: props.format || 'image/jpeg',
    quality: props.quality == null ? 0.88 : +props.quality
  };
  var key = opts.width + 'x' + opts.height + '#' + opts.seed + '@' + opts.scale + '/' + steps + ':' + opts.type + '/' + opts.quality;
  var cache = React.useRef({
    fn: null,
    key: '',
    frames: {},
    baking: false
  }).current;
  var tick = React.useState(0)[1];
  if (cache.fn !== painting && String(cache.fn) !== String(painting) || cache.key !== key) {
    cache.key = key;
    cache.frames = {};
    cache.baking = false;
  }
  cache.fn = painting;
  React.useEffect(function () {
    if (frames || cache.baking || !painting || !kit || typeof kit.bake !== 'function') return;
    cache.baking = true;
    var target = cache.frames;
    try {
      kit.bake(painting, opts, function (n, _t, url) {
        target[n] = url;
      }).then(function (all) {
        if (cache.frames !== target) return;
        for (var n = 0; n < all.length; n++) target[n] = all[n];
        tick(function (x) {
          return x + 1;
        });
      }).catch(function () {
        /* failed bake: the guarded lazy path below still renders */
      });
    } catch (e) {
      /* oversized painting: the guarded lazy path below still renders */
    }
  });
  if (frames) return /*#__PURE__*/React.createElement("img", {
    src: frames[i],
    alt: props.alt || '',
    style: style
  });
  if (!kit || !painting) {
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign({
        width: '100%',
        height: '100%',
        background: '#f4f1e8',
        color: '#8a8270',
        font: '12px system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }, props.style)
    }, "watercolor-kit.js not loaded (or no painting function)");
  }
  if (!cache.frames[i]) {
    try {
      cache.frames[i] = kit.frame(painting, Object.assign({}, opts, {
        at: i / steps
      }));
    } catch (e) {
      return /*#__PURE__*/React.createElement("div", {
        style: Object.assign({
          width: '100%',
          height: '100%',
          background: '#f4f1e8',
          color: '#8a8270',
          font: '12px system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }, props.style)
      }, "painting too large to render (", String(e && e.message).slice(0, 80), ")");
    }
  }
  return /*#__PURE__*/React.createElement("img", {
    src: cache.frames[i],
    alt: props.alt || '',
    style: style
  });
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Stage,
  PlaybackBar,
  CompositionStage,
  useComposition,
  Shot,
  Captions,
  WatercolorReveal,
  WatercolorPainting,
  WatercolorSheet,
  WatercolorStroke,
  useWatercolorLayers
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/tour/animations-v3.jsx", error: String((e && e.message) || e) }); }

// ui_kits/tour/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/tour/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.PackPieces = __ds_scope.PackPieces;

__ds_ns.SeasonRing = __ds_scope.SeasonRing;

__ds_ns.SourceList = __ds_scope.SourceList;

__ds_ns.STAGES = __ds_scope.STAGES;

__ds_ns.StageTrack = __ds_scope.StageTrack;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.CheckBadge = __ds_scope.CheckBadge;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.StateBlock = __ds_scope.StateBlock;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextArea = __ds_scope.TextArea;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.PIPELINE_STAGE_NAMES = __ds_scope.PIPELINE_STAGE_NAMES;

__ds_ns.LIMITS = __ds_scope.LIMITS;

})();
