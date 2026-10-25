/* Matbakh El Rayhan menu: shared by the site and the owner's panel */
// o: sizes and extras. one: 1 = pick exactly one (first is the default); ch = [ar, en, added price]
// Photos: Unsplash (free under the Unsplash License), loaded at small sizes.
const img = (id, w, h) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&h=' + (h || w) + '&q=70';
const MENU = [
  { id: 'mezze', ar: 'مازة', en: 'Mezze', items: [
    { id: 'm1', ar: 'حمّص', en: 'Hummus', dar: 'بالطحينة وزيت الزيتون، مع خبز ساخن', den: 'With tahini and olive oil, served with warm bread', p: 5, ph: 'photo-1637949385162-e416fb15b2ce', pop: 1, o: [{ ar: 'إضافات', en: 'Extras', ch: [['لحمة مفرومة', 'Minced meat', 3], ['صنوبر', 'Pine nuts', 1.5]] }] },
    { id: 'm2', ar: 'صحن مازة مشكّلة', en: 'Mixed mezze platter', dar: 'تشكيلة من المقبلات الباردة مع الخبز', den: 'A selection of cold starters with bread', p: 12, ph: 'photo-1767114915974-3481fa23cbb0' },
    { id: 'm3', ar: 'تبولة', en: 'Tabbouleh', dar: 'بقدونس وبرغل وطماطم وليمون', den: 'Parsley, bulgur, tomato and lemon', p: 6, ph: 'photo-1786174044919-c2119725afa1', pop: 1 },
    { id: 'm4', ar: 'كبّة مقلية', en: 'Fried kibbeh', dar: 'ست قطع مع اللبن', den: '6 pieces with yogurt', p: 7, ph: 'photo-1786174044931-d395bf77e58e' },
    { id: 'm5', ar: 'ورق عنب', en: 'Stuffed vine leaves', dar: 'محشو بالأرز، بزيت الزيتون والليمون', den: 'In olive oil and lemon', p: 6, ph: 'photo-1786174045070-be6a0da3a39d' },
    { id: 'm6', ar: 'فلافل', en: 'Falafel', dar: 'ست حبّات مع صلصة الطحينة', den: '6 pieces with tahini sauce', p: 5, ph: 'photo-1593001872095-7d5b3868fb1d' }
  ]},
  { id: 'grill', ar: 'مشاوي على الفحم', en: 'Charcoal grills', items: [
    { id: 'g1', ar: 'مشاوي مشكّلة', en: 'Mixed grill', dar: 'لحم وطاووق وكفتة مع خضار مشوية', den: 'Beef, taouk and kafta with grilled vegetables', p: 19, ph: 'photo-1771285119408-04cca3b35036', pop: 1, o: [{ ar: 'الحجم', en: 'Size', one: 1, ch: [['لشخص', 'For one', 0], ['لشخصين', 'For two', 15]] }] },
    { id: 'g2', ar: 'شيش طاووق', en: 'Shish taouk', dar: 'دجاج متبّل مع صلصة الثوم وبطاطا مقلية', den: 'Marinated chicken with garlic sauce and fries', p: 12, ph: 'photo-1705359573325-f2006d5e459f', pop: 1, o: [{ ar: 'الحجم', en: 'Size', one: 1, ch: [['عادي', 'Regular', 0], ['كبير', 'Large', 4]] }, { ar: 'إضافات', en: 'Extras', ch: [['ثوم زيادة', 'Extra garlic', 0.5], ['بطاطا زيادة', 'Extra fries', 2]] }] },
    { id: 'g3', ar: 'كفتة مشوية', en: 'Grilled kafta', dar: 'سيخان مع بطاطا وبصل وطماطم', den: 'Two skewers with fries, onion and tomato', p: 11, ph: 'photo-1603360946369-dc9bb6258143' },
    { id: 'g4', ar: 'لحم مشوي', en: 'Grilled beef', dar: 'قطع لحم طرية مع خضار', den: 'Tender beef cubes with vegetables', p: 16, ph: 'photo-1555939594-58d7cb561ad1' }
  ]},
  { id: 'mains', ar: 'أطباق رئيسية', en: 'Mains', items: [
    { id: 'r1', ar: 'صحن شاورما لحم', en: 'Beef shawarma plate', dar: 'مع الطحينة والمخللات والبطاطا', den: 'With tahini, pickles and fries', p: 12, ph: 'photo-1529006557810-274b9b2fc783' },
    { id: 'r2', ar: 'سمك مشوي', en: 'Grilled fish', dar: 'سمك اليوم مع الليمون والصلصة', den: 'Catch of the day with lemon and sauce', p: 18, ph: 'photo-1665401015549-712c0dc5ef85' },
    { id: 'r3', ar: 'ساندويش شاورما', en: 'Shawarma sandwich', dar: 'بخبز رقيق مع الثوم والمخللات', den: 'In thin bread with garlic and pickles', p: 5, ph: 'photo-1699728088614-7d1d4277414b', o: [{ ar: 'الحجم', en: 'Size', one: 1, ch: [['عادي', 'Regular', 0], ['دبل', 'Double', 2.5]] }, { ar: 'إضافات', en: 'Extras', ch: [['جبنة', 'Cheese', 1], ['بطاطا داخل الساندويش', 'Fries inside', 0.5], ['حرّ', 'Spicy', 0]] }] }
  ]},
  { id: 'sweet', ar: 'حلويات', en: 'Desserts', items: [
    { id: 's1', ar: 'بقلاوة بالفستق', en: 'Pistachio baklava', dar: 'أربع قطع', den: '4 pieces', p: 6, ph: 'photo-1761828122856-8703baac8e86' },
    { id: 's2', ar: 'حلويات عربية مشكّلة', en: 'Arabic sweets selection', dar: 'تشكيلة بالفستق والقطر', den: 'Pistachio pastries with syrup', p: 5, ph: 'photo-1778447812923-88a9e3e6b567' }
  ]},
  { id: 'drinks', ar: 'مشروبات', en: 'Drinks', items: [
    { id: 'd1', ar: 'ليموناضة بالنعناع', en: 'Mint lemonade', dar: 'ليمون طازج ونعناع', den: 'Fresh lemon and mint', p: 4, ph: 'photo-1555949366-819808d99159', o: [{ ar: 'الحجم', en: 'Size', one: 1, ch: [['وسط', 'Medium', 0], ['كبير', 'Large', 1.5]] }] },
    { id: 'd2', ar: 'قهوة', en: 'Coffee', dar: 'قهوة عربية أو تركية', den: 'Arabic or Turkish', p: 2, ph: 'photo-1695593217066-1e663f8524db' },
    { id: 'd3', ar: 'شاي', en: 'Tea', dar: 'في إبريق، مع النعناع', den: 'Served in a pot, with mint', p: 3, ph: 'photo-1564624171349-46ed471bf4e3' }
  ]}
];
/* flat list for the owner's panel */
const CATS = MENU.map((c) => ({ k: c.id, ar: c.ar, en: c.en }));
const P = MENU.flatMap((c) => c.items.map((i) => ({ id: i.id, c: c.id, ar: i.ar, en: i.en, p: i.p, old: 0, img: img(i.ph, 160, 160), kg: false, uar: i.dar, kw: i.en })));
