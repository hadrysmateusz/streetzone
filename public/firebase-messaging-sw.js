importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js")

firebase.initializeApp({
	messagingSenderId: "1095236809107"
})

const messaging = firebase.messaging()
