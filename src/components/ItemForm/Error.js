import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { CSS } from "../../constants"

const ErrorContainer = styled.div`
	&:not(:empty) {
		background: ${CSS.COLOR_DANGER_LIGHT};
		border: 1px solid ${CSS.COLOR_DANGER_DARKER};
		padding: 0 10px;
		line-height: 36px;
		min-height: 38px;
		margin-top: 10px;
		font-size: 0.92rem;
		color: ${CSS.COLOR_DANGER_DARK};
	}
`

const ErrorMessage = styled.span`
	margin-left: 9px;
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
