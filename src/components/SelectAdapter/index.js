import React from "react"
import Select from "react-select"
import { connectSortBy } from "react-instantsearch-dom"

const SelectAdapter = ({ onChange, value, initial, options, isMulti, ...rest }) => {
	// only null resets the field so if a value
	// wasn't found set it to null to clear the field
	if (!value) {
		value = null
	} else {
		console.log(value)

		// Find the matching value based on the isMulti prop
		// and possible values in the options prop
		if (isMulti) {
			value = value.map((singleValue) =>
				options.find((option) => option.value === singleValue)
			)
		} else {
			value = options.find((option) => option.value === value)
		}
	}

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

export default SelectAdapter
export { AlgoliaSelectAdapter }
