import styled from "styled-components"
import { ellipsis } from "../../style-utils"

export const Name = styled.div`
	font-size: ${(p) => (p.nameOnly ? "1.22rem" : "1.1rem")};
	${(p) => p.removed && "color: #b8b8b8; font-weight: 300;"}
	${ellipsis}
`

export const InfoContainer = styled.div`
	padding: 2px 0 0 8px;
	overflow: hidden;
	${(p) => p.vertical && "text-align: center; padding: 8px 0 0 0;"}
`

export const DateContainer = styled.div`
	font-size: 0.8rem;
	font-weight: 300;
`

export const Container = styled.div`
	margin: 10px 0;
	font-weight: 500;
	display: flex;
	flex-direction: ${(p) => (p.vertical ? "column" : "row")};
	${(p) => p.vertical && "align-items: center;"}
`
