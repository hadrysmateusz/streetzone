import React, { Component } from "react"
import itemSchema from "./itemSchema"
import { Form, Field } from "react-final-form"
import LoaderButton from "./components/LoaderButton"
import styles from "./FilterForm.module.scss"

export class FilterForm extends Component {
	state = {
		isLoading: false
	}

	render() {
		return (
			<Form
				onSubmit={this.props.onSubmit}
				initialValues={{
					sort: "date-DESC"
				}}
				render={({ handleSubmit, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={styles.outerContainer}>
							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Sortuj według</strong>
								</div>
								<div className={styles.categoryBody}>
									<Field
										name="sort"
										component="select"
										className={styles.sortInput}
									>
										<option value="date-DESC">Najnowsze</option>
										<option value="date-ASC">Najstarsze</option>
										<option value="price-ASC">Cena Rosnąco</option>
										<option value="price-DESC">Cena Malejąco</option>
									</Field>
								</div>
							</div>

							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Kategoria</strong>
								</div>
								<div className={styles.categoryBody}>
									{itemSchema.category.map((categoryName, i) => (
										<div
											key={i}
											className={styles.filterItem}
											title={categoryName}
										>
											<label>
												<Field
													name="category"
													component="input"
													type="radio"
													value={categoryName}
												/>
												<span>{categoryName}</span>
											</label>
										</div>
									))}
								</div>
							</div>

							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Projektanci</strong>
								</div>
								<div className={styles.categoryBody}>
									{itemSchema.designers.map((designerName, i) => (
										<div
											key={i}
											className={styles.filterItem}
											title={designerName}
										>
											<label>
												<Field
													name="designers"
													component="input"
													type="checkbox"
													value={designerName}
												/>
												<span>{designerName}</span>
											</label>
										</div>
									))}
								</div>
							</div>

							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Cena</strong>
								</div>
								<div className={styles.categoryBody}>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start"
										}}
									>
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
						<div>
							<div className={styles.miscContainer}>
								<LoaderButton
									isLoading={this.state.isLoading}
									type="submit"
									text="Filtruj"
									disabled={submitting}
								/>
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							</div>
						</div>
					</form>
				)}
			/>
		)
	}
}

export default FilterForm
