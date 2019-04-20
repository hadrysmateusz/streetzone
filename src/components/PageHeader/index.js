import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"
import Menu from "../FullscreenMenu"

import { ROUTES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useScrollPosition, useFirebase, useAuthentication } from "../../hooks"

import {
	NavItem,
	Submenu,
	SubmenuContainer,
	Nav,
	PageHeaderContainer,
	PageHeaderOuter,
	UserNameContainer
} from "./StyledComponents"

const Room = styled.div`
	position: relative;
	top: 100%;
	padding: 10px;
	border: 1px solid gray;
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

const Message = ({ message }) => {
	return <div>{message}</div>
}

const RoomManager = ({ id }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [messages, setMessages] = useState(null)

	const fetchMessages = () => {
		const unsubscribe = firebase.db
			.collection("rooms")
			.doc(id)
			.collection("messages")
			.where("unread", "==", true)
			.onSnapshot((snap) => {
				const __messages = snap.docs.map((roomSnap) => roomSnap.data())
				setMessages(__messages)
			})

		return unsubscribe
	}

	useEffect(() => {
		const unsubscribe = fetchMessages()
		return unsubscribe
	}, [authUser])

	return messages ? (
		<Room>
			{messages.map((message) => (
				<Message {...message} />
			))}
		</Room>
	) : null
}

const MessagesManager = () => {
	const rooms = useRooms()

	return (
		<>
			<FontAwesomeIcon icon={["far", "envelope"]} size="lg" fixedWidth />
			{rooms ? (
				rooms.map((room) => {
					return <RoomManager {...room} />
				})
			) : (
				<div className="empty-state">Brak nowych wiadomości</div>
			)}
		</>
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
