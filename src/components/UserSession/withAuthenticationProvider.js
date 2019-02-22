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
			const { firebase } = this.props

			// Listen to auth state changes
			this.removeAuthListener = firebase.onAuthUserListener(
				(authUser) => {
					// If the db listener isn't registered yet, register it
					if (!this.removeDbListener) {
						// Listen to changes in the current user's firestore document
						// and update local storage and context accordingly
						this.removeDbListener = firebase.currentUser().onSnapshot((user) => {
							console.log("updating local storage due to a database change")
							let authUser = firebase.authUser()

							if (authUser) {
								const dbUser = user.data()

								authUser = {
									uid: authUser.uid,
									emailVerified: authUser.emailVerified,
									...dbUser
								}

								localStorage.setItem("authUser", JSON.stringify(authUser))
								this.setState({ authUser })
							} else {
								localStorage.removeItem("authUser")
								this.setState({ authUser: null })
							}
						})
					}
					// Update state and local storage with the merged user
					// (the auth and db users get merged in the firebase.onAuthUserListener internals)
					console.log("updating local storage due to auth state change")
					localStorage.setItem("authUser", JSON.stringify(authUser))
					this.setState({ authUser })
				},
				() => {
					// Update state and remove user from local storage
					console.log("updating local storage due to auth state change")
					localStorage.removeItem("authUser")
					this.setState({ authUser: null })
				}
			)
		}

		componentWillUnmount = () => {
			this.removeAuthListener()
			if (this.removeDbListener) {
				this.removeDbListener()
			}
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
