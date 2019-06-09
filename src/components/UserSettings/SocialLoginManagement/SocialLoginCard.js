import React, { useState } from "react"
import styled from "styled-components/macro"

import Button, {
	GoogleButton,
	FacebookButton,
	ButtonContainer,
	LoaderButton
} from "../../Button"

import { Heading } from "../common"

const SocialButton = ({ provider, ...rest }) => {
	switch (provider) {
		case "google.com":
			return <LoaderButton social="google" {...rest} />
		case "facebook.com":
			return <LoaderButton social="facebook" {...rest} />
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
	const [isLoading, setIsLoading] = useState()

	const __onLink = () => {
		setIsLoading(true)
		onLink(signInMethod.provider)
		setIsLoading(false)
	}

	const __onUnlink = async () => {
		setIsLoading(true)
		await onUnlink(signInMethod.id)
		setIsLoading(false)
	}

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
						text="Rozłącz"
						provider={signInMethod.id}
						onClick={__onUnlink}
						disabled={onlyOneLeft}
						title={
							onlyOneLeft
								? "Nie można dezaktywować ostatniej metody logowania"
								: undefined
						}
					/>
				) : (
					<SocialButton text="Połącz" provider={signInMethod.id} onClick={__onLink} />
				)}
			</ButtonContainer>
		</SocialLoginCardContainer>
	)
}

export default SocialLoginCard
