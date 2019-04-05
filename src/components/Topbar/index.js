import React from "react"
import sortingOptions from "../../constants/sortingOptions"

import FiltersToggle from "./FiltersToggle"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"
import { Container } from "./StyledComponents"

const Topbar = ({ toggleFilters, clearFilters }) => {
	return (
		<Container>
			<div className="filter-container">
				<FiltersToggle toggleFilters={toggleFilters} clearFilters={clearFilters} />
			</div>

			<div className="search-container">
				<AlgoliaSearchBox />
			</div>

			<div className="sort-container">
				<AlgoliaSortBy
					items={sortingOptions}
					defaultRefinement={sortingOptions[0]}
					placeholder="Sortuj"
				/>
			</div>
		</Container>
	)
}

export default Topbar
