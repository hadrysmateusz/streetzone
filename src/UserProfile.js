import React, { Component } from "react"
import API from "@aws-amplify/api"

import LoadingSpinner from "./components/LoadingSpinner"
import ItemCard from "./ItemCard"
import errorLog from "./libs/errorLog"

export class UserProfile extends Component {
	state = {
		user: null,
		items: null,
		isLoading: true
	}

	componentDidMount = async () => {
		let userId = this.props.match.params.id
		let user, items

		try {
			user = await API.get("items", `/users/${userId}`)
			items = await API.get("items", `/items/owner/${userId}`)
		} catch (e) {
			errorLog(e, "Wystąpił problem podczas wyszukiwania użytkownika.")
		}

		this.setState({ isLoading: false, user, items })
	}

	render() {
		const { isLoading, items, user } = this.state
		console.log(this.state)
		if (!isLoading && items && user) {
			return (
				<>
					<h3>Profil użytkownika {user.name}</h3>
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
