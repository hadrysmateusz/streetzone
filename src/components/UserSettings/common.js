import React from "react"
import { TextBlock } from "../StyledComponents"

export const Heading = ({ children }) => {
	return (
		<TextBlock size="m" bold uppercase>
			{children}
		</TextBlock>
	)
}
