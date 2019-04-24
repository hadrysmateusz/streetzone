import React, { useEffect, useState, useRef } from "react"
import moment from "moment"
import { withRouter, Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LoadingSpinner from "../../../components/LoadingSpinner"
import UserPreview from "../../../components/UserPreview"
import { PageContainer } from "../../../components/Containers"
import ProfilePicture from "../../../components/ProfilePicture"
import getProfilePictureURL from "../../../utils/getProfilePictureURL"
import { useFirebase, useUserData, useAuthentication } from "../../../hooks"
import { ROUTES } from "../../../constants"

import { NewChat } from "../../Chat/New"

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
			<Link to={`?room=${id}`}>
				<ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
				<span className="name">{user.name}</span>
			</Link>
		</RoomTabStyles>
	) : null
}

const Chat = ({ id, otherUserId, user, isMobile, closeMobileChat }) => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState()
	const containerRef = useRef()
	const [otherUser, error] = useUserData(otherUserId)

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection("rooms")
			.doc(id)
			.collection("messages")
			.onSnapshot((snap) => {
				const messages = snap.docs.map((room) => room.data())
				setMessages(messages)

				const elem = containerRef.current

				elem.scrollTop = elem.scrollHeight
			})

		return unsubscribe
	}, [id, otherUserId])

	if (messages) {
		messages.sort((a, b) => a.createdAt - b.createdAt) /* put newest last */
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
					<CloseButton onClick={closeMobileChat}>
						<FontAwesomeIcon icon="times" />
					</CloseButton>
				</div>

				<div className="messages" ref={containerRef}>
					{messages.map((message) => (
						<Message {...message} user={user} roomId={id} />
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
					<Message {...message} user={user} roomId={id} />
				))}
			</div>
			<div className="bottom-container">
				<NewChat userId={otherUserId} />
			</div>
		</RoomStyles>
	)
}

const UserChat = ({ user, userId, location, history, currentBreakpoint }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [rooms, setRooms] = useState()
	const [currentRoom, setCurrentRoom] = useState()

	const paramsString = location.search

	const getRooms = async () => {
		const currentUserRef = firebase.currentUser()

		if (!currentUserRef) return

		const roomsSnap = await currentUserRef.collection("rooms").get()
		const __rooms = roomsSnap.docs.map((room) => room.data())
		setRooms(__rooms)
	}

	const getCurrentRoom = () => {
		var searchParams = new URLSearchParams(paramsString)

		// get room id from url search parameter
		const roomId = searchParams.has("room") ? searchParams.get("room") : null
		// find room with correct id
		const __currentRoom = rooms ? rooms.find((a) => a.id === roomId) : null

		setCurrentRoom(__currentRoom)
	}

	useEffect(() => {
		getRooms()
	}, [user, userId])

	useEffect(() => {
		getCurrentRoom()
	}, [paramsString, rooms])

	const closeMobileChat = () => {
		history.push(ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid))
	}

	const hasRooms = rooms && rooms.length > 0
	const isMobile = currentBreakpoint < 1

	// render mobile
	if (isMobile) {
		return (
			<OuterContainerMobile>
				{!rooms || !user ? (
					<LoadingSpinner />
				) : currentRoom ? (
					<Chat
						{...currentRoom}
						user={user}
						isMobile={isMobile}
						closeMobileChat={closeMobileChat}
					/>
				) : (
					<Menu>
						<div className="menu-header">
							<div>Wybierz osobę z listy</div>
							<CloseButton onClick={closeMobileChat}>
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
	return !rooms || !user ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={5}>
			{hasRooms ? (
				<OuterContainer>
					<div className="sidebar">
						{rooms.map((room) => (
							<RoomTab {...room} />
						))}
					</div>
					<div className="chat-container">
						{currentRoom ? (
							<Chat {...currentRoom} user={user} />
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
	withRouter
)(UserChat)
