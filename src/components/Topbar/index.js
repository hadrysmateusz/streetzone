import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectCurrentRefinements } from "react-instantsearch-core"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import sortingOptions from "../../constants/sortingOptions"
import AlgoliaSortBy from "../Algolia/AlgoliaSortBy"
import AlgoliaSearchBox from "../Algolia/AlgoliaSearchBox"
import {
	OuterContainer,
	InnerContainer,
	FiltersToggle,
	RefreshButton,
	ClearFiltersSubButton,
	FiltersToggleContainer
} from "./StyledComponents"
import { ROUTES } from "../../constants"

const Topbar = compose(
	withRouter,
	connectCurrentRefinements
)(
	({
		currentBreakpoint,
		areFiltersOpen,
		toggleFilters,
		refresh,
		items: currentRefinements,
		clearFilters,
		history
	}) => {
		const filterText =
			currentBreakpoint < 1 ? "Filtry" : areFiltersOpen ? "Ukryj filtry" : "Pokaż filtry"
		return (
			<OuterContainer>
				<InnerContainer>
					<FiltersToggleContainer>
						<FiltersToggle onClick={toggleFilters}>
							<FontAwesomeIcon icon="filter" />
							<span>{filterText}</span>
						</FiltersToggle>
						{currentRefinements && currentRefinements.length > 0 && (
							<ClearFiltersSubButton
								onClick={() => {
									history.push(ROUTES.HOME)
									clearFilters.update(true)
								}}
								title="Wyczyść filtry"
							>
								<FontAwesomeIcon icon="times" />
							</ClearFiltersSubButton>
						)}
					</FiltersToggleContainer>
					<RefreshButton title="Odśwież" onClick={refresh}>
						<FontAwesomeIcon icon="sync-alt" />
					</RefreshButton>
					<AlgoliaSearchBox />
					<AlgoliaSortBy
						items={sortingOptions}
						defaultRefinement={sortingOptions[0]}
						placeholder="Sortuj"
					/>
				</InnerContainer>
			</OuterContainer>
		)
	}
)

export default Topbar
