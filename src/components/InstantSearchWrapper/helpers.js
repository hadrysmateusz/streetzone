// import cloneDeep from "clone-deep"

// const DEFAULT_SORTING = sortingOptions[0].value
// const DEFAULT_HITS_PER_PAGE = 12
// const DEFAULT_SEARCH_STATE = Object.freeze({
// 	hitsPerPage: DEFAULT_HITS_PER_PAGE,
// 	sortBy: DEFAULT_SORTING,
// 	refinementList: {},
// 	query: "",
// 	page: 1
// })

// class AlgoliaStateManager {
// 	constructor(initialState, allowedKeys) {
// 		this.initialState = Object.freeze(cloneDeep(initialState))
// 		this.allowedKeys = Object.freeze(allowedKeys)
// 	}

// 	urlToState(parsedSearch) {
// 		let state = cloneDeep(this.initialState)

// 		const makeSureIsObject = (key) => {
// 			if (!state[key]) {
// 				state[key] = {}
// 			}
// 		}

// 		try {
// 			for (const [key, val] of Object.entries(parsedSearch)) {
// 				// these three always have the same names
// 				if (key === "sortBy") {
// 					// TODO: only allow sorting by whitelisted keys
// 					state.sortBy = val
// 					continue
// 				}
// 				if (key === "query") {
// 					state.query = val
// 					continue
// 				}
// 				if (key === "page") {
// 					state.page = val
// 					continue
// 				}

// 				// apart from sortBy, query and page all keys must be whitelisted
// 				if (!this.allowedKeys.includes(key)) {
// 					console.log("key:", key)
// 					console.log("value:", val)
// 					throw new Error(`Tried to query a forbidden key, more info in the console`)
// 				}

// 				// all arrays correspond to a refinementList
// 				if (Array.isArray(val)) {
// 					makeSureIsObject("refinementList")
// 					state.refinementList[key] = val
// 					continue
// 				}

// 				// all objects correspond to range fields
// 				// has to be after array as arrays are also objects
// 				/* TODO: original implementation involved deleting state.range if no value was present
//         make sure this won't cause issues */
// 				if (typeof val === "object") {
// 					makeSureIsObject("range")
// 					state.range[key] = val
// 					continue
// 				}

// 				// getting here means an unhandled key - throw an error
// 				throw new Error(`Unhandled key ${key}`)
// 			}

// 			// if all values are handled correctly return state object
// 			return state
// 		} catch (error) {
// 			// TODO: report to sentry
// 			console.error(error)

// 			// in case of error return default state
// 			return cloneDeep(this.initialState)
// 		}
// 	}

// 	onSearchStateChange(state) {
// 		let formattedState = {}

// 		const flatten = (outerKey) => {
// 			for (const [key, val] of Object.entries(state[outerKey])) {
// 				formattedState[key] = val
// 			}
// 		}

// 		for (const [key, val] of Object.entries(state)) {
// 			if (["sortBy", "page", "query"].includes(key)) {
// 				// if new value is equal to default one, don't clutter the url with it
// 				if (val === this.initialState[key]) continue
// 				formattedState[key] = val
// 				continue
// 			}

// 			if (["refinementList", "range"].includes(key)) {
// 				flatten(key)
// 			}
// 		}

// 		return formattedState
// 	}
// }

// export default AlgoliaStateManager

// // onSearchStateChange = async (newSearchState) => {
// // 	// format the state to keep the url relatively short
// // 	const { refinementList, query, range, sortBy, page } = newSearchState
// // 	let formattedState = {}

// // 	if (refinementList !== undefined) {
// // 		if (refinementList.category !== undefined)
// // 			formattedState.category = refinementList.category
// // 		if (refinementList.designers !== undefined)
// // 			formattedState.designers = refinementList.designers
// // 		if (refinementList.size !== undefined) formattedState.size = refinementList.size
// // 	}

// // 	if (page !== undefined) formattedState.page = page
// // 	if (query !== undefined) formattedState.query = query
// // 	if (sortBy !== undefined) formattedState.sortBy = sortBy

// // 	if (range && range.price !== undefined) formattedState.price = range.price

// // 	return formattedState
// // }

// // onSearchStateChange = async (newSearchState) => {
// // 	// format the state to keep the url relatively short
// // 	const { refinementList, query, page } = newSearchState
// // 	let formattedState = {}
// // 	if (refinementList !== undefined) {
// // 		if (refinementList.tags !== undefined) formattedState.tags = refinementList.tags
// // 		if (refinementList.section !== undefined)
// // 			formattedState.section = refinementList.section
// // 	}
// // 	if (page !== undefined) formattedState.page = page
// // 	if (query !== undefined) formattedState.query = query

// // 	return formattedState
// // }

// // urlToState = (parsedSearch) => {
// // 	let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
// // 	// format the searchState according to Algolia's spec
// // 	const { category, designers, size, price, sortBy, query, page } = parsedSearch

// // 	searchState.refinementList.category = category || []
// // 	searchState.refinementList.designers = designers || []
// // 	searchState.refinementList.size = size || []

// // 	if (price) {
// // 		searchState.range = {}
// // 		searchState.range.price = price
// // 	} else {
// // 		delete searchState.range
// // 	}

// // 	searchState.sortBy = sortBy || DEFAULT_SORTING
// // 	searchState.query = query || ""
// // 	searchState.page = page || 1

// // 	return searchState
// // }

// // urlToState = (parsedSearch) => {
// // 	let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
// // 	// format the searchState according to Algolia's spec
// // 	const { tags, section, query, page } = parsedSearch

// // 	searchState.refinementList.section = section || []
// // 	searchState.refinementList.tags = tags || []
// // 	searchState.query = query || ""
// // 	searchState.page = page || 1

// // 	return searchState
// // }
