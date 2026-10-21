"""Generate /for/<slug>/index.html sector landing pages.
Run from the repo root:  python3 _tools/gen_sectors.py
"""
import json, os, html, sys
sys.path.insert(0, os.path.dirname(__file__))
from sectors_data import SECTORS

ICONS = {
 'menu': '<path d="M4 6h16M4 12h16M4 18h10"/>',
 'cart': '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6"/>',
 'cal': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 'qr': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4"/>',
 'pin': '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
 'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>',
 'star': '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 'ba': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M9 10l-2 2 2 2M15 10l2 2-2 2"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'help': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01"/>',
 'calc': '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
 'gift': '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8H8.5a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8zM12 8h3.5a2.5 2.5 0 1 0 0-5C13 3 12 8 12 8z"/>',
 'img': '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
 'card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
 'ticket': '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
 'layers': '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
 'chat': '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
 'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 'bar': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 'track': '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
 'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/>',
 'truck': '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
 'x': '<path d="M18 6 6 18M6 6l12 12"/>', 'check': '<path d="M5 12.5 10 17 19 7"/>'
}
def ico(k, s=22, sw=1.9):
    return f'<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[k]}</svg>'

WA_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.2-.2-.4-.3z"/></svg>'
LOGO = '<svg width="38" height="38" viewBox="0 0 100 100" aria-hidden="true"><polygon points="31,16 8,24 8,74 31,82" fill="#0E4D4A"/><polygon points="69,16 92,24 92,74 69,82" fill="#0E4D4A"/><rect x="34" y="16" width="32" height="66" rx="4" fill="#E2B04A"/><rect x="4" y="85" width="92" height="8" rx="4" fill="#0E4D4A"/></svg>'

