import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import shortid from "shortid"
import Datetime from "react-datetime"
import { Form, Field } from "react-final-form"

import { TextBlock, Text } from "../../../components/StyledComponents"
import { LoaderButton, ButtonContainer } from "../../../components/Button"
import { FileHandlerSingle, CustomFile } from "../../../components/FileHandler"
import useFirebase from "../../../hooks/useFirebase"
import { Textarea, Input } from "../../../components/FormElements"
import MultiTextInputFinalform from "../../../components/MultiTextInputFinalform"

import "react-datetime/css/react-datetime.css"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { FORM_ERR } from "../../../constants"

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

	console.log(errors)
	return errors
}

const BlogEdit = ({ match }) => {
	const firebase = useFirebase()
	const [item, setItem] = useState(null)

	const id = match.params.id

	const getData = async () => {
		const snap = await firebase.post(id).get()

		let data = snap.data()

		// create CustomFile objects with the fetched previewUrls
		const file = new CustomFile({
			ref: data.mainImageRef,
			previewUrl: data.mainImageURL,
			isUploaded: true
		})

		data.mainImage = file

		setItem(data)
	}

	useEffect(() => {
		getData()
	}, [id])

	const onSubmit = async (
		{ section, mainImage, title, author, mainContent, dropsAt },
		actions
	) => {
		try {
			let mainImageRef = mainImage.ref
			let mainImageURL = mainImage.previewUrl

			if (!mainImage.ref) {
				const imageId = shortid.generate()
				const mainImageSnap = await firebase.uploadFile(
					`blog-photos/${imageId}`,
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

			// remove the old image
			await firebase.removeFile(item.mainImageRef)

			// Reset form
			actions.reset()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<>
			<TextBlock size="xl" bold>
				Blog
			</TextBlock>

			<TextBlock size="m" color="gray0">
				Editing {id} <b>{item && `(${item.section} - ${item.title})`}</b>
			</TextBlock>

			{!item ? (
				<LoadingSpinner fixedHeight />
			) : (
				<Form
					initialValues={item}
					onSubmit={onSubmit}
					validate={validate}
					render={({ handleSubmit, submitting, pristine, form, values }) => {
						return (
							<form onSubmit={handleSubmit}>
								{values.section && values.section !== "Dropy" && (
									<Field name="author">
										{({ input, meta }) => {
											const error = meta.error && meta.touched ? meta.error : null
											return (
												<Input
													{...input}
													type="text"
													placeholder="Author"
													error={error}
												/>
											)
										}}
									</Field>
								)}

								<Field name="title">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input {...input} type="text" placeholder="Title" error={error} />
										)
									}}
								</Field>

								<Field name="mainContent">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Textarea
												{...input}
												placeholder="Main text content"
												error={error}
											/>
										)
									}}
								</Field>

								{values.section === "drops" && (
									<>
										<Text size="m" bold>
											Data dropu
										</Text>
										<Field name="dropsAt">
											{({ input, meta }) => {
												const error = meta.error && meta.touched ? meta.error : null
												return (
													<Datetime
														{...input}
														error={error}
														input={false}
														timeFormat="HH:mm"
													/>
												)
											}}
										</Field>
									</>
								)}

								<Field name="mainImage">
									{({ input, meta }) => {
										return <FileHandlerSingle {...input} />
									}}
								</Field>

								<Field name="tags" type="select">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<MultiTextInputFinalform
												{...input}
												placeholder="Tagi"
												error={error}
											/>
										)
									}}
								</Field>

								<ButtonContainer centered>
									<LoaderButton
										text="Gotowe"
										type="submit"
										isLoading={submitting}
										disabled={submitting || pristine}
										primary
									/>
								</ButtonContainer>
								{process.env.NODE_ENV === "development" && (
									<pre>{JSON.stringify(values, 0, 2)}</pre>
								)}
							</form>
						)
					}}
				/>
			)}
		</>
	)
}

export default withRouter(BlogEdit)
