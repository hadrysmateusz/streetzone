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
	] = useFunctionWithReauthentication(async (password) => {
		await firebase.updatePassword(password)
		onSuccess("Hasło zmieniono pomyślnie")
	})

	// submit handler
	const onSubmit = async ({ password }) => {
		try {
			setError(null)

			if (!password) throw Error("Podaj nowe hasło")

			await updatePasswordWithReauthentication(password)
		} catch (err) {
			setError(err)
		}
	}

	return (
		<>
			{reauthenticationModal()}
			<Heading>Zmień hasło</Heading>
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

export default ChangePassword
