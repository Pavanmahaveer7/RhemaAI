"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionState } from "@/src/lib/kit-boot";
import { extraNav } from "@/src/lib/paths";

type Item = { href: string; id: string; label: string; icon: string };

function staffItems(kind: string | undefined): Item[] {
  const pastor: Item[] = [
    { href: "/care", id: "home", label: "Home", icon: "house" },
    { href: "/care/tracks", id: "tracks", label: "Tracks", icon: "columns-3" },
    { href: "/care/pack", id: "pack", label: "Monthly pack", icon: "package" },
    { href: "/care/checkin", id: "checkin", label: "Check-in", icon: "heart-handshake" },
  ];
  if (kind === "reviewer") return [{ href: "/review", id: "queue", label: "Queue", icon: "list-checks" }];
  if (kind === "leader") return [{ href: "/alerts", id: "alerts", label: "Regional alerts", icon: "siren" }];
  if (kind === "admin") {
    return [
      ...pastor,
      { href: "/review", id: "queue", label: "Queue", icon: "list-checks" },
      { href: "/alerts", id: "alerts", label: "Regional alerts", icon: "siren" },
      { href: "/admin/map", id: "admin-map", label: "Map draft", icon: "waypoints" },
      { href: "/admin/accounts", id: "admin-accounts", label: "Accounts", icon: "users" },
    ];
  }
  const nav = pastor.slice();
  if (typeof window !== "undefined" && window.CAHasLeaderCap && window.CAHasLeaderCap()) {
    nav.push({ href: "/alerts", id: "alerts", label: "Regional alerts", icon: "siren" });
  }
  return nav;
}

function currentId(path: string) {
  if (path.startsWith("/care/checkin")) return "checkin";
  if (path.startsWith("/care/tracks")) return "tracks";
  if (path.startsWith("/care/pack")) return "pack";
  if (path.startsWith("/care/apps") || path.startsWith("/care/register")) return "home";
  if (path.startsWith("/review")) return "queue";
  if (path.startsWith("/alerts")) return "alerts";
  if (path.startsWith("/admin/accounts")) return "admin-accounts";
  if (path.startsWith("/admin")) return "admin-map";
  return "home";
}

function Icon({ name, active }: { name: string; active?: boolean }) {
  const DS = window.ChurchAIDesignSystem_06db43 as { Icon?: ComponentType<{ name: string; size: number; weight?: string; color?: string }> } | undefined;
  if (DS?.Icon) return <DS.Icon name={name} size={18} weight={active ? "fill" : "regular"} color={active ? "var(--lamp-400)" : "currentColor"} />;
  return <span>{name.slice(0, 1)}</span>;
}

function Wordmark() {
  const DS = window.ChurchAIDesignSystem_06db43 as { Wordmark?: ComponentType<{ size: number }> } | undefined;
  if (DS?.Wordmark) return <DS.Wordmark size={19} />;
  return <span style={{ font: "800 18px/1 Georgia, serif", color: "var(--text-strong)" }}>Rhema.ai</span>;
}

export default function StaffChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/care";
  const router = useRouter();
  const session = useSessionState();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const f = () => setWide(window.innerWidth >= 900);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  const items = staffItems(session?.kind);
  const top = currentId(path);
  const extras = extraNav(session?.kind).filter((e) => !items.some((i) => i.href === e.href));

  const signOut = () => {
    if (window.CAApi?.signout) window.CAApi.signout().finally(() => router.push("/search"));
    else router.push("/search");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: wide ? "row" : "column", background: "var(--surface-page, #0b0f0c)" }}>
      {wide ? (
        <aside style={{ width: 240, flex: "none", borderRight: "1px solid var(--border-subtle, #324034)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 0, height: "100vh", boxSizing: "border-box" }}>
          <Link href="/" aria-label="Rhema.ai home" style={{ padding: "0 8px 12px", textDecoration: "none" }}>
            <Wordmark />
          </Link>
          <Link href="/search" style={{ display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 10px", borderRadius: 8, textDecoration: "none", color: "var(--text-muted)", font: "600 13px/1 var(--font-body, system-ui)" }}>
            <Icon name="book-open" />
            Dictionary
          </Link>
          <nav aria-label="Staff" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((t) => (
              <Link key={t.href} href={t.href} aria-current={top === t.id ? "page" : undefined} style={{ display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 10px", borderRadius: 8, textDecoration: "none", background: top === t.id ? "var(--surface-raised, #1a211c)" : "transparent", color: top === t.id ? "var(--text-strong, #f3f7ee)" : "var(--text-muted, #b8c4b8)", font: "600 13px/1 var(--font-body, system-ui)" }}>
                <Icon name={t.icon} active={top === t.id} />
                {t.label}
              </Link>
            ))}
            {extras.map((e) => (
              <Link key={e.href} href={e.href} style={{ display: "flex", alignItems: "center", height: 40, padding: "0 10px", color: "var(--lamp-400)", textDecoration: "none", font: "600 13px/1 var(--font-body, system-ui)" }}>
                {e.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
            <Link href="/help#staff" style={{ display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 10px", color: "var(--text-muted)", textDecoration: "none", font: "600 13px/1 var(--font-body, system-ui)" }}>
              How Staff works
            </Link>
            <button type="button" onClick={signOut} style={{ display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 10px", border: 0, background: "transparent", cursor: "pointer", color: "var(--text-muted)", font: "600 13px/1 var(--font-body, system-ui)" }}>
              Sign out
            </button>
            <Link href="/settings" style={{ display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 10px", color: "var(--text-muted)", textDecoration: "none", font: "600 13px/1 var(--font-body, system-ui)" }}>
              Settings
            </Link>
          </div>
        </aside>
      ) : (
        <header style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", gap: 12, height: 60, padding: "0 16px", borderBottom: "1px solid var(--border-subtle, #324034)" }}>
          <Link href="/" aria-label="Rhema.ai home" style={{ textDecoration: "none" }}>
            <Wordmark />
          </Link>
          <div style={{ flex: 1 }} />
          <button type="button" onClick={signOut} aria-label="Sign out" style={{ width: 44, height: 44, border: 0, background: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <Icon name="log-out" />
          </button>
        </header>
      )}
      <main style={{ flex: 1, minWidth: 0, padding: wide ? "36px 40px 48px" : "24px 16px 96px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>{children}</div>
      </main>
      {!wide && items.length > 1 && (
        <nav aria-label="Staff" style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 64, display: "grid", gridTemplateColumns: `repeat(${items.length},1fr)`, borderTop: "1px solid var(--border-subtle, #324034)", background: "color-mix(in srgb, var(--ink-0, #0b0f0c) 94%, transparent)", zIndex: 30 }}>
          {items.map((t) => (
            <Link key={t.href} href={t.href} style={{ background: "none", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: top === t.id ? "var(--lamp-400)" : "var(--text-muted)", font: "700 11px/1 var(--font-body, system-ui)" }}>
              <Icon name={t.icon} active={top === t.id} />
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
