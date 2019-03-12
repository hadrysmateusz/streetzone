import React from "react"
import Select from "react-select"

const StyledSelect = ({ ...props }) => {
	return (
		<Select
			{...props}
			styles={{
				control: (provided, state) => ({
					...provided,
					height: "var(--form-element-height)",
					minWidth: "180px",
					minHeight: "0",
					border: `1px solid var(--gray75)`,
					"&:hover": {
						borderColor: "var(--gray25)"
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
}

export default StyledSelect
