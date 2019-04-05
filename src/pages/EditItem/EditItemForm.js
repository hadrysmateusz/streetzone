import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components/macro"
import { withRouter } from "react-router-dom"

import Button, { LoaderButton } from "../../components/Button"
import { FieldRow, FieldLabel } from "../../components/Basics"
import { Input, Textarea } from "../../components/FormElements"
import { FileHandler } from "../../components/FileHandler"

import validate from "./validate"
import { ROUTES, CONST } from "../../constants"

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	grid-template-areas:
		"price price"
		"description description"
		"files files";
`

const EditItemForm = ({ initialValues, onSubmit, history, isLoading }) => (
	<Form
		onSubmit={onSubmit}
		validate={validate}
		initialValues={initialValues ? initialValues : undefined}
		render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
			return (
				<StyledForm onSubmit={handleSubmit}>
					{/* Price */}
					<FieldRow gridArea="price">
						<Field name="price">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<>
										<FieldLabel>Cena </FieldLabel>
										<Input
											{...input}
											type="number"
											min="0"
											step="1"
											placeholder="Cena"
											error={error}
										/>
									</>
								)
							}}
						</Field>
					</FieldRow>

					{/* Description */}
					<FieldRow gridArea="description">
						<Field name="description">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<>
										<FieldLabel>Opis </FieldLabel>
										<Textarea
											{...input}
											placeholder={CONST.ITEM_DESC_PLACEHOLDER}
											error={error}
										/>
									</>
								)
							}}
						</Field>
					</FieldRow>

					{/* Files (handled by separate component) */}
					<FieldRow gridArea="files">
						<FieldLabel>Zdjęcia </FieldLabel>
						<Field name="files" isLoading={isLoading} component={FileHandler} />
					</FieldRow>

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
					{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
				</StyledForm>
			)
		}}
	/>
)

export default withRouter(EditItemForm)
