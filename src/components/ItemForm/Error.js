import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { CSS } from "../../constants"

const ErrorContainer = styled.div`
	&:not(:empty) {
		background: ${CSS.COLOR_DANGER_LIGHT};
		border: 2px solid ${CSS.COLOR_DANGER_DARKER};
		padding: 12px 18px;
		margin-top: 10px;
		color: ${CSS.COLOR_DANGER_DARK};
	}
`

const ErrorMessage = styled.span`
	margin-left: 7px;
`

export default function Error({ message, showIf }) {
	return (
		<ErrorContainer>
			{showIf && (
				<>
					<FontAwesomeIcon icon="exclamation" />
					<ErrorMessage>{message}</ErrorMessage>
				</>
			)}
		</ErrorContainer>
	)
}
