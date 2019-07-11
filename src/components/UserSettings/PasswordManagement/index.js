import React from "react"

import ChangePassword from "./ChangePassword"
import AddPassword from "./AddPassword"

const PasswordManagement = ({ activeMethods, onSuccess }) => {
	const isEnabled = activeMethods.includes("password")

	return isEnabled ? (
		<ChangePassword onSuccess={onSuccess} />
	) : (
		<AddPassword onSuccess={onSuccess} />
	)
}

export default PasswordManagement
