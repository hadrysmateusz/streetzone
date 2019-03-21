import React from "react"
import styled from "styled-components"
import Select from "react-select"
import FormElementContainer from "./container"

const StyledSelect = styled(Select).attrs({
	classNamePrefix: "react-select",
	placeholder: "Wybierz..."
})`
	.react-select--container {
	}
	.react-select__control {
		transition: box-shadow 0.11s ease, border-color 0.11s ease;

		border-radius: 0;

		width: 100%;
		height: var(--form-element-height);
		border: 1px solid;
		border-color: ${(p) => (!!p.hasError ? "var(--error50)" : "var(--gray25)")};

		&:not([disabled]) {
			:hover,
			:focus {
				border-color: var(--black25);
			}
		}
	}
	.react-select__control--menu-is-open,
	.react-select__control--is-focused {
		border-color: var(--black75);
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
	}

	.react-select__control--is-disabled {
		background: var(--almost-white);
	}

	.react-select__value-container {
		padding: 0 var(--spacing2);
		${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}
	}
	.react-select__indicators {
	}
	.react-select__menu {
		border-radius: 0;
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

const Dropdown = ({ info, error, disabled, ...rest }) => (
	<FormElementContainer info={info} error={error}>
		<StyledSelect hasError={!!error} {...rest} isDisabled={disabled} />
	</FormElementContainer>
)

export default Dropdown
