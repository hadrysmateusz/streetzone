import React from "react"
import { Route, Switch } from "react-router-dom"

import AuthenticatedRoute from "./AuthenticatedRoute"
import UnauthenticatedRoute from "./UnauthenticatedRoute"
import AppliedRoute from "./AppliedRoute"

import Login from "./Login"
import Signup from "./Signup"
import NotFound from "./NotFound"
import Home from "./Home"
import NewItem from "./NewItem"

export default ({ childProps }) => {
	return (
		<Switch>
			<AppliedRoute path="/" exact component={Home} props={childProps} />
			<AuthenticatedRoute
				path="/nowy"
				exact
				component={NewItem}
				props={childProps}
			/>
			<UnauthenticatedRoute
				path="/login"
				exact
				component={Login}
				props={childProps}
			/>
			<UnauthenticatedRoute
				path="/signup"
				exact
				component={Signup}
				props={childProps}
			/>
			<Route component={NotFound} />
		</Switch>
	)
}
