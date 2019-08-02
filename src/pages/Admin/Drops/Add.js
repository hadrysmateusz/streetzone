import React from "react"
import { withRouter } from "react-router-dom"
import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatDropDataForDb, MODE } from "../../../utils/formatting/formatDropData"
import { ROUTES, CONST } from "../../../constants"

import DropForm from "./Form"

const AddDrop = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, form) => {
		try {
			const files = values.files

			// Upload files to storage and get their refs
			const attachments = await firebase.batchUploadFiles(
				CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
				files
			)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatDropDataForDb(
				{ ...values, mainImageIndex, attachments },
				MODE.CREATE
			)

			// Add drop to database
			await firebase.drop(formattedData.id).set(formattedData)

			// Reset form
			setTimeout(form.reset)

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
