// Live API → window.CA_DATA.months (contract/frontend-wiring.md §1).
(function () {
  function mapLink(link) {
    var kind = link.kind === "apart" ? "t" : "s";
    return [link.a, link.b, link.weight, kind];
  }

  function mapPublicMonth(m, published) {
    if (!m) return null;
    var nodes = (m.concepts || []).map(function (c) {
      return c.isNew ? [c.id, c.count, 1] : [c.id, c.count];
    });
    var links = (m.links || []).map(mapLink);
    return {
      id: m.id,
      label: m.label,
      question: m.question,
      term: m.term,
      published: published !== false,
      answers: m.answers || 0,
      nodes: nodes,
      links: links
    };
  }

  function mapDraftBody(body) {
    if (!body) return null;
    var nodes = (body.concepts || []).map(function (c) {
      return c.isNew ? [c.id, c.count, 1] : [c.id, c.count];
    });
    var links = (body.links || []).map(mapLink);
    return {
      id: body.id,
      label: body.label,
      question: body.question,
      term: body.term,
      answers: body.answers || 0,
      flagged: body.flagged || 0,
      nodes: nodes,
      links: links,
      kept: { selfharm: 0, hate: 0, sexual: 0, threat: 0, spam: 0, unclear: 0, duplicate: 0 },
      spikes: {}
    };
  }

  function mergeMonths(months) {
    if (!months.length) return;
    var byId = {};
    months.forEach(function (m) { byId[m.id] = m; });
    var tail = (window.CA_DATA.months || []).filter(function (m) {
      return !byId[m.id] && !m.published;
    });
    window.CA_DATA.months = months.concat(tail);
    try { window.dispatchEvent(new Event("ca-data-ready")); } catch (e) {}
  }

  function hydratePublic() {
    var A = window.CAApi;
    if (!A || window.CA_DEMO) return Promise.resolve(false);
    return A.ready.then(function (ok) {
      if (!ok) return false;
      return Promise.all([
        A.call("GET", "/months/current").catch(function () { return null; }),
        A.call("GET", "/maps/latest/compare").catch(function () { return null; })
      ]).then(function (r) {
        var curQ = r[0], cmp = r[1];
        var months = [];
        if (cmp && cmp.previous) months.push(mapPublicMonth(cmp.previous, true));
        if (cmp && cmp.current) months.push(mapPublicMonth(cmp.current, true));
        if (curQ) {
          window.CA_CURRENT_MONTH = curQ;
          var open = {
            id: curQ.id,
            label: curQ.label,
            question: curQ.question,
            term: curQ.term,
            published: false,
            open: curQ.open,
            ends: curQ.closesAt ? String(curQ.closesAt).slice(0, 10) : undefined,
            answers: curQ.answers || 0,
            nodes: [],
            links: []
          };
          var ix = months.findIndex(function (m) { return m.id === open.id; });
          if (ix >= 0) months[ix] = Object.assign({}, months[ix], open);
          else months.push(open);
        }
        mergeMonths(months);
        return true;
      });
    });
  }

  function hydrateDraft() {
    var A = window.CAApi;
    if (!A || !A.isLive()) return Promise.resolve(null);
    return A.get("/maps/draft").then(function (body) {
      var seed = mapDraftBody(body);
      if (seed) window.CA_DRAFT_SEED = seed;
      return seed;
    }, function () { return null; });
  }

  window.CAHydrate = function () {
    return hydratePublic().then(function () { return hydrateDraft(); });
  };
  window.CAMapPublicMonth = mapPublicMonth;
  window.CAMapDraftBody = mapDraftBody;
  window.CAMapLink = mapLink;
})();
