import React from "react"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"

const withAuthenticationProvider = (Component) => {
	class WithAuthenticationProvider extends React.Component {
		constructor(props) {
			super(props)

			this.state = {
				authUser: JSON.parse(localStorage.getItem("authUser"))
			}
		}

		componentDidMount = () => {
			this.removeListener = this.props.firebase.onAuthUserListener(
				(authUser) => {
					localStorage.setItem("authUser", JSON.stringify(authUser))
					this.setState({ authUser }, () => console.log("cdm", this.state))
				},
				() => {
					localStorage.removeItem("authUser")
					this.setState({ authUser: null })
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
