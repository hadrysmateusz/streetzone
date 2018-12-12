import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"

// import { withAuthorization } from "../UserSession"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX } from "../../constants"

const SignInPage = () => {
	return (
		<>
			<h1>Zaloguj się</h1>

			<SignInGoogle />
			<SignInFacebook />
			<h3>lub</h3>
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
			errors.email = FORM_ERR.IS_REQUIRED
		} else if (!REGEX.EMAIL.test(email)) {
			errors.email = FORM_ERR.EMAIL_INVALID
		}

		// Hasło
		if (!password) {
			errors.password = FORM_ERR.IS_REQUIRED
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

class SignInGoogleBase extends Component {
	state = { error: null }

	onSubmit = async (event) => {
		event.preventDefault()
		try {
			const socialAuthUser = await this.props.firebase.signInWithGoogle()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				await this.props.firebase.user(socialAuthUser.user.uid).set({
					name: socialAuthUser.user.displayName,
					email: socialAuthUser.user.email,
					items: [],
					roles: [],
					permission: [],
					profilePictureRef: null,
					profilePictureURL: socialAuthUser.picture || ""
				})
			}
			this.setState({ error: null })
			this.props.history.push(ROUTES.HOME)
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}
			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<button type="submit">Zaloguj się przez Google</button>
				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

class SignInFacebookBase extends Component {
	state = { error: null }

	onSubmit = async (event) => {
		event.preventDefault()
		try {
			const socialAuthUser = await this.props.firebase.signInWithFacebook()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				await this.props.firebase.user(socialAuthUser.user.uid).set({
					name: socialAuthUser.additionalUserInfo.profile.name,
					email: socialAuthUser.additionalUserInfo.profile.email,
					items: [],
					roles: [],
					permission: [],
					profilePictureRef: null,
					profilePictureURL: socialAuthUser.picture || ""
				})
			}
			this.setState({ error: null })
			this.props.history.push(ROUTES.HOME)
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}

			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<button type="submit">Zaloguj się przez Facebooka</button>
				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase)

const SignInGoogle = compose(
	withRouter,
	withFirebase
)(SignInGoogleBase)

const SignInFacebook = compose(
	withRouter,
	withFirebase
)(SignInFacebookBase)

export default SignInPage
export { SignInForm, SignInGoogle, SignInFacebook }
