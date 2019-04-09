import styled from "styled-components/macro"
import { ellipsis } from "../../style-utils"

export const Name = styled.div`
	font-size: var(--font-size--m);
	font-weight: bold;
	${(p) => p.removed && "color: var(--gray50); font-weight: normal;"}
	${ellipsis}
`

export const InfoContainer = styled.div`
	padding-left: var(--spacing2);
	overflow: hidden;
	${(p) => p.vertical && "text-align: center; padding: var(--spacing2) 0 0 0;"}
`

export const Container = styled.div`
	margin: var(--spacing2) 0;
	display: flex;
	flex-direction: ${(p) => (p.vertical ? "column" : "row")};
	${(p) => p.vertical && "align-items: center;"}
`
