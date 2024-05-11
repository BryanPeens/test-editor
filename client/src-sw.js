const { precacheAndRoute } = require('workbox-precaching');
const { CacheFirst, NetworkFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { setConfig } = require('workbox-core');

// Enable logging in the service worker
setConfig({ debug: true });

// Precache and route all static assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define a cache for pages
const pageCache = new NetworkFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }),
  ],
});

// Register a route for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', async () => {
  try {
    const cachedResponse = await pageCache.handle({ request });
    if (cachedResponse) {
      return cachedResponse;
    }
    return await fetch(request);
  } catch (error) {
    return caches.match('/index.html');
  }
});

// Implement asset caching
registerRoute(
  // Define a route for assets
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  // Use the CacheFirst strategy for caching assets
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Maximum number of cached entries
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);
