import { useState } from "react"

import { useFirebase } from "../../../hooks"
import { CONST } from "../../../constants"

import ErrorBox from "../../ErrorBox"
import InfoBox from "../../InfoBox"

import { Heading } from "../Heading"

import SocialLoginCard from "./SocialLoginCard"
import signInMethods from "./signInMethods"
import { SocialCardsContainer, SocialContainer } from "./SocialLoginManagement.styles"

const SocialLoginManagement = ({ activeMethods, onSuccess }) => {
  const firebase = useFirebase()
  const [error, setError] = useState(null)

  const onlyOneLeft = activeMethods.length === 1

  const onLink = async (provider) => {
    try {
      await firebase.auth.currentUser.linkWithPopup(firebase[provider])
      onSuccess("Połączono pomyślnie")
    } catch (err) {
      setError(err)
    }
  }

  const onUnlink = async (providerId) => {
    try {
      await firebase.auth.currentUser.unlink(providerId)
      onSuccess("Rozłączono pomyślnie")
    } catch (err) {
      setError(err)
    }
  }

  return (
    <SocialContainer>
      <Heading>Konta Społecznościowe</Heading>

      <InfoBox>
        Połącz swoje konto na {CONST.BRAND_NAME} z jednym lub więcej kontami społecznościowymi, by
        móc logować się za ich pomocą do serwisu.
      </InfoBox>

      <SocialCardsContainer>
        {signInMethods.map((signInMethod) => {
          const isEnabled = activeMethods.includes(signInMethod.id)

          return (
            <SocialLoginCard
              key={signInMethod.id}
              isEnabled={isEnabled}
              onlyOneLeft={onlyOneLeft}
              signInMethod={signInMethod}
              onUnlink={onUnlink}
              onLink={onLink}
            />
          )
        })}
      </SocialCardsContainer>

      <ErrorBox error={error} />
    </SocialContainer>
  )
}

export default SocialLoginManagement
