import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import shortid from "shortid"

import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { ROUTES } from "../../../constants"

import PostForm from "./Form"
import { useFlash } from "../../../hooks"

const AddPost = ({ history }) => {
	const firebase = useFirebase()
	const [postId] = useState(shortid.generate())
	const flashMessage = useFlash()

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
			console.error(error)
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Więcej informacji w konsoli"
			})
		}
	}

	return (
		<PageContainer>
			PostId: {postId}
			<PostForm onSubmit={onSubmit} postId={postId} />
		</PageContainer>
	)
}

export default withRouter(AddPost)
