import AlgoliaSortBy from "../../../components/Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../../../components/Algolia/AlgoliaSearchBox"

import FiltersToggle from "./FiltersToggle"
import { TopbarContainer } from "./Topbar.styles"

export const Topbar = ({ toggleFilters, sortingOptions }) => {
  return (
    <TopbarContainer>
      <div className="search-container">
        <AlgoliaSearchBox placeholder="Szukaj" placeholderLong="Szukaj po nazwie, marce, itd." />
      </div>

      <div className="filters-toggle-container">
        <FiltersToggle toggleFilters={toggleFilters} />
      </div>

      <AlgoliaSortBy
        items={sortingOptions}
        defaultRefinement={sortingOptions[0]}
        placeholder="Sortuj"
      />
    </TopbarContainer>
  )
}

export default Topbar
