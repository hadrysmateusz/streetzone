import React from "react"
import { Prompt } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"
import "react-datetime/css/react-datetime.css"

import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { PageContainer } from "../../../../components/Containers"
import DisplayJSONButton from "../../../../components/DisplayJSONButton"
import useFirebase from "../../../../hooks/useFirebase"
import { formatPostDataForDb, MODE } from "../../../../utils/formatting/formatPostData"
import { ROUTES, CONST } from "../../../../constants"

import categoryOptions from "./category_options"
import {
	TextFF,
	DropdownFF,
	LiveFileHandlerFF,
	MarkdownEditorFF,
	MultiTextInputFF,
	TextareaFF
} from "../FinalFormFields"
import { StyledForm } from "../StyledComponents"

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

						<TextFF label="Autor" placeholder="Autor" name="author" />

						<TextFF label="Tytuł" placeholder="Tytuł" name="title" />

						<DropdownFF label="Kategoria" name="category" options={categoryOptions} />

						<LiveFileHandlerFF
							label="Zdjęcia"
							name="files"
							uploadPath={CONST.STORAGE_BUCKET_BLOG_ATTACHMENTS}
						/>

						<MarkdownEditorFF label="Treść" name="mainContent" />

						<TextareaFF
							label="Streszczenie"
							placeholder="Krótkie streszczenie zachęcające do przeczytania. Ewentualnie pierwsze zdanie lub dwa."
							name="excerpt"
						/>

						<MultiTextInputFF
							label="Tagi"
							placeholder="Tagi (zatwierdzaj Enterem)"
							name="tags"
						/>

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
							<DisplayJSONButton big values={values} />
						</ButtonContainer>
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
