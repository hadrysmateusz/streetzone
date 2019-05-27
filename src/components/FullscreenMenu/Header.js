import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../StyledComponents"

const HeaderContainer = styled.header`
	border-bottom: 1px solid var(--gray75);
	height: var(--page-header-height);
	padding: 0 var(--spacing3);
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-auto-flow: column;
	align-items: center;
`

const CloseIconContainer = styled.span`
	cursor: pointer;
	padding: var(--spacing1);
`

const Header = ({ onClose, text }) => {
	return (
		<HeaderContainer>
			<TextBlock size="m" bold>
				{text}
			</TextBlock>
			<CloseIconContainer onClick={onClose}>
				<FontAwesomeIcon icon="times" />
			</CloseIconContainer>
		</HeaderContainer>
	)
}

export default Header
