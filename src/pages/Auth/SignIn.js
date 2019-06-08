import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"

import FormError from "../../components/FormElements/FormError"
import { CenteredContainer } from "../../components/Containers"
import { StyledLink } from "../../components/Basics"
import Separator from "../../components/Separator"

import { useFlash } from "../../hooks"
import { route } from "../../utils"

import EmailSignInForm from "./EmailSignIn"
import { GoogleButton, FacebookButton } from "./SocialSignIn"
import { getRedirectTo, Heading, LinkContainer } from "./common"

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
			<Heading>Zaloguj się</Heading>

			<SocialContainer>
				<GoogleButton {...commonProps} />
				<FacebookButton {...commonProps} />
			</SocialContainer>

			<Separator>lub</Separator>

			<EmailContainer>
				<EmailSignInForm {...commonProps} />
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