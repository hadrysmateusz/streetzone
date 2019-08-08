import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import { CustomFile } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"

import { formatDropDataForDb, MODE } from "../../../utils/formatting/formatDropData"
import useFirebase from "../../../hooks/useFirebase"
import { CONST } from "../../../constants"
import { route } from "../../../utils"
import {
	S_THUMB_POSTFIX,
	M_THUMB_POSTFIX,
	L_THUMB_POSTFIX
} from "../../../constants/const"

import DropForm from "./Form"
import { useFlash } from "../../../hooks"

const EditDrop = ({ match, history }) => {
	const firebase = useFirebase()
	const [initialValues, setInitialValues] = useState(null)
	const flashMessage = useFlash()

	const id = match.params.id

	useEffect(() => {
		const getData = async () => {
			const snap = await firebase.drop(id).get()

			let data = snap.data()

			// Get attachment urls for previews
			const imageURLs = await firebase.batchGetImageURLs(data.attachments)

			// create CustomFile objects with the fetched previewUrls
			const files = data.attachments.map((attachment, i) => {
				return new CustomFile({
					storageRef: attachment,
					previewUrl: imageURLs[i],
					isUploaded: true
				})
			})

			setInitialValues({ ...data, files })
		}

		getData()
	}, [firebase, id])

	const onSubmit = async (values, form) => {
		try {
			const files = values.files

			// Upload NEW files and get ALL refs
			const newRefs = await Promise.all(
				files.map(async (file) => {
					// If file already has a ref, return it
					if (file.storageRef) return file.storageRef

					// Upload the new file and return promise containing ref
					const snapshot = await firebase.uploadFile(
						CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
						file.data
					)
					return snapshot.ref.fullPath
				})
			)

			const urlPromises = newRefs.map((storageRef) => firebase.getImageURL(storageRef))
			const imageUrls = await Promise.all(urlPromises)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatDropDataForDb(
				{ ...values, mainImageIndex, attachments: newRefs, imageUrls },
				MODE.EDIT
			)

			// Update drop
			await firebase.drop(id).update(formattedData)

			// Get just the old refs
			let oldRefs = initialValues.files.map((file) => file.storageRef)

			// Old refs no longer present in new refs are marked for deletion
			let refsToDelete = oldRefs.filter((oldRef) => !newRefs.includes(oldRef))

			// Remove files associated with the marked refs
			for (const storageRef of refsToDelete) {
				await firebase.removeFile(storageRef)
				await firebase.removeFile(storageRef + L_THUMB_POSTFIX)
				await firebase.removeFile(storageRef + M_THUMB_POSTFIX)
				await firebase.removeFile(storageRef + S_THUMB_POSTFIX)
			}

			// Reset form
			setTimeout(form.reset)

			// Redirect
			history.push(route("ADMIN_DROPS"))
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
			<DropForm onSubmit={onSubmit} initialValues={initialValues} edit />
		</PageContainer>
	)
}

export default withRouter(EditDrop)
