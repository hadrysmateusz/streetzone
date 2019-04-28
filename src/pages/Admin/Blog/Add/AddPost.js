import React from "react"
import { Field } from "react-final-form"
import ReactMarkdown from "react-markdown"
import { Prompt } from "react-router-dom"
import "react-datetime/css/react-datetime.css"
import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"

import { Input, Textarea } from "../../../../components/FormElements"
import { LiveFileHandler, FileHandlerText } from "../../../../components/FileHandler"
import DropdownFinalform from "../../../../components/DropdownFinalform"
import MultiTextInputFinalform from "../../../../components/MultiTextInputFinalform"
import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { PageContainer } from "../../../../components/Containers"
import useFirebase from "../../../../hooks/useFirebase"
import { formatPostDataForDb, MODE } from "../../../../utils/formatting/formatPostData"
import { ROUTES } from "../../../../constants"

import {
	StyledForm,
	Section,
	ContentEditorContainer,
	PreviewStyles
} from "./StyledComponents"
import categoryOptions from "./category_options"

const AddPostForm = ({ onSubmit }) => {
	return (
		<Form
			onSubmit={onSubmit}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

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
							<div className="header">Tytuł</div>
							<Field name="title">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="text" placeholder="Tytuł" error={error} />
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Kategoria</div>
							<Field name="category" type="select">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<DropdownFinalform
											{...input}
											options={categoryOptions}
											placeholder="Kategoria"
											error={error}
										/>
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Zdjęcia</div>
							<Field name="files">
								{({ input, meta }) => {
									return (
										<LiveFileHandler
											{...input}
											uploadPath="blog-attachments"
											error={meta.error}
										/>
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
							<div className="header">Streszczenie</div>
							<Field name="excerpt">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Textarea
											{...input}
											placeholder="Krótkie streszczenie zachęcające do przeczytania. Ewentualnie pierwsze zdanie lub dwa."
											error={error}
										/>
									)
								}}
							</Field>
						</Section>

						<Section>
							<div className="header">Tagi</div>
							<Field name="tags" type="select">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<MultiTextInputFinalform
											{...input}
											placeholder="Tagi (zatwierdzaj Enterem)"
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

						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</StyledForm>
				)
			}}
		/>
	)
}

const AddPost = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			const files = values.files

			// Get attachments' refs
			const attachments = files.map((file) => file.ref)

			// Get attachments' urls
			const imageUrls = files.map((file) => file.url)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatPostDataForDb(
				{ ...values, mainImageIndex, attachments, imageUrls },
				MODE.CREATE
			)

			// Add post to database
			await firebase.post(formattedData.id).set(formattedData)

			// Reset form
			actions.reset()

			// Redirect
			history.push(ROUTES.ADMIN_BLOG)
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

export default withRouter(AddPost)
