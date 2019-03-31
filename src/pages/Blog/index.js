import React from "react"
import { compose } from "recompose"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"

import { withFirebase } from "../../components/Firebase"

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

export default compose(
	withFirebase,
	withRouter
)(Blog)
