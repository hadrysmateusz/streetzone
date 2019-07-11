import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"
import { withRouter, Prompt } from "react-router-dom"

import Button, { LoaderButton, ButtonContainer } from "../../components/Button"
import LoadingSpinner from "../../components/LoadingSpinner"
import {
	NumberFF,
	DropdownFF,
	TextareaFF,
	FileHandlerFF
} from "../../components/FinalFormFields"

import { ITEM_SCHEMA, CONST } from "../../constants"

import validate from "./validate"

// const StyledForm = styled.form`
// 	display: grid;
// 	grid-template-columns: 1fr 1fr;
// 	gap: var(--spacing3);
// 	grid-template-areas:
// 		"price condition"
// 		"description description"
// 		"files files";
// `

export const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: 100%;
`

const EditItemForm = ({ onSubmit, initialValues, history }) => {
	return !initialValues ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values, dirty, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0 && dirty && !submitting}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<NumberFF label="Cena" placeholder="Cena" name="price" min="0" step="1" />

						<DropdownFF
							label="Stan"
							placeholder="Stan"
							name="condition"
							options={ITEM_SCHEMA.conditionOptions}
							isSearchable={false}
						/>

						<TextareaFF
							label="Opis"
							placeholder={CONST.ITEM_DESC_PLACEHOLDER}
							name="description"
						/>

						<FileHandlerFF label="Zdjęcia" name="files" />

						<ButtonContainer>
							<LoaderButton
								text="Gotowe"
								type="submit"
								primary
								fullWidth
								isLoading={submitting}
								disabled={submitting || pristine}
							/>
							<Button
								text="Anuluj"
								type="button"
								fullWidth
								disabled={submitting}
								onClick={() => history.goBack()}
							>
								Anuluj
							</Button>
						</ButtonContainer>
					</StyledForm>
				)
			}}
		/>
	)
}

export default withRouter(EditItemForm)
