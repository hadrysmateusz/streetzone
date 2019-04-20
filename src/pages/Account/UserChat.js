import React, { useEffect, useState, useRef } from "react"
import moment from "moment"
import styled from "styled-components/macro"
import { withRouter, Link } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview"
import { PageContainer } from "../../components/Containers"
import EmptyState from "../../components/EmptyState"
import ProfilePicture from "../../components/ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useUserData } from "../../hooks"

import { NewChat } from "../Chat/New"

const RoomStyles = styled.div`
	.messages {
		display: grid;
		max-height: 450px;
		overflow-y: scroll;
	}
`

const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	border: 1px solid var(--gray75);

	.sidebar {
		border-right: 1px solid var(--gray75);
	}
	.chat-container {
		padding: var(--spacing3);
	}
`

const MessageStyles = styled.div`
	padding: var(--spacing2);
	margin: var(--spacing2);
	border-radius: 6px;
	background: var(--gray75);
	width: auto;
	min-width: 0;
	max-width: 400px;
	color: white;

	${(p) => p.isAuthor && "background: #1fc694;"}
	${(p) => p.isAuthor && "justify-self: end;"}

	.createdAt {
		font-size: var(--font-size--xs);
		margin-bottom: var(--spacing1);
	}
	.message {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: var(--font-family--sans-serif);
		font-weight: bold;
	}
`

const RoomTabStyles = styled.div`
	a {
		display: flex;
		align-items: center;
		> * + * {
			margin-left: var(--spacing2);
		}
	}
	padding: var(--spacing3);

	color: var(--black0);
	font-weight: bold;
	font-size: var(--font-size--s);
	text-transform: uppercase;
	border-bottom: 1px solid var(--gray75);
`

const Message = ({ message, createdAt, author, user }) => {
	const formattedCreatedAt = moment(createdAt).format("DD.MM o HH:mm")
	const isAuthor = author === user.uid

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
			<UserPreview id={otherUserId} />
			<div className="messages" ref={containerRef}>
				{messages.map((message) => (
					<Message {...message} user={user} />
				))}
			</div>
			<NewChat userId={otherUserId} />
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
		const rooms = roomsSnap.docs.map((room) => room.data())
		setRooms(rooms)
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

	return !rooms || !user ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={5}>
			{rooms.length === 0 && <EmptyState text="Nie masz jeszcze żadnych wiadomości" />}
			<OuterContainer>
				<div className="sidebar">
					{rooms.map((room) => (
						<RoomTab {...room} />
					))}
				</div>
				<div className="chat-container">
					{currentRoom && <Room {...currentRoom} user={user} />}
				</div>
			</OuterContainer>
		</PageContainer>
	)
}

export default withRouter(UserChat)
