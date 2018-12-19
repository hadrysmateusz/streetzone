import React, { Component } from "react"
import { Form } from "react-final-form"
import { FORM_ERR } from "../../constants"
import styled from "styled-components"

import { StyledField } from "../Basics"
import { SocialButton } from "../Button"
import { LoaderButton } from "../Button"
import { withFirebase } from "../Firebase"
import { PasswordChangeForm } from "../PasswordChange"

const SIGN_IN_METHODS = [
	{
		id: "password",
		name: "Hasło",
		provider: null
	},
	{
		id: "google.com",
		name: "Google",
		provider: "googleProvider"
	},
	{
		id: "facebook.com",
		name: "Facebook",
		provider: "facebookProvider"
	}
]

export class LoginManagementBase extends Component {
	state = {
		activeSignInMethods: [],
		error: null
	}

	componentDidMount = () => {
		this.fetchSignInMethods()
	}

	fetchSignInMethods = async () => {
		try {
			const activeSignInMethods = await this.props.firebase.auth.fetchSignInMethodsForEmail(
				this.props.authUser.email
			)
			this.setState({ activeSignInMethods, error: null })
		} catch (error) {
			this.setState({ error })
		}
	}

	onDefaultLoginLink = async (password) => {
		try {
			const credential = this.props.firebase.emailAuthProvider.credential(
				this.props.authUser.email,
				password
			)

			await this.props.firebase.auth.currentUser.linkAndRetrieveDataWithCredential(
				credential
			)
			this.fetchSignInMethods()
		} catch (error) {
			this.setState({ error })
		}
	}

	onSocialLoginLink = async (provider) => {
		try {
			await this.props.firebase.auth.currentUser.linkWithPopup(
				this.props.firebase[provider]
			)
			this.fetchSignInMethods()
		} catch (error) {
			this.setState({ error })
		}
	}

	onUnlink = async (providerId) => {
		try {
			await this.props.firebase.auth.currentUser.unlink(providerId)
			this.fetchSignInMethods()
		} catch (error) {
			this.setState({ error })
		}
	}

	render() {
		const { activeSignInMethods, error } = this.state

		return (
			<div className={this.props.className}>
				{activeSignInMethods.includes("password") && <PasswordChangeForm />}
				<div className="provider-container">
					{SIGN_IN_METHODS.map((signInMethod) => {
						const onlyOneLeft = activeSignInMethods.length === 1
						const isEnabled = activeSignInMethods.includes(signInMethod.id)
						const commonProps = {
							onlyOneLeft,
							isEnabled,
							signInMethod,
							onUnlink: this.onUnlink
						}

						return (
							<div className="provider-toggle" key={signInMethod.id}>
								{signInMethod.id === "password" ? (
									<DefaultLoginToggle
										{...commonProps}
										key={signInMethod.id}
										onLink={this.onDefaultLoginLink}
									/>
								) : (
									<SocialLoginToggle
										{...commonProps}
										key={signInMethod.id}
										onLink={this.onSocialLoginLink}
									/>
								)}
							</div>
						)
					})}
					{error && error.message}
				</div>
			</div>
		)
	}
}

const SocialLoginToggle = ({
	onlyOneLeft,
	isEnabled,
	signInMethod,
	onLink,
	onUnlink
}) => (
	<div>
		{isEnabled ? (
			<SocialButton
				provider={signInMethod.id}
				onClick={() => onUnlink(signInMethod.id)}
				disabled={onlyOneLeft}
				fullWidth
			>{`Dezaktywuj ${signInMethod.name}`}</SocialButton>
		) : (
			<SocialButton
				provider={signInMethod.id}
				onClick={() => onLink(signInMethod.provider)}
				fullWidth
			>{`Powiąż ${signInMethod.name}`}</SocialButton>
		)}
	</div>
)

class DefaultLoginToggle extends Component {
	validate = (values) => {
		const { password, passwordConfirm } = values
		const errors = {}

		// Password
		if (!password) {
			errors.password = FORM_ERR.IS_REQUIRED
		}

		// Password Confirm
		if (!passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.IS_REQUIRED
		} else if (password !== passwordConfirm) {
			errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
		}

		return errors
	}

	onSubmit = async (values, actions) => {
		await this.props.onLink(values.password)
	}

	render() {
		const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props

		return isEnabled ? (
			<SocialButton
				onClick={() => onUnlink(signInMethod.id)}
				disabled={onlyOneLeft}
				fullWidth
			>{`Dezaktywuj ${signInMethod.name}`}</SocialButton>
		) : (
			<Form
				onSubmit={this.onSubmit}
				validate={this.validate}
				render={({ handleSubmit, submitting, pristine, values, invalid }) => (
					<form onSubmit={handleSubmit}>
						{/* Hasło */}
						<StyledField name="password">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>Hasło </label>
									<input {...input} type="password" placeholder="Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						{/* Powtórz Hasło */}
						<StyledField name="passwordConfirm">
							{({ input, meta, ...rest }) => (
								<div {...rest}>
									<label>Potwierdź Hasło </label>
									<input {...input} type="password" placeholder="Potwierdź Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</StyledField>

						<div className="buttons">
							<LoaderButton
								type="submit"
								disabled={submitting || pristine || invalid}
								text={`Powiąż ${signInMethod.name}`}
								fullWidth
							/>
						</div>
					</form>
				)}
			/>
		)
	}
}

const LoginManagementUnstyled = withFirebase(LoginManagementBase)

const LoginManagement = styled(LoginManagementUnstyled)`
	width: 500px;
	margin: 35px auto 50px;
	.provider-container {
		margin: 15px 0;
	}
`

export default LoginManagement
