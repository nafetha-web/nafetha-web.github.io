/* Nafetha owner panels and kitchen screen: Arabic / English switch.
   The panels are written in Arabic; in English mode this translates what is on screen
   (and what appears later) using a phrase list, number-aware rules, and the menu's own names. */
(function () {
  var KEY = 'nf_panel_lang';
  var lang = 'ar'; try { lang = localStorage.getItem(KEY) || 'ar' } catch (e) {}
  var D = {
    'نموذج تجريبي لباقة Pro: هكذا تبدو شاشة المطبخ. افتح': 'Pro package demo: this is the kitchen screen. Open', 'صفحة الطاولة 5': 'the table 5 page', 'من هاتف آخر واطلب، وشاهد الطلب يصل هنا.': 'on another phone, order, and watch it arrive here.',
    'شاشة المطبخ': 'Kitchen screen', '👨‍🍳 شاشة المطبخ': '👨‍🍳 Kitchen screen', 'مطبخ الريحان': 'Matbakh El Rayhan', 'كلمة السر': 'Password', 'دخول': 'Sign in', 'متصل': 'Live', 'لا يوجد اتصال': 'Offline',
    '🔕 فعّل الصوت': '🔕 Turn sound on', '🔔 الصوت مفعّل': '🔔 Sound on', 'خروج': 'Sign out', 'طلبات جديدة': 'New orders', 'قيد التحضير': 'Preparing', 'جاهز للتقديم': 'Ready to serve', 'آخر ما قُدِّم': 'Recently served',
    'الآن': 'now', 'كلمة السر غير صحيحة': 'Wrong password', 'ابدأ التحضير': 'Start preparing', 'جاهز ✓': 'Ready ✓', 'قُدِّم للطاولة': 'Served', 'طاولة': 'Table', 'إلغاء': 'Cancel',
    'لا طلبات جديدة الآن': 'No new orders right now', 'لا شيء قيد التحضير': 'Nothing being prepared', 'لا شيء بانتظار التقديم': 'Nothing waiting to be served', 'جديد': 'New', 'تحضير': 'Preparing', 'جاهز': 'Ready',
    'تطلب الحساب': 'asks for the bill', 'تطلب النادل': 'calls the waiter', 'تمّ ✓': 'Done ✓',
    'نموذج تجريبي لباقة Pro: هيك بتكون لوحة صاحب المطعم. تصميم': 'Pro package demo: this is the restaurant owner’s panel. Designed by', 'نافذة': 'Nafetha', 'لوحة مطبخ الريحان': 'Matbakh El Rayhan panel',
    'طبق اليوم والعروض والـ Happy Hour، من تلفونك.': 'Dish of the day, offers and happy hour, from your phone.', '👨‍🍳 المطبخ': '👨‍🍳 Kitchen', 'الموقع ↗': 'Site ↗', 'عروض شغّالة': 'Live offers', 'نفدوا اليوم': 'Sold out today',
    'الإحصائيات': 'Stats', '📊 الإحصائيات': '📊 Stats', 'ابعت إشعار للزبائن': 'Send a notification to customers', 'بيوصل لكل يلي فعّلوا الإشعارات بالتطبيق': 'Reaches everyone who turned on notifications in the app',
    'الكل': 'All', 'العروض': 'Offers', 'نفدوا': 'Sold out', 'دوّر على طبق…': 'Search dishes…', 'حدّث الأرقام': 'Refresh numbers', 'كلمة السر غلط، جرّب مرّة تانية': 'Wrong password, try again',
    'ما في إنترنت، جرّب بعد شوي': 'No internet, try again shortly', 'ما في تعديلات بعد': 'No changes yet', 'كل الأقسام': 'All sections', 'شيل كل العروض': 'Remove all offers', '⭐ طبق اليوم': '⭐ Dish of the day',
    'نفد': 'Sold out', 'سعر جديد': 'New price', 'ما في عروض شغّالة. اكبس على أي طبق لتعمل عرض.': 'No live offers. Tap any dish to create one.', 'كل الأطباق متوفّرة 👌': 'Every dish is available 👌',
    'ما لقينا شي': 'Nothing found', 'طبق اليوم': 'Dish of the day', 'ما في، اكبس لتختار': 'None, tap to choose', 'مطفي، اكبس لتشغّلو': 'Off, tap to turn on', 'اختار الطبق من اللائحة، وفعّل «طبق اليوم»': 'Pick the dish from the list and turn on “Dish of the day”',
    'عم يحدّث…': 'Refreshing…', 'ما زبط، جرّب بعد شوي': 'That didn’t work, try again shortly', 'أكيد بدّك تشيل كل العروض؟': 'Remove all offers?', 'انشالت كل العروض': 'All offers removed',
    'لآخر اليوم': 'Until tonight', 'لبكرا بالليل': 'Until tomorrow night', '3 أيام': '3 days', 'أسبوع': '1 week', 'بلا وقت': 'No end', 'سعر العرض': 'Offer price', 'هيدا تغيير سعر، مش عرض': 'This is a price change, not an offer',
    'اكتب السعر أو اختار خصم:': 'Type a price or pick a discount:', 'لأيمتى؟': 'Until when?', 'بيطلع بكارت كبير فوق القائمة': 'Shows as a big card above the menu', 'جملة قصيرة، مثلًا: مشاوي على الفحم مع خبز ساخن': 'A short line, e.g. charcoal grill with warm bread',
    'نفد اليوم': 'Sold out today', 'بيطلع «نفد اليوم» عالموقع وما حدا بيقدر يطلبو': 'Shows “Sold out today” on the site and nobody can order it', 'نشر عالموقع': 'Publish to the site', 'شيل العرض': 'Remove offer',
    '🍽️ طلبات الطاولات اليوم': '🍽️ Table orders today', 'طلب': 'orders', 'مجموع المبيعات': 'Total sales', 'مشتركين بالإشعارات': 'Notification subscribers', 'نزّلوا التطبيق على تلفونهم': 'Installed the app',
    '👆 فاتوا من التطبيق': '👆 Opened the app', 'اليوم': 'Today', 'آخر 7 أيام': 'Last 7 days', 'من أول ما اشتغل التطبيق': 'Since launch',
    'كل زبون بينحسب مرّة وحدة باليوم، حتى لو فات أكتر من مرّة. «من أول ما اشتغل» هوّي مجموع الزيارات اليومية كلها.': 'Each customer counts once a day, even if they open it several times. “Since launch” adds up all daily visits.',
    'خصم تلقائي بساعات محدّدة كل يوم، بيشتغل وبيطفى لحالو': 'An automatic discount at set hours every day, it turns on and off by itself', 'شغّال': 'On', 'إذا طفّيتو، بيضلّوا الإعدادات محفوظة': 'If you turn it off, the settings are kept',
    'الوقت': 'Time', 'من': 'From', 'لـ': 'To', 'الخصم': 'Discount', 'على شو؟': 'On what?', 'كل القائمة': 'Whole menu', 'الزبون بيشوف شريط بنفسجي «Happy Hour» والأسعار المخفّضة بس خلال هالوقت.': 'Customers see a purple “Happy Hour” bar and the lower prices only during these hours.',
    'اختار الوقت': 'Pick the time', 'الـ Happy Hour شغّال ✓': 'Happy hour is on ✓', 'انطفى الـ Happy Hour': 'Happy hour turned off', '📣 إشعار للزبائن': '📣 Notify customers',
    'ما في مشتركين بعد. بس يفعّلوا الإشعارات بالتطبيق بيوصلهم': 'No subscribers yet. Once customers turn on notifications in the app, it reaches them', 'العنوان': 'Title', 'الرسالة': 'Message',
    'مثلًا: ⭐ طبق اليوم: مشاوي مشكّلة': 'e.g. ⭐ Dish of the day: mixed grill', 'اقتراحات جاهزة': 'Ready suggestions', 'نص الإشعار رح يطلع هون': 'Your notification text appears here', 'هلّق': 'now',
    'ابعت الإشعار': 'Send notification', 'اكتب نص الإشعار': 'Write the notification text', 'عم يبعت…': 'Sending…', 'انحفظ ✓ بس ما في مشتركين بعد': 'Saved ✓ but there are no subscribers yet', 'ما زبط، جرّب مرّة تانية': 'That didn’t work, try again',
    'انشال العرض ✓': 'Offer removed ✓', 'اكتب سعر صحيح': 'Enter a valid price', 'صار عالموقع ✓': 'Live on the site ✓', 'ما زبط، تأكّد من الإنترنت وجرّب مرّة تانية': 'That didn’t work, check your internet and try again',
    'نموذج تجريبي: هيك بتكون لوحة صاحب الماركت. تصميم': 'Demo: this is the market owner’s panel. Designed by', 'لوحة خيرات ماركت': 'Khayrat Market panel', 'العروض والأسعار والمخزن، من تلفونك.': 'Offers, prices and stock, from your phone.',
    'شوف الموقع ↗': 'View site ↗', 'خلصانين': 'Out of stock', 'دوّر على منتج…': 'Search products…', 'بالكيلو': 'per kg', 'خلص': 'Out', 'ما في عروض شغّالة. اكبس على أي منتج لتعمل عرض.': 'No live offers. Tap any product to create one.',
    'كل المنتجات متوفّرة 👌': 'Everything is in stock 👌', 'خلص من المخزن': 'Out of stock', 'بيطلع «خلص» عالموقع وما حدا بيقدر يطلبو': 'Shows “Out” on the site and nobody can order it', 'خيرات ماركت': 'Khayrat Market',
    'مثلًا: 🔥 الزيت بـ 8$ بس لليوم!': 'e.g. 🔥 Olive oil $8, today only!', 'السعر العادي': 'Regular price', 'لوحة التحكّم | خيرات ماركت': 'Control panel | Khayrat Market', 'لوحة التحكّم | مطبخ الريحان': 'Control panel | Matbakh El Rayhan',
    'شاشة المطبخ | مطبخ الريحان': 'Kitchen screen | Matbakh El Rayhan', '🔥 المشاوي عالفحم جاهزة، احجز طاولتك أو اطلب لعندك': '🔥 Charcoal grills are ready, book a table or order in',
    '🥬 الخضرة الطازجة وصلت هلّق، اطلب وبتوصلك خلال 45 دقيقة': '🥬 Fresh produce just arrived, order and get it in 45 minutes', 'Happy Hour': 'Happy Hour',
    'الزبون رح يشوف': 'Customers will see', 'عالمنتج': 'on it', 'التطبيق شغّال من': 'The app has been live since'
  };
  var R = [
    [/^منذ (\d+) د$/, '$1 min ago'], [/^منذ (\d+) س$/, '$1 h ago'],
    [/باقي (\d+) يوم و(\d+) س/, '$1d $2h left'], [/باقي (\d+) يوم/, '$1d left'], [/باقي (\d+) س و(\d+) د/, '$1h $2m left'], [/باقي (\d+) س/, '$1h left'], [/باقي (\d+) د/, '$1m left'],
    [/رح يوصل لـ (\d+) زبون/, 'Will reach $1 customers'], [/انبعت ✓ لـ (\d+) زبون/, 'Sent ✓ to $1 customers'], [/الزبون رح يشوف (-\d+%) عالمنتج/, 'Customers will see $1 on it'],
    [/^إلغاء طلب الطاولة (\d+)؟$/, 'Cancel table $1’s order?'], [/^طاولة (\d+)/, 'Table $1'], [/آخر ما قُدِّم \((\d+)\)/, 'Recently served ($1)'],
    [/^جديد \((\d+)\)$/, 'New ($1)'], [/^تحضير \((\d+)\)$/, 'Preparing ($1)'], [/^جاهز \((\d+)\)$/, 'Ready ($1)'], [/^العروض \((\d+)\)$/, 'Offers ($1)'], [/^نفدوا \((\d+)\)$/, 'Sold out ($1)'], [/^خلصانين \((\d+)\)$/, 'Out of stock ($1)'],
    [/^مطفي/, 'Off'], [/التطبيق شغّال من (.+?)\. /, 'The app has been live since $1. ']
  ];
  var NAMES = {}; // menu and category names from the page data
  function addNames() {
    try { (typeof P !== 'undefined' ? P : []).forEach(function (p) { if (p.ar && p.en) NAMES[p.ar] = p.en; if (p.uar && p.uen) NAMES[p.uar] = p.uen }) } catch (e) {}
    try { (typeof CATS !== 'undefined' ? CATS : []).forEach(function (c) { if (c.ar && c.en) NAMES[c.ar] = c.en }) } catch (e) {}
    try { (typeof MENU !== 'undefined' ? MENU : []).forEach(function (c) { NAMES[c.ar] = c.en; c.items.forEach(function (i) { NAMES[i.ar] = i.en; if (i.dar && i.den) NAMES[i.dar] = i.den }) }) } catch (e) {}
  }
  var AR_DIG = /[٠-٩]/g, WD = { 'الأحد': 'Sunday', 'الاثنين': 'Monday', 'الثلاثاء': 'Tuesday', 'الأربعاء': 'Wednesday', 'الخميس': 'Thursday', 'الجمعة': 'Friday', 'السبت': 'Saturday' };
  var parts = null;
  function tr(s) {
    if (lang !== 'en' || !s || !/[؀-ۿ]/.test(s)) return s;
    var t = s.trim(); if (!t) return s;
    var lead = s.slice(0, s.indexOf(t)), tail = s.slice(s.indexOf(t) + t.length);
    if (D[t]) return lead + D[t] + tail;
    if (NAMES[t]) return lead + NAMES[t] + tail;
    var out = t.replace(AR_DIG, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d) });
    for (var i = 0; i < R.length; i++) out = out.replace(R[i][0], R[i][1]);
    if (!parts) parts = Object.keys(D).concat(Object.keys(NAMES)).filter(function (k) { return k.length > 2 }).sort(function (a, b) { return b.length - a.length });
    for (var j = 0; j < parts.length && /[؀-ۿ]/.test(out); j++) if (out.indexOf(parts[j]) > -1) out = out.split(parts[j]).join(D[parts[j]] || NAMES[parts[j]]);
    for (var w in WD) out = out.split(w).join(WD[w]);
    out = out.replace(/(\d)\s*ص(?=\s|$)/g, '$1 AM').replace(/(\d)\s*م(?=\s|$)/g, '$1 PM').replace(/آخر تحديث:/, 'Last update:').replace(/ بـ /g, ' for ').replace(/ بدل /g, ' instead of ');
    return lead + out + tail;
  }
  function walk(root) {
    if (lang !== 'en' || !root) return;
    if (root.nodeType === 3) { var v = tr(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return }
    if (root.nodeType !== 1 || root.tagName === 'SCRIPT' || root.tagName === 'STYLE') return;
    ['placeholder', 'aria-label', 'title'].forEach(function (a) { if (root.hasAttribute && root.hasAttribute(a)) { var v = tr(root.getAttribute(a)); if (v !== root.getAttribute(a)) root.setAttribute(a, v) } });
    if (root.tagName === 'INPUT' && root.type === 'button') root.value = tr(root.value);
    for (var c = root.firstChild; c; c = c.nextSibling) walk(c);
  }
  function button(host, dark) {
    if (!host || host.querySelector('.nfl')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'nfl'; b.textContent = lang === 'en' ? 'عربي' : 'English';
    b.style.cssText = 'border:1px solid ' + (dark ? 'rgba(255,255,255,.35)' : 'currentColor') + ';border-radius:99px;padding:6px 12px;font:inherit;font-size:13px;font-weight:600;background:transparent;color:inherit;cursor:pointer;white-space:nowrap';
    b.addEventListener('click', function () { try { localStorage.setItem(KEY, lang === 'en' ? 'ar' : 'en') } catch (e) {} location.reload() });
    host.appendChild(b);
  }
  window.nfTr = tr;
  document.addEventListener('DOMContentLoaded', function () {
    addNames();
    button(document.querySelector('.top .wrap') || document.querySelector('.top'), true);
    var lb = document.querySelector('.lbox'); if (lb) { var w = document.createElement('div'); w.style.cssText = 'margin-top:14px'; lb.appendChild(w); button(w, false) }
    if (lang !== 'en') return;
    document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
    var c0 = window.confirm; window.confirm = function (m) { return c0.call(window, tr(m)) };
    walk(document.body); document.title = tr(document.title);
    new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.type === 'characterData') walk(m.target); else m.addedNodes.forEach(walk); if (m.type === 'attributes') walk(m.target) }) })
      .observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label'] });
  });
})();
