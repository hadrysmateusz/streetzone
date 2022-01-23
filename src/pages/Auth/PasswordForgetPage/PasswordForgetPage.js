import { useState } from "react"

import { StyledLink } from "../../../components/Basics"
import FormError from "../../../components/FormElements/FormError"
import HelmetBasics from "../../../components/HelmetBasics"
import { CenteredContainer } from "../../../components/Containers"
import Separator from "../../../components/Separator"

import { route } from "../../../utils"

import { Heading } from "./../Common.styles"

import { OuterContainer, SuccessBox } from "./PasswordForgetPage.styles"
import { PasswordForgetForm } from "./PasswordForgetForm"

const PasswordForget = () => {
  const [error, setError] = useState()
  const [isEmailSent, setIsEmailSent] = useState(false)

  const onSuccess = () => {
    setIsEmailSent(true)
  }

  const onError = (err) => {
    setError(err)
  }

  return (
    <OuterContainer>
      {isEmailSent ? (
        <SuccessBox>
          Na podany adres e-mail została wysłana wiadomość z linkiem do zresetowania hasła. (Jeśli
          nie otrzymasz wiadomości w ciągu 5 minut, sprawdź folder ze spamem)
        </SuccessBox>
      ) : (
        <div>
          <PasswordForgetForm onSuccess={onSuccess} onError={onError} />
          <FormError error={error} />
        </div>
      )}
      <Separator />
      <StyledLink to={route("SIGN_IN")}>Wróć do logowania</StyledLink>
    </OuterContainer>
  )
}

const PasswordForgetPage = () => (
  <>
    <HelmetBasics fullTitle="Zresetuj hasło" />
    <CenteredContainer>
      <Heading>Zresetuj hasło</Heading>
      <PasswordForget />
    </CenteredContainer>
  </>
)

export default PasswordForgetPage
