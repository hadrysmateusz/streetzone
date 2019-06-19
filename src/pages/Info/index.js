import React from "react"
import { Switch, Route, withRouter } from "react-router-dom"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

const Layout = styled.div`
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

const Sidebar = styled.aside`
	align-self: flex-start;
	border: 1px solid var(--gray75);

	/* mobile */
	@media (max-width: ${(p) => p.theme.breakpoints[3] - 1}px) {
		width: 0;
		margin: 0;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
`

const InfoPage = withRouter(({ routes }) => {
	return (
		<PageContainer>
			<Layout>
				<Sidebar>
					<SidebarHeader>Informacje</SidebarHeader>
				</Sidebar>
				<Main>
					<Switch>
						{routes.map((route, i) => (
							<Route exact path={route.path} render={() => <route.component />} key={i} />
						))}
					</Switch>
				</Main>
			</Layout>
		</PageContainer>
	)
})

export default InfoPage
