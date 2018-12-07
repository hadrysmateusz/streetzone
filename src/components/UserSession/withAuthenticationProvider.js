import React from "react"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"

const withAuthenticationProvider = (Component) => {
	class WithAuthenticationProvider extends React.Component {
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
					<Component {...this.props} />
				</AuthUserContext.Provider>
			)
		}
	}

	return withFirebase(WithAuthenticationProvider)
}

export default withAuthenticationProvider
