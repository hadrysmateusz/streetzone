import React from "react"
import styled from "styled-components"
import { Media } from "react-breakpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectSortBy } from "react-instantsearch-dom"

import Dropdown from "../FormElements/dropdown"

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
	svg {
		margin-right: 6px;
	}
	height: var(--form-element-height);
`

class AlgoliaSortBy extends React.Component {
	render() {
		const {
			refine,
			currentRefinement,
			items,
			placeholder,
			defaultRefinement,
			...rest
		} = this.props

		return (
			<Media>
				{({ currentBreakpoint }) => {
					if (currentBreakpoint > 0) {
						return (
							<Dropdown
								{...rest}
								options={items}
								defaultValue={defaultRefinement}
								onChange={(data, action) => refine(data.value)}
							/>
						)
					} else {
						return (
							<Container {...rest}>
								<label htmlFor="filter-select">
									<FontAwesomeIcon icon="sort" />
									Sortuj
								</label>
								<StyledSelect
									id="filter-select"
									onChange={(e) => refine(e.currentTarget.value)}
								>
									{items.map((item, i) => (
										<option key={i} value={item.value}>
											{item.label}
										</option>
									))}
								</StyledSelect>
							</Container>
						)
					}
				}}
			</Media>
		)
	}
}

export default connectSortBy(AlgoliaSortBy)
