import React from "react"
import styled, { css } from "styled-components/macro"
import { NavLink } from "react-router-dom"

export const TabsNavContainer = styled.nav`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	margin: var(--spacing2) 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		margin: var(--spacing4) 0;
	}
`

const navActive = css`
	color: black;
	border-bottom: 3px solid black;
`

const navCommon = css`
	color: var(--gray25);
	font-weight: var(--semi-bold);
	font-size: ${(p) => (p.biggerText ? `var(--fs-s)` : "var(--fs-xs)")};
	text-transform: uppercase;
	text-align: center;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 36px;
	box-sizing: padding-box;
	border-bottom: 1px solid var(--gray75);
	transition: border-color 0.25s linear, border-width 0.25s linear;

	&:hover {
		color: black;
	}

	${(p) => p.active && navActive}
`

export const Tab = styled.div`
	${navCommon}
`

export const TabLink = styled(NavLink)`
	${navCommon}
`

export const TabsNav = ({ tabs, biggerText }) => (
	<TabsNavContainer>
		{tabs.map((tab) => (
			<TabLink
				biggerText={biggerText}
				to={tab.path}
				key={tab.label + tab.path}
				active={tab.active}
			>
				{tab.label}
			</TabLink>
		))}
	</TabsNavContainer>
)
