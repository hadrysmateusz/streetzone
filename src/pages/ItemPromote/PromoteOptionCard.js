import { useState } from "react"

import { LoaderButton } from "../../components/Button"

import { useFirebase } from "../../hooks"
import { getIPAddress } from "../../utils"

import {
  ErrorContainer,
  Header,
  InnerContainer,
  ManualLink,
  Price,
  PromoteOptionCardContainer,
  List,
  ListItem,
} from "./PromoteOptionCard.styles"

export const PromoteOptionCard = ({ name, price, level, items = [], main = false, itemId }) => {
  const firebase = useFirebase()
  const [isLoading, setIsLoading] = useState(false)
  const [redirectUri, setRedirectUri] = useState()
  const [error, setError] = useState(null)

  const onClick = async () => {
    setIsLoading(true)
    const ip = await getIPAddress()
    const data = { itemId, level, customerIp: ip }
    const promote = firebase.functions.httpsCallable("promote")

    try {
      const res = await promote(data)

      if (!res.data.redirectUri) {
        throw Error("No redirectUri received")
      }

      setRedirectUri(res.data.redirectUri)

      window.open(res.data.redirectUri, "_blank")

      // TODO: investigate this API
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PromoteOptionCardContainer main={main}>
      <Header main={main}>{name}</Header>
      <InnerContainer>
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>{item}</ListItem>
          ))}
        </List>
        <Price>{price}</Price>
        <LoaderButton
          isLoading={isLoading}
          text="Wybierz"
          loadingText="Przekierowywanie do płatności"
          fullWidth
          primary
          onClick={onClick}
          disabled={isLoading}
        />
        {error ? <ErrorContainer>Wystąpił problem, spróbuj ponownie później</ErrorContainer> : null}
        {redirectUri ? (
          <ManualLink>
            <a href={redirectUri} target="_blank" rel="noopener noreferrer">
              Jeśli przekierowanie nie nastąpiło automatycznie, kliknij tutaj by przejść do
              płatności.
            </a>
          </ManualLink>
        ) : null}
      </InnerContainer>
    </PromoteOptionCardContainer>
  )
}
