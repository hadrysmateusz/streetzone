const { db } = require("./firebaseConfig")

const removeItemsOfUser = (userSnapshot) => {
	const userData = userSnapshot.data()

	// TODO: items is currently not used on user objects
	const promises = userData.items.map((item) =>
		db
			.collection("items")
			.doc(item)
			.delete()
	)

	return Promise.all(promises)
}

module.exports = removeItemsOfUser
