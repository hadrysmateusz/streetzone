import React from "react"
import { Form, Field } from "react-final-form"
import { OnChange } from "react-final-form-listeners"

import Button, { LoaderButton } from "../Button"
import { FieldRow, FieldLabel, StyledInput, StyledTextarea } from "../Basics"
import SelectAdapter from "../SelectAdapter"
import { FormError } from "../FormElements"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"
import validate from "./validate"

import { ITEM_SCHEMA, ROUTES } from "../../constants"

const NewItemForm = ({ initialValues, onSubmit, history, isLoading }) => {
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
						{/* Name */}
						<FieldRow>
							<Field name="name">
								{({ input, meta }) => (
									<>
										<FieldLabel>Nazwa</FieldLabel>
										<StyledInput {...input} type="text" placeholder="Nazwa" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
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
										<FormError message={meta.error} show={meta.error && meta.touched} />
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
										<FormError message={meta.error} show={meta.error && meta.touched} />
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
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Size */}
						<FieldRow>
							<Field name="size">
								{({ input, meta }) => {
									const options = ITEM_SCHEMA.sizeOptions(values.category)
									return (
										<>
											<OnChange name="category">
												{(value, previous) => {
													if (value !== previous) {
														// prevent leaving focus on a disabled field
														form.blur("size")
														// reset the field
														input.onChange(undefined)
													}
												}}
											</OnChange>
											<FieldLabel htmlFor="size-input">Rozmiar</FieldLabel>
											<SelectAdapter
												id="size-input"
												placeholder={"Rozmiar"}
												options={options}
												isClearable={true}
												isSearchable={true}
												isDisabled={
													!values.category ||
													values.category === ITEM_SCHEMA.categories.akcesoria
												}
												{...meta}
												{...input}
											/>
											<FormError meta={meta} />
										</>
									)
								}}
							</Field>
						</FieldRow>

						{/* Condition */}
						<FieldRow>
							<Field name="condition">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="condition-input">Stan</FieldLabel>
										<SelectAdapter
											id="condition-input"
											placeholder={"Stan"}
											options={ITEM_SCHEMA.conditionOptions}
											isClearable={true}
											isSearchable={true}
											{...meta}
											{...input}
										/>
										<FormError meta={meta} />
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
										<FormError message={meta.error} show={meta.error && meta.touched} />
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

export default withRouter(NewItemForm)
