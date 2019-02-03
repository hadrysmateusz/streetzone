import styled from "styled-components"

export const TabsNavContainer = styled.div`
	grid-area: tabs-nav;
	min-height: 100%;
`

export const TabsNav = styled.nav`
	background: white;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	white-space: nowrap;

	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		text-align: center;
	}

	background: white;

	display: flex;
	flex-flow: column nowrap;
	margin: 0;
	padding: 10px 0;

	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-size: 0.8rem;
	font-weight: normal;
`

export const TabsNavItem = styled.li`
	user-select: none;
	position: relative;
	list-style-type: none;
	white-space: nowrap;
	color: ${(p) => p.theme.colors.black[75]};
	display: block;
	order: 1;
	padding: 0 4px;
	height: 41px;

	:hover {
		background: #f8f8f8;
	}
	> :first-child {
		height: 100%;
		padding: 0 14px;
	}
	span {
		margin-left: 8px;
	}
`

export const MainGrid = styled.div`
	height: 100%;
	width: 100%;
	flex: 1;
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
