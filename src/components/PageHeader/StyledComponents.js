import styled from "styled-components/macro"
import { NavLink } from "react-router-dom"

export const HEADER_HEIGHT = "60px"

export const PageHeaderContainer = styled.header`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	height: ${HEADER_HEIGHT};
	margin: 0 auto;
	padding: 0 var(--spacing3);
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
`

export const PageHeaderOuter = styled.div`
	position: sticky;
	top: 0;
	z-index: 80;
	background: var(--glass);
	border-bottom: 1px solid white;
	transition: border-color 0.14s linear;
	${(p) => p.scrollPosition !== 0 && "border-color: var(--gray75);"}
`

export const Nav = styled.nav`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: min-content;
	gap: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		gap: var(--spacing3);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		gap: var(--spacing4);
	}
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
`

export const Submenu = styled.div`
	background: var(--black25);

	display: grid;
	padding: var(--spacing2) 0;
	${"" /* gap: var(--spacing2); */}
	${"" /* padding: var(--spacing3); */}
	box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.3);
`

export const SubmenuLink = styled(NavLink)`
	display: flex;
	align-items: center;
	background: none;
	padding: var(--spacing2) var(--spacing3);
	color: var(--almost-white);
	cursor: pointer;

	text-decoration: none;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 600;

	&:hover {
		color: white;
		background: var(--black50);
	}

	&.active {
		color: white;
		text-decoration: underline;
	}

	${(p) => p.alwaysBlack && "color: black;"}
`

export const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;

	${(p) => `${p.align}: 0;`}
	z-index: 81;

	padding-top: 12px;

	display: none;
`

export const NavItem = styled.div`
	user-select: none;
	position: relative;
	white-space: nowrap;
	color: var(--gray0);
	display: block;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${SubmenuContainer} {
			display: block;
		}
	}

	> :first-child {
		height: 100%;
	}
`

export const UserNameContainer = styled.div`
	color: var(--black25);
	padding-right: var(--spacing2);
`
