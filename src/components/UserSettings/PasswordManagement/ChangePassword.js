import React, { useState } from "react"

import { useFunctionWithReauthentication } from "../../../pages/Auth/Reauthentication"
import { useFirebase } from "../../../hooks"

import ErrorBox from "../../ErrorBox"
import { Heading } from "../common"

import PasswordForm from "./PasswordForm"

const ChangePassword = ({ onSuccess }) => {
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
	const onSubmit = async ({ password }) => {
		try {
			setError(null)

			if (!password) throw Error("Podaj nowe hasło")

			await updatePasswordWithReauthentication(password)

			onSuccess("Hasło zmieniono pomyślnie")
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			{reauthenticationModal()}
			<Heading>Zmień hasło</Heading>
			<PasswordForm onSubmit={onSubmit} />
			<ErrorBox error={error} />
		</>
	)
}

export default ChangePassword
