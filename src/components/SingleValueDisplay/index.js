import React from "react"

import { TextBlock } from "../StyledComponents"

const SingleValueDisplay = ({ title, children }) => {
	return (
		<div>
			<TextBlock size="xs" uppercase>
				{title}
			</TextBlock>
			<TextBlock size="m" bold>
				{children}
			</TextBlock>
		</div>
	)
}

export default SingleValueDisplay
