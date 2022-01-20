import React from "react"
import styled from "styled-components/macro"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StatefulModal } from "../Modal/new"
import { ButtonContainer, Button } from "../Button"
import UserPreview from "../UserPreview"

import { useUser } from "../../hooks"
import { route } from "../../utils"

const ModalOuterContainer = styled.div`
  max-width: 100vw;
  min-height: 250px;
  width: 450px;
  overflow: hidden;
  padding: var(--spacing4);
  padding-top: var(--spacing3);
`

const UserPreviewContainer = styled.div`
  margin-bottom: var(--spacing3);
`

const Header = styled.div`
  font-size: var(--fs-l);
  font-weight: bold;
  text-align: center;
  margin-bottom: var(--spacing3);
`

const ButtonInfo = styled.div`
  text-transform: initial;
  color: var(--gray25);
  padding-left: var(--spacing2);
`

const getMailtoLink = (email, subject) => {
  if (!email) return null

  let mailtoLink = `mailto:${email}`
  if (subject) mailtoLink += `?subject=${subject}`

  return mailtoLink
}

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
