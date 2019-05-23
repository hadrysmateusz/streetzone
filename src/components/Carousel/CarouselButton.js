import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const StyledButton = styled.button`
	--size: calc(42px * ${(p) => p.scale});

	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--size);
	height: var(--size);
	font-size: 12px;
	background: white;
	color: var(--black25);
	opacity: 0.85;
	transition: all 0.2s;
	cursor: pointer;
	outline: none;
	border: 1px solid var(--gray100);
	&:hover {
		opacity: 1;
	}
`

export default ({ onClick, scale = 1, direction }) => {
	return (
		<StyledButton onClick={onClick} scale={scale}>
			<FontAwesomeIcon icon={`angle-${direction}`} size="2x" />
		</StyledButton>
	)
}
