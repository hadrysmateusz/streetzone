import React from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"

const Blog = ({ routes, match }) => {
	return (
		<>
			<Switch>
				{routes.map((route, i) => {
					return (
						<Route exact path={route.path} render={() => <route.component />} key={i} />
					)
				})}
				<Route
					path="*"
					render={() => <Redirect to={routes.find((r) => r.id === "home").path} />}
				/>
			</Switch>
		</>
	)
}

export default withRouter(Blog)
