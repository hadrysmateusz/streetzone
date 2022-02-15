import { useState } from "react"

import { Button, ButtonContainer, LoaderButton } from "../../Button"

import { Heading } from "../Heading"

import { SocialLoginCardContainer } from "./SocialLoginCard.styles"

const SocialButton = ({ provider, ...rest }) => {
  switch (provider) {
    case "google.com":
      return <LoaderButton social="google" {...rest} />
    case "facebook.com":
      return <LoaderButton social="facebook" {...rest} />
    default:
      return <Button {...rest} />
  }
}

const SocialLoginCard = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
  const [isLoading, setIsLoading] = useState()

  const __onLink = () => {
    setIsLoading(true)
    onLink(signInMethod.provider)
    setIsLoading(false)
  }

  const __onUnlink = async () => {
    setIsLoading(true)
    await onUnlink(signInMethod.id)
    setIsLoading(false)
  }

  return (
    <SocialLoginCardContainer>
      <Heading>{signInMethod.name}</Heading>

      <div>
        <b>Status: </b>
        {isEnabled ? "połączono" : "nie połączono"}
      </div>

      <ButtonContainer>
        {isEnabled ? (
          <SocialButton
            isLoading={isLoading}
            text="Rozłącz"
            provider={signInMethod.id}
            onClick={__onUnlink}
            disabled={onlyOneLeft}
            title={onlyOneLeft ? "Nie można dezaktywować ostatniej metody logowania" : undefined}
          />
        ) : (
          <SocialButton
            isLoading={isLoading}
            text="Połącz"
            provider={signInMethod.id}
            onClick={__onLink}
          />
        )}
      </ButtonContainer>
    </SocialLoginCardContainer>
  )
}

export default SocialLoginCard
