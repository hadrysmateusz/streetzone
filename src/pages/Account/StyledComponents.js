import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const TabsNav = styled.nav`
	display: flex;
	font-size: var(--font-size--m);
	font-family: var(--font-family--serif);
	justify-content: space-evenly;
	padding: 20px 0;
	color: var(--gray0);

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		justify-content: center;
		font-size: var(--font-size--h4);
	}
`

export const TabsNavItem = styled(NavLink)`
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: 4px 20px;
	}

	user-select: none;
	white-space: nowrap;
	display: block;
	cursor: pointer;

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		text-decoration: underline;
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

export const InnerContainer = styled.div``
