/* Khayrat Market service worker: fast loads + works on weak connections */
const V = 'kh-v1';
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
