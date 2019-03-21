import React from "react"
import styled from "styled-components"
import FormElementContainer from "./container"
import Textarea from "react-textarea-autosize"

const StyledTextarea = styled(Textarea)`
	display: block;
	line-height: 1.45em;
	resize: vertical;
	min-height: calc(4 * 1.45em + 0.7em);
	font-size: var(--font-size--s) !important;
	font-family: var(--font-family--sans-serif);

	padding: var(--spacing2);
	${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}

	width: 100%;
	border: 1px solid;
	border-color: ${(p) => (p.hasError ? "var(--error50)" : "var(--gray25)")};

	::placeholder {
		color: var(--gray0);
	}

	&[disabled] {
		background: var(--almost-white);
		border-color: var(--gray50);
	}

	transition: box-shadow 0.11s ease, border-color 0.11s ease;
	&:not([disabled]) {
		:hover,
		:focus {
			border-color: var(--black75);
		}
		:focus {
			outline: none;
			box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
		}
	}
`

const Input = ({ icon, info, error, disabled, ...rest }) => {
	return (
		<FormElementContainer error={error} info={info}>
			<StyledTextarea hasIcon={!!icon} hasError={!!error} disabled={disabled} {...rest} />
		</FormElementContainer>
	)
}

export default Input
