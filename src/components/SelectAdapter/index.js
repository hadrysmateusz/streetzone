import React from "react"
import Select from "react-select"

const SelectAdapter = ({ onChange, value, initial, options, isMulti, ...rest }) => {
	if (isMulti) {
		value = value.map((singleValue) =>
			options.find((option) => option.value === singleValue)
		)
	} else {
		value = options.find((option) => option.value === value)
	}

	return (
		<Select
			{...rest}
			value={value}
			options={options}
			isMulti={isMulti}
			onChange={(data, action) => {
				const value = isMulti ? data.map((dataObj) => dataObj.value) : data.value

				if (action.action === "clear") {
					// in development this resets to the generated value
					onChange(initial)
				} else {
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
