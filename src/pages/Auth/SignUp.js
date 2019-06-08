import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { StyledLink } from "../../components/Basics"
import { LoaderButton } from "../../components/Button"
import { CenteredContainer } from "../../components/Containers"
import { TextFF } from "../../components/FinalFormFields"
import Separator from "../../components/Separator"

import { FORM_ERR, CONST } from "../../constants"
import formatUserData from "../../utils/formatUserData"
import { route } from "../../utils"
import { useFirebase } from "../../hooks"

import { Heading } from "./common"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing2);
	margin-bottom: var(--spacing3);
`

const validate = (values) => {
	const { email, name, password, passwordConfirm } = values
	const errors = {}

	// E-mail
	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!CONST.EMAIL_REGEX.test(email)) {
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

const SignInLink = () => {
	return (
		<div
			css={`
				margin-top: calc(var(--spacing3) - 3px);
			`}
		>
			Masz już konto? <StyledLink to={route("SIGN_IN")}>Zaloguj się</StyledLink>
		</div>
	)
}

export const SignUpForm = ({ onSuccess, onError }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			// get values and attempt sign-in
			const { name, email, password } = values
			const authUser = await firebase.signUpWithEmail(email, password)

			// Add the name to the auth user
			await authUser.user.updateProfile({
				displayName: name
			})

			// Create user in db
			const userId = authUser.user.uid
			const userData = formatUserData({ name, email })
			await firebase.user(userId).set(userData)

			// Reset form
			actions.reset()

			// exit successfully
			onSuccess(`Witaj w ${CONST.BRAND_NAME}!`)
		} catch (err) {
			// pass the error to handler
			onError(err)
		}
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<TextFF label="Nazwa użytkownika" name="name" />

						<TextFF label="E-mail" name="email" />

						<TextFF label="Hasło" name="password" />

						<TextFF label="Potwierdź hasło" name="confirmPassword" />

						<LoaderButton
							text="Gotowe"
							type="submit"
							fullWidth
							primary
							isLoading={submitting}
							disabled={submitting || pristine}
						/>
					</StyledForm>
				)
			}}
		/>
	)
}

export const SignUp = () => (
	<>
		<Heading>Utwórz konto</Heading>
		<SignUpForm />
	</>
)

const SignUpPage = () => {
	return (
		<CenteredContainer>
			<SignUp />
			<Separator />
			<SignInLink />
		</CenteredContainer>
	)
}

export default SignUpPage
