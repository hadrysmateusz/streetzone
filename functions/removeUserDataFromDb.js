const { db } = require("./firebaseConfig")

// TODO: check if this function should be kept or removed
const removeUserDataFromDb = (user) => {
	const userId = user.uid
	return db
		.collection("users")
		.doc(userId)
		.delete()
}

module.exports = removeUserDataFromDb
