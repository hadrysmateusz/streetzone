import React, { Component } from "react"
import Auth from "@aws-amplify/auth"
import { Form, Field } from "react-final-form"
import CenteredLayout from "./CenteredLayout"
import LoaderButton from "./components/LoaderButton"

class Signup extends Component {
	state = {
		isLoading: false,
		isDone: false
	}

	handleSubmit = async (data) => {
		// TODO: show confiramation form if user trying to register exists but is unverified
		this.setState({ isLoading: true })

		try {
			await Auth.signUp({
				username: data.email,
				password: data.password,
				attributes: {
					name: data.name
				}
			})
			this.setState({ isDone: true })
		} catch (e) {
			alert(e.message)
		}

		this.setState({ isLoading: false })
	}

	render() {
		return (
			<CenteredLayout>
				{this.state.isDone ? (
					<div>Na twój adres email został wysłany link potwierdzający.</div>
				) : (
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
									<LoaderButton
										isLoading={this.state.isLoading}
										type="submit"
										text="OK"
										disabled={submitting || pristine}
									/>
								</div>
							</form>
						)}
					/>
				)}
			</CenteredLayout>
		)
	}
}

export default Signup
