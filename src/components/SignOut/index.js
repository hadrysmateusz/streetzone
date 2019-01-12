import React from "react"

import { withFirebase } from "../Firebase"

const SignOutButton = ({ firebase, ...rest }) => {
	return (
		<button {...rest} type="button" style={{ width: "100%" }} onClick={firebase.signOut}>
			Wyloguj
		</button>
	)
}

export default withFirebase(SignOutButton)
