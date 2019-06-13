import React from "react"
import styled from "styled-components/macro"
import { PoweredBy as PoweredByBase } from "react-instantsearch-dom"

export const PoweredBy = styled(PoweredByBase)`
	margin: 0;
	height: 100%;
	transform: scale(0.83) ${(p) => p.small && "translateY(7px)"} translateX(-28px);

	.ais-PoweredBy-text {
		transform: translateY(-2px) translateX(-3px);
		display: inline-block;
		${(p) => p.small && "display: none;"}
	}
	.ais-PoweredBy-logo {
		margin-bottom: -7px;
	}
`

export const BoxContainer = styled.div`
	/* background: var(--almost-white); */
	/* border: 1px solid var(--gray75); */
	color: var(--black75);
	/* padding: var(--spacing2) 0; */
	/* display: flex;
	justify-content: center;
	align-items: center; */
	margin-bottom: var(--spacing3);
`

export const PoweredByBox = () => {
	return (
		<BoxContainer>
			<PoweredBy />
		</BoxContainer>
	)
}
