import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useUser } from "../../hooks"
import { route } from "../../utils"

import { ButtonContainer, Button } from "../Button"
import { StatefulModal } from "../Modal"
import UserPreview from "../UserPreview"

import {
  ButtonInfo,
  Header,
  ModalOuterContainer,
  UserPreviewContainer,
} from "./ContactModal.styles"
import { getMailtoLink } from "./helpers"

const ContactModal = ({ children, userId, subject }) => {
  const [user, error] = useUser(userId)

  const hasEmail = user && user.email
  const hasMessenger = user && user.messengerLink
  const hasPhone = user && user.phone
  const mailtoLink = user && getMailtoLink(user.email, subject)

  return (
    <StatefulModal>
      {({ open, close, isOpen, modal }) => (
        <>
          {children({ open, close, isOpen, modal })}
          {modal(
            <ModalOuterContainer>
              {error ? (
                "Wystąpił błąd"
              ) : (
                <>
                  <Header>Kontakt</Header>
                  <UserPreviewContainer>
                    <UserPreview user={user} onlyInfo />
                  </UserPreviewContainer>
                  <ButtonContainer vertical noMargin>
                    {/* TODO: if there is already a common chat room, switch to chat room view instead of the new message route (or maybe remove the new message route completely) */}
                    <Button primary as={Link} to={route("CHAT_NEW", { id: userId })}>
                      <FontAwesomeIcon icon={["far", "envelope"]} />
                      &nbsp; Napisz Wiadomość
                    </Button>
                    {hasPhone && (
                      <Button>
                        Telefon / SMS<ButtonInfo>({user.phone})</ButtonInfo>
                      </Button>
                    )}
                    {hasEmail && mailtoLink && (
                      <Button as="a" href={mailtoLink}>
                        Napisz maila<ButtonInfo>({user.email})</ButtonInfo>
                      </Button>
                    )}
                    {hasMessenger && (
                      <Button social="messenger" as="a" href={user.messengerLink}>
                        Napisz na Messengerze
                      </Button>
                    )}
                  </ButtonContainer>
                </>
              )}
            </ModalOuterContainer>
          )}
        </>
      )}
    </StatefulModal>
  )
}

export default withRouter(ContactModal)
