import React from "react"
import { withRouter } from "react-router-dom"
import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatDropDataForDb, MODE } from "../../../utils/formatting/formatDropData"
import { ROUTES, CONST } from "../../../constants"

import DropForm from "./Form"

const AddDrop = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			const files = values.files

			// Upload files to storage and get their refs
			const attachments = await firebase.batchUploadFiles(
				CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
				files
			)

			const urlPromises = attachments.map((storageRef) =>
				firebase.getImageURL(storageRef)
			)
			const imageUrls = await Promise.all(urlPromises)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatDropDataForDb(
				{ ...values, mainImageIndex, attachments, imageUrls },
				MODE.CREATE
			)

			// Add drop to database
			await firebase.drop(formattedData.id).set(formattedData)

			// Reset form
			actions.reset()

			// Redirect
			history.push(ROUTES.ADMIN_DROPS)
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<PageContainer>
			<DropForm onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(AddDrop)
