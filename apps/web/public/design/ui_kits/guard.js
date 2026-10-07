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
  function State({ kind, onRetry }) {
    const DS = window.ChurchAIDesignSystem_06db43; const [t, m] = MSG[kind] || MSG.error;
    const id = React.useMemo(rid, []);
    const k = kind === "blocked" ? "unavailable" : kind;
    return React.createElement("div", { style: { maxWidth: "var(--content-read)", width: "100%", margin: "0 auto", padding: "32px var(--gutter-phone)" } },
      React.createElement(DS.StateBlock, { kind: k, title: t || undefined, message: kind === "blocked" ? `This action was blocked. Nothing was saved or sent. Request id: ${id}` : m || undefined, onRetry: kind === "error" ? (onRetry || (() => location.reload())) : undefined }));
  }
  const CRISIS = /(kill myself|end my life|suicid\w*|can.?t go on|want to die|no reason to live|hurt myself|self[- ]?harm|better off dead)/i;
  const PII = [/[\w.+-]+@[\w-]+\.[\w.]+/g, /\+?\d[\d\s().-]{7,}\d/g, /\b\d{1,5}\s+[A-Za-z]+\s+(road|rd|street|st|lane|ln|avenue|ave|block)\b/gi, /\bmy name is\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?/g];
  const pii = s => PII.reduce((n, re) => n + ((String(s || "").match(re) || []).length), 0);
  const redact = s => PII.reduce((t, re) => t.replace(re, "[removed]"), String(s || ""));
  const plainURL = new URL("../plain.html", location.href).href;
  const plain = () => { try { sessionStorage.clear(); } catch (e) {} location.replace(plainURL); };
  const offline = () => forced === "offline" || navigator.onLine === false;
  // Demo mode: inside the Full Demo board (or #demo=1) states resolve instantly — no spinners in front of judges.
  try { window.CA_DEMO = window.self !== window.top || /(^|[#&])demo=1/.test(location.hash); } catch (e) { window.CA_DEMO = true; }
  if (window.CA_DEMO) document.documentElement.setAttribute("data-ca-demo", "");
  window.CAGuard = { plain, offline, injection: s => INJ.test(String(s || "")), crisis: s => CRISIS.test(String(s || "")), pii, redact, reqId: rid, forced: () => forced, State };
})();
