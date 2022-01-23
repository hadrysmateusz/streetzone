import ItemsView from "../../components/ItemsView"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"

const MarketplaceResults = () => {
  return (
    <InfiniteScrollingResults>
      {({ results }) => <ItemsView items={results} />}
    </InfiniteScrollingResults>
  )
}

export default MarketplaceResults
