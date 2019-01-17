import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import { StyledLink, FieldRow, FieldLabel, StyledInput, Header } from "../Basics"
import { LoaderButton } from "../Button"
import { FormError } from "../FormElements"
import { ROUTES, AUTH_ERR } from "../../constants"
import validate from "./validate"

const Container = styled.div`
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
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
		const { firebase, history } = this.props

		try {
			// Create user for auth
			const authUser = await firebase.signUpWithEmail(email, password)

			const userId = authUser.user.uid

			// Add the name to the auth user
			await authUser.user.updateProfile({
				displayName: name
			})

			// Create user in db
			await firebase.user(userId).set({
				name,
				email,
				items: [],
				profilePictureRef: null,
				profilePictureURLs: null,
				permissions: [],
				roles: [],
				feedback: [],
				badges: {}
			})

			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null })
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
						<form onSubmit={handleSubmit}>
							{/* Imię */}
							<FieldRow>
								<Field name="name">
									{({ input, meta }) => (
										<>
											<FieldLabel>Imię</FieldLabel>
											<StyledInput {...input} type="text" placeholder="Imię" />
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>

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

							{/* Powtórz Hasło */}
							{values.password && (
								<FieldRow>
									<Field name="passwordConfirm">
										{({ input, meta }) => (
											<>
												<FieldLabel>Potwierdź Hasło</FieldLabel>
												<StyledInput
													{...input}
													type="password"
													placeholder="Potwierdź Hasło"
												/>
												<FormError
													message={meta.error}
													show={meta.error && meta.touched}
												/>
											</>
										)}
									</Field>
								</FieldRow>
							)}

							<LoaderButton
								text="Utwórz konto"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								fullWidth
							/>
							{error && <FormError message={error.message} show={error} />}
						</form>
					)}
				/>
			</Container>
		)
	}
}

const SignUpForm = compose(
	withRouter,
	withFirebase
)(SignUpFormBase)

const SignUpLink = (props) => (
	<p {...props}>
		Nie masz jeszcze konta?{" "}
		<StyledLink to={ROUTES.SIGN_UP} className="link">
			Utwórz konto
		</StyledLink>
	</p>
)

export default SignUpPage
export { SignUpForm, SignUpLink }
