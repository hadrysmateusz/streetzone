import React, { Component } from "react"
import { Form } from "react-final-form"

import { StyledField } from "../Basics"
import Button from "../Button"

// import { withFirebase } from "../Firebase"
import { FORM_ERR } from "../../constants"

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
				render={({ handleSubmit, submitting, pristine }) => (
					<form onSubmit={handleSubmit}>
						{/* Nowe Hasło */}
						<StyledField name="passwordNew">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>Nowe Hasło </label>
									<input {...input} type="password" placeholder="Nowe Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						{/* Powtórz Hasło */}
						<StyledField name="passwordConfirm">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>Potwierdź Nowe Hasło </label>
									<input {...input} type="password" placeholder="Potwierdź Nowe Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						<Button type="submit" fullWidth disabled={submitting || pristine}>
							Zmień hasło
						</Button>
						{error && <p>{error.message}</p>}
					</form>
				)}
			/>
		)
	}
}

export { PasswordChangeForm }
