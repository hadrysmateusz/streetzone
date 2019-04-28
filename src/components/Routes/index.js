import React, { useEffect } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import Loadable from "react-loadable"
import { Helmet } from "react-helmet"

import { ROUTES, CONST } from "../../constants"

import { LoadableComponentSpinner } from "../LoadingSpinner"
import ErrorBoundary from "../ErrorBoundary"

import NotFound from "../../pages/NotFound"
import { PageContainer } from "../Containers"

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

const UserItems = Loadable({
	loader: () => import("../../pages/Account/UserItems"),
	loading: LoadableComponentSpinner
})
const UserLiked = Loadable({
	loader: () => import("../../pages/Account/UserLiked"),
	loading: LoadableComponentSpinner
})
const UserSavedFilters = Loadable({
	loader: () => import("../../pages/Account/UserSavedFilters"),
	loading: LoadableComponentSpinner
})
const UserFollowing = Loadable({
	loader: () => import("../../pages/Account/UserFollowing"),
	loading: LoadableComponentSpinner
})
const UserSavedDrops = Loadable({
	loader: () => import("../../pages/Account/UserSavedDrops"),
	loading: LoadableComponentSpinner
})
const UserFeedback = Loadable({
	loader: () => import("../../pages/Account/UserFeedback"),
	loading: LoadableComponentSpinner
})
const UserSettings = Loadable({
	loader: () => import("../../pages/Account/UserSettings"),
	loading: LoadableComponentSpinner
})
const UserChat = Loadable({
	loader: () => import("../../pages/Account/UserChat"),
	loading: LoadableComponentSpinner
})