# shared copy (matches the home page wording and prices)
C = {
 'brand': ('نافذة', 'Nafetha'), 'langBtn': ('English', 'عربي'),
 'navDemo': ('النموذج', 'Demo'), 'navFeat': ('المزايا', 'Features'), 'navPrice': ('الأسعار', 'Pricing'), 'navFaq': ('الأسئلة', 'FAQ'), 'navContact': ('تواصل معنا', 'Contact us'),
 'eyebrow': ('مواقع لـ', 'Websites for '),
 'cta1': ('شاهد موقعك الآن', 'See your site now'), 'cta2': ('جرّب النموذج', 'Try the demo'),
 'assure': [('نموذج مجاني قبل أي دفع', 'Free sample before you pay'), ('جاهز خلال 3 إلى 5 أيام عمل', 'Ready in 3 to 5 working days'), ('بدون عقود طويلة', 'No long contracts'), ('نردّ خلال ساعة', 'We reply within an hour')],
 'painT': ('هل يحدث هذا معك؟', 'Sound familiar?'), 'painS': ('مشاكل يومية يحلّها موقع واحد مصمّم لنشاطك.', 'Everyday problems one well-built site solves.'),
 'featT': ('ما يتضمّنه موقعك', 'What your site includes'), 'featS': ('مزايا مصمّمة لطريقة عملك، من الهاتف أو الكمبيوتر.', 'Features built around how you work, on phone or desktop.'),
 'demoK': ('نموذج حيّ', 'Live demo'), 'demoT': ('جرّبه بنفسك قبل أن تقرّر', 'Try it yourself before you decide'), 'tryT': ('جرّب فيه:', 'Things to try:'), 'demoBtn': ('افتح النموذج', 'Open the demo'),
 'stepsT': ('طريقة العمل', 'How it works'), 'stepsS': ('ثلاث خطوات، ولا تدفع شيئًا قبل أن ترى موقعك.', 'Three steps, and you pay nothing until you see your site.'),
 'steps': [(('نصمّم لك نموذجًا مجانيًا', 'We design a free sample'), ('نجهّز موقعًا تجريبيًا باسم نشاطك وبمحتواك، قبل أن تدفع شيئًا.', 'We prepare a trial site with your name and content, before you pay anything.')),
           (('تراجعه وتعطينا رأيك', 'You review it'), ('نرسل لك الرابط عبر واتساب، ونعدّله حتى يصبح كما تريد.', 'We send the link on WhatsApp and adjust it until it’s right.')),
           (('تختار طريقة الدفع وينطلق موقعك', 'Choose how to pay and go live'), ('اشتراك شهري، أو شراء الموقع مرة واحدة.', 'Monthly plan, or buy the site once.'))],
 'priceT': ('الأسعار', 'Pricing'), 'priceS': ('موقع كامل بكل المزايا، وأنت تختار طريقة الدفع.', 'One complete site with every feature; you choose how to pay.'),
 'promo': ('عرض نهاية السنة حتى 31 كانون الأول: الاشتراك الشهري أول أسبوعين مجانًا، وشراء الموقع بـ 199$ بدل 249$.', 'End-of-year offer until December 31: monthly plan free for the first two weeks, and buy your site for $199 instead of $249.'),
 'p1n': ('اشتراك شهري', 'Monthly plan'), 'p1f': ('ابدأ بدون مبلغ كبير', 'Start without a big payment'), 'p1u': ('شهريًا', 'per month'), 'p1d': ('أول أسبوعين مجانًا', 'First two weeks free'),
 'p1l': [('كل مزايا الموقع', 'Every site feature'), ('تعديلات غير محدودة ومشمولة', 'Unlimited updates included'), ('الإيقاف في أي وقت', 'Cancel any time'), ('رابط باسم نشاطك على نطاق نافذة', 'A link with your name on the Nafetha domain')],
 'p2n': ('شراء الموقع', 'Buy your site'), 'p2f': ('ادفع مرة واحدة والموقع لك', 'Pay once and it’s yours'), 'p2u': ('مرة واحدة', 'one time'), 'p2d': ('199$ بدل 249$', '$199 instead of $249'), 'p2tag': ('الأوفر على المدى الطويل', 'Best long-term value'),
 'p2a': ('ثم 60$ سنويًا للاستضافة والنطاق، ابتداءً من السنة الثانية', 'Then $60 a year for hosting and domain, from year two'),
 'p2l': [('كل مزايا الموقع', 'Every site feature'), ('الموقع ملكك بالكامل', 'The site is fully yours'), ('نطاق خاص (.com) مسجّل باسمك', 'Your own .com domain in your name'), ('باقة تعديلات اختيارية: 5$ شهريًا', 'Optional updates plan: $5/month')],
 'basicK': ('باقة Basic', 'Basic package'), 'proK': ('باقة Pro', 'Pro package'), 'proPrice': ('45$ شهريًا، أو 550$ شراء ثم 90$ سنويًا', '$45 a month, or $550 to buy then $90 a year'),
 'proSoon': ('قريبًا', 'Coming soon'), 'proLive': ('متوفّر الآن', 'Available now'), 'proBtn': ('اسأل عن Pro', 'Ask about Pro'), 'proTry': ('جرّب نظام Pro', 'Try the Pro system'), 'proLead': ('كل مزايا Basic، مع نظام متكامل وتطبيق يُثبَّت على الهاتف وإشعارات ولوحة تحكّم تديرها بنفسك:', 'Everything in Basic, plus a full system, an installable app, notifications and a control panel you run yourself:'),
 'start': ('ابدأ الآن', 'Start now'), 'more': ('تفاصيل أكثر عن الأسعار', 'More pricing details'),
 'faqT': ('أسئلة شائعة', 'FAQ'), 'faqS': ('لم تجد جوابك؟ راسلنا عبر واتساب.', 'Didn’t find your answer? Message us on WhatsApp.'),
 'endT': ('جاهز لترى موقع نشاطك؟', 'Ready to see your site?'), 'endS': ('شاهد واجهة موقعك خلال ثوانٍ، أو راسلنا ونجهّز لك نموذجًا مجانيًا باسمك.', 'See your homepage in seconds, or message us for a free sample with your name.'),
 'endWa': ('اطلب نموذجًا مجانيًا', 'Get a free sample'),
 'otherT': ('حلول لقطاعات أخرى', 'Other industries'),
 'copy': ('© 2026 نافذة', '© 2026 Nafetha'), 'home': ('الرئيسية', 'Home'), 'terms': ('الشروط والخصوصية', 'Terms & privacy'), 'waFloat': ('راسلنا', 'Message us'),
}

