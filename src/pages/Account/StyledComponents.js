import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const TabsNav = styled.nav`
	display: flex;
	justify-content: space-evenly;
	padding: var(--spacing3) 0;
	margin-bottom: var(--spacing4);
	color: var(--gray0);

	border-bottom: 1px solid var(--gray75);

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		justify-content: center;
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

export const MainContainer = styled.div`
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
	max-width: ${(p) => p.theme.breakpoints[2]}px;
`

export const FollowedUsersContainer = styled.div`
	display: grid;
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 1fr 1fr;
	}
	gap: var(--spacing3);
`
