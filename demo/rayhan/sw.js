/* Rayhan service worker: fast loads + works on weak connections */
const V = 'rh-v1';
const API = 'https://nafetha-api.nafetha-web.workers.dev/rayhan';
const SHELL = ['./', './manifest.webmanifest', './img/icon-192.png', './img/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())) });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())) });
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(V).then((ca) => ca.put(req, c)) } return res };
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (r.mode === 'navigate') { e.respondWith(fetch(r).then((res) => put('./', res)).catch(() => caches.match('./'))); return }
  if (u.origin === location.origin && u.pathname.includes('/img/')) { e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => put(r, res)))); return }
  if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) { e.respondWith(caches.match(r).then((m) => { const f = fetch(r).then((res) => put(r, res)).catch(() => m); return m || f })); return }
  if (u.origin === location.origin) e.respondWith(fetch(r).then((res) => put(r, res)).catch(() => caches.match(r)));
});

/* offer notifications: the push carries no data, we fetch the latest notice */
self.addEventListener('push', (e) => {
  e.waitUntil(fetch(API + '/notice', { cache: 'no-store' }).then((r) => r.json()).catch(() => ({})).then((n) =>
    self.registration.showNotification(n.title || 'مطبخ الريحان', { body: n.body || 'لدينا عرض جديد، اطّلع عليه 🍽️', icon: 'img/icon-192.png', badge: 'img/icon-192.png', tag: 'rh-offer', renotify: true, lang: 'ar', dir: 'rtl', data: { url: n.url || './' } })));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const u = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => { for (const c of cs) if (c.url.startsWith(self.registration.scope)) { c.navigate(u); return c.focus() } return self.clients.openWindow(u) }));
});
