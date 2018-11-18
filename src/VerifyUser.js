import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import queryString from "query-string"

import CenteredLayout from "./CenteredLayout"
import LoadingSpinner from "./components/LoadingSpinner"

class VerifyUser extends Component {
	state = {
		name: null,
		isConfirmed: false,
		error: false
	}
	componentDidMount = async () => {
		// Get query parameters from URL
		const { email, name, code } = queryString.parse(this.props.location.search)
		this.setState({ name })

		// If required params are present - attempt to confirm
		if (email && code) {
			try {
				await Auth.confirmSignUp(email, code)
				this.setState({ isConfirmed: true })
			} catch (e) {
				alert(e.message)
				this.setState({ error: true })
			}
		} else {
			this.setState({ error: true })
		}
	}

	render() {
		return (
			<CenteredLayout>
				{this.state.error ? (
					<h2>
						Coś poszło nie tak{" "}
						{String.fromCharCode(58) + String.fromCharCode(40)}
					</h2>
				) : this.state.isConfirmed ? (
					<>
						<h2>Witaj {this.state.name && this.state.name}!</h2>
						<p>
							Twój adres email został potwierdzony, teraz możesz się zalogować.
						</p>
					</>
				) : (
					<LoadingSpinner />
				)}
			</CenteredLayout>
		)
	}
}

export default VerifyUser
