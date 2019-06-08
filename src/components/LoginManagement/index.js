import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import PasswordManagement from "./PasswordManagement"
import SocialLoginManagement from "./SocialLoginManagement"
import useAuthentication from "../../hooks/useAuthentication"
import useFirebase from "../../hooks/useFirebase"
import LoadingSpinner from "../LoadingSpinner"
import ErrorBox from "../ErrorBox"

import ReauthenticationModal from "../../pages/Auth/Reauthentication"

const Section = styled.div`
	margin: var(--spacing5) 0;
`

const LoginManagement = () => {
	const firebase = useFirebase()
	const authUser = useAuthentication()

	// const [isReauthModalOpen, setIsReauthModalOpen] = useState(false)
	const [reauthenticationAction, setReauthenticationAction] = useState(null)
	const [activeMethods, setActiveMethods] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchActiveMethods()
	}, [])

	const fetchActiveMethods = async () => {
		try {
			const activeMethods = await firebase.auth.fetchSignInMethodsForEmail(authUser.email)
			setActiveMethods(activeMethods)
			setError(null)
		} catch (error) {
			setError(error)
		}
	}

	const onPasswordLoginLink = async (password) => {
		// define the function
		const handler = async () => {
			console.log("fn running!")

			const credential = firebase.emailAuthProvider.credential(authUser.email, password)

			await firebase.auth.currentUser.linkWithCredential(credential)

			fetchActiveMethods()
		}

		try {
			await handler()
		} catch (error) {
			if (error.code === "auth/requires-recent-login") {
				setReauthenticationAction({ handler })
			} else {
				setError(error)
			}
		}
	}

	const onSocialLoginLink = async (provider) => {
		try {
			await firebase.auth.currentUser.linkWithPopup(firebase[provider])
			fetchActiveMethods()
		} catch (error) {
			setError(error)
		}
	}

	const onUnlink = async (providerId) => {
		try {
			await firebase.auth.currentUser.unlink(providerId)
			fetchActiveMethods()
		} catch (error) {
			setError(error)
		}
	}

	if (error) {
		console.log(error)
		return <ErrorBox error="Wystąpił problem" />
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
			{reauthenticationAction && (
				<ReauthenticationModal
					onSuccess={reauthenticationAction}
					onRequestClose={() => {
						setReauthenticationAction(null)
					}}
				/>
			)}
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
