import React from "react"

import { PasswordChangeForm } from "../../pages/PasswordChange"
import { PasswordContainer } from "./StyledComponents"
import AddPassword from "./AddPassword"
import { TextBlock } from "../StyledComponents"

const PasswordManagement = ({ activeMethods, onLink }) => {
	const isEnabled = activeMethods.includes("password")

	return (
		<PasswordContainer>
			{isEnabled ? (
				<>
					<TextBlock size="m" bold uppercase>
						Zmień hasło
					</TextBlock>
					<PasswordChangeForm />
				</>
			) : (
				<>
					<TextBlock size="m" bold uppercase>
						Dodaj hasło
					</TextBlock>
					<AddPassword isEnabled={isEnabled} onLink={onLink} />
				</>
			)}
		</PasswordContainer>
	)
}

export default PasswordManagement
