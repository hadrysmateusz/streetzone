import React, { useState, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import ProfilePicture from "../ProfilePicture"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useAuthentication, useUserData } from "../../hooks"
import { route } from "../../utils"

export const Submenu = styled.div`
  background: white;

  border: 1px solid var(--gray75);

  display: grid;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  min-height: 50px;
`

export const SubmenuContainer = styled.div`
  position: absolute;
  top: 100%;

  ${(p) => `${p.align}: 0;`}
  z-index: 81;

  display: none;
`

const Indicator = styled.div`
  position: relative;
  font-size: 1.9rem;

  .number-display {
    --size: 1.8rem;
    position: absolute;
    bottom: -1px;
    right: -5px;
    border-radius: calc(var(--size) / 2);
    background: var(--black0);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 6px;
    /* width: auto; */
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const MessagesContainer = styled.div`
  padding: var(--spacing2) 0;
`

const MessageStyles = styled.div`
  padding: var(--spacing2) var(--spacing3);
  font-size: 11px;

  :hover {
    background: var(--almost-white);
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing1);

    .name {
      font-weight: bold;
      text-transform: uppercase;
      margin-left: var(--spacing2);
    }
  }

  .message {
    color: var(--black75);
  }
`

const HasMoreContainer = styled.div`
  border-top: 1px solid var(--gray75);
  padding: var(--spacing2) var(--spacing3);
  font-weight: bold;
  background: var(--almost-white);

  :hover {
    background: var(--gray100);
  }
`

const MessagesListOuterContainer = styled.div`
  /* reset the changes applied by active link styles */
  font-size: initial;
  text-transform: initial;
  color: initial;
  font-weight: initial;
`

const ManagerStyles = styled.div`
  color: black;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  .empty-state {
    padding: var(--spacing3);
    font-style: italic;
    color: var(--gray0);
  }

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover > ${SubmenuContainer} {
      display: block;
    }
  }
`

const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--fs-xs);
  color: var(--gray0);
`

const useRooms = () => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const [rooms, setRooms] = useState(null)

  useEffect(() => {
    const fetchRooms = () => {
      const unsubscribe = firebase
        .user(authUser.uid)
        .collection("rooms")
        .onSnapshot((snap) => {
          const __rooms = snap.docs.map((roomSnap) => roomSnap.data())
          setRooms(__rooms)
        })

      return unsubscribe
    }

    if (!authUser) return
    const unsubscribe = fetchRooms()
    return unsubscribe
  }, [authUser, firebase])

  return rooms
}

const HasMoreMessages = () => <HasMoreContainer>Zobacz wszystkie wiadomości</HasMoreContainer>

const Message = ({ message, author, roomId }) => {
  const [user, error] = useUserData(author)

  return !error && user ? (
    <MessageStyles>
      <Link to={route("CHAT_ROOM", { roomId })}>
        <div className="header">
          <ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
          <span className="name">{user.name}</span>
        </div>
        <div className="message">{message}</div>
      </Link>
    </MessageStyles>
  ) : null
}

const MessagesList = memo(({ messages, hasMoreMessages }) => {
  const hasMessages = messages && messages.length > 0

  return (
    <MessagesListOuterContainer>
      {hasMessages ? (
        <MessagesContainer>
          {messages.map((message) => (
            <Message {...message} key={message.id} />
          ))}
        </MessagesContainer>
      ) : (
        <EmptyState>Brak nowych wiadomości</EmptyState>
      )}
      {hasMoreMessages && <HasMoreMessages />}
    </MessagesListOuterContainer>
  )
})

const MessagesManager = memo(({ rooms }) => {
  const firebase = useFirebase()
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const mergeMessages = (newMessages) => {
      return setMessages((oldMessages) => {
        const filteredKeys = Object.keys(oldMessages).filter((key) => {
          return !!newMessages[key]
        })

        const filteredMessages = filteredKeys.map((key) => oldMessages[key])

        return { ...filteredMessages, ...newMessages }
      })
    }

    if (rooms) {
      const unsubscribeArr = rooms.map((room) => {
        const unsubscribe = firebase.db
          .collection("rooms")
          .doc(room.id)
          .collection("messages")
          .where("unread", "==", true)
          .where("author", "==", room.otherUserId)
          .onSnapshot((snap) => {
            const __messages = {}
            snap.docs.forEach((snap) => {
              // add message along with room id to object for merging
              __messages[snap.id] = { ...snap.data(), roomId: room.id }
            })
            mergeMessages(__messages)
          })

        return unsubscribe
      })

      const unsubscribeAll = () => {
        unsubscribeArr.forEach((fn) => fn())
      }

      return unsubscribeAll
    }
  }, [firebase.db, rooms])

  const MAX_DISPLAY_MESSAGES_NUM = 8

  const messagesArr = Object.values(messages)
  const messagesCount = messagesArr.length
  const hasMessages = !!messages && messagesCount > 0
  const hasMoreMessages = messagesCount > MAX_DISPLAY_MESSAGES_NUM

  // get only the first few messages for display
  const clippedMessagesArr = hasMoreMessages
    ? messagesArr && messagesArr.slice(MAX_DISPLAY_MESSAGES_NUM - 1)
    : [...messagesArr]

  return (
    <ManagerStyles>
      <Indicator>
        <FontAwesomeIcon icon={["far", "envelope"]} />
        {hasMessages && <div className="number-display">{messagesCount}</div>}
      </Indicator>
      <SubmenuContainer align="right">
        <Submenu>
          <MessagesList messages={clippedMessagesArr} hasMoreMessages={hasMoreMessages} />
        </Submenu>
      </SubmenuContainer>
    </ManagerStyles>
  )
})

const MessagingManager = () => {
  const rooms = useRooms()

  return <MessagesManager rooms={rooms} />
}

export default MessagingManager
