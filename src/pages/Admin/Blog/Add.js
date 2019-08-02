import React from "react"
import { withRouter } from "react-router-dom"

import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { ROUTES } from "../../../constants"

import PostForm from "./Form"

const AddPost = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, form) => {
		try {
			const files = values.files

			// Get attachments' refs
			const attachments = files.map((file) => file.ref)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatPostDataForDb(
				{ ...values, mainImageIndex, attachments },
				MODE.CREATE
			)

			// Add post to database
			await firebase.post(formattedData.id).set(formattedData)

			// Reset form
			setTimeout(form.reset)

			// Redirect
			history.push(ROUTES.ADMIN_BLOG)
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<PageContainer>
			<PostForm onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(AddPost)
