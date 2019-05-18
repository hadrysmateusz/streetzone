import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"

import { withFirebase } from "../../components/Firebase"
import { StyledLink, FieldRow, Header } from "../../components/Basics"
import { LoaderButton, ButtonContainer } from "../../components/Button"
import { FormError, Input } from "../../components/FormElements"

import { ROUTES, FORM_ERR, REGEX } from "../../constants"
import { CenteredContainer, MainPageContainer } from "../../components/Containers"

const PasswordForgetPage = () => {
	return (
		<MainPageContainer>
			<CenteredContainer>
				<Header>Zresetuj hasło</Header>
				<PasswordForgetForm />
			</CenteredContainer>
		</MainPageContainer>
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
						<FieldRow>
							<Field name="email">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input {...input} type="email" placeholder="E-mail" error={error} />
									)
								}}
							</Field>
						</FieldRow>
						<ButtonContainer>
							<LoaderButton
								text="Zresetuj hasło"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								fullWidth
							/>
						</ButtonContainer>
						{error && <FormError message={error.message} show={error} />}
					</form>
				)}
			/>
		)
	}
}

const PasswordForgetForm = compose(withFirebase)(PasswordForgetFormBase)

const PasswordForgetLink = () => (
	<p>
		<StyledLink to={ROUTES.PASSWORD_FORGET}>Zapomniałeś hasła?</StyledLink>
	</p>
)

export default PasswordForgetPage
export { PasswordForgetForm, PasswordForgetLink }
