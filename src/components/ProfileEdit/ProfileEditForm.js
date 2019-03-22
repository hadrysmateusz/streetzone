import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import { compose } from "recompose"

import Button, { LoaderButton, ButtonContainer } from "../Button"
import { FieldRow } from "../Basics"
import { Input, Textarea } from "../FormElements"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import validate from "./validate"

const StyledForm = styled.form`
	max-width: 600px;
	margin: 0 auto;
`

const FieldsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
	grid-template-areas:
		"name email"
		"city phone"
		"info info";
`

const ProfileEditForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<FieldsContainer>
							{/* Name */}
							<FieldRow gridArea="name">
								<Field name="name">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Imię i nazwisko"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* E-mail */}
							<FieldRow gridArea="email">
								<Field name="email">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input {...input} type="email" placeholder="E-mail" error={error} />
										)
									}}
								</Field>
							</FieldRow>

							{/* City */}
							<FieldRow gridArea="city">
								<Field name="city">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Miejsce zamieszkania"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* Phone number */}
							<FieldRow gridArea="phone">
								<Field name="phone">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Numer telefonu"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* Info */}
							<FieldRow gridArea="info">
								<Field name="info">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Textarea
												{...input}
												placeholder="Dodatkowe informacje"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>
						</FieldsContainer>

						<ButtonContainer centered>
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting}
								onClick={form.reset}
							>
								Anuluj
							</Button>
						</ButtonContainer>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</StyledForm>
				)
			}}
		/>
	)
}

export default compose(
	withAuthentication,
	withFirebase
)(ProfileEditForm)
