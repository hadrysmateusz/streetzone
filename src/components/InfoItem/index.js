import React from "react"
import { TextBlock, SmallTextBlock } from "../StyledComponents"

const InfoItem = ({ name, size = "s", children }) => {
	return (
		<div>
			<SmallTextBlock>{name}</SmallTextBlock>
			<TextBlock size={size} bold>
				{children}
			</TextBlock>
		</div>
	)
}

export default InfoItem
