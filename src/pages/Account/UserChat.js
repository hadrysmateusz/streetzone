import React, { useEffect, useState, useRef } from "react"
import moment from "moment"
import styled from "styled-components/macro"
import { withRouter, Link } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview"
import { PageContainer } from "../../components/Containers"
import ProfilePicture from "../../components/ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useUserData } from "../../hooks"

import { NewChat } from "../Chat/New"

const RoomStyles = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 0;
	height: 100%;
	max-height: 100%;

	.top-container {
		padding: var(--spacing3);
		padding-bottom: var(--spacing2);
	}

	.bottom-container {
		padding: var(--spacing3);
		padding-top: var(--spacing2);
	}

	.messages {
		padding: var(--spacing3);
		display: grid;
		gap: var(--spacing3);
		overflow-y: auto;
	}
`

const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100%;
	border: 1px solid var(--gray75);
	margin-bottom: var(--spacing4);
	height: 650px;
	.sidebar {
		border-right: 1px solid var(--gray75);
	}
	.chat-container {
		.no-room-selected {
			background: var(--almost-white);
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--gray0);
			user-select: none;
			cursor: default;
		}
	}
`

// const MessageOuterContainer = styled.div`
// width: 100%;
// display: flex;

// `

const MessageStyles = styled.div`
	padding: var(--spacing3);
	border-radius: 4px;
	width: auto;
	min-width: 0;
	max-width: 45%;
	color: ${(p) => (p.isAuthor ? "white" : "var(--black50)")};

	background: ${(p) => (p.isAuthor ? "#1fc694" : "#f3f6ee")};
	justify-self: ${(p) => (p.isAuthor ? "end" : "start")};

	.createdAt {
		font-size: var(--font-size--xs);
		margin-bottom: var(--spacing1);
	}
	.message {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: var(--font-family--sans-serif);
		margin: 0;
		margin-top: var(--spacing2);
	}
`

const RoomTabStyles = styled.div`
	a {
		display: flex;
		align-items: center;
		padding: var(--spacing3);
		> * + * {
			margin-left: var(--spacing2);
		}
	}

	color: var(--black0);
	font-weight: bold;
	font-size: var(--font-size--s);
	text-transform: uppercase;
	border-bottom: 1px solid var(--gray75);
`

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

	console.log(user, error)

	return !error && user ? (
		<RoomTabStyles>
			<Link to={`?room=${id}`}>
				<ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
				<span className="name">{user.name}</span>
			</Link>
		</RoomTabStyles>
	) : null
}

const Room = ({ id, otherUserId, user }) => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState()
	const containerRef = useRef()

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection("rooms")
			.doc(id)
			.collection("messages")
			.onSnapshot((snap) => {
				const messages = snap.docs.map((room) => room.data())
				setMessages(messages)

				const elem = containerRef.current
				console.log(containerRef)

				elem.scrollTop = elem.scrollHeight
			})

		return unsubscribe
	}, [id, otherUserId])

	if (messages) {
		messages.sort((a, b) => a.createdAt - b.createdAt) /* put newest last */
	}

	return !messages ? (
		<LoadingSpinner />
	) : (
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

const UserChat = ({ user, userId, isAuthorized, onForceRefresh, match, location }) => {
	const firebase = useFirebase()
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

	const hasRooms = rooms && rooms.length > 0

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
							<Room {...currentRoom} user={user} />
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

export default withRouter(UserChat)
