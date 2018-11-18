import { Form, Field } from "react-final-form"
import React, { Component } from "react"
import Button from "./components/Button"
import FileHandler from "./FileHandler"
import File from "./File"

class ItemForm extends Component {
	render() {
		const {
			initialValues = {},
			fileItems,
			onSubmit,
			deleteFileItem,
			onFileChange,
			cancel
		} = this.props

		return (
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
				render={({ handleSubmit, submitting, values }) => {
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
								<FileHandler onChange={onFileChange} />
								<ul>
									{fileItems.map((fileItem, i) => (
										<File
											key={i}
											onDelete={deleteFileItem}
											fileItem={fileItem}
										/>
									))}
								</ul>
							</div>
							<div className="buttons">
								<Button type="submit" disabled={submitting}>
									Gotowe
								</Button>
								<Button type="button" disabled={submitting} onClick={cancel}>
									Anuluj
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
