import React, { Component } from "react"
import { API } from "aws-amplify"
import ItemForm from "./ItemForm"

export default class Edytuj extends Component {
	onSubmit = (data) => {
		API.post("items", "/items", {
			body: { ...data }
		})
	}

	validate = (data) => {
		console.log("validating")
	}

	render() {
		return (
			<>
				<h1>Edytuj</h1>
				<ItemForm onSubmit={this.onSubmit} validate={this.validate} />
			</>
		)
	}
}
