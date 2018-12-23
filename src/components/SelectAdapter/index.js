import React from "react"
import Select from "react-select"

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

export default SelectAdapter
