import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { AuthUserContext } from "../UserSession"
import { withFirebase } from "../Firebase"

import Navigation from "../Navigation"
import Routes from "../Routes"

class App extends React.Component {
	state = {
		authUser: null
	}

	componentDidMount = () => {
		this.removeListener = this.props.firebase.auth.onAuthStateChanged(
			(authUser) => {
				authUser
					? this.setState({ authUser })
					: this.setState({ authUser: null })
			}
		)
	}

	componentWillUnmount = () => {
		this.removeListener()
	}

	render() {
		return (
			<AuthUserContext.Provider value={this.state.authUser}>
				<Router>
					<>
						<Navigation />
						<Routes />
					</>
				</Router>
			</AuthUserContext.Provider>
		)
	}
}

export default withFirebase(App)
