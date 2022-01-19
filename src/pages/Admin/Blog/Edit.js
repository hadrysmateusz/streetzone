import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import { PageContainer } from "../../../components/Containers"

import { FORM_ERR, CONST } from "../../../constants"
import { useFlash, useFirebase, useInitialValues } from "../../../hooks"

import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"

import PostForm from "./Form"

const validate = ({ author, title, section, mainContent, mainImage, dropsAt }) => {
	const errors = {}

	if (!title) {
		errors.title = FORM_ERR.IS_REQUIRED
	}

	if (!mainContent) {
		errors.mainContent = FORM_ERR.IS_REQUIRED
	}

	if (!mainImage) {
		errors.mainImage = FORM_ERR.IS_REQUIRED
	}

	console.warn(errors)
	return errors
}

const imagesConfig = [{ key: "attachments", name: "images" }]

const EditPost = ({ match }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const postId = match.params.id
	const initialValues = useInitialValues(`posts/${postId}`, imagesConfig)

	const id = match.params.id

	const onSubmit = async (
		{ section, mainImage, title, author, mainContent, dropsAt },
		form
	) => {
		try {
			let mainImageRef = mainImage.storageRef
			let mainImageURL = mainImage.previewUrl

			if (!mainImage.storageRef) {
				const mainImageSnap = await firebase.uploadFile(
					CONST.STORAGE_BUCKET_BLOG_ATTACHMENTS,
					mainImage.data
				)
				mainImageRef = mainImageSnap.ref.fullPath
				mainImageURL = await firebase.getImageURL(mainImageRef)
			}

			let data = {
				section,
				title: title.trim(),
				mainContent,
				mainImageRef,
				mainImageURL,
				editedAt: Date.now(),
				comments: []
			}
			if (author) {
				data.author = author
			}
			if (dropsAt) {
				data.dropsAt = dropsAt.valueOf()
			}

			await firebase.post(id).update(data)

			// Reset form
			setTimeout(form.reset)
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
			<PostForm onSubmit={onSubmit} postId={postId} initialValues={initialValues} />
		</PageContainer>
	)
}

export default withRouter(EditPost)
