import React, { Component } from "react"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import { withAuthorization } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { PasswordChangeForm } from "../PasswordChange"
import ItemCard from "../ItemCard"
import AvatarChangeForm from "../AvatarChange"

class AccountPage extends Component {
	constructor(props) {
		super(props)

		this.itemListeners = []
	}

	state = {
		isLoading: true,
		user: null,
		userIsOwner: false,
		items: {}
	}

	getUser = async () => {
		try {
			const userId = this.props.match.params.id
			const user = (await this.props.firebase.user(userId).get()).data()
			const authUser = this.props.firebase.authUser()
			const userIsOwner = authUser && userId === authUser.uid

			if (!user) throw new Error("Couldn't find the user")

			return this.setState({ user, userIsOwner })
		} catch (error) {
			console.log(error)
		}
	}

	getItems = async () => {
		// If the user is missing refetch it
		if (!this.state.user) {
			await this.getUser()
		}

		const items = this.state.user.items

		// Register new listeners for all items
		for (let itemId of items) {
			this.registerItemListener(itemId)
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

	render() {
		const { isLoading, user, userIsOwner, items } = this.state
		return !isLoading && user ? (
			<>
				<h1>{user.name}</h1>
				<h3>Informacje</h3>
				<p>Email: {user.email}</p>
				{userIsOwner && (
					<>
						<h3>Edytuj</h3>
						<h4>Awatar</h4>
						<AvatarChangeForm onSubmit={this.onAvatarSubmit} />
						<h4>Hasło</h4>
						<PasswordChangeForm />
					</>
				)}
				<h3>Przedmioty na sprzedaż</h3>
				{Object.values(items).map((item, i) => (
					<ItemCard key={i} item={item} />
				))}
			</>
		) : (
			<LoadingSpinner />
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withAuthorization(condition),
	withFirebase
)(AccountPage)
