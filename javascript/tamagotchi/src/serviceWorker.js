const staticFoxy = 'dev-foxy-v1'
const assets = ['/', '/index.html', '/main.css', '/js/app.js', '/fox/how/**', '/fox/sit1/**']

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticFoxy).then((cache) => {
      cache.addAll(assets)
    })
  )
})
