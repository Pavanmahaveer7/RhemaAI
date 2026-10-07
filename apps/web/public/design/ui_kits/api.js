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
    this.message = e.message || "Could not reach church.ai. Try again.";
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
  var ready = (function () {
    if (window.CA_DEMO || /(^|[#&])api=0/.test(location.hash)) return Promise.resolve(false);
    return call("GET", "/auth/session").then(function (s) { live = true; session = s; return true; }, function (e) {
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

  // Fills window.CA_PIPE from the API for the signed-in role. Resolves to the role, or null to keep sample data.
  function hydratePipeline() {
    return ready.then(function (ok) {
      if (!ok) return null;
      if (!session) { location.replace(new URL("../public/index.html#r=signin", location.href).href); return new Promise(function () {}); }
      var role = session.kind === "admin" ? "reviewer" : session.kind;
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
      return call("POST", "/auth/guest").then(function (s) { session = s; return saveOnboarding().then(function () { return s; }); });
    });
  }
  function signup(email, name, password) {
    return guest().then(function () { return call("POST", "/auth/signup", { email: email, name: name || "", password: password || "" }); }).then(function (s) {
      session = s; return saveOnboarding().then(function () { return s; });
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

  window.CAApi = {
    get: whenLive("GET"), post: whenLive("POST"), put: whenLive("PUT"), patch: whenLive("PATCH"), del: whenLive("DELETE"),
    call: call, ready: ready, isLive: function () { return live; }, session: function () { return session; },
    hydratePipeline: hydratePipeline, sendCheckin: sendCheckin,
    ack: function (id) { return call("POST", "/review/packs/" + encodeURIComponent(id) + "/ack"); },
    decide: function (id, v, note) { return call("POST", "/review/packs/" + encodeURIComponent(id) + "/decision", { packId: id, decision: DECISION[v] || v, note: note || "" }); },
    signin: function (codeName, password) { return call("POST", "/auth/signin", { codeName: codeName, password: password }).then(function (s) { session = s; live = true; return s; }); },
    guest: guest, signup: signup,
    signout: function () { session = null; return call("POST", "/auth/signout").catch(function () {}); },
    deleteMe: function () { return call("DELETE", "/me").then(function () { session = null; }); }
  };
})();
