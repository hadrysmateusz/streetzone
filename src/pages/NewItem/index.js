import React, { Component } from "react"
import { compose } from "recompose"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"
import { PageContainer, MainPageContainer } from "../../components/Containers"
import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"

import { ROUTES, CONST } from "../../constants"

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
			const attachments = await firebase.batchUploadFiles(
				CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS,
				files
			)

			// Get main image ref
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatItemDataForDb(
				{ ...values, mainImageIndex, attachments, userId },
				MODE.CREATE
			)

			// Add item to database
			await firebase.item(formattedData.id).set(formattedData)

			// Add the new item's id to user's items
			const items = [...oldItems, formattedData.id]
			await firebase.user(userId).update({ items })

			// Redirect to home page
			history.push(ROUTES.HOME)
			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	render() {
		return (
			<MainPageContainer>
				<PageContainer maxWidth={2}>
					<NewItemForm onSubmit={this.onSubmit} />
				</PageContainer>
			</MainPageContainer>
		)
	}
}

const condition = (authUser) => !!authUser

export default compose(
	withFirebase,
	withAuthentication,
	withAuthorization(condition)
)(NewItemPage)
