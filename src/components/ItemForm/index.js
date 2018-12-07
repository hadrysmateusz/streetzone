import React from "react"
import { Form, Field } from "react-final-form"

import LoaderButton from "../LoaderButton"
import Button from "../Button"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"

import { itemSchema, ROUTES, FORMS, CONST } from "../../constants"

const validate = (values) => {
	const { name, designers, price, category, size, description, files } = values
	const errors = {}

	// Name
	if (!name) {
		errors.name = FORMS.ERR_IS_REQUIRED
	}

	// Designers
	if (!designers) {
		errors.designers = FORMS.ERR_IS_REQUIRED
	}

	// Price
	if (!price) {
		errors.price = FORMS.ERR_IS_REQUIRED
	}

	// Category
	if (!category) {
		errors.category = FORMS.ERR_IS_REQUIRED
	}

	// Size
	if (!size) {
		errors.size = FORMS.ERR_IS_REQUIRED
	}

	// Description
	if (description.length > 2000) {
		errors.description = FORMS.ERR_DESC_TOO_LONG
	}

	// Files
	errors.files = (() => {
		let main
		let specific = []

		if (!files || files.length === 0) {
			// Empty field
			main = FORMS.ERR_FILES_REQUIRED
		} else {
			// Too many files
			if (files.length > CONST.ATTACHMENTS_MAX_COUNT) {
				main = FORMS.ERR_TOO_MANY_FILES
			}
			// Attachment too big
			files.forEach((file, i) => {
				if (file.data.size > CONST.ATTACHMENTS_MAX_SIZE) {
					specific[i] = FORMS.ERR_FILE_TOO_BIG
				}
			})
		}
		let errObj = { main, specific }
		// console.log(errObj)
		return errObj
	})()

	return errors
}

const ItemForm = ({ initialValues, onSubmit, history }) => {
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
			render={({
				handleSubmit,
				submitting,
				values,
				invalid,
				pristine,
				active
			}) => {
				return (
					<form onSubmit={handleSubmit}>
						{/* Name */}
						<Field name="name">
							{({ input, meta }) => (
								<div>
									<label>Nazwa </label>
									<input {...input} type="text" placeholder="Nazwa" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Designers */}
						<Field name="designers" type="select">
							{({ input, meta }) => (
								<div>
									{/* TODO: add a better way to select multiple */}
									<label>Projektanci </label>
									<select {...input} multiple>
										{itemSchema.designers.map((designerName, i) => (
											<option key={i} value={designerName}>
												{designerName}
											</option>
										))}
									</select>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Price */}
						<Field name="price">
							{({ input, meta }) => (
								<div>
									<label>Cena </label>
									<input
										{...input}
										type="number"
										min="0"
										step="1"
										max="99999"
										placeholder="Cena"
									/>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Category */}
						<Field name="category" type="select">
							{({ input, meta }) => (
								<div>
									{/* TODO: add a better way to select multiple */}
									<label>Kategoria </label>
									<select {...input}>
										{/* this option is to clear the field's default */}
										<option />
										{itemSchema.categories.map((categoryName, i) => (
											<option key={i} value={categoryName}>
												{categoryName}
											</option>
										))}
									</select>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Price */}
						<Field name="size">
							{({ input, meta }) => (
								<div>
									<label>Rozmiar </label>
									<input {...input} type="text" placeholder="Rozmiar" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Price */}
						<Field name="description">
							{({ input, meta }) => (
								<div>
									<label>Opis </label>
									<textarea {...input} placeholder="Opis" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Files (handled by separate component) */}
						<div>
							<label>Zdjęcia </label>
							<Field name="files" component={FileHandler} />
						</div>

						<div className="buttons">
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine || invalid}
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting}
								onClick={() => history.push(ROUTES.HOME)}
							/>
						</div>
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</form>
				)
			}}
		/>
	)
}

export default withRouter(ItemForm)
