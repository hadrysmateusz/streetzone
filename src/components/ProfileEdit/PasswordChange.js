import React, { useState } from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { useFunctionWithReauthentication } from "../../pages/Auth/Reauthentication"

import { LoaderButton } from "../Button"
import { TextFF } from "../FinalFormFields"
import FormError from "../FormElements/FormError"

import { useFirebase } from "../../hooks"
import { FORM_ERR, CONST } from "../../constants"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const PasswordChangeForm = ({ onSubmit }) => {
	const validate = (values) => {
		const { passwordConfirm, password } = values
		const errors = {}

		// New Password
		if (!password) {
			errors.password = FORM_ERR.IS_REQUIRED
		} else if (password.length < CONST.MIN_PASSWORD_LENGTH) {
			errors.password = FORM_ERR.PASSWORD_TOO_SHORT
		}

		// Confirm New Password
		if (!passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.IS_REQUIRED
		} else if (password !== passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
		}

		return errors
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ handleSubmit, submitting, pristine, values }) => (
				<StyledForm onSubmit={handleSubmit}>
					<TextFF name="password" placeholder="Nowe hasło" password />
					<TextFF name="passwordConfirm" placeholder="Potwierdź hasło" password />

					<LoaderButton
						text="Zmień hasło"
						type="submit"
						isLoading={submitting}
						disabled={submitting || pristine}
						fullWidth
						primary
					/>
				</StyledForm>
			)}
		/>
	)
}

const PasswordChange = () => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)

	// get updatePassword wrapped with reauthentication
	const [
		updatePasswordWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication((password) => {
		return firebase.updatePassword(password)
	})

	// submit handler
	const onSubmit = async (values, actions) => {
		try {
			setError(null)
			const { password } = values

			if (!password) {
				throw Error("Podaj nowe hasło")
			}

			await updatePasswordWithReauthentication(password)
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			{reauthenticationModal()}
			<PasswordChangeForm onSubmit={onSubmit} />
			<FormError error={error} />
		</>
	)
}

export default PasswordChange
