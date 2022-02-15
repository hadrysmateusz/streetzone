import { useEffect, useState } from "react"
import moment from "moment"

import { getProfilePictureURL } from "../../utils"
import { ROUTES } from "../../constants"
import { useFirebase } from "../../hooks"

import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
import UserRating from "../UserRating"
import {TextBlock} from "../StyledComponents"

import { Name, InfoContainer, Container } from "./old.styles"

const INITIAL_STATE = {
  isLoading: true,
  user: null,
  error: null,
}

export const UserPreview = ({ id }) => {
  const firebase = useFirebase()

  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    setState(INITIAL_STATE)
    firebase.getUserData(id).then(({ user, error }) => {
      setState({
        isLoading: false,
        user,
        error,
      })
    })
  }, [firebase, id])

  if (state.error) {
    return (
      <Container>
        <ProfilePicture size="60px" url="" inline />
        <InfoContainer>
          <Name removed>
            <em>Nie znaleziono użytkownika</em>
          </Name>
        </InfoContainer>
      </Container>
    )
  }

  if (!state.isLoading && state.user) {
    const formattedDate = moment(Date.now()).diff(state.user.userSince, "days")
    return (
      <Container as="a" href={ROUTES.ACCOUNT_ITEMS.replace(":id", id)}>
        <ProfilePicture
          size="60px"
          url={getProfilePictureURL(state.user, "M")}
          inline
        />
        <InfoContainer>
          <Name>{state.user.name}</Name>
          <TextBlock size="s">W serwisie od {formattedDate} dni</TextBlock>
          <div>
            <UserRating size="15px" userId={state.user.id} />
          </div>
        </InfoContainer>
      </Container>
    )
  }

  return <LoadingSpinner fixedHeight />
}

export default UserPreview
