import React, { Component } from "react"
import { Form, Field } from "react-final-form"
import { ROUTES, FORM_ERR, AUTH_ERR, REGEX } from "../../constants"

import Button from "../Button"
import LoaderButton from "../LoaderButton"
import { withFirebase } from "../Firebase"
import { PasswordForgetForm } from "../PasswordForget"
import PasswordChangeForm from "../PasswordChange"

import styles from "./LoginManagement.module.scss"

const SIGN_IN_METHODS = [
	{
		id: "password",
		name: "E-mail i Hasło",
		provider: null,
		theme: {
			color: "#222",
			backgroundColor: "#bfbfbf",
			borderColor: "#bfbfbf"
		}
	},
	{
		id: "google.com",
		name: "Google",
		provider: "googleProvider",
		theme: {
			color: "white",
			backgroundColor: "#4285F4",
			borderColor: "#4285F4"
		}
	},
	{
		id: "facebook.com",
		name: "Facebook",
		provider: "facebookProvider",
		theme: {
			color: "white",
			backgroundColor: "#3b5998",
			borderColor: "#3b5998"
		}
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
		console.log("linking password", password)
		try {
			const credential = this.props.firebase.emailAuthProvider.credential(
				this.props.authUser.email,
				password
			)
			console.log("credential", credential)

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
			<div>
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
						<div
							className={styles.signInProviderToggleContainer}
							key={signInMethod.id}
						>
							{signInMethod.id === "password" ? (
								<DefaultLoginToggle
									{...commonProps}
									key={signInMethod.id}
									onLink={this.onDefaultLoginLink}
									className={styles[signInMethod.cssClassName]}
								/>
							) : (
								<SocialLoginToggle
									{...commonProps}
									key={signInMethod.id}
									onLink={this.onSocialLoginLink}
									className={styles[signInMethod.cssClassName]}
								/>
							)}
						</div>
					)
				})}
				{error && error.message}
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
			<Button
				theme={signInMethod.theme}
				onClick={() => onUnlink(signInMethod.id)}
				disabled={onlyOneLeft}
				text={`Dezaktywuj ${signInMethod.name}`}
				wide
			/>
		) : (
			<Button
				theme={signInMethod.theme}
				onClick={() => onLink(signInMethod.provider)}
				text={`Powiąż ${signInMethod.name}`}
				wide
			/>
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
		console.log("submitting", values)
		await this.props.onLink(values.password)
		console.log("about to reset")
		// actions.reset()
	}

	render() {
		const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props

		return isEnabled ? (
			<Button
				theme={signInMethod.theme}
				onClick={() => onUnlink(signInMethod.id)}
				disabled={onlyOneLeft}
				text={`Dezaktywuj ${signInMethod.name}`}
				wide
			/>
		) : (
			<Form
				onSubmit={this.onSubmit}
				validate={this.validate}
				render={({ handleSubmit, submitting, pristine, values, invalid }) => (
					<form onSubmit={handleSubmit}>
						{/* Hasło */}
						<Field name="password">
							{({ input, meta }) => (
								<div>
									<label>Hasło </label>
									<input {...input} type="password" placeholder="Hasło" />
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						{/* Powtórz Hasło */}
						<Field name="passwordConfirm">
							{({ input, meta }) => (
								<div>
									<label>Potwierdź Hasło </label>
									<input
										{...input}
										type="password"
										placeholder="Potwierdź Hasło"
									/>
									{meta.error && meta.touched && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<div className="buttons">
							<LoaderButton
								type="submit"
								disabled={submitting || pristine || invalid}
								text="Powiąż"
							/>
						</div>
					</form>
				)}
			/>
		)
	}
}

const LoginManagement = withFirebase(LoginManagementBase)

export default LoginManagement
