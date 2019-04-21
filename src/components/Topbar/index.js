import React from "react"
import sortingOptions from "../../constants/sortingOptions"

import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"

import ViewSwitch from "./ViewSwitch"
import FiltersToggle from "./FiltersToggle"
import { Container } from "./StyledComponents"

const Topbar = ({ toggleFilters, clearFilters, setView }) => {
	return (
		<Container>
			<div className="filter-container">
				<FiltersToggle toggleFilters={toggleFilters} clearFilters={clearFilters} />
			</div>

			<div className="search-container">
				<AlgoliaSearchBox />
			</div>

			<div className="view-switch-container">
				<ViewSwitch setView={setView} />
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
