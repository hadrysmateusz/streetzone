import React from "react"
import { connectStateResults } from "react-instantsearch-dom"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"

import { SmallItemCard, BigItemCard } from "../../components/Cards"
import { ItemsContainer, ItemsList } from "../../components/ItemsView"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"

const EmptyStateContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--gray25);
`

const EmptyState = connectStateResults(({ searchResults, searching }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0
	const isEmpty = !hasResults && !searching

	return isEmpty ? (
		<EmptyStateContainer>
			<div>Brak wyników</div>
			{/* TODO: provide user with some action */}
		</EmptyStateContainer>
	) : null
})

const Results = withBreakpoints(({ currentBreakpoint }) => {
	// only allow the grid view on smaller viewports
	const isMobile = currentBreakpoint < 1

	return (
		<InfiniteScrollingResults>
			{({ results, hasMore, loadMore }) =>
				isMobile ? (
					<ItemsContainer>
						{results.map((item) => (
							<SmallItemCard key={item.objectID} {...item} />
						))}
					</ItemsContainer>
				) : (
					<ItemsList>
						{results.map((item) => (
							<BigItemCard key={item.objectID} {...item} />
						))}
					</ItemsList>
				)
			}
		</InfiniteScrollingResults>
	)
})

const MarketplaceResults = () => {
	return (
		<>
			<EmptyState />
			<Results />
		</>
	)
}

export default MarketplaceResults
