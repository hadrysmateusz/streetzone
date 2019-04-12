import styled from "styled-components/macro"
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

	--margin-y: var(--spacing3);
	--padding-x: ${(p) => (p.extraWide ? "var(--spacing1)" : "var(--spacing3)")};

	width: 100%;

	margin: ${(p) => (p.noMargin ? "0" : "var(--margin-y)")} auto;
	padding: 0 var(--padding-x);

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		--margin-y: var(--spacing3);
		--padding-x: var(--spacing3);
	}
`

const OuterGrayContainer = styled.section`
	width: 100%;
	background: var(--gray100);
	${(p) => p.padded && "padding: var(--spacing4) 0;"}
`
const GrayContainer = ({ padded, children, ...props }) => (
	<OuterGrayContainer padded={padded}>
		<PageContainer {...props}>{children}</PageContainer>
	</OuterGrayContainer>
)

const CenteredContainerBox = styled.div`
	flex-shrink: 0;

	display: block;
	margin: 0 auto;
	min-height: 0;
	width: 320px;
	max-width: 100%;
	padding: var(--spacing3);
`
const OuterCenteredContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
	&::before,
	&::after {
		content: "";
		display: block;
		flex-grow: 1;
		min-height: 150px;
	}

	&::before {
		margin-top: -150px;
	}
`

const CenteredContainer = ({ children }) => {
	return (
		<OuterCenteredContainer>
			<CenteredContainerBox>{children}</CenteredContainerBox>
		</OuterCenteredContainer>
	)
}

export { PageContainer, GrayContainer, CenteredContainer }
