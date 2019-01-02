import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { compose } from "recompose"
import styled from "styled-components"

import { withFirebase } from "../Firebase"
import { StyledLink, FieldRow, FieldLabel, StyledInput, Header } from "../Basics"
import { LoaderButton } from "../Button"
import { FormError } from "../FormElements"
import { ROUTES, FORM_ERR, REGEX } from "../../constants"

const Container = styled.div`
	width: 100%;
	max-width: 280px;
	margin: 0 auto;
`

const PasswordForgetPage = () => {
	return (
		<Container>
			<Header>Zresetuj hasło</Header>
			<PasswordForgetForm />
		</Container>
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
								{({ input, meta }) => (
									<>
										<FieldLabel>E-mail</FieldLabel>
										<StyledInput {...input} type="text" placeholder="E-mail" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						<LoaderButton
							text="Zresetuj hasło"
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine}
							fullWidth
						/>
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
