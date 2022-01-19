import React from "react"
import { compose } from "recompose"
import { Route, Switch, NavLink } from "react-router-dom"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"

const Nav = styled.nav`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	margin-bottom: var(--spacing3);
`

const NavItem = styled(NavLink)`
	background: var(--black25);
	:hover {
		background: var(--black75);
	}
	text-align: center;
	color: white;
	padding: var(--spacing3);
	font-weight: var(--semi-bold);
	cursor: pointer;
`

const AdminPage = ({ routes }) => {
	return (
		<>
			<PageContainer>
				<Nav>
					{routes.map(
						(route) =>
							route.isNavigable && <NavItem to={route.path}>{route.name}</NavItem>
					)}
				</Nav>
			</PageContainer>
			<Switch>
				{routes.map((route) => {
					return (
						<Route
							exact
							path={route.path}
							render={() => <route.component />}
							key={route.id}
						/>
					)
				})}
			</Switch>
		</>
	)
}

const condition = (authUser) => authUser && authUser.roles.includes("admin")

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(AdminPage)
