import React from "react"
import styled from "styled-components"
import Select from "react-select"
import { Media } from "react-breakpoints"
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
							<Select
								{...rest}
								options={items}
								defaultValue={defaultRefinement}
								onChange={(data, action) => refine(data.value)}
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
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary: "rgb(65, 214, 165)",
										primary75: "rgba(65, 214, 165, 0.75)",
										primary50: "rgba(65, 214, 165, 0.5)",
										primary25: "rgba(65, 214, 165, 0.25)"
									},
									spacing: {
										...theme.spacing,
										baseUnit: 3
									}
								})}
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
