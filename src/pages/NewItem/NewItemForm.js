import React from "react"
import { Form, Field } from "react-final-form"
import { OnChange } from "react-final-form-listeners"
// import AsyncCreatable from "react-select/lib/AsyncCreatable"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import Button, { LoaderButton } from "../../components/Button"
import { FieldRow } from "../../components/Basics"
import DropdownFinalform from "../../components/DropdownFinalform"
import { Input, Textarea } from "../../components/FormElements"
// import { TextBlock } from "../../components/StyledComponents"
import { FileHandler } from "../../components/FileHandler"

import validate from "./validate"
import { ITEM_SCHEMA, ROUTES, CONST } from "../../constants"

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	grid-template-areas:
		"name name"
		"designers designers"
		"category size"
		"price condition"
		"description description"
		"files files";
`

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
					<StyledForm onSubmit={handleSubmit}>
						{/* Name */}
						<FieldRow gridArea="name">
							<Field name="name">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="text" placeholder="Nazwa" error={error} />
									)
								}}
							</Field>
						</FieldRow>

						{/* Designers */}
						<FieldRow gridArea="designers">
							<Field name="designers" type="select">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<DropdownFinalform
											{...input}
											options={ITEM_SCHEMA.designerOptions}
											isClearable={true}
											isSearchable={true}
											isMulti={true}
											placeholder="Projektanci"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						{/* Category */}
						<FieldRow gridArea="category">
							<Field name="category" type="select">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<DropdownFinalform
											{...input}
											options={ITEM_SCHEMA.categoryOptions}
											isSearchable={true}
											placeholder="Kategoria"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						{/* Size */}
						<FieldRow gridArea="size">
							<Field name="size">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
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
											<DropdownFinalform
												{...input}
												options={options}
												isSearchable={true}
												disabled={
													!values.category ||
													values.category === ITEM_SCHEMA.categories.akcesoria
												}
												placeholder="Rozmiar"
												error={error}
											/>
										</>
									)
								}}
							</Field>
						</FieldRow>

						{/* Price */}
						<FieldRow gridArea="price">
							<Field name="price">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="number"
											min="0"
											step="1"
											placeholder="Cena"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						{/* Condition */}
						<FieldRow gridArea="condition">
							<Field name="condition">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<DropdownFinalform
											{...input}
											options={ITEM_SCHEMA.conditionOptions}
											isClearable={true}
											isSearchable={true}
											placeholder="Stan"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						{/* Description */}
						<FieldRow gridArea="description">
							<Field name="description">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Textarea
											{...input}
											placeholder={CONST.ITEM_DESC_PLACEHOLDER}
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						{/* Files (handled by separate component) */}
						<FieldRow gridArea="files">
							<Field name="files" isLoading={isLoading} component={FileHandler} />
						</FieldRow>

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
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</StyledForm>
				)
			}}
		/>
	)
}

export default withRouter(NewItemForm)
