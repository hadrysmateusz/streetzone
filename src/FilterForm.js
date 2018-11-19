import React, { Component } from "react"
import itemSchema from "./itemSchema"
import { Form, Field } from "react-final-form"
import LoaderButton from "./components/LoaderButton"
import styles from "./FilterForm.module.scss"
import API from "@aws-amplify/auth"
import errorLog from "./libs/errorLog"

export class FilterForm extends Component {
	state = {
		isLoading: false
	}

	handleSubmit = async (data) => {
		try {
			await API.post("items", "/items/filter", { body: data })
		} catch (e) {
			errorLog(e, "Wystąpił błąd podczas łączenia z serwerem")
		}
	}

	render() {
		return (
			<Form
				onSubmit={this.handleSubmit}
				render={({ handleSubmit, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={styles.outerContainer}>
							<div className={styles.categoryContainer}>
								<div className={styles.categoryHeader}>
									<strong>Kategoria</strong>
								</div>
								<div className={styles.categoryBody}>
									{itemSchema.category.map((categoryName, i) => (
										<div key={i}>
											<label>
												<Field
													name="category"
													component="input"
													type="checkbox"
													value={categoryName}
												/>
												{categoryName}
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
										<div key={i}>
											<label>
												<Field
													name="designers"
													component="input"
													type="checkbox"
													value={designerName}
												/>
												{designerName}
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
										<label>
											<Field
												name="price_min"
												component="input"
												type="number"
												min="0"
												step="1"
												max="99999"
												style={{
													minWidth: "66px",
													padding: "6px 8px",
													maxWidth: "90px",
													marginRight: "8px"
												}}
												placeholder="Od"
											/>
										</label>
										<label>
											<Field
												name="price_max"
												component="input"
												type="number"
												min="0"
												step="1"
												max="99999"
												style={{
													minWidth: "66px",
													padding: "6px 8px",
													maxWidth: "90px"
												}}
												placeholder="Do"
											/>
										</label>
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
									disabled={submitting || pristine}
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
