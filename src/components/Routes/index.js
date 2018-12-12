import React from "react"
import { Route, Switch } from "react-router-dom"

import NewItemPage from "../NewItem"
import SignUpPage from "../SignUp"
import SignInPage from "../SignIn"
import PasswordForgetPage from "../PasswordForget"
import HomePage from "../HomePage"
import AccountPage from "../AccountPage"
import EditItemPage from "../EditItem"
import ItemDetailsPage from "../ItemDetailsPage"
import NotFound from "../NotFound"
import BlogHomePage from "../BlogHome"

import { ROUTES } from "../../constants"

const routes = [
	{
		path: ROUTES.SIGN_UP,
		component: SignUpPage
	},
	{
		path: ROUTES.SIGN_IN,
		component: SignInPage
	},
	{
		path: ROUTES.PASSWORD_FORGET,
		component: PasswordForgetPage
	},
	{
		path: ROUTES.HOME,
		component: HomePage
	},
	{
		path: ROUTES.ACCOUNT,
		component: AccountPage
	},
	{
		path: ROUTES.NEW_ITEM,
		component: NewItemPage
	},
	{
		path: ROUTES.ITEM_DETAILS,
		component: ItemDetailsPage
	},
	{
		path: ROUTES.EDIT_ITEM,
		component: EditItemPage
	},
	{
		path: ROUTES.BLOG_HOME,
		component: BlogHomePage
	}
]

const Routes = () => {
	return (
		<Switch>
			{routes.map((route, i) => (
				<Route
					key={i}
					exact={route.exact === false ? false : true}
					path={route.path}
					component={route.component}
				/>
			))}
			<Route path="*" component={NotFound} />
		</Switch>
	)
}

export default Routes
