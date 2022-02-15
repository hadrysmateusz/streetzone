import React, { createContext, useCallback, useState } from "react"
import { Portal } from "react-portal"
import { nanoid } from "nanoid"

import { OuterContainer, OuterInnerContainer } from "./FlashMessages.styles"
import { Message } from "./Message"
import { AddMessageFn, FlashMessage } from "./types";

export const FlashContext = createContext<AddMessageFn | null>(null)



export const FlashMessagesProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<FlashMessage[]>([])

  const addMessage = useCallback<AddMessageFn>((message) => {
    const id = nanoid()
    const _message = { ...message, id }
    setMessages((messages) => [...messages, _message])
  }, [])

  const onDelete = useCallback((id: string) => {
    setMessages((messages) => messages.filter((a) => a.id !== id))
  }, [])

  return (
    <>
      <FlashContext.Provider value={addMessage}>
        {children}
      </FlashContext.Provider>
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
