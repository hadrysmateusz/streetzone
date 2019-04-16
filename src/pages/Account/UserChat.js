import React, { useEffect, useState } from "react"
import moment from "moment"
import styled from "styled-components"

import LoadingSpinner from "../../components/LoadingSpinner"
import UserPreview from "../../components/UserPreview"
import { PageContainer } from "../../components/Containers"
import { useFirebase } from "../../hooks"
import EmptyState from "../../components/EmptyState"
import { NewChat } from "../Chat/New"

const RoomStyles = styled.div`
	.messages {
		display: grid;
	}
`

const MessageStyles = styled.div`
	padding: var(--spacing2);
	margin: var(--spacing2);
	border-radius: 6px;
	background: var(--gray25);
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

const Room = ({ id, otherUserId, user }) => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState()

	useEffect(() => {
		const unsubscribe = firebase.db
			.collection("rooms")
			.doc(id)
			.collection("messages")
			.onSnapshot((snap) => {
				const messages = snap.docs.map((room) => room.data())
				setMessages(messages)
			})

		return unsubscribe
	}, [])

	if (messages) {
		messages.sort((a, b) => a.createdAt - b.createdAt) /* put newest last */
	}

	return !messages ? (
		<LoadingSpinner />
	) : (
		<RoomStyles>
			<UserPreview id={otherUserId} />
			<div className="messages">
				{messages.map((message) => (
					<Message {...message} user={user} />
				))}
			</div>
			<NewChat userId={otherUserId} />
		</RoomStyles>
	)
}

const UserChat = ({ user, userId, isAuthorized, onForceRefresh }) => {
	const firebase = useFirebase()
	const [rooms, setRooms] = useState()

	const getRooms = async () => {
		const currentUserRef = firebase.currentUser()

		if (!currentUserRef) return

		const roomsSnap = await currentUserRef.collection("rooms").get()
		const rooms = roomsSnap.docs.map((room) => room.data())
		setRooms(rooms)
	}

	useEffect(() => {
		getRooms()
	}, [user, userId])

	return !rooms || !user ? (
		<LoadingSpinner />
	) : (
		<PageContainer maxWidth={5}>
			{rooms.length === 0 && <EmptyState text="Nie masz jeszcze żadnych wiadomości" />}
			{rooms.map((room) => {
				return <Room {...room} user={user} />
			})}
		</PageContainer>
	)
}

export default UserChat
