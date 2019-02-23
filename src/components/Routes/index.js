import React from "react"
import { Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"
import { Helmet } from "react-helmet"

import { ROUTES, CONST } from "../../constants"

import { LoadableComponentSpinner } from "../LoadingSpinner"

import NotFound from "../NotFound"
import ErrorBoundary from "../ErrorBoundary"

const UserSettings = Loadable({
	loader: () => import("../AccountPage/UserSettings"),
	loading: LoadableComponentSpinner
})
const UserFeedback = Loadable({
	loader: () => import("../AccountPage/UserFeedback"),
	loading: LoadableComponentSpinner
})
const UserItems = Loadable({
	loader: () => import("../AccountPage/UserItems"),
	loading: LoadableComponentSpinner
})
const UserFollowing = Loadable({
	loader: () => import("../AccountPage/UserFollowing"),
	loading: LoadableComponentSpinner
})
const UserLiked = Loadable({
	loader: () => import("../AccountPage/UserLiked"),
	loading: LoadableComponentSpinner
})

const DesignerPage = Loadable({
	loader: () => import("../DesignerPage"),
	loading: LoadableComponentSpinner
})

const BlogPostPage = Loadable({
	loader: () => import("../BlogPost"),
	loading: LoadableComponentSpinner
})

const NewItemPage = Loadable({
	loader: () => import("../NewItem"),
	loading: LoadableComponentSpinner
})

const SignUpPage = Loadable({
	loader: () => import("../SignUp"),
	loading: LoadableComponentSpinner
})

const SignInPage = Loadable({
	loader: () => import("../SignIn"),
	loading: LoadableComponentSpinner
})

const PasswordForgetPage = Loadable({
	loader: () => import("../PasswordForget"),
	loading: LoadableComponentSpinner
})

const HomePage = Loadable({
	loader: () => import("../HomePage"),
	loading: LoadableComponentSpinner
})

const BlogHomePage = Loadable({
	loader: () => import("../BlogHomePage"),
	loading: LoadableComponentSpinner
})

const AccountPage = Loadable({
	loader: () => import("../AccountPage"),
	loading: LoadableComponentSpinner
})

const EditItemPage = Loadable({
	loader: () => import("../EditItem"),
	loading: LoadableComponentSpinner
})

const ItemDetailsPage = Loadable({
	loader: () => import("../ItemDetailsPage"),
	loading: LoadableComponentSpinner
})

const FAQPage = Loadable({
	loader: () => import("../FAQPage"),
	loading: LoadableComponentSpinner
})

const PrivacyPolicyPage = Loadable({
	loader: () => import("../PrivacyPolicyPage"),
	loading: LoadableComponentSpinner
})

const AboutPage = Loadable({
	loader: () => import("../AboutPage"),
	loading: LoadableComponentSpinner
})

const ContactPage = Loadable({
	loader: () => import("../ContactPage"),
	loading: LoadableComponentSpinner
})

const TermsPage = Loadable({
	loader: () => import("../TermsPage"),
	loading: LoadableComponentSpinner
})

const routes = [
	{
		path: ROUTES.DESIGNER,
		component: DesignerPage
	},
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
		path: ROUTES.ACCOUNT_BASE,
		component: AccountPage,
		exact: false,
		routes: {
			items: {
				label: "Przedmioty na sprzedaż",
				path: ROUTES.ACCOUNT_ITEMS,
				component: UserItems
			},
			settings: {
				label: "Opcje / Edytuj profil",
				path: ROUTES.ACCOUNT_SETTINGS,
				component: UserSettings
			},
			feedback: {
				label: "Opinie i komentarze",
				path: ROUTES.ACCOUNT_FEEDBACK,
				component: UserFeedback
			},
			liked: {
				label: "Zapisane przedmioty",
				path: ROUTES.ACCOUNT_LIKED,
				component: UserLiked
			},
			following: {
				label: "Obserwowani użytkownicy",
				path: ROUTES.ACCOUNT_FOLLOWING,
				component: UserFollowing
			}
		}
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
	},
	{
		path: ROUTES.CONTACT,
		component: ContactPage,
		title: "Kontakt"
	},
	{
		path: ROUTES.TERMS,
		component: TermsPage,
		title: "Regulamin"
	}
]

const ErrorComponent = ({ error, errorInfo }) => (
	<div>
		<h2>Wystąpił problem</h2>
		<details style={{ whiteSpace: "pre-wrap" }}>
			{error && error.toString()}
			<br />
			{errorInfo.componentStack}
		</details>
	</div>
)

const Routes = () => {
	return (
		<Switch>
			{routes.map((route, i) => (
				<Route
					key={i}
					exact={route.exact === false ? false : true}
					path={route.path}
					render={(props) => (
						<ErrorBoundary ErrorComponent={ErrorComponent}>
							<route.component {...props} routes={route.routes} />
						</ErrorBoundary>
					)}
				/>
			))}
			<Route path="*" component={NotFound} />
		</Switch>
	)
}

const Meta = () => {
	return (
		<Switch>
			{routes.map((route, i) => (
				<Route
					key={i}
					exact={route.exact === false ? false : true}
					path={route.path}
					render={() =>
						route.title ? (
							<Helmet>
								<title>{`${route.title} | ${CONST.BRAND_NAME}`}</title>
							</Helmet>
						) : (
							<Helmet>
								<title>{CONST.BRAND_NAME}</title>
							</Helmet>
						)
					}
				/>
			))}
		</Switch>
	)
}

export { Routes, Meta }

// import React from "react"
// import { Route, Switch } from "react-router-dom"
// import Loadable from "react-loadable"
// import { Helmet } from "react-helmet"

// import { ROUTES, CONST } from "../../constants"

