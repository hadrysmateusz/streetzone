import { connectStateResults } from "react-instantsearch-dom"
import { EmptyStateContainer } from "./StyledComponents"

// REMEMBER: this is a common empty state for all components using InfiniteScrollingResults
const NoResults = connectStateResults(({ searchResults, searching, render }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  const isEmpty = !hasResults && !searching

  if (!isEmpty) {
    return null
  }

  const hasCustomRender = !!render

  return hasCustomRender ? (
    render
  ) : (
    <EmptyStateContainer>
      <div>Brak wyników</div>
      {/* TODO: provide user with some action */}
    </EmptyStateContainer>
  )
})

export default NoResults
