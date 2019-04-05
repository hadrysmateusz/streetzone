import React from "react"
import { compose } from "recompose"
import { Route, Switch, Link } from "react-router-dom"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"
import { PageContainer } from "../../components/Containers"

const AdminPage = ({ routes }) => {
	return (
		<PageContainer>
			<div>
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
			</div>
			<Switch>
				{routes.map((route) => (
					<Route
						exact
						path={route.path}
						render={() => <route.component />}
						key={route.id}
					/>
				))}
			</Switch>
		</PageContainer>
	)
}

const condition = (authUser) => authUser && authUser.roles.includes("admin")

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(AdminPage)
