import React from "react"
import { Form, Field } from "react-final-form"
import cn from "classnames"

import { LoaderButton } from "../Button"
import SelectAdapter from "../SelectAdapter"
import { Error } from "../ItemForm"

import styles from "./FilterForm.module.scss"
import { itemSchema, FORM_ERR, CONST } from "../../constants"

const sortOptions = [
	{ value: "createdAt-desc", label: "Najnowsze" },
	{ value: "price-asc", label: "Cena Rosnąco" },
	{ value: "price-desc", label: "Cena Malejąco" }
]

const categoryOptions = itemSchema.categories.map((categoryName, i) => ({
	value: categoryName,
	label: categoryName
}))

const designerOptions = itemSchema.designers.map((designerName, i) => ({
	value: designerName,
	label: designerName
}))

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
		initialValues={{
			sort: "createdAt-desc"
		}}
		validate={validate}
		render={({
			handleSubmit,
			submitting,
			pristine,
			invalid,
			errors,
			values,
			...rest
		}) => {
			return (
				<form onSubmit={handleSubmit}>
					<div className={styles.outerContainer}>
						{/* SortBy */}
						<div className={styles.categoryContainer}>
							<Field name="sort" type="select">
								{({ input, meta }) => (
									<>
										<label htmlFor="sort-input" className={styles.categoryHeader}>
											Sortuj według
										</label>
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
						</div>

						<div className={styles.filtersContainer}>
							{/* Category */}
							<div className={styles.categoryContainer}>
								<Field name="category" type="select">
									{({ input, meta }) => (
										<>
											<label htmlFor="category-input" className={styles.categoryHeader}>
												Kategoria
											</label>
											<SelectAdapter
												id="category-input"
												placeholder={"Kategoria"}
												options={categoryOptions}
												isClearable={true}
												isSearchable={true}
												{...meta}
												{...input}
											/>
											<Error meta={meta} />
										</>
									)}
								</Field>
							</div>

							{/* Designer */}
							<div className={styles.categoryContainer}>
								<Field name="designer" type="select">
									{({ input, meta }) => (
										<>
											<label htmlFor="designer-input" className={styles.categoryHeader}>
												Projektant / Marka
											</label>
											<SelectAdapter
												id="designer-input"
												placeholder={"Marka"}
												options={designerOptions}
												isClearable={true}
												isSearchable={true}
												{...meta}
												{...input}
											/>
											<Error meta={meta} />
										</>
									)}
								</Field>
							</div>

							{/* Price */}
							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Cena</strong>
								</div>
								<div className={cn(styles.categoryBody, styles.priceInputBody)}>
									<Field
										name="price_min"
										className={styles.priceInput}
										component="input"
										type="number"
										min="0"
										step="1"
										max="99999"
										style={{ marginRight: "8px" }}
										placeholder="Od"
									/>
									<Field
										name="price_max"
										className={styles.priceInput}
										component="input"
										type="number"
										min="0"
										step="1"
										max="99999"
										placeholder="Do"
									/>
								</div>
								<Error meta={{ error: errors.price, touched: true }} />
							</div>
						</div>
					</div>
					<div className={styles.miscContainer}>
						<LoaderButton
							isLoading={submitting}
							type="submit"
							text="Filtruj"
							disabled={submitting || invalid}
							fullWidth
						/>
					</div>
				</form>
			)
		}}
	/>
)

export default FilterForm
