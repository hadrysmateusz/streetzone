importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js")

firebase.initializeApp({
	messagingSenderId: "350824478615"
})

const messaging = firebase.messaging()
