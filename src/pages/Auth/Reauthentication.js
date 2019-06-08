import { Button } from "../../components/Button"

import { useFirebase } from "../../hooks"
import { CONST } from "../../constants"

import { socialMediaSites } from "./common"

import React, { useState } from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import FormError from "../../components/FormElements/FormError"
import Separator from "../../components/Separator"
import { Modal } from "../../components/Modal/new"

import { Form } from "react-final-form"

import { TextFF } from "../../components/FinalFormFields"
import { LoaderButton } from "../../components/Button"

import { FORM_ERR } from "../../constants"

const validate = ({ password }) => {
	const errors = {}

	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	}

	return errors
}

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing2);
`

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

const ModalOuterContainer = styled.div`
	/* max-width: 100vw;
	min-height: 515px;
	overflow: hidden;
	width: 670px;
	display: grid;
	grid-template-columns: 1fr 1fr; */
	padding: var(--spacing4);
`

const ReauthenticationModal = ({
	children,
	currentBreakpoint,
	location,
	onSuccess,
	onRequestClose
}) => {
	const [error, setError] = useState()
	const firebase = useFirebase()

	const onFormSubmit = async (values, actions) => {
		console.log("modal form submit", values)
		const user = firebase.auth.currentUser
		const credential = firebase.emailAuthProvider.credential(user.email, values.password)

		await user.reauthenticateWithCredential(credential)

		await onSuccess.handler()
		onRequestClose()
	}

	const onError = (err) => {
		setError(err)
	}

	const onSocialSuccess = async () => {
		console.log(onSuccess)

		await onSuccess.handler()
		onRequestClose()
	}

	const commonProps = {
		onSuccess: onSocialSuccess,
		onError
	}

	return (
		<Modal onRequestClose={onRequestClose}>
			<ModalOuterContainer>
				<div>Zaloguj się</div>
				<div>
					<GoogleReauthButton {...commonProps} />
					<FacebookReauthButton {...commonProps} />
				</div>
				<Separator>lub</Separator> */}
				<div>
					<ReauthenticationForm onError={onError} onSubmit={onFormSubmit} />
					<FormError error={error} />
				</div>
			</ModalOuterContainer>
		</Modal>
	)
}

export default compose(
	withBreakpoints,
	withRouter
)(ReauthenticationModal)
