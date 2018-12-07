import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import Auth from "@aws-amplify/auth"
import Routes from "./Routes.js"
import { BRAND_NAME } from "./const.js"
import styles from "./App.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import errorLog from "./libs/errorLog.js"

class App extends Component {
	state = {
		isAuthenticated: false,
		isAuthenticating: true,
		currentUser: null
	}

	async componentDidMount() {
		try {
			await Auth.currentSession()
			this.userHasAuthenticated(true)
		} catch (e) {
			if (e !== "No current user") {
				alert(e)
			}
		}

		this.setState({ isAuthenticating: false })
	}

	// needs to be a separate function to allow
	// modification from other components via props
	userHasAuthenticated = async (authenticated) => {
		this.setState({ isAuthenticated: authenticated })

		try {
			if (authenticated) {
				let currentUser = await Auth.currentAuthenticatedUser()
				this.setState({ currentUser })
			} else {
				this.setState({ currentUser: null })
			}
		} catch (e) {
			errorLog(e, "Authorization error")
		}
	}

	handleLogout = async () => {
		await Auth.signOut()

		this.userHasAuthenticated(false)

		this.props.history.push("/")
		return
	}

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			isAuthenticating: this.state.isAuthenticating,
			currentUser: this.state.currentUser,
			userHasAuthenticated: this.userHasAuthenticated
		}

		return (
			!this.state.isAuthenticating && (
				<div className={styles.App}>
					<nav className={styles.mainNav}>
						<Link to="/" className={styles.navLink + " " + styles.brand}>
							{BRAND_NAME}
						</Link>
						{this.state.isAuthenticated ? (
							<>
								<Link to="/nowy" className={styles.navLink}>
									<FontAwesomeIcon icon="plus" /> Wystaw Przedmiot
								</Link>
								{this.state.currentUser && (
									<Link
										to={`/profil/${this.state.currentUser.username}`}
										className={styles.navLink}
									>
										<FontAwesomeIcon icon="user" />
										{" " + this.state.currentUser.attributes.name}
									</Link>
								)}
								<div className={styles.navLink} onClick={this.handleLogout}>
									Wyloguj
								</div>
							</>
						) : (
							<>
								<Link to="/login" className={styles.navLink}>
									Logowanie
								</Link>
								<Link to="/rejestracja" className={styles.navLink}>
									Rejestracja
								</Link>
							</>
						)}
					</nav>
					<main>
						<Routes childProps={childProps} />
					</main>
				</div>
			)
		)
	}
}

export default withRouter(App)
