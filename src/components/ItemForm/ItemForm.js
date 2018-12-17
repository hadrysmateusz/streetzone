import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"

import Button, { LoaderButton } from "../Button"
import { Container, FieldRow, FieldLabel, Separator, StyledInput } from "../Basics"
import SelectAdapter from "../SelectAdapter"
import Error from "./Error"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"

import { ITEM_SCHEMA, ROUTES, FORM_ERR, CONST } from "../../constants"

const Textarea = styled.textarea`
	padding: 6px 8px;
	width: 100%;
	height: 150px;
`

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
	if (description.length > 2000) {
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

const ItemForm = ({ initialValues, onSubmit, history, isLoading }) => {
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
			render={({ handleSubmit, submitting, pristine, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						{/* Name */}
						<FieldRow>
							<Field name="name">
								{({ input, meta }) => (
									<>
										<FieldLabel>Nazwa</FieldLabel>
										<StyledInput {...input} type="text" placeholder="Nazwa" />
										<Error meta={meta} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Designer */}
						<FieldRow>
							<Field name="designers" type="select">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="designer-input">Projektanci</FieldLabel>
										<SelectAdapter
											id="designer-input"
											placeholder={"Projektanci"}
											options={ITEM_SCHEMA.designerOptions}
											isClearable={true}
											isSearchable={true}
											isMulti={true}
											{...meta}
											{...input}
										/>
										<Error meta={meta} />
									</>
								)}
							</Field>
						</FieldRow>

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
										<Error meta={meta} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Category */}
						<FieldRow>
							<Field name="category" type="select">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="category-input">Kategoria</FieldLabel>
										<SelectAdapter
											id="category-input"
											placeholder={"Kategoria"}
											options={ITEM_SCHEMA.categoryOptions}
											isClearable={true}
											isSearchable={true}
											{...meta}
											{...input}
										/>
										<Error meta={meta} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Size */}
						<FieldRow>
							<Field name="size">
								{({ input, meta }) => (
									<>
										<FieldLabel>Rozmiar </FieldLabel>
										<StyledInput {...input} type="text" placeholder="Rozmiar" />
										<Error meta={meta} />
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
										<Textarea {...input} placeholder="Opis" />
										<Error meta={meta} />
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
							<pre>{JSON.stringify(rest.values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

export default withRouter(ItemForm)
