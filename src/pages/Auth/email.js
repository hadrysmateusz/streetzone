import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { TextFF } from "../../components/FinalFormFields"
import { LoaderButton } from "../../components/Button"

import { useFirebase } from "../../hooks"

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
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<TextFF label="E-mail" placeholder="jan_kowalski@gmail.com" name="email" />

						<TextFF label="Hasło" placeholder="********" name="password" />

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
