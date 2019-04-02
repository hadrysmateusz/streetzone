import React from "react"
import shortid from "shortid"
import Datetime from "react-datetime"

import { LoaderButton, ButtonContainer } from "../../../components/Button"
import { Input } from "../../../components/FormElements"
import { Text } from "../../../components/StyledComponents"
import { FileHandlerSingle } from "../../../components/FileHandler"
import { Form, Field } from "react-final-form"
import useFirebase from "../../../hooks/useFirebase"
import { FORM_ERR } from "../../../constants"
import { Textarea } from "../../../components/FormElements"
import DropdownFinalform from "../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../components/MultiTextInputFinalform"

import "react-datetime/css/react-datetime.css"

const sectionOptions = [
	{
		value: "Wiedza",
		label: "Wiedza"
	},
	{
		value: "Dropy",
		label: "Dropy"
	},
	{
		value: "Artykuły",
		label: "Artykuły"
	}
]

const AddPost = () => {
	const firebase = useFirebase()

	const onSubmit = async (
		{ section, mainImage, title, author, mainContent, dropsAt },
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
				comments: []
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

	const validate = ({ author, title, section, mainContent, mainImage, dropsAt }) => {
		const errors = {}

		if (!title) {
			errors.title = FORM_ERR.IS_REQUIRED
		}

		if (!section) {
			errors.section = FORM_ERR.IS_REQUIRED
		} else {
			if (section !== "drops" && !author) {
				errors.author = FORM_ERR.IS_REQUIRED
			}
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

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
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
						{values.section !== "drops" && (
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

						<Field name="mainImage" component={FileHandlerSingle} />

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
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

export default AddPost
