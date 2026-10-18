/* Nafetha — visitor measurement (Meta Pixel).
   Stays completely off until PIXEL_ID is filled in. */
(function () {
  var PIXEL_ID = ''; // ← رقم الـ Pixel من Meta Events Manager

  var sent = {};
  window.nfTrack = function (ev, params, custom) {
    if (!window.fbq) return;
    window.fbq(custom ? 'trackCustom' : 'track', ev, params || {});
  };
  window.nfOnce = function (key, ev, params, custom) {
    if (sent[key]) return; sent[key] = 1; window.nfTrack(ev, params, custom);
  };
  if (!PIXEL_ID) return;

  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  var page = function () { return (document.body && document.body.getAttribute('data-page')) || location.pathname };
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null; if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me/96171163991') > -1) window.nfTrack('Lead', { content_name: page() });
    else if (/demo\/|rayhan\.html|dalieh\.html|prime-estate/.test(h)) window.nfTrack('ViewContent', { content_name: h });
    else if (/preview\//.test(h)) window.nfTrack('OpenPreview', { from: page() }, true);
  }, true);
})();
