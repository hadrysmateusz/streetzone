import React, { useState, useEffect } from "react"

import { SignInForm } from "../../pages/SignIn"
import { SignUpForm } from "../../pages/SignUp"
import { StatefulModal } from "../Modal/new"
import { Button } from "../Button"

const SignInModal = ({ changePage }) => {
	return (
		<div>
			<h3>Zaloguj się</h3>
			<SignInForm />
			<p>Nie masz jeszcze konta?</p>
			<Button onClick={() => changePage("signUp")}>Utwórz konto</Button>
		</div>
	)
}

const SignUpModal = ({ changePage }) => {
	return (
		<div>
			<h3>Utwórz konto</h3>
			<SignUpForm />
			<p>Masz już konto?</p>
			<Button onClick={() => changePage("signIn")}>Zaloguj się</Button>
		</div>
	)
}

const pages = {
	signIn: SignInModal,
	signUp: SignUpModal
}

const AuthModal = ({ children }) => {
	const [currentPage, setCurrentPage] = useState("signIn")

	const CurrentComponent = pages[currentPage]

	const changePage = (pageName) => setCurrentPage(pageName)

	const commonProps = { changePage }

	return (
		<StatefulModal>
			{({ open, close, isOpen, modal }) => (
				<>
					{children({ open, close, isOpen, modal })}
					{modal(<CurrentComponent {...commonProps} />)}
				</>
			)}
		</StatefulModal>
	)
}

export default AuthModal
