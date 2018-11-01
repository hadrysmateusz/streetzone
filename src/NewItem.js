import React, { Component } from "react"
import { API } from "aws-amplify"
import ItemForm from "./ItemForm"

class NewItem extends Component {
	state = {
		isLoading: false
	}
	onSubmit = (data, actions) => {
		try {
			this.setState({ isLoading: true })

			actions.reset()

			API.post("items", "/items", {
				body: { ...data }
			})

			this.props.history.push("/")
		} catch (e) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
		}
		this.setState({ isLoading: false })
	}

	render() {
		return (
			<>
				<h1>Nowy</h1>
				<ItemForm onSubmit={this.onSubmit} validate={this.validate} />
			</>
		)
	}
}

export default NewItem
