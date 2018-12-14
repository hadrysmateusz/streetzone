import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import cn from "classnames"

// import LoaderButton from "../LoaderButton"
import { LoaderButton } from "../Button"
import SelectAdapter from "../SelectAdapter"

import styles from "./FilterForm.module.scss"
import { itemSchema } from "../../constants"

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

const FilterForm = (props) => (
	<Form
		onSubmit={props.onSubmit}
		initialValues={{
			sort: "createdAt-desc"
		}}
		render={({ handleSubmit, submitting, pristine, values }) => (
			<form onSubmit={handleSubmit}>
				<div className={styles.outerContainer}>
					{/* SortBy */}
					<div className={styles.categoryContainer}>
						<Field name="sort" type="select">
							{({ input, meta }) => (
								<>
									<div className={styles.categoryHeader}>Sortuj według</div>
									<SelectAdapter
										placeholder={"Sortuj według"}
										options={sortOptions}
										isClearable={false}
										isSearchable={false}
										{...meta}
										{...input}
									/>
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
										<div className={styles.categoryHeader}>Kategoria</div>
										<SelectAdapter
											placeholder={"Kategoria"}
											options={categoryOptions}
											isClearable={true}
											isSearchable={true}
											{...meta}
											{...input}
										/>
									</>
								)}
							</Field>
						</div>

						{/* Designer */}
						<div className={styles.categoryContainer}>
							<Field name="designer" type="select">
								{({ input, meta }) => (
									<>
										<div className={styles.categoryHeader}>Projektant / Marka</div>
										<SelectAdapter
											placeholder={"Marka"}
											options={designerOptions}
											isClearable={true}
											isSearchable={true}
											{...meta}
											{...input}
										/>
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
						</div>
					</div>
				</div>
				<div className={styles.miscContainer}>
					<LoaderButton
						isLoading={submitting}
						type="submit"
						text="Filtruj"
						disabled={submitting || pristine}
						fullWidth
					/>
					{/* {process.env.NODE_ENV === "development" && (
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					)} */}
				</div>
			</form>
		)}
	/>
)

export default FilterForm
