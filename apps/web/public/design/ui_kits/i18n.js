// Interface translation for all 3 layers. Covers interface text only: labels, buttons, messages.
// Content (definitions, Faith mode text, sources, verses, what people type) is never machine-translated.
// Mark content with data-no-tr. Strings come from the reviewed list in confirm.js (CA_TR), then a cached
// draft list per language. Every draft needs native-speaker review before launch: see contract/i18n.md.
(function () {
  var NAMES = { hi: "Hindi", bn: "Bengali", ne: "Nepali", my: "Burmese (Myanmar)", km: "Khmer" };
  var orig = new WeakMap(), origAttr = new WeakMap(), ATTRS = ["aria-label", "placeholder", "title"];
  var pending = {}, timer = null, busy = false, applying = false, fails = 0;
  var KEEP = { Rhema: 1, ai: 1, "Rhema.ai": 1, "church.ai": 1, "Church AI": 1, "Planning Center": 1 };
  function lang() { return window.CA_LANG || "en"; }
  function cache(l) { try { var c = JSON.parse(localStorage.getItem("ca_tr_" + l)) || {}; Object.keys(KEEP).forEach(function (k) { delete c[k]; }); return c; } catch (e) { return {}; } }
  function save(l, c) { try { localStorage.setItem("ca_tr_" + l, JSON.stringify(c)); } catch (e) {} }
  function wanted(s) { return s && !KEEP[s] && s.length > 1 && s.length < 220 && /[A-Za-z]{2}/.test(s) && !/^[\w.+-]+@|^https?:|^[A-Z]-\d|^[\d\s·.,:%/-]+$/.test(s); }
  function skip(el) { return !el || el.closest("[data-no-tr],[aria-label*=\"Rhema.ai\" i],[aria-label*=\"church.ai\" i],[aria-label*=\"Church AI\"],[data-wordmark],script,style,code,pre,textarea,input,select,option,svg,[contenteditable],[lang]:not(html)"); }
  function look(s, l, c) {
    var r = window.CAtr ? window.CAtr(s) : s; if (r !== s) return r;
    if (c[s]) return c[s];
    pending[s] = 1; if (fails > 2 && Object.keys(pending).length === 1) fails = 0; return null;
  }
  function apply() {
    if (applying || !document.body) return; applying = true;
    var l = lang(), c = l === "en" ? null : cache(l);
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (skip(n.parentElement)) continue;
      if (!orig.has(n) || (n.nodeValue !== orig.get(n).en && n.nodeValue !== orig.get(n).out)) orig.set(n, { en: n.nodeValue, out: null });
      var o = orig.get(n), en = o.en, core = en.trim();
      if (l === "en") { if (n.nodeValue !== en) n.nodeValue = en; o.out = null; continue; }
      if (!wanted(core)) continue;
      var t = look(core, l, c); if (t) { var v = en.replace(core, t); if (n.nodeValue !== v) n.nodeValue = v; o.out = v; }
    }
    document.querySelectorAll("[aria-label],[placeholder],[title]").forEach(function (el) {
      if (el.closest("[data-no-tr]")) return;
      var m = origAttr.get(el) || {}; origAttr.set(el, m);
      ATTRS.forEach(function (a) {
        var cur = el.getAttribute(a); if (cur == null) return;
        if (!(a in m) || (cur !== m[a].en && cur !== m[a].out)) m[a] = { en: cur, out: null };
        if (l === "en") { if (cur !== m[a].en) el.setAttribute(a, m[a].en); return; }
        if (!wanted(m[a].en)) return;
        var t = look(m[a].en, l, c); if (t && cur !== t) { el.setAttribute(a, t); m[a].out = t; }
      });
    });
    applying = false;
    if (l !== "en" && Object.keys(pending).length) { clearTimeout(timer); timer = setTimeout(fetchDrafts, 500); }
  }
  async function fetchDrafts() {
    var l = lang();
    // Live drafts are a design-preview aid only. Outside demo mode only reviewed files ship, and no model is called from the browser.
    if (l === "en" || !window.CA_DEMO || !(window.claude && window.claude.complete)) { pending = {}; return; }
    if (busy) { clearTimeout(timer); timer = setTimeout(fetchDrafts, 400); return; }
    var all = Object.keys(pending), c0 = cache(l); all = all.filter(function (k) { return !c0[k]; });
    var list = all.slice(0, 16); list.forEach(function (k) { delete pending[k]; }); if (!list.length) return; busy = true; var got = 0;
    try {
      var p = "Translate these app interface strings from English into " + NAMES[l] + ". This is a calm, respectful faith-vocabulary app for pastors and students. Keep these exactly as written: church.ai, Planning Center, numbers, ids, and religious terms such as karma, dharma, moksha, nirvana, saṃsāra, mūrti, deva, Theravāda, avatāra, anattā. Use plain everyday words, polite register. Reply ONLY with a JSON object mapping each English string to its translation.\n\n" + JSON.stringify(list);
      var r = await Promise.race([window.claude.complete(p), new Promise(function (_, no) { setTimeout(function () { no(new Error("timeout")); }, 20000); })]);
      var c = cache(l), re = /"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g, mm;
      while ((mm = re.exec(String(r || "")))) { try { var k = JSON.parse('"' + mm[1] + '"'), v = JSON.parse('"' + mm[2] + '"'); if (!KEEP[k] && v.trim() && list.indexOf(k) >= 0) { c[k] = v; got++; } } catch (x) {} }
      if (got) save(l, c);
    } catch (e) {}
    busy = false;
    if (!got) { fails++; if (fails <= 2) list.forEach(function (k) { pending[k] = 1; }); } else fails = 0;
    if (fails > 2) setTimeout(function () { fails = 0; }, 15000);
    if (lang() === l) apply();
    if (Object.keys(pending).length) { clearTimeout(timer); timer = setTimeout(fetchDrafts, got ? 200 : 1500); }
  }
  var obs = new MutationObserver(function () { if (!applying) { clearTimeout(window.__caTrT); window.__caTrT = setTimeout(apply, 60); } });
  function start() { document.documentElement.lang = lang(); loadFile(lang()).then(apply); apply(); obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS }); }
  window.addEventListener("ca-lang", function () { var l = lang(); document.documentElement.lang = l; note(l); loadFile(l).then(apply); apply(); });
  window.addEventListener("storage", function (e) { if (e.key === "ca_lang") { window.CA_LANG = e.newValue || "en"; window.dispatchEvent(new Event("ca-lang")); } });
  // Ready-made language files (ui_kits/i18n/<lang>.json). Loaded first so switching is instant and works offline.
  var BASE = (document.currentScript && document.currentScript.src) || location.href, files = {};
  function loadFile(l) {
    if (l === "en" || files[l]) return Promise.resolve();
    files[l] = fetch(new URL("i18n/" + l + ".json", BASE)).then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) {
      var c = cache(l); Object.keys(j || {}).forEach(function (k) { if (!KEEP[k] && typeof j[k] === "string") c[k] = j[k]; }); save(l, c);
      var A = window.CAApi;
      if (A && !window.CA_DEMO) return A.ready.then(function (ok) {
        if (!ok) return;
        return A.get("/i18n/" + encodeURIComponent(l)).then(function (b) {
          Object.keys((b && b.strings) || {}).forEach(function (k) { if (!KEEP[k] && typeof b.strings[k] === "string") c[k] = b.strings[k]; });
          save(l, c);
        }, function () {});
      });
    }).catch(function () {});
    return files[l];
  }
  function note(l) {
    if (l === "en") return; var n = (window.CA_LANGS || []).find(function (x) { return x[0] === l; }); if (!n) return;
    var el = document.createElement("div"); el.setAttribute("role", "status"); el.setAttribute("data-no-tr", ""); el.lang = l;
    el.textContent = n[1]; el.style.cssText = "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:300;padding:10px 16px;border-radius:999px;background:var(--surface-raised);border:1px solid var(--border-default);color:var(--text-strong);font:600 16px/1.3 var(--font-body);box-shadow:var(--elev-3,0 8px 24px rgba(0,0,0,.35));transition:opacity .3s ease;pointer-events:none";
    document.body.appendChild(el); setTimeout(function () { el.style.opacity = "0"; }, 900); setTimeout(function () { el.remove(); }, 1300);
  }
  function collect() {
    var out = {}, w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    var add = function (t) { t = (t || "").trim(); if (wanted(t) && !(window.CAtr && window.CAtr(t) !== t)) out[t] = 1; };
    while ((n = w.nextNode())) { if (!skip(n.parentElement)) add(orig.has(n) ? orig.get(n).en : n.nodeValue); }
    document.querySelectorAll("[aria-label],[placeholder],[title]").forEach(function (el) { if (el.closest("[data-no-tr]")) return; ATTRS.forEach(function (a) { var m = origAttr.get(el); add(m && m[a] ? m[a].en : el.getAttribute(a)); }); });
    return Object.keys(out);
  }
  window.CAi18n = { apply: apply, cache: cache, collect: collect, pending: function () { return Object.keys(pending).length + (busy ? 1 : 0); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
