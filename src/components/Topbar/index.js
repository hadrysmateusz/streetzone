import React from "react"
import sortingOptions from "../../constants/sortingOptions"

import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"

import FiltersToggle from "./FiltersToggle"
import { Container } from "./StyledComponents"

const Topbar = ({ toggleFilters, clearFilters }) => {
	return (
		<Container>
			<div className="search-container">
				<AlgoliaSearchBox
					placeholder="Szukaj"
					placeholderLong="Szukaj po nazwie, marce, itd."
				/>
			</div>

			<div className="filters-toggle-container">
				<FiltersToggle toggleFilters={toggleFilters} clearFilters={clearFilters} />
			</div>

			<AlgoliaSortBy
				items={sortingOptions}
				defaultRefinement={sortingOptions[0]}
				placeholder="Sortuj"
			/>
		</Container>
	)
}

export default Topbar
