const staticAssets = [
	"./",
	"src/main,.js"
]


self.addEventListener("install", async event => {
	console.log("install")
	const cache = await caches.open("genie-game");
	cache.addAll(staticAssets)
})

self.addEventListener("fetch", event => {
	console.log("fetch")
	const req = event.request;
	event.respondWith(cacheFirst(req))
})

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}
