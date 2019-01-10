import React from "react"
import { Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"
import { Helmet } from "react-helmet"

import { ROUTES, CONST } from "../../constants"

import LoadingSpinner from "../LoadingSpinner"
import NotFound from "../NotFound"

const BlogPostPage = Loadable({
	loader: () => import("../BlogPost"),
	loading: LoadingSpinner
})

const NewItemPage = Loadable({
	loader: () => import("../NewItem"),
	loading: LoadingSpinner
})

const SignUpPage = Loadable({
	loader: () => import("../SignUp"),
	loading: LoadingSpinner
})

const SignInPage = Loadable({
	loader: () => import("../SignIn"),
	loading: LoadingSpinner
})

const PasswordForgetPage = Loadable({
	loader: () => import("../PasswordForget"),
	loading: LoadingSpinner
})

const HomePage = Loadable({
	loader: () => import("../HomePage"),
	loading: LoadingSpinner
})

const AccountPage = Loadable({
	loader: () => import("../AccountPage"),
	loading: LoadingSpinner
})

const EditItemPage = Loadable({
	loader: () => import("../EditItem"),
	loading: LoadingSpinner
})

const ItemDetailsPage = Loadable({
	loader: () => import("../ItemDetailsPage"),
	loading: LoadingSpinner
})

const BlogHomePage = Loadable({
	loader: () => import("../BlogHome"),
	loading: LoadingSpinner
})

const FAQPage = Loadable({
	loader: () => import("../FAQPage"),
	loading: LoadingSpinner
})

const PrivacyPolicyPage = Loadable({
	loader: () => import("../PrivacyPolicyPage"),
	loading: LoadingSpinner
})

const AboutPage = Loadable({
	loader: () => import("../AboutPage"),
	loading: LoadingSpinner
})

const routes = [
	{
		path: ROUTES.BLOG_POST,
		component: BlogPostPage
	},
	{
		path: ROUTES.SIGN_UP,
		component: SignUpPage,
		title: `Utwórz konto`
	},
	{
		path: ROUTES.SIGN_IN,
		component: SignInPage,
		title: `Zaloguj Się`
	},
	{
		path: ROUTES.PASSWORD_FORGET,
		component: PasswordForgetPage,
		title: `Zresetuj hasło`
	},
	{
		path: ROUTES.HOME,
		component: HomePage
	},
	{
		path: ROUTES.ACCOUNT,
		component: AccountPage,
		exact: false
	},
	{
		path: ROUTES.NEW_ITEM,
		component: NewItemPage,
		title: `Wystaw przedmiot`
	},
	{
		path: ROUTES.ITEM_DETAILS,
		component: ItemDetailsPage
	},
	{
		path: ROUTES.EDIT_ITEM,
		component: EditItemPage,
		title: `Edytuj przedmiot`
	},
	{
		path: ROUTES.BLOG_HOME,
		component: BlogHomePage,
		title: `Blog`
	},
	{
		path: ROUTES.FAQ,
		component: FAQPage,
		title: `FAQ`
	},
	{
		path: ROUTES.PRIVACY_POLICY,
		component: PrivacyPolicyPage,
		title: "Polityka Prywatności"
	},
	{
		path: ROUTES.ABOUT,
		component: AboutPage,
		title: "O nas"
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
					render={(props) => (
						<>
							{route.title && (
								<Helmet>
									<title>{`${route.title} - ${CONST.BRAND_NAME}`}</title>
								</Helmet>
							)}
							<route.component {...props} />
						</>
					)}
				/>
			))}
			<Route path="*" component={NotFound} />
		</Switch>
	)
}

export default Routes
