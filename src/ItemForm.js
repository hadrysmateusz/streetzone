import { Form, Field } from "react-final-form"
import React from "react"

export default ({ onSubmit, validate, initialValues }) => (
	<Form
		onSubmit={onSubmit}
		initialValues={{}}
		render={({ handleSubmit, submitting, pristine, values }) => (
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nazwa</label>
					<Field name="name" component="input" type="text" />
				</div>
				<div>
					<label>Rozmiar</label>
					<Field name="size" component="input" type="text" />
				</div>
				<div>
					<label>Cena</label>
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
					<label>Kategoria</label>
					<Field name="category" component="select" type="select" disabled>
						<option />
						<option value="Tee">Tee</option>
						<option value="Buty">Buty</option>
						<option value="Longsleeve">Longsleeve</option>
						<option value="Spodnie">Spodnie</option>
					</Field>
				</div>
				<div>
					{/* TODO: add a better way to select multiple */}
					<label>Projektanci</label>
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
					<label>Opis</label>
					<Field name="description" component="textarea" />
				</div>
				<div className="buttons">
					<button type="submit" disabled={submitting || pristine}>
						Gotowe
					</button>
				</div>
				<pre>{JSON.stringify(values, 0, 2)}</pre>
			</form>
		)}
	/>
)
