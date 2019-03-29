import React from "react"
import { Dropdown } from "../FormElements"
import { connectSortBy } from "react-instantsearch-dom"

const DropdownFinalform = ({ onChange: setValue, value, options, isMulti, ...rest }) => {
	// only null resets the field so if a value
	// wasn't found set it to null to clear the field
	if (!value) {
		value = null
	} else {
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

	const onChange = (data, action) => {
		if (action.action === "clear") {
			setValue(undefined)
		} else {
			const value = isMulti ? data.map((dataObj) => dataObj.value) : data.value
			setValue(value)
		}
	}

	// console.log(rest)

	return (
		<Dropdown
			{...rest}
			value={value}
			options={options}
			isMulti={isMulti}
			onChange={onChange}
		/>
	)
}

export const AlgoliaSelectAdapter = connectSortBy(
	({ refine, items, currentRefinement, ...rest }) => {
		const value = items.find((option) => option.value === value)
		return (
			<Dropdown
				{...rest}
				options={items}
				value={value}
				onChange={(data, action) => refine(data.value)}
			/>
		)
	}
)

export default DropdownFinalform
