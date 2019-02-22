import React from "react"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import { compose } from "recompose"

import Button, { LoaderButton } from "../Button"
import { FieldRow, StyledInput, StyledTextarea } from "../Basics"
import { FormError } from "../FormElements"
import { withRouter } from "react-router-dom"

import { ROUTES } from "../../constants"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"

const StyledForm = styled.form`
	max-width: 600px;
	margin: 0 auto;
`

const FieldsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
	grid-template-areas:
		"name e-mail"
		"city phone"
		"misc misc";
`

const ButtonContainer = styled.div`
	margin: 10px 0;
	display: flex;
	justify-content: center;
	width: 100%;
	> * {
		width: 120px;
	}
	* + * {
		margin-left: 15px;
	}
`

export default compose(
	withAuthentication,
	withFirebase
)(() => {
	return (
		<ProfileEditForm
			onSubmit={(data) => {
				console.log(data)
			}}
			initialValues={{}}
		/>
	)
})

const ProfileEditForm = withRouter(({ initialValues, onSubmit, history }) => {
	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<FieldsContainer>
							{/* Name */}
							<FieldRow gridArea="name">
								<Field name="name">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="Imię i nazwisko" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* E-mail */}
							<FieldRow gridArea="e-mail">
								<Field name="e-mail">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="E-mail" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* City */}
							<FieldRow gridArea="city">
								<Field name="city">
									{({ input, meta }) => (
										<>
											<StyledInput
												{...input}
												type="text"
												placeholder="Miejsce zamieszkania"
											/>
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* Phone number */}
							<FieldRow gridArea="phone">
								<Field name="phone">
									{({ input, meta }) => (
										<>
											<StyledInput {...input} type="text" placeholder="Numer telefonu" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

							{/* Misc */}
							<FieldRow gridArea="misc">
								<Field name="misc">
									{({ input, meta }) => (
										<>
											<StyledTextarea {...input} placeholder="Dodatkowe informacje" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>
						</FieldsContainer>

						<ButtonContainer>
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
								onClick={() => history.push(ROUTES.HOME)}
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
})
