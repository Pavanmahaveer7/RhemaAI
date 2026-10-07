// Shared "type to confirm" field for serious actions, plus a matcher.
(function () {
  window.CAMatch = function (v, w) { return String(v || "").trim().toLowerCase() === String(w).toLowerCase(); };
  window.CATypeConfirm = function (props) {
    var TF = window.ChurchAIDesignSystem_06db43.TextField;
    return React.createElement(TF, { label: "Type " + props.word + " to confirm", value: props.value, autoComplete: "off", hint: props.hint || "This can’t be undone.", onChange: function (e) { props.onChange(e.target.value); } });
  };
  window.CAAboutDraft = function (props) {
    var NS = window.ChurchAIDesignSystem_06db43, h = React.createElement, k = "ca_about_" + props.id;
    var st = React.useState(function () { try { return !localStorage.getItem(k); } catch (e) { return true; } }), open = st[0], setOpen = st[1];
    if (!open) return null;
    return h("div", { role: "note", "aria-label": "About this draft", style: Object.assign({ display: "flex", gap: 12, alignItems: "flex-start", padding: 16, borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "var(--surface-card)", maxWidth: 480 }, props.style) },
      h("span", { "aria-hidden": "true", style: { width: 36, height: 36, flex: "none", borderRadius: 99, display: "grid", placeItems: "center", background: "var(--surface-raised)", color: "var(--text-body)" } }, h(NS.Icon, { name: "user-check", size: 18 })),
      h("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 } },
        h("div", { style: { font: "700 18px/1.3 var(--font-body)", color: "var(--text-strong)" } }, "About this draft"),
        h("p", { style: { margin: 0, font: "var(--type-body)", fontSize: 16, lineHeight: 1.45, color: "var(--text-body)" } }, props.children),
        h("div", { style: { marginTop: 4 } }, h(NS.Button, { size: "sm", variant: "secondary", onClick: function () { try { localStorage.setItem(k, "1"); } catch (e) {} setOpen(false); } }, "Got it"))));
  };
  // "Did this help?" — one tap, anonymous count only.
  window.CAHelped = function (props) {
    var e = React.createElement, k = "ca_helped_" + props.id;
    var st = React.useState(function () { try { return localStorage.getItem(k); } catch (x) { return null; } }), v = st[0], setV = st[1];
    var pick = function (a) {
      try { localStorage.setItem(k, a); } catch (x) {}
      setV(a);
      window.CAHaptic && window.CAHaptic("light");
      var A = window.CAApi, surface = props.id && props.id.indexOf("word_") === 0 ? "word" : props.id && props.id.indexOf("month") === 0 ? "monthly" : null;
      if (A && A.isLive() && !window.CA_DEMO && surface) {
        A.post("/feedback/helped", { surface: surface, id: props.id, value: a === "yes" ? "yes" : "no" }).catch(function () {});
      }
    };
    var btn = function (a, label) { return e("button", { type: "button", onClick: function () { pick(a); }, style: { height: 36, padding: "0 14px", flex: "none", whiteSpace: "nowrap", borderRadius: 999, cursor: "pointer", font: "600 13px/1 var(--font-body)", border: "1px solid var(--border-default)", background: "transparent", color: "var(--text-body)" } }, label); };
    return e("div", { role: "group", "aria-label": "Did this help?", style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", padding: "6px 4px" } },
      v ? e("span", { role: "status", style: { font: "var(--type-source)", color: "var(--text-muted)" } }, window.CAtr("Thanks. Counted, with no name."))
        : [e("span", { key: "q", style: { font: "600 13px/1.3 var(--font-body)", color: "var(--text-muted)", marginRight: 2 } }, window.CAtr(props.q || "Did this help?")), e(React.Fragment, { key: "y" }, btn("yes", window.CAtr("Yes"))), e(React.Fragment, { key: "n" }, btn("no", window.CAtr("Not really")))]);
  };
  // "Why am I seeing this?" — one quiet link that opens a single plain line. Used only on assistant-written text.
  window.CAWhy = function (props) {
    var e = React.createElement, st = React.useState(false), o = st[0], setO = st[1];
    return e("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
      e("button", { type: "button", "aria-expanded": o, onClick: function () { setO(!o); }, style: { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44, padding: 0, background: "none", border: 0, cursor: "pointer", font: "600 13px/1.3 var(--font-body)", color: "var(--text-muted)", textDecoration: "underline", textUnderlineOffset: 3 } }, window.CAtr(props.label || "Why am I seeing this?")),
      o ? e("p", { role: "note", style: { margin: 0, font: "var(--type-source)", color: "var(--text-body)", maxWidth: "52ch", textWrap: "pretty" } }, props.text) : null);
  };
  // Languages for the pastor check-in. Needs native-speaker review before launch.
  window.CA_LANGS = [["en", "English"], ["hi", "हिन्दी"], ["bn", "বাংলা"], ["ne", "नेपाली"], ["my", "မြန်မာ"], ["km", "ខ្មែរ"]];
  var CA_STR = {
    hi: { title: "आज का दिन कैसा रहा?", usual: "सामान्य दिन की तुलना में?", hard: "क्या कठिन था?", well: "क्या अच्छा रहा?", send: "भेजें", queued: "इस फ़ोन पर सहेजा गया। ऑनलाइन होने पर भेजा जाएगा।" },
    bn: { title: "আজকের দিনটা কেমন গেল?", usual: "সাধারণ দিনের তুলনায়?", hard: "কী কঠিন ছিল?", well: "কী ভালো হয়েছে?", send: "পাঠান", queued: "এই ফোনে সংরক্ষিত। অনলাইনে এলে পাঠানো হবে।" },
    ne: { title: "आजको दिन कस्तो रह्यो?", usual: "सामान्य दिनको तुलनामा?", hard: "के गाह्रो भयो?", well: "के राम्रो भयो?", send: "पठाउनुहोस्", queued: "यो फोनमा सुरक्षित गरियो। अनलाइन हुँदा पठाइनेछ।" },
    my: { title: "ဒီနေ့ ဘယ်လိုရှိလဲ။", usual: "ပုံမှန်နေ့နဲ့ ယှဉ်ရင်။", hard: "ဘာက ခက်ခဲခဲ့လဲ။", well: "ဘာက ကောင်းခဲ့လဲ။", send: "ပို့မည်", queued: "ဤဖုန်းတွင် သိမ်းထားသည်။ အင်တာနက်ရလျှင် ပို့ပါမည်။" },
    km: { title: "ថ្ងៃនេះយ៉ាងម៉េចដែរ?", usual: "ធៀបនឹងថ្ងៃធម្មតា?", hard: "តើអ្វីដែលពិបាក?", well: "តើអ្វីដែលល្អ?", send: "ផ្ញើ", queued: "បានរក្សាទុកនៅលើទូរស័ព្ទនេះ។ នឹងផ្ញើនៅពេលមានអ៊ីនធឺណិត។" }
  };
  window.CA_LANG = (function () { var h = /(?:^|[#&])lang=(en|hi|bn|ne|my|km)\b/.exec(location.hash); if (h) return h[1]; try { return localStorage.getItem("ca_lang") || "en"; } catch (e) { return "en"; } })();
  var CA_TR = {"Check-in · when you can":["हाल-चाल · जब समय मिले","খবরাখবর · যখন সময় পান","हालखबर · जब समय मिल्छ","အခြေအနေ မှတ်တမ်း · အချိန်ရသလို","ការរាយការណ៍ · ពេលអ្នកទំនេរ"],"Much lighter than usual":["सामान्य से बहुत हल्का","স্বাভাবিকের চেয়ে অনেক হালকা","सामान्यभन्दा धेरै हलुका","ပုံမှန်ထက် အများကြီး ပေါ့ပါး","ស្រាលជាងធម្មតាច្រើន"],"Lighter than usual":["सामान्य से हल्का","স্বাভাবিকের চেয়ে হালকা","सामान्यभन्दा हलुका","ပုံမှန်ထက် ပေါ့ပါး","ស្រាលជាងធម្មតា"],"About usual":["लगभग सामान्य","প্রায় স্বাভাবিক","लगभग सामान्य","ပုံမှန်လောက်ပဲ","ប្រហែលធម្មតា"],"Heavier than usual":["सामान्य से भारी","স্বাভাবিকের চেয়ে ভারী","सामान्यभन्दा गह्रौं","ပုံမှန်ထက် လေးလံ","ធ្ងន់ជាងធម្មតា"],"Much heavier than usual":["सामान्य से बहुत भारी","স্বাভাবিকের চেয়ে অনেক ভারী","सामान्यभन्दा धेरै गह्रौं","ပုံမှန်ထက် အများကြီး လေးလံ","ធ្ងន់ជាងធម្មតាច្រើន"],"Did you pray today?":["क्या आपने आज प्रार्थना की?","আপনি কি আজ প্রার্থনা করেছেন?","के तपाईंले आज प्रार्थना गर्नुभयो?","ဒီနေ့ ဆုတောင်းခဲ့သလား။","តើអ្នកបានអធិស្ឋានថ្ងៃនេះទេ?"],"Yes":["हाँ","হ্যাঁ","हो","ဟုတ်ကဲ့","បាទ/ចាស"],"Not today":["आज नहीं","আজ না","आज होइन","ဒီနေ့ မဟုတ်ဘူး","មិនមែនថ្ងៃនេះទេ"],"Visits made today":["आज की मुलाक़ातें","আজকের সাক্ষাৎ","आजका भेटघाट","ဒီနေ့ သွားရောက်တွေ့ဆုံမှု","ការសួរសុខទុក្ខថ្ងៃនេះ"],"Pastoral visits or calls. 0 is fine.":["पास्टरीय मुलाक़ातें या फ़ोन। 0 भी ठीक है।","পালকীয় সাক্ষাৎ বা ফোন। ০ হলেও ঠিক আছে।","पास्टरीय भेट वा फोन। ० पनि ठीक छ।","သွားရောက်တွေ့ဆုံမှု သို့မဟုတ် ဖုန်းခေါ်မှု။ 0 ဖြစ်လည်း ရပါတယ်။","ការសួរសុខទុក្ខ ឬការហៅទូរស័ព្ទ។ 0 ក៏មិនអីដែរ។"],"Check-in":["हाल-चाल","খবরাখবর","हालखबर","အခြေအနေ မှတ်တမ်း","ការរាយការណ៍"]," · updated":[" · अपडेट किया गया"," · হালনাগাদ"," · अद्यावधिक"," · ပြင်ဆင်ပြီး"," · បានកែប្រែ"],"Thank you. Rest well tonight. “Come unto me, all ye that labour.” Matthew 11:28":["धन्यवाद। आज रात अच्छे से आराम करें। — मत्ती 11:28","ধন্যবাদ। আজ রাতে ভালো করে বিশ্রাম নিন। — মথি ১১:২৮","धन्यवाद। आज राति राम्ररी आराम गर्नुहोस्। — मत्ती ११:२८","ကျေးဇူးတင်ပါတယ်။ ဒီည ကောင်းကောင်း အနားယူပါ။ — မဿဲ ၁၁:၂၈","សូមអរគុណ។ សូមសម្រាកឲ្យបានល្អនៅយប់នេះ។ — ម៉ាថាយ ១១:២៨"],"Thank you. Go gently today. “This is the day which the LORD hath made.” Psalm 118:24":["धन्यवाद। आज का दिन धीरे से बिताइए। — भजन संहिता 118:24","ধন্যবাদ। আজকের দিনটা ধীরে চলুন। — গীতসংহিতা ১১৮:২৪","धन्यवाद। आजको दिन बिस्तारै बिताउनुहोस्। — भजनसंग्रह ११८:२४","ကျေးဇူးတင်ပါတယ်။ ဒီနေ့ ဖြည်းဖြည်းချင်း သွားပါ။ — ဆာလံ ၁၁၈:၂၄","សូមអរគុណ។ សូមដើរយឺតៗថ្ងៃនេះ។ — ទំនុកតម្កើង ១១៨:២៤"],"A person will see this.":["एक व्यक्ति इसे देखेगा।","একজন মানুষ এটি দেখবেন।","एक जना व्यक्तिले यो हेर्नुहुनेछ।","လူတစ်ဦး ဒါကို ကြည့်ပါလိမ့်မည်။","មនុស្សម្នាក់នឹងមើលវា។"],"Saved on this phone. It will send when you are online.":["इस फ़ोन पर सहेजा गया। ऑनलाइन होने पर भेजा जाएगा।","এই ফোনে সংরক্ষিত। অনলাইনে এলে পাঠানো হবে।","यो फोनमा सुरक्षित गरियो। अनलाइन हुँदा पठाइनेछ।","ဤဖုန်းတွင် သိမ်းထားသည်။ အင်တာနက်ရလျှင် ပို့ပါမည်။","បានរក្សាទុកនៅលើទូរស័ព្ទនេះ។ នឹងផ្ញើនៅពេលមានអ៊ីនធឺណិត។"],"We could not send this.":["हम इसे भेज नहीं सके।","আমরা এটি পাঠাতে পারিনি।","हामीले यो पठाउन सकेनौं।","ဒါကို ပို့လို့ မရခဲ့ပါ။","យើងមិនអាចផ្ញើវាបានទេ។"],"Part of this reads like an instruction, so it was not sent.":["इसका एक हिस्सा निर्देश जैसा लगता है, इसलिए इसे नहीं भेजा गया।","এর একটি অংশ নির্দেশের মতো শোনায়, তাই এটি পাঠানো হয়নি।","यसको एउटा भाग निर्देशनजस्तो लाग्छ, त्यसैले पठाइएन।","ဒီထဲက တစ်စိတ်တစ်ပိုင်းက ညွှန်ကြားချက်လို ဖြစ်နေလို့ မပို့ခဲ့ပါ။","ផ្នែកមួយនៃនេះមើលទៅដូចជាការណែនាំ ដូច្នេះវាមិនត្រូវបានផ្ញើទេ។"],"In danger now? Call":["अभी ख़तरे में हैं? कॉल करें","এখন বিপদে আছেন? কল করুন","अहिले खतरामा हुनुहुन्छ? फोन गर्नुहोस्","အခု အန္တရာယ်ရှိနေလား။ ခေါ်ပါ","កំពុងមានគ្រោះថ្នាក់? សូមហៅ"],"free, any time":["मुफ़्त, किसी भी समय","বিনামূল্যে, যেকোনো সময়","निःशुल्क, जुनसुकै बेला","အခမဲ့၊ အချိန်မရွေး","ឥតគិតថ្លៃ គ្រប់ពេល"],"Message your mentor":["अपने मार्गदर्शक को संदेश भेजें","আপনার মেন্টরকে বার্তা পাঠান","आफ्नो मार्गदर्शकलाई सन्देश पठाउनुहोस्","သင့်လမ်းပြဆရာထံ စာပို့ပါ","ផ្ញើសារទៅអ្នកណែនាំរបស់អ្នក"],"Why am I seeing this?":["मुझे यह क्यों दिख रहा है?","আমি এটি কেন দেখছি?","मैले यो किन देखिरहेको छु?","ဒါကို ဘာကြောင့် မြင်နေရတာလဲ။","ហេតុអ្វីខ្ញុំឃើញនេះ?"],"Written by the assistant from today’s note. Nothing here is scored, and your words are not shared.":["यह सहायक ने आज के नोट से लिखा है। यहाँ कुछ भी अंकित नहीं होता, और आपके शब्द साझा नहीं किए जाते।","সহকারী আজকের নোট থেকে এটি লিখেছে। এখানে কিছুই নম্বর দেওয়া হয় না, এবং আপনার কথা শেয়ার করা হয় না।","यो सहायकले आजको नोटबाट लेखेको हो। यहाँ केही अंक दिइँदैन, र तपाईंका शब्दहरू साझा गरिँदैनन्।","ဒီနေ့ မှတ်စုကနေ အကူအညီပေးစနစ်က ရေးထားတာပါ။ ဘာမှ အမှတ်မပေးပါ၊ သင့်စကားတွေကို မမျှဝေပါ။","ជំនួយការបានសរសេរនេះពីកំណត់ត្រាថ្ងៃនេះ។ គ្មានអ្វីត្រូវបានដាក់ពិន្ទុទេ ហើយពាក្យរបស់អ្នកមិនត្រូវបានចែករំលែកទេ។"],"Did this help today?":["क्या आज इससे मदद मिली?","এটি কি আজ সাহায্য করেছে?","के यसले आज मद्दत गर्‍यो?","ဒါက ဒီနေ့ အထောက်အကူ ဖြစ်ခဲ့လား။","តើនេះបានជួយថ្ងៃនេះទេ?"],"Not really":["ज़्यादा नहीं","তেমন না","खासै होइन","သိပ်မဟုတ်ဘူး","មិនសូវទេ"],"Thanks. Counted, with no name.":["धन्यवाद। बिना नाम के गिना गया।","ধন্যবাদ। নাম ছাড়াই গণনা করা হয়েছে।","धन्यवाद। नाम बिना गनियो।","ကျေးဇူးပါ။ အမည်မပါဘဲ ရေတွက်ထားပါတယ်။","សូមអរគុណ។ បានរាប់ដោយគ្មានឈ្មោះ។"],"Retry":["फिर से कोशिश करें","আবার চেষ্টা করুন","फेरि प्रयास गर्नुहोस्","ထပ်ကြိုးစားပါ","ព្យាយាមម្ដងទៀត"],"Edit today’s note":["आज का नोट बदलें","আজকের নোট সম্পাদনা করুন","आजको नोट सम्पादन गर्नुहोस्","ဒီနေ့ မှတ်စုကို ပြင်ပါ","កែកំណត់ត្រាថ្ងៃនេះ"],"Sent. Your mentor will reach out today. Only your mentor sees this.":["भेज दिया। आपके मार्गदर्शक आज संपर्क करेंगे। इसे सिर्फ़ आपके मार्गदर्शक देखते हैं।","পাঠানো হয়েছে। আপনার মেন্টর আজ যোগাযোগ করবেন। শুধু আপনার মেন্টর এটি দেখেন।","पठाइयो। तपाईंका मार्गदर्शकले आज सम्पर्क गर्नुहुनेछ। यो तपाईंका मार्गदर्शकले मात्र देख्नुहुन्छ।","ပို့ပြီးပါပြီ။ သင့်လမ်းပြဆရာက ဒီနေ့ ဆက်သွယ်ပါလိမ့်မယ်။ သင့်လမ်းပြဆရာသာ မြင်ရပါတယ်။","បានផ្ញើ។ អ្នកណែនាំរបស់អ្នកនឹងទាក់ទងថ្ងៃនេះ។ មានតែអ្នកណែនាំរបស់អ្នកប៉ុណ្ណោះដែលឃើញនេះ។"]};
  var CA_IX = { hi: 0, bn: 1, ne: 2, my: 3, km: 4 };
  window.CAtr = function (s) { var r = CA_TR[s], i = CA_IX[window.CA_LANG]; return r && i != null ? r[i] : s; };
  window.CAT = function (k) { var s = CA_STR[window.CA_LANG]; return (s && s[k]) || null; };
  window.CA_LANG_EN = { en: "English", hi: "Hindi", bn: "Bengali", ne: "Nepali", my: "Burmese", km: "Khmer" };
  window.CALangPick = function () {
    var e = React.createElement, st = React.useState(window.CA_LANG), v = st[0], setV = st[1], os = React.useState(false), open = os[0], setOpen = os[1];
    var root = React.useRef(null), list = React.useRef(null);
    var pick = function (n) {
      try { localStorage.setItem("ca_lang", n); } catch (x) {}
      window.CA_LANG = n; document.documentElement.lang = n; setV(n); setOpen(false);
      window.dispatchEvent(new Event("ca-lang"));
      window.CAHaptic && window.CAHaptic("light");
      if (window.CAApi && window.CAApi.isLive() && !window.CA_DEMO) {
        window.CAApi.put("/me/preferences", { lang: n, theme: (window.CAPrefs && window.CAPrefs.get().theme) || "system", reduceMotion: !!(window.CAPrefs && window.CAPrefs.get().reduceMotion), remindMonthly: !!(window.CAPrefs && window.CAPrefs.get().remindMonthly) }).catch(function () {});
      }
      root.current && root.current.querySelector("button").focus();
    };
    React.useEffect(function () {
      if (!open) return;
      var out = function (ev) { if (root.current && !root.current.contains(ev.target)) setOpen(false); };
      var key = function (ev) { if (ev.key === "Escape") { ev.stopPropagation(); setOpen(false); root.current.querySelector("button").focus(); } };
      document.addEventListener("pointerdown", out); document.addEventListener("keydown", key, true);
      var sel = list.current && list.current.querySelector('[aria-selected="true"]'); sel && sel.focus();
      return function () { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", key, true); };
    }, [open]);
    var nav = function (ev) { var items = Array.prototype.slice.call(list.current.querySelectorAll('[role="option"]')), i = items.indexOf(document.activeElement);
      if (ev.key === "ArrowDown") { ev.preventDefault(); items[Math.min(i + 1, items.length - 1)].focus(); } else if (ev.key === "ArrowUp") { ev.preventDefault(); items[Math.max(i - 1, 0)].focus(); } else if (ev.key === "Home") { ev.preventDefault(); items[0].focus(); } else if (ev.key === "End") { ev.preventDefault(); items[items.length - 1].focus(); } };
    var cur = (window.CA_LANGS.find(function (l) { return l[0] === v; }) || window.CA_LANGS[0])[1];
    var globe = e("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, e("circle", { cx: 12, cy: 12, r: 9 }), e("path", { d: "M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" }));
    var chev = e("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", style: { transition: "transform 200ms var(--ease-out)", transform: open ? "rotate(180deg)" : "none" } }, e("path", { d: "M6 9l6 6 6-6" }));
    var check = e("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, e("path", { d: "M5 12.5l4.5 4.5L19 7.5" }));
    return e("div", { ref: root, "data-no-tr": "", style: { position: "relative", flex: "none" } },
      e("button", { type: "button", "aria-haspopup": "listbox", "aria-expanded": open, "aria-label": "Language: " + (window.CA_LANG_EN[v] || "English"), onClick: function () { setOpen(!open); }, className: "ca-lang-btn",
        style: { display: "inline-flex", alignItems: "center", gap: 6, height: 44, padding: "0 12px", borderRadius: 999, border: "1px solid " + (open ? "var(--lamp-400)" : "var(--border-default)"), background: open ? "var(--surface-raised)" : "transparent", color: "var(--text-body)", font: "600 13px/1 var(--font-body)", cursor: "pointer", transition: "border-color 200ms var(--ease-out), background 200ms var(--ease-out)" } }, globe, e("span", null, cur), chev),
      open ? e("ul", { ref: list, role: "listbox", "aria-label": "Language", onKeyDown: nav,
        style: { position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 200, minWidth: 200, margin: 0, padding: 6, listStyle: "none", borderRadius: "var(--radius-lg)", background: "var(--surface-raised)", border: "1px solid var(--border-default)", boxShadow: "var(--elev-3, 0 12px 32px rgba(0,0,0,.4))", animation: "ca-pop 160ms var(--ease-out)" } },
        window.CA_LANGS.map(function (l) { var on = l[0] === v;
          return e("li", { key: l[0], role: "option", "aria-selected": on, tabIndex: -1, lang: l[0], onClick: function () { pick(l[0]); }, onKeyDown: function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(l[0]); } }, className: "ca-lang-opt",
            style: { display: "flex", alignItems: "center", gap: 10, minHeight: 52, padding: "8px 10px", borderRadius: "var(--radius-md)", cursor: "pointer", background: on ? "var(--lamp-tint)" : "transparent", color: on ? "var(--text-strong)" : "var(--text-body)", outline: "none" } },
            e("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0 } }, e("span", { style: { font: "600 16px/1.45 var(--font-body)" } }, l[1]), l[0] !== "en" ? e("span", { lang: "en", style: { font: "400 13px/1.3 var(--font-body)", color: "var(--text-muted)" } }, window.CA_LANG_EN[l[0]]) : null),
            on ? e("span", { style: { color: "var(--lamp-400)", display: "grid" } }, check) : null);
        })) : null);
  };
  (function () { if (document.getElementById("ca-lang-css")) return; var s = document.createElement("style"); s.id = "ca-lang-css"; s.textContent = "@keyframes ca-pop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}.ca-lang-btn:hover{border-color:var(--border-strong)!important;background:var(--surface-raised)!important}.ca-lang-btn:active{transform:scale(.97)}.ca-lang-btn:focus-visible{outline:2px solid var(--focus-ring,var(--lamp-400));outline-offset:2px}.ca-lang-opt:hover{background:var(--surface-card)!important}.ca-lang-opt[aria-selected=true]:hover{background:var(--lamp-tint)!important}.ca-lang-opt:focus-visible{box-shadow:inset 0 0 0 1px var(--border-strong)}.ca-lang-opt[aria-selected=true]:focus-visible{box-shadow:none}@media (prefers-reduced-motion:reduce){.ca-lang-btn,.ca-lang-btn svg{transition:none!important}[role=listbox]{animation:none!important}}"; (document.head || document.documentElement).appendChild(s); })();
  // Voice input — the browser's own speech-to-text. No audio is recorded or stored by Rhema.ai. Hidden where unsupported.
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SR_LANG = { en: "en-US", hi: "hi-IN", bn: "bn-BD", ne: "ne-NP", my: "my-MM", km: "km-KH" };
  window.CAMic = function (props) {
    var e = React.createElement, st = React.useState(false), on = st[0], setOn = st[1], rec = React.useRef(null), errSt = React.useState(""), err = errSt[0], setErr = errSt[1];
    React.useEffect(function () { return function () { try { rec.current && rec.current.abort(); } catch (x) {} }; }, []);
    if (window.CAGuard && window.CAGuard.lockdown && window.CAGuard.lockdown()) {
      return e("p", { style: { margin: 0, font: "600 13px/1.35 var(--font-body)", color: "var(--text-muted)" } }, "Voice input is paused while a safety alert is on.");
    }
    if (!SR) {
      return e("p", { style: { margin: 0, font: "600 13px/1.35 var(--font-body)", color: "var(--text-muted)" } }, "Voice search needs Chrome, Edge, or Safari on HTTPS (or localhost). Type your word instead.");
    }
    var toggle = function () {
      if (on) { try { rec.current.stop(); } catch (x) {} return; }
      var r = new SR(); rec.current = r; r.lang = SR_LANG[window.CA_LANG] || "en-US"; r.interimResults = false; r.maxAlternatives = 1;
      r.onresult = function (ev) { var t = ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript; if (t) { setErr(""); props.onText(t.trim()); } };
      r.onend = function () { setOn(false); };
      r.onerror = function (ev) {
        setOn(false);
        var code = ev && ev.error;
        if (code === "not-allowed" || code === "service-not-allowed") setErr("Microphone blocked. Allow mic for this site in browser settings, then try again.");
        else if (code === "no-speech") setErr("Didn’t catch that. Try again closer to the mic.");
        else setErr("Voice didn’t work this time. Type instead.");
      };
      try { r.start(); setOn(true); window.CAHaptic && window.CAHaptic("light"); } catch (x) { setOn(false); }
    };
    var mic = e("svg", { width: props.inline ? 16 : 20, height: props.inline ? 16 : 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, e("rect", { x: 9, y: 3, width: 6, height: 11, rx: 3 }), e("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3" }));
    var label = on ? "Listening… tap to stop" : "Speak instead";
    if (props.inline) return e(React.Fragment, null, e("button", { type: "button", onClick: toggle, "aria-pressed": on, className: "ca-mic", style: { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44, padding: "0 2px", background: "none", border: 0, cursor: "pointer", font: "600 13px/1.3 var(--font-body)", color: on ? "var(--lamp-400)" : "var(--text-muted)" } }, e("span", { className: on ? "ca-mic-on" : "", style: { display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 99 } }, mic), label), err ? e("p", { role: "alert", style: { margin: "4px 0 0", font: "600 13px/1.35 var(--font-body)", color: "var(--clay-400, var(--text-muted))" } }, err) : null);
    var sz = props.size || 52;
    return e("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, e("button", { type: "button", onClick: toggle, "aria-pressed": on, "aria-label": on ? "Stop listening" : "Speak a word", className: "ca-mic ca-mic-btn" + (on ? " ca-mic-on" : ""), style: { width: sz, height: sz, flex: "none", display: "grid", placeItems: "center", borderRadius: 999, border: "1px solid " + (on ? "var(--lamp-400)" : "var(--border-default)"), background: on ? "var(--lamp-tint)" : "var(--surface-card)", color: on ? "var(--lamp-400)" : "var(--text-body)", cursor: "pointer" } }, mic), err ? e("span", { role: "alert", style: { maxWidth: 140, textAlign: "center", font: "600 11px/1.3 var(--font-body)", color: "var(--text-muted)" } }, err) : null);
  };
  (function () { if (document.getElementById("ca-mic-css")) return; var s = document.createElement("style"); s.id = "ca-mic-css"; s.textContent = "@keyframes ca-mic-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--lamp-400) 45%,transparent)}100%{box-shadow:0 0 0 10px transparent}}.ca-mic-on{animation:ca-mic-pulse 1.6s ease-out infinite}.ca-mic-btn{transition:border-color 200ms var(--ease-out),background 200ms var(--ease-out),transform 120ms var(--ease-out)}.ca-mic-btn:hover{border-color:var(--border-strong)!important}.ca-mic-btn:active,.ca-save:active{transform:scale(.96)}.ca-mic:focus-visible,.ca-save:focus-visible{outline:2px solid var(--lamp-400);outline-offset:2px}.ca-mic:hover,.ca-save:hover{color:var(--text-body)!important}@media (prefers-reduced-motion:reduce){.ca-mic-on{animation:none}}"; (document.head || document.documentElement).appendChild(s); })();
  window.CACrisisLine = { Bangladesh: ["999", "national emergency"], India: ["112", "emergency"], Nepal: ["1166", "suicide prevention line"], "Sri Lanka": ["1926", "mental health helpline"], "United States": ["988", "Suicide & Crisis Lifeline"] };
  (function () {
    var A = window.CAApi;
    if (!A) return;
    A.ready.then(function (ok) {
      if (!ok || window.CA_DEMO) return;
      return A.get("/crisis-lines?country=United%20States").then(function (r) {
        if (r && r.number) window.CACrisisLine["United States"] = [r.number, r.what || "Suicide & Crisis Lifeline"];
      }, function () {});
    });
  })();
  // No haptics: window.CAHaptic is intentionally not defined. Screens call it only if it exists.
})();
