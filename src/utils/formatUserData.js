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
		phone: null,
		info: null,
		preferences: {},
		savedItems: [],
		followedUsers: [],
		importedFrom: input.importedFrom || null
	}
}
