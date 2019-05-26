import React, { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { CustomFile } from "../../components/FileHandler"
import useFirebase from "../../hooks/useFirebase"
import EmptyState from "../../components/EmptyState"

import { NotFoundError } from "../../errors"
import EditItemForm from "./EditItemForm"
import useAuthentication from "../../hooks/useAuthentication"
import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"
import { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } from "../../constants/const"

const formatDataForEditForm = (price, condition, description, files) => ({
	price: Number.parseInt(price),
	description: description || "",
	condition,
	files: files
})

const EditItemPage = ({ match, history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [error, setError] = useState(null)
	const [initialData, setInitialData] = useState(null)

	const getItem = async () => {
		try {
			// Get item from database
			let item = await firebase.getItemData(match.params.id)

			// Get item attachments' refs and urls for previews
			const imageURLs = await firebase.batchGetImageURLs(item.attachments)

			// create CustomFile objects with the fetched previewUrls
			const files = item.attachments.map((attachment, i) => {
				return new CustomFile({
					storageRef: attachment,
					previewUrl: imageURLs[i],
					isUploaded: true
				})
			})

			// Format data for the form
			const initialData = formatDataForEditForm(
				item.price,
				item.condition,
				item.description,
				files
			)

			setInitialData(initialData)
		} catch (err) {
			if (error instanceof NotFoundError) {
				setError(err)
			} else {
				throw err
			}
		}
	}

	const onSubmit = async ({ files, price, description, condition }) => {
		try {
			// Upload NEW files and get ALL refs
			const newRefs = await Promise.all(
				files.map(async (file) => {
					// If file already has a ref, return it
					if (file.storageRef) return file.storageRef

					// Upload the new files and return promise containing ref
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			// Format the data
			const data = formatItemDataForDb(
				{ price, description, condition, attachments: newRefs },
				MODE.EDIT
			)

			// Update item
			await firebase.item(match.params.id).update(data)

			// Get just the old refs
			let oldRefs = initialData.files.map((file) => file.storageRef)

			// Old refs no longer present in new refs are marked for deletion
			let refsToDelete = oldRefs.filter((oldRef) => !newRefs.includes(oldRef))

			// Remove files associated with the marked refs
			for (const storageRef of refsToDelete) {
				await firebase.removeFile(storageRef)
				await firebase.removeFile(storageRef + L_THUMB_POSTFIX)
				await firebase.removeFile(storageRef + M_THUMB_POSTFIX)
				await firebase.removeFile(storageRef + S_THUMB_POSTFIX)
			}

			// Redirect to home page
			history.push("/")
			return
		} catch (error) {
			alert("Wystąpił problem podczas edytowania przedmiotu")
			console.log(error)
		}
	}

	useEffect(() => {
		getItem()
	}, [match, authUser])

	return (
		<PageContainer maxWidth={2}>
			{error ? (
				<EmptyState text={error.message} />
			) : !initialData ? (
				<LoadingSpinner />
			) : (
				<EditItemForm initialValues={initialData} onSubmit={onSubmit} />
			)}
		</PageContainer>
	)
}

const condition = (authUser, pathParams) => {
	const isAuthenticated = !!authUser
	if (!isAuthenticated) {
		return
	} else {
		const isAuthorized = authUser.items.includes(pathParams.id)
		return isAuthorized
	}
}

export default compose(
	withAuthentication,
	withRouter,
	withAuthorization(condition)
)(EditItemPage)
