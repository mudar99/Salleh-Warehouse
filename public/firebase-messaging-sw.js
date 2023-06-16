if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBZMZx8hMCNz0yzbXXaXSyXM_eeWL_efYo",
    authDomain: "salleh-2c0bb.firebaseapp.com",
    projectId: "salleh-2c0bb",
    storageBucket: "salleh-2c0bb.appspot.com",
    messagingSenderId: "351617630363",
    appId: "1:351617630363:web:b40531637dcb5c1eac463e",
    measurementId: "G-2X2RH10P6H"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
// messaging.onBackGroundMessage(function (payload) {
//     console.log('Recieved Background message: ', payload)
//     const notificaitonTitle = payload.notificaiton.title;
    // const notificaitonOptions = {
    //     body: payload.notificaiton.body
    // };

//     self.ServiceWorkerRegistration.showNotification(notificaitonTitle, notificaitonOptions);
// })