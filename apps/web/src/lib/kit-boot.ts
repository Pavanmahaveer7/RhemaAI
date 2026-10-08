import React from "react";
import * as ReactDOM from "react-dom";
import { flushSync } from "react-dom";
import { transform } from "@babel/standalone";

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM & { flushSync: typeof flushSync };
    Babel?: { transform: typeof transform };
    CAApi?: {
      ready: Promise<unknown>;
      hydrate?: () => Promise<unknown>;
      session: () => { kind?: string } | null;
      syncCasession?: (s: unknown) => void;
      isLive?: () => boolean;
      guest?: () => Promise<unknown>;
      hydratePipeline?: () => Promise<string | null>;
      sendCheckin?: (form: Record<string, unknown>) => Promise<{ res: string; reply?: string; error?: string }>;
      decide?: (id: string, v: string) => Promise<unknown>;
      signout?: () => Promise<unknown>;
      put?: (path: string, body: unknown) => Promise<unknown>;
    };
    CA_PIPE?: { me?: { pid?: string; church?: string; country?: string; region?: string; alsoLeader?: boolean }; queue?: { id: string; decisions?: { decision: string }[] }[]; stages?: unknown };
    CAHasLeaderCap?: () => boolean;
    PastorHome?: React.ComponentType<Record<string, unknown>>;
    PastorTracks?: React.ComponentType<Record<string, unknown>>;
    PastorPack?: React.ComponentType<Record<string, unknown>>;
    PastorCheckin?: React.ComponentType<Record<string, unknown>>;
    CheckinConsent?: React.ComponentType<{ onContinue: (v: unknown) => void }>;
    CheckinResult?: React.ComponentType<Record<string, unknown>>;
    RegisterChurch?: React.ComponentType<{ done: () => void }>;
    AlertsScreen?: React.ComponentType;
    IntegrationsScreen?: React.ComponentType<Record<string, unknown>>;
    ChurchSignin?: React.ComponentType<Record<string, unknown>>;
    EmbedPreview?: React.ComponentType<{ back: () => void }>;
    ConnectedChurch?: React.ComponentType<Record<string, unknown>>;
    ReviewerQueue?: React.ComponentType<Record<string, unknown>>;
    ReviewFlow?: React.ComponentType<Record<string, unknown>>;
    AdminScreen?: React.ComponentType<{ tab?: string }>;
    PfUnavailable?: React.ComponentType;
    useWide?: (bp?: number) => boolean;
    csChurch?: () => { name?: string; country?: string; region?: string } | null;
    CAHydrate?: () => Promise<unknown> | void;
    CAGuard?: { lockdown?: () => boolean; plain?: () => void; forced?: () => string | null };
    CASession?: { get: () => { kind?: string; name?: string } | null; set: (s: unknown) => void };
    CAGo?: (route: string, t?: string, extra?: Record<string, unknown>) => void;
    GuideModal?: React.ComponentType<{ open: boolean; onClose: () => void; variant?: string; go?: (id: string) => void }>;
    GuideBanner?: React.ComponentType<{ variant?: string; go?: (id: string) => void; onOpenGuide?: () => void }>;
    GuideHeaderButton?: React.ComponentType<{ onClick: () => void; label?: string }>;
    CAPrefs?: { get: () => Record<string, unknown>; set: (patch: Record<string, unknown>) => void };
    SearchScreen?: React.ComponentType<{ open: (t: string) => void }>;
    TermScreen?: React.ComponentType<{ term: string; back: () => void; initialExpert?: boolean }>;
    MonthlyScreen?: React.ComponentType<{ go: (route: string, t?: string, extra?: Record<string, unknown>) => void }>;
    PublicMap?: React.ComponentType;
    SettingsScreen?: React.ComponentType<{ go: (route: string, t?: string, extra?: Record<string, unknown>) => void }>;
    AuthScreen?: React.ComponentType<{ go: (route: string, t?: string, extra?: Record<string, unknown>) => void; initialTab?: string }>;
    OnboardingScreen?: React.ComponentType<{ go: (route: string, t?: string, extra?: Record<string, unknown>) => void }>;
    WordEmpty?: React.ComponentType<{ word: string; line: string }>;
    useSession?: () => [{ kind?: string; name?: string } | null, (s: unknown) => void];
    ChurchAIDesignSystem_06db43?: Record<string, unknown>;
  }
}

