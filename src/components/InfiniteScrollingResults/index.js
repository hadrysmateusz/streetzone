import React from "react"
import InfiniteScroll from "react-infinite-scroller"

import { InfiniteResults } from "../Algolia/Helpers"
import { InfiniteLoadingSpinner } from "../LoadingSpinner"
import NoResults from "../Algolia/NoResults"

const InfiniteScrollingResults = ({ children, threshold = 450, emptyState }) => {
	const isChildrenFunction = typeof children === "function"

	return (
		<InfiniteResults>
			{({ results, hasMore, loadMore }) => (
				<>
					{<NoResults render={emptyState} />}
					{/* Render empty state if there are no results */}
					<InfiniteScroll
						hasMore={hasMore}
						loader={<InfiniteLoadingSpinner />}
						initialLoad={false}
						loadMore={loadMore}
						threshold={threshold}
					>
						{isChildrenFunction ? children({ results, hasMore, loadMore }) : children}
					</InfiniteScroll>
				</>
			)}
		</InfiniteResults>
	)
}

export default InfiniteScrollingResults
