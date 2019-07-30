const { db } = require("./firebaseConfig")

const removeItemFromUserList = async (snapshot, context) => {
	const data = snapshot.data()
	const userId = data.userId
	const itemId = context.params.id

	// get owner's data
	const userSnap = await db
		.collection("users")
		.doc(userId)
		.get()

	// return if user was deleted
	if (!userSnap.exists) return false

	const userData = userSnap.data()

	console.log("userSnap", userSnap)
	console.log("userData", userData)

	// filter out the removed item
	const newItems = userData.items.filter((item) => item.id !== itemId)

	// update the db with the new items list
	return db
		.collection("users")
		.doc(userId)
		.update({ items: newItems })
}

module.exports = removeItemFromUserList
