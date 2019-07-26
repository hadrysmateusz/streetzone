import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { TextBlock } from "../StyledComponents"
import Facebook from "./Facebook"
import Reddit from "./Reddit"
import Twitter from "./Twitter"
import Email from "./Email"

const ShareContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, min-content);
	grid-auto-flow: column;
	justify-content: start;
	gap: var(--spacing3);
	color: var(--gray50);
	line-height: 1em;
	font-size: var(--font-size--m);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		font-size: var(--font-size--l);
	}
	& > div {
		cursor: pointer;
	}
	& > div:hover svg {
		color: var(--black75);
	}
`

const Share = ({ withHeader }) => {
	return (
		<>
			{withHeader && (
				<TextBlock size="xs" uppercase color="gray0">
					Udostępnij
				</TextBlock>
			)}
			<ShareContainer>
				<Facebook />
				<Twitter />
				{/* <Reddit /> */}
				<Email />
			</ShareContainer>
		</>
	)
}

export default Share
