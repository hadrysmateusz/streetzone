import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import {
	StyledLink,
	FieldRow,
	FieldLabel,
	StyledInput,
	Header
} from "../Basics"
import { LoaderButton } from "../Button"
import { Error } from "../ItemForm"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX } from "../../constants"

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
			await this.props.firebase.user(authUser.user.uid).set({
				name,
				email,
				items: [],
				profileImageRef: "",
				profileImageURL: "",
				permissions: [],
				roles: [],
				feedback: [],
				badges: []
			})

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
			<Container>
				<Form
					onSubmit={this.onSubmit}
					validate={this.validate}
					render={({ handleSubmit, submitting, pristine, values }) => (
						<form onSubmit={handleSubmit}>
							{/* Imię */}
							<FieldRow>
								<Field name="name">
									{({ input, meta }) => (
										<>
											<FieldLabel>Imię</FieldLabel>
											<StyledInput {...input} type="text" placeholder="Imię" />
											<Error
												message={meta.error}
												showIf={meta.error && meta.touched}
											/>
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
											<StyledInput
												{...input}
												type="text"
												placeholder="E-mail"
											/>
											<Error
												message={meta.error}
												showIf={meta.error && meta.touched}
											/>
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
											<StyledInput
												{...input}
												type="password"
												placeholder="Hasło"
											/>
											<Error
												message={meta.error}
												showIf={meta.error && meta.touched}
											/>
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
												<Error
													message={meta.error}
													showIf={meta.error && meta.touched}
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
							{error && <Error message={error.message} showIf={error} />}
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
