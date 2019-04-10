import React, { useState } from "react"
import shortid from "shortid"
import Datetime from "react-datetime"
import { Form, Field } from "react-final-form"
import styled from "styled-components/macro"
import { OnChange } from "react-final-form-listeners"
import ReactMarkdown from "react-markdown"

import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { PageContainer } from "../../../../components/Containers"
import { Input } from "../../../../components/FormElements"
import { Text } from "../../../../components/StyledComponents"
import { FileHandlerSingle, FileHandlerText } from "../../../../components/FileHandler"
import { Textarea } from "../../../../components/FormElements"
import DropdownFinalform from "../../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../../components/MultiTextInputFinalform"
import useFirebase from "../../../../hooks/useFirebase"

import Wizard from "./WizardForm"
import sectionOptions from "./section_options"
import validate from "./validate"

import "react-datetime/css/react-datetime.css"

const Error = ({ name }) => (
	<Field
		name={name}
		subscribe={{ touched: true, error: true }}
		render={({ meta: { touched, error } }) =>
			touched && error ? <span>{error}</span> : null
		}
	/>
)

const required = (value) => (value ? undefined : "Required")

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const ContentEditorContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing2);
`

const PreviewStyles = styled.div`
	width: 100%;
	margin: 0 auto;
	border: 1px solid var(--gray25);
	padding: var(--spacing2);
	margin-top: var(--spacing2);
`

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
			<Wizard initialValues={{ mainContent: fileContents }} onSubmit={onSubmit}>
				<Wizard.Page
					validate={(values) => {
						const errors = {}
						return errors
					}}
				>
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
					<Field name="mainContent">
						{({ input, meta }) => {
							const error = meta.error && meta.touched ? meta.error : null
							const { value } = input
							return (
								<ContentEditorContainer>
									<FileHandlerText {...input} error={error} />
									<PreviewStyles>
										<ReactMarkdown source={value} />
									</PreviewStyles>
								</ContentEditorContainer>
							)
						}}
					</Field>
				</Wizard.Page>

				<Wizard.Page
					validate={(values) => {
						const errors = {}
						return errors
					}}
				>
					<Field
						name="section"
						subscribe={{ value: true }}
						render={({ input: { value: section } }) => (
							<div>
								{section && section !== "Dropy" && (
									<>
										<Text size="s" bold>
											Autor
										</Text>
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
									</>
								)}

								<Text size="s" bold>
									{section && section === "Dropy" ? "Nazwa przedmiotu" : "Tytuł"}
								</Text>
								<Field name="title">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input {...input} type="text" placeholder="Title" error={error} />
										)
									}}
								</Field>

								{section === "Dropy" && (
									<>
										<Text size="s" bold>
											Data dropu
										</Text>
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

										<Text size="s" bold>
											Czas dropu
										</Text>
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
									</>
								)}

								<Field name="mainImage">
									{({ input, meta }) => {
										return (
											<>
												<FileHandlerSingle {...input} error={meta.error} />
											</>
										)
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
							</div>
						)}
					/>
				</Wizard.Page>
			</Wizard>
		</PageContainer>
	)
}

export default AddPost
