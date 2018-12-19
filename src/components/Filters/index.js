import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"

import { LoaderButton } from "../Button"
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

const FilterForm = (props) => (
	<Form
		onSubmit={props.onSubmit}
		className={props.className}
		initialValues={{
			sort: "createdAt-desc"
		}}
		validate={validate}
		render={({ handleSubmit, submitting, invalid, errors, ...rest }) => {
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
					{/* {process.env.NODE_ENV === "development" && (
						<pre>{JSON.stringify(rest.values, 0, 2)}</pre>
					)} */}
				</form>
			)
		}}
	/>
)

export default FilterForm
