import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import API from "@aws-amplify/api"

import LoadingSpinner from "./components/LoadingSpinner"
import ItemCard from "./ItemCard"

export class UserProfile extends Component {
	state = {
		user: null,
		items: null,
		isLoading: true
	}

	componentDidMount = async () => {
		let user = await Auth.currentAuthenticatedUser()
		if (user) this.setState({ user })
		let items = await API.get(
			"items",
			`/items/owner/${this.props.match.params.id}`
		)
		if (items) {
			await this.setState({ items })
		}
		this.setState({ isLoading: false })
	}

	render() {
		const { isLoading, items, user } = this.state
		if (!isLoading && items && user) {
			return (
				<>
					<h3>Profil użytkownika {user.attributes.name}</h3>
					<p>Przedmioty użytkownika:</p>
					<div style={{ display: "flex", flexDirection: "row" }}>
						{items.map((item) => (
							<ItemCard key={item.itemId} item={item} />
						))}
					</div>
				</>
			)
		} else {
			return <LoadingSpinner />
		}
	}
}

export default UserProfile
