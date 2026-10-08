"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { extraNav } from "@/src/lib/paths";
import { useSessionState } from "@/src/lib/kit-boot";
import { useEffect, useState } from "react";

const TABS = [
  { href: "/", id: "home", label: "Home", icon: "house" },
  { href: "/search", id: "search", label: "Search", icon: "book-open" },
  { href: "/month", id: "month", label: "Month", icon: "message-square-text" },
  { href: "/map", id: "map", label: "Map", icon: "waypoints" },
  { href: "/settings", id: "settings", label: "Settings", icon: "settings" },
] as const;

function useWide(bp = 860) {
  const [w, setW] = useState(false);
  useEffect(() => {
    const f = () => setW(window.innerWidth >= bp);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, [bp]);
  return w;
}

function Icon({ name, active }: { name: string; active?: boolean }) {
  const DS = window.ChurchAIDesignSystem_06db43 as { Icon?: ComponentType<{ name: string; size: number; weight?: string }> } | undefined;
  if (DS?.Icon) return <DS.Icon name={name} size={20} weight={active ? "fill" : "regular"} />;
  return <span aria-hidden="true">{name.slice(0, 1)}</span>;
}

function Wordmark() {
  const DS = window.ChurchAIDesignSystem_06db43 as { Wordmark?: ComponentType<{ size: number }> } | undefined;
  if (DS?.Wordmark) return <DS.Wordmark size={20} />;
  return <span style={{ font: "800 18px/1 Georgia, serif", color: "var(--text-strong, #f3f7ee)" }}>Rhema.ai</span>;
}

export default function ReaderChrome({ children, bare }: { children: React.ReactNode; bare?: boolean }) {
  const path = usePathname() || "/search";
  const router = useRouter();
  const wide = useWide();
  const session = useSessionState();
  const extras = extraNav(session?.kind);
  const top = path === "/" ? "home" : path.startsWith("/word") ? "search" : path === "/month" ? "month" : path === "/map" ? "map" : path === "/settings" ? "settings" : path.startsWith("/welcome") || path === "/signin" || path === "/staff" ? "" : "search";
  const lk = !!(window.CAGuard?.lockdown && window.CAGuard.lockdown());
  const tabs = lk ? TABS.filter((t) => t.id === "home" || t.id === "search") : TABS;
  const signedIn = session && (session.kind === "member" || session.kind === "admin");
  const [guideOpen, setGuideOpen] = useState(false);
  const GuideBtn = window.GuideHeaderButton;
  const GuideModal = window.GuideModal;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: wide && !bare ? "row" : "column", background: "var(--surface-page, #0b0f0c)" }}>
      {wide && !bare && (
        <nav aria-label="Primary" style={{ width: 220, flex: "none", padding: "20px 12px", borderRight: "1px solid var(--border-subtle, #324034)", display: "flex", flexDirection: "column", gap: 6 }}>
          <Link href="/" aria-label="Rhema.ai home" style={{ padding: "8px 10px", marginBottom: 12, textDecoration: "none" }}>
            <Wordmark />
          </Link>
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} aria-current={top === t.id ? "page" : undefined} style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: "0 12px", borderRadius: 12, textDecoration: "none", font: "600 14px/1 var(--font-body, system-ui)", background: top === t.id ? "var(--surface-raised, #1a211c)" : "transparent", color: top === t.id ? "var(--text-strong, #f3f7ee)" : "var(--text-muted, #b8c4b8)" }}>
              <Icon name={t.icon} active={top === t.id} />
              {t.label}
            </Link>
          ))}
          {extras.map((e) => (
            <Link key={e.href} href={e.href} style={{ minHeight: 44, display: "flex", alignItems: "center", padding: "0 12px", color: "var(--lamp-400, #cfda5c)", textDecoration: "none", font: "600 14px/1 var(--font-body, system-ui)" }}>
              {e.label}
            </Link>
          ))}
        </nav>
      )}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 20, height: 60, display: "flex", alignItems: "center", gap: 16, padding: "0 20px", background: "color-mix(in srgb, var(--ink-0, #0b0f0c) 82%, transparent)", borderBottom: "1px solid var(--border-subtle, #324034)" }}>
          {(!wide || bare) && (
            <Link href="/" aria-label="Rhema.ai home" style={{ textDecoration: "none", display: "flex", alignItems: "center", minHeight: 44 }}>
              <Wordmark />
            </Link>
          )}
          <div style={{ flex: 1 }} />
          {!bare && GuideBtn && <GuideBtn onClick={() => setGuideOpen(true)} />}
          {!bare && !signedIn && (
            <button type="button" onClick={() => router.push("/signin")} style={{ minHeight: 36, padding: "0 14px", borderRadius: 999, border: 0, cursor: "pointer", font: "600 13px/1 var(--font-body, system-ui)", background: "var(--surface-raised, #1a211c)", color: "var(--text-strong, #f3f7ee)" }}>
              Sign in
            </button>
          )}
          {bare && (
            <Link href="/search" style={{ color: "var(--text-muted, #b8c4b8)", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}>
              Skip
            </Link>
          )}
        </header>
        <main style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: wide || bare || lk ? 0 : "calc(64px + env(safe-area-inset-bottom))" }}>{children}</main>
        {!bare && GuideModal && (
          <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} variant="reader" go={(id) => window.CAGo?.(id)} />
        )}
      </div>
      {!wide && !bare && !lk && (
        <nav aria-label="Primary" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30, minHeight: 64, paddingBottom: "env(safe-area-inset-bottom)", display: "grid", gridTemplateColumns: `repeat(${tabs.length},1fr)`, background: "color-mix(in srgb, var(--ink-0, #0b0f0c) 92%, transparent)", borderTop: "1px solid var(--border-subtle, #324034)" }}>
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} aria-current={top === t.id ? "page" : undefined} style={{ background: "none", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: top === t.id ? "var(--lamp-400, #cfda5c)" : "var(--text-muted, #b8c4b8)", font: "700 12px/1 var(--font-body, system-ui)" }}>
              <span style={{ width: 56, height: 30, display: "grid", placeItems: "center", borderRadius: 999, background: top === t.id ? "var(--surface-raised, #1a211c)" : "transparent" }}>
                <Icon name={t.icon} active={top === t.id} />
              </span>
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