// import { LoadableComponentSpinner } from "../LoadingSpinner"
// import NotFound from "../NotFound"
// import ErrorBoundary from "../ErrorBoundary"

// const makeLoadable = (modPath) =>
// 	Loadable({
// 		loader: () => import("../" + modPath),
// 		loading: LoadableComponentSpinner,
// 		timeout: 18000
// 	})

// const routes = [
// 	{
// 		path: ROUTES.DESIGNER,
// 		component: makeLoadable("DesignerPage")
// 	},
// 	{
// 		path: ROUTES.BLOG_POST,
// 		component: makeLoadable("BlogPostPage")
// 	},
// 	{
// 		path: ROUTES.SIGN_UP,
// 		component: makeLoadable("SignUp"),
// 		title: `Utwórz konto`
// 	},
// 	{
// 		path: ROUTES.SIGN_IN,
// 		component: makeLoadable("SignIn"),
// 		title: `Zaloguj Się`
// 	},
// 	{
// 		path: ROUTES.PASSWORD_FORGET,
// 		component: makeLoadable("PasswordForgetPage"),
// 		title: `Zresetuj hasło`
// 	},
// 	{
// 		path: ROUTES.HOME,
// 		component: makeLoadable("HomePage")
// 	},

// 	{
// 		path: ROUTES.ACCOUNT_BASE,
// 		component: makeLoadable("AccountPage"),
// 		exact: false,
// 		routes: {
// 			items: {
// 				label: "Przedmioty na sprzedaż",
// 				path: ROUTES.ACCOUNT_ITEMS,
// 				component: makeLoadable("AccountPage/UserItems")
// 			},
// 			settings: {
// 				label: "Opcje / Edytuj profil",
// 				path: ROUTES.ACCOUNT_SETTINGS,
// 				component: makeLoadable("AccountPage/UserSettings")
// 			},
// 			feedback: {
// 				label: "Opinie i komentarze",
// 				path: ROUTES.ACCOUNT_FEEDBACK,
// 				component: makeLoadable("AccountPage/UserFeedback")
// 			},
// 			transactions: {
// 				label: "Historia transakcji",
// 				path: ROUTES.ACCOUNT_TRANSACTIONS,
// 				component: makeLoadable("AccountPage/UserTransactions")
// 			},
// 			liked: {
// 				label: "Zapisane przedmioty",
// 				path: ROUTES.ACCOUNT_LIKED,
// 				component: makeLoadable("AccountPage/UserLiked")
// 			},
// 			following: {
// 				label: "Obserwowani użytkownicy",
// 				path: ROUTES.ACCOUNT_FOLLOWING,
// 				component: makeLoadable("AccountPage/UserFollowing")
// 			}
// 		}
// 	},
// 	{
// 		path: ROUTES.NEW_ITEM,
// 		component: makeLoadable("NewItem"),
// 		title: `Wystaw przedmiot`
// 	},
// 	{
// 		path: ROUTES.ITEM_DETAILS,
// 		component: makeLoadable("ItemDetailsPage")
// 	},
// 	{
// 		path: ROUTES.EDIT_ITEM,
// 		component: makeLoadable("EditItem"),
// 		title: `Edytuj przedmiot`
// 	},
// 	{
// 		path: ROUTES.BLOG_HOME,
// 		component: makeLoadable("BlogHomePage"),
// 		title: `Blog`
// 	},
// 	{
// 		path: ROUTES.FAQ,
// 		component: makeLoadable("FAQPage"),
// 		title: `FAQ`
// 	},
// 	{
// 		path: ROUTES.PRIVACY_POLICY,
// 		component: makeLoadable("PrivacyPolicyPage"),
// 		title: "Polityka Prywatności"
// 	},
// 	{
// 		path: ROUTES.ABOUT,
// 		component: makeLoadable("AboutPage"),
// 		title: "O nas"
// 	},
// 	{
// 		path: ROUTES.CONTACT,
// 		component: makeLoadable("ContactPage"),
// 		title: "Kontakt"
// 	},
// 	{
// 		path: ROUTES.TERMS,
// 		component: makeLoadable("TermsPage"),
// 		title: "Regulamin"
// 	}
// ]

// const ErrorComponent = ({ error, errorInfo }) => (
// 	<div>
// 		<h2>Wystąpił problem</h2>
// 		<details style={{ whiteSpace: "pre-wrap" }}>
// 			{error && error.toString()}
// 			<br />
// 			{errorInfo.componentStack}
// 		</details>
// 	</div>
// )

// const Routes = () => {
// 	return (
// 		<Switch>
// 			{routes.map((route, i) => (
// 				<Route
// 					key={i}
// 					exact={route.exact === false ? false : true}
// 					path={route.path}
// 					render={(props) => (
// 						<ErrorBoundary ErrorComponent={ErrorComponent}>
// 							<route.component {...props} routes={route.routes} />
// 						</ErrorBoundary>
// 					)}
// 				/>
// 			))}
// 			<Route path="*" component={NotFound} />
// 		</Switch>
// 	)
// }

// const Meta = () => {
// 	return (
// 		<Switch>
// 			{routes.map((route, i) => (
// 				<Route
// 					key={i}
// 					exact={route.exact === false ? false : true}
// 					path={route.path}
// 					render={() =>
// 						route.title ? (
// 							<Helmet>
// 								<title>{`${route.title} | ${CONST.BRAND_NAME}`}</title>
// 							</Helmet>
// 						) : (
// 							<Helmet>
// 								<title>{CONST.BRAND_NAME}</title>
// 							</Helmet>
// 						)
// 					}
// 				/>
// 			))}
// 		</Switch>
// 	)
// }

// export { Routes, Meta }
