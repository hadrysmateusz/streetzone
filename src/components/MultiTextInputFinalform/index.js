import React from "react"
import { MultiTextInput } from "../FormElements"

const MultiTextInputFinalform = ({ onChange: setValue, value, ...rest }) => {
	// only null resets the field so if a value
	// wasn't found set it to null to clear the field
	if (!value) {
		value = null
	}

	const customSetState = (value, inputValue, createOption) => {
		console.log(value, inputValue)
		if (!value) {
			setValue(undefined)
		} else {
			console.log(createOption(inputValue))
			setValue([...value, createOption(inputValue)])
		}
		console.log(value, inputValue)
	}

	return <MultiTextInput {...rest} value={value} customSetState={customSetState} />
}

export default MultiTextInputFinalform
