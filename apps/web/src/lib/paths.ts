export type SessionKind =
  | "guest"
  | "member"
  | "pastor"
  | "reviewer"
  | "leader"
  | "mentor"
  | "expert"
  | "admin"
  | string;

export function wordPath(term: string) {
  return `/word/${encodeURIComponent(term)}`;
}

export function goPath(route: string, term?: string, extra?: Record<string, unknown>) {
  switch (route) {
    case "search":
      return "/search";
    case "term":
      return wordPath(term || "karma");
    case "month":
      return "/month";
    case "graph":
      return "/map";
    case "settings":
      return "/settings";
    case "signin":
      return extra?.staff ? "/staff" : "/signin";
    case "welcome":
      return "/welcome";
    case "intro":
      return `/welcome/${Number(extra?.step) || 1}`;
    case "admin":
      if (extra?.tab === "accounts") return "/admin/accounts";
      if (extra?.tab === "feedback") return "/analytics";
      return "/admin/map";
    case "home":
    case "tracks":
    case "pack":
    case "checkin":
    case "result":
    case "register":
    case "integrations":
    case "queue":
    case "review":
    case "alerts":
      return staffPath(route, extra);
    default:
      return "/search";
  }
}

export function staffPath(r: string, extra?: Record<string, unknown>) {
  const id = extra?.id != null ? String(extra.id) : "";
  switch (r) {
    case "home":
      return "/care";
    case "tracks":
      return "/care/tracks";
    case "pack":
      return "/care/pack";
    case "checkin":
      return "/care/checkin";
    case "result":
      return "/care/checkin/result";
    case "register":
      return "/care/register";
    case "integrations":
      return "/care/apps";
    case "signin":
      return extra?.staff ? "/staff" : "/care/apps/connect";
    case "embed":
      return "/care/apps/embed";
    case "church":
      return "/care/apps/church";
    case "alerts":
      return "/alerts";
    case "queue":
      return "/review";
    case "review":
      return id ? `/review/${encodeURIComponent(id)}` : "/review";
    default:
      return "/care";
  }
}

export function pathToStaff(pathname: string) {
  if (pathname.startsWith("/review/") && pathname !== "/review") {
    return { r: "review", id: decodeURIComponent(pathname.split("/")[2] || "") };
  }
  const map: Record<string, { r: string; id?: string }> = {
    "/care": { r: "home" },
    "/care/tracks": { r: "tracks" },
    "/care/pack": { r: "pack" },
    "/care/checkin": { r: "checkin" },
    "/care/checkin/result": { r: "result" },
    "/care/register": { r: "register" },
    "/care/apps": { r: "integrations" },
    "/care/apps/connect": { r: "signin" },
    "/care/apps/embed": { r: "embed" },
    "/care/apps/church": { r: "church" },
    "/review": { r: "queue" },
    "/alerts": { r: "alerts" },
    "/admin/map": { r: "admin-map" },
    "/admin/accounts": { r: "admin-accounts" },
  };
  return map[pathname] || { r: "home" };
}

/** Map leftover prototype hashes to real paths. Faith mode is never a URL. */
export function hashToPath(hash: string): string | null {
  const q = new URLSearchParams(hash.replace(/^#/, ""));
  const r = q.get("r");
  const guest = q.get("guest") === "1";
  if (q.get("staff") === "l3" || q.get("staff") === "pastor") {
    const phone = q.get("staffReg") === "phone" ? "?register=phone" : q.get("staffSignin") === "phone" ? "?signin=phone" : "";
    return "/staff" + phone;
  }
  if (!r) return guest ? "/search?guest=1" : null;
  if (r === "term") return wordPath(q.get("t") || "karma");
  if (r === "intro") return `/welcome/${q.get("step") || "1"}`;
  if (r === "search") return guest ? "/search?guest=1" : "/search";
  if (["home", "tracks", "pack", "checkin", "result", "register", "integrations", "queue", "review", "alerts", "embed", "church"].includes(r)) {
    return staffPath(r, { id: q.get("id") || undefined, role: q.get("role") || undefined });
  }
  return goPath(r, q.get("t") || undefined, { tab: q.get("tab") || "", step: q.get("step") || "" });
}

export function roleHome(kind: SessionKind | undefined) {
  if (kind === "leader") return "/alerts";
  if (kind === "reviewer") return "/review";
  if (kind === "admin") return "/admin/map";
  if (kind === "pastor" || kind === "mentor" || kind === "expert") return "/care";
  return "/search";
}

export function extraNav(kind: SessionKind | undefined) {
  const items: { href: string; label: string }[] = [];
  if (!kind) return items;
  if (["pastor", "mentor", "expert", "admin"].includes(kind)) items.push({ href: "/care", label: "Care" });
  if (["reviewer", "admin"].includes(kind)) items.push({ href: "/review", label: "Review" });
  if (["leader", "admin"].includes(kind)) items.push({ href: "/alerts", label: "Alerts" });
  if (kind === "admin") items.push({ href: "/admin/map", label: "Admin" });
  return items;
}
