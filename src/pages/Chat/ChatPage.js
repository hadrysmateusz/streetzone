import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { withBreakpoints } from "react-breakpoints";
import cloneDeep from "lodash/cloneDeep";
import { compose } from "recompose";

import { NotificationsDisabledBar } from "../../components/NotificationsDisabled";
import FullscreenMenu, { Header } from "../../components/FullscreenMenu";
import { isAuthenticated, withAuthorization } from "../../components/UserSession";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PageContainer } from "../../components/Containers";
import EmptyState from "../../components/EmptyState";

import { useFirebase } from "../../hooks";
import { route } from "../../utils";

import { NoMessagesContainer, NoRoomSelected, OuterContainer } from "./StyledComponents";
import { ChatRoom } from "./ChatRoom";
import { ChatRoomsList } from "./ChatRoomsList";

const ChatPage = ({ currentBreakpoint,authUser}) => {
  const firebase = useFirebase()
  const history = useHistory()
  const match = useRouteMatch()
  const location = useLocation()

  const [rooms, setRooms] = useState()
  const [currentRoom, setCurrentRoom] = useState()

  // Get the current roomId from the url parameter
  const { roomId } = match.params

  // Get user's rooms
  useEffect(() => {
    ;(async () => {
      const currentUserRef = firebase.currentUser()

      if (!currentUserRef) return

      const roomsSnap = await currentUserRef.collection("rooms").get()
      const __rooms = roomsSnap.docs.map((room) => room.data())
      setRooms(__rooms)
    })()
  }, [authUser, firebase])

  // Get currently selected room from the list
  useEffect(() => {
    if (!roomId) {
      setCurrentRoom(null)
    } else {
      // find room with correct id
      const __currentRoom = rooms ? rooms.find((a) => a.id === roomId) : null

      setCurrentRoom(__currentRoom)
    }
  }, [roomId, rooms])

  const closeChat = useCallback(() => {
    // use destructuring to prevent "location.state is undefined" error
    const { redirectTo } = location.state || {
      redirectTo: { pathname: route("HOME") },
    }
    history.replace(redirectTo)
  }, [history, location.state])

  const isMobile = currentBreakpoint < 1

  const hasRooms = rooms && rooms.length > 0
  const hasSelectedRoom = !!currentRoom

  const chatRoomProps = { ...currentRoom, authUser, isMobile, closeChat }

  console.log(cloneDeep(chatRoomProps))

  return isMobile ? (
    <ChatPageMobile
      closeChat={closeChat}
      rooms={rooms}
      hasRooms={hasRooms}
      hasSelectedRoom={hasSelectedRoom}
      chatRoomProps={chatRoomProps}
    />
  ) : (
    <ChatPageDesktop
      rooms={rooms}
      hasRooms={hasRooms}
      hasSelectedRoom={hasSelectedRoom}
      chatRoomProps={chatRoomProps}
    />
  )
}

const ChatPageMobile = ({
  closeChat,
  rooms,
  hasRooms,
  hasSelectedRoom,
  chatRoomProps,
}) => {
  console.log("ChatPageMobile", chatRoomProps)

  return (
    <FullscreenMenu
      onClose={closeChat}
      startOpen
      animate={false}
      renderWhenOpen={() =>
        !rooms ? (
          <div>
            <Header>Wybierz z listy</Header>
            <NotificationsDisabledBar noMargin />
            <LoadingSpinner />
          </div>
        ) : hasSelectedRoom ? (
          <ChatRoom {...chatRoomProps} />
        ) : hasRooms ? (
          <div className="menu-content">
            <Header>Wybierz z listy</Header>
            <NotificationsDisabledBar noMargin />
            <ChatRoomsList rooms={rooms} />
          </div>
        ) : (
          <div>
            <Header>Wybierz z listy</Header>
            <NotificationsDisabledBar noMargin />
            <NoMessages />
          </div>
        )
      }
    />
  )
}

const ChatPageDesktop = ({
  rooms,
  hasRooms,
  hasSelectedRoom,
  chatRoomProps,
}) => {
  console.log("ChatPageDesktop", chatRoomProps)

  return !rooms ? (
    <LoadingSpinner />
  ) : (
    <>
      <NotificationsDisabledBar />
      <PageContainer>
        {hasRooms ? (
          <OuterContainer>
            <div className="sidebar">
              <ChatRoomsList rooms={rooms} />
            </div>
            <div className="chat-container">
              {hasSelectedRoom ? (
                <ChatRoom {...chatRoomProps} />
              ) : (
                <NoRoomSelected>Wybierz osobę z listy</NoRoomSelected>
              )}
            </div>
          </OuterContainer>
        ) : (
          <NoMessages />
        )}
      </PageContainer>
    </>
  )
}

const NoMessages = () => (
  <NoMessagesContainer>
    <EmptyState header="Nie masz jeszcze żadnych wiadomości">
      Tutaj znajdziesz swoje konwersacje z innymi użytkownikami
    </EmptyState>
  </NoMessagesContainer>
)

export default compose(
  withBreakpoints,
  withAuthorization(isAuthenticated)
)(ChatPage)
