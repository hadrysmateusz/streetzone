import React from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import route from "../../utils/route"
import { MainPageContainer } from "../../components/Containers"

const Blog = ({ routes, location, match }) => {
	return (
		<MainPageContainer>
			<Switch>
				{routes.map((route, i) => {
					return <Route path={route.path} render={() => <route.component />} key={i} />
				})}
				<Route path="*" render={() => <Redirect to={route("BLOG_HOME")} />} />
			</Switch>
		</MainPageContainer>
	)
}

export default withRouter(Blog)
