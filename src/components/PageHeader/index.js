import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"
import Menu from "../FullscreenMenu"
import MessagesManager from "../MessagesManager"

import { ROUTES } from "../../constants"
import { ACCOUNT_ROUTES } from "../Routes"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { route } from "../../utils"
import { useScrollPosition } from "../../hooks"

import {
	NavItem,
	Submenu,
	SubmenuContainer,
	PageHeaderContainerDesktop,
	Nav,
	PageHeaderContainerMobile,
	PageHeaderOuter,
	UserNameContainer,
	SubmenuLink
} from "./StyledComponents"

const IconContainer = styled.div`
	cursor: pointer;
	font-size: 1.9rem;
	color: var(--black0);
`

const PageHeaderMobile = ({ authUser, firebase, location }) => {
	return (
		<PageHeaderContainerMobile>
			<Logo />
			<div className="align-right">
				{authUser && (
					<NavItem>
						<StyledNavLink to={ROUTES.ACCOUNT_CHAT.replace(":id", authUser.uid)}>
							<MessagesManager />
						</StyledNavLink>
					</NavItem>
				)}

				{!authUser && (
					<StyledNavLink
						to={{ pathname: ROUTES.SIGN_IN, state: { redirectTo: location } }}
					>
						Zaloguj się
					</StyledNavLink>
				)}

				<StyledNavLink to={route("SEARCH")} exact>
					<IconContainer>
						<FontAwesomeIcon icon="search" />
					</IconContainer>
				</StyledNavLink>

				{authUser && (
					<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
						<ProfilePicture
							size={"26px"}
							url={getProfilePictureURL(authUser, "S")}
							inline
						/>
					</StyledNavLink>
				)}

				<Menu>
					<StyledNavLink to={ROUTES.HOME} exact>
						Strona główna
					</StyledNavLink>
					<StyledNavLink to={ROUTES.BLOG_BASE}>Czytaj</StyledNavLink>
					<StyledNavLink to={ROUTES.MARKETPLACE} exact>
						Kupuj
					</StyledNavLink>
					<StyledNavLink to={ROUTES.DROPS}>Dropy</StyledNavLink>
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
			</div>
		</PageHeaderContainerMobile>
	)
}

const PageHeaderDesktop = ({ authUser, firebase, location }) => {
	return (
		<PageHeaderContainerDesktop>
			<Logo />
			<Nav main>
				<NavItem>
					<StyledNavLink to={ROUTES.BLOG_BASE}>Czytaj</StyledNavLink>
					<SubmenuContainer align="left">
						<Submenu>
							<NavItem>
								<SubmenuLink to={ROUTES.BLOG_HOME} exact>
									Wszystko
								</SubmenuLink>
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
								<SubmenuLink to={ROUTES.MARKETPLACE}>Tablica</SubmenuLink>
							</NavItem>
							<NavItem>
								<SubmenuLink to={ROUTES.DESIGNERS}>Projektanci / Marki</SubmenuLink>
							</NavItem>
						</Submenu>
					</SubmenuContainer>
				</NavItem>

				<NavItem>
					<StyledNavLink to={ROUTES.DROPS}>Dropy</StyledNavLink>
					<SubmenuContainer align="left">
						<Submenu>
							<NavItem>
								<SubmenuLink to={route("DROPS", null, { sort: "Nowe" })}>
									Nowe
								</SubmenuLink>
							</NavItem>
							<NavItem>
								<SubmenuLink to={route("DROPS", null, { sort: "Nadchodzace" })}>
									Nadchodzące
								</SubmenuLink>
							</NavItem>
							<NavItem>
								<SubmenuLink to={route("DROPS", null, { sort: "Archiwum" })}>
									Archiwum
								</SubmenuLink>
							</NavItem>
						</Submenu>
					</SubmenuContainer>
				</NavItem>

				<NavItem>
					<StyledNavLink to={ROUTES.NEW_ITEM}>Sprzedawaj</StyledNavLink>
				</NavItem>
			</Nav>

			<Nav alignRight>
				{authUser ? (
					<>
						<NavItem>
							<StyledNavLink to={route("SEARCH")} exact>
								<IconContainer>
									<FontAwesomeIcon icon="search" />
								</IconContainer>
							</StyledNavLink>{" "}
						</NavItem>
						<NavItem>
							<StyledNavLink to={ROUTES.ACCOUNT_CHAT.replace(":id", authUser.uid)}>
								<MessagesManager />
							</StyledNavLink>
						</NavItem>
						<NavItem account>
							<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
								<UserNameContainer>{authUser.name}</UserNameContainer>
								<ProfilePicture
									size={"30px"}
									url={getProfilePictureURL(authUser, "S")}
									inline
								/>
							</StyledNavLink>
							<SubmenuContainer align="right">
								<Submenu>
									{ACCOUNT_ROUTES.map((rt) =>
										rt.isHidden ? null : (
											<NavItem>
												<SubmenuLink to={rt.path.replace(":id", authUser.uid)}>
													{rt.label}
												</SubmenuLink>
											</NavItem>
										)
									)}

									<NavItem>
										<SubmenuLink onClick={firebase.signOut}>Wyloguj</SubmenuLink>
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
		</PageHeaderContainerDesktop>
	)
}

const PageHeader = ({ authUser, firebase, currentBreakpoint, location }) => {
	const scrollPosition = useScrollPosition()
	const isMobile = currentBreakpoint <= 1

	const commonProps = {
		authUser,
		firebase,
		location
	}

	return (
		<PageHeaderOuter scrollPosition={scrollPosition}>
			{isMobile ? (
				<PageHeaderMobile {...commonProps} />
			) : (
				<PageHeaderDesktop {...commonProps} />
			)}
		</PageHeaderOuter>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase,
	withBreakpoints
)(PageHeader)
