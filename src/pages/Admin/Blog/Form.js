import React from "react"
import { Form } from "react-final-form"

import BlackBox from "../../../components/BlackBox"
import { LoaderButton, ButtonContainer } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import PreventFormTransition from "../../../components/PreventFormTransition"
import {
	TextFF,
	DropdownFF,
	LiveFileHandlerFF,
	MarkdownEditorFF,
	TextareaFF,
	TagsInputFF
} from "../../../components/FinalFormFields"

import { CONST } from "../../../constants"

import categoryOptions from "./postCategoryOptions"
import authorOptions from "./authorOptions"
import { StyledForm } from "../Common"

export default ({ onSubmit, initialValues, edit, postId }) => {
	// use postId to group images by the post they belong to
	const imagesPath = `${CONST.STORAGE_BUCKET_BLOG_ATTACHMENTS}/${postId}`

	return !initialValues && edit ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ handleSubmit, submitting, pristine, values }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<PreventFormTransition />

						<DropdownFF label="Autor" name="author" options={authorOptions} />

						<TextFF label="Tytuł" placeholder="Tytuł" name="title" />

						<DropdownFF
							label="Kategoria"
							name="category"
							options={categoryOptions}
							isSearchable={false}
						/>

						<LiveFileHandlerFF label="Zdjęcia" name="files" uploadPath={imagesPath} />

						<BlackBox>
							Pamiętaj usunąć nieużyte zdjęcia przed opuszczeniem strony
						</BlackBox>

						<MarkdownEditorFF label="Treść" name="mainContent" />

						<TextareaFF
							label="Streszczenie"
							placeholder="Krótkie streszczenie zachęcające do przeczytania. Ewentualnie pierwsze zdanie lub dwa."
							name="excerpt"
						/>

						<TagsInputFF label="Tagi" placeholder="Tagi" name="tags" disabled />

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
