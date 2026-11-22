// Service worker mínimo: guarda la app y las fuentes para usarla sin conexión.
const CACHE = 'playgrass-v2';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html')))
  );
});

// Botones de la notificación "Se acabó el tiempo": avisan a la app abierta.
self.addEventListener('notificationclick', e => {
  const action = e.action;
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    if (list.length) {
      list.forEach(c => c.postMessage({ type: 'notif-action', action }));
      return list[0].focus();
    }
    return self.clients.openWindow('./');
  }));
});
