import React, { useState, useEffect } from "react"
import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"
import styled from "styled-components/macro"

import { useFunctionWithReauthentication } from "../../pages/Auth/Reauthentication"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import LoadingSpinner from "../LoadingSpinner"
import Button, { LoaderButton, ButtonContainer } from "../Button"
import { TextFF } from "../FinalFormFields"
import ErrorBox from "../ErrorBox"

import { Heading } from "./common"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const ChangeEmailForm = ({ onSubmit, initialValues, onCancel }) => {
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
									onCancel()
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
	const flashMessage = useFlash()

	const [
		updateEmailWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication(async (email) => {
		try {
			// update auth user email
			await firebase.updateEmail(email)

			// update email in database
			await firebase.user(authUser.uid).update({ email })

			flashMessage({ type: "success", text: "Zmiany zostały zapisane" })
		} catch (error) {
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Zmiany mogły nie zostać zapisane"
			})
		}
	})

	// set initialValues for the form
	useEffect(() => {
		setInitialValues({
			email: authUser.email
		})
	}, [authUser])

	// submit handler
	const onSubmit = async (values) => {
		try {
			setError(null)
			const email = values.email || initialValues.email

			if (!email) {
				throw Error("Podaj adres e-mail")
			}

			await updateEmailWithReauthentication(email)
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
				onCancel={() => {
					setError(null)
				}}
			/>
			<ErrorBox error={error} />
		</>
	)
}

export default ChangeEmail
