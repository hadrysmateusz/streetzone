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
import UserProfile from "./UserProfile"
import VerifyUser from "./VerifyUser"

const Routes = ({ childProps }) => {
	return (
		<Switch>
			{/* Home Page */}
			<AppliedRoute path="/" exact component={Home} props={childProps} />
			<AppliedRoute
				path="/strona/:page"
				exact
				component={Home}
				props={childProps}
			/>

			{/* New Item Page */}
			<AuthenticatedRoute
				path="/nowy"
				exact
				component={NewItem}
				props={childProps}
			/>

			{/* Login Page */}
			<UnauthenticatedRoute
				path="/login"
				exact
				component={Login}
				props={childProps}
			/>

			{/* Register Page */}
			<UnauthenticatedRoute
				path="/rejestracja"
				exact
				component={Signup}
				props={childProps}
			/>

			{/* Account Confirmation Page */}
			<UnauthenticatedRoute
				path="/potwierdzKonto"
				exact
				component={VerifyUser}
				props={childProps}
			/>

			{/* Item Details Page */}
			<AppliedRoute
				path="/i/:partitionKey/:sortKey"
				exact
				component={ItemDetails}
				props={childProps}
			/>

			{/* Edit Item Page */}
			<AppliedRoute
				path="/e/:partitionKey/:sortKey"
				exact
				component={EditItem}
				props={childProps}
			/>

			{/* User Profile Page */}
			<AppliedRoute
				path="/profil/:id"
				exact
				component={UserProfile}
				props={childProps}
			/>

			{/* Page Not Found */}
			<Route component={NotFound} />
		</Switch>
	)
}

export default Routes
