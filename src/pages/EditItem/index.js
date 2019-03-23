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

const formatDataForEditForm = (price, description, files) => ({
	price: Number.parseInt(price),
	description: description || "",
	files: files,
	modifiedAt: Date.now()
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
			const files = item.attachments.map((attachment, i) => {
				return new CustomFile({
					ref: attachment,
					previewUrl: imageURLs[i],
					isUploaded: true
				})
			})

			// Format data for the form
			const initialData = formatDataForEditForm(item.price, item.description, files)

			setInitialData(initialData)
		} catch (err) {
			if (error instanceof NotFoundError) {
				setError(err)
			} else {
				throw err
			}
		}
	}

	const onSubmit = async (values) => {
		try {
			const files = values.files

			// Upload NEW files and get ALL refs
			const newRefs = await Promise.all(
				files.map(async (file) => {
					// If file already has a ref, return it
					if (file.ref) return file.ref

					// Upload the new files and return promise containing ref
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			// Format the data
			const data = formatDataForEditForm(values.price, values.description, files)

			// TODO: add a check against an external schema to make sure all values are present

			// Update item
			await firebase.item(match.params.id).update(data)

			// Get just the old refs
			let oldRefs = initialData.files.map((file) => file.ref)

			// Old refs no longer present in new refs are marked for deletion
			let refsToDelete = oldRefs.filter((oldRef) => !newRefs.includes(oldRef))

			// Remove files associated with the marked refs
			await firebase.batchRemoveFiles(refsToDelete)

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
		console.log(pathParams, pathParams.id)
		const isAuthorized = authUser.items.includes(pathParams.id)
		return isAuthorized
	}
}

export default compose(
	withAuthentication,
	withRouter,
	withAuthorization(condition)
)(EditItemPage)
