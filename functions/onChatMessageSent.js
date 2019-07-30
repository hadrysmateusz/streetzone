const { db, messaging } = require("./firebaseConfig")

const onChatMessageSent = async (snap, context) => {
	const roomId = context.params.roomId

	const messageData = snap.data()
	const senderId = messageData.author

	const roomSnap = await db.doc(`rooms/${roomId}`).get()
	const roomData = roomSnap.data()
	const userA = roomData.userA
	const userB = roomData.userB
	const recipientId = userA !== senderId ? userA : userB

	console.log("message data", messageData)
	console.log("room data", roomData)
	console.log("senderId", senderId)
	console.log("recipientId", recipientId)

	// Get the list of device notification tokens.
	const getDeviceTokensPromise = db
		.doc(`users/${recipientId}`)
		.collection("notificationTokens")
		.get()

	// Get the follower profile.
	const getSenderData = db.doc(`users/${senderId}`).get()

	const results = await Promise.all([getDeviceTokensPromise, getSenderData])
	const tokensSnapshot = results[0]
	const senderSnapshot = results[1]

	// Check if there are any device tokens.
	if (tokensSnapshot.empty) {
		return console.log("There are no notification tokens to send to.")
	} else {
		console.log("There are", tokensSnapshot.size, "tokens to send notifications to.")
	}

	const tokens = tokensSnapshot.docs.map((doc) => doc.id)
	const senderData = senderSnapshot.data()

	console.log("Fetched sender profile", senderData)

	// Notification details.
	const payload = {
		notification: {
			title: `Wiadomość od ${senderData.name}`,
			body: ("" + messageData.message).trim()
		}
	}

	const userIcon = senderData.profilePictureURLs ? senderData.profilePictureURLs[0] : null
	if (userIcon) {
		payload.notification.icon = userIcon
	}

	console.log("payload", payload)

	// Send notifications to all tokens.
	const response = await messaging.sendToDevice(tokens, payload)
	// For each message check if there was an error.
	const tokensToRemove = []
	response.results.forEach((result, index) => {
		const error = result.error
		if (error) {
			console.error("Failure sending notification to", tokens[index], error)
			// Cleanup the tokens who are not registered anymore.
			if (
				error.code === "messaging/invalid-registration-token" ||
				error.code === "messaging/registration-token-not-registered"
			) {
				console.log("docs:", tokensSnapshot.docs)
				console.log("index:", index)
				console.log("token:", tokensSnapshot.docs[index])
				console.log("tokenRef:", tokensSnapshot.docs[index].ref)
				tokensToRemove.push(tokensSnapshot.docs[index].ref.delete())
			}
		}
	})
	return Promise.all(tokensToRemove)
}

module.exports = onChatMessageSent
