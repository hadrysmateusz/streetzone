import React from "react"
import { compose } from "recompose"
import { Route, Switch, Link } from "react-router-dom"
import { PageContainer } from "../../components/Containers"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"

const AdminPage = ({ routes }) => {
	return (
		<>
			<PageContainer>
				<ul>
					{routes.map(
						(route) =>
							route.isNavigable && (
								<li>
									<Link to={route.path}>{route.id}</Link>
								</li>
							)
					)}
				</ul>
			</PageContainer>
			<Switch>
				{routes.map((route) => {
					console.log(route)
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
