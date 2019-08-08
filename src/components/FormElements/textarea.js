import React from "react"
import styled from "styled-components/macro"
import FormElementContainer from "./container"
import AutosizeTextarea from "react-textarea-autosize"
import commonStyles from "./commonStyles"

const StyledTextarea = styled(AutosizeTextarea)`
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

	border-color: ${(p) => p.hasError && "var(--danger50)"};

`

const Textarea = ({
	icon,
	info,
	error,
	disabled,
	autoResize = true,
	numberOfLines = 4,
	...rest
}) => (
	<FormElementContainer error={error} info={info}>
		<StyledTextarea
			disabled={disabled}
			autoResize={autoResize}
			numberOfLines={numberOfLines}
			hasError={!!error}
			{...rest}
		/>
	</FormElementContainer>
)

export default Textarea
