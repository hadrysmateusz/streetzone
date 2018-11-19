import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import { Form, Field } from "react-final-form"

import CenteredLayout from "./CenteredLayout"
import LoaderButton from "./components/LoaderButton"

class Login extends Component {
	state = {
		isLoading: false
	}

	handleSubmit = async (data) => {
		// TODO: ask for confirmation if user trying to register exists but is unverified
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
									<LoaderButton
										isLoading={this.state.isLoading}
										type="submit"
										text="OK"
										disabled={submitting || pristine}
									/>
								</div>
							</form>
						</>
					)}
				/>
			</CenteredLayout>
		)
	}
}

export default Login
