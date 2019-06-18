import React from "react"
import styled from "styled-components/macro"
import { PoweredBy as PoweredByBase } from "react-instantsearch-dom"

export const PoweredBy = styled(PoweredByBase)`
	margin: 0;
	height: 100%;
	transform: scale(0.83) ${(p) => p.small && "translateY(7px)"} translateX(-24px);

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
	color: var(--black75);
	margin-bottom: var(--spacing3);
`

export const PoweredByBox = () => {
	return (
		<BoxContainer>
			<PoweredBy />
		</BoxContainer>
	)
}
