import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import ProfilePicture from "../ProfilePicture"

import { ROUTES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useAuthentication, useUserData } from "../../hooks"

export const Submenu = styled.div`
	background: white;

	border: 1px solid var(--gray75);

	display: grid;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);
	min-width: 200px;
	min-height: 50px;
`

export const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;

	${(p) => `${p.align}: 0;`}
	z-index: 81;

	padding-top: var(--spacing3);

	display: none;
`

const Indicator = styled.div`
	position: relative;
	font-size: 2.4rem;

	.number-display {
		position: absolute;
		bottom: 2px;
		right: -2px;
		border-radius: 50%;
		background: var(--black0);
		color: white;
		font-size: 1rem;
		font-weight: bold;
		--size: 1.8rem;
		width: var(--size);
		height: var(--size);
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const MessageStyles = styled.div`
	padding: var(--spacing3);
	.header {
		display: flex;
		align-items: center;
		margin-bottom: var(--spacing1);

		.name {
			font-weight: bold;
			margin-left: var(--spacing2);
		}
	}

	.message {
		color: var(--black75);
	}
`

const ManagerStyles = styled.div`
	color: var(--black75);
	cursor: pointer;

	.empty-state {
		padding: var(--spacing3);
		font-style: italic;
		color: var(--gray0);
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${SubmenuContainer} {
			display: block;
		}
	}
`

const useRooms = () => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [rooms, setRooms] = useState(null)

	const fetchRooms = () => {
		const unsubscribe = firebase
			.user(authUser.uid)
			.collection("rooms")
			.onSnapshot((snap) => {
				const __rooms = snap.docs.map((roomSnap) => roomSnap.data())
				setRooms(__rooms)
			})

		return unsubscribe
	}

	useEffect(() => {
		if (!authUser) return
		const unsubscribe = fetchRooms()
		return unsubscribe
	}, [authUser])

	return rooms
}

const Message = ({ message, author, createdAt, roomId }) => {
	const [user, error] = useUserData(author)
	const authUser = useAuthentication()

	return !error && user ? (
		<MessageStyles>
			<Link to={ROUTES.ACCOUNT_CHAT.replace(":id", authUser.uid) + `?room=${roomId}`}>
				<div className="header">
					<ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
					<span className="name">{user.name}</span>
				</div>
				<div className="message">{message}</div>
			</Link>
		</MessageStyles>
	) : null
}

const MessagesManager = () => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState({})

	const rooms = useRooms()

	const mergeMessages = (newMessages) => {
		return setMessages({ ...messages, ...newMessages })
	}

	useEffect(() => {
		if (rooms) {
			const unsubscribeArr = rooms.map((room) => {
				const unsubscribe = firebase.db
					.collection("rooms")
					.doc(room.id)
					.collection("messages")
					.where("unread", "==", true)
					.where("author", "==", room.otherUserId)
					.onSnapshot((snap) => {
						const __messages = {}
						snap.docs.forEach((snap) => {
							// add message along with room id to object for merging
							__messages[snap.id] = { ...snap.data(), roomId: room.id }
						})
						mergeMessages(__messages)
					})

				return unsubscribe
			})

			const unsubscribeAll = () => {
				unsubscribeArr.forEach((fn) => fn())
			}

			return unsubscribeAll
		}
	}, [rooms])

	const messagesArr = Object.values(messages)
	const messagesCount = messagesArr.length
	const hasMessages = !!messages && messagesCount > 0

	return (
		<ManagerStyles>
			<Indicator>
				<FontAwesomeIcon icon={["far", "envelope"]} fixedWidth />
				{hasMessages && <div className="number-display">{messagesCount}</div>}
			</Indicator>
			<SubmenuContainer align="right">
				<Submenu>
					{hasMessages ? (
						messagesArr.map((message) => <Message {...message} />)
					) : (
						<div className="empty-state">Brak nowych wiadomości</div>
					)}
				</Submenu>
			</SubmenuContainer>
		</ManagerStyles>
	)
}

export default MessagesManager
