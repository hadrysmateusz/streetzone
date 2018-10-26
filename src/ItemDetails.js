import React, { Component } from "react"
import { API, Auth } from "aws-amplify"

export default class ItemDetails extends Component {
	state = {
		item: null,
		userIsOwner: false,
		isLoading: true
	}
	componentDidMount = async () => {
		try {
			// get the item
			let itemId = this.props.match.params.id
			let item = await API.get("items", `/items/${itemId}`)
			this.setState({ item })

			// check if current user is the owner
			let { isAuthenticated } = this.props
			if (isAuthenticated) {
				let info = await Auth.currentUserInfo()
				let userIsOwner = isAuthenticated && info.id === item.userId
				this.setState({ userIsOwner })
			}
		} catch (e) {
			console.log("Authorization error")
		}
		this.setState({ isLoading: false })
	}

	deleteItem = async () => {
		try {
			let itemId = this.props.match.params.id
			await API.del("items", `/items/${itemId}`)
		} catch (e) {
			alert("Usuwanie nie powiodło się")
		}
	}

	render() {
		const { item, userIsOwner } = this.state

		return (
			<div className="ItemDetails">
				<h2>ItemDetails</h2>
				{item && (
					<div>
						<h3>
							{item.name}
							<span style={{ color: "#adadad" }}>
								{" "}
								- {item.price}
								zł
							</span>
						</h3>
						<h4 style={{ color: "#3f3f3f" }}>{item.designers.join(" & ")}</h4>
						<h4 style={{ color: "#999" }}>{item.category}</h4>
						<p>{item.description}</p>
						{userIsOwner && (
							<>
								<button>Edytuj</button>
								<button onClick={this.deleteItem}>Usuń</button>
							</>
						)}
					</div>
				)}
			</div>
		)
	}
}
