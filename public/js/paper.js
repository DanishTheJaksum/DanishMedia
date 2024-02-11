if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("../service-worker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll([
        "./",
        "./index.ejs",
        "./styles/main.css",
        "./src/apple.jpg",
        "./src/apple192.jpg",
        "./src/apple512.jpg",
        "./src/dan.jpg",
      ]);
    })
  );
});