import React from "react"
import styled from "styled-components/macro"

import { mapN } from "../../utils"

const IndicatorContainer = styled.div`
	display: flex;
	align-items: center;
`
const IndicatorBubble = styled.div`
	--size: calc(${(p) => (p.isCurrent ? "1.5" : "1")} * 4px);

	background: ${(p) => (p.isCurrent ? "white" : "var(--gray50)")};
	width: var(--size);
	height: var(--size);
	border-radius: 50%;

	:not(:first-child) {
		margin-left: var(--spacing1);
	}
`

const Indicator = ({ current, nOfElements, onClick }) => {
	return (
		<IndicatorContainer>
			{mapN(nOfElements, (i) => {
				const isCurrent = i === current
				return (
					<IndicatorBubble key={i} isCurrent={isCurrent} onClick={() => onClick(i)} />
				)
			})}
		</IndicatorContainer>
	)
}

export default Indicator
