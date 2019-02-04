import React from "react"
import styled from "styled-components"
import { Media } from "react-breakpoints"
import { AlgoliaSelectAdapter } from "../SelectAdapter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectSortBy } from "react-instantsearch-dom"
import { THEME } from "../../constants"

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
	min-width: 0;
	background: white;
	padding: 0 12px;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	:hover {
		border: 1px solid ${(p) => p.theme.colors.gray[25]};
	}
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
				{items.map((item, i) => (
					<option key={i} value={item.value}>
						{item.label}
					</option>
				))}
			</StyledSelect>
		</Container>
	)
)

const AlgoliaSortBy = ({ options, defaultOption }) => (
	<Media>
		{({ currentBreakpoint }) => {
			if (currentBreakpoint > 0) {
				return (
					<AlgoliaSelectAdapter
						defaultRefinement={defaultOption}
						items={options}
						styles={{
							control: (provided, state) => ({
								...provided,
								minWidth: "180px",
								minHeight: "0",
								fontSize: "0.92rem",
								border: `1px solid ${THEME.colors.gray[75]}`,
								"&:hover": {
									borderColor: THEME.colors.gray[25]
								}
							})
						}}
					/>
				)
			} else {
				return (
					<AlgoliaSortByMobile
						defaultRefinement={defaultOption}
						items={options}
						style={{ gridArea: "sort" }}
					>
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
