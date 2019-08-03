import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components/macro"
import { Portal } from "react-portal"
import shortid from "shortid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OuterContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const fadein = keyframes`
from {
  transform: translateY(120%);
  opacity: 0;
}

to {
  transform: translateY(0);
  opacity: 1;
}
`
const fadeout = keyframes`
from {
  transform: translateY(0);
  opacity: 1;
}

to {
  transform: translateY(120%);
  opacity: 0;
}
`

const MessageContainer = styled.div`
	--animation-duration: 0.35s;
	/* when to start the exit animation */
	--exit-delay: calc(${(p) => p.ttl}ms - var(--animation-duration));

	animation-name: ${fadein}, ${fadeout};
	animation-duration: var(--animation-duration);
	animation-fill-mode: both, forwards;
	animation-timing-function: ease-out, ease-out;
	animation-delay: 0s, var(--exit-delay);

	color: #303030;
	/* border-radius: 3px; */
	border-left: 4px solid var(--success50);
	padding: var(--spacing3) 0;
	background: white;
	box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
	margin-bottom: var(--spacing3);
`

const IconContainer = styled.div`
	color: var(--success50);
	font-size: 25px;
	padding-left: 14px;
`
const Heading = styled.div`
	font-size: var(--fs-s);
	font-weight: bold;
`
const Details = styled.div`
	font-size: 13px;
	color: var(--gray0);
`
const ContentContainer = styled.div`
	padding-left: 14px;
	padding-right: var(--spacing3);
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Message = ({ ttl = 5000, id, text, details, type, onDelete }) => {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onDelete(id)
		}, ttl)

		return () => clearTimeout(timeoutId)
	})

	let icon
	switch (type) {
		case "success":
			icon = "check-circle"
			break
		case "error":
			icon = "exclamation-circle"
			break
		case "info":
			icon = "info-circle"
			break
		default:
			throw Error(`invalid flash message type (${type})`)
	}

	return (
		<MessageContainer ttl={ttl}>
			<IconContainer>
				<FontAwesomeIcon icon={icon} />
			</IconContainer>
			<ContentContainer>
				<Heading>{text}</Heading>
				{details && <Details>{details}</Details>}
			</ContentContainer>
		</MessageContainer>
	)
}

export const FlashContext = React.createContext()

const FlashMessages = ({ children }) => {
	const [messages, setMessages] = useState([])

	const addMessage = (message) => {
		const id = shortid.generate()
		const _message = { ...message, id }
		setMessages((messages) => [...messages, _message])
	}

	const onDelete = (id) => {
		setMessages((messages) => messages.filter((a) => a.id !== id))
	}

	return (
		<>
			<FlashContext.Provider value={addMessage}>{children}</FlashContext.Provider>
			<Portal>
				<OuterContainer>
					{messages.map((message) => (
						<Message key={message.id} {...message} onDelete={onDelete} />
					))}
				</OuterContainer>
			</Portal>
		</>
	)
}

export default FlashMessages
