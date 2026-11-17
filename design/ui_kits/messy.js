// Messy-data mode: add #messy=1 to any kit URL (#messy=0 to leave). Loads ugly data on purpose
// so layout breaks show up before real data does. Stays on for this tab until turned off.
(function () {
  var h = new URLSearchParams(location.hash.slice(1)).get("messy");
  try { if (h === "1") sessionStorage.setItem("ca_messy", "1"); if (h === "0") sessionStorage.removeItem("ca_messy"); } catch (e) {}
  var on = false; try { on = sessionStorage.getItem("ca_messy") === "1"; } catch (e) {}
  window.CA_MESSY = on;
  if (!on) return;
  var LONG = "Living Water Fellowship of the Greater Mirpur, Pallabi and Kafrul Area Congregations";
  var REG = "Bangladesh — Dhaka Division, Mirpur-Pallabi-Kafrul Upazila Cluster";
  var D = window.CA_DATA, P = window.CA_PIPE;
  if (D) {
    D.lexicon.forEach(function (e, i) {
      if (i === 0) e.def = e.def + " In some schools it also names the unseen residue that actions leave, carried across lifetimes until it ripens, which is why the same word can point to a law, a process and a moral account at once.";
      if (i === 1) { e.sources = []; e.pos = ""; }
    });
    D.lexicon.push({ term: "pratītyasamutpāda-and-interdependence", pos: "noun", def: "", used: ["Buddhist"], sources: [] });
    D.months.forEach(function (m) {
      if (m.published && m.nodes) m.nodes.push(["forgiveness-and-reconciliation-in-families", 7], ["x", 3]);
    });
  }
  if (P) {
    P.me.church = LONG; P.me.region = REG;
    var base = P.queue.slice();
    for (var i = 0; i < 44; i++) { var q = JSON.parse(JSON.stringify(base[i % base.length])); q.id = "P-" + (1000 + i); q.region = i % 3 ? REG : q.region; if (i % 5 === 0) q.enc = ""; P.queue.push(q); }
    P.me.history = P.me.history.concat([["Aug 2026", "Leadership review: Additional review requested because the monthly pack was missing feedback from two of three church leaders"]]);
  }
})();
