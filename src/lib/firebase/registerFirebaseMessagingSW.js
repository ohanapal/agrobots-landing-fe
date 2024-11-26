export const registerFirebaseMessagingSW = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(registration => {
        console.info('Service Worker registered: ', registration)
      })
      .catch(err => {
        console.error('Service Worker registration failed: ', err)
      })
  }
}