PRO = {
 'rest': ('../../demo/rayhan/#t5', [('الطلب من الطاولة عبر رمز QR', 'Order from the table by QR code'), ('شاشة للمطبخ تستقبل الطلبات مباشرة', 'A kitchen screen that receives orders live'), ('زر لطلب النادل وزر لطلب الحساب', 'Call-waiter and ask-for-bill buttons'), ('طبق اليوم وأسعار Happy Hour تلقائية', 'Dish of the day and automatic happy-hour prices')]),
 'cafe': (False, [('بطاقة ولاء رقمية بالأختام', 'A digital loyalty stamp card'), ('اطلب مسبقًا وتصلك «قهوتك جاهزة»', 'Order ahead and get “your coffee is ready”'), ('إشعارات بالعروض لزبائنك', 'Offer notifications for your customers')]),
 'clinic': (False, [('حجز أونلاين مع رابط للدور المباشر', 'Online booking with a live queue link'), ('إشعار «دورك بعد مريض واحد»', '“You are next” notification'), ('تذكير بالموعد قبل يوم', 'Appointment reminder the day before')]),
 'salon': (False, [('حجز حسب الموظفة والوقت المتاح', 'Booking by staff member and free slots'), ('بطاقات هدايا برمز تُصرف من اللوحة', 'Gift cards with codes redeemed from the panel'), ('تذكير بموعد الزيارة التالية', 'Reminder for the next visit')]),
 'gym': (False, [('بطاقة عضو QR للدخول', 'A member QR card for check-in'), ('تنبيه قبل انتهاء الاشتراك', 'Alert before a membership expires'), ('حجز الحصص مع لائحة انتظار', 'Class booking with a waitlist')]),
 'office': (False, [('بوابة خاصة يتابع فيها العميل ملفه', 'A private portal where clients follow their file'), ('لائحة بالمستندات المطلوبة من كل عميل', 'A checklist of documents needed from each client'), ('تذكير تلقائي بالمواعيد المهمة', 'Automatic reminders for key deadlines')]),
 'build': (False, [('بوابة خاصة يتابع فيها الزبون تقدّم مشروعه بالصور', 'A private portal showing project progress in photos'), ('تحديثات أسبوعية تصله بإشعار', 'Weekly updates delivered as a notification')]),
 'garage': (False, [('ملف لكل سيارة برقم اللوحة', 'A file for every car by plate number'), ('تتبّع حالة السيارة حتى تصبح جاهزة', 'Live car status until it is ready'), ('تذكير تلقائي بتغيير الزيت', 'Automatic oil-change reminders')]),
 'gift': (False, [('حجز المناسبات حسب الأيام المتاحة', 'Event booking by available dates'), ('عرض سعر فوري لكل باقة تزيين', 'Instant quotes for each decoration package'), ('تذكير الزبائن بمناسباتهم السنوية', 'Reminders for customers’ yearly occasions')]),
}

def A(p): return p[0]

