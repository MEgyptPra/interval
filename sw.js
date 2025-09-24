const CACHE_NAME = 'interval-app-cache-v1';
// Daftar file yang perlu disimpan untuk mode offline
const urlsToCache = [
  '/',
  'interval-progressive-app.html',
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

// Event 'install': Dipanggil saat service worker pertama kali diinstal
self.addEventListener('install', event => {
  // Menunda event install sampai cache terisi
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Menambahkan semua URL dari daftar ke dalam cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': Dipanggil setiap kali ada permintaan jaringan (misal: memuat gambar, script)
self.addEventListener('fetch', event => {
  // Merespons dengan file dari cache jika ada, jika tidak, lakukan request ke jaringan
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ditemukan di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, lanjutkan dengan request ke jaringan
        return fetch(event.request);
      }
    )
  );
});

