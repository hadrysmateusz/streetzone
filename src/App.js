import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import Auth from "@aws-amplify/auth"
import Routes from "./Routes.js"
import { BRAND_NAME } from "./const.js"
import styles from "./App.module.scss"

class App extends Component {
	state = {
		isAuthenticated: false,
		isAuthenticating: true,
		currentUserId: null
	}

	// facebookInit() {
	// 	window.fbAsyncInit = function() {
	// 		window.FB.init({
	// 			appId: "2066475883419137",
	// 			autoLogAppEvents: true,
	// 			xfbml: true,
	// 			version: "v3.2"
	// 		})
	// 	}
	// 	;(function(d, s, id) {
	// 		var js,
	// 			fjs = d.getElementsByTagName(s)[0]
	// 		if (d.getElementById(id)) {
	// 			return
	// 		}
	// 		js = d.createElement(s)
	// 		js.id = id
	// 		js.src = "https://connect.facebook.net/en_US/sdk.js"
	// 		fjs.parentNode.insertBefore(js, fjs)
	// 	})(document, "script", "facebook-jssdk")
	// }

	async componentDidMount() {
		// this.facebookInit()

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

	// needs to be a separate class to allow
	// modification from other components via props
	userHasAuthenticated = async (authenticated) => {
		this.setState({ isAuthenticated: authenticated })

		try {
			if (authenticated) {
				let userInfo = await Auth.currentUserInfo()
				let currentUserId = userInfo.id
				this.setState({ currentUserId })
			} else {
				this.setState({ currentUserId: null })
			}
		} catch (e) {
			console.log("Authorization error")
		}
	}

	handleLogout = async (event) => {
		await Auth.signOut()

		this.userHasAuthenticated(false)

		this.props.history.push("/")
		return
	}

	render() {
		console.log("APP PROPS:", this.props)
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			isAuthenticating: this.state.isAuthenticating,
			currentUserId: this.state.currentUserId,
			userHasAuthenticated: this.userHasAuthenticated,
			authState: this.props.authState
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
									Wystaw Przedmiot
								</Link>
								<Link
									to={`/profil/${this.state.currentUserId}`}
									className={styles.navLink}
								>
									Profil
								</Link>
								<div className={styles.navLink} onClick={this.handleLogout}>
									Wyloguj
								</div>
							</>
						) : (
							<>
								{/* Do celów testowych */}
								<div className={styles.navLink} onClick={this.handleLogout}>
									Wyloguj
								</div>
								<Link to="/login" className={styles.navLink}>
									Logowanie
								</Link>
								<Link to="/signup" className={styles.navLink}>
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
