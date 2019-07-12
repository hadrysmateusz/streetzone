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

const BannerContainer = styled.div`
	text-align: center;
	background: var(--black0);
	color: white;
	padding: var(--spacing4) var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		padding: var(--spacing5) var(--spacing3);
	}
	margin-top: calc(-1 * var(--page-header-margin));
`

const BannerMessage = styled.div`
	font-size: var(--fs-m);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		font-size: var(--fs-l);
	}
	font-weight: var(--semi-bold);
	text-shadow: 1px 1px #444;
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

	return (
		<>
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

const Banner = withRouter(({ location }) => {
	const reason = location.state ? location.state.redirectReason || null : null

	return reason ? (
		<BannerContainer>
			{reason.message && <BannerMessage>{reason.message}</BannerMessage>}
			{reason.details && <pre>{JSON.stringify(reason.details, 0, 2)}</pre>}
		</BannerContainer>
	) : null
})

const SignInPage = () => (
	<>
		<Banner />
		<CenteredContainer>
			<SignIn />
			<Separator />
			<SignUpLink />
		</CenteredContainer>
	</>
)

export default SignInPage
