// Offline support: keeps the whole booth on the device so it runs without Wi-Fi.
const CACHE = 'photobooth-b213ba69f4';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'fonts/bagelfatone-400-latin-ext.woff2', 'fonts/bagelfatone-400-latin.woff2', 'fonts/baloo2-500-latin-ext.woff2', 'fonts/baloo2-500-latin.woff2'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() =>
    e.request.mode === 'navigate' ? caches.match('index.html') : Response.error())));
});
