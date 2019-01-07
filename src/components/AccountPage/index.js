import React, { Component } from "react"
import { compose } from "recompose"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withFirebase } from "../Firebase"
import { withAuthorization, withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { Separator, ProfilePicture, CustomNavLink } from "../Basics"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import { ACCOUNT_TABS } from "../../constants/const"
import { EMPTY_STATES, ITEM_SCHEMA } from "../../constants"
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

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 860px;
		grid-template-columns: min-content 1fr;
		grid-template-rows: min-content 1fr;
		grid-template-areas:
			"info info"
			"tabs-nav tabs-content";
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: ${(p) => p.theme.breakpoints[3]}px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		max-width: ${(p) => p.theme.breakpoints[5]}px;
	}
`

const MainInfoContainer = styled.div`
	grid-area: info;
	display: grid;
	grid-template-columns: 120px 1fr;
	grid-template-rows: 120px;
`

class AccountPage extends Component {
	itemListeners = []

	state = {
		isLoading: true,
		user: null,
		userIsOwner: false,
		items: {}
	}

	getUser = async () => {
		try {
			// Get id from url
			const userId = this.props.match.params.id
			// Get the current authenticated user
			const authUser = this.props.authUser
			// Check if this is the page of the current user
			const userIsOwner = authUser && userId === authUser.uid
			// Get user data from db based on id or use the auth user
			const user = userIsOwner
				? authUser
				: (await this.props.firebase.user(userId).get()).data()

			// Throw an error if user isn't found
			if (!user) throw new Error("Couldn't find the user")

			console.log(user, userIsOwner)
			return this.setState({ user, userIsOwner })
		} catch (error) {
			console.log(error)
		}
	}

	getItems = async () => {
		try {
			this.setState({ isFetchingItems: true })
			// If the user is missing refetch it
			if (!this.state.user) throw new Error("Missing user data")

			const itemIDs = this.state.user.items || []

			const items = await Promise.all(
				itemIDs.map((itemID) => this.props.firebase.getItemData(itemID))
			)

			let availableItems = []
			let soldItems = []

			for (let item of items) {
				if (item.status === ITEM_SCHEMA.status.available) {
					availableItems.push(item)
				} else if (item.status === ITEM_SCHEMA.status.sold) {
					soldItems.push(item)
				}
			}

			this.setState({ availableItems, soldItems })
		} catch (error) {
			console.log(error)
		} finally {
			this.setState({ isFetchingItems: false })
		}
	}

	componentDidMount = async () => {
		const userId = this.props.match.params.id

		// Get user's data
		await this.getUser()

		// Get items
		await this.getItems()

		// If logged-in user changes check if they are owner again
		this.authListener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.setState({ userIsOwner: userId === authUser.uid })
		})

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
			soldItems
		} = this.state

		const userId = this.props.match.params.id
		const baseUrl = this.props.match.path.replace(":id", userId)
		const currentTab = this.props.match.params.tab

		return (
			<MainGrid>
				{!isLoading && user ? (
					<>
						{/* Main Info */}
						<MainInfoContainer>
							{user.profilePictureURL ? (
								<ProfilePicture size="100px" url={user.profilePictureURL} inline />
							) : (
								<FontAwesomeIcon
									icon="user-circle"
									style={{ width: "100px", height: "100px", color: "#cacaca" }}
								/>
							)}
							<div>
								<h2>Imię: {user.name}</h2>
								<p>Email: {user.email}</p>
							</div>
						</MainInfoContainer>
						<TabsNav>
							<CustomNavLink to={baseUrl.replace(":tab", ACCOUNT_TABS.items)}>
								Przedmioty na sprzedaż
							</CustomNavLink>

							{!(currentTab === ACCOUNT_TABS.settings && !userIsOwner) && (
								<CustomNavLink to={baseUrl.replace(":tab", ACCOUNT_TABS.settings)}>
									Ustawienia / Edytuj profil
								</CustomNavLink>
							)}

							<CustomNavLink to={baseUrl.replace(":tab", ACCOUNT_TABS.feedback)}>
								Opinie i komentarze
							</CustomNavLink>

							<CustomNavLink to={baseUrl.replace(":tab", ACCOUNT_TABS.transactions)}>
								Historia transakcji
							</CustomNavLink>
						</TabsNav>
						<div>
							{/* Items */}
							{currentTab === ACCOUNT_TABS.items &&
								(isFetchingItems ? (
									<LoadingSpinner />
								) : availableItems.length > 0 ? (
									<ItemsView items={availableItems} />
								) : (
									<EmptyState state={EMPTY_STATES.UserNoItems} />
								))}
							{/* Settings */}
							{currentTab === ACCOUNT_TABS.settings && userIsOwner && (
								<UserSettings
									authUser={this.props.authUser}
									onAvatarSubmit={this.onAvatarSubmit}
								/>
							)}
							{/* Feedback */}
							{currentTab === ACCOUNT_TABS.feedback && (
								<UserFeedback feedback={user.feedback} />
							)}
							{/* Transactions */}
							{currentTab === ACCOUNT_TABS.transactions && (
								<UserTransactions soldItems={soldItems} />
							)}
						</div>
						{/* <EmptyState state={EMPTY_STATES.Generic} /> */}
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
