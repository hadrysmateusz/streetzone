import React from "react"
import Select from "react-select"
import { connectSortBy } from "react-instantsearch-dom"
import styled from "styled-components"

const SelectAdapter = ({ onChange, value, initial, options, isMulti, ...rest }) => {
	// Find the matching value based on the isMulti prop
	// and possible values in the options prop
	if (isMulti) {
		value = value.map((singleValue) =>
			options.find((option) => option.value === singleValue)
		)
	} else {
		value = options.find((option) => option.value === value)
	}

	// only null resets the field so if a value
	// wasn't found set it to null to clear the field
	if (value === undefined) value = null

	return (
		<Select
			{...rest}
			value={value}
			options={options}
			isMulti={isMulti}
			onChange={(data, action) => {
				if (action.action === "clear") {
					onChange(undefined)
				} else {
					const value = isMulti ? data.map((dataObj) => dataObj.value) : data.value
					onChange(value)
				}
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
				}
			})}
		/>
	)
}

const AlgoliaSelectAdapter = connectSortBy(
	({ refine, items, currentRefinement, ...rest }) => {
		console.log(items, currentRefinement, rest)
		const value = items.find((option) => option.value === value)
		return (
			<Select
				{...rest}
				options={items}
				value={value}
				onChange={(data, action) => refine(data.value)}
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
	}
)

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

const SelectMobile = connectSortBy(
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

export default SelectAdapter
export { AlgoliaSelectAdapter, SelectMobile }
