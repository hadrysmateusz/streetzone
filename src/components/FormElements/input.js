import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormElementContainer from "./container"

const StyledInput = styled.input`
	font-size: var(--font-size--s) !important;

	padding: 0 var(--spacing2);
	${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}

	width: 100%;
	height: var(--form-element-height);
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

const InnerContainer = styled.div`
	position: relative;
`

const IconContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	height: var(--form-element-height);
	width: var(--form-element-height);
	display: flex;
	align-items: center;
	justify-content: center;
	${(p) => p.isDisabled && "color: var(--gray25)"}
`

const Input = ({ icon, info, error, disabled, ...rest }) => {
	return (
		<FormElementContainer error={error} info={info}>
			<InnerContainer>
				<IconContainer isDisabled={disabled}>
					{icon && <FontAwesomeIcon icon={icon} />}
				</IconContainer>
				<StyledInput hasIcon={!!icon} hasError={!!error} disabled={disabled} {...rest} />
			</InnerContainer>
		</FormElementContainer>
	)
}

export default Input
