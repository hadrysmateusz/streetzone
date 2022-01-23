import InfiniteScroll from "react-infinite-scroller"

import { InfiniteLoadingSpinner } from "../LoadingSpinner"
import { InfiniteResults } from "../Algolia/Helpers"
import NoResults from "../Algolia/NoResults"

export const InfiniteScrollingResults = ({ children, threshold = 1000, emptyState }) => {
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
