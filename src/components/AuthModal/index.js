import React from "react"

import Modal from "../Modal"
import { withGlobalContext } from "../GlobalContext"

import SignInPage from "../../pages/SignIn"
import SignUpPage from "../../pages/SignUp"

import { ROUTES } from "../../constants"

class AuthModal extends React.Component {
	render = () => {
		const { globalContext } = this.props
		const { modalPage } = globalContext
		return (
			<Modal
				isOpen={globalContext.isLoginModalVisible}
				onRequestClose={globalContext.closeModal}
			>
				{modalPage === ROUTES.SIGN_IN && <SignInPage />}
				{modalPage === ROUTES.SIGN_UP && <SignUpPage />}
			</Modal>
		)
	}
}

export default withGlobalContext(AuthModal)
