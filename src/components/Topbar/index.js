import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import sortingOptions from "../../constants/sortingOptions"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"
import {
	OuterContainer,
	InnerContainer,
	FiltersToggle,
	RefreshButton
} from "./StyledComponents"

export default ({ currentBreakpoint, areFiltersOpen, toggleFilters, refresh }) => {
	const filterText =
		currentBreakpoint < 1 ? "Filtry" : areFiltersOpen ? "Ukryj filtry" : "Pokaż filtry"
	return (
		<OuterContainer>
			<InnerContainer>
				<FiltersToggle onClick={toggleFilters}>
					<FontAwesomeIcon icon="filter" />
					<span>{filterText}</span>
				</FiltersToggle>
				<RefreshButton title="Odśwież" onClick={refresh}>
					<FontAwesomeIcon icon="sync-alt" />
				</RefreshButton>
				<AlgoliaSearchBox />
				<AlgoliaSortBy
					options={sortingOptions}
					defaultOption="dev_items_createdAt_desc"
				/>
			</InnerContainer>
		</OuterContainer>
	)
}
