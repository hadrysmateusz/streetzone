import { useState } from "react"
import { withRouter } from "react-router-dom"

import { StyledLink } from "../../../components/Basics"
import { CenteredContainer } from "../../../components/Containers"
import Separator from "../../../components/Separator"
import FormError from "../../../components/FormElements/FormError"
import HelmetBasics from "../../../components/HelmetBasics"

import { useFlash } from "../../../hooks"
import { getRedirectTo, route } from "../../../utils"

import { Heading, LinkContainer } from "../Common.styles"

import SignUpForm from "./SignUpForm"

const SignInLink = () => (
  <LinkContainer>
    Masz już konto? <StyledLink to={route("SIGN_IN")}>Zaloguj się</StyledLink>
  </LinkContainer>
)

export const SignUp = withRouter(({ location, history }) => {
  const flashMessage = useFlash()
  const [error, setError] = useState()

  const onSuccess = (message) => {
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

  return (
    <>
      <Heading>Utwórz konto</Heading>
      <SignUpForm onSuccess={onSuccess} onError={onError} />
      <FormError error={error} />
    </>
  )
})

const SignUpPage = () => (
  <>
    <HelmetBasics fullTitle="Utwórz konto" />
    <CenteredContainer>
      <SignUp />
      <Separator />
      <SignInLink />
    </CenteredContainer>
  </>
)

export default SignUpPage
