import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { withAuthentication } from "../UserSession"
import SignOutButton from "../SignOut"

import styles from "./Navigation.module.scss"
import { ROUTES, CONST } from "../../constants"

const Navigation = ({ authUser }) => {
	return (
		<ul className={styles.mainNav}>
			<li className={styles.brand}>
				<Link to={ROUTES.HOME}>{CONST.BRAND_NAME}</Link>
			</li>
			{authUser && (
				<>
					<li>
						<Link to={ROUTES.NEW_ITEM} className={styles.navLink}>
							<FontAwesomeIcon className={styles.icon} icon="plus" />
							Wystaw Przedmiot
						</Link>
					</li>
					<li>
						<Link
							to={ROUTES.ACCOUNT.replace(":id", authUser.uid)}
							className={styles.navLIn}
						>
							<FontAwesomeIcon className={styles.icon} icon="user" />
							{authUser.displayName ? authUser.displayName : "Profil"}
						</Link>{" "}
					</li>
					<li>
						<SignOutButton className={styles.signOutButton} />
					</li>
				</>
			)}
			{!authUser && (
				<li>
					<Link to={ROUTES.SIGN_IN}>Zaloguj się</Link>
				</li>
			)}
		</ul>
	)
}

export default withAuthentication(Navigation)
