import React from "react"
import styled from "styled-components/macro"

import Button, { GoogleButton, FacebookButton, ButtonContainer } from "../../Button"

import { Heading } from "../common"

const SocialButton = ({ provider, ...rest }) => {
	switch (provider) {
		case "google.com":
			return <GoogleButton {...rest} />
		case "facebook.com":
			return <FacebookButton {...rest} />
		default:
			return <Button {...rest} />
	}
}

const SocialLoginCardContainer = styled.div`
	border: 1px solid var(--gray75);
	padding: var(--spacing3);
	display: grid;
	gap: var(--spacing2);
`

const StatusContainer = styled.div``

const SocialLoginCard = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
	return (
		<SocialLoginCardContainer>
			<Heading>{signInMethod.name}</Heading>

			<StatusContainer>
				<b>Status: </b>
				{isEnabled ? "połączono" : "nie połączono"}
			</StatusContainer>

			<ButtonContainer>
				{isEnabled ? (
					<SocialButton
						provider={signInMethod.id}
						onClick={() => onUnlink(signInMethod.id)}
						disabled={onlyOneLeft}
						title={
							onlyOneLeft
								? "Nie można dezaktywować ostatniej metody logowania"
								: undefined
						}
					>
						Rozłącz
					</SocialButton>
				) : (
					<SocialButton
						provider={signInMethod.id}
						onClick={() => onLink(signInMethod.provider)}
					>
						Połącz
					</SocialButton>
				)}
			</ButtonContainer>
		</SocialLoginCardContainer>
	)
}

export default SocialLoginCard
