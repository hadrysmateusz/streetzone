import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { compose } from "recompose"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import { ROUTES } from "../../constants"
import { CustomNavLink } from "../Basics"

const Nav = styled.ul`
	position: sticky;
	top: 0;
	background: white;
	z-index: 9990;

	display: flex;
	justify-content: center;
	margin: 0;
	padding: 11px;
	border-bottom: 1px solid #ddd;
	overflow: auto;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	@media (max-width: 768px) {
		justify-content: flex-start;
		padding: 18px 8px;
		* {
			margin: auto;
		}
	}
`

const StyledNavLink = styled(CustomNavLink)`
	* {
		user-select: none !important;
	}
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: #292929;
	&:hover {
		color: ${(p) => p.theme.colors.accent};
	}
`

const NavItem = styled.li`
	list-style-type: none;
	padding: 0 16px;
	height: 100%;
	white-space: nowrap;
	color: #292929;
	display: inline-block;
	.icon {
		margin-right: 8px;
	}
	@media (max-width: 768px) {
		padding: 0 12px;
	}
`

const Navigation = ({ authUser, ...rest }) => (
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
					<StyledNavLink to={ROUTES.NEW_ITEM}>Wystaw Przedmiot</StyledNavLink>
				</NavItem>
				<NavItem>
					<StyledNavLink to={ROUTES.ACCOUNT.replace(":id", authUser.uid)}>
						<FontAwesomeIcon className="icon" icon="user" />
						{/* <img src={authUser.profilePictureURL} alt="Zdjęcie profilowe"/> */}
						{authUser.name ? authUser.name : "Profil"}
					</StyledNavLink>{" "}
				</NavItem>
				<NavItem>
					<StyledNavLink as={SignOutButton} />
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

export default compose(
	withRouter,
	withAuthentication
)(Navigation)
