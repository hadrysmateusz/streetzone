import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { withFirebase } from "../../components/Firebase"
import { StyledLink, FieldRow, Header } from "../../components/Basics"
import { LoaderButton } from "../../components/Button"
import { FormError, Input } from "../../components/FormElements"
import { withGlobalContext } from "../../components/GlobalContext"

import { SignInLink } from "../SignIn"

import { ROUTES, AUTH_ERR } from "../../constants"
import formatUserData from "../../utils/formatUserData"
import validate from "./validate"

const Container = styled.div`
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
`

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const SignUpPage = () => {
	return (
		<div>
			<Header>Utwórz konto</Header>
			<SignUpForm />
		</div>
	)
}

class SignUpFormBase extends Component {
	state = { error: null }

	onSubmit = async ({ name, email, password }, actions) => {
		const { firebase, history, globalContext } = this.props

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
			await this.setState({ error: null })
			// Close modal if applicable
			if (globalContext.isLoginModalVisible) {
				globalContext.closeModal()
			}
			// Redirect
			history.push(ROUTES.ACCOUNT_SETTINGS.replace(":id", userId))
		} catch (error) {
			if (error.code === AUTH_ERR.CODE_SOCIAL_ACCOUNT_EXISTS) {
				error.message = AUTH_ERR.MSG_SOCIAL_ACCOUNT_EXISTS
			}
			this.setState({ error })
		}
	}

	render() {
		const { error } = this.state

		return (
			<Container>
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
											<Input
												{...input}
												type="password"
												placeholder="Hasło"
												error={error}
											/>
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
							<SignInLink />
						</StyledForm>
					)}
				/>
			</Container>
		)
	}
}

export const SignUpForm = compose(
	withRouter,
	withFirebase,
	withGlobalContext
)(SignUpFormBase)

export const SignUpLink = withGlobalContext(({ globalContext, ...rest }) => {
	return (
		<p {...rest}>
			Nie masz jeszcze konta?{" "}
			{globalContext.isLoginModalVisible ? (
				<button onClick={() => globalContext.openModal(ROUTES.SIGN_UP)}>
					Utwórz konto
				</button>
			) : (
				<StyledLink to={ROUTES.SIGN_UP} className="link">
					Utwórz konto
				</StyledLink>
			)}
		</p>
	)
})

export default SignUpPage
