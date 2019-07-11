import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"

const Toggle = styled.div`
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	background: white;
	padding: 0 var(--spacing3);
	color: ${(p) => p.theme.colors.black[75]};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 0;
	cursor: pointer;
	flex: 1;

	svg {
		margin-right: var(--spacing2);
	}
`

const FiltersToggleContainer = styled.div`
	height: var(--form-element-height);
	display: flex;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		min-width: 155px;
	}
`

export const FiltersToggleButton = ({ onClick }) => {
	return (
		<Toggle onClick={onClick}>
			<FontAwesomeIcon icon="filter" />
			<span>Filtry</span>
		</Toggle>
	)
}

const FiltersToggle = ({ currentBreakpoint, toggleFilters }) => {
	return currentBreakpoint <= 2 ? (
		<FiltersToggleContainer>
			<Toggle onClick={toggleFilters}>
				<FontAwesomeIcon icon="filter" />
				<span>Filtry</span>
			</Toggle>
		</FiltersToggleContainer>
	) : null
}

export default withBreakpoints(FiltersToggle)
