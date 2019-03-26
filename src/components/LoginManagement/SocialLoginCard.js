import React from "react"
import Button, { GoogleButton, FacebookButton } from "../Button"
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

			{isEnabled ? (
				<SocialButton
					provider={signInMethod.id}
					onClick={() => onUnlink(signInMethod.id)}
					disabled={onlyOneLeft}
					title={
						onlyOneLeft ? "Nie można dezaktywować ostatniej metody logowania" : undefined
					}
					fullWidth
				>
					Rozłącz
				</SocialButton>
			) : (
				<SocialButton
					provider={signInMethod.id}
					onClick={() => onLink(signInMethod.provider)}
					fullWidth
				>
					Połącz
				</SocialButton>
			)}
		</SocialLoginCardContainer>
	)
}

export default SocialLoginCard
