import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import { CustomNavLink } from "../Basics"
import ProfilePicture from "../ProfilePicture"
import { ROUTES } from "../../constants"

const NAV_ITEM_HEIGHT = "44px"
const NAV_ITEM_HEIGHT_MOBILE = " 50px"

const Nav = styled.ul`
	text-transform: uppercase;
	letter-spacing: 0.9px;
	font-size: 0.85rem;
	font-weight: normal;
	position: sticky;
	top: 0;
	background: white;
	z-index: 9900;

	display: flex;
	align-items: center;
	margin: 0;
	padding: 0 11px;
	border-bottom: 1px solid #ddd;
	overflow: auto;
	justify-content: flex-start;

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
`

const StyledNavLink = styled(CustomNavLink)`
	* {
		user-select: none !important;
	}
	display: flex;
	align-items: center;
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: ${(p) => p.theme.colors.black[75]};
	cursor: pointer;
	text-transform: uppercase;

	&:hover {
		color: black;
	}
`

const Submenu = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	background: white;

	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	border-top: none;

	z-index: 9999;

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
	position: relative;
	list-style-type: none;
	height: ${NAV_ITEM_HEIGHT_MOBILE};
	white-space: nowrap;
	color: ${(p) => p.theme.colors.black[75]};
	display: block;
	order: 1;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		height: ${NAV_ITEM_HEIGHT};
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

const Navigation = ({ authUser, ...rest }) => {
	return (
		<Nav {...rest}>
			<NavItem>
				<StyledNavLink to={ROUTES.BLOG_HOME} exact={false}>
					Blog
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink to={ROUTES.HOME}>Tablica</StyledNavLink>
			</NavItem>
			{authUser && (
				<>
					<NavItem>
						<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
							<ProfilePicture size="30px" url={authUser.profilePictureURL} inline />
							{/* Keep it this way until you have some other way of indicating that 
							the menu is scrollable as a constant width allows me to make it obvious */}
							{/* <span>{authUser.name ? authUser.name : "Profil"}</span> */}
							<span>Profil</span>
						</StyledNavLink>{" "}
						<Submenu>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
									Twoje przedmioty
								</StyledNavLink>
							</NavItem>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_SETTINGS.replace(":id", authUser.uid)}>
									Ustawienia / Edytuj profil
								</StyledNavLink>
							</NavItem>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_FEEDBACK.replace(":id", authUser.uid)}>
									Opinie i komentarze
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
								<StyledNavLink as={SignOutButton} />
							</NavItem>
						</Submenu>
					</NavItem>
					<NavItem>
						<StyledNavLink to={ROUTES.NEW_ITEM}>Wystaw Przedmiot</StyledNavLink>
					</NavItem>
				</>
			)}
			{!authUser && (
				<NavItem>
					<StyledNavLink to={ROUTES.SIGN_IN}>Zaloguj się</StyledNavLink>
				</NavItem>
			)}
		</Nav>
	)
}

export default compose(
	withRouter,
	withAuthentication
)(Navigation)
