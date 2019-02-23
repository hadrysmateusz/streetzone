import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import ProfilePicture from "../ProfilePicture"
import { ROUTES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"

const NAV_ITEM_HEIGHT = "46px"

const Nav = styled.ul`
	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-size: 0.85rem;
	font-weight: normal;

	position: sticky;
	top: 0;
	z-index: 80;

	background: white;
	border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};

	display: flex;
	align-items: center;
	justify-content: flex-start;

	margin: 0;
	padding: 0 11px;

	overflow: auto;

	* {
		margin: auto;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		justify-content: center;
		overflow: visible;
		* {
			margin: initial;
		}
	}

	--transparent: rgba(255, 255, 255, 0);

	overflow: auto;
	max-width: 100%;
	background: linear-gradient(90deg, white 30%, var(--transparent)),
		linear-gradient(90deg, var(--transparent), white 70%) 0 100%,
		radial-gradient(farthest-side at 0% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
		radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0
			100%;
	background-repeat: no-repeat;
	background-color: white;
	background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
	background-position: 0 0, 100%, 0 0, 100%;
	background-attachment: local, local, scroll, scroll;
`

const Submenu = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	background: white;

	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	border-top: none;

	z-index: 81;

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 5px 0;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	display: none;
`

const NavItem = styled.li`
	user-select: none;
	position: relative;
	list-style-type: none;
	height: ${NAV_ITEM_HEIGHT};
	white-space: nowrap;
	color: ${(p) => p.theme.colors.black[75]};
	display: block;
	order: 1;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${Submenu} {
			display: block;
		}
	}
	:hover {
		background: #f8f8f8;
	}
	> :first-child {
		height: 100%;
		padding: 0 14px;
	}
	span {
		margin-left: 8px;
	}
`

const Navigation = ({ authUser, firebase, ...rest }) => {
	return (
		<Nav {...rest}>
			<NavItem>
				<StyledNavLink to={ROUTES.BLOG_HOME}>Blog</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink to={ROUTES.HOME} exact={true}>
					Tablica
				</StyledNavLink>
			</NavItem>
			{authUser ? (
				<>
					<NavItem>
						<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
							<ProfilePicture
								size="30px"
								url={getProfilePictureURL(authUser, "S")}
								inline
							/>
							{/* Keep it this way until you have some other way of indicating that 
							the menu is scrollable as a constant width allows me to make it obvious */}
							{/* <span>{authUser.name ? authUser.name : "Profil"}</span> */}
							<span>Profil</span>
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
								<StyledNavLink to={ROUTES.ACCOUNT_FOLLOWING.replace(":id", authUser.uid)}>
									Obserwowani użytkownicy
								</StyledNavLink>
							</NavItem>

							<NavItem>
								<StyledNavLink
									to={ROUTES.ACCOUNT_TRANSACTIONS.replace(":id", authUser.uid)}
								>
									Historia transakcji
								</StyledNavLink>
							</NavItem>

							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_FEEDBACK.replace(":id", authUser.uid)}>
									Opinie i komentarze
								</StyledNavLink>
							</NavItem>

							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_SETTINGS.replace(":id", authUser.uid)}>
									Ustawienia / Edytuj profil
								</StyledNavLink>
							</NavItem>

							<NavItem>
								<StyledNavLink as="a" onClick={firebase.signOut}>
									Wyloguj
								</StyledNavLink>
							</NavItem>
						</Submenu>
					</NavItem>
					<NavItem>
						<StyledNavLink to={ROUTES.NEW_ITEM}>Wystaw Przedmiot</StyledNavLink>
					</NavItem>
				</>
			) : (
				<NavItem>
					<StyledNavLink to={ROUTES.SIGN_IN}>Zaloguj się</StyledNavLink>
				</NavItem>
			)}
		</Nav>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase
)(Navigation)
