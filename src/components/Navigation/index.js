import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, withRouter } from "react-router-dom"
import styled from "styled-components"
import { compose } from "recompose"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import { ROUTES, CONST, CSS } from "../../constants"

let CustomNavLink = ({ exact = true, ...rest }) => (
	<NavLink exact={exact} activeStyle={{ color: CSS.COLOR_ACCENT }} {...rest} />
)

CustomNavLink = styled(CustomNavLink)`
	background: none;
	border: none;
	outline: none;
	padding: 0;
	color: #292929;
	&:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`

const Header = styled.div`
	color: #333;
	text-align: center;
	font-size: 2.2rem;
	background: white;
	border-bottom: 1px solid #ddd;
	padding: 10px 0;
`

const Nav = styled.ul`
	position: sticky;
	top: 0;
	background: white;
	z-index: 9990;

	display: flex;
	justify-content: center;
	margin: 0;
	margin-bottom: 20px;
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

const NavItem = styled.div`
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
	<>
		<Header>{CONST.BRAND_NAME}</Header>
		<Nav {...rest}>
			{/* <NavItem className="brand">
				<CustomNavLink to={ROUTES.HOME}></CustomNavLink>
			</NavItem> */}
			<NavItem>
				<CustomNavLink to={ROUTES.BLOG_HOME} exact={false}>
					Blog
				</CustomNavLink>
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
