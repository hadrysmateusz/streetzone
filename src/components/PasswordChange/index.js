import React, { Component } from "react"
import { Form, Field } from "react-final-form"

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
						<Field name="passwordNew">
							{({ input, meta }) => (
								<div>
									<label>Nowe Hasło </label>
									<input {...input} type="password" placeholder="Nowe Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Powtórz Hasło */}
						<Field name="passwordConfirm">
							{({ input, meta }) => (
								<div>
									<label>Potwierdź Nowe Hasło </label>
									<input
										{...input}
										type="password"
										placeholder="Potwierdź Nowe Hasło"
									/>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<div className="buttons">
							<button type="submit" disabled={submitting || pristine}>
								Zmień hasło
							</button>
						</div>
						{error && <p>{error.message}</p>}
					</form>
				)}
			/>
		)
	}
}

export { PasswordChangeForm }
