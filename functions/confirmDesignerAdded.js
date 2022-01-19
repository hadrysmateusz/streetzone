const { db, messaging } = require("./firebaseConfig")

const confirmDesignerAdded = async (data, context) => {
	const userId = data.userId

	if (!userId) throw Error("No user to send notification to")

	console.log(data)
	console.log(context)
	console.log("userId: ", userId)

	// Get the list of device notification tokens.
	const tokensSnap = await db
		.doc(`users/${userId}`)
		.collection("notificationTokens")
		.get()

	// Check if there are any device tokens.
	if (tokensSnap.empty) {
		console.log("There are no notification tokens to send to.")
		return false
	}

	const tokens = tokensSnap.docs.map((doc) => doc.id)

	// Notification details
	const payload = {
		notification: {
			title: `Projektant o którego prosiłeś został dodany`,
			body: `Teraz możesz zaktualizować swoje ogłoszenie.`
		}
	}

	console.log(tokens)

	// Send notifications to all tokens.
	const response = await messaging.sendToDevice(tokens, payload)

	console.log(`Response:`, response)
}

module.exports = confirmDesignerAdded
