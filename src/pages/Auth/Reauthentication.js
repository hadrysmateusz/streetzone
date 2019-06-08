import React, { useState } from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { useFirebase } from "../../hooks"
import { FORM_ERR } from "../../constants"

import { Button } from "../../components/Button"
import FormError from "../../components/FormElements/FormError"
import Separator from "../../components/Separator"
import { Modal } from "../../components/Modal/new"
import { TextFF } from "../../components/FinalFormFields"
import { LoaderButton } from "../../components/Button"

import { socialMediaSites } from "./common"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing2);
`

const ModalOuterContainer = styled.div`
	padding: var(--spacing4);
	max-width: 320px;
`

const InfoContainer = styled.div`
	text-align: center;
	margin-bottom: var(--spacing3);
	color: var(--gray0);
	font-weight: var(--semi-bold);
	font-style: italic;
`

const SocialContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
	margin: calc(var(--spacing3) - 5px) 0;
`

const EmailContainer = styled.div`
	margin-top: calc(var(--spacing3) - 12px);
	margin-bottom: var(--spacing3);
`

export const useFunctionWithReauthentication = (fn) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [args, setArgs] = useState()

	const wrappedFunction = async (...newArgs) => {
		setArgs(newArgs)

		try {
			return await fn(...newArgs)
		} catch (error) {
			// rethrow errors other than requires-recent-login
			if (error.code !== "auth/requires-recent-login") {
				throw error
			}

			openModal()
		}
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const renderModal = () => {
		return isModalOpen ? (
			<ReauthenticationModal onSuccess={() => fn(...args)} onRequestClose={closeModal} />
		) : null
	}

	return [wrappedFunction, renderModal]
}

const validate = ({ password }) => {
	const errors = {}

	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	}

	return errors
}

const ReauthenticationForm = ({ onSubmit, onError }) => {
	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<TextFF label="Hasło" password name="password" />

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

const SocialReauthButton = ({
	onError,
	onSuccess,
	name: nameOfSite,
	signInMethodName,
	buttonText,
	provider
}) => {
	const firebase = useFirebase()

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const user = firebase.auth.currentUser

			await user.reauthenticateWithPopup(firebase[provider])

			// exit successfully
			onSuccess()
		} catch (err) {
			// pass the error to handler
			onError(err)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<Button social={nameOfSite} fullWidth>
				{buttonText}
			</Button>
		</form>
	)
}

export const GoogleReauthButton = (props) => {
	return <SocialReauthButton {...socialMediaSites.google} {...props} />
}

export const FacebookReauthButton = (props) => {
	return <SocialReauthButton {...socialMediaSites.facebook} {...props} />
}

const ReauthenticationModal = ({ onSuccess, onRequestClose }) => {
	const [error, setError] = useState()
	const firebase = useFirebase()

	const onError = (err) => {
		setError(err)
	}

	const onSuccessfulReauthentication = async () => {
		// invoke the callback
		await onSuccess()
		// close the modal
		onRequestClose()
	}

	const onFormSubmit = async (values, actions) => {
		try {
			// get credentials from firebase
			const user = firebase.auth.currentUser
			const credential = firebase.emailAuthProvider.credential(
				user.email,
				values.password
			)

			// reauthenticate with new credentials
			await user.reauthenticateWithCredential(credential)

			// exit successfully
			onSuccessfulReauthentication()
		} catch (err) {
			onError(err)
		}
	}

	const socialProps = {
		onSuccess: onSuccessfulReauthentication,
		onError
	}

	return (
		<Modal onRequestClose={onRequestClose}>
			<ModalOuterContainer>
				<InfoContainer>
					Aby dokończyć tę czynność, potwierdź że jesteś właścicielem tego konta.
				</InfoContainer>
				<Separator>użyj konta społecznościowego </Separator>
				<SocialContainer>
					<GoogleReauthButton {...socialProps} />
					<FacebookReauthButton {...socialProps} />
				</SocialContainer>
				<Separator>lub podaj hasło</Separator>
				<EmailContainer>
					<ReauthenticationForm onError={onError} onSubmit={onFormSubmit} />
					<FormError error={error} />
				</EmailContainer>
			</ModalOuterContainer>
		</Modal>
	)
}

export default ReauthenticationModal
