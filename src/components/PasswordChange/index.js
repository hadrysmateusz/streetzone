import React, { Component } from "react"
import { Form, Field } from "react-final-form"

import { StyledInput, FieldRow, FieldLabel } from "../Basics"
import { LoaderButton } from "../Button"
import { FormError } from "../FormElements"
import { FORM_ERR } from "../../constants"
import { Header } from "../AccountPage/StyledComponents"

class PasswordChangeForm extends Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const { passwordNew } = values

		try {
			await this.props.firebase.updatePassword(passwordNew)
			// Reset form
			actions.reset()
			// Remove any errors
			await this.setState({ error: null })
		} catch (error) {
			this.setState({ error })
		}
	}

	validate = (values) => {
		const { passwordConfirm, passwordNew } = values
		const errors = {}

		// New Password
		if (!passwordNew) {
			errors.passwordNew = FORM_ERR.IS_REQUIRED
		}

		// Confirm New Password
		if (!passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.IS_REQUIRED
		} else if (passwordNew !== passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
		}

		return errors
	}

	render() {
		const { error } = this.state

		return (
			<Form
				onSubmit={this.onSubmit}
				validate={this.validate}
				render={({ handleSubmit, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<Header>Zmień hasło</Header>

						{/* Hasło */}
						<FieldRow>
							<Field name="passwordNew">
								{({ input, meta }) => (
									<>
										<FieldLabel>Nowe Hasło</FieldLabel>
										<StyledInput {...input} type="password" placeholder="Nowe Hasło" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Powtórz Hasło */}
						{values.passwordNew && (
							<FieldRow>
								<Field name="passwordConfirm">
									{({ input, meta }) => (
										<>
											<FieldLabel>Potwierdź Nowe Hasło</FieldLabel>
											<StyledInput
												{...input}
												type="password"
												placeholder="Potwierdź Nowe Hasło"
											/>
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>
						)}

						<LoaderButton
							text="Zmień hasło"
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine}
							fullWidth
						/>
						{error && <FormError message={error.message} show={error} />}
					</form>
				)}
			/>
		)
	}
}

export { PasswordChangeForm }
