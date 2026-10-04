const CACHE_PREFIX = 'prompted-reading-cache-';
const CACHE_NAME = CACHE_PREFIX + 'v3';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            // cache: 'reload' bypasses GitHub Pages' 10-minute HTTP cache so a new worker never stores stale files
            .then(cache => cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' }))))
            .then(() => self.skipWaiting())
    );
});

// Network-first: deploys reach students once GitHub Pages' 10-minute HTTP cache expires; the cache is only an offline fallback.
self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
        return;
    }
    event.respondWith(
        fetch(request)
            .then(response => {
                if (response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache)));
                }
                return response;
            })
            .catch(() => caches.match(request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                // Other apps share the lgrabarek.github.io origin, so only delete this app's old caches
                cacheNames
                    .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            ))
            .then(() => self.clients.claim())
    );
});
