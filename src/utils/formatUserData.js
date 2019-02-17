export default (input) => {
	return {
		name: input.name,
		email: input.email,
		items: [],
		profilePictureRef: null,
		profilePictureURLs: input.picture ? [input.picture] : null,
		permissions: [],
		roles: [],
		feedback: [],
		badges: {},
		userSince: Date.now(),
		city: null,
		savedItems: [],
		followedUsers: [],
		importedFrom: input.importedFrom || null
	}
}
