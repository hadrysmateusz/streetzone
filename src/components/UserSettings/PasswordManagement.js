import React from "react"

import ChangePassword from "./ChangePassword"
import AddPassword from "./AddPassword"
import { TextBlock } from "../StyledComponents"

const PasswordManagement = ({ activeMethods, onLink }) => {
	const isEnabled = activeMethods.includes("password")

	return isEnabled ? (
		<>
			<TextBlock size="m" bold uppercase>
				Zmień hasło
			</TextBlock>
			<ChangePassword />
		</>
	) : (
		<>
			<TextBlock size="m" bold uppercase>
				Dodaj hasło
			</TextBlock>
			<AddPassword isEnabled={isEnabled} onLink={onLink} />
		</>
	)
}

export default PasswordManagement
