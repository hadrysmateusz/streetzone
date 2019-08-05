import React from "react"
import { withRouter } from "react-router-dom"
import shortid from "shortid"

import { PageContainer } from "../../../components/Containers"

import useFirebase from "../../../hooks/useFirebase"
import { route } from "../../../utils"
import { CONST } from "../../../constants"

import Form from "./Form"
import { useFlash } from "../../../hooks"

const AddAuthor = ({ history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const onSubmit = async (values, form) => {
		try {
			let imageRef

			if (values.image) {
				// Upload file to storage and get its ref
				const snapshot = await firebase.uploadFile(
					CONST.STORAGE_BUCKET_AUTHOR_PICTURES,
					values.image.data
				)
				imageRef = snapshot.ref.fullPath
			}

			const authorId = shortid.generate()
			const authorObject = { id: authorId, name: values.name }
			authorObject.about = values.about || null
			authorObject.image = imageRef || null

			// Add to database
			await firebase.db
				.collection("authors")
				.doc(authorId)
				.set(authorObject)

			setTimeout(() => {
				flashMessage({ type: "success", text: "Dodano" })
				form.reset()
				history.push(route("ADMIN_AUTHORS"))
				return
			})
		} catch (error) {
			console.log(error)
			flashMessage({
				type: "error",
				text: "Wystąpił problem"
			})
			return
		}
	}

	return (
		<PageContainer>
			<Form onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(AddAuthor)
