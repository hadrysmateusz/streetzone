import React from "react"
import styled from "styled-components/macro"
import FormElementContainer from "./container"
import Textarea from "react-textarea-autosize"
import commonStyles from "./commonStyles"

const StyledTextarea = styled(Textarea)`
	display: block;
	line-height: 1.45em;
	resize: vertical;
	min-height: calc(4 * 1.45em + 0.7em);
	font-size: var(--font-size--s) !important;
	font-family: var(--font-family--sans-serif);
	padding: var(--spacing2);

	${commonStyles}
`

const Input = ({ icon, info, error, disabled, ...rest }) => {
	return (
		<FormElementContainer error={error} info={info}>
			<StyledTextarea hasIcon={!!icon} hasError={!!error} disabled={disabled} {...rest} />
		</FormElementContainer>
	)
}

export default Input
