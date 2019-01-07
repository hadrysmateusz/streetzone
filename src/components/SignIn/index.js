import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import { FieldRow, FieldLabel, StyledInput, Header, Separator } from "../Basics"
import { FormError } from "../FormElements"
import { FacebookButton, GoogleButton, LoaderButton } from "../Button"
import { PasswordForgetLink } from "../PasswordForget"
import { SignUpLink } from "../SignUp"
import { withFirebase } from "../Firebase"
import validate from "./validate"
import { ROUTES, AUTH_ERR } from "../../constants"

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
			// Attempt signIn
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

	render() {
		const { error } = this.state

		return (
			<Form
				onSubmit={this.onSubmit}
				validate={validate}
				render={({ handleSubmit, submitting }) => (
					<form onSubmit={handleSubmit}>
						{/* E-mail */}
						<FieldRow>
							<Field name="email">
								{({ input, meta }) => (
									<>
										<FieldLabel>E-mail</FieldLabel>
										<StyledInput {...input} type="text" placeholder="E-mail" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
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
										<FormError message={meta.error} show={meta.error && meta.touched} />
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
						{error && <FormError message={error.message} show={error} />}
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
					profilePictureURL: socialAuthUser.picture || null
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
					profilePictureURL: socialAuthUser.picture || null
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
