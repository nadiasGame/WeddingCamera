self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('wedding').then((cache) => {
            return cache.addAll(['offline.html', '/css/styles.css']);
        })
    )

    self.skipWaiting();
    console.log('Installed service worker at ', new Date().toLocaleTimeString());
});

self.addEventListener('activate', (event) => {
    self.skipWaiting();
    console.log('Activated service worker at ', new Date().toLocaleTimeString());
});

self.addEventListener('fetch', async (event) => {
    console.log(event.request.url);
    if (!navigator.onLine) { 
        console.log('Offline');
        event.respondWith(
            caches.match(event.request).then((response) => {
                console.log('RESPONSE:', response);
                if (response) {
                    return response;
                } else {
                    return caches.match(new Request('offline.html', '/css/styles.css'));
                }
            })
        );
    } else {
        console.log('Online');
        const response = await updateCache(event.request);
        return response;
    }
});

async function updateCache(request) {
    const response = await fetch(request);
    const cache = await caches.open('wedding');

    cache.put(request, response.clone());

    return response;
}