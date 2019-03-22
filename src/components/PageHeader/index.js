import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"

import { ROUTES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import {
	NavItem,
	Submenu,
	Nav,
	PageHeaderContainer,
	PageHeaderOuter
} from "./StyledComponents"
import useScrollPosition from "../../hooks/useScrollPosition"
import { withBreakpoints } from "react-breakpoints"
import Menu from "../FullscreenMenu"

const Navigation = ({ authUser, firebase, currentBreakpoint, ...rest }) => {
	const scrollPosition = useScrollPosition()

	return (
		<PageHeaderOuter scrollPosition={scrollPosition}>
			<PageHeaderContainer {...rest}>
				{currentBreakpoint > 0 ? (
					<Nav>
						<NavItem>
							<StyledNavLink to={ROUTES.BLOG_HOME}>Czytaj</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to={ROUTES.MARKETPLACE} exact={true}>
								Kupuj
							</StyledNavLink>
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
						<StyledNavLink to={ROUTES.BLOG_HOME}>Czytaj</StyledNavLink>
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
							<StyledNavLink to={ROUTES.SIGN_IN}>Zaloguj / Zarejestruj się</StyledNavLink>
						)}
					</Menu>
				)}

				<Logo centered />

				<Nav alignRight>
					{authUser ? (
						<>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
									<ProfilePicture
										size="35px"
										url={getProfilePictureURL(authUser, "S")}
										inline
									/>
								</StyledNavLink>
								<Submenu>
									<NavItem>
										<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
											Twoje przedmioty
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink to={ROUTES.ACCOUNT_LIKED.replace(":id", authUser.uid)}>
											Zapisane przedmioty
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink
											to={ROUTES.ACCOUNT_FOLLOWING.replace(":id", authUser.uid)}
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
							</NavItem>
						</>
					) : (
						<NavItem>
							<StyledNavLink to={ROUTES.SIGN_IN}>Zaloguj się</StyledNavLink>
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
