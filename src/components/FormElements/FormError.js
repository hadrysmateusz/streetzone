import React from "react"
import { Box } from "rebass"
import styled from "styled-components/macro"
import { space, color, fontSize } from "styled-system"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Icon = styled(FontAwesomeIcon)`
  ${fontSize}
	${space}
  ${color}
`

const ErrorContainer = styled(Box).attrs({
	px: 2,
	py: 2,
	mt: 2,
	bg: "danger.100",
	color: "danger.0"
})`
	border: 1px solid ${(p) => p.theme.colors.danger[0]};
`

const FormError = ({ message, show }) =>
	show ? (
		<ErrorContainer>
			<Icon icon="exclamation" ml={1} mr={2} />
			<span>{message}</span>
		</ErrorContainer>
	) : null

export default FormError
