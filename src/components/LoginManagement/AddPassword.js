import React, { Component } from "react"
import { Form, Field } from "react-final-form"

import { FieldRow } from "../Basics"
import { Input } from "../FormElements"
import { LoaderButton, ButtonContainer } from "../Button"
import InfoBox from "../InfoBox"
import { FORM_ERR, CONST } from "../../constants"

const validate = (values) => {
	const { password, passwordConfirm } = values
	const errors = {}

	// Password
	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	} else if (password.length < CONST.MIN_PASSWORD_LENGTH) {
		errors.password = FORM_ERR.PASSWORD_TOO_SHORT
	}

	// Password Confirm
	if (!passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.IS_REQUIRED
	} else if (password !== passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
	}

	return errors
}

class AddPassword extends Component {
	onSubmit = async (values, actions) => {
		await this.props.onLink(values.password)
		actions.reset()
	}

	render() {
		return (
			<Form
				onSubmit={this.onSubmit}
				validate={validate}
				render={({ handleSubmit, submitting, pristine, values, invalid }) => (
					<form onSubmit={handleSubmit}>
						<InfoBox>
							Jeśli za pierwszym razem zalogowałeś się używając jednego z kont
							społecznościowych, możesz również dodać hasło by logować się za pomocą
							e-mailu i hasła.
						</InfoBox>

						{/* Hasło */}
						<FieldRow>
							<Field name="password">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="password" placeholder="Hasło" error={error} />
									)
								}}
							</Field>
						</FieldRow>

						{/* Powtórz Hasło */}
						<FieldRow>
							<Field name="passwordConfirm">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="password"
											placeholder="Potwierdź Hasło"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						<ButtonContainer>
							<LoaderButton
								text="Zapisz"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine || invalid}
								primary
								fullWidth
							/>
						</ButtonContainer>
					</form>
				)}
			/>
		)
	}
}

export default AddPassword
