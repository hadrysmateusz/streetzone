import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import LoadingSpinner from "../LoadingSpinner"
import FormError from "../FormElements/FormError"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import { useFunctionWithReauthentication } from "../../pages/Auth/Reauthentication"

import PasswordManagement from "./PasswordManagement"
import SocialLoginManagement from "./SocialLoginManagement"

const Section = styled.div`
	margin: var(--spacing5) 0;
`

const LoginManagement = () => {
	const firebase = useFirebase()
	const authUser = useAuthentication()

	const [activeMethods, setActiveMethods] = useState(null)
	const [error, setError] = useState(null)
	const flashMessage = useFlash()

	const fetchActiveMethods = async () => {
		try {
			const activeMethods = await firebase.auth.fetchSignInMethodsForEmail(authUser.email)
			setActiveMethods(activeMethods)
		} catch (error) {
			setError(error)
		}
	}

	useEffect(() => {
		fetchActiveMethods()
	}, [authUser, firebase])

	const [
		linkWithCredentialWithReauthentication,
		reauthenticationModal
	] = useFunctionWithReauthentication((credential) =>
		firebase.auth.currentUser.linkWithCredential(credential)
	)

	const onPasswordLoginLink = async (password) => {
		try {
			const credential = firebase.emailAuthProvider.credential(authUser.email, password)
			await linkWithCredentialWithReauthentication(credential)
			flashMessage("Hasło dodano pomyślnie")
		} catch (err) {
			setError(err)
		}
		fetchActiveMethods()
	}

	const onSocialLoginLink = async (provider) => {
		try {
			await firebase.auth.currentUser.linkWithPopup(firebase[provider])
			flashMessage("Połączono pomyślnie")
		} catch (err) {
			setError(err)
		}
		fetchActiveMethods()
	}

	const onUnlink = async (providerId) => {
		try {
			await firebase.auth.currentUser.unlink(providerId)
			flashMessage("Rozłączono pomyślnie")
		} catch (err) {
			setError(err)
		}
		fetchActiveMethods()
	}

	if (!activeMethods) {
		return <LoadingSpinner fixedHeight />
	}

	const onlyOneLeft = activeMethods.length === 1

	const commonProps = {
		onlyOneLeft,
		activeMethods
	}

	return (
		<>
			{reauthenticationModal()}

			<FormError error={error} />

			<Section>
				<PasswordManagement {...commonProps} onLink={onPasswordLoginLink} />
			</Section>

			<Section>
				<SocialLoginManagement
					{...commonProps}
					onLink={onSocialLoginLink}
					onUnlink={onUnlink}
				/>
			</Section>
		</>
	)
}

export default LoginManagement
