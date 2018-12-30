import React from "react"
import { Form, Field } from "react-final-form"
// import { OnChange } from "react-final-form-listeners"

import Button, { LoaderButton } from "../Button"
import { FieldRow, FieldLabel, StyledInput, StyledTextarea } from "../Basics"
// import SelectAdapter from "../SelectAdapter"
import Error from "./Error"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"

import { /* ITEM_SCHEMA,  */ ROUTES, FORM_ERR, CONST } from "../../constants"

const validate = (values) => {
	const { name, designers, price, category, size, description, files } = values
	const errors = {}

	// Name
	if (!name) {
		errors.name = FORM_ERR.IS_REQUIRED
	}

	// Designers
	if (!designers || designers.length === 0) {
		errors.designers = FORM_ERR.IS_REQUIRED
	}

	// Price
	if (!price) {
		errors.price = FORM_ERR.IS_REQUIRED
	}

	// Category
	if (!category) {
		errors.category = FORM_ERR.IS_REQUIRED
	}

	// Size
	if (!size) {
		errors.size = FORM_ERR.IS_REQUIRED
	}

	// Description
	if (description && description.length > CONST.DESC_MAX_CHARACTERS) {
		errors.description = FORM_ERR.DESC_TOO_LONG
	}

	// Files
	errors.files = (() => {
		let main
		let specific = []

		if (!files || files.length === 0) {
			// Empty field
			main = FORM_ERR.FILES_REQUIRED
		} else {
			// Too many files
			if (files.length > CONST.ATTACHMENTS_MAX_COUNT) {
				main = FORM_ERR.TOO_MANY_FILES
			}
			// Attachment too big
			files.forEach((file, i) => {
				if (file.data.size > CONST.ATTACHMENTS_MAX_SIZE) {
					specific[i] = FORM_ERR.FILE_TOO_BIG
				}
			})
		}
		let errObj = { main, specific }
		return errObj
	})()

	console.log(errors)
	return errors
}

const ItemEditForm = ({ initialValues, onSubmit, history, isLoading }) => {
	if (!initialValues) {
		initialValues = {
			name: "",
			designers: [],
			category: "",
			price: "",
			size: "",
			description: ""
		}
	}
	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						{/* Price */}
						<FieldRow>
							<Field name="price">
								{({ input, meta }) => (
									<>
										<FieldLabel>Cena </FieldLabel>
										<StyledInput
											{...input}
											type="number"
											min="0"
											step="1"
											placeholder="Cena"
										/>
										<Error message={meta.error} showIf={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Description */}
						<FieldRow>
							<Field name="description">
								{({ input, meta }) => (
									<>
										<FieldLabel>Opis </FieldLabel>
										<StyledTextarea {...input} placeholder="Dodatkowe informacje" />
										<Error message={meta.error} showIf={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Files (handled by separate component) */}
						<FieldRow>
							<FieldLabel>Zdjęcia </FieldLabel>
							<Field name="files" isLoading={isLoading} component={FileHandler} />
						</FieldRow>

						<div className="buttons">
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting}
								onClick={() => history.push(ROUTES.HOME)}
							>
								Anuluj
							</Button>
						</div>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

export default withRouter(ItemEditForm)
