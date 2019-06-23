import React from "react"
import styled from "styled-components/macro"
import { withRouter, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StatefulModal } from "../Modal/new"
import { ButtonContainer, Button } from "../Button"
import UserPreview from "../UserPreview/new"

import { useUser } from "../../hooks"
import { route } from "../../utils"
import { CONST } from "../../constants"

const ModalOuterContainer = styled.div`
	max-width: 100vw;
	min-height: 250px;
	width: 450px;
	overflow: hidden;
	padding: var(--spacing4);
	padding-top: var(--spacing3);
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

const ContactModal = ({ children, userId }) => {
	const [user, error] = useUser(userId)

	const hasEmail = user && user.email
	const hasMessenger = user && user.messengerLink
	const hasPhone = user && user.phone

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
									<UserPreview user={user} onlyInfo />
									<ButtonContainer vertical noMargin>
										<Button primary as={Link} to={route("CHAT_NEW", { id: userId })}>
											<FontAwesomeIcon icon={["far", "envelope"]} />
											&nbsp; Napisz Wiadomość
										</Button>
										{hasPhone && (
											<Button>
												Telefon / SMS<ButtonInfo>({user.phone})</ButtonInfo>
											</Button>
										)}
										{hasEmail && (
											<Button as="a" href={`mailto:${CONST.CONTACT_EMAIL}`}>
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