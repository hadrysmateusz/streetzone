import styled from "styled-components"

export const TabsNav = styled.nav`
	padding: 20px;
	grid-area: tabs-nav;
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	white-space: nowrap;
	display: grid;
	grid-template-columns: 100%;
	grid-auto-rows: min-content;
	gap: 12px;
	text-align: center;
`

export const MainGrid = styled.div`
	height: 100%;
	display: grid;
	margin: 0 auto;
	grid-gap: 20px;
	grid-template-areas:
		"info"
		"tabs-nav"
		"tabs-content";
	grid-template-columns: 100%;
	grid-template-rows: min-content min-content 1fr;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 860px;
		grid-template-columns: min-content 1fr;
		grid-template-rows: min-content 1fr;
		grid-template-areas:
			"info info"
			"tabs-nav tabs-content";
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`
