import React, { useState } from "react"
import { withRouter } from "react-router-dom"

import FormError from "../../components/FormElements/FormError"

import { useFlash } from "../../hooks"

import EmailSignInForm from "./email"
import { GoogleButton, FacebookButton } from "./social"
import { getRedirectTo } from "./common"

export const SignInPage = withRouter(({ history, location }) => {
	const flashMessage = useFlash()
	const [error, setError] = useState()

	const onSuccessfulSignIn = (message) => {
		// show flash message
		if (message) {
			flashMessage({ type: "success", textContent: message })
		}

		// redirect
		const redirectTo = getRedirectTo(location)
		history.replace(redirectTo)
	}

	const onError = (err) => {
		setError(err)
	}

	const commonProps = { onSuccess: onSuccessfulSignIn, onError }

	return (
		<div>
			<EmailSignInForm {...commonProps} />
			<GoogleButton {...commonProps} />
			<FacebookButton {...commonProps} />
			<FormError error={error} />
		</div>
	)
})

export default SignInPage
