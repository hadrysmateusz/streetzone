import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useUserData } from "../../hooks"
import { route } from "../../utils"

import { Button, ButtonContainer, LinkButton } from "../Button"
import { ModalRenderProps, StatefulModal } from "../Modal"
import UserPreview from "../UserPreview"

import {
  ButtonInfo,
  Header,
  ModalOuterContainer,
  UserPreviewContainer,
} from "./ContactModal.styles"
import { getMailtoLink } from "./helpers"

interface ContactModalProps {
  userId: string
  subject?: string
  children: (modalContext: ModalRenderProps) => React.ReactNode
}

const ContactModal: React.FC<ContactModalProps> = ({
  children,
  userId,
  subject,
}) => {
  const [user, error] = useUserData(userId)

  const messengerLink: string | undefined = user?.messengerLink ?? undefined
  const mailtoLink: string | undefined =
    typeof user?.email === "string"
      ? getMailtoLink(user.email, subject)
      : undefined

  return (
    <StatefulModal>
      {({ open, close, isOpen, modal }) => (
        <>
          {children({ open, close, isOpen, modal })}
          {user
            ? modal(
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
                        <LinkButton
                          primary
                          to={route("CHAT_NEW", { id: userId })}
                        >
                          <FontAwesomeIcon icon={["far", "envelope"]} />
                          &nbsp; Napisz Wiadomość
                        </LinkButton>
                        {user.phone ? (
                          <Button>
                            Telefon / SMS<ButtonInfo>({user.phone})</ButtonInfo>
                          </Button>
                        ) : null}
                        {user.email && mailtoLink ? (
                          <LinkButton href={mailtoLink}>
                            Napisz maila<ButtonInfo>({user.email})</ButtonInfo>
                          </LinkButton>
                        ) : null}
                        {messengerLink ? (
                          <LinkButton href={messengerLink} social="messenger">
                            Napisz na Messengerze
                          </LinkButton>
                        ) : null}
                      </ButtonContainer>
                    </>
                  )}
                </ModalOuterContainer>
              )
            : null}
        </>
      )}
    </StatefulModal>
  )
}

export default ContactModal