def build(s):
    D = {}  # key -> [ar, en]
    def k(key, pair, raw=False):
        D[key] = list(pair)
        return html.escape(pair[0]) if not raw else pair[0]
    for kk, v in C.items():
        if isinstance(v, tuple): D[kk] = list(v)
    slug, key = s['slug'], s['key']
    wa_ar = f"مرحبًا نافذة، رأيت صفحة «{s['name'][0]}» على موقعكم وأريد نموذجًا مجانيًا لنشاطي."
    wa_en = f"Hello Nafetha, I saw your “{s['name'][1]}” page and would like a free sample for my business."
    D['waMsg'] = [wa_ar, wa_en]
    D['title'] = [f"مواقع لـ{s['name'][0]} | نافذة", f"Websites for {s['name'][1].lower()} | Nafetha"]
    D['eyebrowFull'] = [C['eyebrow'][0] + s['name'][0], C['eyebrow'][1] + s['name'][1]]
    D['h1'] = list(s['h1']); D['lead'] = list(s['lead']); D['demoName'] = list(s['demoName'])

    pains = ''.join(f'''<div class="pain rv"><span class="x">{ico('x', 18, 2.4)}</span><h3 data-k="pain{i}t">{k(f'pain{i}t', p[0])}</h3><p data-k="pain{i}d">{k(f'pain{i}d', p[1])}</p></div>''' for i, p in enumerate(s['pains']))
    feats = ''.join(f'''<div class="feat"><span class="ic">{ico(f[0])}</span><h3 data-k="feat{i}t">{k(f'feat{i}t', f[1])}</h3><p data-k="feat{i}d">{k(f'feat{i}d', f[2])}</p></div>''' for i, f in enumerate(s['feats']))
    tries = ''.join(f'''<li>{ico('check', 16, 3)}<span data-k="try{i}">{k(f'try{i}', t)}</span></li>''' for i, t in enumerate(s['tries']))
    faqs = ''.join(f'''<details><summary data-k="faq{i}q">{k(f'faq{i}q', q[0])}</summary><p data-k="faq{i}a">{k(f'faq{i}a', q[1])}</p></details>''' for i, q in enumerate(s['faq']))
    assure = ''.join(f'''<li>{ico('check', 18, 2.6)}<span data-k="as{i}">{k(f'as{i}', a)}</span></li>''' for i, a in enumerate(C['assure']))
    steps = ''.join(f'''<li><h3 data-k="st{i}t">{k(f'st{i}t', x[0])}</h3><p data-k="st{i}d">{k(f'st{i}d', x[1])}</p></li>''' for i, x in enumerate(C['steps']))
    p1 = ''.join(f'''<li>{ico('check', 16, 3)}<span data-k="p1l{i}">{k(f'p1l{i}', x)}</span></li>''' for i, x in enumerate(C['p1l']))
    p2 = ''.join(f'''<li>{ico('check', 16, 3)}<span data-k="p2l{i}">{k(f'p2l{i}', x)}</span></li>''' for i, x in enumerate(C['p2l']))
    live, pf = PRO.get(key, (False, []))
    prol = ''.join(f'''<li>{ico('check', 16, 3)}<span data-k="pro{i}">{k(f'pro{i}', x)}</span></li>''' for i, x in enumerate(pf))
    D['proT'] = ['نظام Pro لـ' + s['name'][0], 'Pro system for ' + s['name'][1].lower()]
    pro_html = (f'''<div class="probox rv"><div class="prohead"><span class="prok" data-k="proK">{html.escape(C['proK'][0])}</span><span class="prost" data-k="{'proLive' if live else 'proSoon'}">{html.escape(C['proLive' if live else 'proSoon'][0])}</span></div>'''
      f'''<h3 data-k="proT">{html.escape(D['proT'][0])}</h3><p class="proprice" data-k="proPrice">{html.escape(C['proPrice'][0])}</p><p class="prolead" data-k="proLead">{html.escape(C['proLead'][0])}</p><ul>{prol}</ul>'''
      + (f'''<a class="btn btn-ghost" style="margin-inline-end:8px;color:#fff;border-color:rgba(255,255,255,.55)" href="{live}" target="_blank" rel="noopener" data-k="proTry">{html.escape(C['proTry'][0])} ↗</a>''' if isinstance(live, str) else '') +
      f'''<a class="btn btn-gold wa" href="https://wa.me/96171163991?text={__import__('urllib.parse').parse.quote('مرحبًا نافذة، أنا مهتم بباقة Pro لـ' + s['name'][0])}" target="_blank" rel="noopener" data-k="proBtn">{html.escape(C['proBtn'][0])}</a></div>''') if pf else ''
    others = ''.join(f'''<a href="../{o['slug']}/" data-k="o_{o['slug']}">{k('o_' + o['slug'], o['name'])}</a>''' for o in SECTORS if o['slug'] != slug)
    preview = f'../../preview/?s={key}'
    out = TEMPLATE
    rep = {
      '{{SLUG}}': slug, '{{TITLE}}': html.escape(D['title'][0]), '{{DESC}}': html.escape(s['lead'][0]), '{{EYEBROW}}': html.escape(D['eyebrowFull'][0]),
      '{{H1}}': s['h1'][0], '{{LEAD}}': html.escape(s['lead'][0]), '{{IMG}}': s['img'], '{{DEMO}}': s['demo'], '{{PREVIEW}}': preview,
      '{{PAINS}}': pains, '{{FEATS}}': feats, '{{TRIES}}': tries, '{{FAQS}}': faqs, '{{ASSURE}}': assure, '{{STEPS}}': steps, '{{P1}}': p1, '{{P2}}': p2,
      '{{OTHERS}}': others, '{{PRO}}': pro_html, '{{DEMONAME}}': html.escape(s['demoName'][0]), '{{WAICON}}': WA_SVG, '{{LOGO}}': LOGO,
      '{{WAHREF}}': 'https://wa.me/96171163991?text=' + __import__('urllib.parse').parse.quote(wa_ar),
      '{{DATA}}': json.dumps(D, ensure_ascii=False),
    }
    for a, b in rep.items(): out = out.replace(a, b)
    # remaining {{key}} → Arabic shared copy
    for kk, v in C.items():
        if isinstance(v, tuple): out = out.replace('{{' + kk + '}}', html.escape(v[0]))
    assert '{{' not in out, out[out.index('{{'):out.index('{{') + 40]
    os.makedirs(f'for/{slug}', exist_ok=True)
    open(f'for/{slug}/index.html', 'w').write(out)

TEMPLATE = open(os.path.join(os.path.dirname(__file__), 'sector_template.html')).read()
for s in SECTORS: build(s)
print('built', len(SECTORS), 'pages')
