(() => {
  const base = new URL("../../", location.href).href;
  const PK = "ca_prefs", SK = "ca_session";
  const DEF = { theme: "dark", palette: "moss", textSize: "default", reduceMotion: false, defaultMode: "normal" };
  const hp = new URLSearchParams(location.hash.slice(1));
  const read = (k, d) => { try { return { ...d, ...(JSON.parse(localStorage.getItem(k)) || {}) }; } catch (e) { return { ...d }; } };
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: light)") : null;
  let prefs = read(PK, DEF);
  if (hp.get("theme")) prefs = { ...prefs, ...(hp.get("theme") === "light" ? { theme: "light" } : { theme: "dark", palette: hp.get("theme") }) };
  if (hp.get("rm") === "1") prefs = { ...prefs, reduceMotion: true };
  const link = id => { let l = document.getElementById(id); if (!l) { l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; document.head.appendChild(l); } return l; };
  function apply() {
    const light = prefs.theme === "light" || (prefs.theme === "system" && mq && mq.matches);
    const pal = link("ca-palette"); const p = !light && prefs.palette !== "moss" ? prefs.palette : null;
    if (p) pal.href = base + "palettes/" + p + ".css"; else pal.removeAttribute("href");
    const lt = link("ca-light"); if (light) lt.href = base + "palettes/light.css"; else lt.removeAttribute("href");
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    document.documentElement.style.zoom = prefs.textSize === "large" ? "1.12" : "";
    document.documentElement.toggleAttribute("data-reduce-motion", !!prefs.reduceMotion);
  }
  apply(); if (mq && mq.addEventListener) mq.addEventListener("change", apply);
  const st = document.createElement("style");
  st.textContent = "[data-reduce-motion] *,[data-reduce-motion] *::before,[data-reduce-motion] *::after{animation-duration:1ms!important;animation-iteration-count:1!important;transition-duration:1ms!important}";
  document.head.appendChild(st);
  const tame = () => { if (!document.documentElement.hasAttribute("data-reduce-motion") || !document.getAnimations) return; document.getAnimations().forEach(a => { try { const t = a.effect.getComputedTiming(); if (t.iterations === Infinity || t.duration > 1) { a.effect.updateTiming({ duration: 1, iterations: 1, delay: 0 }); a.finish(); } } catch (e) {} }); };
  const ani = Element.prototype.animate; Element.prototype.animate = function (k, o) { if (document.documentElement.hasAttribute("data-reduce-motion")) o = typeof o === "number" ? 1 : { ...(o || {}), duration: 1, iterations: 1, delay: 0 }; return ani.call(this, k, o); };
  setInterval(tame, 250); document.addEventListener("animationstart", tame, true); document.addEventListener("transitionrun", tame, true);
  const fire = () => window.dispatchEvent(new Event("ca-prefs"));
  window.CAPrefs = { get: () => prefs, set(patch) { prefs = { ...prefs, ...patch }; localStorage.setItem(PK, JSON.stringify(prefs)); apply(); fire(); } };
  const asHash = hp.get("as");
  let session = asHash ? { kind: asHash, name: asHash === "admin" ? "Admin" : asHash === "member" ? "Anonymous reader" : "Guest", email: asHash === "admin" ? "admin@church.ai" : "arif@example.com" } : (() => { try { return JSON.parse(localStorage.getItem(SK)); } catch (e) { return null; } })();
  window.CASession = {
    get: () => session,
    set(s) { session = s; if (!asHash) { if (s) localStorage.setItem(SK, JSON.stringify(s)); else localStorage.removeItem(SK); } window.dispatchEvent(new Event("ca-session")); }
  };
})();
