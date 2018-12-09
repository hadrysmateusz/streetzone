import React from "react"
import Select from "react-select"

const SelectAdapter = ({ onChange, value, initial, options, ...rest }) => (
	<Select
		{...rest}
		value={options.find((option) => option.value === value)}
		options={options}
		onChange={(data, action) => {
			if (action.action === "clear") {
				onChange(initial)
			} else {
				onChange(data.value)
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

export default SelectAdapter
