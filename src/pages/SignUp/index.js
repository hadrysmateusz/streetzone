import React, { Component } from "react"
import { withRouter, Redirect } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { withFirebase } from "../../components/Firebase"
import { StyledLink, FieldRow, Header } from "../../components/Basics"
import { LoaderButton } from "../../components/Button"
import { FormError, Input } from "../../components/FormElements"

import { SignInLink } from "../SignIn/old"

import { ROUTES, AUTH_ERR } from "../../constants"
import formatUserData from "../../utils/formatUserData"
import validate from "./validate"
import { CenteredContainer } from "../../components/Containers"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const SignUpPage = () => {
	return (
		<CenteredContainer>
			<Header>Utwórz konto</Header>
			<SignUpForm />
			<SignInLink />
		</CenteredContainer>
	)
}

class SignUpFormBase extends Component {
	state = { error: null, redirectToReferrer: false }

	onSubmit = async ({ name, email, password }, actions) => {
		const { firebase } = this.props

		try {
			// Create user for auth
			const authUser = await firebase.signUpWithEmail(email, password)

			const userId = authUser.user.uid

			// Add the name to the auth user
			await authUser.user.updateProfile({
				displayName: name
			})

			// Create user in db
			const userData = formatUserData({ name, email })
			await firebase.user(userId).set(userData)

			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null, redirectToReferrer: true })
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_SOCIAL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_SOCIAL_ACCOUNT_EXISTS
			}
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
				render={({ handleSubmit, submitting, pristine, values }) => (
					<StyledForm onSubmit={handleSubmit}>
						{/* Imię */}
						<FieldRow>
							<Field name="name">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="text"
											placeholder="Nazwa użytkownika"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

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

						{/* Powtórz Hasło */}
						<FieldRow>
							<Field name="passwordConfirm">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="password"
											placeholder="Potwierdź Hasło"
											error={error}
										/>
									)
								}}
							</Field>
						</FieldRow>

						<LoaderButton
							text="Utwórz konto"
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine}
							fullWidth
						/>
						{error && <FormError message={error.message} show={error} />}
					</StyledForm>
				)}
			/>
		)
	}
}

export const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase)

export const SignUpLink = ({ ...props }) => {
	return (
		<p {...props}>
			Nie masz jeszcze konta?{" "}
			<StyledLink to={ROUTES.SIGN_UP} className="link">
				Utwórz konto
			</StyledLink>
		</p>
	)
}

export default SignUpPage
