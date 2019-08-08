import React, { useState } from "react"
import CreatableSelect from "react-select/lib/Creatable"
import styled from "styled-components/macro"

import FormElementContainer from "./container"
import { disabledStyles, hoverStyles, focusStyles, basicStyles } from "./commonStyles"
import { useFirebase, useFlash, useTagsOptions } from "../../hooks"

const StyledSelect = styled(CreatableSelect).attrs({
	classNamePrefix: "react-select",
	placeholder: "Wybierz..."
})`
	.react-select--container {
	}

	.react-select__control {
		${basicStyles}

		border-radius: 0;
		height: var(--form-element-height);

		&:not([disabled]) {
			:hover {
				${hoverStyles}
			}
		}
	}
	.react-select__control--menu-is-open,
	.react-select__control--is-focused {
		${focusStyles}
	}
	.react-select__control--is-disabled {
		${disabledStyles}
	}

	.react-select__value-container {
		padding: 0 var(--spacing2);
		overflow: visible;
	}

	.react-select__indicators {
	}

	.react-select__menu {
		border-radius: 0;
		z-index: 20;
	}
	.react-select__menu-list {
	}

	.react-select__option {
		&:active {
			background: var(--black0);
			color: white;
		}
	}
	.react-select__option--is-selected {
		background: var(--gray100);
		color: black;
	}
	.react-select__option--is-focused {
		background: var(--black25);
		color: white;
	}
`

const TagsInput = ({ onChange: setValue, value, info, error, disabled, ...rest }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const { options, isLoading } = useTagsOptions()
	const [isCreating, setIsCreating] = useState(false)

	// only null resets the field so if a value
	// wasn't found set it to null to clear the field
	if (!value) {
		value = null
	} else {
		value = value.map((singleValue) =>
			options.find((option) => option.value === singleValue)
		)
	}

	const onChange = (data, action) => {
		if (action.action === "clear") {
			setValue(undefined)
		} else {
			const value = data.map((dataObj) => dataObj.value)
			setValue(value)
		}
	}

	const onCreateOption = async (inputValue) => {
		try {
			// TODO: input sanitizing (strip slashes, dots, braces etc.)
			// the key can be different from the display value
			// the same process as for encoding can be used for decoding if the need arises
			// const key = inputValue.toLowerCase().replace(/\W/g, "")

			// setIsCreating(true)

			await firebase.db
				.collection("tags")
				.doc(inputValue)
				.set({ name: inputValue })

			const newValue = value ? [...value, inputValue] : [inputValue]

			// TODO: make sure the new value doesn't  override the old one

			setValue(newValue)

			// setIsCreating(false)
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Błąd",
				details: "Tag mógł nie zostać dodany, więcej informacji w konsoli"
			})
		}
	}

	console.log("rest", rest)

	return (
		<FormElementContainer info={info} error={error}>
			<StyledSelect
				{...rest}
				onCreateOption={onCreateOption}
				onChange={onChange}
				value={value}
				hasError={!!error}
				options={options}
				isMulti
				isSearchable
				isDisabled={disabled || isLoading || isCreating}
				isLoading={isLoading || isCreating}
			/>
		</FormElementContainer>
	)
}

export default TagsInput
