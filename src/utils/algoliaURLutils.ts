export const encodeURL = (state: any, baseRoute: string = "") =>
  `${baseRoute}?s=${encodeURIComponent(JSON.stringify(state))}`

export const decodeURL = (searchString: string) => {
  // get the encoded search parameter from URL
  const searchParams = new URLSearchParams(searchString)
  const search = searchParams.get("s")

  // decode and parse the search paramter
  if (search === null) {
    console.warn("search param was null")
    return null
  }
  const convertedSearch = decodeURIComponent(search)
  const parsedSearch = JSON.parse(convertedSearch)

  // TODO: test shape of parsedSearch and use an invariant

  return parsedSearch
}
