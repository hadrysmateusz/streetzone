import React from "react"
import { Prompt } from "react-router-dom"
import { Form } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import {
	TextFF,
	DropdownFF,
	LiveFileHandlerFF,
	MarkdownEditorFF,
	MultiTextInputFF,
	TextareaFF
} from "../../../components/FinalFormFields"

import { CONST } from "../../../constants"

import categoryOptions from "./post_category_options"
import { StyledForm } from "../Common"

export default ({ onSubmit, initialValues, edit }) => {
	return !initialValues && edit ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
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
