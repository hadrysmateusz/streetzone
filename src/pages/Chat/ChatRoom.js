import { useEffect, useState, useRef, useContext } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview/old"
import ProfilePicture from "../../components/ProfilePicture"
import { Header, FullscreenMenuContext } from "../../components/FullscreenMenu"

import { useFirebase, useUserData } from "../../hooks"
import { route, getProfilePictureURL } from "../../utils"

import { NewChat } from "./NewChat"
import {
  ChatRoomContainer,
  MobileRoomStyles,
  DesktopRoomStyles,
  TopContainerMobile,
  MobileUserInfo,
} from "./StyledComponents"
import { Message } from "./Message"

const ChatRoomTopContainerMobile = ({ user }) => (
  <TopContainerMobile>
    {/* This Link will clear the selected room  */}
    <Link to={route("CHAT")}>
      <div className="back-button">
        <FontAwesomeIcon icon="arrow-left" />
      </div>
    </Link>

    {user && (
      <MobileUserInfo>
        <ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
        <span className="name">{user.name}</span>
      </MobileUserInfo>
    )}
  </TopContainerMobile>
)

const MessagesList = ({ messages, authUser, roomId }) =>
  messages.map((message) => (
    <Message {...message} key={message.id} user={authUser} roomId={roomId} />
  ))

export const ChatRoom = ({ id: roomId, otherUserId, authUser, isMobile, closeChat }) => {
  const firebase = useFirebase()
  const [messages, setMessages] = useState()
  const [otherUser, error] = useUserData(otherUserId)
  const fullscreenContext = useContext(FullscreenMenuContext)
  const desktopMessagesRef = useRef()

  useEffect(() => {
    // monitor new messages
    const unsubscribe = firebase.db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .onSnapshot((snap) => {
        // get new messages and write them to state
        const __messages = snap.docs.map((room) => room.data())
        setMessages(__messages)
      })

    return unsubscribe
  }, [roomId, firebase])

  useEffect(() => {
    // get the scrollable element
    const scrollableElement = fullscreenContext
      ? fullscreenContext.containerRef.current
      : desktopMessagesRef.current

    // return if no ref is available
    if (!scrollableElement) return

    // scroll the element to reveal the new message
    scrollableElement.scrollTop = scrollableElement.scrollHeight
  }, [messages, isMobile, fullscreenContext])

  // sort messages to put newest at the bottom
  if (messages) {
    messages.sort((a, b) => a.createdAt - b.createdAt)
  }

  if (!messages) return <LoadingSpinner />

  // render mobile
  if (isMobile) {
    return (
      <ChatRoomContainer>
        <MobileRoomStyles>
          <Header>
            <ChatRoomTopContainerMobile user={otherUser} />
          </Header>

          <div className="messages">
            <MessagesList messages={messages} authUser={authUser} roomId={roomId} />
          </div>

          <div className="bottom-container">
            <NewChat userId={otherUserId} />
          </div>
        </MobileRoomStyles>
      </ChatRoomContainer>
    )
  }

  // render desktop
  return (
    <ChatRoomContainer>
      <DesktopRoomStyles>
        <div className="top-container">
          <UserPreview id={otherUserId} />
        </div>

        <div className="messages" ref={desktopMessagesRef}>
          <MessagesList messages={messages} authUser={authUser} roomId={roomId} />
        </div>

        <div className="bottom-container">
          <NewChat userId={otherUserId} />
        </div>
      </DesktopRoomStyles>
    </ChatRoomContainer>
  )
}
