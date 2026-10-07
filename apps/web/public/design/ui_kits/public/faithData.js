(() => {
const L = window.CA_DATA.lexicon;
const GAP = { goal: "Nirvana or moksha is the loss of the person. Salvation keeps the person with God.", human: "Where the human problem is ignorance, a teacher is the answer. Christians say a teacher is not enough: sin needs a Savior." };
const gapGoal = (left, right) => ({ key: "goal", title: "Ultimate goal", left: { label: "Nirvana / moksha", text: left }, right: { label: "Christian salvation", text: right }, gap: GAP.goal });
const gapHuman = (left, right) => ({ key: "human", title: "Problem of humanity", left: { label: "Ignorance", text: left }, right: { label: "Sin", text: right }, gap: GAP.human });

const entries = {
salvation: { def: "Being rescued or made whole.", used: ["Christian", "Hindu", "Buddhist"],
 sources: [{ tradition: "Christian", work: "Romans", reference: "10:9 (KJV)" }],
 faith: {
  parallel: "All three traditions say the human condition needs more than ordinary life can give, and each names a final release or rescue: moksha, nirvana, salvation. Each asks for a whole-life response, not a single act. That resemblance is an analogy, not one doctrine.",
  difference: "They do not agree on what a person is rescued from, what they are rescued into, or who does the rescuing. Hindu schools differ: Advaita Vedānta teaches non-duality with Brahman, while Viśiṣṭādvaita keeps the self distinct in devotion to God. Theravāda teaching speaks of no lasting self; Christian teaching speaks of a personal God who saves. None of these is ranked here.",
  bridge: "When a Hindu or Buddhist neighbour hears a Christian say “salvation,” it is natural to hear their own word for final release. The words sit near each other, and a Christian can honour that nearness. But the two words point to different ends and start from different diagnoses. A Christian can explain salvation through two gaps, without saying the other traditions are the same and without arguing them down.",
  gaps: [
   gapGoal("The goal is release. In Advaita Vedānta the self (ātman) is realised as one with Brahman, like a river that loses its name in the sea. In Theravāda teaching craving ends, the sense of a lasting self is let go (anattā: there is none to keep), and rebirth in saṃsāra stops. Neither is a person living on with God.",
    "The goal is relationship. A unique person is raised, known by name, and lives with God forever. The self is not dissolved into God; it is healed and completed, and it stays itself. Eternal life is knowing God, and being known."),
   gapHuman("In Advaita Vedānta and in Theravāda teaching, the root problem is not seeing reality as it is (avidyā). The answer is a teacher who shows the way, a law or path of right living, or an enlightenment that clears ignorance away. The person is lost, and needs light.",
    "The root problem is a broken relationship with God and a spiritual nature that is dead, not merely uninformed. A teacher or a law can show what is right but cannot make a dead person live. It needs a Savior who brings a person from death to life, as a gift.")
  ],
  close: "So a Christian can say: “Your tradition and mine both know that something is deeply wrong and that we need release. I believe the answer is not that I disappear into oneness, and not that I learn enough to be free, but that God gives me new life and keeps me as myself with him forever.”",
  sources: [{ tradition: "Hindu", work: "Mundaka Upanishad", reference: "3.2.8" }, { tradition: "Buddhist", work: "Dhammapada", reference: "15.203" }, { tradition: "Christian", work: "John", reference: "17:3 (KJV)" }, { tradition: "Christian", work: "Ephesians", reference: "2:1–5 (KJV)" }] } },
marriage: { pos: "noun", def: "A lifelong union between two people, publicly made.", used: ["Hindu", "Buddhist", "Christian"],
 sources: [{ tradition: "Hindu", work: "Rig Veda", reference: "10.85" }, { tradition: "Buddhist", work: "Sigalovada Sutta", reference: "DN 31" }, { tradition: "Christian", work: "Genesis", reference: "2:24 (KJV)" }],
 faith: {
  parallel: "Each tradition treats marriage as a serious bond with duties on both sides: faithfulness, care for the household, and honour for each other. That resemblance is an analogy, not one doctrine.",
  difference: "Hindu marriage (vivaha) is a sacrament within dharma, sometimes spoken of across lifetimes. Theravāda texts such as the Sigālovāda Sutta treat marriage mainly as a householder’s ethical duty, not a religious rite. Christian marriage is a covenant that pictures Christ and the church. None is ranked here.",
  bridge: "A Christian can recognise the seriousness a Hindu or Buddhist neighbour gives to marriage and learn from it. The difference shows most clearly when you ask where marriage is heading. If the final goal is release from individual identity, marriage belongs to this life and to the path, and it falls away at the end. In Christian hope, persons are not dissolved, so love between persons is a picture of something that lasts.",
  gaps: [gapGoal("Marriage is a duty and a discipline within this life. In Advaita Vedānta, final release leaves the separate self behind in Brahman; in Theravāda teaching, nirvana ends rebirth. In neither does the bond continue as a bond between two persons.",
   "Marriage is a covenant between two persons that points to a greater one: Christ and his people. Earthly marriage ends at death, but the persons it joined remain, and the love it pictured, between God and his people, is forever.")],
  close: "The bridge is to say: “We both take marriage seriously. For me it is a small picture of a relationship with God that never ends, because in the end I am not lost; I am kept.”",
  sources: [{ tradition: "Hindu", work: "Rig Veda", reference: "10.85" }, { tradition: "Buddhist", work: "Sigalovada Sutta", reference: "DN 31" }, { tradition: "Christian", work: "Ephesians", reference: "5:31–32 (KJV)" }] } },
love: { pos: "noun", def: "Deep care and commitment toward another.", used: ["Hindu", "Buddhist", "Christian"],
 sources: [{ tradition: "Hindu", work: "Bhagavad Gita", reference: "12.13" }, { tradition: "Buddhist", work: "Karaniya Metta Sutta", reference: "Sn 1.8" }, { tradition: "Christian", work: "1 Corinthians", reference: "13:4–7 (KJV)" }],
 faith: {
  parallel: "Hindu devotion (bhakti), Buddhist loving-kindness (metta) and compassion (karuna), and Christian love (agape) all ask a person to wish good for others beyond their own circle. That resemblance is an analogy, not one doctrine.",
  difference: "Bhakti is loving devotion to God; metta is a cultivated goodwill toward all beings, often as a meditative practice; agape is love that God first gives and that a Christian then gives to others. No tradition is ranked here.",
  bridge: "Many neighbours will recognise Christian love in their own words, and a Christian can gladly say so. The gap appears when you ask what love is for in the end. If the final goal is oneness, love is a way of dissolving the boundary between self and other. In Christian teaching, love needs two persons, and it lasts because God himself is love among persons.",
  gaps: [gapGoal("In Advaita Vedānta, love and devotion can wear down the sense of a separate self until lover and loved are no longer two. In Theravāda teaching, metta is cultivated on the path, and at nirvana there is no lasting self to go on loving.",
   "Love is between persons, and it never ends. God is love, and he keeps each person as a person so that love can go on forever. Distinction is not the problem to be removed; it is what makes love possible.")],
  close: "The bridge is to say: “Your word for love and mine are close. I believe love is forever because God keeps us, you and me, as ourselves.”",
  sources: [{ tradition: "Hindu", work: "Bhagavad Gita", reference: "12.13–14" }, { tradition: "Buddhist", work: "Karaniya Metta Sutta", reference: "Sn 1.8" }, { tradition: "Christian", work: "1 John", reference: "4:8 (KJV)" }] } },
faith: { pos: "noun", def: "Trust placed in someone or something beyond proof.", used: ["Christian", "Hindu", "Buddhist"],
 sources: [{ tradition: "Christian", work: "Hebrews", reference: "11:1 (KJV)" }],
 faith: {
  parallel: "Hindu shraddha and Buddhist saddha both name a confident trust that starts a person on a path; Christian faith is trust too. That resemblance is an analogy, not one doctrine.",
  difference: "In the Bhagavad Gītā, śraddhā shapes the path a person walks; in the Kālāma Sutta (Theravāda), trust is tested and finally replaced by one’s own insight. In Christian use, faith is trust in a person, Christ, rather than confidence in a method. None is ranked here.",
  bridge: "A Christian can agree that faith begins with trust and leads to a changed life. The gap is about what faith is trusting for. That depends on what the human problem is.",
  gaps: [gapHuman("In Advaita Vedānta the problem is ignorance (avidyā) of the true self; in Theravāda it is ignorance and craving. Faith is trust in a teacher, a law, or a path until you see for yourself. Faith is a starting point; in the end, insight replaces it.",
   "If the problem is sin, a broken relationship and a dead spiritual nature, then more insight is not enough. Faith is trusting a Savior to do what I cannot: bring me from death to life. Faith is not replaced by seeing; it is the relationship itself.")],
  close: "The bridge is to say: “We both begin by trusting. I trust not a method that frees me, but a person who gives me life.”",
  sources: [{ tradition: "Hindu", work: "Bhagavad Gita", reference: "17.3" }, { tradition: "Buddhist", work: "Kalama Sutta", reference: "AN 3.65" }, { tradition: "Christian", work: "Ephesians", reference: "2:1–5, 8 (KJV)" }] } }
};
for (const [term, e] of Object.entries(entries)) {
  const i = L.findIndex(x => x.term === term);
  const full = { term, pos: "noun", ...e };
  if (i >= 0) L[i] = { ...L[i], ...full }; else L.push(full);
}

const KEY = "ca_expert_edits";
const seed = {
  _review: { karma: { by: "Dr. Miriam Das", at: "Sep 20" }, salvation: { by: "Dr. Miriam Das", at: "Sep 22" }, marriage: { by: "Rev. Tenzin Norbu", at: "Sep 23" }, love: { by: "Dr. Miriam Das", at: "Sep 24" }, faith: { by: "Rev. Tenzin Norbu", at: "Sep 24" } },
  love: { parallel: { log: [{ kind: "Change", who: "Dr. Miriam Das", at: "Sep 24", old: "Bhakti, metta and agape all ask a person to wish good for others.", new: null }], sugg: [] } },
  salvation: { difference: { log: [], sugg: [{ who: "Rev. Tenzin Norbu", at: "Sep 25", text: "Add that Pure Land Buddhism speaks of reliance on Amida’s vow, which is closer to grace than other schools." }] } }
};
const F = {
  parallel: [["text", "Parallel"]], difference: [["text", "Difference"]], bridge: [["text", "Bridge"]],
  goal: [["left", "Nirvana / moksha"], ["right", "Christian salvation"], ["gap", "The gap"]],
  human: [["left", "Ignorance"], ["right", "Sin"], ["gap", "The gap"]],
  root: [["text", "Linguistic root"]], timeline: [["text", "Historical timeline"]]
};
const T = { parallel: "Parallel", difference: "Difference", bridge: "Christian bridge", goal: "Gap 1 · Ultimate goal", human: "Gap 2 · Problem of humanity", root: "Linguistic root", timeline: "Historical timeline" };
const norm = (k, v) => v == null ? null : typeof v === "string" ? { [F[k][0][0]]: v } : v;
window.CAFaith = {
  fields: k => F[k], title: k => T[k], norm,
  defaults(e, k) { const f = e.faith || {};
    if (k === "goal" || k === "human") { const g = (f.gaps || []).find(x => x.key === k); return { left: g ? g.left.text : null, right: g ? g.right.text : null, gap: g ? g.gap : GAP[k] }; }
    if (k === "bridge") return { text: f.bridge || null, close: f.close || null };
    return { text: f[k] || null }; },
  current(store, e, k) { const r = (store[e.term] || {})[k]; const d = this.defaults(e, k);
    if (r && r.val) return { ...d, ...r.val }; if (r && typeof r.text === "string") return { ...d, [F[k][0][0]]: r.text }; return d; },
  empty(v) { return !v || Object.values(v).every(x => !x); },
  hasContent(store, e) { return ["parallel", "difference", "bridge", "goal", "human"].some(k => !this.empty(this.current(store, e, k))); }
};
window.CAExpert = {
  expert: "Dr. Miriam Das",
  get() { try { const v = JSON.parse(localStorage.getItem(KEY)); if (v) { if (!v._review) v._review = seed._review; return v; } } catch (e) {} localStorage.setItem(KEY, JSON.stringify(seed)); return JSON.parse(JSON.stringify(seed)); },
  set(v) { localStorage.setItem(KEY, JSON.stringify(v)); window.dispatchEvent(new Event("ca-expert")); },
  use() { const [v, setV] = React.useState(window.CAExpert.get()); React.useEffect(() => { const f = () => setV(window.CAExpert.get()); window.addEventListener("ca-expert", f); window.addEventListener("storage", f); return () => { window.removeEventListener("ca-expert", f); window.removeEventListener("storage", f); }; }, []); return [v, window.CAExpert.set]; }
};
})();
