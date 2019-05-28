import React, { useEffect, useState, useRef } from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview"
import { withAuthorization } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import ProfilePicture from "../../components/ProfilePicture"
import FullscreenMenu, { Header } from "../../components/FullscreenMenu"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useUserData, useAuthentication } from "../../hooks"
import { route } from "../../utils"

import { NewChat } from "./New"

import {
	MessageStyles,
	RoomStyles,
	RoomTabStyles,
	MobileUserInfo,
	OuterContainer,
	MobileRoomStyles,
	TopContainerMobile
} from "./StyledComponents"

const Message = ({ id, roomId, message, createdAt, author, user, unread }) => {
	const firebase = useFirebase()
	const formattedCreatedAt = moment(createdAt).format("DD.MM o HH:mm")
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

const EmptyState = () => (
	<div className="empty-state">Nie masz jeszcze żadnych wiadomości</div>
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
	) : null
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

const ChatRoom = ({ id: roomId, otherUserId, authUser, isMobile, closeChat }) => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState()
	const containerRef = useRef()
	const [otherUser, error] = useUserData(otherUserId)

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.onSnapshot((snap) => {
				const __messages = snap.docs.map((room) => room.data())
				setMessages(__messages)

				const elem = containerRef.current
				elem.scrollTop = elem.scrollHeight
			})

		return unsubscribe
	}, [roomId, otherUserId])

	if (messages) {
		messages.sort((a, b) => a.createdAt - b.createdAt) /* put newest at the bottom */
	}

	if (!messages) return <LoadingSpinner />

	// render mobile
	if (isMobile) {
		return (
			<MobileRoomStyles>
				<Header>
					<ChatRoomTopContainerMobile user={otherUser} />
				</Header>

				<div className="messages" ref={containerRef}>
					{messages.map((message) => (
						<Message {...message} key={message.id} user={authUser} roomId={roomId} />
					))}
				</div>

				<div className="bottom-container">
					<NewChat userId={otherUserId} />
				</div>
			</MobileRoomStyles>
		)
	}

	// render desktop
	return (
		<RoomStyles>
			<div className="top-container">
				<UserPreview id={otherUserId} />
			</div>
			<div className="messages" ref={containerRef}>
				{messages.map((message) => (
					<Message {...message} key={message.id} user={authUser} roomId={roomId} />
				))}
			</div>
			<div className="bottom-container">
				<NewChat userId={otherUserId} />
			</div>
		</RoomStyles>
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
	}, [authUser])

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
		history.push(redirectTo)
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
				renderWhenOpen={(close) =>
					!rooms ? (
						<LoadingSpinner />
					) : hasSelectedRoom ? (
						<ChatRoom {...chatRoomProps} />
					) : hasRooms ? (
						<div className="menu-content">
							<Header>Wybierz z listy</Header>
							<RoomsList rooms={rooms} />
						</div>
					) : (
						<EmptyState />
					)
				}
			/>
		)
	}

	// render desktop
	return !rooms ? (
		<LoadingSpinner />
	) : (
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
							<div class="no-room-selected">Wybierz osobę z listy</div>
						)}
					</div>
				</OuterContainer>
			) : (
				<EmptyState />
			)}
		</PageContainer>
	)
}

export default compose(
	withBreakpoints,
	withRouter,
	withAuthorization((user) => !!user)
)(UserChat)
