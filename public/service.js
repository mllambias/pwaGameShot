'use strict';

// Actualiza los nombres de cache cada vez que alguno de los ficheros cacheados cambia.
const CACHE_NAME = 'static-cache-v9';	// nombre a la cache

// Crea una lista de ficheros a guardar en esta cache
const FILES_TO_CACHE = [
  '/index.html',
  'install.js'
];

self.addEventListener('install', (evt) => {
  console.log('{ServiceWorker} Install');
    // Guargamos los recursos estáticos
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('{ServiceWorker} Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('{ServiceWorker} Activate');
    // Elimina los elementos guardados anteriormente del disco
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('{ServiceWorker} Borrando cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
// Añade la gestion del evento ir a buscar
   if (evt.request.mode !== 'navigate') {
	// No es una navegación de página
     console.log("${ServiceWorker} no navega");
     return;
    }
  console.log('${ServiceWorker} ir a buscar, evt.request.url');
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});
