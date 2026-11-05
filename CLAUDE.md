# نافذة / Nafetha: مرجع الشغل (اقرأه أول شي قبل ما تسأل Hadi)

Hadi يشتغل من تلفونه فقط، وبده ردود بالعربي اللبناني القصير. ما تطلب منه يشرح من الأول: دوّر هون، بالذاكرة، بالـartifacts، وبالمحادثات القديمة (conversation_search) أول.
ما تنشر ولا تصرف شي بدون موافقته (إلا إذا قال "كمّل/روح").

## وين كل شي
- الموقع الرئيسي: هالـrepo (nafetha-web/nafetha-web.github.io) على GitHub Pages، بيظهر على nafetha-web.com عبر Worker `nafetha-main`.
- مواقع الزبائن: subdomains على nafetha-web.com، كل واحد Worker proxy:
  - crazypasta.nafetha-web.com (Worker crazypasta-site، API crazypasta-api، DB crazypasta-db)
  - eastbridge.nafetha-web.com (Worker eastbridge-site، الكود بـ /eastbridge/، PWA، رسمي، مسجّل Basic استثناء)
  - hasib (سوبرماركت، /hasib و /hasib-admin، PWA)
- نموذج مطعم «حار ب حار» (عراقي، توصيل واتساب): /demo/7arb7ar/ (نوفمبر 2026، بانتظار صور أصلية + رقم تاني + لينك Google Maps).
- نماذج demo: /demo/* (rayhan, chalet, khayrat, dietitian, ...)، المطاعم Pro: rayhan + rayhan-kitchen/admin/points.
- API مشترك: Worker `nafetha-api` + D1 `nafetha-db` (جداول orders, calls, stores[rayhan,hasib,crazypasta], customers, lorders, ledger).
- صفحة التقرير: /report/ (رمز المتجر + كلمة السر → زوار وطلبات واتساب + رسالة شهرية للزبون). ?s=rayhan بيعبّي الرمز. نسخة artifact: "تقرير الطلبات".
- الاشتراكات: artifact "اشتراكات نافذة" (https://claude.ai/artifact/2xC3t11tVmsAEzj5QZQnD5)، ArtifactData collection `subs` (crazypasta, eastbridge). الباقات: monthly Basic $25، buy $249/$199 عرض، pmonthly Pro $45، pbuy $550 (+$90 سنوي).
- الريلز: /reels/ (ملفات منشورة لـMetricool)، حلقة ١ المنيو، حلقة ٢ الطلب من الطاولة، حلقة ٣ نقاط الولاء (ep3-points، مجدولة ٥/١١ الساعة ١٢). سكريبت الصوت بدون حركات (طلب Hadi لأنو ميمي طلعت سورية مع التشكيل). صوت Mimi (ElevenLabs)، تشكيل كامل لبناني.
- Metricool: blogId 7180766 (nafetha.web)، دايمًا Instagram + Facebook ريل، أقصى ٥ هاشتاغات مع #لبنان #lebanon، Hadi بيوافق قبل الجدولة.
- Cloudflare: zone nafetha-web.com، Workers عبر API/MCP.

## قواعد
- صور المواقع بالريلز = screenshots حقيقية من demos نافذة.
- ريلز: موسيقى خفيفة + SFX، نص مقروء، تشكيل كامل.
- التطبيقات = PWA (مش Play/App Store).
- Basic $25 / Pro $45: كل قطاع إله نموذج Basic وPro.
