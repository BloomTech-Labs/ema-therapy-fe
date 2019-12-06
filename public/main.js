// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./mm-service-worker.js')
      .then((reg) => console.log('Service Worker: Registered (Pages)'))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
