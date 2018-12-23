import React, { Component } from "react"
import { compose } from "recompose"
import uuidv1 from "uuid/v1"

import { withAuthorization } from "../UserSession"
import { withFirebase } from "../Firebase"
import { ItemForm } from "../ItemForm"
import { Container } from "../Basics"
import { ITEM_SCHEMA } from "../../constants"
import { dbData } from "../../utils/formatItemData"

class NewItemPage extends Component {
	state = {
		isLoading: false
	}

	onSubmit = async (values) => {
		try {
			const { firebase, history } = this.props
			const files = values.files || []

			// Get current user's id
			const userId = firebase.authUser().uid

			// Fetch current user's items from database
			const currentUserSnapshot = await firebase.user(userId).get()
			const oldItems = currentUserSnapshot.data().items

			// If oldItems wasn't found throw to prevent overwriting data
			if (!oldItems) {
				throw new Error("couldn't find user data")
			}

			// Upload files to storage and get their refs
			const attachments = await Promise.all(
				files.map(async (file) => {
					const name = uuidv1()
					const ref = firebase.storageRef.child(`attachments/${name}`)
					const snapshot = await ref.put(file.data)
					return snapshot.ref.fullPath
				})
			)

			// Get time values
			const createdAt = Date.now()
			const modifiedAt = Date.now()
			const time = { createdAt, modifiedAt }

			// Make sure only the required values are passed
			const data = dbData(values, time, userId, attachments)

			// Check if all data is present
			for (let [key, value] of Object.entries(data)) {
				const err = new Error("missing data: " + key)
				// Description is not required
				if (!value && key !== "description") {
					throw err
				}
				if (Array.isArray(value) && value.length === 0) {
					throw err
				}
			}

			// Add item to database
			const newItem = await firebase.items().add(data)

			// Add the new item's ref to user's items
			const items = [...oldItems, newItem.id]
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
		const initialValues = /* 
			process.env.NODE_ENV === "development"
				? {
						name: "test" + Date.now(),
						designers: [
							ITEM_SCHEMA.schema.designers[Math.floor(Math.random() * 13)],
							ITEM_SCHEMA.schema.designers[Math.floor(Math.random() * 13)]
						],
						category: ITEM_SCHEMA.schema.categories[Math.floor(Math.random() * 5)],
						price: Math.max(50, Math.floor(Math.random() * 500) * 10) + "",
						size: Math.max(36, Math.floor(Math.random() * 50)) + "",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				  }
				:  */ null
		return (
			<Container width={620}>
				<h1>Nowy</h1>
				<ItemForm initialValues={initialValues} onSubmit={this.onSubmit} />
			</Container>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withFirebase,
	withAuthorization(condition)
)(NewItemPage)
