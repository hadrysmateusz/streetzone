import React from "react"
import Datetime from "react-datetime"
import { Field } from "react-final-form"
import ReactMarkdown from "react-markdown"
import { Prompt } from "react-router-dom"
import shortid from "shortid"
import "react-datetime/css/react-datetime.css"

import { Input } from "../../../../components/FormElements"
import { LiveFileHandler, FileHandlerText } from "../../../../components/FileHandler"
import DropdownFinalform from "../../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../../components/MultiTextInputFinalform"
import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { PageContainer } from "../../../../components/Containers"
import useFirebase from "../../../../hooks/useFirebase"

import {
	StyledForm,
	Section,
	ContentEditorContainer,
	PreviewStyles
} from "./StyledComponents"
import sectionOptions from "./section_options"

const AddPostForm = ({ onSubmit }) => {
	return (
		<StyledForm onSubmit={onSubmit}>
			{({ values, form, submitting, pristine }) => {
				return (
					<>
						<Prompt
							when={Object.values(values).length > 0}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<Section>
							<div className="header">Sekcja</div>
							<Field name="section" type="select">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<DropdownFinalform
											{...input}
											options={sectionOptions}
											placeholder="Sekcja"
											error={error}
										/>
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Zdjęcie</div>
							<Field name="mainImage">
								{({ input, meta }) => {
									return (
										<>
											<LiveFileHandler {...input} error={meta.error} />
										</>
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Treść</div>
							<Field name="mainContent">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									const { value } = input
									return (
										<ContentEditorContainer>
											<FileHandlerText {...input} error={error} />
											<PreviewStyles>
												<ReactMarkdown source={value} escapeHtml={false} />
											</PreviewStyles>
										</ContentEditorContainer>
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Autor</div>
							<Field name="author">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="text" placeholder="Autor" error={error} />
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">
								{values.section && values.section === "Dropy"
									? "Nazwa przedmiotu"
									: "Tytuł"}
							</div>
							<Field name="title">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="text"
											placeholder="Tytuł/Nazwa"
											error={error}
										/>
									)
								}}
							</Field>
						</Section>

						{values.section === "Dropy" && (
							<Section flex>
								<div className="sub-section">
									<div className="header">Data dropu</div>
									<Field name="dropsAtDate">
										{({ input, meta }) => {
											const error = meta.error && meta.touched ? meta.error : null
											return (
												<Datetime
													{...input}
													error={error}
													input={false}
													timeFormat={false}
												/>
											)
										}}
									</Field>
								</div>

								<div className="sub-section">
									<div className="header">Czas dropu</div>
									<Field name="dropsAtTime">
										{({ input, meta }) => {
											const error = meta.error && meta.touched ? meta.error : null
											return (
												<Datetime
													{...input}
													error={error}
													input={false}
													timeFormat="HH:mm"
													dateFormat={false}
												/>
											)
										}}
									</Field>
								</div>
							</Section>
						)}

						<Section>
							<div className="header">Tagi</div>
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
						</Section>

						<ButtonContainer>
							<LoaderButton
								text="Gotowe"
								type="submit"
								big
								fullWidth
								primary
								isLoading={submitting}
								disabled={submitting || pristine}
							/>
						</ButtonContainer>
					</>
				)
			}}
		</StyledForm>
	)
}

const AddPost = () => {
	const firebase = useFirebase()

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
				createdAt: Date.now(),
				editedAt: null,
				title: title.trim(),
				mainContent,
				mainImageRef,
				mainImageURL,
				comments: [],
				tags
			}

			if (author) {
				data.author = author
			}

			if (dropsAt) {
				data.dropsAt = dropsAt.valueOf()
			}

			await firebase.post(id).set(data)

			// Reset form
			actions.reset()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<PageContainer>
			<AddPostForm onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default AddPost
