import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { TextFF } from "../../components/FinalFormFields"
import { LoaderButton } from "../../components/Button"

import { useFirebase } from "../../hooks"
import { FORM_ERR, CONST } from "../../constants"

const validate = (values) => {
	const { email, password } = values
	const errors = {}

	// E-mail
	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!CONST.EMAIL_REGEX.test(email)) {
		errors.email = FORM_ERR.EMAIL_INVALID
	}

	// Password
	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	}

	return errors
}

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing2);
`

const SignInForm = ({ onSuccess, onError }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			// get values and attempt sign-in
			const { email, password } = values
			await firebase.signInWithEmail(email, password)

			// reset the form
			actions.reset()

			onSuccess("Witaj ponownie")
		} catch (err) {
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
						<TextFF label="E-mail" name="email" />

						<TextFF label="Hasło" name="password" />

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

export default SignInForm
