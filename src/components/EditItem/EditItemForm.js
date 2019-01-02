import React from "react"
import { Form, Field } from "react-final-form"

import Button, { LoaderButton } from "../Button"
import { FieldRow, FieldLabel, StyledInput, StyledTextarea } from "../Basics"
import { FormError } from "../FormElements"
import { FileHandler } from "../FileHandler"
import { withRouter } from "react-router-dom"
import validate from "./validate"

import { ROUTES } from "../../constants"

const EditItemForm = ({ initialValues, onSubmit, history, isLoading }) => (
	<Form
		onSubmit={onSubmit}
		validate={validate}
		initialValues={initialValues ? initialValues : undefined}
		render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
			return (
				<form onSubmit={handleSubmit}>
					{/* Price */}
					<FieldRow>
						<Field name="price">
							{({ input, meta }) => (
								<>
									<FieldLabel>Cena </FieldLabel>
									<StyledInput
										{...input}
										type="number"
										min="0"
										step="1"
										placeholder="Cena"
									/>
									<FormError message={meta.error} show={meta.error && meta.touched} />
								</>
							)}
						</Field>
					</FieldRow>

					{/* Description */}
					<FieldRow>
						<Field name="description">
							{({ input, meta }) => (
								<>
									<FieldLabel>Opis </FieldLabel>
									<StyledTextarea
										{...input}
										minRows={4}
										maxRows={12}
										placeholder="Dodatkowe informacje"
									/>
									<FormError message={meta.error} show={meta.error && meta.touched} />
								</>
							)}
						</Field>
					</FieldRow>

					{/* Files (handled by separate component) */}
					<FieldRow>
						<FieldLabel>Zdjęcia </FieldLabel>
						<Field name="files" isLoading={isLoading} component={FileHandler} />
					</FieldRow>

					<div className="buttons">
						<LoaderButton
							text="Gotowe"
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine}
						/>
						<Button
							text="Anuluj"
							type="button"
							disabled={submitting}
							onClick={() => history.push(ROUTES.HOME)}
						>
							Anuluj
						</Button>
					</div>
					{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
				</form>
			)
		}}
	/>
)

export default withRouter(EditItemForm)
