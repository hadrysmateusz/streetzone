import React from "react"

import { PasswordChangeForm } from "../../pages/PasswordChange"
import { PasswordContainer } from "./StyledComponents"
import AddPassword from "./AddPassword"

const PasswordManagement = ({ activeMethods, onLink }) => {
	const isEnabled = activeMethods.includes("password")

	return (
		<PasswordContainer>
			{isEnabled ? (
				<PasswordChangeForm />
			) : (
				<AddPassword isEnabled={isEnabled} onLink={onLink} />
			)}
		</PasswordContainer>
	)
}

export default PasswordManagement
