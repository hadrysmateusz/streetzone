import React, { useEffect } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import Loadable from "react-loadable"
import { Helmet } from "react-helmet"

import { ROUTES, CONST } from "../../constants"

import { LoadableComponentSpinner } from "../LoadingSpinner"
import ErrorBoundary from "../ErrorBoundary"

import NotFound from "../../pages/NotFound"
import { PageContainer, MainPageContainer } from "../Containers"

// ===== HOME PAGE =====
const Home = Loadable({
	loader: () => import("../../pages/Home"),
	loading: LoadableComponentSpinner
})

// ===== AUTH FLOW =====
const SignUp = Loadable({
	loader: () => import("../../pages/Auth/SignUp"),
	loading: LoadableComponentSpinner
})
const SignIn = Loadable({
	loader: () => import("../../pages/Auth/SignIn"),
	loading: LoadableComponentSpinner
})
const PasswordForget = Loadable({
	loader: () => import("../../pages/Auth/PasswordForget"),
	loading: LoadableComponentSpinner
})

// ===== ACCOUNT ======
const Account = Loadable({
	loader: () => import("../../pages/Account"),
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

// ===== MARKETPLACE =====
const Marketplace = Loadable({
	loader: () => import("../../pages/Marketplace"),
	loading: LoadableComponentSpinner
})
const Designers = Loadable({
	loader: () => import("../../pages/Designers"),
	loading: LoadableComponentSpinner
})
const ItemDetails = Loadable({
	loader: () => import("../../pages/ItemDetails"),
	loading: LoadableComponentSpinner
})
const EditItem = Loadable({
	loader: () => import("../../pages/EditItem"),
	loading: LoadableComponentSpinner
})
const NewItem = Loadable({
	loader: () => import("../../pages/NewItem"),
	loading: LoadableComponentSpinner
})
const ItemPromote = Loadable({
	loader: () => import("../../pages/ItemPromote"),
	loading: LoadableComponentSpinner
})
const ItemPromoteAfter = Loadable({
	loader: () => import("../../pages/ItemPromoteAfter"),
	loading: LoadableComponentSpinner
})

// ===== BLOG =====
const BlogBase = Loadable({
	loader: () => import("../../pages/Blog"),
	loading: LoadableComponentSpinner
})
const BlogPost = Loadable({
	loader: () => import("../../pages/Blog/PostPage"),
	loading: LoadableComponentSpinner
})
const BlogHome = Loadable({
	loader: () => import("../../pages/Blog/HomePage"),
	loading: LoadableComponentSpinner
})

const BlogTag = Loadable({
	loader: () => import("../../pages/Blog/TagPage"),
	loading: LoadableComponentSpinner
})
const BlogCategory = Loadable({
	loader: () => import("../../pages/Blog/CategoryPage"),
	loading: LoadableComponentSpinner
})

// ===== DROPS =====
const BlogDrop = Loadable({
	loader: () => import("../../pages/Drops/DropPage"),
	loading: LoadableComponentSpinner
})
const Drops = Loadable({
	loader: () => import("../../pages/Drops/DropsPage"),
	loading: LoadableComponentSpinner
})

// ===== ADMIN =====
const Admin = Loadable({
	loader: () => import("../../pages/Admin"),
	loading: LoadableComponentSpinner
})

const AdminBlog = Loadable({
	loader: () => import("../../pages/Admin/Blog"),
	loading: LoadableComponentSpinner
})
const AdminBlogEditPost = Loadable({
	loader: () => import("../../pages/Admin/Blog/Edit"),
	loading: LoadableComponentSpinner
})
const AdminBlogAddPost = Loadable({
	loader: () => import("../../pages/Admin/Blog/Add"),
	loading: LoadableComponentSpinner
})

const AdminDrops = Loadable({
	loader: () => import("../../pages/Admin/Drops"),
	loading: LoadableComponentSpinner
})
const AdminEditDrop = Loadable({
	loader: () => import("../../pages/Admin/Drops/Edit"),
	loading: LoadableComponentSpinner
})
const AdminAddDrop = Loadable({
	loader: () => import("../../pages/Admin/Drops/Add"),
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

// ===== MISC =====
const ChatNew = Loadable({
	loader: () => import("../../pages/Chat/New"),
	loading: LoadableComponentSpinner
})
const Chat = Loadable({
	loader: () => import("../../pages/Chat"),
	loading: LoadableComponentSpinner
})
const ChatRoom = Loadable({
	loader: () => import("../../pages/Chat"),
	loading: LoadableComponentSpinner
})
const Search = Loadable({
	loader: () => import("../../pages/Search"),
	loading: LoadableComponentSpinner
})
const RequestDesigner = Loadable({
	loader: () => import("../../pages/RequestDesigner"),
	loading: LoadableComponentSpinner
})

// ===== INFO ======
const Info = Loadable({
	loader: () => import("../../pages/Info"),
	loading: LoadableComponentSpinner
})
const About = Loadable({
	loader: () => import("../../pages/Info/About"),
	loading: LoadableComponentSpinner
})
const Contact = Loadable({
	loader: () => import("../../pages/Info/Contact"),
	loading: LoadableComponentSpinner
})
const FAQ = Loadable({
	loader: () => import("../../pages/Info/FAQ"),
	loading: LoadableComponentSpinner
})
const PromotingInfo = Loadable({
	loader: () => import("../../pages/Info/PromotingInfo"),
	loading: LoadableComponentSpinner
})
const AllowAds = Loadable({
	loader: () => import("../../pages/Info/AllowAds"),
	loading: LoadableComponentSpinner
})
const AllowNotifications = Loadable({
	loader: () => import("../../pages/Info/AllowNotifications"),
	loading: LoadableComponentSpinner
})
const BugReport = Loadable({
	loader: () => import("../../pages/Info/BugReport"),
	loading: LoadableComponentSpinner
})
const Advertise = Loadable({
	loader: () => import("../../pages/Info/Advertise"),
	loading: LoadableComponentSpinner
})
const Partners = Loadable({
	loader: () => import("../../pages/Info/Partners"),
	loading: LoadableComponentSpinner
})
const WriteForUs = Loadable({
	loader: () => import("../../pages/Info/WriteForUs"),
	loading: LoadableComponentSpinner
})
const Terms = Loadable({
	loader: () => import("../../pages/Info/Terms"),
	loading: LoadableComponentSpinner
})
const PrivacyPolicy = Loadable({
	loader: () => import("../../pages/Info/PrivacyPolicy"),
	loading: LoadableComponentSpinner
})

// ===== ACCOUNT ROUTES CONFIG =====
export const ACCOUNT_ROUTES = [
	{
		id: "items",
		label: "Przedmioty",
		path: ROUTES.ACCOUNT_ITEMS,
		component: UserItems,
		isProtected: false,
		isDefault: true
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
		id: "followedDrops",
		label: "Obserwowane Dropy",
		path: ROUTES.ACCOUNT_SAVED_DROPS,
		component: UserSavedDrops,
		isProtected: true,
		category: "Zapisane",
		shortLabel: "Dropy"
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
		id: "feedback",
		label: "Opinie",
		path: ROUTES.ACCOUNT_FEEDBACK,
		component: UserFeedback,
		isProtected: false
	},
	{
		id: "settings",
		label: "Opcje / Edytuj profil",
		path: ROUTES.ACCOUNT_SETTINGS,
		component: UserSettings,
		isProtected: true,
		isHidden: false,
		isHiddenOnMobile: true
	}
]

// ===== CONFIG OBJECT =====
const routes = [
	{
		path: ROUTES.CHAT_NEW,
		component: ChatNew
	},
	{
		path: ROUTES.CHAT,
		component: Chat
	},
	{
		path: ROUTES.CHAT_ROOM,
		component: ChatRoom
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
				path: ROUTES.ADMIN_BLOG_EDIT,
				component: AdminBlogEditPost,
				isNavigable: false
			},
			{
				id: "blogAddPost",
				path: ROUTES.ADMIN_BLOG_ADD,
				component: AdminBlogAddPost,
				isNavigable: false
			},
			{
				id: "drops",
				path: ROUTES.ADMIN_DROPS,
				component: AdminDrops,
				isNavigable: true
			},
			{
				id: "edit_drop",
				path: ROUTES.ADMIN_DROPS_EDIT,
				component: AdminEditDrop,
				isNavigable: false
			},
			{
				id: "add_drop",
				path: ROUTES.ADMIN_DROPS_ADD,
				component: AdminAddDrop,
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
		title: "Blog",
		routes: [
			{
				id: "home",
				path: ROUTES.BLOG_HOME,
				component: BlogHome
			},
			{
				id: "post",
				path: ROUTES.BLOG_POST,
				component: BlogPost
			},
			{
				id: "tag",
				path: ROUTES.BLOG_TAG,
				component: BlogTag
			},
			{
				id: "category",
				path: ROUTES.BLOG_CATEGORY,
				component: BlogCategory
			}
		]
	},
	{
		path: ROUTES.DROPS,
		component: Drops
	},
	{
		path: ROUTES.DROPS_SECTION,
		component: Drops
	},
	{
		id: "drop",
		path: ROUTES.DROP_DETAILS,
		component: BlogDrop
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
		path: ROUTES.SEARCH,
		component: Search
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
		routes: ACCOUNT_ROUTES
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
		path: ROUTES.ITEM_PROMOTE,
		component: ItemPromote,
		title: `Promuj przedmiot`
	},
	{
		path: ROUTES.ITEM_PROMOTE_AFTER,
		component: ItemPromoteAfter
	},
	{
		path: ROUTES.INFO_BASE,
		exact: false,
		component: Info,
		routes: [
			{
				path: ROUTES.ABOUT,
				component: About,
				title: "O nas",
				label: "O nas",
				category: "Info"
			},
			{
				path: ROUTES.CONTACT,
				component: Contact,
				title: "Kontakt",
				label: "Kontakt",
				category: "Info"
			},
			{
				path: ROUTES.FAQ,
				component: FAQ,
				title: `FAQ`,
				label: `FAQ`,
				category: "Pomoc"
			},
			{
				path: ROUTES.PROMOTING_INFO,
				component: PromotingInfo,
				title: `Promowanie i odświeżanie`,
				label: `Promowanie i odświeżanie`,
				category: "Pomoc"
			},
			{
				path: ROUTES.ALLOW_ADS,
				component: AllowAds,
				title: `Zezwól na reklamy`,
				label: `Zezwól na reklamy`,
				category: "Pomoc"
			},
			{
				path: ROUTES.ALLOW_NOTIFICATIONS,
				component: AllowNotifications,
				title: `Włącz powiadomienia`,
				label: `Włącz powiadomienia`,
				category: "Pomoc"
			},
			{
				path: ROUTES.BUG_REPORT,
				component: BugReport,
				title: "Zgłoś problem",
				label: "Zgłoś problem",
				category: "Pomoc"
			},
			{
				path: ROUTES.ADVERTISE,
				component: Advertise,
				title: "Reklamuj się",
				label: "Reklamuj się",
				category: "Współpraca"
			},
			{
				path: ROUTES.PARTNERS,
				component: Partners,
				title: "Partnerzy",
				label: "Partnerzy",
				category: "Współpraca"
			},
			{
				path: ROUTES.WRITE_FOR_US,
				component: WriteForUs,
				title: "Pisz dla nas",
				label: "Pisz dla nas",
				category: "Współpraca"
			},
			{
				path: ROUTES.TERMS,
				component: Terms,
				title: "Regulamin",
				label: "Regulamin",
				category: "Prawne"
			},
			{
				path: ROUTES.PRIVACY_POLICY,
				component: PrivacyPolicy,
				title: "Polityka Prywatności",
				label: "Polityka Prywatności",
				category: "Prawne"
			}
		]
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
						<MainPageContainer>
							<ScrollToTop shouldScroll={route.scrollToTop !== false}>
								<ErrorBoundary ErrorComponent={ErrorComponent}>
									<route.component {...props} routes={route.routes} />
								</ErrorBoundary>
							</ScrollToTop>
						</MainPageContainer>
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
