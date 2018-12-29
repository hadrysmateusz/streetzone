import React, { Component } from "react"
import { compose } from "recompose"
import styled from "styled-components"
import { NavLink, Route } from "react-router-dom"

import { withFirebase } from "../Firebase"
import { withAuthorization, withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { Separator } from "../Basics"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import { CSS, EMPTY_STATES, ROUTES } from "../../constants"
import { BREAKPOINTS, ITEM_STATUS } from "../../constants/const"
import ItemsView from "../ItemsView"
import EmptyState from "../EmptyState"

const UserSettings = ({ onAvatarSubmit, authUser }) => (
	<div>
		<Separator text="Zdjęcie profilowe" />
		<AvatarChangeForm onSubmit={onAvatarSubmit} />
		<LoginManagement authUser={authUser} />
	</div>
)

const UserFeedback = ({ feedback }) => (
	<div>
		{feedback && feedback.length > 0 ? (
			<h3>Opinie</h3>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoFeedback} />
		)}
	</div>
)

const UserTransactions = ({ soldItems }) => (
	<div>
		{soldItems && soldItems.length > 0 ? (
			<>
				<h3>Sprzedane przedmioty</h3>
				<ItemsView items={soldItems} />
			</>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoSoldItems} />
		)}
	</div>
)

const ProfilePicture = styled.div`
	width: ${(p) => p.size};
	height: ${(p) => p.size};
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: ${(p) => `url(${p.url})`};
`

const MainGrid = styled.div`
	height: 100%;
	display: grid;
	margin: 0 auto;
	grid-gap: 20px;
	padding: 0 20px;
	grid-template-areas:
		"info"
		"tabs-nav"
		"tabs-content";
	grid-template-columns: 1fr;
	grid-template-rows: min-content min-content 1fr;

	@media (min-width: ${BREAKPOINTS[2]}px) {
		max-width: 860px;
		grid-template-columns: min-content 1fr;
		grid-template-rows: min-content 1fr;
		grid-template-areas:
			"info info"
			"tabs-nav tabs-content";
	}
	@media (min-width: ${BREAKPOINTS[3]}px) {
		max-width: ${BREAKPOINTS[3]}px;
	}
	@media (min-width: ${BREAKPOINTS[5]}px) {
		max-width: ${BREAKPOINTS[5]}px;
	}
`

const MainInfoContainer = styled.div`
	grid-area: info;
	display: grid;
	grid-template-columns: 120px 1fr;
	grid-template-rows: 120px;
`

const TabsContentContainer = styled.div`
	grid-area: tabs-content;
`

const TabsNav = styled.nav`
	padding: 10px;
	grid-area: tabs-nav;
	background: white;
	border: 1px solid#c6c6c6;
	white-space: nowrap;
	text-align: center;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: min-content;
	gap: 12px;
`

const CustomNavLink = ({ exact = true, ...rest }) => (
	<NavLink exact={exact} activeStyle={{ color: CSS.COLOR_ACCENT }} {...rest} />
)

const Tab = styled(CustomNavLink)`
	* {
		user-select: none !important;
	}
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: #292929;
	&:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`

const TABS = {
	items: { name: "items", displayName: "Przedmioty na sprzedaż" },
	settings: { name: "settings", displayName: "Opcje / Edytuj Profil" },
	feedback: { name: "feedback", displayName: "Opinie" },
	transactions: { name: "transactions", displayName: "Historia Transakcji" }
}

class AccountPage extends Component {
	itemListeners = []

	state = {
		isLoading: true,
		user: null,
		userIsOwner: false,
		items: {},
		currentTab: TABS.items.name
	}

	getUser = async () => {
		try {
			// Get id from url
			const userId = this.props.match.params.id
			// Get user data from db based on id
			const user = (await this.props.firebase.user(userId).get()).data()
			// Get the current authenticated user
			const authUser = this.props.authUser
			// Check if this is the page of the current user
			const userIsOwner = authUser && userId === authUser.uid

			console.log("fetched user", user)
			console.log("auth user", authUser)
			console.log("is owner: ", userIsOwner)

			// Throw an error if user isn't found
			if (!user) throw new Error("Couldn't find the user")

			let profileImageURL = ""
			if (user.profilePictureRef) {
				// Get profile image url of the user
				profileImageURL = await this.props.firebase.storageRef
					.child(user.profilePictureRef)
					.getDownloadURL()
			}

			return this.setState({ user, userIsOwner, profileImageURL })
		} catch (error) {
			console.log(error)
		}
	}

