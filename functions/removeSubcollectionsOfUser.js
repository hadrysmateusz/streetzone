const removeSubcollectionsOfUser = async (userSnapshot) => {
	// get promises of user's subcollections
	const roomsPromise = userSnapshot.ref.collection("rooms").get()
	const notificationTokensPromise = userSnapshot.ref
		.collection("notificationTokens")
		.get()

	// resolve promises
	const subcollections = await Promise.all([roomsPromise, notificationTokensPromise])

	// iterate over all docs in all subcollections and delete them
	return subcollections.map((snap) => {
		return Promise.all(
			snap.docs.map((doc) => {
				return doc.ref.delete()
			})
		)
	})
}

module.exports = removeSubcollectionsOfUser
