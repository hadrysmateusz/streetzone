import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import { Form, Field } from "react-final-form"
import CenteredLayout from "./CenteredLayout"

class Login extends Component {
	state = {
		isLoading: false
	}

	// componentDidMount = () => {
	// 	console.log("LOGIN PROPS:", this.props)
	// }

	fbLogin() {
		// window.FB.login(function(response) {
		// 	if (response.status === "connected") {
		// 		const { accessToken, expiresAt, userId } = response.authResponse
		// 		Auth.federatedSignIn(
		// 			"facebook",
		// 			{ token: accessToken, expires_at: expiresAt },
		// 			{ name: userId }
		// 		)
		// 			.then((credentials) => {
		// 				console.log("get aws credentials", credentials)
		// 			})
		// 			.catch((e) => {
		// 				console.log(e)
		// 			})
		// 	} else {
		// 		// The person is not logged into this app or we are unable to tell.
		// 	}
		// })
	}

	handleSubmit = async (data) => {
		this.setState({ isLoading: true })

		try {
			await Auth.signIn(data.email, data.password)
			this.props.userHasAuthenticated(true)
		} catch (e) {
			console.log(e)
			alert(e.message)
			this.setState({ isLoading: false })
		}
	}
	handleResponse = (data) => {
		console.log(data)
	}

	handleError = (error) => {
		this.setState({ error })
	}

	render() {
		return (
			<CenteredLayout>
				<Form
					onSubmit={this.handleSubmit}
					render={({ handleSubmit, submitting, pristine }) => (
						<>
							<form onSubmit={handleSubmit}>
								<div>
									<label>E-Mail </label>
									<Field name="email" component="input" type="text" autoFocus />
								</div>
								<div>
									<label>Hasło </label>
									<Field name="password" component="input" type="password" />
								</div>
								<div className="buttons">
									<button type="submit" disabled={submitting || pristine}>
										OK
									</button>
								</div>
							</form>
							{this.props.authState}
							{/* <a
								href={`https://streetwear-dev.auth.eu-west-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=5cdq6tmbrpm6aqbej1qip0duhq&redirect_uri=https://flamboyant-jepsen-0627c4.netlify.com/&state=123&identity_provider=Facebook`}
								style={{
									background: "#3B5998",
									color: "white",
									padding: "10px 20px",
									display: "inline-block",
									marginTop: "10px"
								}}
							>
								oauth2/authorize endpoint
							</a>
							<a
								href={`https://streetwear-dev.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=5cdq6tmbrpm6aqbej1qip0duhq&redirect_uri=https://flamboyant-jepsen-0627c4.netlify.com/&state=123`}
								style={{
									background: "#3B5998",
									color: "white",
									padding: "10px 20px",
									display: "inline-block",
									marginTop: "10px"
								}}
							>
								login endpoint
							</a> */}
						</>
					)}
				/>
			</CenteredLayout>
		)
	}
}

export default Login
