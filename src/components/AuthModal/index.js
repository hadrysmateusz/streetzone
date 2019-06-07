import React, { useState } from "react"

import { SignIn } from "../../pages/SignIn"
import { SignUpForm } from "../../pages/SignUp"
import { StatefulModal } from "../Modal/new"

const SignInModal = ({ changePage }) => {
	return (
		<div>
			<h3>Zaloguj się</h3>
			<SignIn />
		</div>
	)
}

const SignUpModal = ({ changePage }) => {
	return (
		<div>
			<h3>Utwórz konto</h3>
			<SignUpForm />
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
