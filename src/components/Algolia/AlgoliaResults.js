import React from "react"
import { connectStateResults } from "react-instantsearch-dom"

import { AlgoliaInfiniteHits } from "../Algolia/AlgoliaHits"
import { ResultsContainer } from "./StyledComponents"
import EmptyState, { QueryNoResults } from "../EmptyState"

const AlgoliaResults = connectStateResults(({ searchResults, searching }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0

	return (
		<ResultsContainer>
			<div hidden={!hasResults}>
				<AlgoliaInfiniteHits />
			</div>
			<div hidden={hasResults || searching}>
				<EmptyState state={QueryNoResults} />
			</div>
		</ResultsContainer>
	)
})

export default AlgoliaResults
