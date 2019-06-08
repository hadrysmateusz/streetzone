import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { LoaderButton } from "../../components/Button"
import { TextFF } from "../../components/FinalFormFields"

import { FORM_ERR, CONST } from "../../constants"
import formatUserData from "../../utils/formatUserData"
import { useFirebase } from "../../hooks"

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
	} else if (password.length < CONST.MIN_PASSWORD_LENGTH) {
		errors.password = FORM_ERR.PASSWORD_TOO_SHORT
	}

	// Password Confirm
	if (!passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.IS_REQUIRED
	} else if (password !== passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
	}

	console.log(errors)

	return errors
}

const SignUpForm = ({ onSuccess, onError }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			// get values and attempt sign-up
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

			// reset the form
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

						<TextFF label="Hasło" password name="password" />

						<TextFF label="Potwierdź hasło" password name="passwordConfirm" />

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

export default SignUpForm
