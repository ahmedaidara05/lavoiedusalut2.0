self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
  '/lavoiedusalut1.5/',
  '/lavoiedusalut1.5/index.html',
  '/lavoiedusalut1.5/styles.css',
  '/lavoiedusalut1.5/script.js',
  '/lavoiedusalut1.5/logo.png'
])
.catch(err => {
                console.warn('Failed to cache some resources:', err);
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                console.warn('Network fetch failed for:', event.request.url);
                return new Response('Resource unavailable offline', { status: 503 });
            });
        })
    );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('✅ Service Worker enregistré', reg.scope))
    .catch(err => console.error('❌ Erreur SW:', err));
}
