import React from "react"

import AlgoliaSortBy from "../../../components/Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../../../components/Algolia/AlgoliaSearchBox"

import FiltersToggle from "./FiltersToggle"
import { Container } from "./StyledComponents"

const Topbar = ({ toggleFilters, sortingOptions }) => {
	return (
		<Container>
			<div className="search-container">
				<AlgoliaSearchBox
					placeholder="Szukaj"
					placeholderLong="Szukaj po nazwie, marce, itd."
				/>
			</div>

			<div className="filters-toggle-container">
				<FiltersToggle toggleFilters={toggleFilters} />
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
