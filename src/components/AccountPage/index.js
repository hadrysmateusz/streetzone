import React, { Component } from "react"
import { compose } from "recompose"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import { withAuthorization, withAuthentication } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { Separator } from "../Basics"
import AvatarChangeForm from "../AvatarChange"
import LoginManagement from "../LoginManagement"
import { CSS, EMPTY_STATES } from "../../constants"
import { BREAKPOINTS } from "../../constants/const"
import ItemsView from "../ItemsView"
import EmptyState from "../EmptyState"

const UserSettings = ({ onAvatarSubmit, authUser }) => (
	<div>
		<Separator text="Zdjęcie profilowe" />
		<AvatarChangeForm onSubmit={onAvatarSubmit} />
		<LoginManagement authUser={authUser} />
	</div>
)

const UserFeedback = () => (
	<div>
		<h3>Opinie</h3>
	</div>
)

const UserTransactions = () => (
	<div>
		<h3>Historia transakcji</h3>
		<h4>Sprzedane przedmioty</h4>
		<h4>Kupione przedmioty</h4>
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
	display: grid;
	margin: 0 auto;
	grid-gap: 20px;
	padding: 0 20px;
	grid-template-areas:
		"info"
		"tabs-nav"
		"tabs-content";

	@media (min-width: ${BREAKPOINTS[2]}px) {
		max-width: 860px;
		grid-template-columns: 200px 1fr;
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

const TabsContent = styled.div`
	grid-area: tabs-content;
`

const TabsNav = styled.nav`
	grid-area: tabs-nav;
	background: white;
	border: 1px solid#c6c6c6;
	padding: 10px 0;
	white-space: nowrap;
	text-align: center;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: min-content;
	gap: 12px;
`

const Tab = styled.div`
	padding: 0 15px;
	color: ${(p) => (p.isCurrent ? CSS.COLOR_ACCENT : "#555")};
	:hover {
		color: ${CSS.COLOR_ACCENT};
	}
	cursor: pointer;
`

const TABS = {
	items: { name: "ITEMS", displayName: "Przedmioty na sprzedaż" },
	settings: { name: "SETTINGS", displayName: "Opcje / Edytuj Profil" },
	feedback: { name: "FEEDBACK", displayName: "Opinie" },
	transactions: { name: "TRANSACTIONS", displayName: "Historia Transakcji" }
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
			const authUser = this.props.firebase.authUser()
			// Check if this is the page of the current user
			const userIsOwner = authUser && userId === authUser.uid
			console.log(user)

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
			// If the user is missing refetch it
			if (!this.state.user) {
				await this.getUser()
			}

			const items = this.state.user.items
			if (!items) throw new Error("This user has no items")

			// Register new listeners for all items
			for (let itemId of items) {
				this.registerItemListener(itemId)
			}
		} catch (error) {
			console.log(error)
		}
	}

	registerItemListener = async (itemId) => {
		// If a listener for this item is already registered, de-register
		if (this.itemListeners[itemId]) {
			this.itemListeners[itemId]()
		}

		// Register a new listener
		this.itemListeners[itemId] = this.props.firebase
			.item(itemId)
			.onSnapshot((snapshot) => {
				// Update item with corresponding id to contain the new data
				this.setState({
					items: {
						...this.state.items,
						[itemId]: { itemId, ...snapshot.data() }
					}
				})
			})
	}

	registerItemsListener = async () => {
		const userId = this.props.match.params.id

		// If a listener is already registered, de-register
		if (this.itemsListener) {
			this.itemsListener()
		}

		// Register a new listener
		this.itemsListener = this.props.firebase
			.user(userId)
			.onSnapshot(async () => {
				await this.getUser()
				this.getItems()
			})
	}

	componentDidMount = async () => {
		const userId = this.props.match.params.id

		// Get user's data
		await this.getUser()

		// Subscribe to user's items
		this.registerItemsListener()

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
		if (prevProps.match.params.id !== userId) {
			this.getUser()
		}
	}

	componentWillUnmount = () => {
		// De-register listeners
		this.authListener()
		this.itemsListener()
	}

	switchTab = (e) => {
		const currentTab = e.currentTarget.dataset.tab
		this.setState({ currentTab })
	}

	render() {
		const {
			isLoading,
			user,
			userIsOwner,
			items,
			currentTab,
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
							{Object.values(TABS).map(({ name, displayName }, i) => (
								<Tab
									key={i}
									onClick={this.switchTab}
									data-tab={name}
									isCurrent={name === currentTab}
								>
									{displayName}
								</Tab>
							))}
						</TabsNav>
						{/* Tabs content */}
						<TabsContent>
							{/* Items */}
							{currentTab === TABS.items.name &&
								(items.length > 0 ? (
									<ItemsView items={Object.values(items)} />
								) : (
									<EmptyState state={EMPTY_STATES.UserNoItems} />
								))}
							{/* Settings */}
							{currentTab === TABS.settings.name && userIsOwner && (
								<UserSettings
									authUser={this.props.authUser}
									onAvatarSubmit={this.onAvatarSubmit}
								/>
							)}
							{/* Feedback */}
							{currentTab === TABS.feedback.name && <UserFeedback />}
							{/* Transactions */}
							{currentTab === TABS.transactions.name && <UserTransactions />}
						</TabsContent>
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
