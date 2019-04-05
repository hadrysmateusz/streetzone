import React from "react"
import styled from "styled-components/macro"
import { space, color, fontSize } from "styled-system"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconContainer = styled.div`
  ${fontSize}
	${space}
  ${color}
`

const Icon = ({ icon, fixedWidth, ...props }) => {
	return (
		<IconContainer {...props}>
			<FontAwesomeIcon icon={icon} fixedWidth={fixedWidth} />
		</IconContainer>
	)
}

export default Icon
