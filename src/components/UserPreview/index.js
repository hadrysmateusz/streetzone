import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import styled, { css } from "styled-components/macro"

import { Button } from "../Button"
import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
// import UserRating from "../UserRating"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useUser } from "../../hooks"
import { route } from "../../utils"

const Container = styled.div`
  background: ${(p) => !p.onlyInfo && "var(--almost-white)"};
  padding: ${(p) => !p.onlyInfo && "var(--spacing3)"};
  color: var(--black75);
  .top-container {
    display: flex;
    align-items: center;
    .name {
      font-size: var(--fs-l);
      font-weight: bold;
      margin-left: var(--spacing2);
    }
  }
  .info-container {
    margin-top: var(--spacing3);
  }
  .error {
    color: var(--gray0);
    text-align: center;
    padding: var(--spacing4) 0;
  }
`

const InfoItem = ({ name, children }) => (
  <div
    css={css`
      display: flex;
      justify-content: space-between;
      .value {
        font-weight: bold;
      }
    `}
  >
    <div>{name}</div>
    <div className="value">{children}</div>
  </div>
)

const ButtonContainer = styled.div`
  margin-top: var(--spacing3);
`

const DumbUserPreview = ({
  profilePictureUrl,
  user,
  userId,
  error,
  onlyInfo = false,
  noButton = false,
}) => {
  const time = useMemo(() => moment().diff(user.userSince, "days"), [user.userSince])
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
  const [user, error] = useUser(userId)
  const profilePictureUrl = getProfilePictureURL(user, "S")
  return (
    <DumbUserPreview
      user={user}
      userId={userId}
      error={error}
      profilePictureUrl={profilePictureUrl}
      {...rest}
    />
  )
}

const NewUserPreviewWrapper = ({ user, id, ...rest }) => {
  if (user) {
    const profilePictureUrl = getProfilePictureURL(user, "S")
    return (
      <DumbUserPreview user={user} userId={id} profilePictureUrl={profilePictureUrl} {...rest} />
    )
  } else {
    return <SmartUserPreview userId={id} {...rest} />
  }
}

export default NewUserPreviewWrapper
