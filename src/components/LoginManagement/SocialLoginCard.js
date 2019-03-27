import React from "react"
import Button, { GoogleButton, FacebookButton, ButtonContainer } from "../Button"
import styled from "styled-components"
import { TextBlock } from "../StyledComponents"

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

const SocialLoginCard = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) => {
	return (
		<SocialLoginCardContainer>
			<TextBlock size="m" bold>
				{signInMethod.name}
			</TextBlock>

			<TextBlock>
				<b>Status: </b>
				{isEnabled ? "połączono" : "nie połączono"}
			</TextBlock>

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
