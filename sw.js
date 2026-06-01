// echo: kill-switch service worker.
// This file exists only to neutralize any old SW a browser may have registered
// at this URL during an earlier version of the site. echo no longer uses a
// service worker. When a browser checks for SW updates and fetches this file,
// it'll install this version, which immediately unregisters itself and clears
// any caches the old SW left behind.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});
