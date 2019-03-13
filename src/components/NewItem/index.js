import React, { Component } from "react"
import { compose } from "recompose"
import shortid from "shortid"

import { withAuthorization, withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import NewItemForm from "./NewItemForm"
import { PageContainer } from "../Containers"
import { ITEM_SCHEMA } from "../../constants"

class NewItemPage extends Component {
	state = { isLoading: false }

	onSubmit = async (values) => {
		try {
			const { firebase, history, authUser } = this.props
			const files = values.files
			const userId = authUser.uid
			const oldItems = authUser.items

			// Upload files to storage and get their refs
			const attachments = await Promise.all(
				files.map(async (file) => {
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			// Generate unique id
			const itemId = shortid.generate()

			console.log("incoming data", values)

			// Format the data
			const data = {
				name: values.name,
				designers: values.designers,
				price: Number.parseInt(values.price),
				category: values.category,
				size: values.size || null,
				description: values.description || "",
				condition: Number.parseFloat(values.condition),
				status: ITEM_SCHEMA.status.available,
				createdAt: Date.now(),
				bumpedAt: Date.now(),
				modifiedAt: null,
				itemId,
				userId,
				attachments
			}

			console.log("formatted data", data)

			// TODO: add a check against an external schema to make sure all values are present

			// Add item to database
			await firebase.item(itemId).set(data)

			// Add the new item's id to user's items
			const items = [...oldItems, itemId]
			await firebase.user(userId).update({ items })

			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	render() {
		return (
			<PageContainer maxWidth={1}>
				<NewItemForm onSubmit={this.onSubmit} />
			</PageContainer>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(NewItemPage)
