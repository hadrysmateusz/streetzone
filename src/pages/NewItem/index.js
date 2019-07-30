import React from "react"

import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import HelmetBasics from "../../components/HelmetBasics"

import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"
import { ROUTES, CONST } from "../../constants"
import { useAuthentication, useFirebase } from "../../hooks"

import NewItemForm from "./NewItemForm"

const NewItemPage = ({ history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()

	const onSubmit = async (values) => {
		try {
			const files = values.files
			const userId = authUser.uid

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

			// TODO: better behavior after adding item
			// Redirect to home page
			history.push(ROUTES.HOME)
			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	return (
		<PageContainer maxWidth={2}>
			<HelmetBasics title="Wystaw przedmiot" />
			<NewItemForm onSubmit={onSubmit} />
		</PageContainer>
	)
}

const condition = (authUser) => (!!authUser ? true : "Zaloguj się by zacząć sprzedawać")

export default withAuthorization(condition)(NewItemPage)
