import { connectHits } from "react-instantsearch-dom"

export const Results = connectHits(({ hits, children }) => {
	return children(hits)
})
