import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"

// import { withAuthorization } from "../UserSession"
import { withFirebase } from "../Firebase"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX } from "../../constants"

const SignUpPage = () => {
	return (
		<>
			<h1>Utwórz konto</h1>
			<SignUpForm />
		</>
	)
}

class SignUpFormBase extends Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const { name, email, password } = values

		try {
			// Create user for auth
			const authUser = await this.props.firebase.signUpWithEmail(
				email,
				password
			)

			// Add the name to the auth user
			await authUser.user.updateProfile({
				displayName: name
			})

			// Create user in db
			await this.props.firebase
				.user(authUser.user.uid)
				.set({ name, email, items: [] })

			// Redirect
			this.props.history.push(ROUTES.HOME)
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_SOCIAL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_SOCIAL_ACCOUNT_EXISTS
			}
			this.setState({ error })
		}
	}

	validate = (values) => {
		const { email, name, password, passwordConfirm } = values
		const errors = {}

		// E-mail
		if (!email) {
			errors.email = FORM_ERR.IS_REQUIRED
		} else if (!REGEX.EMAIL.test(email)) {
			errors.email = FORM_ERR.EMAIL_INVALID
		}

		// Name
		if (!name) {
			errors.name = FORM_ERR.IS_REQUIRED
		}

		// Password
		if (!password) {
			errors.password = FORM_ERR.IS_REQUIRED
		}

		// Password Confirm
		if (!passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.IS_REQUIRED
		} else if (password !== passwordConfirm) {
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
						{/* Imię */}
						<Field name="name">
							{({ input, meta }) => (
								<div>
									<label>Imię </label>
									<input {...input} type="text" placeholder="Imię" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

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

						{/* Powtórz Hasło */}
						<Field name="passwordConfirm">
							{({ input, meta }) => (
								<div>
									<label>Potwierdź Hasło </label>
									<input
										{...input}
										type="password"
										placeholder="Potwierdź Hasło"
									/>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<div className="buttons">
							<button type="submit" disabled={submitting || pristine}>
								Utwórz konto
							</button>
						</div>
						{error && <p>{error.message}</p>}
					</form>
				)}
			/>
		)
	}
}

const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase)

const SignUpLink = () => (
	<p>
		Nie masz jeszcze konta? <Link to={ROUTES.SIGN_UP}>Utwórz konto</Link>
	</p>
)

export default SignUpPage
export { SignUpForm, SignUpLink }
