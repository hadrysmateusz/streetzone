import React from "react"
import styled from "styled-components"
import { Media } from "react-breakpoints"
import { AlgoliaSelectAdapter } from "../SelectAdapter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectSortBy } from "react-instantsearch-dom"

const StyledSelect = styled.select`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0;
`

const Container = styled.label`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	color: ${(p) => p.theme.colors.black[75]};
	border: 1px solid ${(p) => p.theme.colors.gray[50]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
	min-width: 0;
	background: white;
	padding: 0 12px;
	height: 34px;
	font-size: 0.92rem;
	svg {
		margin-right: 6px;
	}
`

const AlgoliaSortByMobile = connectSortBy(
	({ children, refine, items, currentRefinement, ...rest }) => (
		<Container {...rest}>
			<label htmlFor="filter-select">{children}</label>
			<StyledSelect id="filter-select" onChange={(e) => refine(e.currentTarget.value)}>
				{items.map((item) => (
					<option value={item.value}>{item.label}</option>
				))}
			</StyledSelect>
		</Container>
	)
)

const AlgoliaSortBy = ({ options }) => (
	<Media>
		{({ currentBreakpoint }) => {
			if (currentBreakpoint > 0) {
				return (
					<AlgoliaSelectAdapter
						defaultRefinement="dev_items"
						items={options}
						styles={{
							control: (provided) => ({
								...provided,
								minWidth: "180px",
								minHeight: "0",
								fontSize: "0.92rem"
							})
						}}
					/>
				)
			} else {
				return (
					<AlgoliaSortByMobile defaultRefinement="dev_items" items={options}>
						<FontAwesomeIcon icon="sort" />
						Sortuj
					</AlgoliaSortByMobile>
				)
			}
		}}
	</Media>
)

export default AlgoliaSortBy
export { AlgoliaSortByMobile }
