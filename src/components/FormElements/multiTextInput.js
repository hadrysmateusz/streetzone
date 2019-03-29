import React, { Component } from "react"
import CreatableSelect from "react-select/lib/Creatable"
import styled from "styled-components"

import FormElementContainer from "./container"
import { disabledStyles, hoverStyles, focusStyles, basicStyles } from "./commonStyles"

const StyledCreatableSelect = styled(CreatableSelect).attrs({
	classNamePrefix: "react-select"
})`
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
	.react-select__control--is-focused {
		${focusStyles}
	}
	.react-select__control--is-disabled {
		${disabledStyles}
	}

	.react-select__value-container {
		padding: 0 var(--spacing2);
	}
`

const components = {
	DropdownIndicator: null
}

const createOption = (label) => ({
	label,
	value: label
})

export default class CreatableInputOnly extends Component {
	state = {
		inputValue: "",
		value: []
	}
	handleChange = (value, actions) => {
		if (this.props.customSetState && actions.action === "clear") {
			this.props.customSetState(undefined)
		}
		this.setState({ value })
	}
	handleInputChange = (inputValue) => {
		this.setState({ inputValue })
	}
	handleKeyDown = (event) => {
		const { inputValue, value } = this.state
		if (!inputValue) return
		switch (event.key) {
			case "Enter":
			case "Tab":
				if (this.props.customSetState) {
					this.props.customSetState(value, inputValue, createOption)
					this.setState({ inputValue: "" })
				} else {
					this.setState({
						inputValue: "",
						value: [...value, createOption(inputValue)]
					})
				}

				event.preventDefault()
				break
			default:
				return
		}
	}
	render() {
		const { inputValue, value } = this.state
		const { info, error, disabled, ...rest } = this.props
		return (
			<FormElementContainer info={info} error={error}>
				<StyledCreatableSelect
					components={components}
					inputValue={inputValue}
					value={value}
					isMulti
					menuIsOpen={false}
					onChange={this.handleChange}
					onInputChange={this.handleInputChange}
					onKeyDown={this.handleKeyDown}
					{...rest}
				/>
			</FormElementContainer>
		)
	}
}
