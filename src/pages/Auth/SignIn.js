import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"

import FormError from "../../components/FormElements/FormError"
import { CenteredContainer } from "../../components/Containers"
import { StyledLink } from "../../components/Basics"
import Separator from "../../components/Separator"

import { useFlash, useFirebase } from "../../hooks"
import { getRedirectTo, route } from "../../utils"

import EmailSignInForm from "./EmailSignInForm"
import { GoogleButton, FacebookButton } from "./SocialSignIn"
import { Heading, LinkContainer } from "./common"

const SocialContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
	margin-bottom: calc(var(--spacing3) - 5px);
`

const EmailContainer = styled.div`
	margin-top: calc(var(--spacing3) - 12px);
	margin-bottom: var(--spacing3);
`

const PasswordForgetLink = () => (
	<LinkContainer>
		<StyledLink to={route("PASSWORD_FORGET")}>Zapomniałeś hasła?</StyledLink>
	</LinkContainer>
)

const SignUpLink = () => (
	<LinkContainer>
		Nie masz jeszcze konta? <StyledLink to={route("SIGN_UP")}>Utwórz konto</StyledLink>
	</LinkContainer>
)

export const SignIn = withRouter(({ history, location }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const [error, setError] = useState()

	const onFormSubmit = async (values, actions) => {
		try {
			// get values and attempt sign-in
			const { email, password } = values
			await firebase.signInWithEmail(email, password)

			// reset the form
			actions.reset()

			onSuccessfulSignIn("Witaj ponownie")
		} catch (err) {
			onError(err)
		}
	}

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

	const reason = location.state ? location.state.redirectReason || null : null

	return (
		<>
			{reason && (
				<>
					{reason.message && <h1>{reason.message}</h1>}
					{reason.details && <pre>{JSON.stringify(reason.details, 0, 2)}</pre>}
				</>
			)}

			<Heading>Zaloguj się</Heading>

			<SocialContainer>
				<GoogleButton {...commonProps} />
				<FacebookButton {...commonProps} />
			</SocialContainer>

			<Separator>lub</Separator>

			<EmailContainer>
				<EmailSignInForm onError={onError} onSubmit={onFormSubmit} />
				<FormError error={error} />
				<PasswordForgetLink />
			</EmailContainer>
		</>
	)
})

const SignInPage = () => (
	<CenteredContainer>
		<SignIn />
		<Separator />
		<SignUpLink />
	</CenteredContainer>
)

export default SignInPage
