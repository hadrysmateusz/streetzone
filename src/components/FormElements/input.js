import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormElementContainer from "./container"
import commonStyles from "./commonStyles"

const StyledInput = styled.input`
	/* only show arrows on hover in firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
	&[type="number"]:hover,
	&[type="number"]:focus {
		-moz-appearance: number-input;
	}

	font-size: var(--font-size--s) !important;
	height: var(--form-element-height);
	padding: 0 var(--spacing2);
	${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}

	${commonStyles}
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
