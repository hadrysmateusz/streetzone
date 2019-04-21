import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

const OuterContainer = styled.div`
	height: 100%;
	display: grid;
	grid-auto-flow: column;
`

const ButtonContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	color: var(--gray50);
	font-size: 2.6rem;
	padding: 0 var(--spacing2);
	:hover {
		color: var(--gray0);
	}
`

const ViewSwitch = ({ setView }) => {
	return (
		<OuterContainer>
			<ButtonContainer onClick={() => setView("list")}>
				<FontAwesomeIcon icon="th-list" />
			</ButtonContainer>
			<ButtonContainer onClick={() => setView("grid")}>
				<FontAwesomeIcon icon="th-large" />
			</ButtonContainer>
		</OuterContainer>
	)
}

export default ViewSwitch
