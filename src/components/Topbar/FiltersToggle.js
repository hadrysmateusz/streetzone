import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectCurrentRefinements } from "react-instantsearch-core"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { Toggle, ClearFiltersSubButton, FiltersToggleContainer } from "./StyledComponents"
import { ROUTES } from "../../constants"
import { withBreakpoints } from "react-breakpoints"

export const FiltersToggleButton = ({ onClick }) => {
	return (
		<Toggle onClick={onClick}>
			<FontAwesomeIcon icon="filter" />
			<span>Filtry</span>
		</Toggle>
	)
}

const FiltersToggle = compose(
	withRouter,
	connectCurrentRefinements,
	withBreakpoints
)(({ currentBreakpoint, toggleFilters, currentRefinements, history, clearFilters }) => {
	return currentBreakpoint <= 2 ? (
		<FiltersToggleContainer>
			<Toggle onClick={toggleFilters}>
				<FontAwesomeIcon icon="filter" />
				<span>Filtry</span>
			</Toggle>
			{currentRefinements && currentRefinements.length > 0 && (
				<ClearFiltersSubButton
					onClick={() => {
						history.push(ROUTES.MARKETPLACE)
						clearFilters.update(true)
					}}
					title="Wyczyść filtry"
				>
					<FontAwesomeIcon icon="times" />
				</ClearFiltersSubButton>
			)}
		</FiltersToggleContainer>
	) : null
})

export default withBreakpoints(FiltersToggle)
