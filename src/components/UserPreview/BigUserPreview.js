import { withRouter, Link } from "react-router-dom"
import moment from "moment"

import { useUser } from "../../hooks"
import { route, getProfilePictureURL } from "../../utils"

import { Button, ButtonContainer } from "../Button"
import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
import ContactModal from "../ContactModal"
import InfoItem from "../InfoItem"
import { SaveIconButton } from "../SaveButton"

import { Container, DetailsContainer, UsersList } from "./BigUserPreview.styles"

const BigUserPreview = withRouter(({ userId }) => {
  const [user, error] = useUser(userId)

  if (error) {
    return (
      <Container>
        <div className="error">Wystąpił błąd</div>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )
  }

  const profilePictureUrl = getProfilePictureURL(user, "S")
  const numDays = moment().diff(user.userSince, "days")
  // TODO: consider a different way to implement items counter
  // const numItems = user.items ? user.items.length : 0
  const numOpinions = user.feedback ? user.feedback.length : 0

  return (
    <Container>
      <div className="top-container">
        <ProfilePicture url={profilePictureUrl} size="40px" />
        <div className="name">{user.name}</div>
        <div className="follow-button-container">
          <SaveIconButton id={userId} type="user" scale={1.8} />
        </div>
      </div>
      <DetailsContainer>
        {/* TODO: avg rating */}
        <InfoItem size="m" name="W serwisie od">
          {numDays} dni
        </InfoItem>
        <InfoItem size="m" name="Opinie">
          {numOpinions}
        </InfoItem>
        {/* <InfoItem size="m" name="Przedmioty">
					{numItems}
				</InfoItem> */}
        {user.city && <InfoItem name="Miasto">{user.city}</InfoItem>}
      </DetailsContainer>

      <ButtonContainer vertical noMargin>
        <ContactModal userId={userId}>
          {({ open }) => (
            <Button primary fullWidth onClick={open}>
              Kontakt
            </Button>
          )}
        </ContactModal>
        <Button fullWidth as={Link} to={route("ACCOUNT_ITEMS", { id: userId })}>
          Zobacz Profil
        </Button>
      </ButtonContainer>
    </Container>
  )
})

export const UsersView = ({ users }) => (
  <UsersList>
    {users && users.map((userId) => <BigUserPreview key={userId} userId={userId} />)}
  </UsersList>
)

export default BigUserPreview
