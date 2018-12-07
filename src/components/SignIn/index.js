import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"

import { withAuthorization } from "../UserSession"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import { ROUTES, FORMS, REGEX } from "../../constants"

const SignInPage = () => {
	return (
		<>
			<h1>Zaloguj się</h1>
			<SignInForm />
			<PasswordForgetLink />
			<SignUpLink />
		</>
	)
}

class SignInFormBase extends Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const { email, password } = values

		try {
			await this.props.firebase.signInWithEmail(email, password)
			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null })
			// Redirect
			this.props.history.push(ROUTES.HOME)
		} catch (error) {
			this.setState({ error })
		}
	}

	validate = (values) => {
		const { email, password } = values
		const errors = {}

		// E-mail
		if (!email) {
			errors.email = FORMS.ERR_IS_REQUIRED
		} else if (!REGEX.EMAIL.test(email)) {
			errors.email = FORMS.ERR_EMAIL_INVALID
		}

		// Hasło
		if (!password) {
			errors.password = FORMS.ERR_IS_REQUIRED
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
						{/* E-mail */}
						<Field name="email">
							{({ input, meta }) => (
								<div>
									<label>E-mail </label>
									<input {...input} type="text" placeholder="E-mail" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Hasło */}
						<Field name="password">
							{({ input, meta }) => (
								<div>
									<label>Hasło </label>
									<input {...input} type="password" placeholder="Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<div className="buttons">
							<button type="submit" disabled={submitting}>
								Zaloguj się
							</button>
						</div>
						{error && <p>{error.message}</p>}
					</form>
				)}
			/>
		)
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase)

export default SignInPage
export { SignInForm }
