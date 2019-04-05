export const encodeURL = (state, baseRoute = "") =>
	`${baseRoute}?search=${encodeURIComponent(JSON.stringify(state))}`

export const decodeURL = (searchString) => {
	// get the encoded search parameter from URL
	var searchParams = new URLSearchParams(searchString)
	const search = searchParams.get("search")

	// decode and parse the search paramter
	const convertedSearch = decodeURIComponent(search)
	const parsedSearch = JSON.parse(convertedSearch)

	return parsedSearch
}
