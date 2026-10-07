// Monthly rhythm: next-question date, calendar file, the reader's own idea (this device only), release-day flag.
(function () {
  var D = function () { return window.CA_DATA; };
  var cur = function () {
    if (window.CA_CURRENT_MONTH) {
      var m = D().months.find(function (x) { return x.id === window.CA_CURRENT_MONTH.id; });
      if (m) return m;
    }
    var m = D().months; return m[m.length - 1];
  };
  var nextOpen = function () {
    if (window.CA_CURRENT_MONTH && window.CA_CURRENT_MONTH.closesAt) {
      var e = new Date(String(window.CA_CURRENT_MONTH.closesAt).slice(0, 10) + "T12:00:00");
      return new Date(e.getFullYear(), e.getMonth() + 1, 1, 9, 0, 0);
    }
    var c = cur(); var e = c.ends ? new Date(c.ends + "T12:00:00") : new Date(); return new Date(e.getFullYear(), e.getMonth() + 1, 1, 9, 0, 0);
  };
  var latest = function () {
    var p = D().months.filter(function (m) { return m.published; });
    if (window.CAApi && window.CAApi.isLive()) return p[p.length - 1];
    var x = null; try { x = JSON.parse(localStorage.getItem("ca_map_published")); } catch (e) {}
    return x || p[p.length - 1];
  };
  var fmt = function (d) { return d.toLocaleDateString([], { month: "short", day: "numeric" }); };
  var ics = function () {
    var d = nextOpen(), p = function (n) { return String(n).padStart(2, "0"); };
    var day = d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
    var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//church.ai//monthly//EN", "BEGIN:VEVENT", "UID:churchai-" + day + "@church.ai", "DTSTART;VALUE=DATE:" + day, "SUMMARY:church.ai — a new question", "DESCRIPTION:One question this month. No account, no name.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" })); a.download = "church-ai-next-question.ics"; document.body.appendChild(a); a.click(); a.remove();
  };
  var ideas = function () { var s = {}; D().months.forEach(function (m) { (m.nodes || []).forEach(function (n) { s[n[0]] = 1; }); }); return Object.keys(s); };
  var guessIdea = function (text) { var t = " " + String(text).toLowerCase() + " "; var hit = ideas().filter(function (k) { return new RegExp("\\b" + k + "\\b").test(t); }); return hit.sort(function (a, b) { return t.indexOf(a) - t.indexOf(b); })[0] || null; };
  var setMine = function (monthId, idea) { try { if (idea) localStorage.setItem("ca_my_idea_" + monthId, idea); else localStorage.removeItem("ca_my_idea_" + monthId); } catch (e) {} };
  var mine = function (monthId) { try { return localStorage.getItem("ca_my_idea_" + monthId); } catch (e) { return null; } };
  var isRelease = function () { var l = latest(); try { return !!l && localStorage.getItem("ca_seen_release") !== l.id; } catch (e) { return false; } };
  var seeRelease = function () { var l = latest(); try { l && localStorage.setItem("ca_seen_release", l.id); } catch (e) {} };
  var month = function (m) { return (m.label || "").split(" ")[0]; };
  window.CARhythm = { cur: cur, latest: latest, nextOpen: nextOpen, nextLabel: function () { return fmt(nextOpen()); }, ics: ics, guessIdea: guessIdea, setMine: setMine, mine: mine, isRelease: isRelease, seeRelease: seeRelease, month: month };
})();
