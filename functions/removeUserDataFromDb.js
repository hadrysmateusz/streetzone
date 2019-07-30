const { db } = require("./firebaseConfig")

const removeUserDataFromDb = (user) => {
	const userId = user.uid
	return db
		.collection("users")
		.doc(userId)
		.delete()
}

module.exports = removeUserDataFromDb
