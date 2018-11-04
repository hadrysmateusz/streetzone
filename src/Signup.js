import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import { Form, Field } from "react-final-form"
import CenteredLayout from "./CenteredLayout"

class Signup extends Component {
	state = {
		isLoading: false,
		newUser: null
	}

	handleSubmit = async (data) => {
		// TODO: show confiramation form if user trying to register exists but is unverified
		this.setState({ isLoading: true })

		try {
			const newUser = await Auth.signUp({
				username: data.email,
				password: data.password,
				attributes: {
					name: data.name
				}
			})
			this.setState({
				newUser
			})
		} catch (e) {
			alert(e.message)
		}

		this.setState({ isLoading: false })
	}

	handleConfirmationSubmit = async (data) => {
		try {
			await Auth.confirmSignUp(data.email, data.confirmationCode)
			await Auth.signIn(data.email, data.password)

			this.props.userHasAuthenticated(true)
			this.props.history.push("/")
			return
		} catch (e) {
			alert(e.message)
			this.setState({ isLoading: false })
		}
	}

	renderConfirmationForm() {
		return (
			<Form
				onSubmit={this.handleConfirmationSubmit}
				render={({ handleSubmit, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div>
							Na twój adres email została wysłana wiadomość z kodem
							potwierdzającym.
						</div>
						<div>
							<label>Kod Potwierdzający</label>
							<Field name="confirmationCode" component="input" type="tel" />
						</div>
						<div className="buttons">
							<button type="submit" disabled={submitting || pristine}>
								Potwierdź
							</button>
						</div>
					</form>
				)}
			/>
		)
	}

	renderForm() {
		return (
			<Form
				onSubmit={this.handleSubmit}
				render={({ handleSubmit, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>Imię</label>
							<Field name="name" component="input" type="text" autoFocus />
						</div>
						<div>
							<label>E-Mail</label>
							<Field name="email" component="input" type="text" />
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
		)
	}

	render() {
		return (
			<CenteredLayout>
				{this.state.newUser === null
					? this.renderForm()
					: this.renderConfirmationForm()}
			</CenteredLayout>
		)
	}
}

export default Signup
