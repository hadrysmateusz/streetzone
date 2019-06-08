import React, { useState } from "react"
import { withRouter } from "react-router-dom"

import { StyledLink } from "../../components/Basics"
import { CenteredContainer } from "../../components/Containers"
import Separator from "../../components/Separator"
import FormError from "../../components/FormElements/FormError"

import { useFlash } from "../../hooks"
import { route } from "../../utils"

import { getRedirectTo, Heading, LinkContainer } from "./common"
import SignUpForm from "./SignUpForm"

const SignInLink = () => {
	return (
		<LinkContainer>
			Masz już konto? <StyledLink to={route("SIGN_IN")}>Zaloguj się</StyledLink>
		</LinkContainer>
	)
}

export const SignUp = withRouter(({ location, history }) => {
	const flashMessage = useFlash()
	const [error, setError] = useState()

	const onSuccess = (message) => {
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

	return (
		<>
			<Heading>Utwórz konto</Heading>
			<SignUpForm onSuccess={onSuccess} onError={onError} />
			<FormError error={error} />
		</>
	)
})

const SignUpPage = () => {
	return (
		<CenteredContainer>
			<SignUp />
			<Separator />
			<SignInLink />
		</CenteredContainer>
	)
}

export default SignUpPage
