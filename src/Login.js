import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { Form, Field } from "react-final-form"

export default class Login extends Component {
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

	render() {
		return (
			<div className="Login">
				{/* TODO: form validation */}
				<Form
					onSubmit={this.handleSubmit}
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
