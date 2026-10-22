/* Hasib owner panel service worker: makes the panel installable, network first */
const V = 'hs-admin-v1';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(['./', './i18n.js', '../hasib/img/icon-192.png'])).then(() => self.skipWaiting())) });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('hs-admin') && k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url); if (r.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(r).then((res) => { if (res.ok) { const c = res.clone(); caches.open(V).then((ca) => ca.put(r.mode === 'navigate' ? './' : r, c)) } return res }).catch(() => caches.match(r.mode === 'navigate' ? './' : r)));
});
