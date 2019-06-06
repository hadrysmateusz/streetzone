import React, { useState } from "react"
import { withRouter } from "react-router-dom"

import FormError from "../../components/FormElements/FormError"
import { CenteredContainer } from "../../components/Containers"
import { ButtonContainer } from "../../components/Button"

import { useFlash } from "../../hooks"

import EmailSignInForm from "./email"
import { GoogleButton, FacebookButton } from "./social"
import { getRedirectTo } from "./common"

export const SignIn = withRouter(({ history, location }) => {
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
		<>
			<EmailSignInForm {...commonProps} />
			<ButtonContainer vertical noMargin>
				<GoogleButton {...commonProps} />
				<FacebookButton {...commonProps} />
			</ButtonContainer>
			<FormError error={error} />
		</>
	)
})

const SignInPage = () => (
	<CenteredContainer>
		<SignIn />
	</CenteredContainer>
)

export default SignInPage
