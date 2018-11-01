import { Form, Field } from "react-final-form"
import React, { Component } from "react"
import PropTypes from "prop-types"
import Button from "./components/Button"

class ItemForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		initialValues: PropTypes.object
	}

	validate = (data) => {
		console.log(data)
	}

	render() {
		const { onSubmit, validate, initialValues = {} } = this.props

		return (
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
				validate={validate}
				render={({ handleSubmit, submitting, pristine }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>Nazwa </label>
							<Field name="name" component="input" type="text" />
						</div>
						<div>
							<label>Rozmiar </label>
							<Field name="size" component="input" type="text" />
						</div>
						<div>
							<label>Cena </label>
							<Field
								name="price"
								component="input"
								type="number"
								min="0"
								step="1"
								max="99999"
							/>
						</div>
						<div>
							<label>Kategoria </label>
							<Field name="category" component="select" type="select">
								<option />
								<option value="Tee">Tee</option>
								<option value="Buty">Buty</option>
								<option value="Longsleeve">Longsleeve</option>
								<option value="Spodnie">Spodnie</option>
							</Field>
						</div>
						<div>
							{/* TODO: add a better way to select multiple */}
							<label>Projektanci </label>
							<Field name="designers" component="select" type="select" multiple>
								<option value="Adidas">Adidas</option>
								<option value="Givenchy">Givenchy</option>
								<option value="Gucci">Gucci</option>
								<option value="Nike">Nike</option>
								<option value="Off-White">Off-White</option>
								<option value="Supreme">Supreme</option>
							</Field>
						</div>
						<div>
							<label>Opis </label>
							<Field name="description" component="textarea" />
						</div>
						<div className="buttons">
							<Button type="submit" disabled={submitting || pristine}>
								Gotowe
							</Button>
						</div>
					</form>
				)}
			/>
		)
	}
}

export default ItemForm
