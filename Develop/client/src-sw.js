const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
({ request }) => ['style', 'script', 'worker'].includes(request.destination), // requests targeting styles, scripts, and workers, use a strategy that first tries to fetch the most up-to-date version and falls back to the cached version if the network is not available
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // responses with these headers 
      new CacheableResponsePlugin({ //This is creating a new instance
        statuses: [0, 200], //property passed to the plugin's configuration object, allow responses with these status codes to be cached.
      }), //Only save (cache) the responses if they say everything is OK (status 200)
    ],
  })
  );
