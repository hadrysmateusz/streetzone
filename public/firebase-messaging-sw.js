importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js")

// This uses the production senderId
firebase.initializeApp({
	messagingSenderId: "318333549624"
})

const messaging = firebase.messaging()
