import React from "react"
import { MultiTextInputControlled } from "../FormElements"

const MultiTextInputFinalform = ({ onChange, value, ...rest }) => {
	// only null resets the field so if a value
	// wasn't found set it to null to clear the field

	const customSetState = (newOption) => {
		if (!newOption) {
			onChange(null)
		} else {
			if (value) {
				value = [...value, newOption]
			} else {
				value = [newOption]
			}
			onChange(value)
		}
	}

	return (
		<MultiTextInputControlled {...rest} value={value} customSetState={customSetState} />
	)
}

export default MultiTextInputFinalform
