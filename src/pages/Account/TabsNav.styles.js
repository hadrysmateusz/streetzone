import styled from "styled-components/macro"
import { NavLink } from "react-router-dom"

export const Container = styled.nav`
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
		padding: var(--spacing1) var(--spacing3);
	}

	user-select: none;
	white-space: nowrap;
	display: block;
	cursor: pointer;
	position: relative;

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		text-decoration: underline;
	}
`

export const Submenu = styled.div`
	background: white;

	border: 1px solid var(--gray75);

	display: grid;
	gap: var(--spacing2);
	padding: var(--spacing3);
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);
`

export const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;
	min-width: 100%;

	${(p) => `${p.align}: 0;`}
	z-index: 996;

	padding-top: var(--spacing3);
`

export const Nav = styled.nav`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
	grid-auto-flow: column;
	gap: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		gap: var(--spacing3);
	}
`

export const NavItem = styled.div`
	border-bottom: 1px solid var(--gray75);
	text-align: center;
	padding: var(--spacing2) 0;

	font-size: var(--font-size--xs);
	text-transform: uppercase;
	white-space: nowrap;
	position: relative;

	user-select: none;
	position: relative;
	white-space: nowrap;
	color: var(--gray0);
	&:hover {
		color: black;
	}
	cursor: pointer;
`

export const StyledNavLink = styled(NavLink)`
	text-decoration: none;

	&.active {
		color: black;
		text-decoration: underline;
	}
`
