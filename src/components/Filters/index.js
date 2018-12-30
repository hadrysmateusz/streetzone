import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import { OnChange } from "react-final-form-listeners"

import Button, { LoaderButton } from "../Button"
import { FieldLabel, FieldRow, StyledInput } from "../Basics"
import SelectAdapter from "../SelectAdapter"
import { Error } from "../ItemForm"

import { ITEM_SCHEMA, FORM_ERR } from "../../constants"

const sortOptions = [
	{ value: "createdAt-desc", label: "Najnowsze" },
	{ value: "price-asc", label: "Cena Rosnąco" },
	{ value: "price-desc", label: "Cena Malejąco" }
]

const PriceInputContainer = styled.div`
	display: flex;
`

const validate = (values) => {
	const { price_min, price_max } = values
	const errors = {}

	if (price_min && price_max) {
		if (+price_max < +price_min) {
			errors.price = FORM_ERR.PRICE_MAX_LOWER_THAN_MIN
		}
	}

	return errors
}

// const Condition = ({ when, is, children }) =>
// 	Array.isArray(is) ? (
// 		<Field name={when} subscription={{ value: true }}>
// 			{({ input: { value } }) => (is.includes(value) ? children : null)}
// 		</Field>
// 	) : (
// 		<Field name={when} subscription={{ value: true }}>
// 			{({ input: { value } }) => (value === is ? children : null)}
// 		</Field>
// 	)

const FilterForm = (props) => (
	<Form
		onSubmit={props.onSubmit}
		className={props.className}
		initialValues={props.initialValues}
		validate={validate}
		render={({ form, handleSubmit, submitting, invalid, errors, values, ...rest }) => {
			return (
				<form onSubmit={handleSubmit}>
					<div className="outer-container">
						{/* SortBy */}
						<FieldRow>
							<Field name="sort" type="select">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="sort-input">Sortuj według</FieldLabel>
										<SelectAdapter
											id="sort-input"
											placeholder={"Sortuj według"}
											options={sortOptions}
											isClearable={false}
											isSearchable={false}
											{...meta}
											{...input}
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
												{...meta}
												{...input}
											/>
											<Error meta={meta} />
										</>
									)
								}}
							</Field>
						</FieldRow>

						{/* Designer */}
						<FieldRow>
							<Field name="designer" type="select">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="designer-input">Projektant / Marka</FieldLabel>
										<SelectAdapter
											id="designer-input"
											placeholder={"Marka"}
											options={ITEM_SCHEMA.designerOptions}
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

						{/* MULTIPLE RANGE FILTERS REQUIRE QUERY MERGING :C */}
						{/* Min Condition */}
						{/* <FieldRow>
							<Field name="condition">
								{({ input, meta }) => (
									<>
										<FieldLabel htmlFor="condition-input">
											Minimalny stan
										</FieldLabel>
										<SelectAdapter
											id="condition-input"
											placeholder={"Stan"}
											options={ITEM_SCHEMA.conditionOptions}
											isClearable={true}
											isSearchable={true}
											{...meta}
											{...input}
										/>
										<Error meta={meta} />
									</>
								)}
							</Field>
						</FieldRow> */}

						{/* Price */}
						<FieldRow>
							<FieldLabel as="div">Cena</FieldLabel>
							<PriceInputContainer>
								{/* Price Min */}
								<Field name="price_min">
									{({ input }) => (
										<StyledInput
											{...input}
											type="number"
											min="0"
											step="1"
											max="99999"
											placeholder="Od"
											style={{ marginRight: "8px" }}
										/>
									)}
								</Field>
								{/* Price Max */}
								<Field name="price_max">
									{({ input }) => (
										<StyledInput
											{...input}
											type="number"
											min="0"
											step="1"
											max="99999"
											placeholder="Do"
										/>
									)}
								</Field>
							</PriceInputContainer>
							<Error message={errors.price} showIf={!!errors.price} />
						</FieldRow>
					</div>
					<LoaderButton
						isLoading={submitting}
						type="submit"
						text="Filtruj"
						disabled={submitting || invalid}
						fullWidth
					/>

					<Button
						type="button"
						disabled={false}
						onClick={() => props.onReset(form)}
						fullWidth
					>
						Wyczyść filtry
					</Button>
					{/* {process.env.NODE_ENV === "development" && (
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					)} */}
				</form>
			)
		}}
	/>
)

export default FilterForm
