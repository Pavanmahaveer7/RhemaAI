import React from "react";
// Heroicons v2 (MIT). Outline 1.5 stroke by default; weight="fill" uses the solid set for the selected tab / nav item only.
// Call sites keep short semantic names; MAP turns them into Heroicons file names.
const CDN = "https://unpkg.com/heroicons@2.1.5/24/";
const MAP = {
  "arrow-left": "arrow-left", "arrow-right": "arrow-right", "arrow-up-right": "arrow-up-right", "arrow-down-right": "arrow-down-right",
  "book-open": "book-open", "building": "building-office-2", "building-2": "building-library", "check": "check",
  "chevron-down": "chevron-down", "chevron-right": "chevron-right", "circle-check": "check-circle", "circle-dashed": "ellipsis-horizontal-circle",
  "circle-dot": "clock", "circle-plus": "plus-circle", "circle-alert": "exclamation-circle", "info": "information-circle",
  "external-link": "arrow-top-right-on-square", "eye": "eye", "eye-off": "eye-slash", "file-plus": "document-plus",
  "file-text": "document-text", "flag": "flag", "hand": "hand-raised", "hard-drive": "device-phone-mobile",
  "heart-handshake": "heart", "key-round": "key", "link-2": "link", "list": "list-bullet",
  "list-checks": "clipboard-document-check", "locate-fixed": "viewfinder-circle", "lock": "lock-closed", "log-out": "arrow-right-start-on-rectangle",
  "mail": "envelope", "map-pin": "map-pin", "merge": "arrows-pointing-in", "message-square-plus": "chat-bubble-bottom-center-text",
  "message-square-text": "chat-bubble-bottom-center-text", "messages-square": "chat-bubble-left-right", "minus": "minus", "paperclip": "paper-clip",
  "pencil": "pencil", "play": "play", "plug": "puzzle-piece", "plus": "plus",
  "power": "power", "receipt": "receipt-percent", "rotate-cw": "arrow-path", "search": "magnifying-glass",
  "send": "paper-airplane", "settings": "cog-6-tooth", "shield": "shield-check", "siren": "bell-alert",
  "trash-2": "trash", "undo-2": "arrow-uturn-left", "upload": "arrow-up-tray", "user": "user",
  "user-check": "check-badge", "user-plus": "user-plus", "user-round-search": "identification", "user-x": "user-minus",
  "users": "users", "venetian-mask": "eye-slash", "waypoints": "share", "x": "x-mark",
  "house": "home", "columns-3": "view-columns", "wifi-off": "signal-slash", "shield-alert": "shield-exclamation",
  "loader": "arrow-path", "inbox": "inbox", "cloud-off": "signal-slash", "book-dashed": "book-open",
  "circle": "ellipsis-horizontal-circle", "hand-heart": "heart", "church": "building-library", "calendar-plus": "calendar-days",
  "bell": "bell", "ban": "prohibit", "circle-help": "question", "sun": "sun", "moon": "moon", "monitor": "computer-desktop",
  "type": "language", "clock": "clock", "calendar": "calendar", "package": "archive-box", "chevron-up": "chevron-up", "sunrise": "sun", "sunset": "moon", "sparkles": "sparkles", "gift": "gift", "bookmark": "bookmark", "share": "share", "copy": "document-duplicate", "globe": "globe-alt", "phone": "device-phone-mobile", "sliders": "adjustments-horizontal", "home": "home", "star": "star", "trophy": "trophy",
};
export function Icon({ name, size = 20, color = "currentColor", label, style, weight = "regular" }) {
  const f = MAP[name] || "ellipsis-horizontal-circle";
  const url = `url(${CDN}${weight === "fill" ? "solid" : "outline"}/${f}.svg)`;
  return (
    <span role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}
      style={{ display: "inline-block", flex: "none", width: size, height: size, background: color,
        WebkitMask: `${url} center / contain no-repeat`, mask: `${url} center / contain no-repeat`, ...style }} />
  );
}
