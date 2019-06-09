import React, { useState, useEffect } from "react"
import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"
import styled from "styled-components/macro"

import { useFunctionWithReauthentication } from "../../pages/Auth/Reauthentication"

import { useAuthentication, useFirebase } from "../../hooks"

import LoadingSpinner from "../LoadingSpinner"
import Button, { LoaderButton, ButtonContainer } from "../Button"
import { TextFF } from "../FinalFormFields"
import FormError from "../FormElements/FormError"

import { Heading } from "./common"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const ChangeEmailForm = ({ onSubmit, initialValues, clearError }) => {
	return !initialValues ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0 && !pristine}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<Heading>Zmień adres email</Heading>

						<TextFF
							name="email"
							label="E-mail"
							placeholder="E-mail"
							info="Do kontaktu i logowania"
						/>

						<ButtonContainer centered>
							<LoaderButton
								text="Zapisz"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
								fullWidth
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting || pristine}
								onClick={() => {
									form.reset()
									clearError()
								}}
								fullWidth
							>
								Anuluj
							</Button>
						</ButtonContainer>
					</StyledForm>
				)
			}}
		/>
	)
}

const ChangeEmail = () => {
	const authUser = useAuthentication()
	const firebase = useFirebase()
	const [initialValues, setInitialValues] = useState(null)
	const [error, setError] = useState(null)

	// get updateEmail wrapped with reauthentication
	const [
		updateEmailWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication((email) => {
		return firebase.updateEmail(email)
	})

	// set initialValues for the form
	useEffect(() => {
		setInitialValues({
			email: authUser.email
		})
	}, [authUser])

	// submit handler
	const onSubmit = async (values, actions) => {
		try {
			setError(null)
			const email = values.email || initialValues.email

			if (!email) {
				throw Error("Podaj adres e-mail")
			}

			await updateEmailWithReauthentication(email)

			await firebase.user(authUser.uid).update({ email })
		} catch (err) {
			setError(err)
		}
	}

	const isLoading = !initialValues

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<>
			{reauthenticationModal()}
			<ChangeEmailForm
				onSubmit={onSubmit}
				initialValues={initialValues}
				clearError={() => setError(null)}
			/>
			<FormError error={error} />
		</>
	)
}

export default ChangeEmail
