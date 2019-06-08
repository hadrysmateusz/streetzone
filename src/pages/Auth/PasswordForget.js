import React, { useState } from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { StyledLink } from "../../components/Basics"
import { LoaderButton } from "../../components/Button"
import FormError from "../../components/FormElements/FormError"

import { TextFF } from "../../components/FinalFormFields"
import { CenteredContainer } from "../../components/Containers"
import Separator from "../../components/Separator"

import { ROUTES, FORM_ERR, CONST } from "../../constants"
import { route } from "../../utils"
import { useFirebase } from "../../hooks"

import { Heading } from "./common"

const OuterContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
`

const SuccessBox = styled.div`
	text-align: center;
	padding: var(--spacing3);
	background: #d0f4cd;
	border: 1px solid #66c978;
	color: #196014;
`

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing2);
`

const validate = ({ email }) => {
	const errors = {}

	if (!email) {
		errors.email = FORM_ERR.IS_REQUIRED
	} else if (!CONST.EMAIL_REGEX.test(email)) {
		errors.email = FORM_ERR.EMAIL_INVALID
	}

	return errors
}

const PasswordForgetPage = () => {
	return (
		<CenteredContainer>
			<Heading>Zresetuj hasło</Heading>
			<PasswordForget />
		</CenteredContainer>
	)
}

const PasswordForget = () => {
	const [error, setError] = useState()
	const [isEmailSent, setIsEmailSent] = useState(false)

	const onSuccess = () => {
		setIsEmailSent(true)
	}

	const onError = (err) => {
		setError(err)
	}

	return (
		<OuterContainer>
			{isEmailSent ? (
				<>
					<SuccessBox>
						Na podany adres e-mail została wysłana wiadomość z linkiem do zresetowania
						hasła.
					</SuccessBox>
				</>
			) : (
				<>
					<PasswordForgetForm onSuccess={onSuccess} onError={onError} />
					<FormError error={error} />
				</>
			)}
			<Separator />
			<StyledLink to={route("SIGN_IN")}>Wróć do logowania</StyledLink>
		</OuterContainer>
	)
}

const PasswordForgetForm = ({ onSuccess, onError }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		const { email } = values

		try {
			await firebase.resetPassword(email)

			// Reset form
			actions.reset()

			onSuccess()
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

						<LoaderButton
							text="Zresetuj hasło"
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

// deprecated
const PasswordForgetLink = () => (
	<p>
		<StyledLink to={ROUTES.PASSWORD_FORGET}>Zapomniałeś hasła?</StyledLink>
	</p>
)

export default PasswordForgetPage
export { PasswordForgetForm, PasswordForgetLink }
