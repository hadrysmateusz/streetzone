import React, { Component } from "react"
import { API } from "aws-amplify"
import ItemForm from "./ItemForm"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"

class EditItem extends Component {
	state = {
		isLoading: true
	}

	componentDidMount = async () => {
		try {
			let itemId = this.props.match.params.id
			let item = await API.get("items", `/items/${itemId}`)
			this.setState({ item })
		} catch (e) {
			console.log("Failed to find item")
		}
		this.setState({ isLoading: false })
	}

	onSubmit = (data, actions) => {
		try {
			this.setState({ isLoading: true })

			actions.reset()

			API.put("items", `/items/${this.props.match.params.id}`, {
				body: { ...data }
			})

			this.setState({ isLoading: false })
		} catch (e) {
			alert("Wystąpił problem podczas uaktualniania przedmiotu")
		}
	}

	render() {
		return (
			<>
				<h1>Edytuj</h1>
				{this.state.item ? (
					<ItemForm onSubmit={this.onSubmit} initialValues={this.state.item} />
				) : this.state.isLoading ? (
					<LoadingSpinner />
				) : (
					<EmptyState text="Nie znaleziono przedmiotu" />
				)}
			</>
		)
	}
}

export default EditItem
