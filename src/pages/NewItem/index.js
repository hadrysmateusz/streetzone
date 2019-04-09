import React, { Component } from "react"
import { compose } from "recompose"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"
import { PageContainer } from "../../components/Containers"
import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"

import NewItemForm from "./NewItemForm"

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

			const formattedData = formatItemDataForDb({ ...values, attachments }, MODE.CREATE)

			// // Generate unique id
			// const id = shortid.generate()

			// console.log("incoming data", values)

			// // Format the data
			// const data = {
			// 	name: values.name,
			// 	designers: values.designers,
			// 	category: values.category,

			// 	size: values.size || null,
			// 	description: values.description || "",

			// 	price: Number.parseInt(values.price),
			// 	condition: Number.parseFloat(values.condition),

			// 	createdAt: Date.now(),
			// 	bumpedAt: Date.now(),
			// 	promotedAt: Date.now(),
			// 	modifiedAt: null,

			// 	status: ITEM_SCHEMA.status.available,

			// 	id,
			// 	userId,
			// 	attachments
			// }

			// console.log("formatted data", data)

			// TODO: add a check against an external schema to make sure all values are present

			// Add item to database
			await firebase.item(formattedData.id).set(formattedData)

			// Add the new item's id to user's items
			const items = [...oldItems, formattedData.id]
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
			<PageContainer maxWidth={2}>
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
