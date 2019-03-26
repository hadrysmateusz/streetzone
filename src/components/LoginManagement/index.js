import React, { useState, useEffect } from "react"

import PasswordManagement from "./PasswordManagement"
import SocialLoginManagement from "./SocialLoginManagement"
import useAuthentication from "../../hooks/useAuthentication"
import useFirebase from "../../hooks/useFirebase"
import LoadingSpinner from "../LoadingSpinner"
import { FormError } from "../FormElements"

const LoginManagement = () => {
	const firebase = useFirebase()
	const authUser = useAuthentication()

	const [activeMethods, setActiveMethods] = useState(null)
	const [error, setError] = useState(null)

	console.log("rerender")

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
		try {
			const credential = firebase.emailAuthProvider.credential(authUser.email, password)

			await firebase.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
			fetchActiveMethods()
		} catch (error) {
			setError(error)
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
		return <FormError message={error.message} show={!!error} />
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
			<PasswordManagement {...commonProps} onLink={onPasswordLoginLink} />
			<SocialLoginManagement
				{...commonProps}
				onLink={onSocialLoginLink}
				onUnlink={onUnlink}
			/>
		</>
	)
}

export default LoginManagement
