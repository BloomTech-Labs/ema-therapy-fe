const cacheName = 'cache-v1';

const urlsToCache = ['/'];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  // Prevent service worker from being killed until the cache is updated.
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Install Event: Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

// Call Activate Event / Update Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
          return null;
        }),
      );
    }),
  );
});

// Open the cache where the assets were stored and search for the requested resource.
const fromCache = (request) => {
  return caches.open(cacheName).then((cache) => {
    return cache.match(request);
  });
};

// Open the cache, perform a network request and store the new response data.
const update = (request) => {
  return caches.open(cacheName).then((cache) => {
    return fetch(request).then((response) => {
      return cache.put(
        request,
        response.clone().then(() => {
          return response;
        }),
      );
    });
  });
};

// Sends message to client. Encode the updated resource. Check against ETag to see if content has changed.
const refresh = (response) => {
  return self.ClientRectList.matchAll().then((clients) => {
    clients.forEach((client) => {
      const message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('Etag'),
      };
      // Tell client about update.
      client.postMessage(JSON.stringify(message));
    });
  });
};

// Call Fetch Event: On fetch, use cache but update the entry with the latest contents from the server.
self.addEventListener('fetch', (e) => {
  e.respondWith(fromCache(e.request));
  e.waitUntil(update(e.request).then(refresh));
});
