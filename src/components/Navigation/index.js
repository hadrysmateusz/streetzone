import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, withRouter } from "react-router-dom"
import styled from "styled-components"
import { compose } from "recompose"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import { ROUTES, CONST, CSS } from "../../constants"

let CustomNavLink = (props) => (
	<NavLink exact activeStyle={{ color: CSS.COLOR_ACCENT }} {...props} />
)

CustomNavLink = styled(CustomNavLink)`
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: #666;
	&:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`

const Header = styled.div`
	color: #373737;
	text-align: center;
	font-size: 2.2rem;
	background: white;
	border-bottom: 1px solid #d0d0d0;
	padding: 10px 0;
`

const Nav = styled.ul`
	position: sticky;
	top: 0;
	background: white;
	z-index: 9999;

	display: flex;
	justify-content: center;
	margin: 0;
	padding: 11px;
	border-bottom: 1px solid #d0d0d0;
	overflow: auto;

	@media (max-width: 768px) {
		justify-content: flex-start;
		* {
			margin: auto;
		}
	}
`

const NavItem = styled.div`
	list-style-type: none;
	padding: 0 16px;
	height: 100%;
	white-space: nowrap;
	color: #666;
	display: inline-block;
	.icon {
		margin-right: 8px;
	}
`

const Navigation = ({ authUser, ...rest }) => (
	<>
		<Header>Streetwear</Header>
		<Nav {...rest}>
			{/* <NavItem className="brand">
				<CustomNavLink to={ROUTES.HOME}>{CONST.BRAND_NAME}</CustomNavLink>
			</NavItem> */}
			<NavItem>
				<CustomNavLink to={ROUTES.BLOG_HOME}>Blog</CustomNavLink>
			</NavItem>
			<NavItem>
				<CustomNavLink to={ROUTES.HOME}>Tablica</CustomNavLink>
			</NavItem>
			{authUser && (
				<>
					<NavItem>
						<CustomNavLink to={ROUTES.NEW_ITEM}>
							{/* <FontAwesomeIcon className="icon" icon="plus" /> */}
							Wystaw Przedmiot
						</CustomNavLink>
					</NavItem>
					<NavItem>
						<CustomNavLink to={ROUTES.ACCOUNT.replace(":id", authUser.uid)}>
							{/* <FontAwesomeIcon className="icon" icon="user" /> */}
							{authUser.displayName ? authUser.displayName : "Profil"}
						</CustomNavLink>{" "}
					</NavItem>
					<NavItem>
						<CustomNavLink as={SignOutButton} />
					</NavItem>
				</>
			)}
			{!authUser && (
				<NavItem>
					<CustomNavLink to={ROUTES.SIGN_IN}>Zaloguj się</CustomNavLink>
				</NavItem>
			)}
			{/* <NavItem className={styles.burgerMenuButton}>
				<FontAwesomeIcon icon="bars" />
			</NavItem> */}
		</Nav>
	</>
)

// .brand {
// 	font-size: 1.45rem;
// 	color: darken($primary, 5%);
// 	flex-grow: 1;
// 	text-align: left;
// }

export default compose(
	withRouter,
	withAuthentication
)(Navigation)
