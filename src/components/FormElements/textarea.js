import React from "react"
import styled from "styled-components/macro"
import FormElementContainer from "./container"
import Textarea from "react-textarea-autosize"
import commonStyles from "./commonStyles"

const StyledTextarea = styled(Textarea)`
	display: block;
	font-size: var(--font-size--s) !important;
	padding: var(--spacing2);
	resize: vertical;
	--line-height: 1.45em;
	--min-height: calc(${(p) => p.numberOfLines} * var(--line-height));
	line-height: var(--line-height);
	min-height: var(--min-height);
	${(p) => !p.autoResize && "max-height: var(--min-height);"}

	${commonStyles}
`

const Input = ({
	icon,
	info,
	error,
	disabled,
	autoResize = true,
	numberOfLines = 4,
	...rest
}) => {
	return (
		<FormElementContainer error={error} info={info}>
			<StyledTextarea
				disabled={disabled}
				autoResize={autoResize}
				numberOfLines={numberOfLines}
				{...rest}
			/>
		</FormElementContainer>
	)
}

export default Input
