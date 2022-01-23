import { useState, createContext } from "react"
import { Portal } from "react-portal"
import { nanoid } from "nanoid"

import { OuterContainer, OuterInnerContainer } from "./FlashMessages.styles"
import { Message } from "./Message"

export const FlashContext = createContext()

export const FlashMessages = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    const id = nanoid()
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
          <OuterInnerContainer>
            {messages.map((message) => (
              <Message key={message.id} {...message} onDelete={onDelete} />
            ))}
          </OuterInnerContainer>
        </OuterContainer>
      </Portal>
    </>
  )
}
