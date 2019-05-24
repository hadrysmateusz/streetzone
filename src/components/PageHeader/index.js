import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"

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
	Nav,
	PageHeaderContainer,
	PageHeaderOuter,
	UserNameContainer
} from "./StyledComponents"

const PageHeader = ({ authUser, firebase, currentBreakpoint, location, ...rest }) => {
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
										<StyledNavLink to={ROUTES.BLOG_DROPS}>
											Nadchodzące dropy
										</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink to={ROUTES.BLOG_ARTICLES}>Artykuły</StyledNavLink>
									</NavItem>
									<NavItem>
										<StyledNavLink to={ROUTES.BLOG_KNOWLEDGE}>Wiedza</StyledNavLink>
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
										{ACCOUNT_ROUTES.map((rt) =>
											rt.isHidden ? null : (
												<NavItem>
													<StyledNavLink to={rt.path.replace(":id", authUser.uid)}>
														{rt.label}
													</StyledNavLink>
												</NavItem>
											)
										)}

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
)(PageHeader)
