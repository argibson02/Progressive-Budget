const FILES_TO_CACHE = [
  '/',
  '/assets/style.css',
  '/index.html',
  '/assets/db.js',
  '/assets/index.js',
  '/dist/manifest.json',
  '/dist/index-bundle.js',
  '/dist/db-bundle.js',
  '/dist/icon_72x72.png',
  '/dist/icon_96x96.png',
  '/dist/icon_128x128.png',
  '/dist/icon_144x144.png',
  '/dist/icon_152x152.png',
  '/dist/icon_192x192.png',
  '/dist/icon_384x384.png',
  '/dist/icon_512x512.png'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// 1. install
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {//"static-cache-v2"
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);//static content
    })
  );
  //forces the waiting service worker to become the active service worker - reloads the service worker
  self.skipWaiting();
});

//2. Clean Up / activate - Clear the CACHE of all items not matching in CACHE_NAME (old CACHE)
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch / Set new Cache Key - //"data-cache-v1"
self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then(caches => {
      return caches.match(evt.request).then(function (response) {
        return response || fetch(evt.request);
      })
    })
  );
});

