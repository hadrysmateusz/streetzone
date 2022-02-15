import { useMemo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { useUserData } from "../../hooks"
import { route, getProfilePictureURL } from "../../utils"

import { Button } from "../Button"
import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
// import UserRating from "../UserRating"

import {
  ButtonContainer,
  Container,
  InfoItemContainer,
} from "./UserPreview.styles"

const InfoItem = ({ name, children }) => (
  <InfoItemContainer>
    <div>{name}</div>
    <div className="value">{children}</div>
  </InfoItemContainer>
)

const DumbUserPreview = ({
  profilePictureUrl,
  user,
  userId,
  error,
  onlyInfo = false,
  noButton = false,
}) => {
  const time = useMemo(
    () => moment().diff(user.userSince, "days"),
    [user.userSince]
  )
  return (
    <Container onlyInfo={onlyInfo}>
      {error ? (
        <div className="error">Wystąpił błąd</div>
      ) : !user ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="top-container">
            <ProfilePicture url={profilePictureUrl} size="40px" />
            <div className="name">{user.name}</div>
          </div>
          <div className="info-container">
            <InfoItem name="W serwisie od">{time} dni</InfoItem>
            {user.city && <InfoItem name="Miasto">{user.city}</InfoItem>}
          </div>
          {!onlyInfo && !noButton && (
            <ButtonContainer>
              <Button as={Link} to={route("ACCOUNT_ITEMS", { id: userId })}>
                Zobacz Profil
              </Button>
            </ButtonContainer>
          )}
        </>
      )}
    </Container>
  )
}

const SmartUserPreview = ({ userId, ...rest }) => {
  const [user, error] = useUserData(userId)
  const profilePictureUrl = getProfilePictureURL(user, "S")
  return user ? (
    <DumbUserPreview
      user={user}
      userId={userId}
      error={error}
      profilePictureUrl={profilePictureUrl}
      {...rest}
    />
  ) : null
}

const NewUserPreviewWrapper = ({ user, id, ...rest }) => {
  if (user) {
    const profilePictureUrl = getProfilePictureURL(user, "S")
    return (
      <DumbUserPreview
        user={user}
        userId={id}
        profilePictureUrl={profilePictureUrl}
        {...rest}
      />
    )
  } else {
    return <SmartUserPreview userId={id} {...rest} />
  }
}

export default NewUserPreviewWrapper
