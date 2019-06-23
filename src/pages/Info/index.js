import React, { useMemo } from "react"
import { Switch, Route, withRouter, NavLink } from "react-router-dom"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

const Layout = styled.div`
	gap: var(--spacing4);
	display: grid;
	grid-template-columns: minmax(220px, 25%) 1fr;
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

const InfoPage = withRouter(({ routes }) => {
	const groupedRoutes = useMemo(() => {
		return routes.reduce((acc, curr, i) => {
			const categoryArr = acc[curr.category] ? [...acc[curr.category], curr] : [curr]
			return { ...acc, [curr.category]: categoryArr }
		}, {})
	}, [routes])

	return (
		<PageContainer>
			<Layout>
				<Sidebar>
					<SidebarHeader>Informacje</SidebarHeader>
					{Object.entries(groupedRoutes).map(([groupName, group]) => {
						console.log(groupName, group)
						return (
							<Section key={groupName}>
								<SectionHeader>{groupName}</SectionHeader>
								{group.map((route) => (
									<StyledLink key={route.label} to={route.path}>
										{route.label}
									</StyledLink>
								))}
							</Section>
						)
					})}
				</Sidebar>
				<Main>
					<Switch>
						{routes.map((route, i) => (
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
						))}
					</Switch>
				</Main>
			</Layout>
		</PageContainer>
	)
})

export default InfoPage
