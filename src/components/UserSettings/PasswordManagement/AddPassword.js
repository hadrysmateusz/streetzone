import React, { useState } from "react"

import { useFunctionWithReauthentication } from "../../../pages/Auth/Reauthentication"
import { useFirebase, useAuthentication } from "../../../hooks"

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
	] = useFunctionWithReauthentication((credential) => {
		return firebase.auth.currentUser.linkWithCredential(credential)
	})

	// submit handler
	const onSubmit = async ({ password }) => {
		try {
			setError(null)

			if (!password) throw Error("Podaj hasło")

			const credential = firebase.emailAuthProvider.credential(authUser.email, password)
			await linkWithCredentialWithReauthentication(credential)

			onSuccess("Hasło dodano pomyślnie")
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			{reauthenticationModal()}
			<Heading>Dodaj hasło</Heading>
			<PasswordForm onSubmit={onSubmit} />
			<ErrorBox error={error} />
		</>
	)
}

export default AddPassword
