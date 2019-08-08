import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import { CustomFile } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"

import { formatDealDataForDb, MODE } from "../../../utils/formatting/formatDealData"
import useFirebase from "../../../hooks/useFirebase"
import { CONST } from "../../../constants"
import { route } from "../../../utils"

import Form from "./Form"
import { useFlash } from "../../../hooks"

const Edit = ({ match, history }) => {
	const firebase = useFirebase()
	const [initialValues, setInitialValues] = useState(null)
	const id = match.params.id
	const flashMessage = useFlash()

	useEffect(() => {
		const getData = async () => {
			const snap = await firebase.deal(id).get()

			let data = snap.data()

			// Get attachment urls for previews
			const imageUrl = await firebase.getImageURL(data.imageRef)

			// create CustomFile objects with the fetched previewUrls
			const file = new CustomFile({
				storageRef: data.imageRef,
				previewUrl: imageUrl,
				isUploaded: true
			})

			setInitialValues({ ...data, file })
		}

		getData()
	}, [firebase, id])

	const onSubmit = async (values, form) => {
		try {
			const file = values.file

			// If file was changed, upload it to storage and get its ref
			if (file.data && !file.isUploaded) {
				const snapshot = await firebase.uploadFile(
					CONST.STORAGE_BUCKET_DEAL_ATTACHMENTS,
					file.data
				)
				values.imageRef = snapshot.ref.fullPath
			} else {
				values.imageRef = initialValues.imageRef
			}

			// Format the values for db
			const formattedData = formatDealDataForDb({ ...values }, MODE.EDIT)

			// Update
			await firebase.deal(id).update(formattedData)

			// Remove files associated with the old ref
			await firebase.removeAllImagesOfRef(initialValues.imageRef)

			// Reset form
			setTimeout(form.reset)

			// Redirect
			history.push(route("ADMIN_DEALS"))
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
			<Form onSubmit={onSubmit} initialValues={initialValues} edit />
		</PageContainer>
	)
}

export default withRouter(Edit)
