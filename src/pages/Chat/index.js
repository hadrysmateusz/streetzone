import React, { useEffect, useState, useRef, useContext } from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { NotificationsDisabledBar } from "../../components/NotificationsDisabled"
import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview"
import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import ProfilePicture from "../../components/ProfilePicture"
import EmptyState from "../../components/EmptyState/new"
import FullscreenMenu, {
	Header,
	FullscreenMenuContext
} from "../../components/FullscreenMenu"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useUserData, useAuthentication } from "../../hooks"
import { route } from "../../utils"

import { NewChat } from "./New"

import {
	OuterContainer,
	NoRoomSelected,
	ChatRoomContainer,
	MobileRoomStyles,
	DesktopRoomStyles,
	TopContainerMobile,
	MobileUserInfo,
	MessageStyles,
	RoomTabStyles
} from "./StyledComponents"

const NoMessagesContainer = styled.div`
	padding: var(--spacing4) var(--spacing3);
`

const EmptyRoomTab = styled.div`
	font-style: italic;
	color: var(--gray25);
`

const Message = ({ id, roomId, message, createdAt, author, user, unread }) => {
	const firebase = useFirebase()
	const formattedCreatedAt = moment().to(createdAt)
	const isAuthor = author === user.uid

	useEffect(() => {
		// mark message as read
		if (unread && !isAuthor) {
			firebase.db
				.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.doc(id)
				.update({ unread: false })
		}
	}, [])

	return (
		<MessageStyles isAuthor={isAuthor}>
			<div className="createdAt">{formattedCreatedAt}</div>
			<pre className="message">{message}</pre>
		</MessageStyles>
	)
}

const NoMessages = () => (
	<NoMessagesContainer>
		<EmptyState header="Nie masz jeszcze żadnych wiadomości">
			Tutaj znajdziesz swoje konwersacje z innymi użytkownikami
		</EmptyState>
	</NoMessagesContainer>
)

const RoomTab = ({ id, otherUserId }) => {
	const [user, error] = useUserData(otherUserId)

	return !error && user ? (
		<RoomTabStyles>
			<Link to={route("CHAT_ROOM", { roomId: id })}>
				<ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
				<span className="name">{user.name}</span>
			</Link>
		</RoomTabStyles>
	) : (
		<RoomTabStyles>
			<Link to={route("CHAT_ROOM", { roomId: id })}>
				<EmptyRoomTab>Konto usunięte</EmptyRoomTab>
			</Link>
		</RoomTabStyles>
	)
}

const RoomsList = ({ rooms }) => {
	return rooms.map((room) => <RoomTab key={room.id} {...room} />)
}

const ChatRoomTopContainerMobile = ({ user }) => {
	return (
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
}

const MessagesList = ({ messages, authUser, roomId }) => {
	return messages.map((message) => (
		<Message {...message} key={message.id} user={authUser} roomId={roomId} />
	))
}

const ChatRoom = ({ id: roomId, otherUserId, authUser, isMobile, closeChat }) => {
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

const UserChat = ({ location, history, match, currentBreakpoint }) => {
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
				renderWhenOpen={({ close }) =>
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
							<RoomsList rooms={rooms} />
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
							<RoomsList rooms={rooms} />
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
)(UserChat)
