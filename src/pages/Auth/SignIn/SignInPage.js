import { useState } from "react"
import { withRouter } from "react-router-dom"

import FormError from "../../../components/FormElements/FormError"
import { CenteredContainer } from "../../../components/Containers"
import { StyledLink } from "../../../components/Basics"
import Separator from "../../../components/Separator"
import HelmetBasics from "../../../components/HelmetBasics"

import { useFlash, useFirebase } from "../../../hooks"
import { getRedirectTo, route } from "../../../utils"

import { Heading, LinkContainer } from "../Common.styles"

import EmailSignInForm from "./EmailSignInForm"
import { GoogleButton, FacebookButton } from "./SocialSignInButton"
import {
  BannerContainer,
  BannerMessage,
  EmailContainer,
  SocialContainer,
} from "./SignInPage.styles"

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

  const onFormSubmit = async (values, form) => {
    try {
      // get values and attempt sign-in
      const { email, password } = values
      await firebase.signInWithEmail(email, password)

      // reset the form
      setTimeout(form.reset)

      onSuccessfulSignIn("Witaj ponownie")
    } catch (err) {
      onError(err)
    }
  }

  const onSuccessfulSignIn = (message) => {
    // show flash message
    if (message) {
      flashMessage({ type: "success", text: message })
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
    <HelmetBasics fullTitle="Zaloguj się" />
    <Banner />
    <CenteredContainer>
      <SignIn />
      <Separator />
      <SignUpLink />
    </CenteredContainer>
  </>
)

export default SignInPage
