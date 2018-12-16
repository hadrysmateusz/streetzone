import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"

import { StyledLink } from "../Basics"
import { withAuthorization } from "../UserSession"
import { withFirebase } from "../Firebase"
import { ROUTES, FORM_ERR, REGEX } from "../../constants"

const PasswordForgetPage = () => {
	return (
		<>
			<h1>Zresetuj hasło</h1>
			<PasswordForgetForm />
		</>
	)
}

class PasswordForgetFormBase extends Component {
	state = { error: null }

	onSubmit = async (values, actions) => {
		const { email } = values

		try {
			await this.props.firebase.resetPassword(email)
			// Reset form
			actions.reset()
			// Reset component
			await this.setState({ error: null })
		} catch (error) {
			this.setState({ error })
		}
	}

	validate = (values) => {
		const { email } = values
		const errors = {}

		// E-mail
		if (!email) {
			errors.email = FORM_ERR.IS_REQUIRED
		} else if (!REGEX.EMAIL.test(email)) {
			errors.email = FORM_ERR.EMAIL_INVALID
		}

		return errors
	}

	render() {
		const { error } = this.state

		return (
			<Form
				onSubmit={this.onSubmit}
				validate={this.validate}
				render={({ handleSubmit, submitting, pristine }) => (
					<form onSubmit={handleSubmit}>
						{/* E-mail */}
						<Field name="email">
							{({ input, meta }) => (
								<div>
									<label>E-mail </label>
									<input {...input} type="text" placeholder="E-mail" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<div className="buttons">
							<button type="submit" disabled={submitting}>
								Zresetuj hasło
							</button>
						</div>
						{error && <p>{error.message}</p>}
					</form>
				)}
			/>
		)
	}
}

const condition = (authUser) => !!authUser

const PasswordForgetForm = compose(
	withAuthorization(condition),
	withFirebase
)(PasswordForgetFormBase)

const PasswordForgetLink = () => (
	<p>
		<StyledLink to={ROUTES.PASSWORD_FORGET}>Zapomniałeś hasła?</StyledLink>
	</p>
)

export default PasswordForgetPage
export { PasswordForgetForm, PasswordForgetLink }
