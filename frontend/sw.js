const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to pre-cache here:
// 밑의 경로에 있는 필수 리소스 파일은 사전 캐싱할 것이다
// => why? 오프라인에서 사용 할 수 있도록 하기 위해서
const PRECACHE_ASSETS = [
    '/assets/',
    '/src/'
]

// Listener for the install event - pre-caches our assets list on service worker install.
// 이벤트 걸었음. '설치'하는 이벤트가 일어나면 캐시를 열고 리소스 파일 캐시하도록
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});
// 설치가 되면 바로 '활성화' 이벤트가 발생
// 활성화가 되면 우리 이벤트워커가 앱의 실행 제어권을 가지도록 하는 것
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// 서비스워커가 필수 리소스를 캐싱하면 다시 회수하도록 '패치'이벤트 발생시켜야함
// 서비스워커가 자산 요청을 
self.addEventListener('fetch', event => {
  event.respondWith(async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});

