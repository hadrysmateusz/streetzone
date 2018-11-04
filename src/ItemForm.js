import { Form, Field } from "react-final-form"
import React, { Component } from "react"
import PropTypes from "prop-types"
import Button from "./components/Button"
import FileHandler from "./FileHandler"
import filesize from "filesize"

class ItemForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		onFileChange: PropTypes.func.isRequired,
		initialValues: PropTypes.object,
		files: PropTypes.array
	}

	validate = (data) => {
		console.log("validating")
	}

	render() {
		const { onSubmit, validate, initialValues = {} } = this.props
		console.log(this.props.files)

		return (
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
				validate={validate}
				render={({ handleSubmit, submitting, pristine, values }) => {
					return (
						<form onSubmit={handleSubmit}>
							<div>
								<label>Nazwa </label>
								<Field name="name" component="input" type="text" />
							</div>
							<div>
								{/* TODO: add a better way to select multiple */}
								<label>Projektanci </label>
								<Field
									name="designers"
									component="select"
									type="select"
									multiple
								>
									<option value="Adidas">Adidas</option>
									<option value="Givenchy">Givenchy</option>
									<option value="Gucci">Gucci</option>
									<option value="Nike">Nike</option>
									<option value="Off-White">Off-White</option>
									<option value="Supreme">Supreme</option>
								</Field>
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
								<label>Rozmiar </label>
								<Field name="size" component="input" type="text" />
							</div>
							<div>
								<label>Opis </label>
								<Field name="description" component="textarea" />
							</div>
							<div>
								<label>Zdjęcia </label>
								<FileHandler onChange={this.props.onFileChange} />
								<ul>
									{this.props.files.map((file, i) => (
										<li key={i}>
											<img src={file.preview} height={120} alt="" />
											{file.name} - {filesize(file.size)}
										</li>
									))}
								</ul>
							</div>
							<div>
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							</div>
							<div className="buttons">
								<Button type="submit" disabled={submitting || pristine}>
									Gotowe
								</Button>
							</div>
						</form>
					)
				}}
			/>
		)
	}
}

export default ItemForm
