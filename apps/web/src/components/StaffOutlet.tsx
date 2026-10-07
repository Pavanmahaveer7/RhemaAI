"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StaffChrome from "@/src/components/StaffChrome";
import { pathToStaff, roleHome, staffPath } from "@/src/lib/paths";

const STAFF = ["pastor", "reviewer", "leader", "mentor", "expert", "admin"];

type Ck = { res: string | null; n: number; reply?: string; error?: string };

export default function StaffOutlet() {
  const router = useRouter();
  const path = usePathname() || "/care";
  const { r, id } = pathToStaff(path);
  const [ready, setReady] = useState(false);
  const [consent, setConsentS] = useState<Record<string, unknown> | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("ca_ck_consent") || "null");
    } catch {
      return null;
    }
  });
  const [pco, setPcoS] = useState<boolean | string>(() => {
    const raw = localStorage.getItem("ca_pco") || "on";
    return raw === "off" ? false : raw === "demo" ? "demo" : "on";
  });
  const [flash, setFlash] = useState<string | null>(null);
  const [ckF, setCkF] = useState({ mood: 3, prayed: "yes", visits: "2", struggles: "", wins: "" });
  const [ckDemo, setCkDemo] = useState("steady");
  const [ck, setCk] = useState<Ck>(() => {
    try {
      return JSON.parse(sessionStorage.getItem("ca_ck") || "null") || { res: null, n: 0 };
    } catch {
      return { res: null, n: 0 };
    }
  });
  const [decisions, setDecisions] = useState<Record<string, string>>({});

  const go = (route: string, extra: Record<string, unknown> = {}) => {
    router.push(staffPath(route, extra));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.CAGo = (route, _t, extra) => go(route, extra || {});
  });

  useEffect(() => {
    const s = window.CAApi?.session?.() || window.CASession?.get();
    if (!s?.kind || !STAFF.includes(s.kind)) {
      router.replace("/staff?next=" + encodeURIComponent(path));
      return;
    }
    if (window.CAApi?.session?.() && window.CAApi.hydratePipeline) {
      window.CAApi.hydratePipeline().catch(() => null).finally(() => setReady(true));
    } else setReady(true);
  }, [path, router]);

  const setConsent = (v: Record<string, unknown>) => {
    setConsentS(v);
    localStorage.setItem("ca_ck_consent", JSON.stringify(v));
    if (window.CAApi?.isLive?.()) {
      window.CAApi.put?.("/me/preferences", {
        lang: "en",
        theme: "system",
        reduceMotion: false,
        remindMonthly: false,
        checkinAssistant: !!v.model,
        checkinPlain: !!v.plain,
      }).catch(() => {});
    }
  };
  const setPco = (v: boolean | string) => {
    setPcoS(v);
    localStorage.setItem("ca_pco", String(v || "off"));
  };

  const sendCk = () => {
    const txt = ckF.struggles + " " + ckF.wins;
    setCk((c) => {
      const n = { res: "pending", n: c.n + 1 };
      sessionStorage.setItem("ca_ck", JSON.stringify(n));
      return n;
    });
    go("result");
    if (navigator.onLine === false || window.CAGuard?.forced?.() === "offline") {
      try {
        sessionStorage.setItem("ca_ck_queue", JSON.stringify({ form: { ...ckF }, at: Date.now() }));
      } catch {
        /* ignore */
      }
      setCk((c) => ({ ...c, res: "queued" }));
      return;
    }
    if (window.CAApi?.isLive?.() && window.CAApi.sendCheckin) {
      window.CAApi.sendCheckin(ckF).then((row) => {
        const n = { res: row.res, n: 1, reply: row.reply, error: row.error };
        sessionStorage.setItem("ca_ck", JSON.stringify(n));
        setCk(n);
        if (row.res === "hard" && consent && consent.plain) setTimeout(() => window.CAGuard?.plain?.(), 2200);
      });
      return;
    }
    const res = window.CAGuard && (window.CAGuard as { injection?: (t: string) => boolean; crisis?: (t: string) => boolean }).injection?.(txt)
      ? "blocked"
      : (window.CAGuard as { crisis?: (t: string) => boolean })?.crisis?.(txt)
        ? "hard"
        : ckDemo;
    const n = { res, n: 1 };
    sessionStorage.setItem("ca_ck", JSON.stringify(n));
    setCk(n);
  };

  if (!ready) return <div style={{ minHeight: "100vh", background: "#0b0f0c" }} />;

  const church = (typeof window.csChurch === "function" ? window.csChurch() : null) || { name: window.CA_PIPE?.me?.church };
  const myDecision = decisions[window.CA_PIPE?.me?.pid || ""] || "";
  const myStage = myDecision === "continue" ? 2 : 1;
  const forced = window.CAGuard?.forced?.();
  const gated = !!(forced && forced !== "offline" && !(forced === "unavailable" && r === "review"));

  let body: React.ReactNode = null;
  if (gated && window.CAGuard) {
    const State = (window.CAGuard as { State?: React.ComponentType<{ kind: string }> }).State;
    body = State ? <State kind={forced as string} /> : <p>Unavailable</p>;
  } else if (r === "home" && window.PastorHome) {
    body = <window.PastorHome go={go} joined={!!(typeof window.csChurch === "function" && window.csChurch())} ckDone={!!ck.res && !["failed", "blocked", "pending"].includes(ck.res)} church={church.name} stage={myStage} pco={pco} setPco={setPco} decision={myDecision} />;
  } else if (r === "tracks" && window.PastorTracks) {
    body = <window.PastorTracks go={go} pco={pco} />;
  } else if (r === "pack" && window.PastorPack) {
    body = <window.PastorPack pco={pco} />;
  } else if (r === "checkin") {
    body = consent === null && window.CheckinConsent ? <window.CheckinConsent onContinue={(v) => setConsent((v || {}) as Record<string, unknown>)} /> : window.PastorCheckin ? <window.PastorCheckin f={ckF} setF={setCkF} demo={ckDemo} setDemo={setCkDemo} onSend={sendCk} /> : null;
  } else if (r === "result" && window.CheckinResult) {
    body = <window.CheckinResult ck={ck} wins={ckF.wins} edit={() => go("checkin")} retry={sendCk} />;
  } else if (r === "register" && window.RegisterChurch) {
    body = <window.RegisterChurch done={() => go("home")} />;
  } else if (r === "alerts" && window.AlertsScreen) {
    body = <window.AlertsScreen />;
  } else if (r === "integrations" && window.IntegrationsScreen) {
    body = <window.IntegrationsScreen key={flash || "i"} back={() => go("home")} pco={pco} setPco={setPco} go={(nr: string) => { setFlash(null); go(nr); }} flash={flash} />;
  } else if (r === "signin" && window.ChurchSignin) {
    body = <window.ChurchSignin back={() => go("integrations")} done={(v: string) => { setPco(v); setFlash(v === "demo" ? "Signed in. Demo church connected." : "Signed in. Planning Center connected."); go("integrations"); }} />;
  } else if (r === "embed" && window.EmbedPreview) {
    body = <window.EmbedPreview back={() => go("integrations")} />;
  } else if (r === "church" && window.ConnectedChurch) {
    body = <window.ConnectedChurch back={() => go("integrations")} pco={pco} stage={myStage} />;
  } else if (r === "queue" && window.ReviewerQueue) {
    body = <window.ReviewerQueue open={(qid: string) => go("review", { id: qid })} decisions={decisions} />;
  } else if (r === "review" && window.ReviewFlow) {
    body = <window.ReviewFlow key={id} id={id} back={() => go("queue")} decisions={decisions} decide={(qid: string, v: string) => { setDecisions((d) => ({ ...d, [qid]: v })); window.CAApi?.decide?.(qid, v)?.catch(() => setDecisions((d) => { const n = { ...d }; delete n[qid]; return n; })); }} />;
  } else if (r === "admin-map" && window.AdminScreen) {
    body = <window.AdminScreen tab="map" />;
  } else if (r === "admin-accounts" && window.AdminScreen) {
    body = <window.AdminScreen tab="accounts" />;
  } else if (window.PfUnavailable) {
    body = <window.PfUnavailable />;
  }

  return <StaffChrome>{body}</StaffChrome>;
}

declare global {
  interface Window {
    csChurch?: () => { name?: string; country?: string; region?: string } | null;
  }
}

export function staffKindHome() {
  const s = typeof window !== "undefined" ? window.CAApi?.session?.() || window.CASession?.get() : null;
  return roleHome(s?.kind);
}
