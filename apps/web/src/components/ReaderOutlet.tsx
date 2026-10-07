"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ReaderChrome from "@/src/components/ReaderChrome";
import { goPath, roleHome } from "@/src/lib/paths";

type Screen = "search" | "term" | "month" | "map" | "settings" | "signin" | "welcome" | "intro" | "staff";

export default function ReaderOutlet({
  screen,
  term,
  step,
}: {
  screen: Screen;
  term?: string;
  step?: string;
}) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();

  const go = (route: string, t?: string, extra?: Record<string, unknown>) => {
    const next = goPath(route, t, extra);
    if (route === "intro") router.replace(next);
    else router.push(next);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.CAGo = go;
  });

  useEffect(() => {
    if (sp.get("guest") === "1") {
      try {
        localStorage.setItem("ca_guest_first", "1");
        localStorage.setItem("ca_onboarded", "1");
      } catch {
        /* ignore */
      }
      if (!window.CASession?.get()) window.CASession?.set({ kind: "guest", name: "Guest" });
    }
  }, [sp]);

  useEffect(() => {
    const s = window.CAApi?.session?.() || window.CASession?.get();
    if (!s?.kind) return;
    if (["pastor", "reviewer", "leader", "mentor", "expert", "admin"].includes(s.kind)) {
      if (["/welcome", "/welcome/1", "/welcome/2", "/welcome/3", "/welcome/4", "/staff", "/signin"].includes(path || "")) router.replace(roleHome(s.kind));
    }
  }, [path, router]);

  const bare = screen === "signin" || screen === "welcome" || screen === "intro" || screen === "staff";

  let body: React.ReactNode = null;
  if (screen === "search" && window.SearchScreen) body = <window.SearchScreen open={(t) => go("term", t)} />;
  else if (screen === "term" && window.TermScreen) body = <window.TermScreen key={term} term={term || "karma"} back={() => go("search")} />;
  else if (screen === "month" && window.MonthlyScreen) body = <window.MonthlyScreen go={go} />;
  else if (screen === "map" && window.PublicMap) body = <window.PublicMap />;
  else if (screen === "settings" && window.SettingsScreen) body = <window.SettingsScreen go={go} />;
  else if ((screen === "signin" || screen === "staff") && window.AuthScreen) {
    body = <window.AuthScreen go={go} initialTab="signin" />;
  } else if ((screen === "welcome" || screen === "intro") && window.OnboardingScreen) {
    body = <window.OnboardingScreen go={go} />;
  }

  return <ReaderChrome bare={bare}>{body}</ReaderChrome>;
}
