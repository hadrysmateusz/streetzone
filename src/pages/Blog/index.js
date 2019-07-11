import React from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import route from "../../utils/route"

const Blog = ({ routes }) => {
	return (
			<Switch>
				{routes.map((route, i) => {
					return <Route path={route.path} render={() => <route.component />} key={i} />
				})}
				<Route path="*" render={() => <Redirect to={route("BLOG_HOME")} />} />
			</Switch>
	)
}

export default withRouter(Blog)
