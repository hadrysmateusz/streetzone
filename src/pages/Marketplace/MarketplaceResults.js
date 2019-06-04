import React from "react"

import ItemsView from "../../components/ItemsView"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"

const MarketplaceResults = ({ currentBreakpoint }) => {
	return (
		<InfiniteScrollingResults>
			{({ results, hasMore, loadMore }) => <ItemsView items={results} />}
		</InfiniteScrollingResults>
	)
}

export default MarketplaceResults
