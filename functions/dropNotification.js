const { DATE_FORMAT } = require("./const")
const moment = require("./momentConfig")
const { db, messaging } = require("./firebaseConfig")

const getDropsAt = (drop) => {
	const now = moment()
	const dropsAt = drop.dropsAtString
	const then = moment(dropsAt, DATE_FORMAT)

	const duration = moment.duration(then.diff(now))

	const totalHours = Math.floor(duration.asHours())
	const totalDays = Math.floor(duration.asDays())
	const isTimeKnown = dropsAt && dropsAt.length > 9
	const isToday = now.isSame(then, "day")

	// assume the function runs every at 9am every day

	// Today if time isn't known
	if (isToday && !isTimeKnown) {
		return `Dzisiaj`
	}

	// Today if time is known
	if (isToday && isTimeKnown) {
		return `Dzisiaj o ${then.format("HH:mm")}`
	}

	// Tomorrow
	if (totalHours <= 48) {
		return "Jutro"
	}

	// In a week (6 days because it counts whole days e.g. including 6d 23h 59m)
	if (totalDays === 6) {
		return `Za tydzień`
	}

	return null
}

const dropNotification = async (context) => {
	// this is to include drops without specified time
	const nowTimestamp = moment()
		.subtract(12, "hours")
		.valueOf()

	// get all future drops
	const dropsSnap = await db
		.collection("drops")
		.where("dropsAtApproxTimestamp", ">", nowTimestamp)
		.get()
	const drops = dropsSnap.docs.map((doc) => doc.data())
	const dropNames = drops.map((drop) => drop.name)

	console.log(`Upcoming drops (${drops.length}):`, dropNames)

	for (let drop of drops) {
		const dropsAt = getDropsAt(drop)

		// If dropsAt returns null it means a notification shouldn't be sent
		if (!dropsAt) {
			console.log(`Skipped drop (${drop.name})`)
			continue
		}

		// Notification details
		const payload = {
			notification: {
				title: `DROP: ${drop.name}`,
				body: dropsAt,
				icon: drop.imageUrls[drop.mainImageIndex]
			}
		}

		// get all drop subscribers
		const subscribersSnap = await db
			.collection("drops")
			.doc(drop.id)
			.collection("subscribers")
			.get()

		for (let subscriberSnap of subscribersSnap.docs) {
			const subscriberId = subscriberSnap.id

			// Get the list of device notification tokens.
			const tokensSnap = await db
				.doc(`users/${subscriberId}`)
				.collection("notificationTokens")
				.get()

			// Check if there are any device tokens.
			if (tokensSnap.empty) {
				return console.log("There are no notification tokens to send to.")
			}

			const tokens = tokensSnap.docs.map((doc) => doc.id)

			// Send notifications to all tokens.
			const response = await messaging.sendToDevice(tokens, payload)

			console.log(`Response (${subscriberId}):`, response)

			// TODO: add token removal

			// // For each message check if there was an error.
			// const tokensToRemove = []
			// response.results.forEach((result, index) => {
			// 	const error = result.error
			// 	if (error) {
			// 		console.error("Failure sending notification to", tokens[index], error)
			// 		// Cleanup the tokens who are not registered anymore.
			// 		if (
			// 			error.code === "messaging/invalid-registration-token" ||
			// 			error.code === "messaging/registration-token-not-registered"
			// 		) {
			// 			console.log("docs:", tokensSnapshot.docs)
			// 			console.log("index:", index)
			// 			console.log("token:", tokensSnapshot.docs[index])
			// 			console.log("tokenRef:", tokensSnapshot.docs[index].ref)
			// 			tokensToRemove.push(tokensSnapshot.docs[index].ref.delete())
			// 		}
			// 	}
			// })
			// return Promise.all(tokensToRemove)
		}
	}
}

module.exports = dropNotification
