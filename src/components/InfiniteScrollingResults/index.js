import React from "react"
import InfiniteScroll from "react-infinite-scroller"

import { InfiniteResults } from "../Algolia/Helpers"
import LoadingSpinner from "../LoadingSpinner"
import NoResults from "../Algolia/NoResults"

const InfiniteScrollingResults = ({ children }) => {
	const isChildrenFunction = typeof children === "function"

	return (
		<InfiniteResults>
			{({ results, hasMore, loadMore }) => (
				<>
					<NoResults /> {/* Render empty state if there are no results */}
					<InfiniteScroll
						hasMore={hasMore}
						loader={<LoadingSpinner />}
						initialLoad={false}
						loadMore={loadMore}
						threshold={400}
					>
						{isChildrenFunction ? children({ results, hasMore, loadMore }) : children}
					</InfiniteScroll>
				</>
			)}
		</InfiniteResults>
	)
}

export default InfiniteScrollingResults
