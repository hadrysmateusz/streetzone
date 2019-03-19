import React from "react"

import { TextBlock, SmallTextBlock } from "../StyledComponents"

const SingleValueDisplay = ({ title, children }) => {
	return (
		<div>
			<SmallTextBlock>{title}</SmallTextBlock>
			<TextBlock size="m" bold>
				{children}
			</TextBlock>
		</div>
	)
}

export default SingleValueDisplay
