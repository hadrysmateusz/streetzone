import React, { useState } from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { withRouter, Redirect } from "react-router-dom"
import { compose } from "recompose"

import { SignIn } from "../../pages/Auth/SignIn"
import { SignUp } from "../../pages/Auth/SignUp"

import { route } from "../../utils"

import Separator from "../Separator"
import { StatefulModal } from "../Modal/new"

const LinkButton = styled.span`
	cursor: pointer;
	text-decoration: underline;
	:hover {
		color: ${(p) => p.theme.colors.accent};
	}
`

const SignInLink = ({ onChangePage }) => {
	return (
		<div
			css={`
				margin-top: calc(var(--spacing3) - 3px);
			`}
		>
			Masz już konto?{" "}
			<LinkButton onClick={() => onChangePage("signIn")}>Zaloguj się</LinkButton>
		</div>
	)
}

const SignUpLink = ({ onChangePage }) => (
	<div
		css={`
			margin-top: calc(var(--spacing3) - 2px);
		`}
	>
		Nie masz jeszcze konta?{" "}
		<LinkButton onClick={() => onChangePage("signUp")}>Utwórz konto</LinkButton>
	</div>
)

const SignInModal = ({ changePage }) => {
	return (
		<div>
			<SignIn />
			<Separator />
			<SignUpLink onChangePage={changePage} />
		</div>
	)
}

const SignUpModal = ({ changePage }) => {
	return (
		<div>
			<SignUp />
			<Separator />
			<SignInLink onChangePage={changePage} />
		</div>
	)
}

const pages = {
	signIn: SignInModal,
	signUp: SignUpModal
}

const AuthModal = ({ children, currentBreakpoint, location }) => {
	const [currentPage, setCurrentPage] = useState("signIn")

	const CurrentComponent = pages[currentPage]

	const changePage = (pageName) => setCurrentPage(pageName)

	const commonProps = { changePage }

	const isMobile = +currentBreakpoint < 1

	const redirectTo = { pathname: route("SIGN_IN"), state: { redirectTo: location } }

	return (
		<StatefulModal>
			{({ open, close, isOpen, modal }) =>
				isOpen && isMobile ? (
					<Redirect to={redirectTo} push />
				) : (
					<>
						{children({ open, close, isOpen, modal })}
						{modal(<CurrentComponent {...commonProps} />)}
					</>
				)
			}
		</StatefulModal>
	)
}

export default compose(
	withBreakpoints,
	withRouter
)(AuthModal)
