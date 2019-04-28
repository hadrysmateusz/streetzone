import React from "react"
import { MultiTextInputControlled } from "../FormElements"

const MultiTextInputFinalform = ({ onChange, value, ...rest }) => {
	const customSetState = (newTag) => {
		if (!newTag) {
			onChange(undefined)
		} else {
			if (value) {
				value = [...value, newTag]
			} else {
				value = [newTag]
			}
			onChange(value)
		}
	}

	// convert any string value to React Select option object
	let formattedValue
	if (value) {
		formattedValue = value.map((a) => {
			return {
				value: a,
				label: a
			}
		})
	}

	return (
		<MultiTextInputControlled
			{...rest}
			value={formattedValue}
			customSetState={customSetState}
		/>
	)
}

export default MultiTextInputFinalform
