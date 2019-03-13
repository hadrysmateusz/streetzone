import styled from "styled-components"
import { style } from "styled-system"
import React from "react"

const pageContainerWidth = style({
	prop: "maxWidth",
	cssProperty: "max-width",
	key: "breakpoints",
	transformValue: (n) => n + "px"
})

const PageContainer = styled.section`
	max-width: ${(p) => p.theme.breakpoints[5]}px; /* default */
	${pageContainerWidth}

	--margin-y: 10px;
	--padding-x: 3px;

	width: 100%;

	margin: var(--margin-y) auto;
	padding: 0 var(--padding-x);

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		--margin-y: 20px;
		--padding-x: 20px;
	}
`

const BlogPageContainer = styled.section`
	${pageContainerWidth}
	margin: 0 auto;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	@media (min-width: ${pageContainerWidth}) {
		padding: 20px;
	}
`

const OuterGrayContainer = styled.section`
	width: 100%;
	background: var(--gray100);
	${(p) => p.padded && "padding: 40px 0;"}
`
const GrayContainer = ({ padded, children, ...props }) => (
	<OuterGrayContainer padded={padded}>
		<PageContainer {...props}>{children}</PageContainer>
	</OuterGrayContainer>
)

export { PageContainer, BlogPageContainer, GrayContainer }
