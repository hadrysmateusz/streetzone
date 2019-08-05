import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import { CustomFile } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { useFlash, useFirebase } from "../../../hooks"
import { getImageUrl } from "../../../utils/getImageUrl"

import Form from "./Form"

const imageOptionsMock = [
	{
		key: "mainImageRef",
		fieldName: "image",
		isList: false
	},
	{ key: "imageRefs", fieldName: "images", isList: true }
]

const Edit = ({ match, history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const [initialValues, setInitialValues] = useState(null)
	const id = match.params.id

	useEffect(() => {
		const getData = async () => {
			let imageFile

			const snap = await firebase.db
				.collection("authors")
				.doc(id)
				.get()

			let data = snap.data()

			// if author has image fetch it and create CustomFile
			if (data.imageRef) {
				imageFile = new CustomFile({
					storageRef: data.imageRef,
					previewUrl: getImageUrl(data.imageRef, "M"),
					isUploaded: true
				})
			}

			setInitialValues({ ...data, image: imageFile })
		}

		getData()
	}, [firebase, id])

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
			authorObject.image = imageRef || null

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
			<Form onSubmit={onSubmit} initialValues={initialValues} edit />
		</PageContainer>
	)
}

export default withRouter(Edit)
