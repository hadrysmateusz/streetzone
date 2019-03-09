import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { ROUTES, CONST } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"

const Nav = styled.ul`
	padding: 0;
	li {
		list-style: none;
	}

	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	height: 70px;
	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-size: 0.85rem;
	font-weight: normal;

	display: flex;
	align-items: center;
	justify-content: flex-start;

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

const NavOuter = styled.nav`
	position: sticky;
	top: 0;
	z-index: 80;

	background: white;
	border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};

	padding: 0 3px;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 0 20px;
	}
`

const Submenu = styled.ul`
	position: absolute;
	top: 100%;
	right: 0;
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
	height: 100%;
	user-select: none;
	position: relative;
	list-style-type: none;
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
		padding: 15px 10px;
		font-size: 0.84rem;
	}
	span {
		margin-left: 8px;
	}
`

const Logo = styled.li`
	font-size: 1.9rem;
	font-weight: bold;
	text-transform: none;
	flex: 1;
	font-family: "Playfair Display";
`

const Navigation = ({ authUser, firebase, ...rest }) => {
	return (
		<NavOuter>
			<Nav {...rest}>
				<Logo>{CONST.BRAND_NAME}</Logo>
				<NavItem>
					<StyledNavLink to={ROUTES.BLOG_HOME}>CZYTAJ</StyledNavLink>
				</NavItem>
				<NavItem>
					<StyledNavLink to={ROUTES.HOME} exact={true}>
						KUPUJ
					</StyledNavLink>
				</NavItem>
				{authUser ? (
					<>
						<NavItem>
							<StyledNavLink to={ROUTES.NEW_ITEM}>SPRZEDAWAJ</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
								<ProfilePicture
									size="44px"
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
		</NavOuter>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase
)(Navigation)
