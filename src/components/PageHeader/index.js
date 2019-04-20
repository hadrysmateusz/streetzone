import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"
import Menu from "../FullscreenMenu"

import { ROUTES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import {
	useScrollPosition,
	useFirebase,
	useAuthentication,
	useUserData
} from "../../hooks"

import {
	NavItem,
	Submenu,
	SubmenuContainer,
	Nav,
	PageHeaderContainer,
	PageHeaderOuter,
	UserNameContainer
} from "./StyledComponents"

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

const Room = styled.div`
	position: relative;
	top: 100%;
	padding: 10px;
`

const RoomsContainer = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	border: 1px solid var(--gray75);
	background: white;
	min-width: 200px;
`

const MessageStyles = styled.div`
	padding: var(--spacing3);
`

const OuterContainer = styled.div``

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
				<ProfilePicture size="30px" url={getProfilePictureURL(user, "S")} inline />
				<span className="name">{user.name}</span>
				<div className="message">{message}</div>
			</Link>
		</MessageStyles>
	) : null
}

const MessagesManager = () => {
	const firebase = useFirebase()
	const [messages, setMessages] = useState({})

	const mergeMessages = (newMessages) => {
		return setMessages({ ...messages, ...newMessages })
	}

	const rooms = useRooms()

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
	const hasMessages = !!messages && messagesCount !== 0

	return (
		<OuterContainer>
			<Indicator>
				<FontAwesomeIcon icon={["far", "envelope"]} fixedWidth />
				{hasMessages && <div className="number-display">{messagesCount}</div>}
			</Indicator>
			<RoomsContainer>
				{hasMessages ? (
					messagesArr.map((message) => <Message {...message} />)
				) : (
					<div className="empty-state">Brak nowych wiadomości</div>
				)}
			</RoomsContainer>
		</OuterContainer>
	)
}

const Navigation = ({ authUser, firebase, currentBreakpoint, location, ...rest }) => {
	const scrollPosition = useScrollPosition()

	return (
		<PageHeaderOuter scrollPosition={scrollPosition}>
			<PageHeaderContainer {...rest}>
				{currentBreakpoint > 0 ? (
					<Nav>
						<NavItem>
							<StyledNavLink to={ROUTES.BLOG_BASE}>Czytaj</StyledNavLink>
							<SubmenuContainer align="left">
								<Submenu>
									<NavItem>
										<StyledNavLink to={ROUTES.BLOG_HOME} exact>
											Wszystko
										</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink to={ROUTES.BLOG_SECTION.replace(":section", "Dropy")}>
											Nadchodzące dropy
										</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink
											to={ROUTES.BLOG_SECTION.replace(":section", "Artykuły")}
										>
											Artykuły
										</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink to={ROUTES.BLOG_SECTION.replace(":section", "Wiedza")}>
											Wiedza
										</StyledNavLink>
									</NavItem>
								</Submenu>
							</SubmenuContainer>
						</NavItem>
						<NavItem>
							<StyledNavLink to={ROUTES.MARKETPLACE} exact>
								Kupuj
							</StyledNavLink>
							<SubmenuContainer align="left">
								<Submenu>
									<NavItem>
										<StyledNavLink to={ROUTES.MARKETPLACE}>Tablica</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink to={ROUTES.DESIGNERS}>
											Projektanci / Marki
										</StyledNavLink>
									</NavItem>
								</Submenu>
							</SubmenuContainer>
						</NavItem>
						{authUser && (
							<NavItem>
								<StyledNavLink to={ROUTES.NEW_ITEM}>Sprzedawaj</StyledNavLink>
							</NavItem>
						)}
					</Nav>
				) : (
					<Menu>
						<StyledNavLink to={ROUTES.HOME} exact>
							Strona główna
						</StyledNavLink>
						<StyledNavLink to={ROUTES.BLOG_BASE}>Czytaj</StyledNavLink>
						<StyledNavLink to={ROUTES.MARKETPLACE} exact>
							Kupuj
						</StyledNavLink>
						<StyledNavLink to={ROUTES.NEW_ITEM}>Sprzedawaj</StyledNavLink>

						{authUser && [
							<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
								Profil
							</StyledNavLink>,
							<StyledNavLink as="a" onClick={firebase.signOut}>
								Wyloguj się
							</StyledNavLink>
						]}

						{!authUser && (
							<StyledNavLink
								to={{ pathname: ROUTES.SIGN_IN, state: { redirectTo: location } }}
							>
								Zaloguj / Zarejestruj się
							</StyledNavLink>
						)}
					</Menu>
				)}

				<Logo centered />

				<Nav alignRight>
					{authUser ? (
						<>
							<NavItem>
								<StyledNavLink
									to={ROUTES.ACCOUNT_CHAT.replace(":id", authUser.uid)}
									alwaysBlack
								>
									<MessagesManager />
								</StyledNavLink>
							</NavItem>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
									{currentBreakpoint >= 1 && (
										<UserNameContainer>{authUser.name}</UserNameContainer>
									)}
									<ProfilePicture
										size={currentBreakpoint >= 1 ? "36px" : "30px"}
										url={getProfilePictureURL(authUser, "S")}
										inline
									/>
								</StyledNavLink>
								<SubmenuContainer align="right">
									<Submenu>
										<NavItem>
											<StyledNavLink
												to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}
											>
												Twoje przedmioty
											</StyledNavLink>
										</NavItem>

										<NavItem>
											<StyledNavLink
												to={ROUTES.ACCOUNT_SAVED_ITEMS.replace(":id", authUser.uid)}
											>
												Zapisane przedmioty
											</StyledNavLink>
										</NavItem>

										<NavItem>
											<StyledNavLink
												to={ROUTES.ACCOUNT_SAVED_USERS.replace(":id", authUser.uid)}
											>
												Obserwowani użytkownicy
											</StyledNavLink>
										</NavItem>

										<NavItem>
											<StyledNavLink
												to={ROUTES.ACCOUNT_FEEDBACK.replace(":id", authUser.uid)}
											>
												Opinie i komentarze
											</StyledNavLink>
										</NavItem>

										<NavItem>
											<StyledNavLink
												to={ROUTES.ACCOUNT_SETTINGS.replace(":id", authUser.uid)}
											>
												Opcje / Edytuj profil
											</StyledNavLink>
										</NavItem>

										<NavItem>
											<StyledNavLink as="a" onClick={firebase.signOut}>
												Wyloguj
											</StyledNavLink>
										</NavItem>
									</Submenu>
								</SubmenuContainer>
							</NavItem>
						</>
					) : (
						<NavItem>
							<StyledNavLink
								to={{ pathname: ROUTES.SIGN_IN, state: { redirectTo: location } }}
							>
								Zaloguj się
							</StyledNavLink>
						</NavItem>
					)}
				</Nav>
			</PageHeaderContainer>
		</PageHeaderOuter>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase,
	withBreakpoints
)(Navigation)
