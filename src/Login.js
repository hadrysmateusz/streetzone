import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { Form, Field } from "react-final-form"

class Login extends Component {
	state = {
		isLoading: false
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
	validate = () => {
		console.log("validating")
		/* TODO: form validation */
	}

	render() {
		return (
			<div className="Login">
				<Form
					onSubmit={this.handleSubmit}
					validate={this.validate}
					render={({ handleSubmit, submitting, pristine }) => (
						<form onSubmit={handleSubmit}>
							<div>
								<label>E-Mail</label>
								<Field name="email" component="input" type="text" autoFocus />
							</div>
							<div>
								<label>Hasło</label>
								<Field name="password" component="input" type="password" />
							</div>
							<div className="buttons">
								<button type="submit" disabled={submitting || pristine}>
									OK
								</button>
							</div>
						</form>
					)}
				/>
			</div>
		)
	}
}

export default Login
