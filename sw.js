/**
 * GymOS Progressive Web App (PWA) Service Worker
 * Offline Caching, Asset Optimization & Push Notifications
 */

const CACHE_NAME = 'gymos-pwa-v1.2';

const STATIC_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/supabase-client.js',
  './manifest.json'
];

// --- 1. INSTALL EVENT (Cache Static Assets) ---
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[GymOS ServiceWorker] Pre-caching static luxury assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// --- 2. ACTIVATE EVENT (Clean Old Caches) ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[GymOS ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// --- 3. FETCH EVENT (Network First with Offline Cache Fallback) ---
self.addEventListener('fetch', event => {
  // Skip non-GET requests or external analytics
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Cache valid response copy
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to offline cache
        console.log('[GymOS ServiceWorker] Offline fallback for:', event.request.url);
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// --- 4. PUSH NOTIFICATION EVENT ---
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'GymOS Alert', body: 'Nueva actualización de tu entrenamiento.' };
  
  const options = {
    body: data.body,
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" fill="%230F2C59" rx="100"/%3E%3Cpath fill="%23FFFFFF" d="M160 160h192v48H160zm0 96h192v48H160zm0 96h120v48H160z"/%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" fill="%230F2C59" rx="100"/%3E%3C/svg%3E',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
