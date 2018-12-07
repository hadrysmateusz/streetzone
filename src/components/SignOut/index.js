import React from "react"

import { withFirebase } from "../Firebase"

const SignOutButton = ({ firebase }) => {
	return (
		<button type="button" onClick={firebase.signOut}>
			Wyloguj Się
		</button>
	)
}

export default withFirebase(SignOutButton)
