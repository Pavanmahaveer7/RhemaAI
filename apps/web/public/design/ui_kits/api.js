// The one fetch wrapper for the screens (contract/frontend-wiring.md §4).
// Same-origin /api/v1 with the session cookie, 8 s timeout, ApiError with requestId.
// In demo mode, or when no API answers (a static preview), screens keep the sample data.
(function () {
  var BASE = "/api/v1", TIMEOUT = 8000;
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function ApiError(status, body) {
    var e = (body && body.error) || {};
    this.status = status;
    this.kind = e.kind || (status === 0 ? "error" : "unavailable");
    this.code = e.code || (status === 0 ? "network" : "unknown");
    this.message = e.message || "Could not reach Rhema.ai. Try again.";
    this.requestId = e.requestId || null;
    this.retryable = status === 0 || !!e.retryable;
  }

  function call(method, path, body) {
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, TIMEOUT) : null;
    return fetch(BASE + path, {
      method: method,
      credentials: "same-origin",
      headers: body === undefined ? { accept: "application/json" } : { accept: "application/json", "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      if (timer) clearTimeout(timer);
      if (r.status === 204) return null;
      return r.text().then(function (t) {
        var j = null; try { j = t ? JSON.parse(t) : null; } catch (x) {}
        if (!r.ok) throw new ApiError(r.status, j);
        return j;
      });
    }, function () { if (timer) clearTimeout(timer); throw new ApiError(0, null); });
  }

  var live = false, session = null, activeAlerts = [];
  function syncCasession(s) {
    if (!window.CASession) return;
    if (!s || s.kind === "agent") { window.CASession.set(null); return; }
    var kind = s.kind === "user" ? "member" : s.kind;
    var name = s.pseudonym || s.displayName || (kind === "guest" ? "Guest" : "Signed in");
    window.CASession.set({ kind: kind, name: name });
  }
  function refreshSession() {
    return call("GET", "/auth/session").then(function (s) {
      live = true; session = s; syncCasession(s); return s;
    }, function (e) {
      if (e.status === 401) { session = null; syncCasession(null); }
      throw e;
    });
  }
  var ready = (function () {
    if (window.CA_DEMO || /(^|[#&])api=0/.test(location.hash)) return Promise.resolve(false);
    return call("GET", "/auth/session").then(function (s) { live = true; session = s; syncCasession(s); return true; }, function (e) {
      live = !!e.requestId; return live;
    }).then(function (ok) {
      if (!ok) return false;
      return call("GET", "/alerts/active").then(function (rows) { activeAlerts = rows || []; }, function () {}).then(function () { return true; });
    });
  })();

  // While live, an alert that is on comes from the server, not from localStorage.
  var G = window.CAGuard = window.CAGuard || {}, localLockdown = G.lockdown;
  G.lockdown = function () {
    if (/(^|[#&])lockdown=1/.test(location.hash)) return true;
    if (live) return activeAlerts.length > 0;
    return localLockdown ? localLockdown() : false;
  };

  function day(iso) { if (!iso) return ""; var p = String(iso).split("-"); return p.length < 3 ? iso : MONTHS[+p[1] - 1] + " " + p[2]; }
  function monthId(label) { var p = String(label || "").split(" "), m = MONTHS.indexOf(p[0]) + 1; return m && p[1] ? p[1] + "-" + (m < 10 ? "0" + m : m) : null; }
  function packShape(k) {
    return {
      month: k.month, report: k.report,
      feedback: (k.feedback || []).map(function (f) { return [f.from, f.status]; }),
      community: (k.community || []).map(function (c) { return [c.area, c.text, c.source]; }),
      evidence: (k.evidence || []).map(function (e) { return [e.kind, e.title, e.file]; })
    };
  }

  function hydratePastor() {
    var P = window.CA_PIPE;
    return Promise.all([call("GET", "/pastor/home"), call("GET", "/pastor/tracks"), call("GET", "/pastor/mentor-note")]).then(function (r) {
      var h = r[0], t = r[1], n = r[2];
      P.me = {
        name: session.pseudonym || h.first, first: h.first, pid: session.pseudonym || "", church: h.church, country: "", region: "",
        stage: h.stage, mentor: h.mentor, mentorSince: "", since: h.since,
        mentorNote: n ? { id: n.at, text: (n.lines || []).join(" "), date: day(n.at) } : null,
        history: (h.history || []).map(function (x) { return [x.month, x.note]; })
      };
      P.tracks = {
        training: (t.training || []).map(function (x) { return { t: x.title, p: x.progress, cert: x.certificate }; }),
        documents: (t.documents || []).map(function (x) { return [x.title, x.file]; }),
        ministry: (t.ministry || []).map(function (x) { return { t: x.title, d: day(x.date), src: x.source }; }),
        character: (t.character || []).map(function (x) { return { k: x.kind, t: x.title, d: day(x.date), n: x.note }; }),
        checkins: t.checkins
      };
      var id = monthId(h.season && h.season.month);
      return id ? call("GET", "/pastor/packs/" + id).then(function (k) { P.pack = packShape(k); }, function () {}) : null;
    });
  }

  function hydrateReviewer() {
    var P = window.CA_PIPE;
    return call("GET", "/review/queue").then(function (q) {
      return Promise.all(q.map(function (row) { return call("GET", "/review/packs/" + encodeURIComponent(row.id)); }));
    }).then(function (packs) {
      P.queue = packs.map(function (k) {
        var fb = (k.pack.feedback || []), fin = fb.filter(function (f) { return f.status === "in"; }).length;
        var last = (k.decisions || [])[(k.decisions || []).length - 1];
        var item = {
          // ReviewFlow derives the post-decision stage itself, so it needs the stage before the recorded decision.
          id: k.id, region: k.region, stage: last ? last.stageBefore : k.stage, since: day(k.since), status: k.status, esc: k.escalated, complete: k.complete, missing: k.missing,
          flags: k.agent.flags, routed: k.agent.routedTo, summary: k.agent.summary, why: k.agent.why, model: k.agent.model, history: k.history,
          counts: { act: (k.pack.report || {}).activities || 0, ck: String(k.checkinCount || 0), fb: fin + " of " + fb.length }, enc: "", decisions: k.decisions
        };
        if (k.crisis) item.crisis = { at: day(k.crisis.at), note: k.crisis.note };
        return item;
      });
      if (packs[0]) P.pack = packShape(packs[0].pack);
    });
  }

  var PASTOR_ROUTES = ["home", "tracks", "pack", "checkin", "result", "integrations", "signin", "church", "register", "embed"];
  function pipelineRoleFromHash() {
    var h = new URLSearchParams(location.hash.slice(1));
    var r = h.get("r");
    if (h.get("role")) return h.get("role");
    if (r === "alerts") return "leader";
    if (r === "queue" || r === "review") return "reviewer";
    if (r && PASTOR_ROUTES.indexOf(r) >= 0) return "pastor";
    return null;
  }

  // Fills window.CA_PIPE from the API for the signed-in role. Resolves to the role, or null to keep sample data.
  function hydratePipeline() {
    return ready.then(function (ok) {
      if (!ok) return null;
      if (!session) {
        var dest = "/staff?next=" + encodeURIComponent(location.pathname + location.search);
        location.replace(dest);
        return new Promise(function () {});
      }
      var hashRole = pipelineRoleFromHash();
      var role = session.kind === "admin" ? (hashRole || "reviewer") : session.kind;
      if (session.kind === "admin" && hashRole) role = hashRole;
      var job = role === "pastor" ? hydratePastor() : role === "reviewer" ? hydrateReviewer() : Promise.resolve();
      return job.then(function () { return role; });
    });
  }

  var OUTCOME = { encouragement: "steady", waiting_for_person: "hard", crisis_human_notified: "hard" };
  function uuid() { return (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random().toString(16).slice(2); }
  function sendCheckin(f) {
    var body = { clientId: f.clientId || uuid(), clientCreatedAt: new Date().toISOString(), lang: window.CA_LANG || "en", mood: +f.mood || 3, prayed: f.prayed === "yes", visits: parseInt(f.visits, 10) || 0, struggles: f.struggles || "", wins: f.wins || "" };
    return call("POST", "/pastor/checkins", body).then(function (r) { return { res: OUTCOME[r.outcome] || "steady", reply: r, body: body }; }, function (e) {
      return { res: e.kind === "blocked" ? "blocked" : "failed", error: e, body: body };
    });
  }
  var DECISION = { continue: "continue", plan: "development_plan", additional: "additional_review" };

  // Onboarding runs before any session exists, so it is saved once there is one.
  function saveOnboarding() {
    var done = false; try { done = !!localStorage.getItem("ca_onboarded"); } catch (x) {}
    return done ? call("PUT", "/me/onboarding", { step: 4, done: true }).catch(function () {}) : Promise.resolve();
  }
  function guest() {
    return ready.then(function (ok) {
      if (!ok) return null;
      if (session) return session;
      return call("POST", "/auth/guest").then(function (s) { session = s; syncCasession(s); return saveOnboarding().then(function () { return s; }); });
    });
  }
  function signup(email, name, password) {
    return guest().then(function () { return call("POST", "/auth/signup", { email: email, name: name || "", password: password || "" }); }).then(function (s) {
      session = s; syncCasession(s); return saveOnboarding().then(function () { return s; });
    });
  }

  // Screen helpers wait for the liveness probe; with no API they reject non-retryably so screens keep sample data.
  function whenLive(method) {
    return function (path, body) {
      return ready.then(function (ok) {
        if (!ok) throw new ApiError(-1, { error: { kind: "unavailable", code: "no_api", message: "Preview only." } });
        return call(method, path, body);
      });
    };
  }

  function hasLeaderCap() {
    if (session) {
      if (session.kind === "leader") return true;
      if (session.alsoRoles && session.alsoRoles.indexOf("leader") >= 0) return true;
    }
    try {
      if (window.CA_PIPE && window.CA_PIPE.me && window.CA_PIPE.me.alsoLeader) return true;
    } catch (x) {}
    return false;
  }

  window.CAApi = {
    get: whenLive("GET"), post: whenLive("POST"), put: whenLive("PUT"), patch: whenLive("PATCH"), del: whenLive("DELETE"),
    call: call, ready: ready, isLive: function () { return live; }, session: function () { return session; },
    hasLeaderCap: hasLeaderCap,
    hydratePipeline: hydratePipeline, sendCheckin: sendCheckin,
    ack: function (id) { return call("POST", "/review/packs/" + encodeURIComponent(id) + "/ack"); },
    decide: function (id, v, note) { return call("POST", "/review/packs/" + encodeURIComponent(id) + "/decision", { packId: id, decision: DECISION[v] || v, note: note || "" }); },
    signin: function (codeName, password) { return call("POST", "/auth/signin", { codeName: codeName, password: password }).then(function (s) { session = s; live = true; syncCasession(s); return s; }); },
    staffPhoneSend: function (phone, intent) {
      return call("POST", "/auth/staff/phone/send", { phone: phone, intent: intent || "register" });
    },
    staffPhoneRegister: function (body) {
      return call("POST", "/auth/staff/phone/register", body).then(function (s) { session = s; live = true; syncCasession(s); return s; });
    },
    staffPhoneSignin: function (body) {
      return call("POST", "/auth/staff/phone/signin", body).then(function (s) { session = s; live = true; syncCasession(s); return s; });
    },
    guest: guest, signup: signup,
    syncCasession: syncCasession, refreshSession: refreshSession,
    signout: function () { session = null; syncCasession(null); return call("POST", "/auth/signout").catch(function () {}); },
    deleteMe: function () { return call("DELETE", "/me").then(function () { session = null; syncCasession(null); }); }
  };
  window.CAHasLeaderCap = function () { return window.CAApi && window.CAApi.hasLeaderCap(); };

  ready.then(function (ok) {
    if (ok || window.CA_DEMO || /(^|[#&])api=0/.test(location.hash)) return;
    try { if (sessionStorage.getItem("ca_rescue_dismiss")) return; } catch (e) {}
    var bar = document.createElement("div");
    bar.setAttribute("role", "status");
    bar.style.cssText = "position:sticky;top:0;z-index:50;padding:10px 16px;background:var(--surface-raised,#1a221c);border-bottom:1px solid var(--border-subtle,#324034);font:600 13px/1.4 system-ui,sans-serif;color:var(--text-body,#e8ece4);display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center";
    bar.innerHTML = "<span>Could not reach the API — preview data only. For the full app on this machine run <code style=\"background:rgba(255,255,255,.08);padding:2px 6px;border-radius:4px\">.\\scripts\\run_local.ps1</code> in church-ai-stack.</span>";
    var help = document.createElement("a");
    help.href = "/help#local";
    help.textContent = "Local rescue guide";
    help.style.color = "var(--lamp-400,#cfda5c)";
    var dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.textContent = "Dismiss";
    dismiss.style.cssText = "border:0;background:transparent;color:var(--text-muted,#b8c4b8);cursor:pointer;font:inherit;text-decoration:underline";
    dismiss.onclick = function () { try { sessionStorage.setItem("ca_rescue_dismiss", "1"); } catch (e) {} bar.remove(); };
    bar.appendChild(help);
    bar.appendChild(dismiss);
    var root = document.body;
    if (root && root.firstChild) root.insertBefore(bar, root.firstChild);
  });
})();
