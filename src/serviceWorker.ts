import { VITE_BASE_API_URL, VITE_WEB_PUSH_PUBLIC } from 'core/config';
import { urlB64ToUint8Array } from 'core/utils/helper';

/**
 * ref https://github.com/mdn/serviceworker-cookbook?tab=readme-ov-file
 * @returns setup service worker
 */
const setup = async () => {
  const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    // Our service worker won't work if BASE_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebook/create-react-app/issues/2374
    return;
  }
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .register(
        // in production environment the service-worker.js file is in the root directory
        // In the development environment, the sw file is located in the src . directory
        import.meta.env.MODE === 'production' ? '/service-worker.js' : '/src/service-worker.js',
      )
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            registration.unregister().then(() => {
              window.location.reload();
            });
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous service worker will still serve the older
                // content until all client tabs are closed.
                console.log(
                  `New content is available and will be used when all tabs 
                  for this page are closed. See https://bit.ly/CRA-PWA.`,
                );
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
      });

    const isAcceptedPermission = await Notification.requestPermission();
    if (isAcceptedPermission === 'denied') {
      console.error('The user explicitly denied the permission request.');
      return;
    }
    const registrations = await navigator.serviceWorker.getRegistrations();
    const registration = registrations[0];
    if (registration) {
      // Send push notifications
      // See https://web.dev/articles/sending-messages-with-web-push-libraries
      // https://www.npmjs.com/package/web-push
      const subscribed = await registration.pushManager.getSubscription();
      if (subscribed) {
        return;
      }
      if (VITE_WEB_PUSH_PUBLIC) {
        const _subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(VITE_WEB_PUSH_PUBLIC),
        });
        if (_subscription) {
          try {
            fetch(`${VITE_BASE_API_URL}/notifications/add-subscription`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(_subscription),
            }).then(() => {
              console.log(`Add subcription success...`);
            });
          } catch (error) {
            console.log(`Add subcription fail...`);
          }
        }
      }
    }
  }
};
export default setup;