let booted: Promise<void> | null = null;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[data-kit="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.kit = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

function ensureStyles() {
  if (!document.querySelector("link[data-kit-css]")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/design/styles.css";
    link.dataset.kitCss = "1";
    document.head.appendChild(link);
  }
}

function bootTheme() {
  const base = "/design/";
  const PK = "ca_prefs";
  const DEF = { theme: "dark", palette: "moss", textSize: "default", reduceMotion: false, defaultMode: "normal" };
  let prefs = DEF;
  try {
    prefs = { ...DEF, ...(JSON.parse(localStorage.getItem(PK) || "{}") || {}) };
  } catch {
    prefs = DEF;
  }
  const link = (id: string) => {
    let el = document.getElementById(id) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.id = id;
      el.rel = "stylesheet";
      document.head.appendChild(el);
    }
    return el;
  };
  const apply = () => {
    const light = prefs.theme === "light";
    const pal = link("ca-palette");
    const p = !light && prefs.palette !== "moss" ? prefs.palette : null;
    if (p) pal.href = base + "palettes/" + p + ".css";
    else pal.removeAttribute("href");
    const lt = link("ca-light");
    if (light) lt.href = base + "palettes/light.css";
    else lt.removeAttribute("href");
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    document.documentElement.style.zoom = prefs.textSize === "large" ? "1.12" : "";
    document.documentElement.toggleAttribute("data-reduce-motion", !!prefs.reduceMotion);
  };
  apply();
  window.CAPrefs = {
    get: () => prefs,
    set(patch: Record<string, unknown>) {
      prefs = { ...prefs, ...patch };
      localStorage.setItem(PK, JSON.stringify(prefs));
      apply();
      window.dispatchEvent(new Event("ca-prefs"));
    },
  };
  let session: unknown = null;
  try {
    session = JSON.parse(localStorage.getItem("ca_session") || "null");
  } catch {
    session = null;
  }
  window.CASession = {
    get: () => session as { kind?: string; name?: string } | null,
    set(s: unknown) {
      session = s;
      if (s) localStorage.setItem("ca_session", JSON.stringify(s));
      else localStorage.removeItem("ca_session");
      window.dispatchEvent(new Event("ca-session"));
    },
  };
}

async function loadJsx(path: string) {
  const src = await fetch(path, { cache: "no-store" }).then((r) => {
    if (!r.ok) throw new Error(path);
    return r.text();
  });
  const out = transform(src, { presets: ["react"], filename: path }).code;
  if (!out) throw new Error("Babel produced no code for " + path);
  const run = new Function("React", "ReactDOM", out);
  run(React, { ...ReactDOM, flushSync });
}

export function bootKit() {
  if (booted) return booted;
  booted = (async () => {
    window.React = React;
    window.ReactDOM = { ...ReactDOM, flushSync };
    ensureStyles();
    bootTheme();
    await loadScript("/design/_ds_bundle.js");
    await loadScript("/design/ui_kits/guard.js?v=3");
    if (window.CAGuard) {
      window.CAGuard.plain = () => {
        location.replace("/design/ui_kits/plain.html");
      };
    }
    await loadScript("/design/ui_kits/confirm.js");
    await loadScript("/design/ui_kits/i18n.js");
    await loadScript("/design/ui_kits/input.js");
    await loadScript("/design/ui_kits/rhythm.js");
    await loadScript("/design/ui_kits/public/data.js");
    await loadScript("/design/ui_kits/pipeline/data.js");
    const ds = window.ChurchAIDesignSystem_06db43 as { STAGES?: unknown } | undefined;
    if (window.CA_PIPE && ds?.STAGES) window.CA_PIPE.stages = ds.STAGES;
    await loadScript("/design/ui_kits/api.js");
    await loadScript("/design/ui_kits/hydrate.js");
    await loadScript("/design/ui_kits/public/curious.js");
    await loadScript("/design/ui_kits/messy.js");
    await loadScript("/design/ui_kits/public/faithData.js");
    await loadScript("/design/ui_kits/public/verses.js");
    const jsx = [
      "/design/ui_kits/GuidePanel.jsx",
      "/design/ui_kits/public/Shell.jsx",
      "/design/ui_kits/public/SearchScreen.jsx",
      "/design/ui_kits/public/TermScreen.jsx",
      "/design/ui_kits/public/MonthlyScreen.jsx",
      "/design/ui_kits/public/GraphScreen.jsx",
      "/design/ui_kits/public/MapScreen.jsx",
      "/design/ui_kits/public/AuthScreen.jsx",
      "/design/ui_kits/public/Onboarding.jsx",
      "/design/ui_kits/public/SettingsScreen.jsx",
      "/design/ui_kits/public/AccountsScreen.jsx",
      "/design/ui_kits/public/MapDraft.jsx",
      "/design/ui_kits/public/BetaFeedbackAdmin.jsx",
      "/design/ui_kits/public/AdminScreen.jsx",
      "/design/ui_kits/pipeline/PastorScreens.jsx",
      "/design/ui_kits/pipeline/ReviewerScreens.jsx",
      "/design/ui_kits/pipeline/IntegrationsScreen.jsx",
      "/design/ui_kits/pipeline/EmbedPreview.jsx",
      "/design/ui_kits/pipeline/PipelineFlow.jsx",
      "/design/ui_kits/pipeline/ChurchScreens.jsx",
    ];
    for (const p of jsx) await loadJsx(p);
    if (window.CAApi?.ready) await window.CAApi.ready;
    if (window.CAHydrate) await window.CAHydrate();
    const liveSession = window.CAApi?.session?.();
    if (liveSession && window.CAApi?.syncCasession) window.CAApi.syncCasession(liveSession);
  })();
  return booted;
}

export function useSessionState() {
  const [s, setS] = React.useState(() => (typeof window !== "undefined" ? window.CASession?.get() ?? null : null));
  React.useEffect(() => {
    const f = () => setS(window.CASession?.get() ?? null);
    window.addEventListener("ca-session", f);
    return () => window.removeEventListener("ca-session", f);
  }, []);
  return s;
}
