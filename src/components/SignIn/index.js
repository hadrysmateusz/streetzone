import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"
import { compose } from "recompose"

import { StyledField, Separator, Container } from "../Basics"
import Button, { FacebookButton, GoogleButton } from "../Button"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX, CSS } from "../../constants"

const SignInPage = () => {
	return (
		<Container width={320}>
			<h1 style={{ textAlign: "center" }}>Zaloguj się</h1>
			<div className="social">
				<SignInGoogle />
				<SignInFacebook />
			</div>
			<Separator text="lub" />
			<SignInForm />
			<PasswordForgetLink />
			<Separator />
			<SignUpLink />
		</Container>
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
						<StyledField name="email">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>E-mail </label>
									<input {...input} type="text" placeholder="E-mail" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						{/* Hasło */}
						<StyledField name="password">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>Hasło </label>
									<input {...input} type="password" placeholder="Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						<div className="buttons">
							<Button type="submit" fullWidth disabled={submitting}>
								Zaloguj się
							</Button>
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
				<GoogleButton fullWidth type="submit">
					Zaloguj się przez Google
				</GoogleButton>
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
				<FacebookButton fullWidth type="submit">
					Zaloguj się przez Facebooka
				</FacebookButton>
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
