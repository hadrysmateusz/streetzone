import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import { FieldRow, FieldLabel, StyledInput, Header, Separator } from "../Basics"
import { Error } from "../ItemForm"
import { FacebookButton, GoogleButton, LoaderButton } from "../Button"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX } from "../../constants"

const Container = styled.div`
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
`

const SignInPage = () => {
	return (
		<Container>
			<Header>Zaloguj się</Header>
			<SignInGoogle />
			<SignInFacebook />
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
						<FieldRow>
							<Field name="email">
								{({ input, meta }) => (
									<>
										<FieldLabel>E-mail</FieldLabel>
										<StyledInput {...input} type="text" placeholder="E-mail" />
										<Error message={meta.error} showIf={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Hasło */}
						<FieldRow>
							<Field name="password">
								{({ input, meta }) => (
									<>
										<FieldLabel>Hasło</FieldLabel>
										<StyledInput {...input} type="password" placeholder="Hasło" />
										<Error message={meta.error} showIf={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						<LoaderButton
							text="Zaloguj się"
							type="submit"
							isLoading={submitting}
							disabled={submitting}
							fullWidth
						/>
						{error && <Error message={error.message} showIf={error} />}
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
