import React from "react"
import { Prompt } from "react-router-dom"
import { Form } from "react-final-form"

import { LoaderButton, ButtonContainer } from "../../../components/Button"
import DisplayJSONButton from "../../../components/DisplayJSONButton"
import LoadingSpinner from "../../../components/LoadingSpinner"
import {
	TextFF,
	FileHandlerSingleFF,
	TextareaFF
} from "../../../components/FinalFormFields"

import { StyledForm } from "../Common"

export default ({ onSubmit, initialValues, edit }) =>
	!initialValues && edit ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0 && !pristine}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<TextFF label="Tytuł" placeholder="Tytuł" name="title" />

						<TextareaFF
							label="Opis"
							placeholder="Gdzie, jak, ile itd."
							name="description"
						/>

						<TextFF
							label="Wartość"
							placeholder="Cena lub przecena"
							name="value"
							info={'Razem z walutą lub znakami "-" i "%"'}
						/>

						<TextFF
							label="Link"
							placeholder="Affiliate lub zwykły link do strony promocji"
							name="link"
						/>

						<FileHandlerSingleFF label="Zdjęcie" name="file" />

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
