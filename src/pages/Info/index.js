import React, { useMemo } from "react"
import { Switch, Route, withRouter, NavLink } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

const Layout = styled.div`
	gap: var(--spacing4);
	display: grid;

	grid-template-columns: 100%;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: minmax(220px, 25%) 1fr;
	}
`

const SidebarHeader = styled.div`
	text-align: center;
	padding: var(--spacing2);
	font-size: var(--fs-l);
	font-weight: bold;
	border-bottom: 1px solid var(--gray75);
`

const Main = styled.main``

const MainHeader = styled.h1`
	margin: 0 0 var(--spacing3) 0;
	font-size: var(--fs-xl);
	font-weight: bold;
	font-family: var(--ff-serif);
`

const Sidebar = styled.aside`
	align-self: flex-start;
	border: 1px solid var(--gray75);
`

const Section = styled.div`
	padding: var(--spacing3);
	:not(:last-child) {
		border-bottom: 1px solid var(--gray75);
	}
`

const SectionHeader = styled.div`
	font-weight: bold;
	font-size: var(--fs-xs);
	text-transform: uppercase;
	color: var(--black25);
	padding: var(--spacing1) 0;
`

const StyledLink = styled(NavLink)`
	display: block;
	padding: var(--spacing1) 0;
	color: var(--gray0);
	&.active {
		color: var(--black0);
	}
`

const ScrollableNavbarContainer = styled.nav`
	display: grid;
	gap: 0;
	overflow: auto;
	width: auto;
	grid-auto-flow: column;

	&::after {
		content: "";
		display: block;
		width: 0;
	}
`

const OuterScrollableNavbarContainer = styled.div`
	background: linear-gradient(to right, rgba(0, 0, 0, 0) 94%, rgba(0, 0, 0, 0.06));
	margin-right: calc(-1 * var(--spacing3));
	margin-left: calc(-1 * var(--spacing3));
`

const NavbarItemContainer = styled(NavLink)`
	color: var(--gray25);
	font-weight: var(--semi-bold);
	font-size: var(--fs-xs);
	text-transform: uppercase;
	text-align: center;
	white-space: nowrap;
	user-select: none;
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	height: 36px;
	padding: 0 var(--spacing4);
	box-sizing: padding-box;
	border-bottom: 1px solid var(--gray75);
	transition: border-color 0.25s linear, border-width 0.25s linear;

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		border-bottom: 3px solid black;
	}
`

const NavbarItem = ({ label, path }) => {
	return <NavbarItemContainer to={path}>{label}</NavbarItemContainer>
}

const ScrollableNavbar = ({ routes }) => {
	return (
		<OuterScrollableNavbarContainer>
			<ScrollableNavbarContainer>
				{routes.map((route) => (
					<NavbarItem {...route} key={route.label} />
				))}
			</ScrollableNavbarContainer>
		</OuterScrollableNavbarContainer>
	)
}

const InfoPage = compose(
	withBreakpoints,
	withRouter
)(({ routes, currentBreakpoint }) => {
	const groupedRoutes = useMemo(() => {
		return routes.reduce((acc, curr, i) => {
			const categoryArr = acc[curr.category] ? [...acc[curr.category], curr] : [curr]
			return { ...acc, [curr.category]: categoryArr }
		}, {})
	}, [routes])

	const isMobile = +currentBreakpoint < 2

	return (
		<PageContainer>
			<Layout>
				{isMobile ? (
					<ScrollableNavbar routes={routes} />
				) : (
					<Sidebar>
						<SidebarHeader>Informacje</SidebarHeader>
						{Object.entries(groupedRoutes).map(([groupName, group]) => (
							<Section key={groupName}>
								<SectionHeader>{groupName}</SectionHeader>
								{group.map((route) =>
									route.hidden ? null : (
										<StyledLink key={route.label} to={route.path}>
											{route.label}
										</StyledLink>
									)
								)}
							</Section>
						))}
					</Sidebar>
				)}
				<Main>
					<Switch>
						{routes.map((route, i) =>
							route.hidden ? null : (
								<Route
									exact
									path={route.path}
									render={() => (
										<>
											<MainHeader>{route.label}</MainHeader>
											<route.component />
										</>
									)}
									key={i}
								/>
							)
						)}
					</Switch>
				</Main>
			</Layout>
		</PageContainer>
	)
})

export default InfoPage
