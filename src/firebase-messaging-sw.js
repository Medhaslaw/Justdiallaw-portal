importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAfXP2sFKvJIug1cCiFWBkUboUXQvoVTwE",
    authDomain: "my-just-law-9ac26.firebaseapp.com",
    projectId: "my-just-law-9ac26",
    storageBucket: "my-just-law-9ac26.appspot.com",
    messagingSenderId: "677233429450",
    appId: "1:677233429450:web:6429c15018da241ae35d33",
    measurementId: "G-PSK17ZHZWX"
});

const messaging = firebase.messaging();