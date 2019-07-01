export const encodeURL = (state, baseRoute = "") =>
	`${baseRoute}?s=${encodeURIComponent(JSON.stringify(state))}`

export const decodeURL = (searchString) => {
	// get the encoded search parameter from URL
	var searchParams = new URLSearchParams(searchString)
	const search = searchParams.get("s")

	// decode and parse the search paramter
	const convertedSearch = decodeURIComponent(search)
	const parsedSearch = JSON.parse(convertedSearch)

	return parsedSearch
}
