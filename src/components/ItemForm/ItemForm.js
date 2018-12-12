import React from "react"
import { Form, Field } from "react-final-form"

import LoaderButton from "../LoaderButton"
import Button from "../Button"
import Error from "./Error"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"

import { itemSchema, ROUTES, FORM_ERR, CONST } from "../../constants"
import styles from "./ItemForm.module.scss"

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
		// console.log(errObj)
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
								<div className={styles.fieldRow}>
									<label>Nazwa </label>
									<input {...input} type="text" placeholder="Nazwa" />
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Designers */}
						<Field name="designers" type="select">
							{({ input, meta }) => (
								<div className={styles.fieldRow}>
									{/* TODO: add a better way to select multiple */}
									<label>Projektanci </label>
									<select {...input} multiple>
										{itemSchema.designers.map((designerName, i) => (
											<option key={i} value={designerName}>
												{designerName}
											</option>
										))}
									</select>
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Price */}
						<Field name="price">
							{({ input, meta }) => (
								<div className={styles.fieldRow}>
									<label>Cena </label>
									<input
										{...input}
										type="number"
										min="0"
										step="1"
										max="99999"
										placeholder="Cena"
									/>
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Category */}
						<Field name="category" type="select">
							{({ input, meta }) => (
								<div className={styles.fieldRow}>
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
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Size */}
						<Field name="size">
							{({ input, meta }) => (
								<div className={styles.fieldRow}>
									<label>Rozmiar </label>
									<input {...input} type="text" placeholder="Rozmiar" />
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Description */}
						<Field name="description">
							{({ input, meta }) => (
								<div className={styles.fieldRow}>
									<label>Opis </label>
									<textarea {...input} placeholder="Opis" />
									<Error meta={meta} />
								</div>
							)}
						</Field>

						{/* Files (handled by separate component) */}
						<div className={styles.fieldRow}>
							<label>Zdjęcia </label>
							<Field
								name="files"
								isLoading={isLoading}
								component={FileHandler}
							/>
						</div>

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
							/>
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

export default withRouter(ItemForm)
