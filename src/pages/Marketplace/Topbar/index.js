import React from "react"
import styled from "styled-components/macro"

import AlgoliaSortBy from "../../../components/Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../../../components/Algolia/AlgoliaSearchBox"

import FiltersToggle from "./FiltersToggle"

const TopbarContainer = styled.div`
	display: grid;
	gap: var(--spacing1);
	grid-template-columns: 1fr 1fr;

	/* mobile-only */
	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		.search-container {
			grid-column: span 2;
		}
	}

	/* > mobile */
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		grid-template-columns: 1fr 180px;
		gap: var(--spacing2);
		.filters-toggle-container {
			display: none;
		}
	}
`

const Topbar = ({ toggleFilters, sortingOptions }) => {
	return (
		<TopbarContainer>
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
		</TopbarContainer>
	)
}

export default Topbar
