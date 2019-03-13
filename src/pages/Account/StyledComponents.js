import styled from "styled-components"

export const TabsNavContainer = styled.div`
	min-height: 100%;
`

export const TabsNav = styled.nav`
	white-space: nowrap;

	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		text-align: center;
	}

	background: white;

	display: flex;
	flex-flow: column nowrap;
	margin: 0;

	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-weight: normal;
`

export const TabsNavItem = styled.li`
	user-select: none;
	position: relative;
	list-style-type: none;
	white-space: nowrap;
	color: ${(p) => p.theme.colors.black[75]};
	height: 38px;

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

	display: flex;
	align-items: center;
	border: none;
	outline: none;
	padding: 0 10px;
	margin: 0 -10px;
	color: ${(p) => p.theme.colors.black[75]};
	cursor: pointer;
	text-transform: uppercase;

	&:hover {
		color: black;
	}

	&.active {
		font-weight: 700;
	}
`

export const MainGrid = styled.div`
	height: 100%;
	width: 100%;
	flex: 1;
	margin: 0 auto;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
`

export const Section = styled.div`
	margin-bottom: 60px;
`

export const UserSettingsContainer = styled.div`
	margin: 0 auto;
	max-width: 600px;
`

export const InnerContainer = styled.div`
	display: grid;
	gap: 20px;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-columns: min-content 1fr;
	}
`
