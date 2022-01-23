import { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"

import { NotificationsDisabledBar } from "../../components/NotificationsDisabled"
import FullscreenMenu, { Header } from "../../components/FullscreenMenu"
import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import EmptyState from "../../components/EmptyState"

import { useFirebase, useAuthentication } from "../../hooks"
import { route } from "../../utils"

import { OuterContainer, NoRoomSelected, NoMessagesContainer } from "./StyledComponents"
import { ChatRoom } from "./ChatRoom"
import { ChatRoomsList } from "./ChatRoomsList"

const NoMessages = () => (
  <NoMessagesContainer>
    <EmptyState header="Nie masz jeszcze żadnych wiadomości">
      Tutaj znajdziesz swoje konwersacje z innymi użytkownikami
    </EmptyState>
  </NoMessagesContainer>
)

const ChatPage = ({ location, history, match, currentBreakpoint }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const [rooms, setRooms] = useState()
  const [currentRoom, setCurrentRoom] = useState()

  // Get the current roomId from the url parameter
  const { roomId } = match.params

  // Get user's rooms
  useEffect(() => {
    const getRooms = async () => {
      const currentUserRef = firebase.currentUser()

      if (!currentUserRef) return

      const roomsSnap = await currentUserRef.collection("rooms").get()
      const __rooms = roomsSnap.docs.map((room) => room.data())
      setRooms(__rooms)
    }
    getRooms()
  }, [authUser, firebase])

  // Get currently selected room from the list
  useEffect(() => {
    const getCurrentRoom = () => {
      if (!roomId) {
        setCurrentRoom(null)
      } else {
        // find room with correct id
        const __currentRoom = rooms ? rooms.find((a) => a.id === roomId) : null

        setCurrentRoom(__currentRoom)
      }
    }
    getCurrentRoom()
  }, [roomId, rooms])

  const closeChat = () => {
    // use destructuring to prevent "location.state is undefined" error
    const { redirectTo } = location.state || { redirectTo: { pathname: route("HOME") } }
    history.replace(redirectTo)
  }

  const hasRooms = rooms && rooms.length > 0
  const hasSelectedRoom = !!currentRoom
  const isMobile = currentBreakpoint < 1
  const chatRoomProps = { ...currentRoom, authUser, isMobile, closeChat }

  // render mobile
  if (isMobile) {
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

  // render desktop
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

export default compose(
  withBreakpoints,
  withRouter,
  withAuthorization((user) => !!user)
)(ChatPage)
