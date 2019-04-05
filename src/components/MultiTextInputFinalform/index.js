import React from "react"
import { MultiTextInputControlled } from "../FormElements"

const MultiTextInputFinalform = ({ onChange, value, ...rest }) => {
	// convert any string value to React Select option object
	if (value) {
		value = value.map((a) => {
			if (typeof a === "string") {
				return {
					value: a,
					label: a
				}
			} else {
				return a
			}
		})
	}

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
