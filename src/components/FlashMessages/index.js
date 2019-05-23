import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components/macro"
import { Portal } from "react-portal"
import shortid from "shortid"

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
  transform: translateX(-120%);
  opacity: 0;
}

to {
  transform: translateX(0);
  opacity: 1;
}
`
const fadeout = keyframes`
from {
  transform: translateX(0);
  opacity: 1;
}

to {
  transform: translateX(120%);
  opacity: 0;
}
`

const MessageContainer = styled.div`
	--animation-duration: 0.35s;
	/* when to start the exit animation */
	--exit-delay: calc(${(p) => p.ttl}ms - var(--animation-duration));

	margin-bottom: var(--spacing3);
	background: var(--black50);
	${"" /* border: 1px solid var(--black100); */}
	padding: var(--spacing1) var(--spacing2);
	color: white;
	animation-name: ${fadein}, ${fadeout};
	animation-duration: var(--animation-duration);
	animation-fill-mode: both, forwards;
	animation-timing-function: ease-out, ease-in;
	animation-delay: 0s, var(--exit-delay);
`

const Message = ({ ttl = 2500, id, textContent, type, onDelete }) => {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onDelete(id)
		}, ttl)

		return () => clearTimeout(timeoutId)
	})

	return <MessageContainer ttl={ttl}>{textContent}</MessageContainer>
}

export const FlashContext = React.createContext()

const FlashMessages = ({ children, ...props }) => {
	const [messages, setMessages] = useState([])

	const addMessage = (message, ttl) => {
		const id = shortid.generate()
		const _message = { ...message, id, ttl }

		setMessages([...messages, _message])
	}

	const onDelete = (id) => {
		setMessages(messages.filter((a) => a.id !== id))
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
