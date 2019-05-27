import React from "react"
import { withBreakpoints } from "react-breakpoints"

import { SmallItemCard, BigItemCard } from "../../components/Cards"
import { ItemsContainer, ItemsList } from "../../components/ItemsView"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"

const MarketplaceResults = withBreakpoints(({ currentBreakpoint }) => {
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

export default MarketplaceResults
