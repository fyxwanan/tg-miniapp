self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/images/192.png',
          '/images/512.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  