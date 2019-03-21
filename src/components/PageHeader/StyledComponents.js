import styled from "styled-components"

export const PageHeader = styled.header`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	height: 60px;
	margin: 0 auto;
	padding: 0 20px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`

export const PageHeaderOuter = styled.div`
	position: sticky;
	top: 0;
	z-index: 80;
	background: white;
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
	position: absolute;
	top: 100%;
	right: 0;
	background: white;

	border: 1px solid var(--gray75);
	border-top: none;

	z-index: 81;

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 5px 0;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	display: none;
`

export const NavItem = styled.div`
	user-select: none;
	position: relative;
	white-space: nowrap;
	color: var(--gray0);
	display: block;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${Submenu} {
			display: block;
		}
	}

	> :first-child {
		height: 100%;
	}
`
