export default (input) => {
	return {
		name: input.name,
		email: input.email,
		city: null,
		phone: null,
		info: null,
		userSince: Date.now(),
		profilePictureRef: null,
		profilePictureURLs: input.picture ? [input.picture] : null,
		items: [],
		permissions: [],
		roles: [],
		feedback: [],
		badges: [],
		preferences: {},
		savedItems: [],
		savedFilters: [],
		savedDrops: [],
		followedUsers: [],
		followedDrops: [],
		importedFrom: input.importedFrom || null
	}
}
