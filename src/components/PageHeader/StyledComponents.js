import styled from "styled-components/macro"

export const HEADER_HEIGHT = "60px"

export const PageHeaderContainer = styled.header`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	height: ${HEADER_HEIGHT};
	margin: 0 auto;
	padding: 0 20px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
`

export const PageHeaderOuter = styled.div`
	position: sticky;
	top: 0;
	z-index: 80;
	background: rgb(255, 255, 255, 0.95);
	border-bottom: 1px solid white;
	transition: border-color 0.14s linear;
	${(p) => p.scrollPosition !== 0 && "border-color: var(--gray75);"}
`

export const Nav = styled.nav`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: min-content;
	gap: 30px;
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
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

	${(p) => `${p.align}: 0;`}
	z-index: 81;

	padding-top: var(--spacing3);

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
