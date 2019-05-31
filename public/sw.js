var cacheName = 'cache-v2';
var urlstocache = ['/faculty/dashboard', '/student/dashboard'];

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(urlstocache,{redirect:'follow'});
        }).then(() => {
            return self.skipWaiting();
        })
    )

});
self.addEventListener('fetch', function (e) {
     e.respondWith(
        fetch(e.request).catch((err) => {
            console.log(err+'\n Serving from Cache');
            
            return caches.match(e.request);
        })
       /*  caches.match(e.request).then((response)=>{
            return response || fetch(e.request).catch((err) => {
                console.log(err+'\n Serving from Network');
                })
        }) */
    )


});