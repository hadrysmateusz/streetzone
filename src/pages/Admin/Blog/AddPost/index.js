import React, { useState } from "react"
import shortid from "shortid"
import Datetime from "react-datetime"
import { Form, Field } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { Input } from "../../../../components/FormElements"
import { Text } from "../../../../components/StyledComponents"
import { FileHandlerSingle } from "../../../../components/FileHandler"
import { Textarea } from "../../../../components/FormElements"
import DropdownFinalform from "../../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../../components/MultiTextInputFinalform"
import useFirebase from "../../../../hooks/useFirebase"

import sectionOptions from "./section_options"
import validate from "./validate"

import "react-datetime/css/react-datetime.css"

const AddPost = () => {
	const firebase = useFirebase()
	const [fileContents, setFileContents] = useState()

	const onSubmit = async (
		{ section, mainImage, title, author, mainContent, dropsAt, tags },
		actions
	) => {
		try {
			const id = shortid.generate()
			const imageId = shortid.generate()

			const mainImageSnap = await firebase.uploadFile(
				`blog-photos/${imageId}`,
				mainImage.data
			)
			const mainImageRef = mainImageSnap.ref.fullPath
			const mainImageURL = await firebase.getImageURL(mainImageRef)

			let data = {
				id,
				section,
				title: title.trim(),
				mainContent,
				mainImageRef,
				mainImageURL,
				createdAt: Date.now(),
				editedAt: null,
				comments: [],
				tags
			}

			if (author) {
				data.author = author
			}

			if (dropsAt) {
				data.dropsAt = dropsAt.valueOf()
				// debugger
			}

			await firebase.post(id).set(data)

			// Reset form
			actions.reset()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	const uploadFile = (e) => {
		const file = e.currentTarget.files[0]
		if (file) {
			const reader = new FileReader()
			reader.addEventListener("loadend", () => {
				setFileContents(reader.result)
				console.log(reader.result)
			})

			reader.readAsText(file)
		}
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			initialValues={{ mainContent: fileContents }}
			render={({ handleSubmit, submitting, pristine, form, values }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="section" type="select">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<DropdownFinalform
										{...input}
										options={sectionOptions}
										placeholder="Section"
										error={error}
									/>
								)
							}}
						</Field>
						{values.section && values.section !== "Dropy" && (
							<Field name="author">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="text" placeholder="Author" error={error} />
									)
								}}
							</Field>
						)}

						<Field name="title">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return <Input {...input} type="text" placeholder="Title" error={error} />
							}}
						</Field>

						<Field name="mainContent">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<Textarea {...input} placeholder="Main text content" error={error} />
								)
							}}
						</Field>

						{values.section === "Dropy" && (
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
								return (
									<>
										<FileHandlerSingle {...input} error={meta.error} />
										<input type="file" onChange={uploadFile} />
									</>
								)
							}}
						</Field>

						<Field name="tags" type="select">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<MultiTextInputFinalform {...input} placeholder="Tagi" error={error} />
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
	)
}

export default AddPost