const Designer = Loadable({
	loader: () => import("../../pages/Designer"),
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

const RequestDesigner = Loadable({
	loader: () => import("../../pages/RequestDesigner"),
	loading: LoadableComponentSpinner
})

const Designers = Loadable({
	loader: () => import("../../pages/Designers"),
	loading: LoadableComponentSpinner
})

const BlogHome = Loadable({
	loader: () => import("../../pages/Blog/HomePage/Home"),
	loading: LoadableComponentSpinner
})

const BlogSection = Loadable({
	loader: () => import("../../pages/Blog/HomePage/Section"),
	loading: LoadableComponentSpinner
})

const BlogBase = Loadable({
	loader: () => import("../../pages/Blog/"),
	loading: LoadableComponentSpinner
})

const BlogPost = Loadable({
	loader: () => import("../../pages/Blog/PostPage"),
	loading: LoadableComponentSpinner
})

const BlogTag = Loadable({
	loader: () => import("../../pages/Blog/HomePage/Tag"),
	loading: LoadableComponentSpinner
})

const Admin = Loadable({
	loader: () => import("../../pages/Admin"),
	loading: LoadableComponentSpinner
})

const AdminBlog = Loadable({
	loader: () => import("../../pages/Admin/Blog"),
	loading: LoadableComponentSpinner
})

const AdminBlogEditPost = Loadable({
	loader: () => import("../../pages/Admin/Blog/Edit/EditPost"),
	loading: LoadableComponentSpinner
})

const AdminBlogEditDrop = Loadable({
	loader: () => import("../../pages/Admin/Blog/Edit/EditDrop"),
	loading: LoadableComponentSpinner
})

const AdminBlogAddPost = Loadable({
	loader: () => import("../../pages/Admin/Blog/Add/AddPost"),
	loading: LoadableComponentSpinner
})

const AdminBlogAddDrop = Loadable({
	loader: () => import("../../pages/Admin/Blog/Add/AddDrop"),
	loading: LoadableComponentSpinner
})

const AdminDesigners = Loadable({
	loader: () => import("../../pages/Admin/Designers"),
	loading: LoadableComponentSpinner
})

const AdminDesignerEdit = Loadable({
	loader: () => import("../../pages/Admin/DesignerEdit"),
	loading: LoadableComponentSpinner
})

const AdminItems = Loadable({
	loader: () => import("../../pages/Admin/Items"),
	loading: LoadableComponentSpinner
})

const AdminUsers = Loadable({
	loader: () => import("../../pages/Admin/Users"),
	loading: LoadableComponentSpinner
})

const ChatNew = Loadable({
	loader: () => import("../../pages/Chat/New"),
	loading: LoadableComponentSpinner
})

const routes = [
	{
		path: ROUTES.CHAT_NEW,
		component: ChatNew
	},
	{
		path: ROUTES.ADMIN_BASE,
		component: Admin,
		exact: false,
		routes: [
			{
				id: "blog",
				path: ROUTES.ADMIN_BLOG,
				component: AdminBlog,
				isNavigable: true
			},
			{
				id: "blogEditPost",
				path: ROUTES.ADMIN_BLOG_EDIT_POST,
				component: AdminBlogEditPost,
				isNavigable: false
			},
			{
				id: "blogEditDrop",
				path: ROUTES.ADMIN_BLOG_EDIT_DROP,
				component: AdminBlogEditDrop,
				isNavigable: false
			},
			{
				id: "blogAddPost",
				path: ROUTES.ADMIN_BLOG_ADD_POST,
				component: AdminBlogAddPost,
				isNavigable: false
			},
			{
				id: "blogAddDrop",
				path: ROUTES.ADMIN_BLOG_ADD_DROP,
				component: AdminBlogAddDrop,
				isNavigable: false
			},
			{
				id: "items",
				path: ROUTES.ADMIN_ITEMS,
				component: AdminItems,
				isNavigable: true
			},
			{
				id: "users",
				path: ROUTES.ADMIN_USERS,
				component: AdminUsers,
				isNavigable: true
			},
			{
				id: "designers",
				path: ROUTES.ADMIN_DESIGNERS,
				component: AdminDesigners,
				isNavigable: true
			},
			{
				id: "designerEdit",
				path: ROUTES.ADMIN_DESIGNER_EDIT,
				component: AdminDesignerEdit,
				isNavigable: false
			}
		]
	},
	{
		path: ROUTES.BLOG_BASE,
		component: BlogBase,
		exact: false,
		routes: [
			{
				id: "home",
				path: ROUTES.BLOG_HOME,
				component: BlogHome
			},
			{
				id: "section",
				path: ROUTES.BLOG_SECTION,
				component: BlogSection
			},
			{
				id: "tag",
				path: ROUTES.BLOG_TAG,
				component: BlogTag
			},
			{
				id: "post",
				path: ROUTES.BLOG_POST,
				component: BlogPost
			}
		],
		title: "Blog"
	},
	{
		path: ROUTES.DESIGNERS,
		component: Designers
	},
	{
		path: ROUTES.REQUEST_DESIGNER,
		component: RequestDesigner
	},
	{
		path: ROUTES.DESIGNER,
		component: Designer
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
				isProtected: false,
				isDefault: true
			},
			{
				id: "chat",
				label: "Wiadomości",
				path: ROUTES.ACCOUNT_CHAT,
				component: UserChat,
				isProtected: true
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
				label: "Zapisane Przedmioty",
				path: ROUTES.ACCOUNT_SAVED_ITEMS,
				component: UserLiked,
				isProtected: true,
				category: "Zapisane",
				shortLabel: "Przedmioty"
			},
			{
				id: "savedFilters",
				label: "Zapisane Filtry",
				path: ROUTES.ACCOUNT_SAVED_FILTERS,
				component: UserSavedFilters,
				isProtected: true,
				category: "Zapisane",
				shortLabel: "Filtry",
				isHidden: true /* This feature isn't finished or necessary */
			},
			{
				id: "followedUsers",
				label: "Obserwowani Użytkownicy",
				path: ROUTES.ACCOUNT_SAVED_USERS,
				component: UserFollowing,
				isProtected: true,
				category: "Zapisane",
				shortLabel: "Użytkownicy"
			},
			{
				id: "followedDrops",
				label: "Obserwowane Dropy",
				path: ROUTES.ACCOUNT_SAVED_DROPS,
				component: UserSavedDrops,
				isProtected: true,
				category: "Zapisane",
				shortLabel: "Dropy"
			},
			{
				id: "settings",
				label: "Opcje / Edytuj profil",
				path: ROUTES.ACCOUNT_SETTINGS,
				component: UserSettings,
				isProtected: true,
				isHidden: true
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
	<PageContainer>
		<h2>Wystąpił problem</h2>
		<p>Odśwież stronę lub spróbuj ponownie później</p>
	</PageContainer>
)

const ScrollToTop = withRouter(({ children, shouldScroll, location }) => {
	// scroll to top on location
	useEffect(() => {
		// don't scroll if the route explicitly says not to
		if (!shouldScroll) return

		window.scrollTo(0, 0)
	}, [location.pathname])

	return children
})

const Routes = () => {
	return (
		<Switch>
			{routes.map((route, i) => (
				<Route
					key={i}
					exact={route.exact === false ? false : true}
					path={route.path}
					render={(props) => (
						<ScrollToTop shouldScroll={route.scrollToTop !== false}>
							<ErrorBoundary ErrorComponent={ErrorComponent}>
								<route.component {...props} routes={route.routes} />
							</ErrorBoundary>
						</ScrollToTop>
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
					render={() => {
						return route.title ? (
							<Helmet>
								<title>{`${route.title} | ${CONST.BRAND_NAME}`}</title>
							</Helmet>
						) : (
							<Helmet>
								<title>{CONST.BRAND_NAME}</title>
							</Helmet>
						)
					}}
				/>
			))}
		</Switch>
	)
}

export { Routes, Meta }
