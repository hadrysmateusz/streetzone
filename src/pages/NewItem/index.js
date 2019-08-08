import React from "react"
import shortid from "shortid"

import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import HelmetBasics from "../../components/HelmetBasics"

import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"
import { ROUTES, CONST } from "../../constants"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import NewItemForm from "./NewItemForm"

const NewItemPage = ({ history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const flashMessage = useFlash()

	const onSubmit = async (values) => {
		try {
			const files = values.files
			const userId = authUser.uid
			const itemId = shortid.generate()

			// Upload files to storage and get their refs
			const attachments = await firebase.batchUploadFiles(
				`${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${userId}/${itemId}`,
				files
			)

			// Get main image ref
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatItemDataForDb(
				{ ...values, mainImageIndex, attachments, userId, itemId },
				MODE.CREATE
			)

			// Add item to database
			await firebase.item(formattedData.id).set(formattedData)

			// TODO: better behavior after adding item
			// Redirect to home page
			history.push(ROUTES.HOME)
			return
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Ogłoszenie mogło nie zostać dodane"
			})
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