	getItems = async () => {
		try {
			this.setState({ isFetchingItems: true })
			// If the user is missing refetch it
			if (!this.state.user) {
				await this.getUser()
			}

			const itemIDs = this.state.user.items
			if (!itemIDs) throw new Error("This user has no items")

			const items = await Promise.all(
				itemIDs.map((itemID) => this.props.firebase.getItem(itemID))
			)

			let availableItems = []
			let soldItems = []

			for (let item of items) {
				if (item.status === ITEM_STATUS.available) {
					availableItems.push(item)
				} else if (item.status === ITEM_STATUS.sold) {
					soldItems.push(item)
				}
			}

			this.setState({ isFetchingItems: false, availableItems, soldItems })
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount = async () => {
		const userId = this.props.match.params.id

		// Get user's data
		await this.getUser()

		// Get items
		await this.getItems()

		// If logged-in user changes check if they are owner again
		this.authListener = this.props.firebase.auth.onAuthStateChanged(
			(authUser) => {
				this.setState({ userIsOwner: userId === authUser.uid })
			}
		)

		this.setState({ isLoading: false })
	}

	componentDidUpdate = (prevProps) => {
		const userId = this.props.match.params.id

		// If userId in url changed get the new user's data
		// getUser() also checks ownership
		if (prevProps.match.params.id !== userId) {
			this.getUser()
		}
	}

	componentWillUnmount = () => {
		// De-register listeners
		this.authListener()
	}

	render() {
		const {
			isLoading,
			isFetchingItems,
			user,
			userIsOwner,
			availableItems,
			soldItems,
			profileImageURL
		} = this.state

		return (
			<MainGrid>
				{!isLoading && user ? (
					<>
						{/* Main Info */}
						<MainInfoContainer>
							<ProfilePicture size="100px" url={profileImageURL} />
							<div>
								<h2>Imię: {user.name}</h2>
								<p>Email: {user.email}</p>
							</div>
						</MainInfoContainer>
						{/* Tabs navigation */}
						<TabsNav>
							{Object.values(TABS).map(({ name, displayName }, i) =>
								!(name === TABS.settings.name && !userIsOwner) ? (
									<Tab key={i} to={this.props.match.url + "/" + name}>
										{displayName}
									</Tab>
								) : null
							)}
						</TabsNav>
						{/* Tabs content */}
						<Route
							path={ROUTES.ACCOUNT_TAB}
							children={({ match }) =>
								match ? (
									<TabsContentContainer>
										{/* Items */}
										{match.params.tab === TABS.items.name &&
											(isFetchingItems ? (
												<LoadingSpinner />
											) : availableItems.length > 0 ? (
												<ItemsView items={availableItems} />
											) : (
												<EmptyState state={EMPTY_STATES.UserNoItems} />
											))}
										{/* Settings */}
										{match.params.tab === TABS.settings.name && userIsOwner && (
											<UserSettings
												authUser={this.props.authUser}
												onAvatarSubmit={this.onAvatarSubmit}
											/>
										)}
										{/* Feedback */}
										{match.params.tab === TABS.feedback.name && (
											<UserFeedback feedback={user.feedback} />
										)}
										{/* Transactions */}
										{match.params.tab === TABS.transactions.name && (
											<UserTransactions soldItems={soldItems} />
										)}
									</TabsContentContainer>
								) : (
									<TabsContentContainer>
										<EmptyState state={EMPTY_STATES.Generic} />
									</TabsContentContainer>
								)
							}
						/>
					</>
				) : (
					<LoadingSpinner />
				)}
			</MainGrid>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withAuthentication,
	withAuthorization(condition),
	withFirebase
)(AccountPage)
