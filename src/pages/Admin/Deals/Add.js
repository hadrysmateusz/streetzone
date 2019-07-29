import React from "react"
import { withRouter } from "react-router-dom"
import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatDealDataForDb, MODE } from "../../../utils/formatting/formatDealData"
import { ROUTES, CONST } from "../../../constants"

import Form from "./Form"

const Add = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, form) => {
		try {
			const file = values.file

			// Upload file to storage and get its ref
			const snapshot = await firebase.uploadFile(
				CONST.STORAGE_BUCKET_DEAL_ATTACHMENTS,
				file.data
			)
			const imageRef = snapshot.ref.fullPath

			// Format the values for db
			const formattedData = formatDealDataForDb({ ...values, imageRef }, MODE.CREATE)

			// Add to database
			await firebase.deal(formattedData.id).set(formattedData)

			// Reset form
			setTimeout(form.reset)

			// Redirect
			history.push(ROUTES.ADMIN_DEALS)
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<PageContainer>
			<Form onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(Add)
