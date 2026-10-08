(function () {
  var SETS = { mine: ["grace", "faith", "salvation", "love", "marriage"], friend: ["karma", "dharma", "moksha", "nirvana", "meditation"], online: ["karma", "nirvana", "meditation", "suffering", "compassion"] };
  var LABEL = { mine: "My faith", friend: "A friend’s faith", online: "Heard online" };
  window.CACurious = {
    SETS: SETS, LABEL: LABEL,
    get: function () { try { return JSON.parse(localStorage.getItem("ca_curious")) || []; } catch (e) { return []; } },
    set: function (a) { try { localStorage.setItem("ca_curious", JSON.stringify(a)); } catch (e) {} },
    words: function () { var out = []; this.get().forEach(function (k) { (SETS[k] || []).forEach(function (w) { if (out.indexOf(w) < 0) out.push(w); }); }); return out; },
    first: function () { var w = this.words(); return w[0] || "karma"; }
  };
  window.CATeamNote = { lines: ["We built Rhema.ai because the same word can carry", "very different hopes. Take your time with each one."], sign: "— the Rhema.ai team" };
})();
