import React from "react"
import { connectStateResults } from "react-instantsearch-dom"
import styled from "styled-components/macro"

export const EmptyStateContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--gray25);
`

// REMEMBER: this is a common empty state for all components using InfiniteScrollingResults
const NoResults = connectStateResults(({ searchResults, searching }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0
	const isEmpty = !hasResults && !searching

	return isEmpty ? (
		<EmptyStateContainer>
			<div>Brak wyników</div>
			{/* TODO: provide user with some action */}
		</EmptyStateContainer>
	) : null
})

export default NoResults
