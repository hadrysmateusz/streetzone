import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import { Auth } from "aws-amplify"
import styles from "./App.module.scss"
import { BRAND_NAME } from "./const.js"
import Routes from "./Routes.js"

class App extends Component {
	state = {
		isAuthenticated: false,
		isAuthenticating: true
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

	// needs to be a separate class to allow
	// modification from other components via props
	userHasAuthenticated = (authenticated) => {
		this.setState({ isAuthenticated: authenticated })
	}

	handleLogout = async (event) => {
		await Auth.signOut()

		this.userHasAuthenticated(false)

		this.props.history.push("/login")
	}

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			isAuthenticating: this.state.isAuthenticating,
			userHasAuthenticated: this.userHasAuthenticated
		}

		return (
			!this.state.isAuthenticating && (
				<div className={styles.App}>
					<nav className={styles.mainNav}>
						<Link to="/">
							<div className="brand">{BRAND_NAME}</div>
						</Link>
						{this.state.isAuthenticated ? (
							<>
								<Link to="/nowy">
									<div className="nav-link">Nowy</div>
								</Link>
								<div className="nav-link" onClick={this.handleLogout}>
									Logout
								</div>
							</>
						) : (
							<>
								<Link to="/login">
									<div className="nav-link">Login</div>
								</Link>
								<Link to="/signup">
									<div className="nav-link">Signup</div>
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
