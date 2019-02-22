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
import { Header } from "../AccountPage/StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EnabledIndicator = styled.div`
	height: 28px;
	width: 28px;
	background: white;
	border: 2px solid ${(p) => p.theme.colors.gray[50]};
	border-radius: 2px;
	margin-right: 12px;

	color: ${(p) => p.theme.colors.black[75]};

	display: flex;
	justify-content: center;
	align-items: center;
`

const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
`

const SocialContainer = styled.div`
	display: grid;
	gap: 15px;
`

const PasswordContainer = styled.div`
	form {
		display: grid;
		gap: 15px;
	}
`

const ConfirmPasswordContainer = styled.div`
	display: flex;
	* + * {
		margin-left: 10px;
	}
`

const InfoContainer = styled.div`
	position: relative;
	font-size: 0.98rem;
	line-height: 1.4rem;
	color: ${(p) => p.theme.colors.black[50]};
	font-weight: 300;
`

const InfoIndicator = styled.div`
	position: absolute;
	top: 0px;
	left: -25px;
	font-size: 1.12rem;
	color: ${(p) => p.theme.colors.black[75]};
`

const SIGN_IN_METHODS = [
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
		const onlyOneLeft = activeSignInMethods.length === 1

		return (
			<div>
				<InfoContainer>
					Powiąż swoje konto na Bumped z jednym lub więcej kontami społecznościowymi, by
					móc logować się za ich pomocą do serwisu. Jeśli za pierwszym razem zalogowałeś
					się używając jednego z kont społecznościowych, możesz również dodać hasło by
					logować się za pomocą e-mailu i hasła.
					<InfoIndicator>
						<FontAwesomeIcon icon="info-circle" />
					</InfoIndicator>
				</InfoContainer>

				<OuterContainer>
					<SocialContainer>
						<Header>Konta Społecznościowe</Header>
						{SIGN_IN_METHODS.map((signInMethod) => {
							const isEnabled = activeSignInMethods.includes(signInMethod.id)
							const commonProps = {
								onlyOneLeft,
								isEnabled,
								signInMethod,
								onUnlink: this.onUnlink
							}

							return signInMethod.id !== "password" ? (
								<SocialLoginToggle
									{...commonProps}
									key={signInMethod.id}
									onLink={this.onSocialLoginLink}
								/>
							) : null
						})}
					</SocialContainer>
					<PasswordContainer>
						{activeSignInMethods.includes("password") ? (
							<>
								<PasswordChangeForm />
							</>
						) : (
							<>
								<DefaultLoginToggle
									isEnabled={activeSignInMethods.includes("password")}
									onlyOneLeft={onlyOneLeft}
									onLink={this.onSocialLoginLink}
								/>
							</>
						)}
					</PasswordContainer>
				</OuterContainer>
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
			>
				<EnabledIndicator>
					{isEnabled && <FontAwesomeIcon icon="check" />}
				</EnabledIndicator>
				{`Dezaktywuj ${signInMethod.name}`}
			</SocialButton>
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
		const { onlyOneLeft, isEnabled, onUnlink } = this.props
		const signInMethod = {
			id: "password",
			name: "Hasło",
			provider: null
		}

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
						<Header>Dodaj hasło</Header>

						{/* Hasło */}
						<FieldRow>
							<Field name="password">
								{({ input, meta }) => (
									<>
										<StyledInput {...input} type="password" placeholder="Hasło" />
										<FormError message={meta.error} show={meta.error && meta.touched} />
									</>
								)}
							</Field>
						</FieldRow>

						<ConfirmPasswordContainer>
							{/* Powtórz Hasło */}
							<FieldRow>
								<Field name="passwordConfirm">
									{({ input, meta }) => (
										<>
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

							<LoaderButton
								text={`Zapisz`}
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine || invalid}
								primary
							/>
						</ConfirmPasswordContainer>
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
