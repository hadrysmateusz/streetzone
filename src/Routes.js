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
import ItemDetails from "./ItemDetails"
import EditItem from "./EditItem"
import Test from "./Test"

const Routes = ({ childProps }) => {
	return (
		<Switch>
			<AppliedRoute path="/" exact component={Home} props={childProps} />
			<AuthenticatedRoute
				path="/nowy"
				exact
				component={NewItem}
				props={childProps}
			/>
			<AuthenticatedRoute
				path="/test/:id"
				exact
				component={Test}
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
			<AppliedRoute
				path="/i/:id"
				exact
				component={ItemDetails}
				props={childProps}
			/>
			<AppliedRoute
				path="/e/:id"
				exact
				component={EditItem}
				props={childProps}
			/>
			<Route component={NotFound} />
		</Switch>
	)
}

export default Routes
