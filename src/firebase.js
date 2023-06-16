// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

var firebaseConfig = {
    apiKey: "AIzaSyBZMZx8hMCNz0yzbXXaXSyXM_eeWL_efYo",
    authDomain: "salleh-2c0bb.firebaseapp.com",
    projectId: "salleh-2c0bb",
    storageBucket: "salleh-2c0bb.appspot.com",
    messagingSenderId: "351617630363",
    appId: "1:351617630363:web:b40531637dcb5c1eac463e",
    measurementId: "G-2X2RH10P6H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setFcmToken) => {
    return getToken(messaging, { vapidKey: 'BLVENml2yrGo-ym6lHR2x-H2rj4FlTC8Clu4T-y0ycADGuYBaSalaIUlhsxtOy7vp3vHPgJ43kTl46DRLdcITJY' })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken(currentToken);
                return currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setFcmToken('');
            }
        }).catch(err => {
            console.log('An error occurred while retrieving token. ', err);
        });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });
