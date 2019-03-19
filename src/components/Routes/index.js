import React from "react"
import { Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"
import { Helmet } from "react-helmet"

import { ROUTES, CONST } from "../../constants"

import { LoadableComponentSpinner } from "../LoadingSpinner"
import ErrorBoundary from "../ErrorBoundary"

import NotFound from "../../pages/NotFound"

const Home = Loadable({
	loader: () => import("../../pages/Home"),
	loading: LoadableComponentSpinner
})

const BugReport = Loadable({
	loader: () => import("../../pages/BugReport"),
	loading: LoadableComponentSpinner
})

const BumpInfo = Loadable({
	loader: () => import("../../pages/BumpInfo"),
	loading: LoadableComponentSpinner
})

const Admin = Loadable({
	loader: () => import("../../pages/Admin"),
	loading: LoadableComponentSpinner
})

const UserSettings = Loadable({
	loader: () => import("../../pages/Account/UserSettings"),
	loading: LoadableComponentSpinner
})
const UserFeedback = Loadable({
	loader: () => import("../../pages/Account/UserFeedback"),
	loading: LoadableComponentSpinner
})
const UserItems = Loadable({
	loader: () => import("../../pages/Account/UserItems"),
	loading: LoadableComponentSpinner
})
const UserFollowing = Loadable({
	loader: () => import("../../pages/Account/UserFollowing"),
	loading: LoadableComponentSpinner
})
const UserLiked = Loadable({
	loader: () => import("../../pages/Account/UserLiked"),
	loading: LoadableComponentSpinner
})

const Designer = Loadable({
	loader: () => import("../../pages/Designer"),
	loading: LoadableComponentSpinner
})

const BlogPost = Loadable({
	loader: () => import("../../pages/BlogPost"),
	loading: LoadableComponentSpinner
})

const NewItem = Loadable({
	loader: () => import("../../pages/NewItem"),
	loading: LoadableComponentSpinner
})

const SignUp = Loadable({
	loader: () => import("../../pages/SignUp"),
	loading: LoadableComponentSpinner
})

const SignIn = Loadable({
	loader: () => import("../../pages/SignIn"),
	loading: LoadableComponentSpinner
})

const PasswordForget = Loadable({
	loader: () => import("../../pages/PasswordForget"),
	loading: LoadableComponentSpinner
})

const Marketplace = Loadable({
	loader: () => import("../../pages/Marketplace"),
	loading: LoadableComponentSpinner
})

const BlogHome = Loadable({
	loader: () => import("../../pages/BlogHome"),
	loading: LoadableComponentSpinner
})

const Account = Loadable({
	loader: () => import("../../pages/Account"),
	loading: LoadableComponentSpinner
})

const EditItem = Loadable({
	loader: () => import("../../pages/EditItem"),
	loading: LoadableComponentSpinner
})

const ItemDetails = Loadable({
	loader: () => import("../../pages/ItemDetails"),
	loading: LoadableComponentSpinner
})

const FAQ = Loadable({
	loader: () => import("../../pages/FAQ"),
	loading: LoadableComponentSpinner
})

const PrivacyPolicy = Loadable({
	loader: () => import("../../pages/PrivacyPolicy"),
	loading: LoadableComponentSpinner
})

const About = Loadable({
	loader: () => import("../../pages/About"),
	loading: LoadableComponentSpinner
})

const Contact = Loadable({
	loader: () => import("../../pages/Contact"),
	loading: LoadableComponentSpinner
})

const Terms = Loadable({
	loader: () => import("../../pages/Terms"),
	loading: LoadableComponentSpinner
})

const routes = [
	{
		path: ROUTES.ADMIN,
		component: Admin
	},
	{
		path: ROUTES.DESIGNER,
		component: Designer
	},
	{
		path: ROUTES.BLOG_POST,
		component: BlogPost
	},
	{
		path: ROUTES.SIGN_UP,
		component: SignUp,
		title: `Utwórz konto`
	},
	{
		path: ROUTES.SIGN_IN,
		component: SignIn,
		title: `Zaloguj Się`
	},
	{
		path: ROUTES.PASSWORD_FORGET,
		component: PasswordForget,
		title: `Zresetuj hasło`
	},
	{
		path: ROUTES.MARKETPLACE,
		component: Marketplace
	},
	{
		path: ROUTES.ACCOUNT_BASE,
		component: Account,
		exact: false,
		routes: [
			{
				id: "items",
				label: "Oferty",
				path: ROUTES.ACCOUNT_ITEMS,
				component: UserItems,
				isProtected: false
			},
			{
				id: "feedback",
				label: "Opinie",
				path: ROUTES.ACCOUNT_FEEDBACK,
				component: UserFeedback,
				isProtected: false
			},
			{
				id: "savedItems",
				label: "Zapisane",
				path: ROUTES.ACCOUNT_LIKED,
				component: UserLiked,
				isProtected: true
			},
			{
				id: "followedUsers",
				label: "Obserwowani",
				path: ROUTES.ACCOUNT_FOLLOWING,
				component: UserFollowing,
				isProtected: true
			},
			{
				id: "settings",
				label: "Opcje / Edytuj profil",
				path: ROUTES.ACCOUNT_SETTINGS,
				component: UserSettings,
				isProtected: true
			}
		]
	},
	{
		path: ROUTES.NEW_ITEM,
		component: NewItem,
		title: `Wystaw przedmiot`
	},
	{
		path: ROUTES.HOME,
		component: Home
	},
	{
		path: ROUTES.ITEM_DETAILS,
		component: ItemDetails
	},
	{
		path: ROUTES.EDIT_ITEM,
		component: EditItem,
		title: `Edytuj przedmiot`
	},
	{
		path: ROUTES.BLOG_HOME,
		component: BlogHome,
		title: `Blog`
	},
	{
		path: ROUTES.FAQ,
		component: FAQ,
		title: `FAQ`
	},
	{
		path: ROUTES.PRIVACY_POLICY,
		component: PrivacyPolicy,
		title: "Polityka Prywatności"
	},
	{
		path: ROUTES.ABOUT,
		component: About,
		title: "O nas"
	},
	{
		path: ROUTES.CONTACT,
		component: Contact,
		title: "Kontakt"
	},
	{
		path: ROUTES.TERMS,
		component: Terms,
		title: "Regulamin"
	},
	{
		path: ROUTES.BUMP_INFO,
		component: BumpInfo,
		title: "Promowanie"
	},
	{
		path: ROUTES.BUG_REPORT,
		component: BugReport,
		title: "Zgłoś problem"
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
