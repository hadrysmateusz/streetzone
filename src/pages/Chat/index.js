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
import getProfilePictureURL from "../../utils/getProfilePictureURL"

import { useFirebase, useUserData, useAuthentication } from "../../hooks"
import { route } from "../../utils"
import { ROUTES } from "../../constants"

import { NewChat } from "./New"

import {
	MessageStyles,
	RoomStyles,
	RoomTabStyles,
	MobileUserInfo,
	OuterContainer,
	Menu,
	CloseButton,
	MobileRoomStyles,
	OuterContainerMobile
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

				console.log("messages snap handler")

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
				<div className="top-container">
					{/* This Link will clear the selected room  */}
					<Link to="?">
						<div className="back-button">
							<FontAwesomeIcon icon="long-arrow-alt-left" />
						</div>
					</Link>

					{!error && otherUser && (
						<MobileUserInfo>
							<ProfilePicture
								size="30px"
								url={getProfilePictureURL(otherUser, "S")}
								inline
							/>
							<span className="name">{otherUser.name}</span>
						</MobileUserInfo>
					)}

					{/* This will close the chat and redirect */}
					<CloseButton onClick={closeChat}>
						<FontAwesomeIcon icon="times" />
					</CloseButton>
				</div>

				<div className="messages" ref={containerRef}>
					{messages.map((message) => (
						<Message {...message} user={authUser} roomId={roomId} />
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
					<Message {...message} user={authUser} roomId={roomId} />
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
	const [authUser, isAuthenticated] = useAuthentication(true)
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
		const searchString = location.search
		const sp = new URLSearchParams(searchString)
		const redirectTo = sp.has("redirectTo") ? sp.get("redirectTo") : route("HOME")

		history.push(redirectTo)
	}

	const hasRooms = rooms && rooms.length > 0
	const hasSelectedRoom = !!currentRoom
	const isMobile = currentBreakpoint < 1

	console.log("rooms", rooms)
	console.log("currentRoom", currentRoom)

	// render mobile
	if (isMobile) {
		return (
			<OuterContainerMobile>
				{!rooms || !authUser ? (
					<LoadingSpinner />
				) : currentRoom ? (
					<ChatRoom
						{...currentRoom}
						authUser={authUser}
						isMobile={isMobile}
						closeChat={closeChat}
					/>
				) : (
					<Menu>
						<div className="menu-header">
							<div>Wybierz osobę z listy</div>
							<CloseButton onClick={closeChat}>
								<FontAwesomeIcon icon="times" />
							</CloseButton>
						</div>
						{hasRooms ? (
							<div className="menu-content">
								{rooms.map((room) => (
									<RoomTab {...room} />
								))}
							</div>
						) : (
							<div className="empty-state">Nie masz jeszcze żadnych wiadomości</div>
						)}
					</Menu>
				)}
			</OuterContainerMobile>
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
						{rooms.map((room) => (
							<RoomTab {...room} />
						))}
					</div>
					<div className="chat-container">
						{hasSelectedRoom ? (
							<ChatRoom {...currentRoom} authUser={authUser} />
						) : (
							<div class="no-room-selected">Wybierz osobę z listy</div>
						)}
					</div>
				</OuterContainer>
			) : (
				<div className="empty-state">Nie masz jeszcze żadnych wiadomości</div>
			)}
		</PageContainer>
	)
}

export default compose(
	withBreakpoints,
	withRouter,
	withAuthorization((user) => !!user)
)(UserChat)
