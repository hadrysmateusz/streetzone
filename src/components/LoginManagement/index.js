import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { FORM_ERR } from "../../constants"
import styled from "styled-components"
import { compose } from "recompose"

import { FieldRow, FieldLabel, StyledInput } from "../Basics"
import { FormError } from "../FormElements"
import { SocialButton, LoaderButton } from "../Button"
import { withFirebase } from "../Firebase"
import { PasswordChangeForm } from "../PasswordChange"
import { withAuthentication } from "../UserSession"
import Separator from "../Separator"

const EnabledIndicator = styled.span`
	padding-left: 10px;
	color: ${(p) => (p.isEnabled ? "green" : "red")};
`

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
				{activeSignInMethods.includes("password") && (
					<>
						<Separator>Zmień hasło</Separator>
						<PasswordChangeForm />
					</>
				)}
				<Separator>Metody logowania</Separator>

				{/* <div>
					{SIGN_IN_METHODS.map((signInMethod) => {
						const isEnabled = activeSignInMethods.includes(signInMethod.id)
						return (
							<div>
								{signInMethod.name}
								<EnabledIndicator isEnabled={isEnabled}>
									{isEnabled ? "Włączone" : "Wyłączone"}
								</EnabledIndicator>
							</div>
						)
					})}
				</div> */}

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
								{signInMethod.name}
								<EnabledIndicator isEnabled={isEnabled}>
									{isEnabled ? "Włączone" : "Wyłączone"}
								</EnabledIndicator>
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
				title={
					onlyOneLeft ? "Nie można dezaktywować ostatniej metody logowania" : undefined
				}
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
						<FieldRow>
							<Field name="password">
								{({ input, meta }) => (
									<>
										<FieldLabel>Hasło</FieldLabel>
										<StyledInput {...input} type="password" placeholder="Hasło" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						{/* Powtórz Hasło */}
						{values.password && (
							<FieldRow>
								<Field name="passwordConfirm">
									{({ input, meta }) => (
										<>
											<FieldLabel>Potwierdź Hasło</FieldLabel>
											<StyledInput
												{...input}
												type="password"
												placeholder="Potwierdź Hasło"
											/>
											<FormError message={meta.error} show={meta.error && meta.touched} />
										</>
									)}
								</Field>
							</FieldRow>
						)}

						<LoaderButton
							text={`Powiąż ${signInMethod.name}`}
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine || invalid}
							fullWidth
						/>
					</form>
				)}
			/>
		)
	}
}

const LoginManagementUnstyled = compose(
	withFirebase,
	withAuthentication
)(LoginManagementBase)

const LoginManagement = styled(LoginManagementUnstyled)`
	margin: 35px auto 50px;
	.provider-container {
		margin: 15px 0;
	}
`

export default LoginManagement
