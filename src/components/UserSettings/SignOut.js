import React from "react"
import { withRouter } from "react-router-dom"

import Button from "../Button"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

const SignOutButton = ({ history }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const onClick = () => {
		try {
			firebase.signOut()
			flashMessage("Wylogowano")
			history.push(route("HOME"))
		} catch {
			flashMessage("Wystąpił błąd")
		}
	}

	return (
		<Button type="button" onClick={onClick} fullWidth big>
			Wyloguj
		</Button>
	)
}

export default withRouter(SignOutButton)
