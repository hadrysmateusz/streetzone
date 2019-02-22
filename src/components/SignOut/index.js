import React from "react"

import Button, { ButtonContainer } from "../Button"
import { withFirebase } from "../Firebase"

const SignOutButton = ({ firebase, ...rest }) => {
	return (
		<ButtonContainer centered>
			<Button {...rest} type="button" onClick={firebase.signOut}>
				Wyloguj
			</Button>
		</ButtonContainer>
	)
}

export default withFirebase(SignOutButton)
