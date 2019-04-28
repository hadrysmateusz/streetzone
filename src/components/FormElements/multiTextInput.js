import React, { Component } from "react"
import CreatableSelect from "react-select/lib/Creatable"
import styled from "styled-components/macro"

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

const createOption = (label) => {
	return {
		label,
		value: label
	}
}

export class MultiTextInput extends Component {
	state = {
		inputValue: "",
		value: []
	}

	handleChange = (value, actions) => {
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
				this.setState({
					inputValue: "",
					value: [...value, createOption(inputValue)]
				})

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

export class MultiTextInputControlled extends Component {
	state = { inputValue: "" }

	handleChange = (value, actions) => {
		if (actions.action === "clear") {
			this.props.customSetState(null)
		}
	}

	handleInputChange = (inputValue) => {
		this.setState({ inputValue })
	}

	handleKeyDown = (event) => {
		const { inputValue } = this.state
		if (!inputValue) return
		switch (event.key) {
			case "Enter":
			case "Tab":
				this.props.customSetState(inputValue)
				this.setState({ inputValue: "" })

				event.preventDefault()
				break
			default:
				return
		}
	}
	render() {
		const { inputValue } = this.state
		const { info, error, disabled, value, placeholder } = this.props

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
					disabled={disabled}
					placeholder={placeholder}
				/>
			</FormElementContainer>
		)
	}
}
