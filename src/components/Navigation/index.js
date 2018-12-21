import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"
import { ROUTES, CONST, CSS } from "../../constants"

const NavLink = styled(Link)`
	background: none;
	border: none;
	outline: none;
	padding: 0;
	&:hover {
		color: ${CSS.COLOR_ACCENT};
	}
`

const NavigationUnstyled = ({ authUser, ...rest }) => (
	<ul {...rest}>
		<li className="brand">
			<NavLink to={ROUTES.HOME}>{CONST.BRAND_NAME}</NavLink>
		</li>
		<li>
			<NavLink to={ROUTES.BLOG_HOME}>Blog</NavLink>
		</li>
		{authUser && (
			<>
				<li>
					<NavLink to={ROUTES.NEW_ITEM}>
						<FontAwesomeIcon className="icon" icon="plus" />
						Wystaw Przedmiot
					</NavLink>
				</li>
				<li>
					<NavLink to={ROUTES.ACCOUNT.replace(":id", authUser.uid)}>
						<FontAwesomeIcon className="icon" icon="user" />
						{authUser.displayName ? authUser.displayName : "Profil"}
					</NavLink>{" "}
				</li>
				<li>
					<NavLink as={SignOutButton} />
				</li>
			</>
		)}
		{!authUser && (
			<li>
				<NavLink to={ROUTES.SIGN_IN}>Zaloguj się</NavLink>
			</li>
		)}
		{/* <li className={styles.burgerMenuButton}>
				<FontAwesomeIcon icon="bars" />
			</li> */}
	</ul>
)

const Navigation = styled(NavigationUnstyled)`
	border-bottom: 2px solid ${CSS.COLOR_BLACK};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px 4px 10px;
	margin: 0 12px;
	margin-bottom: 10px;
	@media (min-width: 1050px) {
		margin-bottom: 70px;
	}

	li {
		list-style-type: none;
		padding: 0 12px;
		height: 100%;
		.icon {
			margin-right: 8px;
		}
	}

	.brand {
		font-size: 1.45rem;
		color: darken($primary, 5%);
		flex-grow: 1;
		text-align: left;
	}
`

export default withAuthentication(Navigation)
