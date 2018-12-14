import React from "react"
import { Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"

import { ROUTES } from "../../constants"

// TODO: create a proper loader component for Loadable
import LoadingSpinner from "../LoadingSpinner"
import NotFound from "../NotFound"
// import HomePage from "../HomePage"

const AsyncNewItemPage = Loadable({
	loader: () => import("../NewItem"),
	loading: () => <LoadingSpinner />
})

const SignUpPage = Loadable({
	loader: () => import("../SignUp"),
	loading: () => <LoadingSpinner />
})

const SignInPage = Loadable({
	loader: () => import("../SignIn"),
	loading: () => <LoadingSpinner />
})

const PasswordForgetPage = Loadable({
	loader: () => import("../PasswordForget"),
	loading: () => <LoadingSpinner />
})

const HomePage = Loadable({
	loader: () => import("../HomePage"),
	loading: () => <LoadingSpinner />
})

const AccountPage = Loadable({
	loader: () => import("../AccountPage"),
	loading: () => <LoadingSpinner />
})

const EditItemPage = Loadable({
	loader: () => import("../EditItem"),
	loading: () => <LoadingSpinner />
})

const ItemDetailsPage = Loadable({
	loader: () => import("../ItemDetailsPage"),
	loading: () => <LoadingSpinner />
})

const BlogHomePage = Loadable({
	loader: () => import("../BlogHome"),
	loading: () => <LoadingSpinner />
})

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
		component: AsyncNewItemPage
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
			{routes.map((route, i) => {
				console.log(route)
				return (
					<Route
						key={i}
						exact={route.exact === false ? false : true}
						path={route.path}
						component={route.component}
					/>
				)
			})}
			<Route path="*" component={NotFound} />
		</Switch>
	)
}

export default Routes
