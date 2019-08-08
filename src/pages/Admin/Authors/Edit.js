import React from "react"
import { withRouter } from "react-router-dom"

import { PageContainer } from "../../../components/Containers"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { useFlash, useFirebase, useInitialValues } from "../../../hooks"

import Form from "./Form"

const imagesConfig = [{ key: "imageRef", name: "image" }]

const Edit = ({ match, history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const authorId = match.params.id
	const initialValues = useInitialValues(`authors/${authorId}`, imagesConfig)

	const onSubmit = async (values, form) => {
		try {
			let imageRef, deleteOldImage
			const imageFile = values.image
			const authorId = initialValues.id

			// if image file is present process it
			if (imageFile) {
				// check for changes
				if (imageFile.data && !imageFile.isUploaded) {
					// if changed upload it and use new ref
					const snapshot = await firebase.uploadFile(
						CONST.STORAGE_BUCKET_AUTHOR_PICTURES,
						imageFile.data
					)
					imageRef = snapshot.ref.fullPath
					deleteOldImage = true
				} else {
					// if unchanged use old ref
					imageRef = initialValues.imageRef
					deleteOldImage = false
				}
			} else {
				deleteOldImage = true
			}

			const authorObject = {}
			authorObject.name = values.name
			authorObject.about = values.about || null
			authorObject.imageRef = imageRef || null

			// Add to database
			await firebase.db
				.collection("authors")
				.doc(authorId)
				.update(authorObject)

			// if no longer needed, delete old images
			if (deleteOldImage) {
				await firebase.removeAllImagesOfRef(initialValues.imageRef)
			}

			setTimeout(() => {
				flashMessage({ type: "success", text: "Dodano" })
				form.reset()
				history.push(route("ADMIN_AUTHORS"))
				return
			})
		} catch (error) {
			console.error(error)
			flashMessage({
				type: "error",
				text: "Wystąpił problem"
			})
			return
		}
	}

	return (
		<PageContainer>
			<Form onSubmit={onSubmit} initialValues={initialValues} edit />
		</PageContainer>
	)
}

export default withRouter(Edit)
