import React from "react"

import { withFirebase } from "../Firebase"

const SignOutButton = ({ firebase, ...rest }) => {
	return (
		<button {...rest} type="button" onClick={firebase.signOut}>
			Wyloguj Się
		</button>
	)
}

export default withFirebase(SignOutButton)
