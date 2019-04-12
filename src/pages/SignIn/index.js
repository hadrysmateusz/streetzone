import React, { Component } from "react"
import { withRouter, Redirect } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { CenteredContainer } from "../../components/Containers"
import { StyledLink, FieldRow, Header, Separator } from "../../components/Basics"
import { FormError, Input } from "../../components/FormElements"
import { FacebookButton, GoogleButton, LoaderButton } from "../../components/Button"
import { withFirebase } from "../../components/Firebase"

import { SignUpLink } from "../SignUp"
import { PasswordForgetLink } from "../PasswordForget"

import { ROUTES, AUTH_ERR } from "../../constants"
import validate from "./validate"
import formatUserData from "../../utils/formatUserData"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const SocialButtonsContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
`

const SignInPage = () => {
	return (
		<CenteredContainer>
			<Header>Zaloguj się</Header>
			<SocialButtonsContainer>
				<SignInGoogle />
				<SignInFacebook />
			</SocialButtonsContainer>
			<Separator text="lub" />
			<SignInForm />
			<PasswordForgetLink />
			<Separator />
			<SignUpLink />
		</CenteredContainer>
	)
}

class SignInFormBase extends Component {
	state = { error: null, redirectToReferrer: false }

	onSubmit = async (values, actions) => {
		const { email, password } = values
		const { firebase } = this.props

		try {
			// Attempt signIn
			await firebase.signInWithEmail(email, password)
			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null })

			this.setState({ redirectToReferrer: true })
		} catch (error) {
			this.setState({ error })
		}
	}

	render() {
		const { error, redirectToReferrer } = this.state

		const { redirectTo } = this.props.location.state || { redirectTo: { pathname: "/" } }

		return redirectToReferrer ? (
			<Redirect to={redirectTo} />
		) : (
			<Form
				onSubmit={this.onSubmit}
				validate={validate}
				render={({ handleSubmit, submitting }) => (
					<StyledForm onSubmit={handleSubmit}>
						{/* E-mail */}
						<FieldRow>
							<Field name="email">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="email" placeholder="E-mail" error={error} />
									)
								}}
							</Field>
						</FieldRow>

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

						<LoaderButton
							text="Zaloguj się"
							type="submit"
							isLoading={submitting}
							disabled={submitting}
							fullWidth
						/>
						{error && <FormError message={error.message} show={error} />}
					</StyledForm>
				)}
			/>
		)
	}
}

class SignInGoogleBase extends Component {
	state = { error: null, redirectToReferrer: false }

	onSubmit = async (event) => {
		event.preventDefault()
		const { firebase } = this.props
		try {
			const socialAuthUser = await firebase.signInWithGoogle()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				const userData = formatUserData({
					name: socialAuthUser.user.displayName,
					email: socialAuthUser.user.email,
					picture: socialAuthUser.picture,
					importedFrom: "google"
				})
				await this.props.firebase.user(socialAuthUser.user.uid).set(userData)
			}

			this.setState({ error: null, redirectToReferrer: true })
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}
			this.setState({ error })
		}
	}

	render() {
		const { error, redirectToReferrer } = this.state

		let { redirectTo } = this.props.location.state || { redirectTo: { pathname: "/" } }

		return redirectToReferrer ? (
			<Redirect to={redirectTo} />
		) : (
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
	state = { error: null, redirectToReferrer: false }

	onSubmit = async (event) => {
		event.preventDefault()
		const { firebase } = this.props
		try {
			const socialAuthUser = await firebase.signInWithFacebook()
			// If this is the first time this user signs up, create a user in db
			if (socialAuthUser.additionalUserInfo.isNewUser) {
				const userData = formatUserData({
					name: socialAuthUser.additionalUserInfo.profile.name,
					email: socialAuthUser.additionalUserInfo.profile.email,
					picture: socialAuthUser.picture,
					importedFrom: "facebook"
				})
				await this.props.firebase.user(socialAuthUser.user.uid).set(userData)
			}

			this.setState({ error: null, redirectToReferrer: true })
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_EMAIL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_EMAIL_ACCOUNT_EXISTS
			}

			this.setState({ error })
		}
	}

	render() {
		const { error, redirectToReferrer } = this.state

		let { redirectTo } = this.props.location.state || { redirectTo: { pathname: "/" } }

		return redirectToReferrer ? (
			<Redirect to={redirectTo} />
		) : (
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

const SignInLink = ({ ...props }) => {
	return (
		<p {...props}>
			Masz już konto?{" "}
			<StyledLink to={ROUTES.SIGN_IN} className="link">
				Zaloguj się
			</StyledLink>
		</p>
	)
}

export default SignInPage
export { SignInForm, SignInGoogle, SignInFacebook, SignInLink }
