import { useState, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProfilePicture from "../ProfilePicture"

import { useFirebase, useAuthentication, useUserData } from "../../hooks"
import { route, getProfilePictureURL } from "../../utils"

import {
  EmptyState,
  HasMoreContainer,
  Indicator,
  ManagerStyles,
  MessagesContainer,
  MessagesListOuterContainer,
  MessageStyles,
  Submenu,
  SubmenuContainer,
} from "./MessagesManager.styles"

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
