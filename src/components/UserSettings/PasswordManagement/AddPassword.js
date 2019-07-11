import React, { useState } from "react"
import styled from "styled-components/macro" // using css prop

import { useFunctionWithReauthentication } from "../../../pages/Auth/Reauthentication"
import { useFirebase, useAuthentication } from "../../../hooks"

import InfoBox from "../../InfoBox"
import ErrorBox from "../../ErrorBox"

import { Heading } from "../common"
import PasswordForm from "./PasswordForm"

const AddPassword = ({ onSuccess }) => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)
	const authUser = useAuthentication()

	// get linkWithCredential wrapped with reauthentication
	const [
		linkWithCredentialWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication(async (credential) => {
		await firebase.auth.currentUser.linkWithCredential(credential)
		onSuccess("Hasło dodano pomyślnie")
	})

	// submit handler
	const onSubmit = async ({ password }) => {
		try {
			setError(null)

			if (!password) throw Error("Podaj hasło")

			const credential = firebase.emailAuthProvider.credential(authUser.email, password)
			await linkWithCredentialWithReauthentication(credential)
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			{reauthenticationModal()}
			<Heading>Dodaj hasło</Heading>
			<InfoBox
				css={`
					margin-top: var(--spacing3);
					margin-bottom: var(--spacing3);
				`}
			>
				Jeśli za pierwszym razem zalogowałeś się używając jednego z kont
				społecznościowych, możesz również dodać hasło by logować się za pomocą e-mailu i
				hasła.
			</InfoBox>
			<PasswordForm
				onSubmit={onSubmit}
				onCancel={() => {
					setError(null)
				}}
			/>
			<ErrorBox error={error} />
		</>
	)
}

export default AddPassword
